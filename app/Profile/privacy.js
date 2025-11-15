
import React from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Lock, Shield, Eye, Key, Trash2, ChevronRight } from 'lucide-react-native';

export default function Privacy() {
  const router = useRouter();

  const MenuItem = ({ title, icon: Icon, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconWrap}>
        <Icon size={20} color="#1e3a8a" />
      </View>
      <Text style={styles.menuText}>{title}</Text>
      <ChevronRight size={20} color="#cbd5e1" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Account Security</Text>
          <MenuItem title="Change Password" icon={Lock} onPress={() => {}} />
          <MenuItem title="Two-Factor Authentication" icon={Shield} onPress={() => {}} />
          <MenuItem title="Biometric Login" icon={Key} onPress={() => {}} />

          <Text style={styles.sectionTitle}>Privacy Settings</Text>
          <MenuItem title="Data & Privacy" icon={Eye} onPress={() => {}} />
          <MenuItem title="Download My Data" icon={Eye} onPress={() => {}} />
          
          <Text style={styles.sectionTitle}>Danger Zone</Text>
          <TouchableOpacity style={styles.dangerItem} activeOpacity={0.7}>
            <View style={styles.dangerIconWrap}>
              <Trash2 size={20} color="#dc2626" />
            </View>
            <Text style={styles.dangerText}>Delete Account</Text>
            <ChevronRight size={20} color="#fca5a5" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  scroll: { flex: 1 },
  container: { padding: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 8,
    marginBottom: 16,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    backgroundColor: '#eff6ff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#0f172a' },

  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
    marginBottom: 12,
  },
  dangerIconWrap: {
    width: 40,
    height: 40,
    backgroundColor: '#fee2e2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dangerText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#dc2626' },
});