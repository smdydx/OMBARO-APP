import { CalendarDays, Users } from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BOOKINGS = [
  {
    id: 1,
    service: "Swedish Massage",
    customer: "Priya S.",
    when: "Today at 10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    service: "Deep Tissue",
    customer: "Rahul K.",
    when: "Today at 2:30 PM",
    status: "Confirmed",
  },
  {
    id: 3,
    service: "Aromatherapy",
    customer: "Anita D.",
    when: "Tomorrow at 4:00 PM",
    status: "Pending",
  },
  {
    id: 4,
    service: "Hot Stone",
    customer: "Vikram M.",
    when: "Tomorrow at 11:00 AM",
    status: "Confirmed",
  },
];

const FILTERS = ["Today", "This Week", "All"];

export default function BookingsTab() {
  const [activeFilter, setActiveFilter] = useState("Today");

  const filtered = BOOKINGS.filter((b) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Today") return b.when.startsWith("Today");
    if (activeFilter === "This Week") return true; // demo: show all for week
    return true;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Title + Filters */}
      <Text style={styles.heading}>Upcoming{"\n"}Bookings</Text>
      <View style={styles.filtersRow}>
        {FILTERS.map((label) => {
          const active = label === activeFilter;
          return (
            <TouchableOpacity
              key={label}
              onPress={() => setActiveFilter(label)}
              style={[
                styles.filterChip,
                active ? styles.filterChipActive : null,
              ]}
              activeOpacity={0.9}
            >
              <Text
                style={[
                  styles.filterText,
                  active ? styles.filterTextActive : null,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* List */}
      {filtered.map((b) => (
        <View key={b.id} style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <CalendarDays size={18} color="#22c55e" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.service}>{b.service}</Text>
              <Text style={styles.subLine}>{b.customer}</Text>
              <Text style={[styles.subLine, { marginTop: 2 }]}>{b.when}</Text>

              <View style={styles.badgesRow}>
                <StatusBadge status={b.status} />
              </View>
            </View>

            <View style={styles.actionsCol}>
              <OutlineBtn>
                <Users size={14} color="#016B3A" />
                <Text style={styles.btnText}>Assign</Text>
              </OutlineBtn>
              <OutlineBtn>
                <Text style={styles.btnText}>Manage</Text>
              </OutlineBtn>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

/* Small components */
const StatusBadge = ({ status }) => {
  const ok = status === "Confirmed";
  return (
    <View
      style={[
        styles.statusBadge,
        ok ? styles.statusOk : styles.statusPending,
      ]}
    >
      <Text
        style={[
          styles.statusText,
          ok ? styles.statusOkText : styles.statusPendingText,
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

const OutlineBtn = ({ children }) => (
  <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.9}>
    {children}
  </TouchableOpacity>
);

/* Styles */
const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 16 },
  heading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
  },

  filtersRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 6,
    gap: 10,
  },
  filterChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    backgroundColor: "#fff",
  },
  filterChipActive: {
    backgroundColor: "#DCFCE7",
  },
  filterText: { color: "#016B3A", fontWeight: "700" },
  filterTextActive: { color: "#014D2A" },

  card: {
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eef2f7",
    marginTop: 12,
  },
  row: { flexDirection: "row", alignItems: "center" },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#dcfce7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  service: { fontSize: 15, fontWeight: "800", color: "#0f172a" },
  subLine: { fontSize: 12, color: "#6b7280" },

  badgesRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  statusOk: { backgroundColor: "#dcfce7" },
  statusPending: { backgroundColor: "#fef3c7" },
  statusText: { fontSize: 11, fontWeight: "700" },
  statusOkText: { color: "#166534" },
  statusPendingText: { color: "#92400e" },

  actionsCol: {
    marginLeft: 10,
    alignItems: "flex-end",
    gap: 8,
  },
  outlineBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D1FAE5",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 6,
    backgroundColor: "#fff",
  },
  btnText: { color: "#016B3A", fontWeight: "700", fontSize: 13 },
});