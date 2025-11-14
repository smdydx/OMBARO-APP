import { LinearGradient } from 'expo-linear-gradient';
import { Filter, MapPin, Star } from 'lucide-react-native';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeNavigation } from '../../hooks/useSafeNavigation';

const { width } = Dimensions.get('window');

export default function MapViewScreen() {
  const [selectedSpa, setSelectedSpa] = useState(null);
  const [activeTab, setActiveTab] = useState('map');

  const { isNavigating, navigate } = useSafeNavigation();

  const nearbySpas = [
    {
      id: 1,
      name: 'Bliss Spa & Salon',
      rating: 4.8,
      distance: '0.5 km away',
      address: 'Koramangala 5th Block, Bangalore',
      image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg',
      services: ['Hair Styling', 'Facial', 'Manicure'],
      priceRange: '₹500-2000',
      isOpen: true,
      coordinates: { x: 45, y: 35 },
    },
    {
      id: 2,
      name: 'Zen Wellness Center',
      rating: 4.9,
      distance: '1.2 km away',
      address: 'Indiranagar 100 Feet Road, Bangalore',
      image: 'https://images.pexels.com/photos/3968056/pexels-photo-3968056.jpeg',
      services: ['Full Body Massage', 'Aromatherapy', 'Body Wrap'],
      priceRange: '₹800-3000',
      isOpen: true,
      coordinates: { x: 65, y: 25 },
    },
    {
      id: 3,
      name: 'Glamour Studio',
      rating: 4.7,
      distance: '2.1 km away',
      address: 'MG Road, Bangalore',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
      services: ['Nail Art', 'Pedicure', 'Eyebrow Threading'],
      priceRange: '₹300-1500',
      isOpen: false,
      coordinates: { x: 25, y: 60 },
    },
    {
      id: 4,
      name: 'Serenity Day Spa',
      rating: 4.6,
      distance: '3.8 km away',
      address: 'Brigade Road, Bangalore',
      image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg',
      services: ['Deep Tissue Massage', 'Hot Stone Therapy'],
      priceRange: '₹1000-4000',
      isOpen: true,
      coordinates: { x: 75, y: 70 },
    },
    {
      id: 5,
      name: 'Beauty Lounge',
      rating: 4.5,
      distance: '4.2 km away',
      address: 'HSR Layout, Bangalore',
      image: 'https://images.pexels.com/photos/3993678/pexels-photo-3993678.jpeg',
      services: ['Bridal Makeup', 'Hair Color', 'Spa'],
      priceRange: '₹600-2500',
      isOpen: true,
      coordinates: { x: 35, y: 80 },
    },
  ];

  const handleMarkerPress = spa => {
    setSelectedSpa(spa);
    setActiveTab('list');
  };

  const renderSelectedSpaCard = () => {
    if (!selectedSpa) {
      return null;
    }

    return (
      <View style={styles.selOuter}>
        <TouchableOpacity
          style={styles.selCard}
          disabled={isNavigating}
          onPress={() => navigate(`/salon-details/${selectedSpa.id}`)}
          activeOpacity={0.9}
        >
          <View style={styles.selRow}>
            <Image source={{ uri: selectedSpa.image }} style={styles.selImg} resizeMode="cover" />
            <View style={styles.selRight}>
              <View style={styles.selTopRow}>
                <Text style={styles.selName}>{selectedSpa.name}</Text>
                <View style={styles.ratingRow}>
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <Text style={styles.ratingText}>{selectedSpa.rating}</Text>
                </View>
              </View>

              <Text style={styles.selAddr}>{selectedSpa.address}</Text>

              <View style={styles.selBottomRow}>
                <Text style={styles.priceText}>{selectedSpa.priceRange}</Text>
                <Text style={styles.distText}>{selectedSpa.distance}</Text>
              </View>
            </View>
          </View>

          <View style={styles.ctaRow}>
            <TouchableOpacity style={[styles.ctaBtn, styles.ctaLight]} activeOpacity={0.9}>
              <Text style={styles.ctaLightText}>Get Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isNavigating}
              style={[styles.ctaBtn, styles.ctaPrimary]}
              onPress={() => navigate('/booking')}
              activeOpacity={0.9}
            >
              <Text style={styles.ctaPrimaryText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const MapMarker = ({ spa, onPress }) => {
    const markerStyle = {
      position: 'absolute',
      left: `${spa.coordinates.x}%`,
      top: `${spa.coordinates.y}%`,
      alignItems: 'center',
    };
    return (
      <TouchableOpacity style={markerStyle} onPress={() => onPress(spa)} activeOpacity={0.9}>
        <View
          style={[
            styles.markerDot,
            { backgroundColor: spa.isOpen ? '#22c55e' : '#9ca3af' }, // green-500 / gray-400
          ]}
        >
          <MapPin size={20} color="#fff" />
        </View>
        {spa.isOpen ? <View style={styles.markerPing} /> : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerWrap}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Spa Near You</Text>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.9}>
          <Filter size={20} color="#374151" />
        </TouchableOpacity>
      </View>
    </View>

      <View style={styles.tabWrap}>
        {[
          { id: 'map', label: 'Map View' },
          { id: 'list', label: 'List View' },
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.85}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {activeTab === 'map' ? (
          <>
            <View style={styles.mapOuter}>
              <View style={styles.mapCard}>
                <LinearGradient
                  colors={['#bfdbfe', '#e9d5ff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
                <LinearGradient
                  colors={['#93c5fd', '#bbf7d0', '#bfdbfe']}
                  start={{ x: 0.2, y: 0.1 }}
                  end={{ x: 0.9, y: 1 }}
                  style={[StyleSheet.absoluteFill, { opacity: 0.5 }]}
                />

                <View style={styles.myLocDot}>
                  <View style={styles.myLocInner} />
                </View>

                <View style={styles.hereLabel}>
                  <Text style={styles.hereLabelText}>You are here</Text>
                </View>

                {nearbySpas.map(spa => (
                  <MapMarker key={spa.id} spa={spa} onPress={handleMarkerPress} />
                ))}
              </View>

              <View style={styles.mapFooter}>
                <Text style={styles.mapFooterText}>Showing {nearbySpas.length} providers within 5km</Text>
              </View>
            </View>

            {renderSelectedSpaCard()}
          </>
        ) : (
          <>
            {renderSelectedSpaCard()}
            <View style={styles.listOuter}>
              <Text style={styles.sectionTitle}>All Nearby Spas</Text>

              {nearbySpas.map(spa => (
                <TouchableOpacity
                  key={spa.id}
                  style={styles.listCard}
                  disabled={isNavigating}
                  onPress={() => {
                    if (isNavigating) {
                      return;
                    }
                    setSelectedSpa(spa);
                    navigate(`/salon-details/${spa.id}`);
                  }}
                  activeOpacity={0.9}
                >
                  <View style={styles.listInner}>
                    <Image source={{ uri: spa.image }} style={styles.listImg} resizeMode="cover" />
                    <View style={styles.listRight}>
                      <View style={styles.listTopRow}>
                        <Text style={styles.listName}>{spa.name}</Text>
                        <View style={styles.ratingRow}>
                          <Star size={14} color="#fbbf24" fill="#fbbf24" />
                          <Text style={styles.ratingText}>{spa.rating}</Text>
                        </View>
                      </View>

                      <Text style={styles.listServices} numberOfLines={1}>
                        {spa.services.slice(0, 2).join(', ')}
                        {spa.services.length > 2 ? `... +${spa.services.length - 2} more` : ''}
                      </Text>

                      <View style={styles.listBottomRow}>
                        <Text style={styles.priceText}>{spa.priceRange}</Text>
                        <View style={styles.openRow}>
                          <View
                            style={[
                              styles.dot,
                              { backgroundColor: spa.isOpen ? '#22c55e' : '#ef4444' },
                            ]}
                          />
                          <Text style={styles.distText}>{spa.distance}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_SHADOW =
  Platform.OS === 'android'
    ? { elevation: 1 }
    : { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } };

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f9fafb' }, // gray-50
  headerWrap: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 8 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 22, fontWeight: '800', color: '#111827' },
  filterBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabWrap: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#ffffff',
    ...CARD_SHADOW,
  },
  tabText: { fontSize: 14, fontWeight: '600', color: '#6b7280' },
  tabTextActive: { color: '#111827' },

  scroll: { flex: 1 },

  // Map block
  mapOuter: { marginHorizontal: 24, marginBottom: 24 },
  mapCard: {
    height: 320,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    ...CARD_SHADOW,
    backgroundColor: '#e5e7eb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  myLocDot: {
    position: 'absolute',
    left: '50%',
    top: '45%',
    marginLeft: -15,
    marginTop: -15,
    width: 30,
    height: 30,
    backgroundColor: '#3b82f6',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myLocInner: { width: 12, height: 12, backgroundColor: '#fff', borderRadius: 6 },
  hereLabel: {
    position: 'absolute',
    left: '42%',
    top: '52%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  hereLabelText: { fontSize: 12, fontWeight: '600', color: '#374151' },
  markerDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...CARD_SHADOW,
  },
  markerPing: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34d399',
    marginTop: -4,
  },
  mapFooter: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  mapFooterText: { fontSize: 13, color: '#4b5563', textAlign: 'center' },

  // Selected card
  selOuter: { marginHorizontal: 24, marginBottom: 24 },
  selCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    padding: 16,
    ...CARD_SHADOW,
  },
  selRow: { flexDirection: 'row' },
  selImg: { width: 80, height: 80, borderRadius: 12, marginRight: 12, backgroundColor: '#e5e7eb' },
  selRight: { flex: 1 },
  selTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  selName: { fontSize: 16, fontWeight: '700', color: '#111827' },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 12, color: '#374151', fontWeight: '600', marginLeft: 4 },
  selAddr: { fontSize: 13, color: '#4b5563', marginBottom: 6 },
  selBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceText: { fontSize: 13, color: '#7c3aed', fontWeight: '700' },
  distText: { fontSize: 12, color: '#6b7280' },

  ctaRow: { flexDirection: 'row', marginTop: 12 },
  ctaBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLight: { backgroundColor: '#ede9fe', marginRight: 8 }, // violet-100
  ctaLightText: { color: '#6d28d9', fontWeight: '700' },   // violet-700
  ctaPrimary: { backgroundColor: '#7c3aed' },              // purple-600
  ctaPrimaryText: { color: '#fff', fontWeight: '700' },

  // List
  listOuter: { paddingHorizontal: 24, paddingBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 12 },
  listCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 12,
    ...CARD_SHADOW,
  },
  listInner: { padding: 16, flexDirection: 'row' },
  listImg: { width: 64, height: 64, borderRadius: 12, marginRight: 12, backgroundColor: '#e5e7eb' },
  listRight: { flex: 1 },
  listTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  listName: { fontSize: 16, fontWeight: '700', color: '#111827' },
  listServices: { fontSize: 13, color: '#4b5563', marginBottom: 6 },
  listBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  openRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
});
