
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  CheckCircle2,
} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const sw = (val) => (width / 375) * val;

const COLORS = {
  primary: "#014D2A",
  primaryLight: "#10B981",
  accent: "#00FF87",
  text: "#014D2A",
  textMuted: "#047857",
  border: "#D1FAE5",
  cardBg: "#FAFFFE",
  surface: "#FFFFFF",
};

export default function TodayAppointments() {
  const router = useRouter();

  const appointments = [
    {
      id: 1,
      client: "Rahul Sharma",
      service: "Deep Tissue Massage",
      time: "10:00 AM - 11:00 AM",
      location: "Lotus Spa, Connaught Place",
      phone: "+91 98765 43210",
      status: "upcoming",
    },
    {
      id: 2,
      client: "Priya Verma",
      service: "Swedish Massage",
      time: "11:30 AM - 12:30 PM",
      location: "Serenity Wellness, Nehru Place",
      phone: "+91 98765 43211",
      status: "upcoming",
    },
    {
      id: 3,
      client: "Amit Kumar",
      service: "Aromatherapy",
      time: "02:00 PM - 03:00 PM",
      location: "Green Leaf Spa, Saket",
      phone: "+91 98765 43212",
      status: "upcoming",
    },
    {
      id: 4,
      client: "Neha Singh",
      service: "Hot Stone Massage",
      time: "04:00 PM - 05:00 PM",
      location: "Bliss Spa, Vasant Kunj",
      phone: "+91 98765 43213",
      status: "completed",
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primaryLight, COLORS.primary]}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={sw(24)} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Today's Appointments</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Appointment Schedule</Text>

        {appointments.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={styles.clientInfo}>
                <View style={styles.avatarCircle}>
                  <User size={sw(20)} color={COLORS.primary} strokeWidth={2.5} />
                </View>
                <View style={styles.clientDetails}>
                  <Text style={styles.clientName}>{appointment.client}</Text>
                  <Text style={styles.serviceName}>{appointment.service}</Text>
                </View>
              </View>
              {appointment.status === "completed" && (
                <View style={styles.completedBadge}>
                  <CheckCircle2 size={sw(16)} color="#10B981" strokeWidth={2.5} />
                  <Text style={styles.completedText}>Done</Text>
                </View>
              )}
            </View>

            <View style={styles.appointmentDetails}>
              <View style={styles.detailRow}>
                <Clock size={sw(16)} color={COLORS.textMuted} strokeWidth={2} />
                <Text style={styles.detailText}>{appointment.time}</Text>
              </View>
              <View style={styles.detailRow}>
                <MapPin size={sw(16)} color={COLORS.textMuted} strokeWidth={2} />
                <Text style={styles.detailText}>{appointment.location}</Text>
              </View>
              <View style={styles.detailRow}>
                <Phone size={sw(16)} color={COLORS.textMuted} strokeWidth={2} />
                <Text style={styles.detailText}>{appointment.phone}</Text>
              </View>
            </View>

            {appointment.status === "upcoming" && (
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Start Session</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
                  <Text style={styles.secondaryButtonText}>Contact Client</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: sw(50),
    paddingBottom: sw(20),
    paddingHorizontal: sw(20),
  },
  backButton: {
    width: sw(40),
    height: sw(40),
    borderRadius: sw(12),
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: sw(20),
    fontWeight: "800",
    color: "#FFFFFF",
  },
  placeholder: {
    width: sw(40),
  },
  content: {
    flex: 1,
    padding: sw(20),
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: COLORS.cardBg,
    borderRadius: sw(16),
    padding: sw(20),
    marginBottom: sw(24),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: sw(28),
    fontWeight: "900",
    color: COLORS.primary,
    marginBottom: sw(4),
  },
  statLabel: {
    fontSize: sw(13),
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: sw(12),
  },
  sectionTitle: {
    fontSize: sw(18),
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: sw(16),
  },
  appointmentCard: {
    backgroundColor: COLORS.surface,
    borderRadius: sw(16),
    padding: sw(16),
    marginBottom: sw(16),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: sw(16),
  },
  clientInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarCircle: {
    width: sw(48),
    height: sw(48),
    borderRadius: sw(24),
    backgroundColor: COLORS.primaryLight + "20",
    alignItems: "center",
    justifyContent: "center",
    marginRight: sw(12),
  },
  clientDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: sw(16),
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: sw(2),
  },
  serviceName: {
    fontSize: sw(14),
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D1FAE5",
    paddingHorizontal: sw(12),
    paddingVertical: sw(6),
    borderRadius: sw(20),
  },
  completedText: {
    fontSize: sw(12),
    fontWeight: "700",
    color: "#10B981",
    marginLeft: sw(4),
  },
  appointmentDetails: {
    gap: sw(12),
    marginBottom: sw(16),
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: sw(14),
    fontWeight: "600",
    color: COLORS.text,
    marginLeft: sw(8),
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    gap: sw(12),
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: sw(12),
    borderRadius: sw(12),
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: sw(14),
    fontWeight: "700",
    color: "#FFFFFF",
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    fontSize: sw(14),
    fontWeight: "700",
    color: COLORS.primary,
  },
});
