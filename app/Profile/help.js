
import React from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MessageCircle, Phone, Mail, FileText, ChevronRight } from 'lucide-react-native';

export default function Help() {
  const router = useRouter();

  const ContactItem = ({ title, subtitle, icon: Icon, onPress }) => (
    <TouchableOpacity style={styles.contactItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconWrap}>
        <Icon size={22} color="#1e3a8a" />
      </View>
      <View style={styles.contactContent}>
        <Text style={styles.contactTitle}>{title}</Text>
        <Text style={styles.contactSubtitle}>{subtitle}</Text>
      </View>
      <ChevronRight size={20} color="#cbd5e1" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          
          <ContactItem
            title="Chat with Us"
            subtitle="Available 24/7"
            icon={MessageCircle}
            onPress={() => {}}
          />
          
          <ContactItem
            title="Call Us"
            subtitle="+91 1800-123-4567"
            icon={Phone}
            onPress={() => Linking.openURL('tel:+911800123456')}
          />
          
          <ContactItem
            title="Email Us"
            subtitle="support@ombaro.com"
            icon={Mail}
            onPress={() => Linking.openURL('mailto:support@ombaro.com')}
          />

          <Text style={styles.sectionTitle}>Resources</Text>
          
          <ContactItem
            title="FAQ"
            subtitle="Frequently Asked Questions"
            icon={FileText}
            onPress={() => {}}
          />
          
          <ContactItem
            title="Terms & Conditions"
            subtitle="Read our terms"
            icon={FileText}
            onPress={() => router.push('/terms-conditions')}
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

  contactItem: {
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
    width: 48,
    height: 48,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 13,
    color: '#64748b',
  },
});