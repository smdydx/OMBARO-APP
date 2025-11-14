// src/screens/LeaveManagementScreen.js
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

/* ===== THEME ===== */
const COLORS = {
  bg: "#F6F8FB",
  surface: "#FFFFFF",
  text: "#0F172A",
  textMuted: "#64748B",
  border: "rgba(2,6,23,0.08)",
  divider: "rgba(2,6,23,0.06)",
  grad1: "#8B5CF6",
  grad2: "#EC4899",
  purple: "#7C3AED",
  purpleSoft: "#F3E8FF",
  primary: "#2563EB",
  successBg: "#DCFCE7",
  successText: "#15803D",
  pendingBg: "#FEF9C3",
  pendingText: "#A16207",
};

/* ===== responsive helper ===== */
function useScale() {
  const { width } = useWindowDimensions();
  const base = Math.min(Math.max(width, 320), 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw };
}

/* ===== small primitives ===== */
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

const Field = ({ label, placeholder, value, onChangeText, right, multiline, sw, keyboardType }) => (
  <View style={{ marginBottom: sw(12) }}>
    <Text style={{ color: COLORS.text, fontWeight: "700", fontSize: sw(14), marginBottom: sw(6) }}>
      {label}
    </Text>
    <View
      style={{
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: sw(14),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: sw(12),
        backgroundColor: "#F9FAFB",
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        multiline={multiline}
        keyboardType={keyboardType}
        style={{
          flex: 1,
          paddingVertical: sw(12),
          fontSize: sw(15),
          color: COLORS.text,
          minHeight: multiline ? sw(100) : undefined,
          textAlignVertical: multiline ? "top" : "center",
        }}
      />
      {right}
    </View>
  </View>
);

const GhostButton = ({ label, onPress, sw }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      {
        alignSelf: "center",
        paddingVertical: sw(14),
        paddingHorizontal: sw(16),
        borderRadius: sw(14),
        backgroundColor: "#E6F0FF",
        borderWidth: 1.5,
        borderColor: "#86B6FF",
        opacity: pressed ? 0.9 : 1,
      },
    ]}
  >
    <Text style={{ color: COLORS.primary, fontSize: sw(15), fontWeight: "800" }}>{label}</Text>
  </Pressable>
);

const SolidCTA = ({ label, onPress, sw, disabled }) => (
  <Pressable
    disabled={disabled}
    onPress={onPress}
    style={({ pressed }) => [
      {
        borderRadius: sw(16),
        overflow: "hidden",
        opacity: disabled ? 0.5 : pressed ? 0.92 : 1,
      },
      shadowStyle,
    ]}
  >
    <LinearGradient
      colors={["#82C5FF", "#3B82F6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ paddingVertical: sw(16), alignItems: "center" }}
    >
      <Text style={{ color: "#fff", fontWeight: "900", fontSize: sw(16) }}>📄 {label}</Text>
    </LinearGradient>
  </Pressable>
);

const TabButton = ({ label, active, onPress, sw }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      {
        paddingVertical: sw(12),
        paddingHorizontal: sw(16),
        borderRadius: sw(14),
        backgroundColor: active ? "#fff" : "rgba(255,255,255,0.25)",
        borderWidth: active ? 1.5 : 0,
        borderColor: active ? "rgba(255,255,255,0.35)" : "transparent",
        opacity: pressed ? 0.9 : 1,
      },
      shadowTiny,
    ]}
  >
    <Text
      style={{
        color: active ? COLORS.purple : "#fff",
        fontWeight: active ? "800" : "700",
        fontSize: sw(14),
      }}
    >
      {label}
    </Text>
  </Pressable>
);

const Badge = ({ type, sw }) => {
  const isApproved = type === "approved";
  const bg = isApproved ? COLORS.successBg : COLORS.pendingBg;
  const tx = isApproved ? COLORS.successText : COLORS.pendingText;
  const text = isApproved ? "✓ Approved" : "🕒 Pending";
  return (
    <View
      style={{
        backgroundColor: bg,
        paddingHorizontal: sw(10),
        paddingVertical: sw(6),
        borderRadius: sw(10),
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ color: tx, fontWeight: "800", fontSize: sw(12) }}>{text}</Text>
    </View>
  );
};

