import Olm from 'react-native-olm';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  OLM_ACCOUNT: '@olm_account',
  OLM_SESSIONS: '@olm_sessions',
  MEGOLM_SESSIONS: '@megolm_sessions',
  DEVICE_KEYS: '@device_keys',
};

class EncryptionService {
  constructor() {
    this.olmAccount = null;
    this.olmSessions = new Map();
    this.megolmSessions = new Map();
    this.initialized = false;
  }

  /**
   * Initialize Olm library and load or create account
   */
  async initialize() {
    if (this.initialized) return;

    try {
      // Initialize Olm
      await Olm.init();

      // Load or create Olm account
      const storedAccount = await AsyncStorage.getItem(STORAGE_KEYS.OLM_ACCOUNT);

      if (storedAccount) {
        this.olmAccount = new Olm.Account();
        this.olmAccount.unpickle('DEFAULT_KEY', storedAccount);
      } else {
        this.olmAccount = new Olm.Account();
        this.olmAccount.create();
        await this.saveAccount();
      }

      // Load sessions
      await this.loadSessions();

      this.initialized = true;
      console.log('Encryption service initialized');
    } catch (error) {
      console.error('Failed to initialize encryption:', error);
      throw error;
    }
  }

  /**
   * Save Olm account to storage
   */
  async saveAccount() {
    if (!this.olmAccount) return;

    const pickled = this.olmAccount.pickle('DEFAULT_KEY');
    await AsyncStorage.setItem(STORAGE_KEYS.OLM_ACCOUNT, pickled);
  }

  /**
   * Load sessions from storage
   */
  async loadSessions() {
    try {
      const sessionsData = await AsyncStorage.getItem(STORAGE_KEYS.OLM_SESSIONS);
      if (sessionsData) {
        const sessions = JSON.parse(sessionsData);
        for (const [userId, sessionData] of Object.entries(sessions)) {
          const session = new Olm.Session();
          session.unpickle('DEFAULT_KEY', sessionData);
          this.olmSessions.set(userId, session);
        }
      }
    } catch (error) {
      console.error('Failed to load sessions:', error);
    }
  }

  /**
   * Save sessions to storage
   */
  async saveSessions() {
    try {
      const sessions = {};
      for (const [userId, session] of this.olmSessions.entries()) {
        sessions[userId] = session.pickle('DEFAULT_KEY');
      }
      await AsyncStorage.setItem(STORAGE_KEYS.OLM_SESSIONS, JSON.stringify(sessions));
    } catch (error) {
      console.error('Failed to save sessions:', error);
    }
  }

  /**
   * Get identity keys for this device
   */
  getIdentityKeys() {
    if (!this.olmAccount) return null;
    return JSON.parse(this.olmAccount.identity_keys());
  }

  /**
   * Generate one-time keys
   */
  async generateOneTimeKeys(count = 5) {
    if (!this.olmAccount) return;

    this.olmAccount.generate_one_time_keys(count);
    const keys = JSON.parse(this.olmAccount.one_time_keys());
    await this.saveAccount();

    return keys;
  }

  /**
   * Create outbound session with another user
   */
  async createOutboundSession(userId, identityKey, oneTimeKey) {
    if (!this.olmAccount) throw new Error('Account not initialized');

    const session = new Olm.Session();
    session.create_outbound(this.olmAccount, identityKey, oneTimeKey);

    this.olmSessions.set(userId, session);
    await this.saveSessions();

    return session;
  }

  /**
   * Create inbound session from pre-key message
   */
  async createInboundSession(userId, message) {
    if (!this.olmAccount) throw new Error('Account not initialized');

    const session = new Olm.Session();
    session.create_inbound(this.olmAccount, message);

    this.olmAccount.remove_one_time_keys(session);
    await this.saveAccount();

    this.olmSessions.set(userId, session);
    await this.saveSessions();

    return session;
  }

  /**
   * Encrypt a message for a specific user (1-to-1 encryption)
   */
  async encryptMessage(userId, plaintext) {
    if (!this.initialized) {
      await this.initialize();
    }

    let session = this.olmSessions.get(userId);

    if (!session) {
      // For demo purposes, we'll create a mock session
      // In production, you'd exchange keys with the other user
      console.warn(`No session for ${userId}, using unencrypted`);
      return {
        type: 0, // plain text (for demo)
        ciphertext: plaintext,
      };
    }

    const encrypted = session.encrypt(plaintext);
    await this.saveSessions();

    return encrypted;
  }

  /**
   * Decrypt a message from a specific user
   */
  async decryptMessage(userId, messageType, ciphertext) {
    if (!this.initialized) {
      await this.initialize();
    }

    // For demo purposes with mock data
    if (messageType === 0) {
      return ciphertext; // Plain text
    }

    let session = this.olmSessions.get(userId);

    if (!session) {
      console.warn(`No session for ${userId}, cannot decrypt`);
      return ciphertext; // Return as-is if can't decrypt
    }

    try {
      const decrypted = session.decrypt(messageType, ciphertext);
      await this.saveSessions();
      return decrypted;
    } catch (error) {
      console.error('Decryption failed:', error);
      return '[Encrypted Message]';
    }
  }

  /**
   * Create Megolm outbound session for group chat
   */
  async createMegolmOutboundSession(roomId) {
    const session = new Olm.OutboundGroupSession();
    session.create();

    this.megolmSessions.set(roomId, session);

    return {
      sessionId: session.session_id(),
      sessionKey: session.session_key(),
    };
  }

  /**
   * Create Megolm inbound session from received key
   */
  async createMegolmInboundSession(roomId, sessionKey) {
    const session = new Olm.InboundGroupSession();
    session.create(sessionKey);

    this.megolmSessions.set(`in_${roomId}`, session);

    return session.session_id();
  }

  /**
   * Encrypt message for group chat using Megolm
   */
  async encryptGroupMessage(roomId, plaintext) {
    if (!this.initialized) {
      await this.initialize();
    }

    let session = this.megolmSessions.get(roomId);

    if (!session) {
      // Create new outbound session
      await this.createMegolmOutboundSession(roomId);
      session = this.megolmSessions.get(roomId);
    }

    const encrypted = session.encrypt(plaintext);

    return {
      ciphertext: encrypted,
      sessionId: session.session_id(),
    };
  }

  /**
   * Decrypt group message using Megolm
   */
  async decryptGroupMessage(roomId, ciphertext, sessionId) {
    if (!this.initialized) {
      await this.initialize();
    }

    const session = this.megolmSessions.get(`in_${roomId}`);

    if (!session) {
      console.warn(`No inbound session for room ${roomId}`);
      return '[Encrypted Message]';
    }

    try {
      const result = session.decrypt(ciphertext);
      return result.plaintext;
    } catch (error) {
      console.error('Group decryption failed:', error);
      return '[Encrypted Message]';
    }
  }

  /**
   * Clear all encryption data (for logout)
   */
  async clearAll() {
    this.olmSessions.clear();
    this.megolmSessions.clear();

    if (this.olmAccount) {
      this.olmAccount.free();
      this.olmAccount = null;
    }

    await AsyncStorage.multiRemove([
      STORAGE_KEYS.OLM_ACCOUNT,
      STORAGE_KEYS.OLM_SESSIONS,
      STORAGE_KEYS.MEGOLM_SESSIONS,
      STORAGE_KEYS.DEVICE_KEYS,
    ]);

    this.initialized = false;
  }
}

// Export singleton instance
export default new EncryptionService();
