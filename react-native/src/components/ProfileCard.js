import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useColorScheme,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppTheme from '../theme/AppTheme';

const { width } = Dimensions.get('window');

const ProfileCard = ({ username, carModel, mods, stats, onTap }) => {
  const isDark = useColorScheme() === 'dark';
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const handleFlip = () => {
    const toValue = isFlipped ? 0 : 180;
    Animated.timing(flipAnim, {
      toValue,
      duration: AppTheme.animation.flip,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
    onTap?.();
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 90, 90, 180],
    outputRange: [1, 1, 0, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 90, 90, 180],
    outputRange: [0, 0, 1, 1],
  });

  return (
    <View style={styles.container}>
      {/* Front Side */}
      <Animated.View
        style={[
          styles.card,
          {
            opacity: frontOpacity,
            transform: [{ rotateY: frontInterpolate }],
          },
        ]}>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={handleFlip}
          style={styles.cardInner}>
          <LinearGradient
            colors={
              isDark
                ? ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']
                : ['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.2)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.glassGradient}>
            {/* Car Image Section */}
            <View style={styles.carImageSection}>
              <LinearGradient
                colors={[`${AppTheme.colors.primaryBlue}50`, 'transparent']}
                style={styles.carImageGradient}>
                <Icon
                  name="car"
                  size={80}
                  color={`${AppTheme.colors.primaryBlue}80`}
                />
              </LinearGradient>
              {/* QR Button */}
              <View style={styles.qrButton}>
                <Icon name="qrcode" size={24} color="#FFFFFF" />
              </View>
            </View>

            {/* Profile Info */}
            <View style={styles.profileInfo}>
              <Text style={styles.username}>{username}</Text>
              <Text style={[styles.carModel, { color: isDark ? '#FFF' : '#000' }]}>
                {carModel}
              </Text>

              {/* Stats */}
              <View style={styles.statsContainer}>
                {Object.entries(stats).map(([label, value]) => (
                  <View
                    key={label}
                    style={[
                      styles.statBox,
                      {
                        backgroundColor: isDark
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(255, 255, 255, 0.5)',
                      },
                    ]}>
                    <Text style={styles.statValue}>{value}</Text>
                    <Text style={[styles.statLabel, { color: isDark ? '#FFFFFF99' : '#00000099' }]}>
                      {label}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Mods */}
              <Text style={[styles.modsTitle, { color: isDark ? '#FFFFFFB3' : '#00000099' }]}>
                Modifications
              </Text>
              {mods.slice(0, 3).map((mod, index) => (
                <Text
                  key={index}
                  style={[styles.modItem, { color: isDark ? '#FFFFFF99' : '#00000099' }]}>
                  • {mod}
                </Text>
              ))}

              {/* Instagram */}
              <View style={styles.instagramContainer}>
                <LinearGradient
                  colors={AppTheme.gradients.instagram}
                  style={styles.instagramIcon}>
                  <Icon name="instagram" size={16} color="#FFFFFF" />
                </LinearGradient>
                <Text style={[styles.instagramHandle, { color: isDark ? '#FFFFFFB3' : '#000' }]}>
                  @the_master_bender
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Back Side */}
      <Animated.View
        style={[
          styles.card,
          styles.cardBack,
          {
            opacity: backOpacity,
            transform: [{ rotateY: backInterpolate }],
          },
        ]}>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={handleFlip}
          style={styles.cardInner}>
          <LinearGradient
            colors={
              isDark
                ? ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']
                : ['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.2)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.glassGradient}>
            <View style={styles.backContent}>
              {/* QR Code */}
              <View style={styles.qrCodeContainer}>
                <Icon name="qrcode" size={140} color={AppTheme.colors.primaryBlue} />
                <Text style={styles.qrLabel}>Scan to Connect</Text>
              </View>

              {/* Username */}
              <Text style={styles.backUsername}>{username}</Text>

              {/* Achievements */}
              <View style={[styles.achievementsContainer, {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
              }]}>
                <View style={styles.achievementsHeader}>
                  <Icon name="trophy" size={16} color={AppTheme.colors.accentOrange} />
                  <Text style={[styles.achievementsTitle, { color: isDark ? '#FFF' : '#000' }]}>
                    Achievements
                  </Text>
                </View>
                <View style={styles.badgesContainer}>
                  {[
                    { icon: 'fire', label: 'Track\nMaster' },
                    { icon: 'star', label: 'Top\nBuilder' },
                    { icon: 'crown', label: 'Legend' },
                  ].map((badge, index) => (
                    <View key={index} style={styles.badge}>
                      <LinearGradient
                        colors={AppTheme.gradients.primary}
                        style={styles.badgeIcon}>
                        <Icon name={badge.icon} size={18} color="#FFFFFF" />
                      </LinearGradient>
                      <Text style={[styles.badgeLabel, { color: isDark ? '#FFFFFFB3' : '#00000099' }]}>
                        {badge.label}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Social Links */}
              <View style={[styles.socialContainer, {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
              }]}>
                {['instagram', 'youtube', 'tiktok', 'twitter'].map((social) => (
                  <View key={social} style={[styles.socialButton, {
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                  }]}>
                    <Icon
                      name={social}
                      size={20}
                      color={AppTheme.colors.primaryBlue}
                      brand
                    />
                  </View>
                ))}
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <LinearGradient
                  colors={AppTheme.gradients.primary}
                  style={styles.shareButton}>
                  <Icon name="share" size={18} color="#FFFFFF" />
                  <Text style={styles.shareText}>Share</Text>
                </LinearGradient>
                <View style={[styles.settingsButton, {
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                }]}>
                  <Icon name="cog" size={20} color={isDark ? '#FFF' : '#000'} />
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 550,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 24,
    ...AppTheme.shadows.multiLayer,
  },
  cardBack: {
    backfaceVisibility: 'hidden',
  },
  cardInner: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  glassGradient: {
    flex: 1,
  },
  carImageSection: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carImageGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 40,
    height: 40,
    backgroundColor: AppTheme.colors.primaryBlue,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    ...AppTheme.shadows.button,
  },
  profileInfo: {
    padding: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: AppTheme.colors.primaryBlue,
  },
  carModel: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statBox: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: AppTheme.colors.primaryBlue,
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  modsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
  },
  modItem: {
    fontSize: 12,
    marginTop: 4,
  },
  instagramContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  instagramIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instagramHandle: {
    fontSize: 13,
    marginLeft: 8,
  },
  // Back side styles
  backContent: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  qrCodeContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...AppTheme.shadows.card,
  },
  qrLabel: {
    fontSize: 12,
    color: AppTheme.colors.primaryBlue,
    fontWeight: '600',
    marginTop: 8,
  },
  backUsername: {
    fontSize: 22,
    fontWeight: '700',
    color: AppTheme.colors.primaryBlue,
    marginTop: 24,
  },
  achievementsContainer: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  achievementsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  badge: {
    alignItems: 'center',
  },
  badgeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...AppTheme.shadows.card,
  },
  badgeLabel: {
    fontSize: 10,
    marginTop: 6,
    textAlign: 'center',
  },
  socialContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionButtons: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 16,
  },
  shareButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...AppTheme.shadows.button,
  },
  shareText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default ProfileCard;
