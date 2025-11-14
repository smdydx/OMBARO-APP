
import React from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Heart, Star, MapPin } from 'lucide-react-native';

export default function Favorites() {
  const router = useRouter();

  const favorites = [
    {
      id: 1,
      name: 'Luxury Spa & Wellness',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
      rating: 4.8,
      reviews: 245,
      location: 'Indiranagar, Bangalore',
      price: '₹1,200',
    },
    {
      id: 2,
      name: 'Elite Beauty Salon',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
      rating: 4.6,
      reviews: 189,
      location: 'Koramangala, Bangalore',
      price: '₹900',
    },
  ];

  const FavoriteCard = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <TouchableOpacity style={styles.heartBtn}>
        <Heart size={20} color="#dc2626" fill="#dc2626" />
      </TouchableOpacity>
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
        
        <View style={styles.ratingRow}>
          <Star size={14} color="#fbbf24" fill="#fbbf24" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
        </View>

        <View style={styles.locationRow}>
          <MapPin size={14} color="#64748b" />
          <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceText}>Starting from {item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.count}>{favorites.length} Saved Places</Text>
          {favorites.map((item) => (
            <FavoriteCard key={item.id} item={item} />
          ))}
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
  count: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 16,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#e5e7eb',
  },
  heartBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 13,
    color: '#64748b',
    marginLeft: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 13,
    color: '#64748b',
    marginLeft: 4,
    flex: 1,
  },
  priceRow: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e3a8a',
  },
});