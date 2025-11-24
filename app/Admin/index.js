import { LinearGradient } from "expo-linear-gradient";
import { Home, Users, Store, CheckCircle, BarChart3, Lock, MapPin, Shield, Settings, Search, Bell } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import UserManagement from "./QuickAction/UserManagement";
import SpaManagement from "./QuickAction/SpaManagement";
import Approvals from "./QuickAction/Approvals";
import Analytics from "./QuickAction/Analytics";
import SecurityCenter from "./QuickAction/SecurityCenter";
import SystemSettings from "./QuickAction/SystemSettings";
import LocationTracking from "./QuickAction/LocationTracking";
import VendorApproval from "./QuickAction/VendorApproval";

const COLORS = {
  gradient1: "#00FF87",
  gradient2: "#016B3A",
  gradient3: "#013B1F",
  gradient4: "#012B17",
  primary: "#016B3A",
  primaryLight: "#10B981",
  white: "#FFFFFF",
  text: "#1A1A1A",
  textSecondary: "#666666",
  textLight: "#999999",
  bg: "#FFFFFF",
  cardBg: "#F9FAFB",
  border: "#E5E7EB",
  success: "#10B981",
  warning: "#F59E0B",
  info: "#3B82F6",
};

function useScale() {
  const { width } = useWindowDimensions();
  const base = Math.min(width, 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw, width };
}

function StatCard({ icon: Icon, value, label, color, sw }) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(10),
      marginHorizontal: sw(4),
      marginBottom: sw(8),
    }}>
      <View style={{
        backgroundColor: `${color}15`,
        width: sw(32),
        height: sw(32),
        borderRadius: sw(10),
        alignItems: "center",
        justifyContent: "center",
        marginBottom: sw(6),
      }}>
        <Icon size={sw(16)} color={color} strokeWidth={2.5} />
      </View>
      <Text style={{ fontSize: sw(13), fontWeight: "800", color: color, marginBottom: sw(2) }}>
        {value}
      </Text>
      <Text style={{ fontSize: sw(9), color: COLORS.textLight }}>
        {label}
      </Text>
    </View>
  );
}

