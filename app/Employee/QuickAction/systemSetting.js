import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Bell, Shield, Lock, AlertCircle, Mail, Smartphone, User, Key, LogOut } from "lucide-react-native";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const COLORS = {
  gradient1: "#00FF87",
  gradient2: "#016B3A",
  gradient3: "#013B1F",
  gradient4: "#012B17",
  bg: "#FFFFFF",
  surface: "#F9FAFB",
  text: "#1A1A1A",
  textMuted: "#666666",
  border: "#E5E7EB",
  primary: "#016B3A",
  primaryLight: "#10B981",
  danger: "#EF4444",
  dangerLight: "#FEE2E2",
};

function useScale() {
  const { width, height } = useWindowDimensions();
  const base = Math.min(width, 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw, width, height };
}

const TabButton = ({ label, icon: Icon, active, onPress, sw }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flex: 1,
      paddingVertical: sw(12),
      alignItems: "center",
      borderRadius: sw(12),
      backgroundColor: active ? "#FFFFFF" : "transparent",
    }}
  >
    <Icon size={sw(18)} color={active ? COLORS.primary : "rgba(255,255,255,0.8)"} strokeWidth={2.5} />
    <Text style={{
      fontSize: sw(10),
      fontWeight: active ? "700" : "600",
      color: active ? COLORS.primary : "rgba(255,255,255,0.8)",
      marginTop: sw(4),
    }}>
      {label}
    </Text>
  </TouchableOpacity>
);

const RowSwitch = ({ icon: Icon, title, subtitle, value, onValueChange, sw }) => (
  <View style={{
    backgroundColor: COLORS.surface,
    borderRadius: sw(12),
    padding: sw(12),
    marginBottom: sw(8),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: value ? `${COLORS.primaryLight}40` : COLORS.border,
  }}>
    {Icon && (
      <View style={{
        width: sw(32),
        height: sw(32),
        borderRadius: sw(8),
        backgroundColor: value ? `${COLORS.primaryLight}20` : "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
        marginRight: sw(10),
      }}>
        <Icon size={sw(15)} color={value ? COLORS.primary : COLORS.textMuted} strokeWidth={2.5} />
      </View>
    )}
    <View style={{ flex: 1 }}>
      <Text style={{ color: COLORS.text, fontWeight: "600", fontSize: sw(12), marginBottom: sw(2) }}>
        {title}
      </Text>
      {subtitle && (
        <Text style={{ color: COLORS.textMuted, fontSize: sw(10), lineHeight: sw(14) }}>
          {subtitle}
        </Text>
      )}
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor="#FFFFFF"
      trackColor={{ false: "#9CA3AF", true: COLORS.primaryLight }}
      ios_backgroundColor="#9CA3AF"
    />
  </View>
);

const ActionButton = ({ label, icon: Icon, color, bgColor, onPress, sw }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      borderWidth: 1.5,
      borderColor: color,
      backgroundColor: bgColor || COLORS.surface,
      borderRadius: sw(12),
      paddingVertical: sw(12),
      paddingHorizontal: sw(14),
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    }}
  >
    {Icon && <Icon size={sw(15)} color={color} strokeWidth={2.5} style={{ marginRight: sw(6) }} />}
    <Text style={{ color, fontWeight: "700", fontSize: sw(12) }}>{label}</Text>
  </TouchableOpacity>
);

