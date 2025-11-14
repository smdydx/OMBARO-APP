// TherapistTab.js
import { LinearGradient } from "expo-linear-gradient";
import { CalendarDays, Star, UserPlus, Users } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TherapistTab() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Section header + CTA */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>My Therapists</Text>

        <TouchableOpacity activeOpacity={0.9} style={styles.manageBtnWrap}>
          <LinearGradient
            colors={["#0ea5e9", "#0369a1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.manageBtn}
          >
            <UserPlus size={16} color="#fff" />
            <Text style={styles.manageBtnText}>Manage Therapists</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Promo / Info card */}
      <View style={styles.promoCard}>
        <View style={styles.promoIconWrap}>
          <Users size={28} color="#7c3aed" />
        </View>
        <Text style={styles.promoTitle}>Complete Therapist Management</Text>
        <Text style={styles.promoText}>
          Add therapists to your team, manage their profiles, assign bookings,
          and track their performance — all in one place.
        </Text>

        <LinearGradient
          colors={["#0ea5e9", "#0369a1"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.promoCTA}
        >
          <Text style={styles.promoCTAText}>Go to Therapist Management</Text>
        </LinearGradient>
      </View>

      {/* Metrics */}
      <View style={styles.metricsGrid}>
        <MetricTile
          tint="#e0f2fe"
          Icon={<Users size={18} color="#0284c7" />}
          value="5"
          label="Active Therapists"
        />
        <MetricTile
          tint="#dcfce7"
          Icon={<CalendarDays size={18} color="#16a34a" />}
          value="12"
          label="Assignments Today"
        />
        <MetricTile
          tint="#fef3c7"
          Icon={<Star size={18} color="#f59e0b" fill="#f59e0b" />}
          value="4.7"
          label="Avg. Rating"
        />
      </View>
    </ScrollView>
  );
}

/* Reusable small component */
const MetricTile = ({ tint, Icon, value, label }) => (
  <View style={styles.metricCard}>
    <View style={[styles.metricIcon, { backgroundColor: tint }]}>{Icon}</View>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

/* Styles */
const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 16 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  heading: { fontSize: 18, fontWeight: "800", color: "#0f172a" },

  manageBtnWrap: { marginLeft: 8 },
  manageBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  manageBtnText: { color: "#fff", fontWeight: "700", marginLeft: 6, fontSize: 13 },

  promoCard: {
    backgroundColor: "#fff7fb",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#fde2f3",
    alignItems: "center",
    marginBottom: 14,
  },
  promoIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#f2e8ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },
  promoText: {
    color: "#6b7280",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 18,
  },
  promoCTA: {
    marginTop: 14,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
  },
  promoCTAText: { color: "#fff", fontWeight: "800" },

  metricsGrid: { gap: 12 },
  metricCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#eef2f7",
    alignItems: "center",
  },
  metricIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  metricValue: { fontSize: 22, fontWeight: "800", color: "#0f172a" },
  metricLabel: { color: "#334155", marginTop: 2, fontSize: 13 },
});
