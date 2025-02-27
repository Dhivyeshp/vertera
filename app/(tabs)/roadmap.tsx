import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { CircleCheck as CheckCircle2, Circle, ChevronRight, Clock, BookOpen, Users, Award } from 'lucide-react-native';

export default function RoadmapScreen() {
  const [currentPhase, setCurrentPhase] = useState(1);
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Roadmap</Text>
        <Text style={styles.headerSubtitle}>Software Developer → Product Manager</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '42%' }]} />
        </View>
        <Text style={styles.progressText}>42% Complete</Text>
      </View>
      
      <View style={styles.phasesContainer}>
        <PhaseCard
          phaseNumber={1}
          title="Foundation Building"
          description="Learn the basics of product management and build foundational skills"
          isActive={currentPhase === 1}
          isCompleted={false}
          progress={75}
          onPress={() => setCurrentPhase(1)}
        />
        
        <PhaseCard
          phaseNumber={2}
          title="Skill Development"
          description="Develop core product management skills through courses and projects"
          isActive={currentPhase === 2}
          isCompleted={false}
          progress={25}
          onPress={() => setCurrentPhase(2)}
        />
        
        <PhaseCard
          phaseNumber={3}
          title="Experience Building"
          description="Gain practical experience through projects and networking"
          isActive={currentPhase === 3}
          isCompleted={false}
          progress={0}
          onPress={() => setCurrentPhase(3)}
        />
        
        <PhaseCard
          phaseNumber={4}
          title="Job Transition"
          description="Prepare for interviews and transition to your new role"
          isActive={currentPhase === 4}
          isCompleted={false}
          progress={0}
          onPress={() => setCurrentPhase(4)}
        />
      </View>
      
      <View style={styles.currentPhaseContainer}>
        <Text style={styles.currentPhaseTitle}>Phase {currentPhase} Milestones</Text>
        
        <View style={styles.milestonesContainer}>
          <MilestoneItem
            title="Complete Product Management Fundamentals Course"
            type="Course"
            icon={<BookOpen size={20} color="#5271FF" />}
            status="completed"
            timeEstimate="8 hours"
          />
          
          <MilestoneItem
            title="Read 'Inspired' by Marty Cagan"
            type="Reading"
            icon={<BookOpen size={20} color="#5271FF" />}
            status="completed"
            timeEstimate="10 hours"
          />
          
          <MilestoneItem
            title="Complete User Research Workshop"
            type="Workshop"
            icon={<Users size={20} color="#5271FF" />}
            status="in-progress"
            timeEstimate="4 hours"
            progress={60}
          />
          
          <MilestoneItem
            title="Create a Product Requirements Document"
            type="Project"
            icon={<Award size={20} color="#5271FF" />}
            status="not-started"
            timeEstimate="6 hours"
          />
          
          <MilestoneItem
            title="Connect with 3 Product Managers for Informational Interviews"
            type="Networking"
            icon={<Users size={20} color="#5271FF" />}
            status="not-started"
            timeEstimate="3 hours"
          />
        </View>
      </View>
      
      <View style={styles.resourcesSection}>
        <Text style={styles.resourcesTitle}>Recommended Resources</Text>
        
        <TouchableOpacity style={styles.resourceCard}>
          <View style={styles.resourceIconContainer}>
            <BookOpen size={24} color="#5271FF" />
          </View>
          <View style={styles.resourceContent}>
            <Text style={styles.resourceTitle}>Product Management Certification</Text>
            <Text style={styles.resourceProvider}>Coursera</Text>
          </View>
          <ChevronRight size={20} color="#8E8E93" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.resourceCard}>
          <View style={styles.resourceIconContainer}>
            <Users size={24} color="#5271FF" />
          </View>
          <View style={styles.resourceContent}>
            <Text style={styles.resourceTitle}>Product Manager Community</Text>
            <Text style={styles.resourceProvider}>Slack Group</Text>
          </View>
          <ChevronRight size={20} color="#8E8E93" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.resourceCard}>
          <View style={styles.resourceIconContainer}>
            <Award size={24} color="#5271FF" />
          </View>
          <View style={styles.resourceContent}>
            <Text style={styles.resourceTitle}>Product Case Study Workshop</Text>
            <Text style={styles.resourceProvider}>Product School</Text>
          </View>
          <ChevronRight size={20} color="#8E8E93" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.spacer} />
    </ScrollView>
  );
}

