import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInDown, 
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat 
} from 'react-native-reanimated';
import { 
  Sparkles, 
  MessageCircle, 
  Zap, 
  BookOpen,
  Search,
  Code,
  FileText,
  Brain
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const QuickActionCard = ({ icon: Icon, title, subtitle, onPress, delay = 0 }) => {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View 
      entering={FadeInDown.delay(delay).duration(400)}
      style={animatedStyle}
    >
      <TouchableOpacity 
        style={styles.actionCard}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.iconContainer}>
          <Icon color="#6366F1" size={24} />
        </View>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function Home() {
  const sparkleRotation = useSharedValue(0);

  React.useEffect(() => {
    sparkleRotation.value = withRepeat(
      withSpring(360, { duration: 3000 }),
      -1,
      false
    );
  }, []);

  const sparkleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sparkleRotation.value}deg` }]
  }));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#6366F1', '#8B5CF6', '#EC4899']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Animated.View 
          style={[styles.sparkleContainer, sparkleStyle]}
          entering={FadeInUp.duration(600)}
        >
          <Sparkles color="#FFFFFF" size={32} />
        </Animated.View>
        
        <Animated.Text 
          style={styles.title}
          entering={FadeInUp.delay(200).duration(600)}
        >
          Manus AI Assistant
        </Animated.Text>
        
        <Animated.Text 
          style={styles.subtitle}
          entering={FadeInUp.delay(400).duration(600)}
        >
          Your intelligent companion for productivity, creativity, and problem-solving
        </Animated.Text>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Animated.Text 
          style={styles.sectionTitle}
          entering={FadeInDown.delay(600).duration(400)}
        >
          Quick Actions
        </Animated.Text>
        
        <View style={styles.actionsGrid}>
          <QuickActionCard
            icon={MessageCircle}
            title="Start Chat"
            subtitle="Ask me anything"
            delay={700}
            onPress={() => {}}
          />
          <QuickActionCard
            icon={Search}
            title="Research"
            subtitle="Find information"
            delay={800}
            onPress={() => {}}
          />
          <QuickActionCard
            icon={Code}
            title="Code Help"
            subtitle="Programming assistance"
            delay={900}
            onPress={() => {}}
          />
          <QuickActionCard
            icon={FileText}
            title="Content"
            subtitle="Writing & editing"
            delay={1000}
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Features Preview */}
      <View style={styles.section}>
        <Animated.Text 
          style={styles.sectionTitle}
          entering={FadeInDown.delay(1100).duration(400)}
        >
          What I Can Do
        </Animated.Text>
        
        <Animated.View 
          style={styles.featureCard}
          entering={FadeInDown.delay(1200).duration(400)}
        >
          <View style={styles.featureIcon}>
            <Brain color="#6366F1" size={28} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Intelligent Problem Solving</Text>
            <Text style={styles.featureDescription}>
              I can help you break down complex problems, provide step-by-step solutions, 
              and adapt to changing requirements.
            </Text>
          </View>
        </Animated.View>

        <Animated.View 
          style={styles.featureCard}
          entering={FadeInDown.delay(1300).duration(400)}
        >
          <View style={styles.featureIcon}>
            <Zap color="#EC4899" size={28} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Versatile Tools</Text>
            <Text style={styles.featureDescription}>
              From web browsing and file management to code execution and deployment,
              I have access to powerful tools.
            </Text>
          </View>
        </Animated.View>

        <Animated.View 
          style={styles.featureCard}
          entering={FadeInDown.delay(1400).duration(400)}
        >
          <View style={styles.featureIcon}>
            <BookOpen color="#8B5CF6" size={28} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Knowledge & Learning</Text>
            <Text style={styles.featureDescription}>
              I can research topics, analyze data, create content, and help you learn
              new concepts effectively.
            </Text>
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
  sparkleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width - 48,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: (width - 72) / 2,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
});