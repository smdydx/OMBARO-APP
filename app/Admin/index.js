
import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, TextInput, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Settings, BarChart3, FileText, LogOut, Bell, Search, Home, Grid3x3, ChevronRight } from 'lucide-react-native';

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

  const quickActions = [
    { id: "user-management", label: "User Management", icon: Users, subtitle: "Manage customers, vendors & staff", color: COLORS.primary },
    { id: "analytics", label: "Analytics & Reports", icon: BarChart3, subtitle: "View platform statistics", color: COLORS.primary },
    { id: "content", label: "Content Management", icon: FileText, subtitle: "Manage services & categories", color: COLORS.primary },
    { id: "settings", label: "System Settings", icon: Settings, subtitle: "Configure platform settings", color: COLORS.primary },
  ];

  const bottomNavItems = [
    { id: "home", label: "Home", icon: Home, tab: "Overview" },
    { id: "users", label: "Users", icon: Users, tab: "Users" },
    { id: "analytics", label: "Analytics", icon: BarChart3, tab: "Analytics" },
    { id: "settings", label: "Settings", icon: Settings, tab: "Settings" },
    { id: "more", label: "More", icon: Grid3x3, tab: "QuickActions" },
  ];

  const recentActivities = [
    { id: 1, title: "New User Registration", desc: "5 new customers registered", time: "2 min ago", icon: Users, color: COLORS.success },
    { id: 2, title: "Vendor Approved", desc: "Spa Paradise approved successfully", time: "15 min ago", icon: FileText, color: COLORS.primary },
    { id: 3, title: "System Update", desc: "Platform updated to v2.1.0", time: "1 hour ago", icon: Settings, color: COLORS.warning },
  ];

  const handleBottomNavPress = (item) => {
    setActiveBottomTab(item.id);
    setSelectedTab(item.tab);
  };

  const handleQuickActionPress = (action) => {
    setSelectedTab(action.label);
    setActiveBottomTab("more");
  };

  const isQuickActionsView = selectedTab === "QuickActions";

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />
      
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
                <Text style={styles.welcomeText}>Admin Portal</Text>
                <Text style={styles.userName}>OMBARO Management</Text>
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
                placeholder="Search users, analytics, settings..."
                placeholderTextColor={COLORS.textMuted}
                style={styles.searchInput}
              />
            </View>
          </View>
        </View>
      </LinearGradient>

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
                        <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
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
        ) : selectedTab === "Overview" ? (
          <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
            <View style={styles.cardsWrap}>
              <KPI
                Icon={<Users size={20} color={COLORS.primary} />}
                tint={COLORS.successLight}
                value="1,234"
                label="Total Users"
                sub="+156 this month"
              />
              <KPI
                Icon={<BarChart3 size={20} color={COLORS.success} />}
                tint={COLORS.successLight}
                value="₹45.2L"
                label="Revenue"
                sub="+23% growth"
                rightAlign
              />
              <KPI
                Icon={<FileText size={20} color={COLORS.warning} />}
                tint="#fef3c7"
                value="89"
                label="Pending Approvals"
                sub="12 new today"
              />
              <KPI
                Icon={<Settings size={20} color={COLORS.primary} />}
                tint={COLORS.successLight}
                value="24/7"
                label="System Status"
                sub="All systems operational"
                rightAlign
              />
            </View>

            <View style={styles.block}>
              <View style={styles.blockHead}>
                <Text style={styles.blockTitle}>Recent Activity</Text>
                <Text style={styles.muted}>Last 24 hours</Text>
              </View>

              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <View key={activity.id} style={styles.activityItem}>
                    <View style={[styles.activityIcon, { backgroundColor: activity.color + '15' }]}>
                      <Icon size={18} color={activity.color} strokeWidth={2.5} />
                    </View>
                    <View style={styles.activityContent}>
                      <Text style={styles.activityTitle}>{activity.title}</Text>
                      <Text style={styles.activityDesc}>{activity.desc}</Text>
                      <Text style={styles.activityTime}>{activity.time}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>{selectedTab}</Text>
          </View>
        )}
      </View>

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
    </View>
  );
}

const getStyles = (width, isMobile, isTablet) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
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

  quickActionSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: "600",
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

  activityItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 2,
  },
  activityDesc: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 11,
    color: "#94a3b8",
    fontWeight: "600",
  },
});

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