const HistoryItem = ({ item, sw }) => (
  <View
    style={{
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: sw(16),
      padding: sw(14),
      marginBottom: sw(14),
      backgroundColor: "#fff",
    }}
  >
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <Text style={{ color: COLORS.text, fontSize: sw(16), fontWeight: "900" }}>{item.type}</Text>
      <Badge type={item.status} sw={sw} />
    </View>

    <Text style={{ color: COLORS.text, marginTop: sw(8), fontSize: sw(14) }}>
      {item.from} - {item.to}
    </Text>
    <Text style={{ color: COLORS.textMuted, fontSize: sw(13), marginTop: sw(2) }}>
      {item.days} {item.days > 1 ? "days" : "day"}
    </Text>

    <Text style={{ color: COLORS.text, fontSize: sw(15), marginTop: sw(12) }}>{item.reason}</Text>

    <Text style={{ color: COLORS.textMuted, fontSize: sw(13), marginTop: sw(10) }}>
      Applied: {item.applied}
      {item.approved ? `   •   Approved: ${item.approved} by Manager` : ""}
    </Text>
  </View>
);

/* ===== MAIN SCREEN ===== */
export default function LeaveManage({
  onBack,
  onSubmitLeave, // (payload) => void
  onPickFromDate,
  onPickToDate,
  onPickFiles, // () => void
}) {
  const { sw } = useScale();
  const [tab, setTab] = useState("apply"); // "apply" | "history"

  const navigation = useNavigation();

  // demo balances
  const balances = useMemo(
    () => [
      { label: "Casual Leave", value: 8 },
      { label: "Sick Leave", value: 5 },
      { label: "Earned Leave", value: 15 },
      { label: "Maternity Leave", value: 180 },
      { label: "Paternity Leave", value: 15 },
      { label: "Emergency Leave", value: 3 },
    ],
    []
  );

  // demo form state
  const [leaveType, setLeaveType] = useState("Casual Leave");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [fileCount, setFileCount] = useState(0);

  const submit = useCallback(() => {
    const payload = { leaveType, fromDate, toDate, reason, fileCount };
    onSubmitLeave && onSubmitLeave(payload);
  }, [leaveType, fromDate, toDate, reason, fileCount, onSubmitLeave]);

  // demo history data
  const history = useMemo(
    () => [
      {
        id: "1",
        type: "Casual Leave",
        from: "10/01/2025",
        to: "12/01/2025",
        days: 3,
        reason: "Family function",
        status: "approved",
        applied: "05/01/2025",
        approved: "06/01/2025",
      },
      {
        id: "2",
        type: "Sick Leave",
        from: "20/12/2024",
        to: "22/12/2024",
        days: 3,
        reason: "Fever and cold",
        status: "approved",
        applied: "19/12/2024",
        approved: "19/12/2024",
      },
      {
        id: "3",
        type: "Earned Leave",
        from: "15/02/2025",
        to: "20/02/2025",
        days: 6,
        reason: "Vacation with family",
        status: "pending",
        applied: "10/01/2025",
      },
    ],
    []
  );

  /* ---------- RENDER ---------- */
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" />
      {/* Header with gradient + tabs */}
      <LinearGradient colors={[COLORS.grad1, COLORS.grad2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={{ paddingHorizontal: sw(16), paddingTop: sw(40), paddingBottom: sw(16) }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(12) }}>
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
              <Text style={{ color: "#fff", fontSize: sw(20), fontWeight: "900" }}>Leave Management</Text>
              <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(13), marginTop: sw(2) }}>
                Apply for leave or view history
              </Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={{ flexDirection: "row", gap: sw(12), alignSelf: "center" }}>
            <TabButton label="Apply Leave" active={tab === "apply"} onPress={() => setTab("apply")} sw={sw} />
            <TabButton label="Leave History" active={tab === "history"} onPress={() => setTab("history")} sw={sw} />
          </View>
        </View>
      </LinearGradient>

      {/* CONTENT */}
      {tab === "apply" ? (
        // Apply tab uses a ScrollView (no FlatList inside it)
        <ScrollView contentContainerStyle={{ padding: sw(16), paddingBottom: sw(28) }} showsVerticalScrollIndicator={false}>
          {/* Leave Balance */}
          <Card sw={sw} style={{ marginBottom: sw(16) }}>
            <Text style={{ color: COLORS.text, fontWeight: "900", fontSize: sw(18), marginBottom: sw(12) }}>
              Leave Balance
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: sw(12) }}>
              {balances.map((b) => (
                <View
                  key={b.label}
                  style={[
                    {
                      width: "48%",
                      backgroundColor: "#FAF8FF",
                      borderRadius: sw(14),
                      paddingVertical: sw(16),
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: COLORS.border,
                    },
                    shadowTiny,
                  ]}
                >
                  <Text style={{ color: COLORS.purple, fontWeight: "900", fontSize: sw(20) }}>{b.value}</Text>
                  <Text style={{ color: COLORS.text, fontSize: sw(13), marginTop: sw(4), textAlign: "center" }}>
                    {b.label}
                  </Text>
                </View>
              ))}
            </View>
          </Card>

          {/* Apply for Leave */}
          <Card sw={sw}>
            <Text style={{ color: COLORS.text, fontWeight: "900", fontSize: sw(18), marginBottom: sw(12) }}>
              Apply for Leave
            </Text>

            {/* Leave Type (simple dropdown mock) */}
            <Field
              sw={sw}
              label="Leave Type"
              value={leaveType}
              onChangeText={setLeaveType}
              placeholder="Select"
              right={<Text style={{ color: COLORS.textMuted, fontSize: sw(16) }}>▾</Text>}
            />

            {/* From / To Dates */}
            <Field
              sw={sw}
              label="From Date"
              value={fromDate}
              onChangeText={setFromDate}
              placeholder="mm/dd/yyyy"
              right={
                <Pressable onPress={() => onPickFromDate?.(setFromDate)}>
                  <Text style={{ color: COLORS.textMuted, fontSize: sw(16) }}>📅</Text>
                </Pressable>
              }
            />
            <Field
              sw={sw}
              label="To Date"
              value={toDate}
              onChangeText={setToDate}
              placeholder="mm/dd/yyyy"
              right={
                <Pressable onPress={() => onPickToDate?.(setToDate)}>
                  <Text style={{ color: COLORS.textMuted, fontSize: sw(16) }}>📅</Text>
                </Pressable>
              }
            />

            {/* Reason */}
            <Field
              sw={sw}
              label="Reason"
              value={reason}
              onChangeText={setReason}
              placeholder="Please provide reason for leave..."
              multiline
            />

            {/* Upload box */}
            <View
              style={{
                borderStyle: "dashed",
                borderWidth: 1.5,
                borderColor: COLORS.border,
                borderRadius: sw(14),
                padding: sw(16),
                alignItems: "center",
                marginBottom: sw(14),
                backgroundColor: "#FBFBFD",
              }}
            >
              <Text style={{ fontSize: sw(28), marginBottom: sw(6) }}>⬆️</Text>
              <Text style={{ color: COLORS.textMuted, textAlign: "center", fontSize: sw(13) }}>
                Upload medical certificate or other documents
              </Text>
              <View style={{ height: sw(10) }} />
              <GhostButton
                label={fileCount > 0 ? `${fileCount} file(s) selected` : "Choose Files"}
                onPress={async () => {
                  await onPickFiles?.((count) => setFileCount(count));
                }}
                sw={sw}
              />
            </View>

            <SolidCTA label="Submit Leave Request" onPress={submit} sw={sw} disabled={!leaveType || !fromDate || !toDate || !reason} />
          </Card>
        </ScrollView>
      ) : (
        // History tab uses a FlatList (single scrollable, no nesting)
        <View style={{ flex: 1, padding: sw(16), paddingBottom: sw(12) }}>
          <Card sw={sw} style={{ paddingBottom: 0 }}>
            <Text style={{ color: COLORS.text, fontWeight: "900", fontSize: sw(18), marginBottom: sw(12) }}>
              Leave History
            </Text>

            <FlatList
              data={history}
              keyExtractor={(it) => it.id}
              renderItem={({ item }) => <HistoryItem item={item} sw={sw} />}
              contentContainerStyle={{ paddingBottom: sw(16) }}
              showsVerticalScrollIndicator={false}
            />
          </Card>
        </View>
      )}
    </SafeAreaView>
  );
}

/* ===== shadows ===== */
const shadowStyle =
  Platform.OS === "ios"
    ? { shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } }
    : { elevation: 2 };

const shadowTiny =
  Platform.OS === "ios"
    ? { shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 3 } }
    : { elevation: 1 };
