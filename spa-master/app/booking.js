import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function BookingScreen() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const router = useRouter();

  const services = [
    { id: 1, name: 'Hair Styling', duration: '1 hour', price: 800, image: '💇‍♀️' },
    { id: 2, name: 'Facial Treatment', duration: '45 mins', price: 1200, image: '🧴' },
    { id: 3, name: 'Full Body Massage', duration: '90 mins', price: 2000, image: '💆‍♀️' },
    { id: 4, name: 'Manicure + Pedicure', duration: '1.5 hours', price: 600, image: '💅' },
  ];

  const dates = [
    { id: 1, date: 'Today',    day: '15', available: true  },
    { id: 2, date: 'Tomorrow', day: '16', available: true  },
    { id: 3, date: 'Wed',      day: '17', available: true  },
    { id: 4, date: 'Thu',      day: '18', available: false },
    { id: 5, date: 'Fri',      day: '19', available: true  },
  ];

  const times = [
    '9:00 AM','10:30 AM','12:00 PM','1:30 PM',
    '3:00 PM','4:30 PM','6:00 PM','7:30 PM',
  ];

  const canBook = !!(selectedService && selectedDate && selectedTime);

  const handleBookNow = () => {
    if (canBook) router.push('/payment');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Salon info */}
        <View style={[styles.card, styles.cardPad]}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg' }}
              style={styles.salonImg}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.salonName}>Bliss Spa & Salon</Text>
              <Text style={styles.salonAddr}>Koramangala 5th Block, Bangalore</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.salonRating}>⭐ 4.8</Text>
                <Text style={styles.salonDistance}>0.5 km away</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Service</Text>
          {services.map((service) => {
            const active = selectedService?.id === service.id;
            return (
              <TouchableOpacity
                key={service.id}
                onPress={() => setSelectedService(service)}
                activeOpacity={0.9}
                style={[
                  styles.serviceRow,
                  active ? styles.serviceRowActive : styles.serviceRowIdle,
                ]}
              >
                <Text style={styles.serviceEmoji}>{service.image}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceMeta}>{service.duration}</Text>
                </View>
                <Text style={styles.servicePrice}>₹{service.price}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row' }}>
              {dates.map((d, idx) => {
                const active = selectedDate?.id === d.id;
                const disabled = !d.available;
                return (
                  <TouchableOpacity
                    key={d.id}
                    disabled={disabled}
                    onPress={() => d.available && setSelectedDate(d)}
                    activeOpacity={0.9}
                    style={[
                      styles.dateChip,
                      idx !== dates.length - 1 && { marginRight: 12 },
                      disabled && styles.dateChipDisabled,
                      active && styles.dateChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dateChipTextTop,
                        disabled && styles.textMuted,
                        active && styles.textOnPrimary,
                      ]}
                    >
                      {d.date}
                    </Text>
                    <Text
                      style={[
                        styles.dateChipTextBottom,
                        disabled && styles.textMuted,
                        active && styles.textOnPrimary,
                      ]}
                    >
                      {d.day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {times.map((t) => {
              const active = selectedTime === t;
              return (
                <TouchableOpacity
                  key={t}
                  onPress={() => setSelectedTime(t)}
                  activeOpacity={0.9}
                  style={[
                    styles.timeChip,
                    active ? styles.timeChipActive : styles.timeChipIdle,
                  ]}
                >
                  <Text
                    style={[
                      styles.timeText,
                      active ? styles.textOnPrimary : styles.timeTextIdle,
                    ]}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Booking Summary */}
        {selectedService && (
          <View style={[styles.card, styles.cardPad]}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>
            <View style={{ gap: 8 }}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey}>Service</Text>
                <Text style={styles.summaryVal}>{selectedService.name}</Text>
              </View>
              {selectedDate && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryKey}>Date</Text>
                  <Text style={styles.summaryVal}>
                    {selectedDate.date} {selectedDate.day}
                  </Text>
                </View>
              )}
              {selectedTime && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryKey}>Time</Text>
                  <Text style={styles.summaryVal}>{selectedTime}</Text>
                </View>
              )}
              <View style={styles.summaryTotalRow}>
                <Text style={styles.summaryTotalLabel}>Total</Text>
                <Text style={styles.summaryTotalValue}>₹{selectedService.price}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Book Now Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleBookNow}
          disabled={!canBook}
          activeOpacity={0.9}
          style={[styles.bookBtn, !canBook ? styles.bookBtnDisabled : styles.bookBtnActive]}
        >
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const CARD_SHADOW =
  Platform.OS === 'android'
    ? { elevation: 1 }
    : { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } };

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f9fafb' }, // gray-50
  scroll: { flex: 1 },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16 },
  backBtn: { marginRight: 12, padding: 6, borderRadius: 12 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },

  // Cards
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

  // Salon
  salonImg: { width: 64, height: 64, borderRadius: 12, marginRight: 12, backgroundColor: '#e5e7eb' },
  salonName: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 2 },
  salonAddr: { fontSize: 13, color: '#4b5563', marginBottom: 6 },
  salonRating: { fontSize: 13, color: '#7c3aed', fontWeight: '700' },
  salonDistance: { fontSize: 12, color: '#6b7280', marginLeft: 8 },

  // Sections
  section: { paddingHorizontal: 24, marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 12 },

  // Service rows
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...CARD_SHADOW,
  },
  serviceRowIdle: { borderWidth: 1, borderColor: '#f3f4f6' },
  serviceRowActive: { borderWidth: 2, borderColor: '#7c3aed' },
  serviceEmoji: { fontSize: 28, marginRight: 12 },
  serviceName: { fontSize: 15, fontWeight: '700', color: '#111827' },
  serviceMeta: { fontSize: 13, color: '#6b7280' },
  servicePrice: { fontSize: 16, fontWeight: '800', color: '#7c3aed' },

  // Date chips
  dateChip: {
    width: 80,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    backgroundColor: '#ffffff',
  },
  dateChipActive: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  dateChipDisabled: { backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' },
  dateChipTextTop: { fontSize: 13, fontWeight: '600', color: '#111827' },
  dateChipTextBottom: { marginTop: 4, fontSize: 16, fontWeight: '800', color: '#111827' },
  textOnPrimary: { color: '#ffffff' },
  textMuted: { color: '#9ca3af' },

  // Time chips
  timeChip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  timeChipIdle: { backgroundColor: '#ffffff', borderColor: '#e5e7eb' },
  timeChipActive: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  timeText: { fontSize: 13, fontWeight: '700' },
  timeTextIdle: { color: '#374151' },

  // Summary
  summaryTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 10 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryKey: { color: '#6b7280' },
  summaryVal: { color: '#111827', fontWeight: '600' },
  summaryTotalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  summaryTotalLabel: { fontSize: 16, fontWeight: '700', color: '#111827' },
  summaryTotalValue: { fontSize: 16, fontWeight: '800', color: '#7c3aed' },

  // Footer
  footer: { paddingHorizontal: 24, paddingBottom: 24, paddingTop: 12, backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  bookBtn: { width: '100%', paddingVertical: 14, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  bookBtnActive: { backgroundColor: '#7c3aed' },
  bookBtnDisabled: { backgroundColor: '#d1d5db' },
  bookBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});
