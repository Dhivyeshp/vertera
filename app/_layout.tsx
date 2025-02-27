import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent auto-hiding the splash screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  const [appReady, setAppReady] = useState(false);
  const fadeAnim = new Animated.Value(1);
  const spinAnim = new Animated.Value(0);

  useEffect(() => {
    if (fontsLoaded) {
      // Start spinning animation
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 800, // Faster rotation
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      setTimeout(async () => {
        await SplashScreen.hideAsync();
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500, // Smooth fade-out
          useNativeDriver: true,
        }).start(() => setAppReady(true));
      }, 1500); // Faster transition (1.5 seconds)
    }
  }, [fontsLoaded]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!appReady) {
    return (
      <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
        <Text style={styles.splashText}>Welcome to Vertera</Text>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Text style={styles.loadingIcon}>🔄</Text>
        </Animated.View>
      </Animated.View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#5271FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  loadingIcon: {
    fontSize: 40,
  },
});
