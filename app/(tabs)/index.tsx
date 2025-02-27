import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, TrendingUp, Award, Briefcase } from 'lucide-react-native';

export default function HomeScreen() {
  const [currentCareer, setCurrentCareer] = useState('Software Developer');
  const [targetCareer, setTargetCareer] = useState('Product Manager');
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.nameText}>Alex</Text>
      </View>
      
      <View style={styles.careerPathContainer}>
        <LinearGradient
          colors={['#5271FF', '#7A8FFF']}
          style={styles.careerPathGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.careerPathContent}>
            <Text style={styles.careerPathTitle}>Your Career Path</Text>
            <View style={styles.careerPathRow}>
              <View style={styles.careerBox}>
                <Text style={styles.careerLabel}>Current</Text>
                <Text style={styles.careerText}>{currentCareer}</Text>
              </View>
              <ArrowRight color="#ffffff" size={24} />
              <View style={styles.careerBox}>
                <Text style={styles.careerLabel}>Target</Text>
                <Text style={styles.careerText}>{targetCareer}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.updateButton}>
              <Text style={styles.updateButtonText}>Update Path</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progress Overview</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Career Roadmap</Text>
            <Text style={styles.progressPercent}>42%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '42%' }]} />
          </View>
          <Text style={styles.progressText}>12 of 28 milestones completed</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended Next Steps</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendationsScroll}>
          <RecommendationCard 
            icon={<TrendingUp color="#5271FF" size={24} />}
            title="Complete LinkedIn Profile"
            description="Update your profile to highlight transferable skills"
            time="15 min"
          />
          <RecommendationCard 
            icon={<Award color="#5271FF" size={24} />}
            title="Product Management Basics"
            description="Take this introductory course on Coursera"
            time="2 hours"
          />
          <RecommendationCard 
            icon={<Briefcase color="#5271FF" size={24} />}
            title="Informational Interview"
            description="Connect with Sarah from your network"
            time="30 min"
          />
        </ScrollView>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Success Stories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.successStoryCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }}
            style={styles.successStoryImage}
          />
          <View style={styles.successStoryContent}>
            <Text style={styles.successStoryName}>Jennifer Lee</Text>
            <Text style={styles.successStoryTransition}>Engineer → Product Manager</Text>
            <Text style={styles.successStoryText}>
              "Vertera helped me identify the right courses and connect with mentors who guided my transition."
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.spacer} />
    </ScrollView>
  );
}

function RecommendationCard({ icon, title, description, time }) {
  return (
    <TouchableOpacity style={styles.recommendationCard}>
      <View style={styles.recommendationIconContainer}>
        {icon}
      </View>
      <Text style={styles.recommendationTitle}>{title}</Text>
      <Text style={styles.recommendationDescription}>{description}</Text>
      <View style={styles.recommendationTimeContainer}>
        <Text style={styles.recommendationTime}>{time}</Text>
      </View>
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
  },
  welcomeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666666',
  },
  nameText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#333333',
  },
  careerPathContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  careerPathGradient: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  careerPathContent: {
    padding: 20,
  },
  careerPathTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  careerPathRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  careerBox: {
    flex: 1,
  },
  careerLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  careerText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  updateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  updateButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
  },
  seeAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#5271FF',
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#333333',
  },
  progressPercent: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#5271FF',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#5271FF',
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
  },
  recommendationsScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  recommendationCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  recommendationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(82, 113, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  recommendationDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  recommendationTimeContainer: {
    backgroundColor: 'rgba(82, 113, 255, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  recommendationTime: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#5271FF',
  },
  successStoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  successStoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  successStoryContent: {
    flex: 1,
  },
  successStoryName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
  },
  successStoryTransition: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#5271FF',
    marginBottom: 8,
  },
  successStoryText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
  },
  spacer: {
    height: 100,
  },
});