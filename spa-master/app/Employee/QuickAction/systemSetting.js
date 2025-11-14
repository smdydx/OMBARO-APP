import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AlertCircle, Bell, Check, ChevronDown, Key, Lock, LogOut, Mail, Shield, Smartphone, User } from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";

const COLORS = {
  bg: "#F6F7FB",
  surface: "#FFFFFF",
  text: "#0F172A",
  textMuted: "#64748B",
  border: "#E2E8F0",
  divider: "#F1F5F9",
  purple: "#7b2ff7",
  pink: "#f107a3",
  purpleLight: "#F3E8FF",
  purpleSoft: "#EDE9FE",
  blue: "#0EA5E9",
  blueLight: "#E0F2FE",
  danger: "#EF4444",
  dangerLight: "#FEE2E2",
  success: "#10B981",
  successLight: "#D1FAE5",
  warning: "#F59E0B",
  cardBg: "#F8FAFC",
};

function useScale() {
  const { width } = useWindowDimensions();
  const base = Math.min(Math.max(width, 320), 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw };
}

const Card = ({ children, sw, style }) => (
  <View
    style={[
      {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: sw(20),
        padding: sw(20),
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
          },
          android: {
            elevation: 3,
          },
        }),
      },
      style,
    ]}
  >
    {children}
  </View>
);

const RowSwitch = ({ icon: Icon, title, subtitle, value, onValueChange, sw }) => (
  <View
    style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(16),
      padding: sw(16),
      marginBottom: sw(12),
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: value ? COLORS.purpleLight : COLORS.border,
    }}
  >
    {Icon && (
      <View
        style={{
          width: sw(40),
          height: sw(40),
          borderRadius: sw(12),
          backgroundColor: value ? COLORS.purpleLight : COLORS.divider,
          alignItems: "center",
          justifyContent: "center",
          marginRight: sw(12),
        }}
      >
        <Icon size={sw(20)} color={value ? COLORS.purple : COLORS.textMuted} strokeWidth={2.5} />
      </View>
    )}
    <View style={{ flex: 1 }}>
      <Text style={{ color: COLORS.text, fontWeight: "600", fontSize: sw(15), marginBottom: sw(2) }}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={{ color: COLORS.textMuted, fontSize: sw(13), lineHeight: sw(18) }}>
          {subtitle}
        </Text>
      ) : null}
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor="#FFFFFF"
      trackColor={{ false: "#CBD5E1", true: COLORS.purple }}
      ios_backgroundColor="#CBD5E1"
    />
  </View>
);

const ActionButton = ({ label, icon: Icon, color = COLORS.blue, bgColor, onPress, sw, variant = "outline", useGradient = false }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      {
        borderWidth: variant === "outline" ? 1.5 : 0,
        borderColor: color,
        backgroundColor: variant === "solid" && !useGradient ? color : bgColor || COLORS.surface,
        borderRadius: sw(14),
        paddingVertical: sw(14),
        paddingHorizontal: sw(16),
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        opacity: pressed ? 0.7 : 1,
        overflow: "hidden",
        ...Platform.select({
          ios: {
            shadowColor: variant === "solid" ? color : "#000",
            shadowOpacity: variant === "solid" ? 0.2 : 0.05,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
          },
          android: {
            elevation: variant === "solid" ? 4 : 1,
          },
        }),
      },
    ]}
  >
    {variant === "solid" && useGradient && (
      <LinearGradient
        colors={[COLORS.purple, COLORS.pink]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    )}
    {Icon && (
      <Icon
        size={sw(18)}
        color={variant === "solid" ? "#FFFFFF" : color}
        strokeWidth={2.5}
        style={{ marginRight: sw(8) }}
      />
    )}
    <Text
      style={{
        color: variant === "solid" ? "#FFFFFF" : color,
        fontWeight: "700",
        fontSize: sw(15),
      }}
    >
      {label}
    </Text>
  </Pressable>
);

