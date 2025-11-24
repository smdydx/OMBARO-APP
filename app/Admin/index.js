
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  BarChart2,
  Building2,
  FileCheck,
  Grid3x3,
  Home,
  User,
  Bell,
  Search,
  MapPin,
  Users,
  ChevronRight,
  Shield,
  Settings,
  Package,
  DollarSign,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
  StyleSheet,
} from "react-native";

import Overview from "./Overview";
import UserManagement from "./QuickAction/UserManagement";
import SpaManagement from "./QuickAction/SpaManagement";
import Approvals from "./QuickAction/Approvals";
import Analytics from "./QuickAction/Analytics";
import SecurityCenter from "./QuickAction/SecurityCenter";
import SystemSettings from "./QuickAction/SystemSettings";
import LocationTracking from "./QuickAction/LocationTracking";
import VendorApproval from "./QuickAction/VendorApproval";
import SystemAlerts from "./QuickAction/SystemAlerts";

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

export default function AdminDashboard() {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;
  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;

  const styles = getStyles(screenWidth, isMobile, isTablet);

  const [selectedTab, setSelectedTab] = useState("Overview");
  const [activeBottomTab, setActiveBottomTab] = useState("home");
  const [unreadCount, setUnreadCount] = useState(5);

  const coreTabMap = useMemo(
    () => ({
      Overview: Overview,
      "User Management": UserManagement,
      "Spa Management": SpaManagement,
      Analytics: Analytics,
      Approvals: Approvals,
    }),
    []
  );

  const quickActionMap = useMemo(
    () => ({
      "User Management": UserManagement,
      "Spa Management": SpaManagement,
      "Vendor Approval": VendorApproval,
      "Analytics": Analytics,
      "Approvals": Approvals,
      "Security Center": SecurityCenter,
      "System Settings": SystemSettings,
      "Location Tracking": LocationTracking,
      "System Alerts": SystemAlerts,
    }),
    []
  );

  const allTabMap = { ...coreTabMap, ...quickActionMap };

  const quickActions = [
    { id: "user-management", label: "User Management", icon: Users, tab: "User Management", color: COLORS.primary },
    { id: "spa-management", label: "Spa Management", icon: Building2, tab: "Spa Management", color: COLORS.primary },
    { id: "vendor-approval", label: "Vendor Approval", icon: Package, tab: "Vendor Approval", color: COLORS.primary },
    { id: "analytics", label: "Analytics Dashboard", icon: BarChart2, tab: "Analytics", color: COLORS.primary },
    { id: "approvals", label: "Pending Approvals", icon: FileCheck, tab: "Approvals", color: COLORS.primary },
    { id: "security", label: "Security Center", icon: Shield, tab: "Security Center", color: COLORS.primary },
    { id: "location", label: "Location Tracking", icon: MapPin, tab: "Location Tracking", color: COLORS.primary },
    { id: "system-settings", label: "System Settings", icon: Settings, tab: "System Settings", color: COLORS.primary },
    { id: "system-alerts", label: "System Alerts", icon: Bell, tab: "System Alerts", color: COLORS.primary },
  ];

  const bottomNavItems = [
    { id: "home", label: "Home", icon: Home, tab: "Overview" },
    { id: "users", label: "Users", icon: Users, tab: "User Management" },
    { id: "spas", label: "Spas", icon: Building2, tab: "Spa Management" },
    { id: "analytics", label: "Analytics", icon: BarChart2, tab: "Analytics" },
    { id: "more", label: "More", icon: Grid3x3, tab: "QuickActions" },
  ];

  const handleBottomNavPress = (item) => {
    setActiveBottomTab(item.id);
    setSelectedTab(item.tab);
  };

  const handleQuickActionPress = (action) => {
    setSelectedTab(action.tab);
    setActiveBottomTab("more");
  };

  const handleBackToOverview = () => {
    setSelectedTab("Overview");
    setActiveBottomTab("home");
  };

  const CurrentTabComponent = allTabMap[selectedTab];
  const isQuickActionsView = selectedTab === "QuickActions";
  const isQuickActionScreen = !coreTabMap[selectedTab] && selectedTab !== "QuickActions";

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />

      {!isQuickActionScreen && (
        <LinearGradient
          colors={[COLORS.primaryLight, COLORS.primary, COLORS.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <View style={styles.headerLeft}>
                <View style={styles.avatarContainer}>
                  <LinearGradient
                    colors={[COLORS.primaryLight, COLORS.primary]}
                    style={styles.avatar}
                  >
                    <Text style={styles.avatarText}>A</Text>
                  </LinearGradient>
                </View>
                <View style={styles.headerTextContainer}>
                  <Text style={styles.welcomeText}>Welcome back,</Text>
                  <Text style={styles.userName}>Admin</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.notificationBtn} 
                onPress={() => router.push('/Notifications')}
              >
                <Bell size={24} color="#FFFFFF" strokeWidth={2} />
                {unreadCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{unreadCount > 99 ? '99+' : unreadCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <View style={styles.searchBox}>
                <Search size={20} color={COLORS.textMuted} />
                <TextInput
                  placeholder="Search users, spas, vendors..."
                  placeholderTextColor={COLORS.textMuted}
                  style={styles.searchInput}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      )}

      <View style={styles.mainWrapper}>
        {isQuickActionsView ? (
          <ScrollView
            style={styles.mainContent}
            contentContainerStyle={styles.mainContentContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.quickActionsContainer}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.quickActionsList}>
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <TouchableOpacity
                      key={action.id}
                      style={styles.quickActionCard}
                      onPress={() => handleQuickActionPress(action)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.quickActionIconContainer}>
                        <Icon size={24} color={COLORS.primary} strokeWidth={2.5} />
                      </View>
                      <View style={styles.quickActionContent}>
                        <Text style={styles.quickActionLabel}>{action.label}</Text>
                      </View>
                      <View style={styles.quickActionArrow}>
                        <ChevronRight size={20} color={COLORS.textMuted} strokeWidth={2.5} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.mainContent}>
            {CurrentTabComponent ? (
              typeof CurrentTabComponent === 'function' ? (
                <CurrentTabComponent onBack={handleBackToOverview} />
              ) : (
                <CurrentTabComponent />
              )
            ) : (
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>Select a tab</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {!isQuickActionScreen && (
        <View style={styles.bottomNav}>
          <LinearGradient
            colors={[COLORS.surface, COLORS.cardBg]}
            style={styles.bottomNavGradient}
          >
            <View style={styles.bottomNavContent}>
              {bottomNavItems.map((item) => {
                const isActive = activeBottomTab === item.id;
                const Icon = item.icon;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.bottomNavItem}
                    onPress={() => handleBottomNavPress(item)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.navIconContainer, isActive && styles.activeNavIconContainer]}>
                      <Icon
                        size={22}
                        color={isActive ? "#FFFFFF" : COLORS.textMuted}
                        strokeWidth={2.5}
                      />
                    </View>
                    <Text style={[styles.navLabel, isActive && styles.activeNavLabel]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </LinearGradient>
        </View>
      )}
    </View>
  );
}

function OverviewContent({ onQuickActionPress }) {
  const screenWidth = Dimensions.get("window").width;
  const isMobile = screenWidth < 768;
  const styles = getStyles(screenWidth, isMobile);

  const stats = [
    { label: "Total Users", value: "2,847", icon: Users, color: COLORS.primary },
    { label: "Active Spas", value: "158", icon: Building2, color: COLORS.primaryLight },
    { label: "Revenue", value: "₹8.4L", icon: DollarSign, color: COLORS.warning },
    { label: "Pending", value: "12", icon: FileCheck, color: COLORS.danger },
  ];

  return (
    <ScrollView
      style={styles.mainContent}
      contentContainerStyle={styles.mainContentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.overviewContainer}>
        <Text style={styles.sectionTitle}>Dashboard Overview</Text>
        
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}15` }]}>
                  <Icon size={24} color={stat.color} strokeWidth={2.5} />
                </View>
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>⚠️ System Alerts</Text>
          <Text style={styles.alertText}>
            • Multiple failed login attempts detected{"\n"}
            • Monthly revenue target achieved{"\n"}
            • Database backup completed successfully{"\n"}
            • 12 vendor registration requests pending
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const getStyles = (width, isMobile, isTablet) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
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
    paddingHorizontal: isMobile ? 20 : 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.3)",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  headerTextContainer: {
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
  },
  userName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 2,
    letterSpacing: 0.5,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    zIndex: 10,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
    lineHeight: 12,
    textAlign: 'center',
  },
  searchContainer: {
    marginTop: 4,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
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
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: COLORS.text,
    fontWeight: "500",
  },
  mainWrapper: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  mainContentContainer: {
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 120 : 100,
  },
  overviewContainer: {
    paddingHorizontal: isMobile ? 16 : 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.primary,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: isMobile ? "47%" : "23%",
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: "center",
  },
  alertCard: {
    backgroundColor: COLORS.dangerLight,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.danger,
    marginBottom: 12,
  },
  alertText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
  },
  quickActionsContainer: {
    paddingTop: 8,
    paddingHorizontal: isMobile ? 16 : 20,
  },
  quickActionsList: {
    gap: 12,
  },
  quickActionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  quickActionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight + '15',
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 2,
  },
  quickActionArrow: {
    marginLeft: 8,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: isMobile ? 20 : 0,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textMuted,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  bottomNavGradient: {
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
  },
  bottomNavContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  bottomNavItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginBottom: 4,
    overflow: 'hidden',
  },
  activeNavIconContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  navLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textMuted,
    marginTop: 2,
  },
  activeNavLabel: {
    color: COLORS.primary,
  },
});
