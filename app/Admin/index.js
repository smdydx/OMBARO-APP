
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Settings, BarChart3, FileText, LogOut } from 'lucide-react-native';

const COLORS = {
  primary: '#1e3a8a',
  secondary: '#2563eb',
  bg: '#F8FAFC',
  cardBg: '#FFFFFF',
  text: '#1e3a8a',
  textMuted: '#64748B',
};

export default function AdminDashboard() {
  const router = useRouter();

  const QuickActionCard = ({ icon: Icon, title, subtitle, onPress }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <LinearGradient
        colors={['#FFFFFF', '#F8FAFC']}
        style={styles.actionCard}
      >
        <View style={styles.iconContainer}>
          <Icon size={24} color={COLORS.primary} strokeWidth={2.5} />
        </View>
        <View style={styles.actionText}>
          <Text style={styles.actionTitle}>{title}</Text>
          <Text style={styles.actionSubtitle}>{subtitle}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#1e3a8a', '#2563eb']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Admin Portal</Text>
            <Text style={styles.subText}>OMBARO Management Dashboard</Text>
          </View>
          <TouchableOpacity onPress={() => router.replace('/')} style={styles.logoutBtn}>
            <LogOut size={24} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <QuickActionCard
            icon={Users}
            title="User Management"
            subtitle="Manage customers, vendors & staff"
            onPress={() => {}}
          />
          
          <QuickActionCard
            icon={BarChart3}
            title="Analytics & Reports"
            subtitle="View platform statistics"
            onPress={() => {}}
          />
          
          <QuickActionCard
            icon={FileText}
            title="Content Management"
            subtitle="Manage services & categories"
            onPress={() => {}}
          />
          
          <QuickActionCard
            icon={Settings}
            title="System Settings"
            subtitle="Configure platform settings"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  logoutBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 16,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0F2FE',
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
});