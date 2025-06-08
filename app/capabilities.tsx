import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, { 
  FadeInDown, 
  useSharedValue,
  useAnimatedStyle,
  withSpring 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Brain,
  Search,
  PenTool,
  Code,
  Globe,
  FileText,
  Database,
  Zap,
  MessageSquare,
  Target,
  Shield,
  Lightbulb,
  BookOpen,
  Settings,
  Cpu,
  Network
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Capability {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  features: string[];
}

const capabilities: Capability[] = [
  {
    id: '1',
    title: 'Information Processing',
    description: 'Advanced data analysis and research capabilities',
    icon: Brain,
    color: '#6366F1',
    features: [
      'Answer questions on diverse topics',
      'Conduct thorough research',
      'Fact-checking and verification',
      'Summarize complex information',
      'Process structured data'
    ]
  },
  {
    id: '2',
    title: 'Content Creation',
    description: 'Professional writing and creative content generation',
    icon: PenTool,
    color: '#EC4899',
    features: [
      'Write articles and reports',
      'Draft professional emails',
      'Create marketing content',
      'Generate creative stories',
      'Format documents'
    ]
  },
  {
    id: '3',
    title: 'Programming & Development',
    description: 'Code development, debugging, and technical solutions',
    icon: Code,
    color: '#10B981',
    features: [
      'Multi-language programming',
      'Code debugging and review',
      'Architecture planning',
      'API development',
      'Testing strategies'
    ]
  },
  {
    id: '4',
    title: 'Web & Browser Tools',
    description: 'Advanced web interaction and automation',
    icon: Globe,
    color: '#F59E0B',
    features: [
      'Navigate websites',
      'Extract web content',
      'Automate interactions',
      'Monitor page changes',
      'Execute JavaScript'
    ]
  },
  {
    id: '5',
    title: 'File Management',
    description: 'Comprehensive file and data organization',
    icon: FileText,
    color: '#8B5CF6',
    features: [
      'Read and write files',
      'Search file contents',
      'Organize directories',
      'Convert file formats',
      'Archive and compress'
    ]
  },
  {
    id: '6',
    title: 'Problem Solving',
    description: 'Strategic analysis and solution development',
    icon: Lightbulb,
    color: '#EF4444',
    features: [
      'Break down complex problems',
      'Provide step-by-step solutions',
      'Troubleshoot issues',
      'Alternative approaches',
      'Adapt to requirements'
    ]
  }
];

const CapabilityCard = ({ capability, index }: { capability: Capability; index: number }) => {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(400)}
      style={animatedStyle}
    >
      <TouchableOpacity
        style={styles.capabilityCard}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={[styles.iconContainer, { backgroundColor: `${capability.color}15` }]}>
          <capability.icon color={capability.color} size={28} />
        </View>
        
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{capability.title}</Text>
          <Text style={styles.cardDescription}>{capability.description}</Text>
          
          <View style={styles.featuresContainer}>
            {capability.features.map((feature, featureIndex) => (
              <View key={featureIndex} style={styles.featureItem}>
                <View style={[styles.featureDot, { backgroundColor: capability.color }]} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const StatCard = ({ icon: Icon, value, label, color, delay }: any) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(400)}
      style={styles.statCard}
    >
      <View style={[styles.statIcon, { backgroundColor: `${color}15` }]}>
        <Icon color={color} size={20} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );
};

export default function Capabilities() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#1E293B', '#334155', '#475569']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Animated.Text 
          style={styles.title}
          entering={FadeInDown.duration(600)}
        >
          AI Capabilities
        </Animated.Text>
        <Animated.Text 
          style={styles.subtitle}
          entering={FadeInDown.delay(200).duration(600)}
        >
          Discover what I can help you accomplish
        </Animated.Text>
      </LinearGradient>

      {/* Stats Overview */}
      <View style={styles.statsSection}>
        <View style={styles.statsGrid}>
          <StatCard
            icon={Cpu}
            value="15+"
            label="Technologies"
            color="#6366F1"
            delay={400}
          />
          <StatCard
            icon={Zap}
            value="50+"
            label="Tools"
            color="#EC4899"
            delay={500}
          />
          <StatCard
            icon={Network}
            value="24/7"
            label="Available"
            color="#10B981"
            delay={600}
          />
        </View>
      </View>

      {/* Capabilities List */}
      <View style={styles.capabilitiesSection}>
        <Animated.Text 
          style={styles.sectionTitle}
          entering={FadeInDown.delay(700).duration(400)}
        >
          Core Capabilities
        </Animated.Text>
        
        {capabilities.map((capability, index) => (
          <CapabilityCard 
            key={capability.id} 
            capability={capability} 
            index={index + 8} 
          />
        ))}
      </View>

      {/* Additional Info */}
      <View style={styles.infoSection}>
        <Animated.View 
          style={styles.infoCard}
          entering={FadeInDown.delay(1400).duration(400)}
        >
          <View style={styles.infoHeader}>
            <Shield color="#6366F1" size={24} />
            <Text style={styles.infoTitle}>Ethical & Secure</Text>
          </View>
          <Text style={styles.infoText}>
            I operate with strong ethical guidelines, respect privacy, and maintain 
            security in all interactions while being transparent about my capabilities.
          </Text>
        </Animated.View>

        <Animated.View 
          style={styles.infoCard}
          entering={FadeInDown.delay(1500).duration(400)}
        >
          <View style={styles.infoHeader}>
            <Target color="#EC4899" size={24} />
            <Text style={styles.infoTitle}>Continuous Learning</Text>
          </View>
          <Text style={styles.infoText}>
            I continuously improve through interactions and feedback, adapting to 
            better serve your needs while maintaining accuracy and reliability.
          </Text>
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 24,
  },
  statsSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: (width - 72) / 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  capabilitiesSection: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
  },
  capabilityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 16,
  },
  featuresContainer: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#475569',
    flex: 1,
  },
  infoSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingBottom: 40,
  },
  infoCard: {
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
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
});