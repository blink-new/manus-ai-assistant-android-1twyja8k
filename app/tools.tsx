import React, { useState } from 'react';
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
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withSpring 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Terminal,
  Globe,
  Database,
  FileCode,
  Search,
  Share2,
  Cloud,
  Monitor,
  Layers,
  Package,
  GitBranch,
  Zap,
  Code2,
  Folder,
  Settings,
  Play,
  Download,
  Upload
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  color: string;
  status: 'active' | 'idle' | 'processing';
}

const tools: Tool[] = [
  {
    id: '1',
    name: 'Shell Terminal',
    description: 'Execute commands in Linux environment',
    icon: Terminal,
    category: 'System',
    color: '#1E293B',
    status: 'active'
  },
  {
    id: '2',
    name: 'Web Browser',
    description: 'Navigate and interact with websites',
    icon: Globe,
    category: 'Web',
    color: '#3B82F6',
    status: 'active'
  },
  {
    id: '3',
    name: 'File System',
    description: 'Manage files and directories',
    icon: Folder,
    category: 'Files',
    color: '#F59E0B',
    status: 'active'
  },
  {
    id: '4',
    name: 'Code Editor',
    description: 'Write and edit code in multiple languages',
    icon: FileCode,
    category: 'Development',
    color: '#10B981',
    status: 'active'
  },
  {
    id: '5',
    name: 'Database',
    description: 'Query and manage databases',
    icon: Database,
    category: 'Data',
    color: '#8B5CF6',
    status: 'idle'
  },
  {
    id: '6',
    name: 'API Client',
    description: 'Make HTTP requests and API calls',
    icon: Share2,
    category: 'Network',
    color: '#EC4899',
    status: 'active'
  },
  {
    id: '7',
    name: 'Cloud Deploy',
    description: 'Deploy applications to cloud platforms',
    icon: Cloud,
    category: 'Deployment',
    color: '#06B6D4',
    status: 'processing'
  },
  {
    id: '8',
    name: 'Process Monitor',
    description: 'Monitor system processes and resources',
    icon: Monitor,
    category: 'System',
    color: '#EF4444',
    status: 'active'
  }
];

const categories = ['All', 'System', 'Web', 'Files', 'Development', 'Data', 'Network', 'Deployment'];

const ToolCard = ({ tool, index }: { tool: Tool; index: number }) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'processing': return '#F59E0B';
      case 'idle': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ready';
      case 'processing': return 'Working';
      case 'idle': return 'Standby';
      default: return 'Unknown';
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).duration(400)}
      style={animatedStyle}
    >
      <TouchableOpacity
        style={styles.toolCard}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.toolIcon, { backgroundColor: `${tool.color}15` }]}>
            <tool.icon color={tool.color} size={24} />
          </View>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(tool.status) }]} />
            <Text style={[styles.statusText, { color: getStatusColor(tool.status) }]}>
              {getStatusText(tool.status)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.toolName}>{tool.name}</Text>
        <Text style={styles.toolDescription}>{tool.description}</Text>
        
        <View style={styles.categoryBadge}>
          <Text style={[styles.categoryText, { color: tool.color }]}>{tool.category}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const QuickAction = ({ icon: Icon, label, color, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: `${color}15` }]}>
        <Icon color={color} size={20} />
      </View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function Tools() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredTools = selectedCategory === 'All' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#059669', '#10B981', '#34D399']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Animated.Text 
          style={styles.title}
          entering={FadeInDown.duration(600)}
        >
          AI Tools & Interfaces
        </Animated.Text>
        <Animated.Text 
          style={styles.subtitle}
          entering={FadeInDown.delay(200).duration(600)}
        >
          Powerful tools at your command
        </Animated.Text>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Animated.Text 
          style={styles.sectionTitle}
          entering={FadeInDown.delay(400).duration(400)}
        >
          Quick Actions
        </Animated.Text>
        
        <Animated.View 
          style={styles.quickActionsGrid}
          entering={FadeInDown.delay(500).duration(400)}
        >
          <QuickAction
            icon={Play}
            label="Run Script"
            color="#10B981"
            onPress={() => {}}
          />
          <QuickAction
            icon={Code2}
            label="New Project"
            color="#6366F1"
            onPress={() => {}}
          />
          <QuickAction
            icon={Download}
            label="Download"
            color="#3B82F6"
            onPress={() => {}}
          />
          <QuickAction
            icon={Upload}
            label="Upload"
            color="#EC4899"
            onPress={() => {}}
          />
        </Animated.View>
      </View>

      {/* Category Filter */}
      <View style={styles.filterSection}>
        <Animated.Text 
          style={styles.sectionTitle}
          entering={FadeInDown.delay(600).duration(400)}
        >
          Tool Categories
        </Animated.Text>
        
        <Animated.ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryFilter}
          contentContainerStyle={styles.categoryContent}
          entering={FadeInRight.delay(700).duration(400)}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </View>

      {/* Tools Grid */}
      <View style={styles.toolsSection}>
        <View style={styles.toolsGrid}>
          {filteredTools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index + 8} />
          ))}
        </View>
      </View>

      {/* System Info */}
      <View style={styles.systemSection}>
        <Animated.View 
          style={styles.systemCard}
          entering={FadeInDown.delay(1200).duration(400)}
        >
          <View style={styles.systemHeader}>
            <Settings color="#6366F1" size={24} />
            <Text style={styles.systemTitle}>System Status</Text>
          </View>
          
          <View style={styles.systemStats}>
            <View style={styles.systemStat}>
              <Text style={styles.systemStatValue}>8</Text>
              <Text style={styles.systemStatLabel}>Active Tools</Text>
            </View>
            <View style={styles.systemStat}>
              <Text style={styles.systemStatValue}>1</Text>
              <Text style={styles.systemStatLabel}>Processing</Text>
            </View>
            <View style={styles.systemStat}>
              <Text style={styles.systemStatValue}>15+</Text>
              <Text style={styles.systemStatLabel}>Languages</Text>
            </View>
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#D1FAE5',
    textAlign: 'center',
    lineHeight: 24,
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
  quickAction: {
    alignItems: 'center',
    width: (width - 72) / 4,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '500',
  },
  filterSection: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  categoryFilter: {
    marginHorizontal: -24,
  },
  categoryContent: {
    paddingHorizontal: 24,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#6366F1',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  toolsSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: (width - 64) / 2,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  toolIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  toolName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  systemSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingBottom: 40,
  },
  systemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  systemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  systemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 12,
  },
  systemStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  systemStat: {
    alignItems: 'center',
  },
  systemStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366F1',
    marginBottom: 4,
  },
  systemStatLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
});