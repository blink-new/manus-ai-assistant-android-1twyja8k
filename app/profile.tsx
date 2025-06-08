import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions,
} from 'react-native';
import Animated, { 
  FadeInDown, 
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import {
  User,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  Star,
  Download,
  Share2,
  Moon,
  Volume2,
  Globe,
  Smartphone,
  ChevronRight,
  LogOut,
  Info,
  Heart,
  Coffee
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: any;
  type: 'toggle' | 'action' | 'info';
  value?: boolean;
  onPress?: () => void;
  color: string;
}

const ProfileCard = ({ delay }: { delay: number }) => {
  return (
    <Animated.View 
      style={styles.profileCard}
      entering={FadeInDown.delay(delay).duration(600)}
    >
      <View style={styles.avatarContainer}>
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          style={styles.avatar}
        >
          <User color="#FFFFFF" size={32} />
        </LinearGradient>
      </View>
      
      <Text style={styles.userName}>Manus AI Assistant</Text>
      <Text style={styles.userRole}>Your Intelligent Companion</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>∞</Text>
          <Text style={styles.statLabel}>Capabilities</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>24/7</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>v2.0</Text>
          <Text style={styles.statLabel}>Version</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const SettingRow = ({ setting, index }: { setting: SettingItem; index: number }) => {
  const [isEnabled, setIsEnabled] = useState(setting.value || false);
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePressIn = () => {
    if (setting.type === 'action') {
      scale.value = withSpring(0.98);
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = () => {
    if (setting.type === 'toggle') {
      setIsEnabled(!isEnabled);
    } else if (setting.onPress) {
      setting.onPress();
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).duration(400)}
      style={animatedStyle}
    >
      <TouchableOpacity
        style={styles.settingRow}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={setting.type === 'info' ? 1 : 0.7}
      >
        <View style={[styles.settingIcon, { backgroundColor: `${setting.color}15` }]}>
          <setting.icon color={setting.color} size={20} />
        </View>
        
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{setting.title}</Text>
          {setting.subtitle && (
            <Text style={styles.settingSubtitle}>{setting.subtitle}</Text>
          )}
        </View>
        
        <View style={styles.settingAction}>
          {setting.type === 'toggle' ? (
            <Switch
              value={isEnabled}
              onValueChange={setIsEnabled}
              trackColor={{ false: '#E5E7EB', true: `${setting.color}40` }}
              thumbColor={isEnabled ? setting.color : '#FFFFFF'}
            />
          ) : setting.type === 'action' ? (
            <ChevronRight color="#9CA3AF" size={20} />
          ) : null}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function Profile() {
  const settingsData: SettingItem[] = [
    {
      id: '1',
      title: 'Notifications',
      subtitle: 'Receive updates and alerts',
      icon: Bell,
      type: 'toggle',
      value: true,
      color: '#F59E0B'
    },
    {
      id: '2',
      title: 'Dark Mode',
      subtitle: 'Switch to dark theme',
      icon: Moon,
      type: 'toggle',
      value: false,
      color: '#6366F1'
    },
    {
      id: '3',
      title: 'Sound Effects',
      subtitle: 'Enable audio feedback',
      icon: Volume2,
      type: 'toggle',
      value: true,
      color: '#EC4899'
    },
    {
      id: '4',
      title: 'Language',
      subtitle: 'English (US)',
      icon: Globe,
      type: 'action',
      color: '#10B981'
    },
    {
      id: '5',
      title: 'Privacy & Security',
      subtitle: 'Manage your data and privacy',
      icon: Shield,
      type: 'action',
      color: '#EF4444'
    },
    {
      id: '6',
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      icon: HelpCircle,
      type: 'action',
      color: '#8B5CF6'
    },
    {
      id: '7',
      title: 'Rate the App',
      subtitle: 'Share your feedback',
      icon: Star,
      type: 'action',
      color: '#F59E0B'
    },
    {
      id: '8',
      title: 'Share App',
      subtitle: 'Tell friends about Manus AI',
      icon: Share2,
      type: 'action',
      color: '#06B6D4'
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#4F46E5', '#7C3AED', '#DB2777']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Animated.Text 
          style={styles.title}
          entering={FadeInUp.duration(600)}
        >
          Profile
        </Animated.Text>
      </LinearGradient>

      {/* Profile Card */}
      <View style={styles.profileSection}>
        <ProfileCard delay={400} />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Animated.Text 
          style={styles.sectionTitle}
          entering={FadeInDown.delay(600).duration(400)}
        >
          Quick Actions
        </Animated.Text>
        
        <Animated.View 
          style={styles.quickActionsGrid}
          entering={FadeInDown.delay(700).duration(400)}
        >
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#F0F9FF' }]}>
              <Download color="#0EA5E9" size={20} />
            </View>
            <Text style={styles.quickActionText}>Export Data</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#F0FDF4' }]}>
              <Settings color="#22C55E" size={20} />
            </View>
            <Text style={styles.quickActionText}>Preferences</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#FEF3F2' }]}>
              <Heart color="#EF4444" size={20} />
            </View>
            <Text style={styles.quickActionText}>Feedback</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Settings */}
      <View style={styles.settingsSection}>
        <Animated.Text 
          style={styles.sectionTitle}
          entering={FadeInDown.delay(800).duration(400)}
        >
          Settings
        </Animated.Text>
        
        <View style={styles.settingsCard}>
          {settingsData.map((setting, index) => (
            <SettingRow key={setting.id} setting={setting} index={index + 9} />
          ))}
        </View>
      </View>

      {/* About Section */}
      <View style={styles.aboutSection}>
        <Animated.View 
          style={styles.aboutCard}
          entering={FadeInDown.delay(1200).duration(400)}
        >
          <View style={styles.aboutHeader}>
            <Info color="#6366F1" size={24} />
            <Text style={styles.aboutTitle}>About Manus AI</Text>
          </View>
          
          <Text style={styles.aboutText}>
            Manus AI Assistant is designed to be your intelligent companion for productivity, 
            creativity, and problem-solving. Built with advanced AI capabilities and a focus 
            on user experience.
          </Text>
          
          <View style={styles.aboutStats}>
            <View style={styles.aboutStat}>
              <Text style={styles.aboutStatLabel}>Version</Text>
              <Text style={styles.aboutStatValue}>2.0.1</Text>
            </View>
            <View style={styles.aboutStat}>
              <Text style={styles.aboutStatLabel}>Build</Text>
              <Text style={styles.aboutStatValue}>2024.1</Text>
            </View>
          </View>
        </Animated.View>

        {/* Support */}
        <Animated.View 
          style={styles.supportCard}
          entering={FadeInDown.delay(1300).duration(400)}
        >
          <View style={styles.supportHeader}>
            <Coffee color="#F59E0B" size={20} />
            <Text style={styles.supportText}>Made with ❤️ for productivity</Text>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  profileSection: {
    paddingHorizontal: 24,
    marginTop: -20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366F1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E2E8F0',
  },
  quickActionsSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    alignItems: 'center',
    width: (width - 72) / 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '500',
  },
  settingsSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  settingAction: {
    marginLeft: 12,
  },
  aboutSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  aboutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 12,
  },
  aboutText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 16,
  },
  aboutStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  aboutStat: {
    alignItems: 'center',
  },
  aboutStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  aboutStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  supportCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
  },
  supportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportText: {
    fontSize: 14,
    color: '#92400E',
    marginLeft: 8,
    fontWeight: '500',
  },
});