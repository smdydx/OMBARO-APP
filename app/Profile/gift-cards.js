
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
import { ArrowLeft, Gift, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GiftCards() {
  const router = useRouter();

  const giftCards = [
    { id: 1, code: 'OMBARO500', balance: 500, expiry: '31 Dec 2025' },
    { id: 2, code: 'WELCOME100', balance: 100, expiry: '15 Mar 2025' },
  ];

  const GiftCardItem = ({ item }) => (
    <LinearGradient
      colors={['#1e3a8a', '#3b82f6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.giftCard}
    >
      <View style={styles.giftCardHeader}>
        <Gift size={28} color="#fff" />
        <Text style={styles.giftCardBalance}>₹{item.balance}</Text>
      </View>
      <Text style={styles.giftCardCode}>{item.code}</Text>
      <Text style={styles.giftCardExpiry}>Valid till {item.expiry}</Text>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gift Cards</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>My Gift Cards</Text>
          {giftCards.map((item) => (
            <GiftCardItem key={item.id} item={item} />
          ))}

          <TouchableOpacity style={styles.redeemBtn}>
            <Plus size={20} color="#1e3a8a" />
            <Text style={styles.redeemText}>Redeem Gift Card</Text>
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
    marginBottom: 16,
  },

  giftCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  giftCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  giftCardBalance: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
  },
  giftCardCode: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 8,
  },
  giftCardExpiry: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },

  redeemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    borderWidth: 2,
    borderColor: '#1e3a8a',
    borderStyle: 'dashed',
  },
  redeemText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e3a8a',
    marginLeft: 8,
  },
});