function PhaseCard({ phaseNumber, title, description, isActive, isCompleted, progress, onPress }) {
  return (
    <TouchableOpacity 
      style={[
        styles.phaseCard, 
        isActive && styles.phaseCardActive
      ]}
      onPress={onPress}
    >
      <View style={styles.phaseHeader}>
        <View style={[
          styles.phaseNumberContainer,
          isActive && styles.phaseNumberContainerActive,
          isCompleted && styles.phaseNumberContainerCompleted
        ]}>
          <Text style={[
            styles.phaseNumber,
            isActive && styles.phaseNumberActive,
            isCompleted && styles.phaseNumberCompleted
          ]}>{phaseNumber}</Text>
        </View>
        <View style={styles.phaseTitleContainer}>
          <Text style={styles.phaseTitle}>{title}</Text>
          <Text style={styles.phaseDescription}>{description}</Text>
        </View>
      </View>
      
      <View style={styles.phaseProgressContainer}>
        <View style={styles.phaseProgressBar}>
          <View style={[styles.phaseProgressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.phaseProgressText}>{progress}% Complete</Text>
      </View>
    </TouchableOpacity>
  );
}

function MilestoneItem({ title, type, icon, status, timeEstimate, progress = 0 }) {
  return (
    <View style={styles.milestoneItem}>
      <View style={styles.milestoneStatusContainer}>
        {status === 'completed' ? (
          <CheckCircle2 size={24} color="#4CAF50" />
        ) : status === 'in-progress' ? (
          <View style={styles.progressCircleContainer}>
            <Circle size={24} color="#5271FF" />
            <Text style={styles.progressCircleText}>{progress}%</Text>
          </View>
        ) : (
          <Circle size={24} color="#8E8E93" />
        )}
        <View style={styles.milestoneConnector} />
      </View>
      
      <View style={styles.milestoneContent}>
        <Text style={styles.milestoneTitle}>{title}</Text>
        
        <View style={styles.milestoneDetails}>
          <View style={styles.milestoneTypeContainer}>
            {icon}
            <Text style={styles.milestoneType}>{type}</Text>
          </View>
          
          <View style={styles.milestoneTimeContainer}>
            <Clock size={16} color="#8E8E93" />
            <Text style={styles.milestoneTime}>{timeEstimate}</Text>
          </View>
        </View>
        
        {status === 'in-progress' && (
          <View style={styles.milestoneProgressContainer}>
            <View style={styles.milestoneProgressBar}>
              <View style={[styles.milestoneProgressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.milestoneProgressText}>{progress}%</Text>
          </View>
        )}
      </View>
    </View>
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
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#5271FF',
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#5271FF',
  },
  phasesContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  phaseCard: {
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
  phaseCardActive: {
    borderColor: '#5271FF',
    borderWidth: 2,
  },
  phaseHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  phaseNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  phaseNumberContainerActive: {
    backgroundColor: '#5271FF',
  },
  phaseNumberContainerCompleted: {
    backgroundColor: '#4CAF50',
  },
  phaseNumber: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
  },
  phaseNumberActive: {
    color: '#FFFFFF',
  },
  phaseNumberCompleted: {
    color: '#FFFFFF',
  },
  phaseTitleContainer: {
    flex: 1,
  },
  phaseTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  phaseDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
  },
  phaseProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phaseProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginRight: 12,
  },
  phaseProgressFill: {
    height: 4,
    backgroundColor: '#5271FF',
    borderRadius: 2,
  },
  phaseProgressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#666666',
    width: 80,
  },
  currentPhaseContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  currentPhaseTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 16,
  },
  milestonesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  milestoneItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  milestoneStatusContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  milestoneConnector: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 4,
    marginBottom: -16,
  },
  progressCircleContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleText: {
    position: 'absolute',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 8,
    color: '#5271FF',
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  milestoneDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  milestoneTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  milestoneType: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#5271FF',
    marginLeft: 4,
  },
  milestoneTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  milestoneTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
  },
  milestoneProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  milestoneProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginRight: 8,
  },
  milestoneProgressFill: {
    height: 4,
    backgroundColor: '#5271FF',
    borderRadius: 2,
  },
  milestoneProgressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#5271FF',
    width: 40,
  },
  resourcesSection: {
     paddingHorizontal: 20,
    marginBottom: 24,
  },
  resourcesTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 16,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  resourceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(82, 113, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  resourceProvider: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
  },
  spacer: {
    height: 100,
  },
});