
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, Calendar, Check, DollarSign, Star, X } from 'lucide-react-native';

const COLORS = {
  bg: "#FFFFFF",
  surface: "#FFFFFF",
  text: "#014D2A",
  textMuted: "#047857",
  border: "#D1FAE5",
  divider: "#E6F7EE",
  primary: "#014D2A",
  primaryLight: "#10B981",
  primaryDark: "#013B1F",
  accent: "#00FF87",
  danger: "#EF4444",
  dangerLight: "#FEE2E2",
  success: "#10B981",
  successLight: "#D1FAE5",
  warning: "#F59E0B",
  cardBg: "#FAFFFE",
};

const notifications = [
  {
    id: 1,
    type: 'booking',
    icon: Calendar,
    iconColor: COLORS.primary,
    iconBg: COLORS.successLight,
    title: 'New Booking Confirmed',
    message: 'Your booking for Swedish Massage has been confirmed for tomorrow at 3:00 PM',
    time: '2 mins ago',
    unread: true,
    details: 'Booking ID: #BK12345\nService: Swedish Massage\nDate: Tomorrow, 3:00 PM\nLocation: Spa Center, Downtown\nTherapist: Sarah Johnson',
  },
  {
    id: 2,
    type: 'payment',
    icon: DollarSign,
    iconColor: COLORS.success,
    iconBg: COLORS.successLight,
    title: 'Payment Successful',
    message: 'Your payment of ₹2,500 has been processed successfully',
    time: '1 hour ago',
    unread: true,
    details: 'Transaction ID: TXN987654\nAmount: ₹2,500\nPayment Method: Credit Card\nStatus: Success\nDate: Today, 2:30 PM',
  },
  {
    id: 3,
    type: 'review',
    icon: Star,
    iconColor: COLORS.warning,
    iconBg: '#FEF3C7',
    title: 'New Review Received',
    message: 'You received a 5-star review from John Doe',
    time: '3 hours ago',
    unread: false,
    details: 'Rating: 5 Stars\nReviewer: John Doe\nComment: "Excellent service! The massage was very relaxing and the staff was professional."\nService: Deep Tissue Massage',
  },
  {
    id: 4,
    type: 'reminder',
    icon: Bell,
    iconColor: COLORS.primary,
    iconBg: COLORS.successLight,
    title: 'Appointment Reminder',
    message: 'You have an appointment scheduled for tomorrow at 10:00 AM',
    time: '5 hours ago',
    unread: false,
    details: 'Service: Facial Treatment\nDate: Tomorrow, 10:00 AM\nLocation: Beauty Salon, Main Street\nDuration: 60 minutes\nPlease arrive 10 minutes early',
  },
  {
    id: 5,
    type: 'offer',
    icon: Check,
    iconColor: COLORS.success,
    iconBg: COLORS.successLight,
    title: 'Special Offer Available',
    message: 'Get 20% off on all spa services this weekend',
    time: '1 day ago',
    unread: false,
    details: 'Offer: 20% OFF Weekend Special\nValid Till: This Sunday\nApplicable Services: All Spa Services\nPromo Code: WEEKEND20\nTerms: Minimum booking value ₹1,500',
  },
];

export default function Notifications() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const screenWidth = Dimensions.get("window").width;
  const isMobile = screenWidth < 768;

  const handleNotificationPress = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedNotification(null);
  };

  const NotificationItem = ({ item }) => {
    const Icon = item.icon;
    return (
      <TouchableOpacity
        style={[styles.notifItem, item.unread && styles.unreadNotif]}
        onPress={() => handleNotificationPress(item)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconWrap, { backgroundColor: item.iconBg }]}>
          <Icon size={20} color={item.iconColor} strokeWidth={2.5} />
        </View>
        <View style={styles.notifContent}>
          <Text style={styles.notifTitle}>{item.title}</Text>
          <Text style={styles.notifDesc} numberOfLines={2}>{item.message}</Text>
          <Text style={styles.notifTime}>{item.time}</Text>
        </View>
        {item.unread && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />
      
      <LinearGradient
        colors={[COLORS.primaryLight, COLORS.primary, COLORS.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Recent Notifications</Text>
          {notifications.map((item) => (
            <NotificationItem key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notification Details</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
                <X size={24} color={COLORS.text} strokeWidth={2.5} />
              </TouchableOpacity>
            </View>

            {selectedNotification && (
              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                <View style={[styles.modalIconWrap, { backgroundColor: selectedNotification.iconBg }]}>
                  {React.createElement(selectedNotification.icon, {
                    size: 32,
                    color: selectedNotification.iconColor,
                    strokeWidth: 2.5,
                  })}
                </View>
                
                <Text style={styles.modalNotifTitle}>{selectedNotification.title}</Text>
                <Text style={styles.modalNotifMessage}>{selectedNotification.message}</Text>
                <Text style={styles.modalNotifTime}>{selectedNotification.time}</Text>

                <View style={styles.divider} />

                <Text style={styles.detailsTitle}>Details</Text>
                <Text style={styles.detailsText}>{selectedNotification.details}</Text>

                <TouchableOpacity style={styles.actionBtn} onPress={closeModal}>
                  <LinearGradient
                    colors={[COLORS.primaryLight, COLORS.primary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.actionBtnGradient}
                  >
                    <Text style={styles.actionBtnText}>Got it</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: COLORS.bg,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 20 : 30,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backBtn: { 
    width: 40, 
    height: 40, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  scroll: { flex: 1 },
  container: { 
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 16,
  },

  notifItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  unreadNotif: {
    backgroundColor: COLORS.successLight,
    borderColor: COLORS.primaryLight,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  notifDesc: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
    marginBottom: 6,
  },
  notifTime: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  closeBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    padding: 20,
  },
  modalIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalNotifTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalNotifMessage: {
    fontSize: 15,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  modalNotifTime: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 20,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 22,
    marginBottom: 20,
  },
  actionBtn: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionBtnGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
