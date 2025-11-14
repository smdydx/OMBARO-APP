import React from 'react';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CARD_SHADOW =
  Platform.OS === 'android'
    ? { elevation: 1 }
    : { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } };

export default function TermsAndConditionsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Terms & Conditions</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, styles.cardPad]}>
          <Text style={styles.cardHeading}>SoCool Terms & Conditions</Text>

          <View style={{ gap: 16 }}>
            <Section
              title="1. Acceptance of Terms"
              content="By accessing and using the SoCool Beauty & Wellness Hub mobile application, you accept and agree to be bound by the terms and provision of this agreement."
            />
            <Section
              title="2. Booking and Cancellation Policy"
              content="All bookings made through the SoCool app are subject to availability. Cancellations made less than 2 hours before the scheduled appointment may be subject to a cancellation fee of 25% of the service price."
            />
            <Section
              title="3. Payment Terms"
              content="Payment for services must be made at the time of booking or service completion. We accept various payment methods including credit/debit cards, UPI, and digital wallets. All prices are subject to applicable taxes."
            />
            <Section
              title="4. Service Standards"
              content="SoCool partners with verified professionals and salons to ensure quality service delivery. However, we do not guarantee specific outcomes and are not liable for service quality disputes between customers and service providers."
            />
            <Section
              title="5. Privacy Policy"
              content="Your personal information is collected and used in accordance with our Privacy Policy. We are committed to protecting your privacy and personal data security."
            />
            <Section
              title="6. User Responsibilities"
              content="Users must provide accurate information during registration and booking. Any misuse of the platform, including fraudulent bookings or abusive behavior, may result in account termination."
            />
            <Section
              title="7. Limitation of Liability"
              content="SoCool's liability for any claims arising from the use of our services is limited to the amount paid for the specific service in question."
            />
            <Section
              title="8. Refund Policy"
              content="Refunds are processed on a case-by-case basis. Generally, refunds are provided for cancelled services if cancelled within the allowed timeframe or in case of service provider unavailability."
            />
            <Section
              title="9. Intellectual Property"
              content="All content, trademarks, and intellectual property on the SoCool platform are owned by SoCool or its licensors and are protected by applicable copyright and trademark laws."
            />
            <Section
              title="10. Changes to Terms"
              content="SoCool reserves the right to modify these terms and conditions at any time. Users will be notified of significant changes through the app or email."
            />
            <Section
              title="11. Contact Information"
              content="For questions about these Terms & Conditions, please contact us at support@socool.com or call our customer service at +91 80-12345678."
            />
          </View>

          <View style={styles.footerNote}>
            <Text style={styles.noteText}>Last updated: December 2024</Text>
            <Text style={[styles.noteText, { marginTop: 8 }]}>SoCool Beauty & Wellness Hub</Text>
          </View>
        </View>

        <View style={{ marginTop: 16, marginBottom: 80 }}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.back()} activeOpacity={0.9}>
            <Text style={styles.primaryBtnText}>I Understand</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, content }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionContent}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f9fafb' }, // gray-50
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingVertical: 24 },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  backBtn: { marginRight: 12, padding: 6, borderRadius: 12 },
  topTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },

  // Card
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    ...CARD_SHADOW,
  },
  cardPad: { padding: 16 },
  cardHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },

  // Section
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 8 },
  sectionContent: { fontSize: 14, color: '#374151', lineHeight: 22 },

  // Footer note inside card
  footerNote: { marginTop: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  noteText: { fontSize: 12, color: '#6b7280', textAlign: 'center' },

  // Primary button
  primaryBtn: {
    width: '100%',
    backgroundColor: '#7c3aed',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});
