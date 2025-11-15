// Overview.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  CalendarDays,
  DollarSign,
  Star,
  Package,
  Plus,
  Clock,
  Settings,
  Wallet,
} from "lucide-react-native";

export default function OverviewTab() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Performance Overview */}
      <Text style={styles.heading}>Performance Overview</Text>

      <View style={styles.grid}>
        <StatCard
          icon={<Package size={18} color="#2563eb" />}
          tint="#e0ecff"
          label="Active Services"
          value="24"
          sub="+3 this month"
        />
        <StatCard
          icon={<DollarSign size={18} color="#16a34a" />}
          tint="#dcfce7"
          label="Revenue (This Month)"
          value="₹45,280"
          sub="+18% growth"
          big
        />
        <StatCard
          icon={<CalendarDays size={18} color="#7c3aed" />}
          tint="#efe2ff"
          label="Total Bookings"
          value="156"
          sub="+12 this week"
        />
        <StatCard
          icon={<Star size={18} color="#f59e0b" fill="#f59e0b" />}
          tint="#fff7ed"
          label="Avg. Rating"
          value="4.7"
          sub="Across 96 reviews"
        />
      </View>

      {/* Quick Actions */}
      <Text style={styles.subheading}>Quick Actions</Text>
      <View style={styles.actionsRow}>
        <ActionBtn
          icon={<Plus size={18} color="#fff" />}
          label="Add Service"
          bg="#0369a1"
        />
        <ActionBtn
          icon={<Clock size={18} color="#0ea5e9" />}
          label="Manage Slots"
          outline
        />
        <ActionBtn
          icon={<Wallet size={18} color="#22c55e" />}
          label="Payouts"
          outline
        />
        <ActionBtn
          icon={<Settings size={18} color="#475569" />}
          label="Settings"
          outline
        />
      </View>

      {/* Upcoming Bookings */}
      <Text style={styles.subheading}>Upcoming Bookings</Text>
      <View style={styles.cardList}>
        <BookingItem
          name="Aarav Mehta"
          service="Aromatherapy Massage"
          time="Today • 3:30 PM"
          note="Room 2"
        />
        <BookingItem
          name="Riya Patel"
          service="Hot Stone Therapy"
          time="Today • 5:00 PM"
          note="Repeat client"
        />
        <BookingItem
          name="Karan Sharma"
          service="Deep Tissue Massage"
          time="Tomorrow • 10:00 AM"
        />
      </View>
    </ScrollView>
  );
}

/* --- Reusable bits --- */
const StatCard = ({ icon, tint, label, value, sub, big }) => (
  <View style={styles.statCard}>
    <View style={[styles.iconWrap, { backgroundColor: tint }]}>{icon}</View>
    <View style={{ flex: 1 }}>
      <Text style={[styles.value, big && styles.valueBig]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.sub}>{sub}</Text>
    </View>
  </View>
);

const ActionBtn = ({ icon, label, bg, outline }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    style={[
      styles.actionBtn,
      outline && styles.actionOutline,
      bg && { backgroundColor: bg, borderColor: bg },
    ]}
  >
    <View style={[styles.actionIcon, outline && { backgroundColor: "#f1f5f9" }]}>
      {icon}
    </View>
    <Text style={[styles.actionText, bg && { color: "#fff" }]}>{label}</Text>
  </TouchableOpacity>
);

const BookingItem = ({ name, service, time, note }) => (
  <View style={styles.bookingCard}>
    <View>
      <Text style={styles.bookingName}>{name}</Text>
      <Text style={styles.bookingService}>{service}</Text>
      <Text style={styles.bookingTime}>{time}</Text>
      {note ? <Text style={styles.bookingNote}>{note}</Text> : null}
    </View>
  </View>
);

/* --- Styles --- */
const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 18, fontWeight: "800", color: "#0f172a", marginBottom: 10 },

  grid: { rowGap: 10 },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eef2f7",
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  value: { fontSize: 20, fontWeight: "800", color: "#0f172a" },
  valueBig: { fontSize: 24 },
  label: { fontSize: 14, color: "#334155" },
  sub: { color: "#94a3b8", fontSize: 12, marginTop: 6 },

  subheading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
    marginTop: 16,
    marginBottom: 8,
  },

  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  actionOutline: { backgroundColor: "#fff" },
  actionIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  actionText: { fontWeight: "700", color: "#0f172a" },

  cardList: { gap: 10 },
  bookingCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eef2f7",
  },
  bookingName: { fontWeight: "700", color: "#111827" },
  bookingService: { fontSize: 12, color: "#475569", marginTop: 2 },
  bookingTime: { fontSize: 12, color: "#64748b", marginTop: 2 },
  bookingNote: { fontSize: 11, color: "#94a3b8", marginTop: 4 },
});