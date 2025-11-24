import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import {
  CalendarDays,
  DollarSign,
  Star,
  Package,
  Clock,
  TrendingUp,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function OverviewTab() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      {/* Stats Section - Horizontal Swipe */}
      <View style={styles.statsSection}>
        <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>
          Performance Stats
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.statsContainer, isMobile && styles.statsContainerMobile]}
          style={styles.statsScrollView}
        >
          <StatCard
            icon={<Package color="#FFFFFF" size={24} />}
            gradient={["#014D2A", "#016B3A"]}
            label="Active Services"
            value="24"
            subtitle="+3 this month"
            isMobile={isMobile}
            width={width}
          />
          <StatCard
            icon={<DollarSign color="#FFFFFF" size={24} />}
            gradient={["#016B3A", "#047857"]}
            label="Revenue (This Month)"
            value="₹45,280"
            subtitle="+18% growth"
            isMobile={isMobile}
            width={width}
          />
          <StatCard
            icon={<CalendarDays color="#FFFFFF" size={24} />}
            gradient={["#047857", "#10B981"]}
            label="Total Bookings"
            value="156"
            subtitle="+12 this week"
            isMobile={isMobile}
            width={width}
          />
          <StatCard
            icon={<Star color="#FFFFFF" size={24} fill="#FFFFFF" />}
            gradient={["#10B981", "#34D399"]}
            label="Avg. Rating"
            value="4.7"
            subtitle="Across 96 reviews"
            isMobile={isMobile}
            width={width}
          />
          <StatCard
            icon={<TrendingUp color="#FFFFFF" size={24} />}
            gradient={["#34D399", "#6EE7B7"]}
            label="Growth Rate"
            value="+18%"
            subtitle="vs last month"
            isMobile={isMobile}
            width={width}
          />
        </ScrollView>
      </View>

      {/* Today's Schedule Section */}
      <View style={[styles.scheduleSection, isMobile && styles.scheduleSectionMobile]}>
        <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>
          Today's Schedule
        </Text>
        <View style={[styles.scheduleBox, isMobile && styles.scheduleBoxMobile]}>
          <ScrollView
            style={styles.scheduleScrollView}
            contentContainerStyle={[styles.scheduleScrollContent, isMobile && styles.scheduleScrollContentMobile]}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            <ScheduleCard time="9:00 AM" client="Priya Singh" service="Swedish Massage" status="Confirmed" />
            <ScheduleCard time="11:30 AM" client="Arjun Verma" service="Deep Tissue" status="Confirmed" />
            <ScheduleCard time="2:00 PM" client="Break" service="—" status="Free" isFree />
            <ScheduleCard time="3:30 PM" client="Aarav Mehta" service="Aromatherapy" status="Pending" />
            <ScheduleCard time="5:00 PM" client="Riya Patel" service="Hot Stone" status="Confirmed" />
            <ScheduleCard time="6:30 PM" client="Available" service="—" status="Free" isFree />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const StatCard = ({ icon, gradient, label, value, subtitle, isMobile, width }) => (
  <LinearGradient
    colors={gradient}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={[
      styles.statCard,
      {
        width: isMobile ? width * 0.75 : 280,
        height: isMobile ? 130 : 150,
        marginRight: 16,
      },
    ]}
  >
    <View style={styles.statIconContainer}>
      {icon}
    </View>
    <View style={styles.statContent}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  </LinearGradient>
);

const ScheduleCard = ({ time, client, service, status, isFree }) => (
  <View style={[styles.scheduleCard, isFree && styles.scheduleCardFree]}>
    <View style={styles.scheduleTimeWrap}>
      <Text style={styles.scheduleTime}>{time}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.scheduleClient}>{client}</Text>
      <Text style={styles.scheduleService}>{service}</Text>
    </View>
    <View style={[styles.statusBadge, status === "Confirmed" && styles.statusConfirmed, status === "Pending" && styles.statusPending, isFree && styles.statusFree]}>
      <Text style={styles.statusText}>{status}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0FDF4",
  },

  statsSection: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#F0FDF4",
  },

  statsContainerMobile: {
    paddingRight: 8,
  },

  statsContainer: {
    paddingRight: 16,
  },

  statsScrollView: {
    marginBottom: 8,
  },

  statCard: {
    borderRadius: 20,
    padding: 16,
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  statIconContainer: {
    marginBottom: 12,
  },

  statContent: {
    justifyContent: "flex-end",
  },

  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
    marginBottom: 6,
  },

  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  statSubtitle: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#014D2A",
    marginBottom: 12,
  },

  sectionTitleMobile: {
    fontSize: 16,
  },

  scheduleSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },

  scheduleSectionMobile: {
    paddingHorizontal: 12,
  },

  scheduleBox: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },

  scheduleBoxMobile: {
    borderRadius: 12,
  },

  scheduleScrollView: {
    flex: 1,
  },

  scheduleScrollContent: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  scheduleScrollContentMobile: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },

  scheduleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  scheduleCardFree: {
    backgroundColor: "#F0FDF4",
    borderColor: "#BBFCE7",
  },

  scheduleTimeWrap: {
    marginRight: 12,
    minWidth: 50,
  },

  scheduleTime: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1E293B",
  },

  scheduleClient: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 2,
  },

  scheduleService: {
    fontSize: 12,
    color: "#64748B",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: "#F1F5F9",
  },

  statusConfirmed: {
    backgroundColor: "#DCFCE7",
  },

  statusPending: {
    backgroundColor: "#FEF3C7",
  },

  statusFree: {
    backgroundColor: "#D1FAE5",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#475569",
  },
});
