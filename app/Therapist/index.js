// TherapistProfile.js
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  BarChart2,
  CalendarDays,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  MapPin,
  Star,
  TrendingUp,
  User2,
  XCircle,
} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TherapistProfile() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient
        colors={["#d946ef", "#7c3aed"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Priya Sharma</Text>
            <Text style={styles.subtitle}>
              Swedish Massage, Deep Tissue, Aromatherapy
            </Text>

            <View style={styles.pillsRow}>
              <View style={styles.pill}>
                <View style={[styles.dot, { backgroundColor: "#22c55e" }]} />
                <Text style={styles.pillText}>Available</Text>
              </View>
              <View style={styles.pill}>
                <Star size={12} color="#fff" />
                <Text style={styles.pillText}>4.8</Text>
              </View>
              <View style={styles.pill}>
                <Text style={styles.pillText}>5 years exp</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.jumpBtn}>
            <ExternalLink size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* KPI CARDS */}
      <View style={styles.cardsWrap}>
        <KPI
          Icon={<CalendarDays size={20} color="#2563eb" />}
          tint="#e0ecff"
          value="0"
          label="Today's Tasks"
          sub="2 pending"
        />
        <KPI
          Icon={<CheckCircle2 size={20} color="#16a34a" />}
          tint="#dcfce7"
          value="93.3%"
          label="Completion Rate"
          sub="+5% this month"
          rightAlign
        />
        <KPI
          Icon={<Star size={20} color="#f59e0b" />}
          tint="#fef3c7"
          value="4.7"
          label="Average Rating"
          sub="156 reviews"
        />
        <KPI
          Icon={<TrendingUp size={20} color="#7c3aed" />}
          tint="#efe2ff"
          value="₹125k"
          label="Total Earnings"
          sub="+12% growth"
          rightAlign
        />
      </View>

      {/* QUICK ACTIONS */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.grid}>
        <QuickBtn
          icon={<CalendarDays size={18} color="#2563eb" />}
          label="Assignments"
          tint="#e0ecff"
          nav="Therapist/assisnements"
        />
        <QuickBtn
          icon={<Clock size={18} color="#16a34a" />}
          label="Schedule"
          tint="#dcfce7"
          nav="/Therapist/mySchedule"

        />
        <QuickBtn
          icon={<MapPin size={18} color="#f59e0b" />}
          label="Location"
          tint="#fef3c7"
          nav="/Therapist/myLocation"

        />
        <QuickBtn
          icon={<XCircle size={18} color="#ef4444" />}
          label="Leaves"
          tint="#fee2e2"
          nav="/Therapist/LeaveRequest"

        />
        <QuickBtn
          icon={<DollarSign size={18} color="#7c3aed" />}
          label="Earnings"
          tint="#efe2ff"
          nav="/Therapist/assisnements"

        />
        <QuickBtn
          icon={<BarChart2 size={18} color="#f59e0b" />}
          label="Performance"
          tint="#fff7ed"
          nav="/Therapist/performance-review"

        />
        <QuickBtn
          icon={<User2 size={18} color="#0891b2" />}
          label="Profile"
          tint="#cffafe"
          nav="/Therapist/profile"
        />
      </View>

      {/* TODAY'S ASSIGNMENTS */}
      <View style={styles.block}>
        <View style={styles.blockHead}>
          <Text style={styles.blockTitle}>Today's Assignments</Text>
          <Text style={styles.muted}>0 tasks</Text>
        </View>

        <View style={styles.emptyWrap}>
          <CalendarDays size={36} color="#c7cdd8" />
          <Text style={styles.emptyTitle}>No assignments for today</Text>
          <Text style={styles.emptySub}>You're all caught up!</Text>
        </View>
      </View>
    </ScrollView>
  );
}

/* --- Small components --- */
const KPI = ({ Icon, tint, value, label, sub, rightAlign }) => (
  <View style={styles.kpiCard}>
    <View style={[styles.kpiIcon, { backgroundColor: tint }]}>{Icon}</View>
    <View style={{ flex: 1 }}>
      <Text
        style={[styles.kpiValue, rightAlign && { textAlign: "right" }]}
        numberOfLines={1}
      >
        {value}
      </Text>
      <Text
        style={[styles.kpiLabel, rightAlign && { textAlign: "right" }]}
        numberOfLines={1}
      >
        {label}
      </Text>
      <Text style={styles.kpiSub}>{sub}</Text>
    </View>
  </View>
);

const QuickBtn = ({ icon, label, tint ,nav}) => {
  const router = useRouter();
  return(
    <TouchableOpacity onPress={()=>router.push(nav)} activeOpacity={0.9} style={styles.quickBtn}>
    <View style={[styles.quickIcon, { backgroundColor: tint }]}>{icon}</View>
    <Text style={styles.quickText}>{label}</Text>
  </TouchableOpacity>
  )
};

/* --- Styles --- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 20,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  headerRow: { flexDirection: "row", alignItems: "flex-start" },
  title: { color: "#fff", fontSize: 22, fontWeight: "800" },
  subtitle: { color: "#e6e6e6", marginTop: 4 },
  pillsRow: { flexDirection: "row", gap: 8, marginTop: 10, flexWrap: "wrap" },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  pillText: { color: "#fff", fontWeight: "600", fontSize: 12 },
  dot: { width: 6, height: 6, borderRadius: 999, marginRight: 2 },
  jumpBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  cardsWrap: { paddingHorizontal: 16, marginTop: 12 },
  kpiCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eef2f7",
    flexDirection: "row",
    alignItems: "center",
  },
  kpiIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  kpiValue: { fontSize: 22, fontWeight: "800", color: "#0f172a" },
  kpiLabel: { color: "#334155", fontSize: 14 },
  kpiSub: { color: "#94a3b8", fontSize: 12, marginTop: 6 },

  sectionTitle: {
    fontWeight: "800",
    color: "#0f172a",
    fontSize: 16,
    marginTop: 14,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  grid: {
    paddingHorizontal: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  quickBtn: {
    width: "48%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },
  quickIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  quickText: { fontWeight: "700", color: "#0f172a" },

  block: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#eef2f7",
    padding: 14,
  },
  blockHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  blockTitle: { fontWeight: "800", color: "#0f172a", fontSize: 16 },
  muted: { color: "#94a3b8" },

  emptyWrap: {
    paddingVertical: 28,
    alignItems: "center",
    gap: 6,
  },
  emptyTitle: { fontWeight: "800", color: "#111827", marginTop: 8 },
  emptySub: { color: "#94a3b8", marginTop: 2 },
});
