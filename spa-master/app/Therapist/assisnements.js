// Assignments.js
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  ArrowLeft,
  CalendarDays,
  User,
  Clock3,
  MapPin,
  CheckCircle2,
  Play,
  Navigation,
  Phone,
} from "lucide-react-native";

/* ------------ Demo Data ------------ */
const ALL_ASSIGNMENTS = [
  // Today
  {
    id: "t1",
    dateKey: "today",
    time: "10:00",
    status: "Assigned",
    customer: "Customer Name",
    service: "Swedish Full Body Massage",
    durationMin: 90,
    location: "123, MG Road, Koramangala, Bangalore",
  },
  {
    id: "t2",
    dateKey: "today",
    time: "14:30",
    status: "In Progress",
    customer: "Customer Name",
    service: "Swedish Full Body Massage",
    durationMin: 120,
    location: "456, Residency Rd, Bangalore",
  },

  // Upcoming
  {
    id: "u1",
    dateKey: "upcoming",
    time: "10:00",
    status: "Assigned",
    customer: "Customer Name",
    service: "Swedish Full Body Massage",
    durationMin: 90,
    location: "123, MG Road, Koramangala, Bangalore",
  },

  // Completed
  {
    id: "c1",
    dateKey: "completed",
    time: "16:00",
    status: "Completed",
    customer: "Customer Name",
    service: "Swedish Full Body Massage",
    durationMin: 60,
    location: "789, Whitefield, Bangalore",
  },
];

const TABS = ["Today", "Upcoming", "Completed", "All"];

/* ------------ Screen ------------ */
export default function Assignments() {
  const [activeTab, setActiveTab] = useState("Today");
  const [items, setItems] = useState(ALL_ASSIGNMENTS);

  const filtered = useMemo(() => {
    if (activeTab === "All") return items;
    if (activeTab === "Today")
      return items.filter((i) => i.dateKey === "today");
    if (activeTab === "Upcoming")
      return items.filter((i) => i.dateKey === "upcoming");
    if (activeTab === "Completed")
      return items.filter((i) => i.dateKey === "completed");
    return items;
  }, [activeTab, items]);

  const startService = (id) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, status: "In Progress", dateKey: "today" } : it
      )
    );
  };

  return (
    <View style={styles.wrap}>
      {/* Top Bar */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn}>
          <ArrowLeft size={18} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>My Assignments</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsRow}
      >
        {TABS.map((t) => {
          const active = t === activeTab;
          return (
            <TouchableOpacity
              key={t}
              onPress={() => setActiveTab(t)}
              style={[styles.tab, active && styles.tabActive]}
              activeOpacity={0.9}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {t}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* List */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.map((a) => (
          <AssignmentCard key={a.id} data={a} onStart={() => startService(a.id)} />
        ))}
        {filtered.length === 0 && (
          <Text style={styles.emptyMsg}>No assignments in this view.</Text>
        )}
      </ScrollView>
    </View>
  );
}

/* ------------ Components ------------ */

const AssignmentCard = ({ data, onStart }) => {
  const isCompleted = data.status === "Completed";
  const isInProgress = data.status === "In Progress";
  const isAssigned = data.status === "Assigned";

  return (
    <View style={styles.card}>
      {/* Badge row */}
      <View style={styles.badgeRow}>
        <StatusBadge status={data.status} />
        <Text style={styles.timeText}>{data.time}</Text>
      </View>

      {/* Info rows */}
      <Row
        icon={<User size={18} color="#0f172a" />}
        title="Customer Name"
        value={data.service}
      />
      <Row
        icon={<Clock3 size={18} color="#0f172a" />}
        title="Duration"
        value={`${data.durationMin} minutes`}
      />
      <Row
        icon={<MapPin size={18} color="#0f172a" />}
        title="Service Location"
        value={data.location}
      />

      {/* Completed banner */}
      {isCompleted && (
        <View style={styles.doneBanner}>
          <CheckCircle2 size={22} color="#15803d" />
          <Text style={styles.doneTitle}>Service Completed</Text>
          <Text style={styles.doneSub}>Thank you for your service!</Text>
        </View>
      )}

      {/* Actions */}
      {(isAssigned || isInProgress) && (
        <>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.primaryBtn}
            onPress={onStart}
          >
            <Play size={16} color="#fff" />
            <Text style={styles.primaryBtnText}>
              {isInProgress ? "Resume Service" : "Start Service"}
            </Text>
          </TouchableOpacity>

          <View style={styles.actionRow}>
            <OutlineBtn icon={<Navigation size={16} color="#0ea5e9" />} label="Navigate" />
            <OutlineBtn icon={<Phone size={16} color="#0ea5e9" />} label="Call" />
          </View>
        </>
      )}
    </View>
  );
};

const Row = ({ icon, title, value }) => (
  <View style={styles.row}>
    <View style={styles.rowIcon}>{icon}</View>
    <View style={{ flex: 1 }}>
      <Text style={styles.rowTitle}>{title}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  </View>
);

const StatusBadge = ({ status }) => {
  const map = {
    Completed: { bg: "#dcfce7", color: "#166534", icon: <CheckCircle2 size={16} color="#166534" /> },
    "In Progress": { bg: "#fef3c7", color: "#92400e", icon: <Clock3 size={16} color="#92400e" /> },
    Assigned: { bg: "#e0ecff", color: "#1d4ed8", icon: <CalendarDays size={16} color="#1d4ed8" /> },
  };
  const s = map[status] || map.Assigned;
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      {s.icon}
      <Text style={[styles.badgeText, { color: s.color }]}>{status}</Text>
    </View>
  );
};

const OutlineBtn = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.outlineBtn} onPress={onPress} activeOpacity={0.9}>
    {icon}
    <Text style={styles.outlineBtnText}>{label}</Text>
  </TouchableOpacity>
);

/* ------------ Styles ------------ */
const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#fff" },

  topbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
  },

  tabsRow: { paddingHorizontal: 16, gap: 10, paddingBottom: 8 },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
  },
  tabActive: { backgroundColor: "#7c3aed" },
  tabText: { color: "#111827", fontWeight: "700" },
  tabTextActive: { color: "#fff" },

  list: { paddingHorizontal: 16 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },

  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  timeText: { color: "#111827", fontWeight: "700" },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  badgeText: { fontWeight: "700" },

  row: { flexDirection: "row", alignItems: "flex-start", marginTop: 14 },
  rowIcon: {
    width: 32,
    alignItems: "center",
    marginRight: 10,
    paddingTop: 2,
  },
  rowTitle: { fontWeight: "800", color: "#0f172a", fontSize: 15 },
  rowValue: { color: "#374151", marginTop: 4, lineHeight: 20 },

  doneBanner: {
    marginTop: 16,
    backgroundColor: "#ecfdf5",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  doneTitle: { color: "#065f46", fontWeight: "800", marginTop: 6 },
  doneSub: { color: "#0f766e", marginTop: 2 },

  primaryBtn: {
    marginTop: 14,
    backgroundColor: "#075985",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  primaryBtnText: { color: "#fff", fontWeight: "800", fontSize: 16 },

  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#7dd3fc",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fff",
  },
  outlineBtnText: { color: "#0ea5e9", fontWeight: "800" },

  emptyMsg: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
  },
});