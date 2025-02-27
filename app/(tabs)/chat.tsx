import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Send, Bot, User } from 'lucide-react-native';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm your Vertera AI career assistant. How can I help with your career transition today?",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  
  const scrollViewRef = useRef(null);
  
  const handleSend = () => {
    if (message.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: chatHistory.length + 1,
      sender: 'user',
      text: message,
      timestamp: new Date(),
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponses = [
        "Based on your software development background, I recommend focusing on product management courses that emphasize technical product management. This will leverage your existing technical knowledge.",
        "For your transition to product management, I suggest starting with a certification course. Would you like me to recommend some specific courses?",
        "Your experience with coding will be valuable in your product management role. Many PMs with technical backgrounds excel at communicating with engineering teams.",
        "Have you considered joining product management communities like Product School or Mind the Product? Networking is crucial for career transitions.",
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage = {
        id: chatHistory.length + 2,
        sender: 'ai',
        text: randomResponse,
        timestamp: new Date(),
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
    }, 1000);
  };
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Career Assistant</Text>
        <Text style={styles.headerSubtitle}>Ask anything about your career transition</Text>
      </View>
      
      <ScrollView 
        style={styles.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {chatHistory.map((chat) => (
          <View 
            key={chat.id} 
            style={[
              styles.messageBubble, 
              chat.sender === 'user' ? styles.userBubble : styles.aiBubble
            ]}
          >
            <View style={styles.messageHeader}>
              <View style={styles.senderContainer}>
                {chat.sender === 'ai' ? (
                  <Bot size={16} color="#5271FF" />
                ) : (
                  <User size={16} color="#333333" />
                )}
                <Text style={[
                  styles.senderName,
                  chat.sender === 'ai' ? styles.aiSenderName : styles.userSenderName
                ]}>
                  {chat.sender === 'ai' ? 'Vertera AI' : 'You'}
                </Text>
              </View>
              <Text style={styles.timestamp}>{formatTime(chat.timestamp)}</Text>
            </View>
            <Text style={[
              styles.messageText,
              chat.sender === 'user' ? styles.userMessageText : styles.aiMessageText
            ]}>
              {chat.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          multiline
          placeholderTextColor="#8E8E93"
        />
        <TouchableOpacity 
          style={[styles.sendButton, message.trim() === '' ? styles.sendButtonDisabled : {}]} 
          onPress={handleSend}
          disabled={message.trim() === ''}
        >
          <Send size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsTitle}>Suggested Questions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <SuggestionChip 
            text="What skills do I need for product management?" 
            onPress={() => {
              setMessage("What skills do I need for product management?");
            }}
          />
          <SuggestionChip 
            text="How long will the transition take?" 
            onPress={() => {
              setMessage("How long will the transition take?");
            }}
          />
          <SuggestionChip 
            text="Recommend courses for me" 
            onPress={() => {
              setMessage("Can you recommend some product management courses?");
            }}
          />
          <SuggestionChip 
            text="How to build a portfolio?" 
            onPress={() => {
              setMessage("How can I build a product management portfolio?");
            }}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

function SuggestionChip({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.suggestionChip} onPress={onPress}>
      <Text style={styles.suggestionText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: Platform.OS === 'web' ? 40 : 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666666',
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#5271FF',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  senderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  userSenderName: {
    color: '#FFFFFF',
  },
  aiSenderName: {
    color: '#5271FF',
  },
  timestamp: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 8,
  },
  messageText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  aiMessageText: {
    color: '#333333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#5271FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  suggestionsContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  suggestionsTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  suggestionChip: {
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  suggestionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333333',
  },
});