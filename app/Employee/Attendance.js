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
  container: { backgroundColor: "#F0FDF4", padding: 12 },
  heading: { fontSize: 16, fontWeight: "700", color: "#014D2A" },
  headerSubRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  subText: { color: "#047857", fontSize: 11, flex: 1, paddingRight: 8 },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D1FAE5",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  dateText: { fontSize: 11, color: "#014D2A", marginRight: 6 },

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  summaryCard: {
    width: "48%",
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    flexDirection: "row",
    alignItems: "center",
  },
  summaryIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  summaryValue: { fontSize: 16, fontWeight: "700", color: "#014D2A" },
  summaryLabel: { fontSize: 10, color: "#047857" },

  block: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  blockTitle: { fontSize: 14, fontWeight: "700", color: "#014D2A", marginBottom: 8 },

  empCard: {
    backgroundColor: "#FAFFFE",
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  empRow: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#E6F7EE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  empName: { fontWeight: "700", color: "#014D2A", fontSize: 13 },
  empRole: { fontSize: 10, color: "#047857" },
  empTime: { fontSize: 10, color: "#047857", marginTop: 1 },

  statusRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
  },
  chipText: { marginLeft: 3, fontSize: 10, fontWeight: "700" },
  metaText: { fontSize: 10, color: "#047857" },

  resetBtn: {
    borderWidth: 1,
    borderColor: "#10B981",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginLeft: 6,
    alignSelf: "flex-start",
  },
  resetText: { color: "#016B3A", fontWeight: "600", fontSize: 11 },

  quickRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 6,
  },
  roundBtn: {
    width: 28,
    height: 28,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },

  notes: {
    minHeight: 90,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    color: "#014D2A",
    fontSize: 12,
  },
});
