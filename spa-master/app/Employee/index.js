import { LinearGradient } from "expo-linear-gradient";
import {
  AlertCircle,
  BarChart2,
  MapPin,
  Search,
  Users
} from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Attendance from "./Attendance";
import Overview from "./Overview";
import PendingApproval from "./pending-approval";
import Report from "./report";
import SpaManagement from "./spa-management";

const { width } = Dimensions.get("window");

export default function EmployeeDashboard() {
  const [selectedTab, setSelectedTab] = useState("Overview");

  // Map tab labels to components
  const tabMap = useMemo(
    () => ({
      Overview: Overview,
      "Spa Management": SpaManagement,
      "Pending Approvals": PendingApproval,
      Report: Report,
      Attendance: Attendance,
    }),
    []
  );

  const CurrentTabComponent = tabMap[selectedTab] ?? Overview;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <StatusBar backgroundColor="#016B3A" barStyle="dark-content" hidden={false} animated={true} />

      <LinearGradient
        colors={['#00FF87', '#016B3A', '#013B1F', '#012B17']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.title}>Employee Dashboard</Text>
        <Text style={styles.subtitle}>Welcome back, Employee ID: 0987654345</Text>

        <View style={styles.searchBox}>
          <Search size={18} color="#999" />
          <TextInput
            placeholder="Search spas, vendors, or services"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.filterBtn} >
            <Search color="#fff" size={18} />
            <Text>
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* STATS CARDS */}
      <View style={styles.statsContainer}>
        <StatCard
          icon={<MapPin color="#a855f7" size={20} />}
          title="Total Spas"
          value="47"
          subText="+5 this month"
        />
        <StatCard
          icon={<Users color="#22c55e" size={20} />}
          title="Active Vendors"
          value="32"
          subText="+3 this week"
        />
        <StatCard
          icon={<AlertCircle color="#f59e0b" size={20} />}
          title="Pending Approvals"
          value="8"
          subText="2 urgent"
        />
        <StatCard
          icon={<BarChart2 color="#3b82f6" size={20} />}
          title="Monthly Revenue"
          value="₹2.4L"
          subText="+12% growth"
        />
      </View>

      {/* TABS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
      >
        {Object.keys(tabMap).map((label) => {
          const active = selectedTab === label;
          return (
            <TouchableOpacity key={label} onPress={() => setSelectedTab(label)}>
              <Text style={[styles.tab, active && styles.activeTab]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* CONDITIONAL CONTENT */}
      <CurrentTabComponent />
    </ScrollView>
  );
}

// --- COMPONENTS ---
const StatCard = ({ icon, title, value, subText }) => (
  <View style={styles.statCard}>
    <View style={styles.iconCircle}>{icon}</View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statSub}>{subText}</Text>
  </View>
);

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: { color: "#fff", fontSize: 20, fontWeight: "700" },
  subtitle: { color: "#e0e0e0", marginTop: 4 },
  searchBox: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  searchInput: { flex: 1, marginLeft: 8, color: "#333" },
  filterBtn: { backgroundColor: "#016B3A", padding: 5, borderRadius: 8 },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  statCard: {
    width: width / 2 - 24,
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },
  statValue: { fontSize: 18, fontWeight: "700", marginTop: 8 },
  statTitle: { color: "#444", fontSize: 14 },
  statSub: { color: "#888", fontSize: 12 },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 16,
  },
  tab: { marginRight: 24, paddingVertical: 10, color: "#777" },
  activeTab: { color: "#0284c7", borderBottomWidth: 2, borderBottomColor: "#0284c7" },
});
