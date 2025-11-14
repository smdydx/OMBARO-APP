import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Calendar, Clock, MapPin, User } from 'lucide-react-native';
import { useState } from 'react';
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const COLORS = {
  bg: "#f0f9ff",
  cardBg: "#FFFFFF",
  text: "#1e3a8a",
  textMuted: "#64748b",
  border: "#e0f2fe",
  navyBlue: "#1e3a8a",
  lightBlue: "#3b82f6",
  accent: "#60a5fa",
};

const STATUS_STYLES = {
  confirmed: { bg: '#dcfce7', text: '#166534' }, // green-100 / green-800
  pending: { bg: '#fef9c3', text: '#854d0e' },   // yellow-100 / yellow-800
  completed: { bg: '#dbeafe', text: '#1e40af' }, // blue-100 / blue-800
  cancelled: { bg: '#fee2e2', text: '#991b1b' }, // red-100 / red-800
  default: { bg: '#f3f4f6', text: '#1f2937' },   // gray-100 / gray-800
};

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const router = useRouter();


  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);


  const upcomingBookings = [
    {
      id: 1,
      salonName: 'Bliss Spa & Salon',
      service: 'Hair Styling + Facial',
      date: 'Today, 2:30 PM',
      address: 'Koramangala, Bangalore',
      price: 1200,
      status: 'confirmed',
      image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg',
      rating: 4.8,
    },
    {
      id: 2,
      salonName: 'Zen Wellness Center',
      service: 'Full Body Massage',
      date: 'Tomorrow, 11:00 AM',
      address: 'Indiranagar, Bangalore',
      price: 2000,
      status: 'pending',
      image: 'https://images.pexels.com/photos/3968056/pexels-photo-3968056.jpeg',
      rating: 4.9,
    },
  ];

  const pastBookings = [
    {
      id: 3,
      salonName: 'Glamour Studio',
      service: 'Manicure + Pedicure',
      date: '2 days ago',
      address: 'MG Road, Bangalore',
      price: 800,
      status: 'completed',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
      rating: 4.7,
    },
  ];

  const StatusPill = ({ status }) => {
    const s = STATUS_STYLES[status] ?? STATUS_STYLES.default;
    return (
      <View style={[styles.statusPill, { backgroundColor: s.bg }]}>
        <Text style={[styles.statusPillText, { color: s.text }]}>{String(status).toUpperCase()}</Text>
      </View>
    );
  };

  const BookingCard = ({ booking }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => router.push(`/order-tracking/${booking.id}`)}
    >
      <View style={styles.cardInner}>
        <View style={styles.row}>
          <Image source={{ uri: booking.image }} style={styles.cardImage} resizeMode="cover" />
          <View style={styles.flex1}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardTitle}>{booking.salonName}</Text>
              <StatusPill status={booking.status} />
            </View>

            <Text style={styles.serviceText}>{booking.service}</Text>

            <View style={styles.iconRow}>
              <Clock size={14} color="#9ca3af" />
              <Text style={styles.iconRowText}>{booking.date}</Text>
            </View>

            <View style={styles.footerRow}>
              <View style={styles.addressRow}>
                <MapPin size={14} color="#9ca3af" />
                <Text style={styles.iconRowText}>{booking.address}</Text>
              </View>
              <Text style={styles.priceText}>₹{booking.price}</Text>
            </View>
          </View>
        </View>

        {booking.status === 'confirmed' && (
          <View style={styles.ctaRow}>

            <TouchableOpacity style={[styles.ctaBtn, styles.ctaPrimaryLight]}>
              <Text style={styles.ctaPrimaryLightText}>Track Order</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              setSelectedBooking(booking);
              setDrawerOpen(true);
            }}
              style={[styles.ctaBtn, styles.ctaGray]}>
              <Text style={styles.ctaGrayText}>Reschedule</Text>
            </TouchableOpacity>
          </View>
        )}

        {booking.status === 'completed' && (
          <TouchableOpacity style={styles.rateBtn}>
            <Text style={styles.rateBtnText}>Rate & Review</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const EmptyUpcoming = () => (
    <View style={styles.emptyWrap}>
      <Calendar size={64} color="#d1d5db" />
      <Text style={styles.emptyTitle}>No upcoming bookings</Text>
      <Text style={styles.emptySubtitle}>Book your next beauty session to see it here</Text>
      <TouchableOpacity
        style={styles.bookNowBtn}
        onPress={() => router.push('/(tabs)/index')}
      >
        <Text style={styles.bookNowText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );

  const EmptyPast = () => (
    <View style={styles.emptyWrap}>
      <User size={64} color="#d1d5db" />
      <Text style={styles.emptyTitle}>No past bookings</Text>
      <Text style={styles.emptySubtitle}>Your completed bookings will appear here</Text>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <LinearGradient
        colors={['#00FF87', '#016B3A', '#013B1F', '#012B17']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <Text style={styles.screenTitle}>My Bookings</Text>
            <Text style={styles.subtitle}>Track your beauty sessions</Text>
          </View>

          {/* Tabs */}
          <View style={styles.tabsWrap}>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'upcoming' && styles.tabBtnActive]}
              onPress={() => setActiveTab('upcoming')}
            >
              <Text style={[styles.tabText, activeTab === 'upcoming' ? styles.tabTextActive : styles.tabTextInactive]}>
                Upcoming
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'past' && styles.tabBtnActive]}
              onPress={() => setActiveTab('past')}
            >
              <Text style={[styles.tabText, activeTab === 'past' ? styles.tabTextActive : styles.tabTextInactive]}>
                Past
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        paddingVertical={12}
      >
        {activeTab === 'upcoming' ? (
          upcomingBookings.length ? (
            upcomingBookings.map((b) => <BookingCard key={b.id} booking={b} />)
          ) : (
            <EmptyUpcoming />
          )
        ) : pastBookings.length ? (
          pastBookings.map((b) => <BookingCard key={b.id} booking={b} />)
        ) : (
          <EmptyPast />
        )}
      </ScrollView>


      {drawerOpen && selectedBooking && (
        <View style={styles.drawerOverlay}>
          {/* dim background - tap to close */}
          <TouchableOpacity style={styles.drawerBackdrop} activeOpacity={1} onPress={() => setDrawerOpen(false)} />

          {/* sheet */}
          <View style={styles.drawer}>
            {/* Header */}
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>Booking Details</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setDrawerOpen(false)}>
                <Text style={{ fontSize: 18 }}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 24 }}
            >
              {/* Top card */}
              <View style={styles.detailTopRow}>
                <Image source={{ uri: selectedBooking.image }} style={styles.detailImage} />
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={styles.detailTitle} numberOfLines={2}>
                    {selectedBooking.service}
                  </Text>
                  <Text style={styles.detailSub}>{selectedBooking.salonName}</Text>

                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>Upcoming</Text>
                    </View>
                    <Text style={styles.detailPrice}>₹{selectedBooking.price}</Text>
                  </View>
                </View>
              </View>

              {/* Key/Value box */}
              <View style={styles.kvBox}>
                <View style={styles.kvRow}>
                  <Text style={styles.kvKey}>Booking ID:</Text>
                  <Text style={styles.kvVal}>BK00{selectedBooking.id}</Text>
                </View>
                <View style={styles.kvRow}>
                  <Text style={styles.kvKey}>Date & Time:</Text>
                  <Text style={styles.kvVal}>{selectedBooking.date}</Text>
                </View>
                <View style={styles.kvRow}>
                  <Text style={styles.kvKey}>Duration:</Text>
                  <Text style={styles.kvVal}>1h 30m</Text>
                </View>
                <View style={styles.kvRow}>
                  <Text style={styles.kvKey}>Location:</Text>
                  <Text style={styles.kvVal}>{selectedBooking.address}</Text>
                </View>
              </View>

              {/* Therapist (placeholder) */}
              <View style={styles.therapistCard}>
                <Text style={styles.therapistTitle}>Your Therapist</Text>
                <View style={styles.therapistRow}>
                  <Image
                    source={{ uri: "https://i.pravatar.cc/100?img=48" }}
                    style={styles.therapistAvatar}
                  />
                  <Text style={styles.therapistName}>Priya Sharma</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}

