// LeaveRequest.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  Plus,
  CheckCircle2,
  Clock3,
  CalendarDays,
  NotebookPen,
} from "lucide-react-native";

const BALANCE = [
  { label: "Casual Leave", days: 8 },
  { label: "Sick Leave", days: 12 },
  { label: "Earned Leave", days: 15 },
  { label: "Unpaid Leave", days: 0 },
];

const REQUESTS = [
  {
    id: 1,
    type: "Sick Leave",
    range: "15/01/2025 - 17/01/2025",
    reason: "Flu and fever",
    appliedOn: "10/01/2025",
    days: "3 days",
    status: "Approved",
    trail: "Approved by Manager on 11/01/2025",
  },
  {
    id: 2,
    type: "Casual Leave",
    range: "05/02/2025 - 06/02/2025",
    reason: "Personal work",
    appliedOn: "30/01/2025",
    days: "2 days",
    status: "Pending",
  },
];

export default function LeaveRequest() {
  return (
    <View style={styles.wrap}>
      {/* Top bar */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.navBtn}>
          <ArrowLeft size={18} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>Leave Requests</Text>
        <TouchableOpacity style={styles.addFab}>
          <Plus size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Leave Balance */}
        <LinearGradient
          colors={["#7b2ff7", "#f107a3"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceCard}
        >
          <Text style={styles.balanceTitle}>Leave Balance</Text>

          <View style={styles.balanceGrid}>
            {BALANCE.map((b) => (
              <LinearGradient
                key={b.label}
                colors={["rgba(255,255,255,0.22)", "rgba(255,255,255,0.14)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.balanceTile}
              >
                <Text style={styles.tileLabel}>{b.label}</Text>
                <Text style={styles.tileValue}>{b.days}</Text>
                <Text style={styles.tileSub}>days available</Text>
              </LinearGradient>
            ))}
          </View>
        </LinearGradient>

        {/* My Leave Requests */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>My Leave Requests</Text>

          {REQUESTS.map((r) => (
            <View
              key={r.id}
              style={[
                styles.reqCard,
                r.status === "Approved" && { borderColor: "#86efac" },
              ]}
            >
              {/* header */}
              <View style={styles.reqHeader}>
                <Text style={styles.reqType}>{r.type}</Text>
                <StatusChip status={r.status} />
              </View>

              {/* date range */}
              <View style={styles.row}>
                <CalendarDays size={16} color="#111827" />
                <Text style={styles.rangeText}>{r.range}</Text>
              </View>

              {/* reason */}
              <View style={styles.reasonBox}>
                <Text style={styles.reasonText}>{r.reason}</Text>
              </View>

              {/* applied + duration */}
              <View style={styles.footerRow}>
                <Text style={styles.appliedText}>Applied: {r.appliedOn}</Text>
                <Text style={styles.daysText}>{r.days}</Text>
              </View>

              {/* approval trail (for approved ones) */}
              {r.trail ? (
                <View style={styles.approvalNote}>
                  <CheckCircle2 size={18} color="#16a34a" />
                  <Text style={styles.approvalText}>{r.trail}</Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

/* Small components */
const StatusChip = ({ status }) => {
  const ok = status === "Approved";
  return (
    <View
      style={[
        styles.chip,
        ok ? styles.chipApproved : styles.chipPending,
      ]}
    >
      {ok ? (
        <CheckCircle2 size={16} color="#16a34a" />
      ) : (
        <Clock3 size={16} color="#ca8a04" />
      )}
      <Text
        style={[
          styles.chipText,
          ok ? { color: "#166534" } : { color: "#854d0e" },
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

/* Styles */
const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#fff" },

  topbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontWeight: "800",
    fontSize: 20,
    color: "#0f172a",
  },
  addFab: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#7c3aed",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Balance */
  balanceCard: {
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 22,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  balanceTitle: { color: "#fff", fontWeight: "800", fontSize: 20, marginBottom: 12 },
  balanceGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  balanceTile: {
    width: "48%",
    borderRadius: 18,
    padding: 14,
  },
  tileLabel: { color: "#fff", opacity: 0.95, fontWeight: "700" },
  tileValue: { color: "#fff", fontWeight: "900", fontSize: 28, marginTop: 6 },
  tileSub: { color: "#fff", opacity: 0.9, marginTop: 4 },

  /* Section */
  section: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
  },
  sectionHeading: { fontSize: 18, fontWeight: "800", color: "#0f172a", marginBottom: 10 },

  /* Requests */
  reqCard: {
    borderWidth: 2,
    borderColor: "#e9d5ff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  reqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reqType: { fontWeight: "800", color: "#0f172a", fontSize: 18 },

  row: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 },
  rangeText: { color: "#111827", fontWeight: "600" },

  reasonBox: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  reasonText: { color: "#334155", fontSize: 14 },

  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  appliedText: { color: "#475569" },
  daysText: { color: "#475569" },

  approvalNote: {
    marginTop: 10,
    backgroundColor: "#ecfdf5",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  approvalText: { color: "#065f46", fontWeight: "700" },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  chipApproved: { backgroundColor: "#dcfce7" },
  chipPending: { backgroundColor: "#fef3c7" },
  chipText: { fontWeight: "700" },
});