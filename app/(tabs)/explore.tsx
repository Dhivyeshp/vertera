import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import { Search, Filter, Briefcase, TrendingUp, Users } from 'lucide-react-native';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Careers</Text>
        <Text style={styles.headerSubtitle}>Discover new career possibilities</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search careers, skills, industries..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8E8E93"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#5271FF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Career Transitions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScroll}>
          <CareerTransitionCard
            fromCareer="Marketing"
            toCareer="UX Design"
            image="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            transitionTime="Avg. 8 months"
            matchScore="85%"
          />
          <CareerTransitionCard
            fromCareer="Teaching"
            toCareer="Instructional Design"
            image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            transitionTime="Avg. 6 months"
            matchScore="92%"
          />
          <CareerTransitionCard
            fromCareer="Finance"
            toCareer="Data Analysis"
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            transitionTime="Avg. 10 months"
            matchScore="78%"
          />
        </ScrollView>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore by Industry</Text>
        <View style={styles.industryGrid}>
          <IndustryCard
            name="Technology"
            icon={<TrendingUp color="#5271FF" size={24} />}
            jobCount="12,450+ jobs"
          />
          <IndustryCard
            name="Healthcare"
            icon={<Users color="#5271FF" size={24} />}
            jobCount="8,320+ jobs"
          />
          <IndustryCard
            name="Finance"
            icon={<Briefcase color="#5271FF" size={24} />}
            jobCount="6,780+ jobs"
          />
          <IndustryCard
            name="Education"
            icon={<Users color="#5271FF" size={24} />}
            jobCount="5,120+ jobs"
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Based on Your Skills</Text>
        <View style={styles.skillBasedContainer}>
          <SkillBasedCareerCard
            career="Product Manager"
            matchPercentage="92%"
            skills={["Communication", "Problem Solving", "Technical Knowledge"]}
            salary="$95,000 - $130,000"
          />
          <SkillBasedCareerCard
            career="UX/UI Designer"
            matchPercentage="87%"
            skills={["Creativity", "User Empathy", "Technical Knowledge"]}
            salary="$85,000 - $120,000"
          />
          <SkillBasedCareerCard
            career="Data Analyst"
            matchPercentage="83%"
            skills={["Analytical Thinking", "Problem Solving", "Technical Knowledge"]}
            salary="$75,000 - $110,000"
          />
        </View>
      </View>
      
      <View style={styles.spacer} />
    </ScrollView>
  );
}

function CareerTransitionCard({ fromCareer, toCareer, image, transitionTime, matchScore }) {
  return (
    <TouchableOpacity style={styles.transitionCard}>
      <Image source={{ uri: image }} style={styles.transitionImage} />
      <View style={styles.transitionContent}>
        <Text style={styles.transitionTitle}>{fromCareer} → {toCareer}</Text>
        <View style={styles.transitionDetails}>
          <Text style={styles.transitionTime}>{transitionTime}</Text>
          <View style={styles.matchScoreContainer}>
            <Text style={styles.matchScore}>{matchScore} Match</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function IndustryCard({ name, icon, jobCount }) {
  return (
    <TouchableOpacity style={styles.industryCard}>
      <View style={styles.industryIconContainer}>
        {icon}
      </View>
      <Text style={styles.industryName}>{name}</Text>
      <Text style={styles.industryJobCount}>{jobCount}</Text>
    </TouchableOpacity>
  );
}

function SkillBasedCareerCard({ career, matchPercentage, skills, salary }) {
  return (
    <TouchableOpacity style={styles.skillBasedCard}>
      <View style={styles.skillBasedHeader}>
        <Text style={styles.skillBasedCareer}>{career}</Text>
        <View style={styles.matchContainer}>
          <Text style={styles.matchPercentage}>{matchPercentage}</Text>
        </View>
      </View>
      <Text style={styles.skillsLabel}>Top Matching Skills:</Text>
      <View style={styles.skillsContainer}>
        {skills.map((skill, index) => (
          <View key={index} style={styles.skillPill}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.salaryText}>Avg. Salary: {salary}</Text>
      <TouchableOpacity style={styles.exploreButton}>
        <Text style={styles.exploreButtonText}>Explore Path</Text>
      </TouchableOpacity>
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
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#333333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666666',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333333',
    paddingVertical: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 16,
  },
  cardsScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  transitionCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  transitionImage: {
    width: '100%',
    height: 140,
  },
  transitionContent: {
    padding: 16,
  },
  transitionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 12,
  },
  transitionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transitionTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
  },
  matchScoreContainer: {
    backgroundColor: 'rgba(82, 113, 255, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  matchScore: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#5271FF',
  },
  industryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  industryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  industryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(82, 113, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  industryName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  industryJobCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
  },
  skillBasedContainer: {
    gap: 16,
  },
  skillBasedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  skillBasedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillBasedCareer: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
  },
  matchContainer: {
    backgroundColor: 'rgba(82, 113, 255, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  matchPercentage: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#5271FF',
  },
  skillsLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 8,
  },
  skillPill: {
    backgroundColor: 'rgba(82, 113, 255, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  skillText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#5271FF',
  },
  salaryText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  exploreButton: {
    backgroundColor: '#5271FF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  exploreButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  spacer: {
    height: 100,
  },
});