import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Award,
  Bell,
  ChevronRight,
  Clock,
  Edit3,
  Heart,
  HelpCircle,
  Lock,
  LogOut,
  Settings,
  Star,
} from 'lucide-react-native';
import { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();


  const profileStats = [
    { icon: Award, label: '15 Years', value: 'Experience', color: '#FFA726' },
    { icon: Heart, label: '324', value: 'Favorites', color: '#FF4444' },
    { icon: Star, label: '4.8', value: 'Rating', color: '#FFA726' },
    { icon: Clock, label: '52', value: 'Bookings', color: '#00FF87' },
  ];

  const settingsMenu = [
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage appointment reminders',
    },
    {
      icon: Lock,
      title: 'Privacy & Security',
      description: 'Control your account security',
    },
    { icon: Settings, title: 'Preferences', description: 'App settings and theme' },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'FAQs and contact support',
    },
  ];

  const handleLogout = async()=>{
    try {
      await AsyncStorage.removeItem('accessToken');
      router.replace("home");
    } catch (error) {
      console.log('Error logging out:', error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
       

        <LinearGradient
          colors={['#00FF87', '#016B3A', '#013B1F', '#012B17']}
          style={styles.profileCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={styles.profileHeader}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
              }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Sarah Johnson</Text>
              <Text style={styles.profileEmail}>sarah.johnson@email.com</Text>
              <View style={styles.memberBadge}>
                <Star color="#FFF" size={12} fill="#FFF" strokeWidth={2} />
                <Text style={styles.memberText}>Premium Member</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(!isEditing)}>
              <Edit3 color="#FFFFFF" size={18} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <View style={styles.bioSection}>
            <Text style={styles.bioText}>
              Wellness enthusiast passionate about relaxation and self-care. Love exploring
              new spa experiences!
            </Text>
          </View>
        </LinearGradient>

       

        <View style={styles.section}>
          <View style={styles.membershipCard}>
            <LinearGradient
              colors={['#00FF87', '#016B3A']}
              style={styles.membershipGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <View style={styles.membershipContent}>
                <Text style={styles.membershipLevel}>Premium Member</Text>
                <Text style={styles.membershipBenefit}>Get exclusive deals & early access</Text>
              </View>
              <View style={styles.membershipBadgeIcon}>
                <Award color="#FFFFFF" size={32} strokeWidth={1.5} />
              </View>
            </LinearGradient>

            <View style={styles.membershipDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Member Since</Text>
                <Text style={styles.detailValue}>January 2024</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Points Earned</Text>
                <Text style={styles.detailValue}>1,250 pts</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Renewals</Text>
                <Text style={styles.detailValue}>3 months left</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeText}>View Benefits</Text>
              <ChevronRight color="#016B3A" size={18} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.settingsContainer}>
            {settingsMenu.map((item, index) => {
              const MenuIcon = item.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.settingItem,
                    index !== settingsMenu.length - 1 && styles.settingItemBorder,
                  ]}>
                  <View style={styles.settingIconContainer}>
                    <MenuIcon color="#016B3A" size={20} strokeWidth={2} />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingDescription}>{item.description}</Text>
                  </View>
                  <ChevronRight color="#D1D5DB" size={20} strokeWidth={2} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <LogOut color="#FFFFFF" size={18} strokeWidth={2} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Spa & Wellness App v1.0</Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '400',
  },
  profileCard: {
    marginHorizontal: 20,
    marginTop:40,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    width: 'auto',
    alignSelf: 'flex-start',
  },
  memberText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bioSection: {
    marginTop: 8,
  },
  bioText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
    lineHeight: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  membershipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  membershipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  membershipContent: {
    flex: 1,
  },
  membershipLevel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  membershipBenefit: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '400',
  },
  membershipBadgeIcon: {
    marginLeft: 16,
  },
  membershipDetails: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '700',
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  upgradeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#016B3A',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementBadge: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementEmoji: {
    fontSize: 28,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  achievementDesc: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FF4444',
    borderRadius: 16,
    gap: 8,
    shadowColor: '#FF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  bottomSpacing: {
    height: 20,
  },
});