function QuickActionCard({ icon: Icon, label, description, color, onPress, sw }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: COLORS.cardBg,
        borderRadius: sw(12),
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: sw(12),
        marginBottom: sw(10),
        flexDirection: "row",
        alignItems: "center",
      }}
      activeOpacity={0.7}
    >
      <View style={{
        backgroundColor: `${color}15`,
        width: sw(40),
        height: sw(40),
        borderRadius: sw(10),
        alignItems: "center",
        justifyContent: "center",
        marginRight: sw(10),
      }}>
        <Icon size={sw(18)} color={color} strokeWidth={2.5} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>
          {label}
        </Text>
        <Text style={{ fontSize: sw(9), color: COLORS.textSecondary, marginTop: sw(2) }}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Admin() {
  const { sw, width } = useScale();
  const [activeTab, setActiveTab] = useState("Overview");
  const [currentScreen, setCurrentScreen] = useState(null);

  const quickActionMap = useMemo(
    () => ({
      "User Management": UserManagement,
      "Spa Management": SpaManagement,
      "Approvals": Approvals,
      "Analytics": Analytics,
      "Security Center": SecurityCenter,
      "System Settings": SystemSettings,
      "Location Tracking": LocationTracking,
      "Vendor Approval": VendorApproval,
    }),
    []
  );

  const quickActions = [
    { id: "user-management", label: "User Management", description: "Manage all users", icon: Users, tab: "User Management", color: COLORS.primary },
    { id: "spa-management", label: "Spa Management", description: "Manage spa details", icon: Store, tab: "Spa Management", color: COLORS.primaryLight },
    { id: "approvals", label: "Approvals", description: "Pending approvals", icon: CheckCircle, tab: "Approvals", color: COLORS.warning },
    { id: "analytics", label: "Analytics", description: "View analytics", icon: BarChart3, tab: "Analytics", color: COLORS.info },
    { id: "security", label: "Security Center", description: "Security alerts", icon: Lock, tab: "Security Center", color: COLORS.primary },
    { id: "system-settings", label: "System Settings", description: "System config", icon: Settings, tab: "System Settings", color: COLORS.primaryLight },
    { id: "location", label: "Location Tracking", description: "Track locations", icon: MapPin, tab: "Location Tracking", color: COLORS.success },
    { id: "vendor", label: "Vendor Approval", description: "Approve vendors", icon: Shield, tab: "Vendor Approval", color: COLORS.warning },
  ];

  if (currentScreen) {
    const ScreenComponent = quickActionMap[currentScreen];
    return <ScreenComponent onBack={() => setCurrentScreen(null)} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gradient2 }}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={COLORS.gradient2}
        translucent={false}
      />

      <LinearGradient 
        colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: Platform.OS === 'ios' ? sw(50) : sw(40),
          paddingBottom: sw(20),
          paddingHorizontal: sw(16),
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: sw(16) }}>
          <View>
            <Text style={{ color: "#FFFFFF", fontSize: sw(16), fontWeight: "800" }}>
              Admin Portal
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(10), marginTop: sw(2) }}>
              System Administration
            </Text>
          </View>
          <TouchableOpacity style={{
            width: sw(40),
            height: sw(40),
            borderRadius: sw(20),
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Bell size={sw(18)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <View style={{
          backgroundColor: "rgba(255,255,255,0.15)",
          borderRadius: sw(10),
          paddingHorizontal: sw(12),
          paddingVertical: sw(8),
          flexDirection: "row",
          alignItems: "center",
          marginBottom: sw(16),
        }}>
          <Search size={sw(16)} color="rgba(255,255,255,0.6)" strokeWidth={2} />
          <Text style={{ fontSize: sw(12), color: "rgba(255,255,255,0.6)", marginLeft: sw(8), flex: 1 }}>
            Search system...
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginBottom: sw(4) }}>
          <StatCard icon={Users} value="2,847" label="Customers" color={COLORS.primary} sw={sw} />
          <StatCard icon={Store} value="158" label="Vendors" color={COLORS.primaryLight} sw={sw} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <StatCard icon={BarChart3} value="₹8.4L" label="Revenue" color={COLORS.warning} sw={sw} />
          <StatCard icon={Shield} value="23" label="Employees" color={COLORS.info} sw={sw} />
        </View>
      </LinearGradient>

      <View style={{ 
        flex: 1,
        backgroundColor: COLORS.bg,
        borderTopLeftRadius: sw(28),
        borderTopRightRadius: sw(28),
        marginTop: 0,
      }}>
        <View style={{
          backgroundColor: COLORS.cardBg,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
          paddingHorizontal: sw(16),
          paddingVertical: sw(12),
          flexDirection: "row",
          gap: sw(8),
        }}>
          {["Overview", "Reports"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                paddingHorizontal: sw(12),
                paddingVertical: sw(8),
                borderBottomWidth: activeTab === tab ? 2 : 0,
                borderBottomColor: activeTab === tab ? COLORS.primary : "transparent",
              }}
            >
              <Text style={{
                fontSize: sw(11),
                fontWeight: activeTab === tab ? "700" : "600",
                color: activeTab === tab ? COLORS.primary : COLORS.textLight,
              }}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView 
          contentContainerStyle={{ paddingHorizontal: sw(16), paddingTop: sw(16), paddingBottom: sw(120) }} 
          showsVerticalScrollIndicator={false}
        >
          {activeTab === "Overview" && (
            <>
              <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(12) }}>
                System Management
              </Text>
              {quickActions.map((action) => (
                <QuickActionCard
                  key={action.id}
                  {...action}
                  sw={sw}
                  onPress={() => setCurrentScreen(action.tab)}
                />
              ))}

              <View style={{ marginTop: sw(24), padding: sw(12), backgroundColor: "#FEF3C7", borderRadius: sw(10), borderWidth: 1, borderColor: "#F59E0B" }}>
                <Text style={{ fontSize: sw(11), fontWeight: "700", color: "#92400E", marginBottom: sw(4) }}>
                  ⚠️ System Alerts
                </Text>
                <Text style={{ fontSize: sw(9), color: "#92400E" }}>
                  • Multiple failed login attempts detected{"\n"}
                  • Monthly revenue target achieved{"\n"}
                  • Database backup completed successfully{"\n"}
                  • New vendor registration requests pending approval
                </Text>
              </View>
            </>
          )}

          {activeTab === "Reports" && (
            <View style={{
              backgroundColor: COLORS.cardBg,
              borderRadius: sw(12),
              borderWidth: 1,
              borderColor: COLORS.border,
              padding: sw(16),
              alignItems: "center",
            }}>
              <BarChart3 size={sw(40)} color={COLORS.primaryLight} strokeWidth={1.5} />
              <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginTop: sw(12) }}>
                Advanced Reports
              </Text>
              <Text style={{ fontSize: sw(10), color: COLORS.textSecondary, marginTop: sw(6), textAlign: "center" }}>
                Detailed analytics and performance reports available
              </Text>
              <TouchableOpacity style={{
                backgroundColor: COLORS.primary,
                borderRadius: sw(8),
                paddingHorizontal: sw(16),
                paddingVertical: sw(8),
                marginTop: sw(12),
              }}>
                <Text style={{ fontSize: sw(11), fontWeight: "700", color: "#FFFFFF" }}>
                  Generate Report
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
