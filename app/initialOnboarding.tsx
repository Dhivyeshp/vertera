import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  Image,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Placeholder for illustrations - these would be your actual components
const WelcomeIllustration = () => (
  <View style={{ width: 100, height: 100, alignSelf: 'center' }}>
    
  </View>
);

const RoadmapIllustration = () => (
  <View style={{ width: 200, height: 200, alignSelf: 'center' }}>
  </View>
);

const OnboardingScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Animation values for button
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const buttonOpacityAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Animate button in on first render
    Animated.parallel([
      Animated.timing(buttonOpacityAnim, {
        toValue: 1,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        delay: 400,
        useNativeDriver: true,
      })
    ]).start();
  }, []);
  
  const screens = [
    {
      title: "Welcome to Vertera",
      heading: "Your AI-powered guide to successful career transitions.",
      subtitle: "Swipe to learn more →",
      backgroundColor: '#111111',
      illustration: (
        <LottieView
          source={require('../app/animations/firstpage.json')} // Path to your Lottie JSON file
          autoPlay
          loop
          style={{ width: 350, height: 350 }}
        />
      ),
      profileImages: [
        
      ],
      index: 0
    },
    {
        title: "Personalized Career Roadmaps",
        heading: "Enter your skills and goals, and our AI creates a step-by-step pathway to your new career.",
        subtitle: "Powered by advanced AI to match your unique profile to career opportunities.",
        backgroundColor: '#e8f86c',
        illustration: (
          <LottieView
            source={require('../app/animations/roadmap.json')} // Path to your Lottie JSON file
            autoPlay
            loop
            style={{ width: 400, height: 400, paddingBottom:70}}
          />
        ),
        profileImages: [
         
        ],
        index: 1,
      },
    {
      title: "We Have Got You Covered",
      heading: "Access courses, projects, networking strategies, and connect with potential mentors - all in one place.",
      subtitle: "Join thousands of professionals who successfully changed careers with Vertera.",
      backgroundColor: 'white',
      illustration: (
        <LottieView
          source={require('../app/animations/covered.json')} // Path to your Lottie JSON file
          autoPlay
          loop
          style={{ width: 350, height: 350, top: 20 }}
        />
      ),
      profileImages: [

      ],
      index: 2
    }
  ];

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { 
      useNativeDriver: false, 
      listener: (event) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        if (slideIndex !== currentIndex) {
          setCurrentIndex(slideIndex);
          
          // Pulse animation for button on slide change
          Animated.sequence([
            Animated.timing(buttonScaleAnim, {
              toValue: 1.05,
              duration: 150,
              useNativeDriver: true,
            }),
            Animated.timing(buttonScaleAnim, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            })
          ]).start();
        }
      }
    }
  );

  const navigateToSlide = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: index * width, animated: true });
    }
  };
  
  const scrollRef = useRef(null);

  // Function to render the profile circles with checkmarks
  const renderProfileImage = (image, index) => {
    return (
      <View 
        key={index} 
        style={[
          styles.profileContainer, 
          { 
            top: image.top, 
            left: image.left 
          }
        ]}
      >
        <Image source={image.source} style={styles.profileImage} />
        {image.checked && (
          <View style={styles.checkmarkContainer}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        )}
      </View>
    );
  };

  // Animated background dots
  const renderBackgroundDots = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <Svg key={index} style={[
        styles.backgroundDot,
        {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.3 + 0.2,
        }
      ]}>
        <Circle
          cx="4"
          cy="4"
          r="5"
          fill={currentIndex === 0 ? (Math.random() > 0.5 ? "#9c6ade" : "#4f46e5") : 
                currentIndex === 1 ? "#4f46e5" : "#d97706"}
        />
      </Svg>
    ));
  };

  // Authentication Buttons based on the provided image
  const renderAuthButtons = () => {
    const navigation = useNavigation(); // Add this line
  
    return (
      <View style={styles.authButtonsContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('login')}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      {/* Background dots */}
      {renderBackgroundDots()}
      
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {screens.map((item, index) => {
          // Complex 3D animations based on scroll position
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width
          ];
          
          // Opacity and scale effects
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });
          
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          });
          
          return (
            <View 
              key={index} 
              style={[
                styles.slide, 
                { 
                  width,
                  backgroundColor: item.backgroundColor
                }
              ]}
            >
              {/* Profile Images with Checkmarks */}
              {item.profileImages.map((image, imgIndex) => 
                renderProfileImage(image, imgIndex)
              )}
              
              {/* Illustration */}
              <View style={styles.illustrationContainer}>
                {item.illustration}
              </View>
              
              {/* Content */}
              <Animated.View 
                style={[
                  styles.content, 
                  { 
                    transform: [{ scale }],
                    opacity
                  }
                ]}
              >
                <Text style={[
                  styles.title,
                  { color: index === 0 ? '#9c6ade' : '#4f46e5' }
                ]}>{item.title}</Text>
                <Text style={[
                  styles.heading,
                  { color: index === 0 ? 'white' : '#111827' }
                ]}>{item.heading}</Text>
                <Text style={[
                  styles.subtitle,
                  { color: index === 0 ? '#a1a1aa' : '#4b5563' }
                ]}>{item.subtitle}</Text>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>

      {/* Enhanced tab indicators */}
      <View style={styles.tabIndicatorContainer}>
        {screens.map((_, i) => (
          <TouchableOpacity 
            key={i}
            onPress={() => navigateToSlide(i)}
            style={styles.tabIndicatorButton}
          >
            <Animated.View
              style={[
                styles.tabIndicator,
                {
                  backgroundColor: scrollX.interpolate({
                    inputRange: screens.map((_, index) => index * width),
                    outputRange: screens.map((_, index) => index === i ? '#4f46e5' : '#6b7280'),
                  }),
                  width: scrollX.interpolate({
                    inputRange: screens.map((_, index) => index * width),
                    outputRange: screens.map((_, index) => index === i ? 24 : 8),
                  }),
                }
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Auth Buttons instead of Get Started */}
      {renderAuthButtons()}

      <View style={styles.homeIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  slide: {
    flex: 1,
    height: height,
    position: 'relative',
  },
  content: {
    position: 'absolute',
    bottom: 190,
    left: 0,
    right: 0,
    padding: 25,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 24,
  },
  illustrationContainer: {
    position: 'absolute',
    top: '10%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  profileContainer: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    zIndex: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  checkmarkContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3b82f6',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1e1b2e',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  backgroundDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    zIndex: 1,
  },
  tabIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 130,
    left: 0,
    right: 0,
  },
  tabIndicatorButton: {
    padding: 8,
  },
  tabIndicator: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: 4,
  },
  authButtonsContainer: {
    position: 'absolute',
    bottom: 60,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4f46e5',
    flex: 1,
    marginRight: 10,
  },
  loginButtonText: {
    color: '#4f46e5',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    flex: 1,
    marginLeft: 10,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 2.5,
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    opacity: 0.2,
  },
});

export default OnboardingScreen;