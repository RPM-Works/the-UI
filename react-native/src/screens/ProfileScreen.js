import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppTheme from '../theme/AppTheme';
import ProfileCard from '../components/ProfileCard';
import PrimaryButton from '../components/PrimaryButton';
import GlassButton from '../components/GlassButton';

const ProfileScreen = () => {
  const isDark = useColorScheme() === 'dark';

  const profiles = [
    {
      username: 'TheMasterBender',
      carModel: '2023 Subaru WRX STI',
      mods: [
        'Stage 3 Turbo Kit',
        'Coilover Suspension',
        'Custom Exhaust System',
        'Brembo Brake Kit',
      ],
      stats: {
        Posts: 156,
        Meets: 42,
        Miles: 12500,
      },
    },
    {
      username: 'SpeedDemon',
      carModel: '2022 Honda Civic Type R',
      mods: [
        'Carbon Fiber Hood',
        'Racing Seats',
        'Performance Intake',
      ],
      stats: {
        Posts: 89,
        Meets: 28,
        Miles: 8200,
      },
    },
  ];

  return (
    <View style={[styles.container, {
      backgroundColor: isDark ? AppTheme.colors.darkBackground : AppTheme.colors.lightBackground,
    }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="images" size={20} color={AppTheme.colors.primaryBlue} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="edit" size={20} color={AppTheme.colors.primaryBlue} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Cards */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {profiles.map((profile, index) => (
          <ProfileCard
            key={index}
            username={profile.username}
            carModel={profile.carModel}
            mods={profile.mods}
            stats={profile.stats}
            onTap={() => console.log('Card tapped:', profile.username)}
          />
        ))}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <PrimaryButton
            text="Share Profile"
            icon="share"
            onPress={() => {}}
            style={styles.shareButton}
          />
          <GlassButton
            text="View Stats"
            icon="chart-bar"
            onPress={() => {}}
            width="100%"
            style={styles.statsButton}
          />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: AppTheme.colors.primaryBlue,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  actionButtons: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  shareButton: {
    marginBottom: 12,
  },
  statsButton: {
    marginBottom: 12,
  },
});

export default ProfileScreen;
