
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  BarChart2,
  CalendarDays,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  Star,
  TrendingUp,
  User2,
  XCircle,
  Bell,
  Search,
  Home,
  UserCheck,
  FileCheck,
  Grid3x3,
  ChevronRight,
  FileSpreadsheet,
  Settings,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";

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

export default function TherapistProfile() {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;
  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;

  const styles = getStyles(screenWidth, isMobile, isTablet);

  const [selectedTab, setSelectedTab] = useState("Overview");
  const [activeBottomTab, setActiveBottomTab] = useState("home");
  const [unreadCount, setUnreadCount] = useState(3);

  const quickActions = [
    { id: "assignments", label: "Assignments", icon: CalendarDays, route: "/Therapist/assisnements", color: COLORS.primary },
    { id: "schedule", label: "Schedule", icon: Clock, route: "/Therapist/mySchedule", color: COLORS.primary },
    { id: "location", label: "Location", icon: MapPin, route: "/Therapist/myLocation", color: COLORS.primary },
    { id: "leaves", label: "Leaves", icon: XCircle, route: "/Therapist/LeaveRequest", color: COLORS.primary },
    { id: "earnings", label: "Earnings", icon: DollarSign, route: "/Therapist/assisnements", color: COLORS.primary },
    { id: "performance", label: "Performance", icon: BarChart2, route: "/Therapist/performance-review", color: COLORS.primary },
    { id: "profile", label: "Profile", icon: User2, route: "/Therapist/profile", color: COLORS.primary },
    { id: "settings", label: "Settings", icon: Settings, route: "#", color: COLORS.primary },
  ];

  const bottomNavItems = [
    { id: "home", label: "Home", icon: Home, tab: "Overview" },
    { id: "schedule", label: "Schedule", icon: Clock, tab: "Schedule" },
    { id: "earnings", label: "Earnings", icon: DollarSign, tab: "Earnings" },
    { id: "performance", label: "Performance", icon: BarChart2, tab: "Performance" },
    { id: "more", label: "More", icon: Grid3x3, tab: "QuickActions" },
  ];

  const handleBottomNavPress = (item) => {
    setActiveBottomTab(item.id);
    setSelectedTab(item.tab);
  };

  const handleQuickActionPress = (action) => {
    if (action.route && action.route !== "#") {
      router.push(action.route);
    } else {
      setSelectedTab(action.label);
      setActiveBottomTab("more");
    }
  };

  const isQuickActionsView = selectedTab === "QuickActions";
  const isQuickActionScreen = false;

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
                    <Text style={styles.avatarText}>P</Text>
                  </LinearGradient>
                </View>
                <View style={styles.headerTextContainer}>
                  <Text style={styles.welcomeText}>Welcome back,</Text>
                  <Text style={styles.userName}>Priya Sharma</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.notificationBtn}>
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
                  placeholder="Search assignments, schedule..."
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
          <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
            <View style={styles.cardsWrap}>
              <KPI
                Icon={<CalendarDays size={20} color={COLORS.primary} />}
                tint={COLORS.successLight}
                value="0"
                label="Today's Tasks"
                sub="2 pending"
              />
              <KPI
                Icon={<CheckCircle2 size={20} color={COLORS.success} />}
                tint={COLORS.successLight}
                value="93.3%"
                label="Completion Rate"
                sub="+5% this month"
                rightAlign
              />
              <KPI
                Icon={<Star size={20} color={COLORS.warning} />}
                tint="#fef3c7"
                value="4.7"
                label="Average Rating"
                sub="156 reviews"
              />
              <KPI
                Icon={<TrendingUp size={20} color={COLORS.primary} />}
                tint={COLORS.successLight}
                value="₹125k"
                label="Total Earnings"
                sub="+12% growth"
                rightAlign
              />
            </View>

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

const getStyles = (width, isMobile, isTablet) => StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

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

  cardsWrap: { paddingHorizontal: 16, marginTop: 12 },
  kpiCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
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
  kpiValue: { fontSize: 22, fontWeight: "800", color: COLORS.text },
  kpiLabel: { color: COLORS.textMuted, fontSize: 14 },
  kpiSub: { color: "#94a3b8", fontSize: 12, marginTop: 6 },

  quickActionsContainer: {
    paddingTop: 8,
    paddingHorizontal: isMobile ? 16 : 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.primary,
    marginBottom: 16,
    letterSpacing: 0.3,
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

  block: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },
  blockHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  blockTitle: { fontWeight: "800", color: COLORS.text, fontSize: 16 },
  muted: { color: "#94a3b8" },

  emptyWrap: {
    paddingVertical: 28,
    alignItems: "center",
    gap: 6,
  },
  emptyTitle: { fontWeight: "800", color: "#111827", marginTop: 8 },
  emptySub: { color: "#94a3b8", marginTop: 2 },

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

const styles = StyleSheet.create({});
