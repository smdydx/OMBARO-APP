import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, Smartphone, Wallet, Check, Shield } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const CARD_SHADOW =
  Platform.OS === 'android'
    ? { elevation: 1 }
    : { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } };

export default function PaymentScreen() {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const router = useRouter();

  const paymentMethods = [
    { id: 'card', title: 'Credit/Debit Card', icon: CreditCard, subtitle: 'Secure payment via cards' },
    { id: 'upi', title: 'UPI Payment', icon: Smartphone, subtitle: 'Pay via Google Pay, PhonePe, etc.' },
    { id: 'wallet', title: 'Digital Wallet', icon: Wallet, subtitle: 'Paytm, Amazon Pay, etc.' },
  ];

  const bookingDetails = {
    service: 'Hair Styling',
    salon: 'Bliss Spa & Salon',
    date: 'Today',
    time: '2:30 PM',
    price: 800,
    discount: 80,
    tax: 144,
  };

  const totalAmount = useMemo(
    () => bookingDetails.price - bookingDetails.discount + bookingDetails.tax,
    [bookingDetails]
  );

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      router.push('/order-tracking/1');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={[styles.card, styles.cardPad]}>
          <Text style={styles.cardTitle}>Order Summary</Text>

          <View style={{ gap: 8 }}>
            <View style={styles.rowBetween}>
              <Text style={styles.muted}>Service</Text>
              <Text style={styles.semibold}>{bookingDetails.service}</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.muted}>Salon</Text>
              <Text style={styles.semibold}>{bookingDetails.salon}</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.muted}>Date & Time</Text>
              <Text style={styles.semibold}>
                {bookingDetails.date}, {bookingDetails.time}
              </Text>
            </View>
          </View>

          <View style={styles.dividerBlock}>
            <View style={styles.rowBetween}>
              <Text style={styles.muted}>Service Price</Text>
              <Text style={styles.semibold}>₹{bookingDetails.price}</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={{ color: '#16a34a' }}>Discount</Text>
              <Text style={{ color: '#16a34a', fontWeight: '600' }}>-₹{bookingDetails.discount}</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.muted}>Tax & Fees</Text>
              <Text style={styles.semibold}>₹{bookingDetails.tax}</Text>
            </View>
            <View style={[styles.rowBetween, styles.totalTop]}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{totalAmount}</Text>
            </View>
          </View>
        </View>

        {/* Promo Code */}
        <View style={[styles.card, styles.cardPad]}>
          <Text style={styles.cardTitle}>Promo Code</Text>
          <View style={styles.promoRow}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
              placeholderTextColor="#9ca3af"
            />
            <TouchableOpacity style={styles.promoBtn}>
              <Text style={styles.promoBtnText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={[styles.card, styles.cardPad]}>
          <Text style={styles.cardTitle}>Payment Method</Text>

          {paymentMethods.map((m) => {
            const active = selectedPayment === m.id;
            return (
              <TouchableOpacity
                key={m.id}
                onPress={() => setSelectedPayment(m.id)}
                activeOpacity={0.9}
                style={[styles.methodRow, active ? styles.methodActive : styles.methodIdle]}
              >
                <View style={styles.methodIconWrap}>
                  <m.icon size={20} color={active ? '#a855f7' : '#6b7280'} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.methodTitle}>{m.title}</Text>
                  <Text style={styles.methodSub}>{m.subtitle}</Text>
                </View>

                {active && (
                  <View style={styles.checkWrap}>
                    <Check size={14} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Security Info */}
        <View style={styles.secureCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.secureIcon}>
              <Shield size={16} color="#22c55e" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.secureTitle}>100% Secure Payment</Text>
              <Text style={styles.secureSub}>Your payment information is encrypted and secure</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Pay Now */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handlePayment} activeOpacity={0.9} style={styles.payBtn}>
          <Text style={styles.payBtnText}>Pay ₹{totalAmount}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f9fafb' }, // gray-50
  scroll: { flex: 1 },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16 },
  backBtn: { marginRight: 12, padding: 6, borderRadius: 12 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },

  // Card
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginHorizontal: 24,
    marginBottom: 16,
    ...CARD_SHADOW,
  },
  cardPad: { padding: 16 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 12 },

  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
  muted: { color: '#6b7280' },
  semibold: { color: '#111827', fontWeight: '600' },

  dividerBlock: { borderTopWidth: 1, borderTopColor: '#f3f4f6', marginTop: 12, paddingTop: 12, gap: 8 },
  totalTop: { paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  totalLabel: { fontSize: 16, fontWeight: '700', color: '#111827' },
  totalValue: { fontSize: 16, fontWeight: '800', color: '#7c3aed' },

  // Promo
  promoRow: { flexDirection: 'row' },
  promoInput: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 15,
    color: '#111827',
  },
  promoBtn: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  promoBtnText: { color: '#ffffff', fontWeight: '700' },

  // Methods
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  methodIdle: { backgroundColor: '#f9fafb', borderColor: '#e5e7eb' },
  methodActive: { backgroundColor: '#faf5ff', borderColor: '#8b5cf6', borderWidth: 2 },
  methodIconWrap: {
    width: 40,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  methodTitle: { fontSize: 15, fontWeight: '700', color: '#111827' },
  methodSub: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  checkWrap: {
    width: 24,
    height: 24,
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Secure info
  secureCard: {
    backgroundColor: '#ecfdf5',
    borderColor: '#d1fae5',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  secureIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#d1fae5',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  secureTitle: { fontSize: 13, fontWeight: '700', color: '#065f46' },
  secureSub: { fontSize: 12, color: '#059669', marginTop: 4 },

  // Footer
  footer: { paddingHorizontal: 24, paddingBottom: 24, paddingTop: 12, backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  payBtn: { width: '100%', paddingVertical: 14, borderRadius: 16, backgroundColor: '#7c3aed', alignItems: 'center', justifyContent: 'center' },
  payBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});
