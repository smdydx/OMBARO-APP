import {
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Building2,
  FileCheck,
  Plus,
  Shield,
} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Platform,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Overview() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: "#F0FDF4" }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={!isMobile}
    >
      {/* Stats Section - Horizontal Swipe */}
      <View style={styles.statsSection}>
        <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>
          Key Metrics
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.statsContainer, isMobile && styles.statsContainerMobile]}
          style={styles.statsScrollView}
        >
          <StatCard
            icon={<Users color="#FFFFFF" size={24} />}
            gradient={["#014D2A", "#016B3A"]}
            label="Total Users"
            value="2,847"
            subtitle="+245 this month"
            isMobile={isMobile}
            width={width}
          />
          <StatCard
            icon={<Building2 color="#FFFFFF" size={24} />}
            gradient={["#016B3A", "#047857"]}
            label="Active Spas"
            value="158"
            subtitle="+8 this month"
            isMobile={isMobile}
            width={width}
          />
          <StatCard
            icon={<DollarSign color="#FFFFFF" size={24} />}
            gradient={["#047857", "#10B981"]}
            label="Revenue"
            value="₹8.4L"
            subtitle="+22% growth"
            isMobile={isMobile}
            width={width}
          />
          <StatCard
            icon={<FileCheck color="#FFFFFF" size={24} />}
            gradient={["#10B981", "#34D399"]}
            label="Pending"
            value="12"
            subtitle="Action needed"
            isMobile={isMobile}
            width={width}
          />
          <StatCard
            icon={<Shield color="#FFFFFF" size={24} />}
            gradient={["#7C3AED", "#A855F7"]}
            label="Total Roles"
            value="21"
            subtitle="System roles"
            isMobile={isMobile}
            width={width}
          />
        </ScrollView>
      </View>

      {/* System Alerts - Scrollable Messages */}
      <View style={[styles.alertsSection, isMobile && styles.alertsSectionMobile]}>
        <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>
          System Alerts
        </Text>
        <ScrollView
          style={[styles.alertsBox, isMobile && styles.alertsBoxMobile]}
          contentContainerStyle={[styles.alertsScrollContent, isMobile && styles.alertsScrollContentMobile]}
          showsVerticalScrollIndicator={false}
          scrollIndicatorInsets={{ bottom: 1000, right: 1000, top: 1000, left: 1000 }}
          scrollEnabled={true}
          nestedScrollEnabled={isMobile}
        >
          <AlertCard
            icon={<AlertCircle color="#EF4444" size={20} />}
            title="Multiple Failed Login Attempts"
            desc="5 failed attempts from IP 192.168.1.1"
            type="critical"
            isMobile={isMobile}
          />
          <AlertCard
            icon={<CheckCircle color="#10B981" size={20} />}
            title="Monthly Revenue Target Achieved"
            desc="Exceeded target by 15%, ₹10L+ earned"
            type="success"
            isMobile={isMobile}
          />
          <AlertCard
            icon={<CheckCircle color="#10B981" size={20} />}
            title="Database Backup Completed"
            desc="Daily backup successful at 02:30 AM"
            type="success"
            isMobile={isMobile}
          />
          <AlertCard
            icon={<Clock color="#F59E0B" size={20} />}
            title="Vendor Registration Requests Pending"
            desc="12 new vendor registrations await approval"
            type="warning"
            isMobile={isMobile}
          />
          <AlertCard
            icon={<AlertCircle color="#EF4444" size={20} />}
            title="Low Disk Space"
            desc="Server disk space below 10% capacity"
            type="critical"
            isMobile={isMobile}
          />
          <AlertCard
            icon={<Clock color="#F59E0B" size={20} />}
            title="SSL Certificate Expiring"
            desc="Certificate expires in 30 days"
            type="warning"
            isMobile={isMobile}
          />
          <AlertCard
            icon={<Plus color="#10B981" size={20} />}
            title="New Feature Deployed"
            desc="Mobile app version 2.1 is now live"
            type="success"
            isMobile={isMobile}
          />
          <AlertCard
            icon={<Clock color="#F59E0B" size={20} />}
            title="Maintenance Window Scheduled"
            desc="Scheduled maintenance on Dec 25, 2-4 AM"
            type="warning"
            isMobile={isMobile}
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const StatCard = ({ icon, gradient, label, value, subtitle, isMobile, width }) => (
  <Pressable
    style={({ pressed }) => [
      {
        width: isMobile ? width * 0.85 : 320,
        height: isMobile ? 140 : 160,
        marginRight: 16,
        borderRadius: 24,
        padding: 0,
        transform: [{ scale: pressed ? 0.97 : 1 }],
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          android: {
            elevation: 4,
          },
        }),
      },
    ]}
  >
    <LinearGradient colors={gradient} style={{ flex: 1, borderRadius: 24, padding: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 36, fontWeight: "900", color: "#fff", marginBottom: 8 }}>
          {value}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff", marginBottom: 4 }}>
          {label}
        </Text>
        <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.9)" }}>
          {subtitle}
        </Text>
      </View>
      <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.25)", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </View>
    </LinearGradient>
  </Pressable>
);

const AlertCard = ({ icon, title, desc, type, isMobile }) => {
  const colors = {
    critical: "#FEF2F2",
    success: "#F0FDF4",
    warning: "#FFFBEB",
  };

  return (
    <View style={[styles.alertCard, { backgroundColor: colors[type] }, isMobile && styles.alertCardMobile]}>
      <View style={styles.alertRow}>
        <View style={styles.alertIconWrap}>
          {icon}
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={[styles.alertTitle, isMobile && styles.alertTitleMobile]}>
            {title}
          </Text>
          <Text style={[styles.alertDesc, isMobile && styles.alertDescMobile]}>
            {desc}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    marginVertical: 16,
    paddingHorizontal: 16,
    color: "#014D2A",
    letterSpacing: 0.3,
  },
  sectionTitleMobile: {
    fontSize: 18,
    paddingHorizontal: 14,
    marginVertical: 12,
  },
  statsScrollView: {
    paddingVertical: 4,
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingRight: 32,
    gap: 14,
  },
  statsContainerMobile: {
    paddingHorizontal: 14,
    gap: 12,
  },
  alertsSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 80,
    minHeight: 300,
  },
  alertsSectionMobile: {
    paddingHorizontal: 14,
    paddingBottom: 60,
    minHeight: 250,
  },
  alertsBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    maxHeight: 500,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  alertsBoxMobile: {
    borderRadius: 16,
    maxHeight: 400,
  },
  alertsScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  alertsScrollContentMobile: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 10,
  },
  alertCard: {
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#014D2A",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  alertCardMobile: {
    padding: 14,
    borderRadius: 14,
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  alertIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(1, 77, 42, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#014D2A",
    marginBottom: 4,
  },
  alertTitleMobile: {
    fontSize: 13,
    marginBottom: 3,
  },
  alertDesc: {
    fontSize: 12,
    color: "#047857",
    lineHeight: 18,
  },
  alertDescMobile: {
    fontSize: 11,
    lineHeight: 16,
  },
});
