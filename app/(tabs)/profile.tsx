import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch, Platform } from 'react-native';
import { Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, CreditCard as Edit2 } from 'lucide-react-native';

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editButton}>
            <Edit2 size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.profileName}>Alex Johnson</Text>
        <Text style={styles.profileEmail}>alex.johnson@example.com</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>42%</Text>
            <Text style={styles.statLabel}>Progress</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Milestones</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Months</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Career Information</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Current Career</Text>
            <Text style={styles.infoValue}>Software Developer</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Target Career</Text>
            <Text style={styles.infoValue}>Product Manager</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Experience</Text>
            <Text style={styles.infoValue}>5 years</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Top Skills</Text>
            <View style={styles.skillsContainer}>
              <View style={styles.skillPill}>
                <Text style={styles.skillText}>JavaScript</Text>
              </View>
              <View style={styles.skillPill}>
                <Text style={styles.skillText}>React</Text>
              </View>
              <View style={styles.skillPill}>
                <Text style={styles.skillText}>Node.js</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Update Career Info</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <View style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Bell size={20} color="#5271FF" />
              <Text style={styles.settingLabel}>Push Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#E0E0E0', true: '#5271FF' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Bell size={20} color="#5271FF" />
              <Text style={styles.settingLabel}>Weekly Progress Reports</Text>
            </View>
            <Switch
              value={weeklyReports}
              onValueChange={setWeeklyReports}
              trackColor={{ false: '#E0E0E0', true: '#5271FF' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Settings size={20} color="#5271FF" />
            </View>
            <Text style={styles.menuText}>Account Settings</Text>
            <ChevronRight size={20} color="#8E8E93" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Shield size={20} color="#5271FF" />
            </View>
            <Text style={styles.menuText}>Privacy & Security</Text>
            <ChevronRight size={20} color="#8E8E93" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <HelpCircle size={20} color="#5271FF" />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <ChevronRight size={20} color="#8E8E93" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <LogOut size={20} color="#FF3B30" />
            </View>
            <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.versionText}>Vertera v1.0.0</Text>
        <Text style={styles.copyrightText}>© 2025 Vertera. All rights reserved.</Text>
      </View>
      
      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'web' ? 40 : 60,
    paddingBottom: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  profileSection: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#5271FF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#333333',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#5271FF',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#EEEEEE',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  infoRow: {
    marginBottom: 16,
  },
  infoLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    gap: 8,
  },
  skillPill: {
    backgroundColor: 'rgba(82, 113, 255, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  skillText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#5271FF',
  },
  updateButton: {
    backgroundColor: '#5271FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  updateButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(82, 113, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  logoutText: {
    color: '#FF3B30',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  versionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  copyrightText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  spacer: {
    height: 40,
  },
});