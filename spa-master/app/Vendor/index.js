import { LinearGradient } from "expo-linear-gradient";
import { CalendarDays, DollarSign, ExternalLink, Package } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import AnalyticsTab from "./AnalyticsTab";
import BookingsTab from "./BookingsTab";
import OverviewTab from "./OverviewTab";
import ReviewTab from "./ReviewTab";
import ServicesTab from "./ServicesTab";
import TherapistTab from "./TherapistTab";


export default function VendorPortal() {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = useMemo(
    () => ({
      Overview: OverviewTab,
      Services: ServicesTab,
      Revenue: TherapistTab,
      Bookings: BookingsTab,
      Review:ReviewTab,
      Analytics:AnalyticsTab,
    }),
    []
  );

  const ActiveComponent = tabs[activeTab] ?? OverviewTab;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient
        colors={['#00FF87', '#016B3A', '#013B1F', '#012B17']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Vendor Portal</Text>
            <Text style={styles.subtitle}>Serenity Spa & Wellness • ID:</Text>
            <Text style={styles.subtitle}>9876543234</Text>
          </View>
          <TouchableOpacity style={styles.jumpBtn}>
            <ExternalLink color="#fff" size={18} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* STATS CARDS */}
      <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
        <StatCard
          tint="#e0ecff"
          Icon={<Package size={20} color="#2563eb" />}
          label="Active Services"
          value="24"
          sub="+3 this month"
        />
        <StatCard
          tint="#dcfce7"
          Icon={<DollarSign size={20} color="#16a34a" />}
          label="Monthly Revenue"
          value="₹45,280"
          sub="+18% growth"
          big
        />
        <StatCard
          tint="#efe2ff"
          Icon={<CalendarDays size={20} color="#7c3aed" />}
          label="Total Bookings"
          value="156"
          sub="+12 this week"
        />
      </View>

      {/* TABS */}
      <View style={styles.tabsRow}>
        {Object.keys(tabs).map((label) => {
          const active = activeTab === label;
          return (
            <TouchableOpacity key={label} onPress={() => setActiveTab(label)}>
              <Text style={[styles.tab, active && styles.tabActive]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* CONDITIONAL RENDER */}
      <ActiveComponent />
    </ScrollView>
  );
}

/* ---- Small components ---- */
const StatCard = ({ tint, Icon, label, value, sub, big }) => (
  <View style={styles.card}>
    <View style={[styles.iconWrap, { backgroundColor: tint }]}>{Icon}</View>
    <View style={{ flex: 1 }}>
      <Text style={[styles.value, big && styles.valueBig]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.sub}>{sub}</Text>
    </View>
  </View>
);

/* ---- Styles ---- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "800" },
  subtitle: { color: "#e6e6e6", marginTop: 2, fontSize: 14 },
  jumpBtn: {
    width: 38,
    height: 38,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eef2f7",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  value: { fontSize: 22, fontWeight: "800", color: "#0f172a", textAlign: "right" },
  valueBig: { fontSize: 26 },
  label: { fontSize: 15, color: "#334155" },
  sub: { color: "#94a3b8", fontSize: 12, marginTop: 6 },

  tabsRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  tab: {
    marginRight: 24,
    paddingVertical: 12,
    color: "#6b7280",
    fontWeight: "600",
  },
  tabActive: {
    color: "#7c3aed",
    borderBottomWidth: 2,
    borderBottomColor: "#7c3aed",
  },

  tabBody: { padding: 16 },
  tabBodyText: { color: "#64748b" },
});