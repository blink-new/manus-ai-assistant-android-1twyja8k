import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
  Send, 
  Bot, 
  User,
  Mic,
  Paperclip,
  Sparkles,
  AlertTriangle 
} from 'lucide-react-native';
import { createClient } from '@supabase/supabase-js';

const { width } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const MessageBubble = ({ message, index }: { message: Message; index: number }) => {
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 100).duration(400)}
      style={[
        styles.messageContainer,
        message.isBot ? styles.botMessageContainer : styles.userMessageContainer,
      ]}
    >
      <View style={styles.messageHeader}>
        <View style={[styles.avatar, message.isBot ? styles.botAvatar : styles.userAvatar]}>
          {message.isBot ? (
            <Bot color="#FFFFFF" size={16} />
          ) : (
            <User color="#FFFFFF" size={16} />
          )}
        </View>
        <Text style={styles.messageTime}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      
      <View style={[styles.messageBubble, message.isBot ? styles.botBubble : styles.userBubble]}>
        <Text style={[styles.messageText, message.isBot ? styles.botText : styles.userText]}>
          {message.text}
        </Text>
      </View>
    </Animated.View>
  );
};

const { width } = Dimensions.get('window');

// Initialize Supabase client
// IMPORTANT: Replace with your actual Supabase URL and Anon Key
// These should ideally come from environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Please check your environment variables.");
}

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Manus, your AI assistant. I\'m here to help you with information processing, content creation, problem solving, and much more. How can I assist you today?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const sendButtonScale = useSharedValue(1);
  
  const sendButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sendButtonScale.value }]
  }));

  const handleSend = async () => {
    if (inputText.trim() === '' || !supabase) {
      if (!supabase) {
        setError("Supabase client not initialized. Check console for details.");
      }
      return;
    }
    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText.trim();
    setInputText('');
    setIsTyping(true);

    try {
      const { data, error: functionError } = await supabase.functions.invoke("chat", {
        body: { message: currentInput },
      });

      if (functionError) {
        throw functionError;
      }

      if (data && data.reply) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.reply,
          isBot: true,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error("Invalid response from AI.");
      }
    } catch (e: any) {
      console.error("Error calling Supabase function:", e);
      setError(`Failed to get AI response: ${e.message || 'Unknown error'}`);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't process your request right now. Please try again later.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleSendPress = () => {
    sendButtonScale.value = withSpring(0.9, {}, () => {
      sendButtonScale.value = withSpring(1);
    });
    handleSend();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Sparkles color="#FFFFFF" size={24} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Manus AI</Text>
            <Text style={styles.headerSubtitle}>Always ready to help</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => (
          <MessageBubble key={message.id} message={message} index={index} />
        ))}
        
        {isTyping && (
          <Animated.View
            entering={FadeInDown.duration(300)}
            style={[styles.messageContainer, styles.botMessageContainer]}
          >
            <View style={styles.messageHeader}>
              <View style={[styles.avatar, styles.botAvatar]}>
                <Bot color="#FFFFFF" size={16} />
              </View>
              <Text style={styles.messageTime}>typing...</Text>
            </View>
            <View style={[styles.messageBubble, styles.botBubble]}>
              <View style={styles.typingIndicator}>
                <View style={[styles.typingDot, { animationDelay: '0ms' }]} />
                <View style={[styles.typingDot, { animationDelay: '150ms' }]} />
                <View style={[styles.typingDot, { animationDelay: '300ms' }]} />
              </View>
            </View>
          </Animated.View>
        )}

        {error && (
          <Animated.View
            entering={FadeInDown.duration(300)}
            style={styles.errorContainer}
          >
            <AlertTriangle color="#EF4444" size={20} style={styles.errorIcon} />
            <Text style={styles.errorText}>{error}</Text>
          </Animated.View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip color="#6B7280" size={20} />
          </TouchableOpacity>
          
          <TextInput
            style={styles.textInput}
            placeholder="Ask me anything..."
            placeholderTextColor="#9CA3AF"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={1000}
          />
          
          <TouchableOpacity style={styles.micButton}>
            <Mic color="#6B7280" size={20} />
          </TouchableOpacity>
          
          <Animated.View style={sendButtonStyle}>
            <TouchableOpacity
              style={[styles.sendButton, inputText.trim() ? styles.sendButtonActive : null]}
              onPress={handleSendPress}
              disabled={!inputText.trim()}
            >
              <Send color={inputText.trim() ? "#FFFFFF" : "#9CA3AF"} size={20} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E2E8F0',
    marginTop: 2,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  messageContainer: {
    marginBottom: 16,
  },
  botMessageContainer: {
    alignItems: 'flex-start',
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  botAvatar: {
    backgroundColor: '#6366F1',
  },
  userAvatar: {
    backgroundColor: '#10B981',
  },
  messageTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  messageBubble: {
    maxWidth: width * 0.75,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  botBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: '#6366F1',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  botText: {
    color: '#1F2937',
  },
  userText: {
    color: '#FFFFFF',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9CA3AF',
    marginHorizontal: 2,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 34,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
  },
  attachButton: {
    marginRight: 12,
    padding: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    maxHeight: 100,
    paddingVertical: 0,
  },
  micButton: {
    marginLeft: 12,
    padding: 4,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#6366F1',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  errorIcon: {
    marginRight: 8,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 14,
    flex: 1,
  },
});