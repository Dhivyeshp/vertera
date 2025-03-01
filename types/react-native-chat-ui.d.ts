declare module 'react-native-chat-ui' {
    import { ReactNode } from 'react';
    import { StyleProp, ViewStyle } from 'react-native';
  
    export interface User {
      id: string;
      name: string;
    }
  
    export interface Message {
      id: string;
      text: string;
      user: User;
    }
  
    export interface ChatProps {
      messages: Message[];
      onSend: (message: string) => void;
      user: User;
      style?: StyleProp<ViewStyle>;
    }
  
    export const Chat: React.FC<ChatProps>;
  }