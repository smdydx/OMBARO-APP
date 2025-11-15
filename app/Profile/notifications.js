
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, Mail, MessageSquare, Gift } from 'lucide-react-native';

export default function Notifications() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    pushBooking: true,
    pushOffers: true,
    pushReminders: false,
    emailBooking: true,
    emailOffers: false,
    smsReminders: true,
  });

  const NotificationItem = ({ title, description, icon: Icon, value, onChange }) => (
    <View style={styles.notifItem}>
      <View style={styles.iconWrap}>
        <Icon size={20} color="#1e3a8a" />
      </View>
      <View style={styles.notifContent}>
        <Text style={styles.notifTitle}>{title}</Text>
        <Text style={styles.notifDesc}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
        thumbColor={value ? '#1e3a8a' : '#f1f5f9'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Push Notifications</Text>
          <NotificationItem
            title="Booking Updates"
            description="Get notified about booking confirmations and updates"
            icon={Bell}
            value={settings.pushBooking}
            onChange={(val) => setSettings({ ...settings, pushBooking: val })}
          />
          <NotificationItem
            title="Offers & Promotions"
            description="Receive exclusive deals and promotions"
            icon={Gift}
            value={settings.pushOffers}
            onChange={(val) => setSettings({ ...settings, pushOffers: val })}
          />
          <NotificationItem
            title="Appointment Reminders"
            description="Get reminded before your appointments"
            icon={Bell}
            value={settings.pushReminders}
            onChange={(val) => setSettings({ ...settings, pushReminders: val })}
          />

          <Text style={styles.sectionTitle}>Email Notifications</Text>
          <NotificationItem
            title="Booking Confirmations"
            description="Receive booking details via email"
            icon={Mail}
            value={settings.emailBooking}
            onChange={(val) => setSettings({ ...settings, emailBooking: val })}
          />
          <NotificationItem
            title="Promotional Emails"
            description="Get updates about new services and offers"
            icon={Mail}
            value={settings.emailOffers}
            onChange={(val) => setSettings({ ...settings, emailOffers: val })}
          />

          <Text style={styles.sectionTitle}>SMS Notifications</Text>
          <NotificationItem
            title="SMS Reminders"
            description="Get text reminders for your bookings"
            icon={MessageSquare}
            value={settings.smsReminders}
            onChange={(val) => setSettings({ ...settings, smsReminders: val })}
          />
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

  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  notifDesc: {
    fontSize: 13,
    color: '#64748b',
  },
});