const SegTab = ({ label, icon: Icon, active, onPress, sw }) => {
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ flex: 1 }}
    >
      <Animated.View
        style={[
          {
            paddingVertical: sw(12),
            paddingHorizontal: sw(8),
            alignItems: "center",
            justifyContent: "center",
            borderRadius: sw(12),
            overflow: "hidden",
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {active && (
          <LinearGradient
            colors={[COLORS.purple, COLORS.pink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        )}
        <Icon size={sw(22)} color={active ? "#FFFFFF" : COLORS.textMuted} strokeWidth={2.5} />
        <Text
          style={{
            fontSize: sw(12),
            fontWeight: active ? "700" : "600",
            color: active ? "#FFFFFF" : COLORS.textMuted,
            marginTop: sw(4),
          }}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

function PrivacyPicker({ value, onChange, options, sw }) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value);

  const pick = (v) => {
    setOpen(false);
    if (v !== value) onChange(v);
  };

  return (
    <View style={{ position: "relative", zIndex: 1000 }}>
      <Pressable
        onPress={() => setOpen(!open)}
        style={({ pressed }) => [
          {
            borderWidth: 2,
            borderColor: open ? COLORS.purple : COLORS.border,
            borderRadius: sw(14),
            paddingVertical: sw(14),
            paddingHorizontal: sw(16),
            backgroundColor: COLORS.surface,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: pressed ? 0.9 : 1,
          },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <User size={sw(18)} color={COLORS.purple} strokeWidth={2.5} style={{ marginRight: sw(10) }} />
          <Text style={{ color: COLORS.text, fontSize: sw(15), fontWeight: "600" }}>
            {current?.label ?? "Select"}
          </Text>
        </View>
        <Animated.View
          style={{
            transform: [{ rotate: open ? "180deg" : "0deg" }],
          }}
        >
          <ChevronDown size={sw(20)} color={COLORS.purple} strokeWidth={2.5} />
        </Animated.View>
      </Pressable>

      {open && (
        <View
          style={{
            position: "absolute",
            top: sw(60),
            left: 0,
            right: 0,
            backgroundColor: COLORS.surface,
            borderRadius: sw(14),
            borderWidth: 2,
            borderColor: COLORS.purple,
            overflow: "hidden",
            ...Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 8 },
              },
              android: {
                elevation: 8,
              },
            }),
          }}
        >
          {options.map((opt, idx) => (
            <TouchableOpacity
              key={opt.value}
              onPress={() => pick(opt.value)}
              style={{
                paddingVertical: sw(14),
                paddingHorizontal: sw(16),
                backgroundColor: opt.value === value ? `${COLORS.purple}15` : "transparent",
                borderBottomWidth: idx < options.length - 1 ? 1 : 0,
                borderBottomColor: COLORS.border,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: sw(15),
                  color: opt.value === value ? COLORS.purple : COLORS.text,
                  fontWeight: opt.value === value ? "700" : "400",
                }}
              >
                {opt.label}
              </Text>
              {opt.value === value ? (
                <Check size={sw(18)} color={COLORS.purple} strokeWidth={3} />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export default function systemSetting({
  onBack,
  onEnable2FA,
  onChangePassword,
  onLogout,
  onChangePrivacy,
}) {
  const { sw } = useScale();
  const [tab, setTab] = useState("notifications");
  const navigation = useNavigation();

  const [notifState, setNotifState] = useState({
    newAssignments: true,
    approvals: true,
    systemAlerts: true,
    email: true,
    push: true,
  });

  const [loginAlerts, setLoginAlerts] = useState(true);
  const [privacy, setPrivacy] = useState("org");

  const privacyOptions = useMemo(
    () => [
      { label: "My Team Only", value: "team" },
      { label: "Organization Only", value: "org" },
      { label: "Private", value: "private" },
    ],
    []
  );

  const handlePrivacy = useCallback(
    (v) => {
      setPrivacy(v);
      onChangePrivacy && onChangePrivacy(v);
    },
    [onChangePrivacy]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="dark-content" />

      <View style={{ paddingHorizontal: sw(16), paddingTop: sw(12), }}>
        <View style={{ flexDirection: "row", alignItems: "center",justifyContent:'center', marginBottom: sw(16) }}>
          <Pressable
            onPress={()=>navigation.goBack()}
            hitSlop={12}
         
          >
            <Text style={{ color: COLORS.purple, fontSize: sw(15), fontWeight: "600" }}>← Back</Text>
          </Pressable>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: sw(20),
              fontWeight: "800",
              color: COLORS.text,
              marginRight: sw(60),
              marginTop:50
            }}
          >
            Settings
          </Text>
        </View>

        <Card sw={sw} style={{ paddingVertical: sw(16), paddingHorizontal: sw(8), marginBottom: sw(16) }}>
          <View style={{ flexDirection: "row", gap: sw(8) }}>
            <SegTab label="Notifications" icon={Bell} active={tab === "notifications"} onPress={() => setTab("notifications")} sw={sw} />
            <SegTab label="Privacy" icon={Shield} active={tab === "privacy"} onPress={() => setTab("privacy")} sw={sw} />
            <SegTab label="Security" icon={Lock} active={tab === "security"} onPress={() => setTab("security")} sw={sw} />
          </View>
        </Card>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: sw(16), paddingBottom: sw(30) }}
        showsVerticalScrollIndicator={false}
      >
        {tab === "notifications" && (
          <View>
            <View style={{ marginBottom: sw(20) }}>
              <Text style={{ color: COLORS.text, fontSize: sw(22), fontWeight: "800", marginBottom: sw(6) }}>
                Notification Preferences
              </Text>
              <Text style={{ color: COLORS.textMuted, fontSize: sw(14), lineHeight: sw(20) }}>
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

            <View style={{ height: sw(12), backgroundColor: COLORS.border, marginVertical: sw(20), borderRadius: sw(2) }} />

            <Text style={{ color: COLORS.text, fontSize: sw(16), fontWeight: "700", marginBottom: sw(12) }}>
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
            <View style={{ marginBottom: sw(20) }}>
              <Text style={{ color: COLORS.text, fontSize: sw(22), fontWeight: "800", marginBottom: sw(6) }}>
                Privacy Settings
              </Text>
              <Text style={{ color: COLORS.textMuted, fontSize: sw(14), lineHeight: sw(20) }}>
                Control who can see your information
              </Text>
            </View>

            <Card sw={sw} style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.border }}>
              <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: sw(16) }}>
                <View
                  style={{
                    width: sw(40),
                    height: sw(40),
                    borderRadius: sw(12),
                    backgroundColor: COLORS.purpleLight,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: sw(12),
                  }}
                >
                  <User size={sw(20)} color={COLORS.purple} strokeWidth={2.5} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: COLORS.text, fontWeight: "700", fontSize: sw(16), marginBottom: sw(4) }}>
                    Profile Visibility
                  </Text>
                  <Text style={{ color: COLORS.textMuted, fontSize: sw(13), lineHeight: sw(18) }}>
                    Control who can see your profile and activity
                  </Text>
                </View>
              </View>

              <PrivacyPicker value={privacy} onChange={handlePrivacy} options={privacyOptions} sw={sw} />
            </Card>
          </View>
        )}

        {tab === "security" && (
          <View>
            <View style={{ marginBottom: sw(20) }}>
              <Text style={{ color: COLORS.text, fontSize: sw(22), fontWeight: "800", marginBottom: sw(6) }}>
                Security Settings
              </Text>
              <Text style={{ color: COLORS.textMuted, fontSize: sw(14), lineHeight: sw(20) }}>
                Keep your account safe and secure
              </Text>
            </View>

            <Card sw={sw} style={{ backgroundColor: COLORS.purpleLight, borderColor: COLORS.purple, marginBottom: sw(16) }}>
              <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: sw(16) }}>
                <View
                  style={{
                    width: sw(40),
                    height: sw(40),
                    borderRadius: sw(12),
                    backgroundColor: COLORS.surface,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: sw(12),
                  }}
                >
                  <Lock size={sw(20)} color={COLORS.purple} strokeWidth={2.5} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: COLORS.text, fontWeight: "700", fontSize: sw(16), marginBottom: sw(4) }}>
                    Two-Factor Authentication
                  </Text>
                  <Text style={{ color: COLORS.text, fontSize: sw(13), lineHeight: sw(18), opacity: 0.8 }}>
                    Add an extra layer of security to your account
                  </Text>
                </View>
              </View>
              <ActionButton label="Enable 2FA" icon={Lock} color={COLORS.purple} onPress={onEnable2FA} sw={sw} variant="solid" useGradient={true} />
            </Card>

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
              color={COLORS.purple}
              bgColor={COLORS.purpleSoft}
              onPress={onChangePassword}
              sw={sw}
            />

            <View style={{ height: sw(28) }} />
            <View style={{ height: 1, backgroundColor: COLORS.border, marginVertical: sw(4) }} />
            <View style={{ height: sw(28) }} />

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
    </SafeAreaView>
  );
}
