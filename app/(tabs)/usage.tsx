import React from 'react';
import { SafeAreaView } from 'react-native';
import ConvAIWidget from '../interview';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ConvAIWidget />
    </SafeAreaView>
  );
}