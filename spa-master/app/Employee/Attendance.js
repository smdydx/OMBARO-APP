// Attendance.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Coffee,
  User,
  RotateCcw,
} from "lucide-react-native";

const summary = [
  { key: "Present", value: 1, bg: "#dcfce7", color: "#166534", Icon: CheckCircle },
  { key: "Absent", value: 0, bg: "#fee2e2", color: "#991b1b", Icon: XCircle },
  { key: "Late", value: 1, bg: "#fef9c3", color: "#854d0e", Icon: Clock },
  { key: "Half Day", value: 0, bg: "#e0f2fe", color: "#0369a1", Icon: Coffee },
];

const employees = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Senior Therapist",
    time: "9:00 AM - 6:00 PM",
    status: "PRESENT",
    meta: "Check-in: 8:55 AM",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    role: "Massage Therapist",
    time: "10:00 AM - 7:00 PM",
    status: "LATE",
    meta: "Check-in: 10:15 AM\nNote: Traffic delay",
  },
  { id: 3, name: "Anita Desai", role: "Receptionist", time: "8:00 AM - 5:00 PM" },
  { id: 4, name: "Vikram Singh", role: "Spa Manager", time: "9:00 AM - 6:00 PM" },
  { id: 5, name: "Meera Patel", role: "Ayurvedic Specialist", time: "11:00 AM - 8:00 PM" },
];

export default function Attendance() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Tabs are outside; this component renders only content */}

      {/* Section Header */}
      <Text style={styles.heading}>Attendance Tracker</Text>
      <View style={styles.headerSubRow}>
        <Text style={styles.subText}>Mark and track employee attendance</Text>
        <TouchableOpacity style={styles.dateInput}>
          <Text style={styles.dateText}>10/04/2025</Text>
          <Calendar size={16} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View style={styles.summaryGrid}>
        {summary.map(({ key, value, bg, color, Icon }) => (
          <View key={key} style={[styles.summaryCard, { backgroundColor: "#fff" }]}>
            <View style={[styles.summaryIconWrap, { backgroundColor: bg }]}>
              <Icon size={18} color={color} />
            </View>
            <View>
              <Text style={styles.summaryValue}>{value}</Text>
              <Text style={styles.summaryLabel}>{key}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Employee Attendance List */}
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Employee Attendance</Text>

        {employees.map((emp) => (
          <View key={emp.id} style={styles.empCard}>
            <View style={styles.empRow}>
              <View style={styles.avatar}>
                <User size={18} color="#7c3aed" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.empName}>{emp.name}</Text>
                <Text style={styles.empRole}>{emp.role}</Text>
                <Text style={styles.empTime}>{emp.time}</Text>

                {emp.status && (
                  <View style={styles.statusRow}>
                    <StatusChip status={emp.status} />
                    {emp.meta ? <Text style={styles.metaText}>{emp.meta}</Text> : null}
                  </View>
                )}
              </View>

              <TouchableOpacity style={styles.resetBtn}>
                <Text style={styles.resetText}>Reset</Text>
              </TouchableOpacity>
            </View>

            {/* Inline quick status actions */}
            {!emp.status && (
              <View style={styles.quickRow}>
                <RoundBtn bg="#dcfce7">
                  <CheckCircle size={16} color="#166534" />
                </RoundBtn>
                <RoundBtn bg="#fef9c3">
                  <Clock size={16} color="#854d0e" />
                </RoundBtn>
                <RoundBtn bg="#fee2e2">
                  <XCircle size={16} color="#991b1b" />
                </RoundBtn>
                <RoundBtn bg="#e0f2fe">
                  <Coffee size={16} color="#0369a1" />
                </RoundBtn>
                <RoundBtn bg="#e5e7eb">
                  <RotateCcw size={16} color="#374151" />
                </RoundBtn>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Notes */}
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Add Notes (Optional)</Text>
        <TextInput
          style={styles.notes}
          placeholder="Add any notes about attendance (e.g., reason for lateness, early departure, etc.)"
          placeholderTextColor="#9ca3af"
          multiline
        />
      </View>
    </ScrollView>
  );
}

/* Helpers */
const StatusChip = ({ status }) => {
  const map = {
    PRESENT: { bg: "#dcfce7", color: "#166534", Icon: CheckCircle },
    LATE: { bg: "#fef9c3", color: "#854d0e", Icon: Clock },
    ABSENT: { bg: "#fee2e2", color: "#991b1b", Icon: XCircle },
    "HALF DAY": { bg: "#e0f2fe", color: "#0369a1", Icon: Coffee },
  };
  const meta = map[status] || map.PRESENT;
  const Ico = meta.Icon;
  return (
    <View style={[styles.chip, { backgroundColor: meta.bg }]}>
      <Ico size={14} color={meta.color} />
      <Text style={[styles.chipText, { color: meta.color }]}>{status}</Text>
    </View>
  );
};

const RoundBtn = ({ children, bg }) => (
  <TouchableOpacity style={[styles.roundBtn, { backgroundColor: bg }]}>
    {children}
  </TouchableOpacity>
);

/* Styles */
const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 16 },
  heading: { fontSize: 18, fontWeight: "700", color: "#111827" },
  headerSubRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  subText: { color: "#6b7280", fontSize: 12, flex: 1, paddingRight: 10 },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dateText: { fontSize: 13, color: "#111827", marginRight: 8 },

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 14,
  },
  summaryCard: {
    width: "48%",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eef2f7",
    flexDirection: "row",
    alignItems: "center",
  },
  summaryIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  summaryValue: { fontSize: 18, fontWeight: "700", color: "#111827" },
  summaryLabel: { fontSize: 12, color: "#6b7280" },

  block: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#eef2f7",
  },
  blockTitle: { fontSize: 16, fontWeight: "700", color: "#111827", marginBottom: 10 },

  empCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  empRow: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#efe2ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  empName: { fontWeight: "700", color: "#111827" },
  empRole: { fontSize: 12, color: "#6b7280" },
  empTime: { fontSize: 12, color: "#6b7280", marginTop: 2 },

  statusRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  chipText: { marginLeft: 4, fontSize: 11, fontWeight: "700" },
  metaText: { fontSize: 11, color: "#6b7280" },

  resetBtn: {
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: 8,
    alignSelf: "flex-start",
  },
  resetText: { color: "#3b82f6", fontWeight: "600", fontSize: 12 },

  quickRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },
  roundBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  notes: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
    textAlignVertical: "top",
    color: "#111827",
  },
});