const CARD_BORDER = Platform.OS === 'android' ? {} : { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } };

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    marginTop: 8,
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },

  // Tabs
  tabsWrap: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 4,
    marginTop: 8,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#ffffff',
  },
  tabText: { fontWeight: '700' },
  tabTextActive: { color: COLORS.navyBlue },
  tabTextInactive: { color: '#ffffff' },

  // List
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 10, paddingBottom: 24 },

  // Card
  card: {
    backgroundColor: COLORS.cardBg, // Using card background color
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border, // Using the border color
    marginBottom: 12,
    ...CARD_BORDER,
    ...(Platform.OS === 'android' ? { elevation: 1 } : null),
  },
  cardInner: { padding: 16 },
  row: { flexDirection: 'row' },
  flex1: { flex: 1 },
  cardImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#e5e7eb',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text, // Using the text color
    paddingRight: 8,
    flexShrink: 1,
  },
  serviceText: {
    fontSize: 13,
    color: COLORS.textMuted, // Using the muted text color
    marginBottom: 6,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  iconRowText: {
    fontSize: 12,
    color: COLORS.textMuted, // Using the muted text color
    marginLeft: 6,
    flexShrink: 1,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressRow: { flexDirection: 'row', alignItems: 'center', maxWidth: width * 0.55 },
  priceText: { fontSize: 16, fontWeight: '800', color: COLORS.navyBlue },

  // Status pill
  statusPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
  },

  // CTAs
  ctaRow: { flexDirection: 'row', marginTop: 12 },
  ctaBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaPrimaryLight: { backgroundColor: '#016B3A', marginRight: 8 },
  ctaPrimaryLightText: { color: '#ffffff', fontWeight: '700' },
  ctaGray: { backgroundColor: COLORS.border },
  ctaGrayText: { color: COLORS.navyBlue, fontWeight: '700' },

  rateBtn: {
    marginTop: 12,
    backgroundColor: '#dbeafe',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateBtnText: { color: COLORS.navyBlue, fontWeight: '700' },

  // Empty states
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  emptySubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  bookNowBtn: {
    marginTop: 14,
    backgroundColor: COLORS.navyBlue,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  bookNowText: { color: '#fff', fontWeight: '700' },












  // Drawer
drawerOverlay: {
  ...StyleSheet.absoluteFillObject,
  zIndex: 99,
  justifyContent: "flex-end",
},
drawerBackdrop: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "rgba(0,0,0,0.35)",
},
drawer: {
  maxHeight: "82%",
  backgroundColor: COLORS.cardBg, // Using card background color
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  paddingHorizontal: 16,
  paddingTop: 12,
  zIndex: 100,
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: -6 },
  elevation: 10,
},
drawerHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 8,
},
drawerTitle: { fontSize: 20, fontWeight: "800", color: COLORS.text }, // Using text color
closeBtn: {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: COLORS.border, // Using border color
  alignItems: "center",
  justifyContent: "center",
},

