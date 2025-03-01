import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ConvAIWidget() {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://elevenlabs.io/convai-widget/index.js" async type="text/javascript"></script>
    </head>
    <body>
      <elevenlabs-convai agent-id="0EXnEm4St2DUtYQmGCtE"></elevenlabs-convai>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});
