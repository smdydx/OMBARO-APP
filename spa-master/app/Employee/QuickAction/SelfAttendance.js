// src/screens/SelfAttendanceScreen.js
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";

/* ====== THEME ====== */
const COLORS = {
  bg: "#F6F8FB",
  surface: "#FFFFFF",
  text: "#0F172A",
  textMuted: "#64748B",
  border: "rgba(2,6,23,0.08)",
  divider: "rgba(2,6,23,0.06)",
  // brand gradient
  grad1: "#3B82F6",
  grad2: "#8B5CF6",
  primary: "#2563EB",
  primarySoft: "#DCEBFF",
  warningBg: "#FEF3C7",
  warningText: "#92400E",
  dangerBg: "#FEE2E2",
  dangerText: "#B91C1C",
  success: "#16A34A",
  tileBlue: "#2563EB",
};

/* ====== responsive helper ====== */
function useScale() {
  const { width } = useWindowDimensions();
  const base = Math.min(Math.max(width, 320), 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw };
}

/* ====== small pieces ====== */
const Card = ({ children, sw, style }) => (
  <View
    style={[
      {
        backgroundColor: COLORS.surface,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS.border,
        borderRadius: sw(18),
        padding: sw(16),
      },
      shadowStyle,
      style,
    ]}
  >
    {children}
  </View>
);

const SolidButton = ({ label, disabled, onPress, sw }) => (
  <Pressable
    disabled={disabled}
    onPress={onPress}
    style={({ pressed }) => [
      {
        paddingVertical: sw(16),
        borderRadius: sw(18),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: disabled ? "#A3B6D9" : COLORS.primary,
        opacity: pressed ? 0.9 : 1,
      },
      shadowSoft,
    ]}
  >
    <Text style={{ color: "#fff", fontWeight: "800", fontSize: sw(16) }}>✓ Check In</Text>
  </Pressable>
);

const OutlinePill = ({ icon, label, onPress, sw }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      {
        flex: 1,
        paddingVertical: sw(14),
        borderRadius: sw(16),
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F8FAFF",
        opacity: pressed ? 0.9 : 1,
      },
      shadowTiny,
    ]}
  >
    <Text style={{ color: COLORS.primary, fontSize: sw(15), fontWeight: "700" }}>
      {icon} {label}
    </Text>
  </Pressable>
);

const StatTile = ({ value, label, color, sw }) => (
  <View
    style={[
      {
        flex: 1,
        backgroundColor: COLORS.surface,
        borderRadius: sw(16),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS.border,
        paddingVertical: sw(18),
        alignItems: "center",
      },
      shadowStyle,
    ]}
  >
    <Text style={{ color, fontSize: sw(24), fontWeight: "900" }}>{value}</Text>
    <Text style={{ color: COLORS.textMuted, fontSize: sw(13), marginTop: sw(4) }}>{label}</Text>
  </View>
);