// Top row
detailTopRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
detailImage: { width: 88, height: 88, borderRadius: 14, backgroundColor: "#e5e7eb" },
detailTitle: { fontSize: 20, fontWeight: "800", color: COLORS.text }, // Using text color
detailSub: { marginTop: 4, fontSize: 14, color: COLORS.textMuted }, // Using muted text color
badge: {
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 999,
  backgroundColor: "#dbeafe",
},
badgeText: { fontSize: 12, fontWeight: "800", color: COLORS.navyBlue },
detailPrice: { marginLeft: 12, fontSize: 16, fontWeight: "800", color: COLORS.navyBlue },

// KV box
kvBox: {
  marginTop: 16,
  backgroundColor: COLORS.bg, // Using background color
  borderRadius: 16,
  borderWidth: 1,
  borderColor: COLORS.border, // Using border color
  padding: 16,
},
kvRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 8,
},
kvKey: { fontSize: 16, color: COLORS.textMuted }, // Using muted text color
kvVal: { fontSize: 18, color: COLORS.text, fontWeight: "800" }, // Using text color

// Therapist
therapistCard: {
  marginTop: 16,
  padding: 14,
  borderRadius: 16,
  backgroundColor: COLORS.bg, // Using background color
  borderWidth: 1,
  borderColor: COLORS.border, // Using border color
},
therapistTitle: { fontSize: 16, fontWeight: "800", color: COLORS.text, marginBottom: 8 }, // Using text color
therapistRow: { flexDirection: "row", alignItems: "center" },
therapistAvatar: { width: 42, height: 42, borderRadius: 21, marginRight: 10 },
therapistName: { fontSize: 15, fontWeight: "700", color: COLORS.text }, // Using text color

});