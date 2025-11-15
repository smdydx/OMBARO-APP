import {
  FileText,
  Plus,
  UserCheck,
  Building2,
  Users,
  ClipboardList,
  TrendingUp,
} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Platform,
  Pressable, // Import Pressable
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Overview() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={{ flex: 1, backgroundColor: "#F0FDF4" }}>
      {/* Stats Section - Horizontal Swipe - Fixed at top */}
      <View style={styles.statsSection}>
        <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>
          Overview Stats
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.statsContainer, isMobile && styles.statsContainerMobile]}
          style={styles.statsScrollView}
        >
          <StatCard
            icon={<Building2 color="#014D2A" size={24} />}
            gradient={["#014D2A", "#016B3A"]}
            label="Total Spas"
            value="24"
            subtitle="+3 this month"
            isMobile={isMobile}
            width={width}
          />
          <StatCard
            icon={<Users color="#FFFFFF" size={24} />}
            gradient={["#016B3A", "#047857"]}
            label="Active Vendors"
            value="156"
            subtitle="+12 this week"
            isMobile={isMobile}
            width={width}
          />
          <StatCard
            icon={<ClipboardList color="#FFFFFF" size={24} />}
            gradient={["#047857", "#10B981"]}
            label="Pending Items"
            value="8"
            subtitle="Needs attention"
            isMobile={isMobile}
            width={width}
          />
          <StatCard
            icon={<TrendingUp color="#FFFFFF" size={24} />}
            gradient={["#10B981", "#34D399"]}
            label="Revenue"
            value="₹4.2L"
            subtitle="+18% growth"
            isMobile={isMobile}
            width={width}
          />
        </ScrollView>
      </View>

      {/* Recent Activity - Scrollable Container */}
      <View style={[styles.activitySection, isMobile && styles.activitySectionMobile]}>
        <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>
          Recent Activity
        </Text>
        <View style={[styles.activityBox, isMobile && styles.activityBoxMobile]}>
          <ScrollView
            style={styles.activityScrollView}
            contentContainerStyle={[styles.activityScrollContent, isMobile && styles.activityScrollContentMobile]}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            <ActivityCard
              icon={<Plus color="#047857" size={20} />}
              title="Serenity Spa successfully onboarded"
              desc="Added 12 services, verified documentation"
              time="2 hours ago"
              isMobile={isMobile}
            />
            <ActivityCard
              icon={<FileText color="#016B3A" size={20} />}
              title="Bliss Spa details updated"
              desc="Contact information and operating hours modified"
              time="1 day ago"
              isMobile={isMobile}
            />
            <ActivityCard
              icon={<UserCheck color="#10B981" size={20} />}
              title="New vendor partnership approved"
              desc="Ayurvedic Wellness Center joined the platform"
              time="3 days ago"
              isMobile={isMobile}
            />
            <ActivityCard
              icon={<Plus color="#047857" size={20} />}
              title="Serenity Spa successfully onboarded"
              desc="Added 12 services, verified documentation"
              time="2 hours ago"
              isMobile={isMobile}
            />
            <ActivityCard
              icon={<FileText color="#016B3A" size={20} />}
              title="Bliss Spa details updated"
              desc="Contact information and operating hours modified"
              time="1 day ago"
              isMobile={isMobile}
            />
            <ActivityCard
              icon={<UserCheck color="#10B981" size={20} />}
              title="New vendor partnership approved"
              desc="Ayurvedic Wellness Center joined the platform"
              time="3 days ago"
              isMobile={isMobile}
            />
          </ScrollView>
        </View>
      </View>
    </View>
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

const ActivityCard = ({ icon, title, desc, time, isMobile }) => (
  <View style={[styles.activityCard, isMobile && styles.activityCardMobile]}>
    <View style={styles.activityRow}>
      <View style={styles.activityIconWrap}>
        {icon}
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={[styles.activityTitle, isMobile && styles.activityTitleMobile]}>
          {title}
        </Text>
        <Text style={[styles.activityDesc, isMobile && styles.activityDescMobile]}>
          {desc}
        </Text>
      </View>
    </View>
    <Text style={[styles.activityTime, isMobile && styles.activityTimeMobile]}>{time}</Text>
  </View>
);

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
  statCard: {
    width: 180,
    borderRadius: 20,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#014D2A",
        shadowOpacity: 0.25,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 6,
      },
    }),
  },
  statCardMobile: {
    width: 160,
    padding: 16,
  },
  statIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  statValueMobile: {
    fontSize: 24,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(255,255,255,0.95)",
    marginBottom: 4,
  },
  statLabelMobile: {
    fontSize: 13,
  },
  statSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.85)",
    fontWeight: "600",
  },
  statSubtitleMobile: {
    fontSize: 11,
  },
  activitySection: {
    flex: 1,
    paddingBottom: 20,
  },
  activitySectionMobile: {
    paddingBottom: 15,
  },
  activityBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#D1FAE5",
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
  activityBoxMobile: {
    marginHorizontal: 14,
    borderRadius: 16,
  },
  activityScrollView: {
    flex: 1,
  },
  activityScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  activityScrollContentMobile: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    gap: 10,
  },
  activityCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityCardMobile: {
    padding: 14,
    borderRadius: 14,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    marginRight: 12,
  },
  activityIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E6F7EE",
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
  },
  activityTitle: {
    fontWeight: "800",
    fontSize: 14,
    color: "#014D2A",
    marginBottom: 4,
  },
  activityTitleMobile: {
    fontSize: 13,
  },
  activityDesc: {
    color: "#047857",
    fontSize: 13,
    lineHeight: 18,
  },
  activityDescMobile: {
    fontSize: 12,
    lineHeight: 16,
  },
  activityTime: {
    color: "#9CA3AF",
    fontSize: 11,
    fontWeight: "600",
  },
  activityTimeMobile: {
    fontSize: 10,
  },
});