/* ====== main screen ====== */
export default function SelfAttendance({
  onBack,
  onRefreshLocation,
  onCheckIn,
  onHalfDay,
  onWFH,
}) {
  const { sw } = useScale();

  const navigation = useNavigation();

  // demo state – replace w/ your permission + location hooks
  const [locDenied, setLocDenied] = useState(true);

  const todayStr = useMemo(() => {
    const d = new Date();
    const opts = { weekday: "long", day: "2-digit", month: "long", year: "numeric" };
    return d.toLocaleDateString(undefined, opts);
  }, []);

  const refreshLocation = () => {
    onRefreshLocation?.();
    // simulate permission still denied
    setLocDenied(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" />
      {/* Top gradient header */}
      <LinearGradient colors={[COLORS.grad2, COLORS.grad1]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={{ paddingHorizontal: sw(16), paddingTop: sw(40), paddingBottom: sw(16) }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(14) }}>
            <Pressable
              onPress={()=>navigation.goBack()}
              hitSlop={12}
              style={({ pressed }) => [
                {
                  width: sw(44),
                  height: sw(44),
                  borderRadius: sw(12),
                  backgroundColor: "rgba(255,255,255,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={{ color: "#fff", fontSize: sw(18) }}>←</Text>
            </Pressable>
            <View style={{ flex: 1, alignItems: "center", marginRight: sw(44) }}>
              <Text style={{ color: "#fff", fontSize: sw(20), fontWeight: "900" }}>Self Attendance</Text>
              <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(13), marginTop: sw(4) }}>
                {todayStr}
              </Text>
            </View>
          </View>

          {/* mini employee card in header */}
          <LinearGradient
            colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.1)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: sw(20),
              padding: sw(14),
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: sw(48),
                height: sw(48),
                borderRadius: sw(24),
                overflow: "hidden",
                marginRight: sw(12),
                backgroundColor: "rgba(255,255,255,0.5)",
              }}
            >
              {/* placeholder avatar */}
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#fff", fontSize: sw(20) }}>🧑‍💼</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#fff", fontWeight: "800", fontSize: sw(16) }}>John Doe</Text>
              <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: sw(13), marginTop: sw(2) }}>
                EMP001 • Spa Manager{"\n"}Operations
              </Text>
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={{ padding: sw(16), paddingBottom: sw(28) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Location */}
        <Card sw={sw} style={{ marginBottom: sw(16) }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(10) }}>
            <Text style={{ color: COLORS.text, fontWeight: "900", fontSize: sw(18), flex: 1 }}>
              Current Location
            </Text>
            <Pressable onPress={refreshLocation} hitSlop={8}>
              <Text style={{ color: COLORS.primary, fontSize: sw(15), fontWeight: "700" }}>📍 Refresh</Text>
            </Pressable>
          </View>

          {locDenied ? (
            <View
              style={{
                backgroundColor: COLORS.dangerBg,
                borderRadius: sw(14),
                padding: sw(14),
                borderWidth: 1,
                borderColor: "rgba(185,28,28,0.35)",
              }}
            >
              <Text style={{ color: COLORS.dangerText, fontWeight: "800", fontSize: sw(15) }}>
                ⛔ Location Error
              </Text>
              <Text style={{ color: COLORS.dangerText, fontSize: sw(13), marginTop: sw(4) }}>
                Location access denied by user
              </Text>
            </View>
          ) : (
            <Text style={{ color: COLORS.textMuted, fontSize: sw(14) }}>Lat/Lng: …</Text>
          )}
        </Card>

        {/* Mark Attendance */}
        <Card sw={sw} style={{ marginBottom: sw(16) }}>
          <Text style={{ color: COLORS.text, fontWeight: "900", fontSize: sw(18), marginBottom: sw(12) }}>
            Mark Attendance
          </Text>

          <SolidButton
            label="Check In"
            disabled={locDenied}
            onPress={onCheckIn}
            sw={sw}
          />

          <View style={{ height: sw(12) }} />

          <View style={{ flexDirection: "row", gap: sw(12) }}>
            <OutlinePill icon="☕" label="Half Day" onPress={onHalfDay} sw={sw} />
            <OutlinePill icon="🏠" label="Work From Home" onPress={onWFH} sw={sw} />
          </View>

          {locDenied ? (
            <View
              style={{
                backgroundColor: COLORS.warningBg,
                borderRadius: sw(14),
                padding: sw(12),
                borderWidth: 1,
                borderColor: "rgba(146,64,14,0.25)",
                marginTop: sw(14),
              }}
            >
              <Text style={{ color: COLORS.warningText, fontSize: sw(14) }}>
                Please enable location access to mark attendance
              </Text>
            </View>
          ) : null}
        </Card>

        {/* stats */}
        <View style={{ flexDirection: "row", gap: sw(14) }}>
          <StatTile value="22" label="Days Present" color={COLORS.success} sw={sw} />
          <StatTile value="8.5" label="Avg Hours" color={COLORS.tileBlue} sw={sw} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ====== shadows ====== */
const shadowStyle =
  Platform.OS === "ios"
    ? { shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } }
    : { elevation: 2 };

const shadowSoft =
  Platform.OS === "ios"
    ? { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 4 } }
    : { elevation: 1 };

const shadowTiny =
  Platform.OS === "ios"
    ? { shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 3 } }
    : { elevation: 1 };