export default function SystemSetting({ onBack, onEnable2FA, onChangePassword, onLogout }) {
  const { sw, width, height } = useScale();
  const [tab, setTab] = useState("notifications");
  const navigation = useNavigation();

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

  const [notifState, setNotifState] = useState({
    newAssignments: true,
    approvals: true,
    systemAlerts: true,
    email: true,
    push: true,
  });

  const [loginAlerts, setLoginAlerts] = useState(true);

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
          height: headerHeight,
          paddingTop: Platform.OS === 'ios' ? sw(50) : sw(20),
          paddingHorizontal: sw(20),
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(20) }}>
          <TouchableOpacity
            onPress={() => (onBack ? onBack() : navigation.goBack())}
            style={{
              width: sw(42),
              height: sw(42),
              borderRadius: sw(21),
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowLeft size={sw(20)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center", marginRight: sw(42),marginTop:sw(50)  }}>
            <Text style={{ color: "#FFFFFF", fontSize: sw(20), fontWeight: "800" }}>Settings</Text>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(12), marginTop: sw(2) }}>
              Manage your preferences
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: sw(14),
            padding: sw(6),
            flexDirection: "row",
            gap: sw(6),
          }}>
            <TabButton label="Notifications" icon={Bell} active={tab === "notifications"} onPress={() => setTab("notifications")} sw={sw} />
            <TabButton label="Privacy" icon={Shield} active={tab === "privacy"} onPress={() => setTab("privacy")} sw={sw} />
            <TabButton label="Security" icon={Lock} active={tab === "security"} onPress={() => setTab("security")} sw={sw} />
          </View>
        </View>
      </LinearGradient>

      <View style={{ 
        height: contentHeight,
        backgroundColor: COLORS.bg,
        borderTopLeftRadius: sw(28),
        borderTopRightRadius: sw(28),
        marginTop: -sw(1),
      }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: sw(18), paddingHorizontal: sw(16), paddingBottom: sw(120) }}
          showsVerticalScrollIndicator={false}
        >
          {tab === "notifications" && (
            <View>
              <View style={{ marginBottom: sw(14) }}>
                <Text style={{ color: COLORS.text, fontSize: sw(14), fontWeight: "700", marginBottom: sw(5) }}>
                  Notification Preferences
                </Text>
                <Text style={{ color: COLORS.textMuted, fontSize: sw(11), lineHeight: sw(15) }}>
                  Manage how you receive notifications
                </Text>
              </View>

              <RowSwitch
                sw={sw}
                icon={Bell}
                title="New Assignments"
                subtitle="Get notified when you receive new tasks"
                value={notifState.newAssignments}
                onValueChange={(v) => setNotifState((s) => ({ ...s, newAssignments: v }))}
              />
              <RowSwitch
                sw={sw}
                icon={AlertCircle}
                title="Approval Requests"
                subtitle="Get notified of pending approvals"
                value={notifState.approvals}
                onValueChange={(v) => setNotifState((s) => ({ ...s, approvals: v }))}
              />
              <RowSwitch
                sw={sw}
                icon={Bell}
                title="System Alerts"
                subtitle="Receive important system notifications"
                value={notifState.systemAlerts}
                onValueChange={(v) => setNotifState((s) => ({ ...s, systemAlerts: v }))}
              />

              <View style={{ height: sw(8), backgroundColor: COLORS.border, marginVertical: sw(12), borderRadius: 2 }} />

              <Text style={{ color: COLORS.text, fontSize: sw(13), fontWeight: "700", marginBottom: sw(10) }}>
                Notification Channels
              </Text>

              <RowSwitch
                sw={sw}
                icon={Mail}
                title="Email Notifications"
                subtitle="Receive notifications via email"
                value={notifState.email}
                onValueChange={(v) => setNotifState((s) => ({ ...s, email: v }))}
              />
              <RowSwitch
                sw={sw}
                icon={Smartphone}
                title="Push Notifications"
                subtitle="Receive notifications on your device"
                value={notifState.push}
                onValueChange={(v) => setNotifState((s) => ({ ...s, push: v }))}
              />
            </View>
          )}

          {tab === "privacy" && (
            <View>
              <View style={{ marginBottom: sw(18) }}>
                <Text style={{ color: COLORS.text, fontSize: sw(18), fontWeight: "700", marginBottom: sw(6) }}>
                  Privacy Settings
                </Text>
                <Text style={{ color: COLORS.textMuted, fontSize: sw(13), lineHeight: sw(18) }}>
                  Control who can see your information
                </Text>
              </View>

              <View style={{
                backgroundColor: COLORS.surface,
                borderRadius: sw(14),
                padding: sw(16),
                borderWidth: 1,
                borderColor: COLORS.border,
              }}>
                <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: sw(14) }}>
                  <View style={{
                    width: sw(38),
                    height: sw(38),
                    borderRadius: sw(10),
                    backgroundColor: `${COLORS.primaryLight}20`,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: sw(12),
                  }}>
                    <User size={sw(18)} color={COLORS.primary} strokeWidth={2.5} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: COLORS.text, fontWeight: "700", fontSize: sw(15), marginBottom: sw(4) }}>
                      Profile Visibility
                    </Text>
                    <Text style={{ color: COLORS.textMuted, fontSize: sw(12), lineHeight: sw(16) }}>
                      Control who can see your profile and activity
                    </Text>
                  </View>
                </View>

                <Text style={{ color: COLORS.text, fontSize: sw(13), fontWeight: "600", marginTop: sw(8) }}>
                  Currently: Organization Only
                </Text>
              </View>
            </View>
          )}

          {tab === "security" && (
            <View>
              <View style={{ marginBottom: sw(18) }}>
                <Text style={{ color: COLORS.text, fontSize: sw(18), fontWeight: "700", marginBottom: sw(6) }}>
                  Security Settings
                </Text>
                <Text style={{ color: COLORS.textMuted, fontSize: sw(13), lineHeight: sw(18) }}>
                  Keep your account safe and secure
                </Text>
              </View>

              <View style={{
                backgroundColor: `${COLORS.primaryLight}15`,
                borderRadius: sw(14),
                padding: sw(16),
                borderWidth: 1,
                borderColor: `${COLORS.primaryLight}40`,
                marginBottom: sw(14),
              }}>
                <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: sw(14) }}>
                  <View style={{
                    width: sw(38),
                    height: sw(38),
                    borderRadius: sw(10),
                    backgroundColor: COLORS.surface,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: sw(12),
                  }}>
                    <Lock size={sw(18)} color={COLORS.primary} strokeWidth={2.5} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: COLORS.text, fontWeight: "700", fontSize: sw(15), marginBottom: sw(4) }}>
                      Two-Factor Authentication
                    </Text>
                    <Text style={{ color: COLORS.text, fontSize: sw(12), lineHeight: sw(16), opacity: 0.8 }}>
                      Add an extra layer of security to your account
                    </Text>
                  </View>
                </View>
                <ActionButton 
                  label="Enable 2FA" 
                  icon={Lock} 
                  color={COLORS.primary} 
                  bgColor="#FFFFFF"
                  onPress={onEnable2FA} 
                  sw={sw} 
                />
              </View>

              <RowSwitch
                sw={sw}
                icon={AlertCircle}
                title="Login Alerts"
                subtitle="Get notified of new login attempts"
                value={loginAlerts}
                onValueChange={setLoginAlerts}
              />

              <View style={{ height: sw(20) }} />

              <ActionButton
                label="Change Password"
                icon={Key}
                color={COLORS.primary}
                bgColor={`${COLORS.primary}10`}
                onPress={onChangePassword}
                sw={sw}
              />

              <View style={{ height: sw(24), borderBottomWidth: 1, borderBottomColor: COLORS.border, marginVertical: sw(16) }} />

              <ActionButton
                label="Logout"
                icon={LogOut}
                color={COLORS.danger}
                bgColor={COLORS.dangerLight}
                onPress={onLogout}
                sw={sw}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
