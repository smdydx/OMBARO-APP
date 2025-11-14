// MySchedule.js
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  CalendarDays,
  ClipboardCopy,
  Clock3,
  Plus,
  Trash2,
} from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const initialWeek = [
  { day: "Monday",     start: "09:00", end: "18:00", available: true },
  { day: "Tuesday",    start: "09:00", end: "18:00", available: true },
  { day: "Wednesday",  start: "09:00", end: "18:00", available: true },
  { day: "Thursday",   start: "09:00", end: "18:00", available: true },
  { day: "Friday",     start: "09:00", end: "18:00", available: true },
  { day: "Saturday",   start: "10:00", end: "16:00", available: true },
  { day: "Sunday",     start: "",      end: "",      available: false },
];

export default function MySchedule() {
  const [week, setWeek] = useState(initialWeek);
  const [breaks, setBreaks] = useState([{ id: "b1", label: "Lunch Break", start: "13:00", end: "14:00" }]);

  const copyDay = (index) => {
    // Copies the selected day's time into the next available day
    const src = week[index];
    if (!src.available) return;
    const nextIdx = Math.min(index + 1, week.length - 1);
    setWeek((prev) =>
      prev.map((d, i) =>
        i === nextIdx
          ? { ...d, start: src.start, end: src.end, available: true }
          : d
      )
    );
  };

  const addBreak = () => {
    const n = breaks.length + 1;
    setBreaks((b) => [
      ...b,
      { id: `b${n}`, label: `Break ${n}`, start: "13:00", end: "14:00" },
    ]);
  };

  const deleteBreak = (id) => setBreaks((b) => b.filter((x) => x.id !== id));

  const save = () => {
    // Replace with API call
    Alert.alert("Saved", "Your schedule changes have been saved.");
  };

  return (
    <View style={styles.wrap}>
      {/* Top Bar */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn}>
          <ArrowLeft size={18} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>My Schedule</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        {/* Weekly Schedule */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Weekly Schedule</Text>
            <CalendarDays size={18} color="#7c3aed" />
          </View>

          {week.map((d, idx) => (
            <View style={styles.dayCard} key={d.day}>
              <View style={styles.dayHeaderRow}>
                <Text style={styles.dayTitle}>{d.day}</Text>

                <TouchableOpacity
                  onPress={() => copyDay(idx)}
                  style={styles.copyBtn}
                  activeOpacity={0.8}
                >
                  <ClipboardCopy size={16} color="#334155" />
                </TouchableOpacity>
              </View>

              <View style={styles.timeRow}>
                <Clock3 size={16} color="#334155" />
                <Text style={styles.timeText}>
                  {d.available ? `${d.start} - ${d.end}` : "—"}
                </Text>
                <Text style={[styles.availability, { color: d.available ? "#16a34a" : "#94a3b8" }]}>
                  {d.available ? "Available" : "Not Available"}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Break Times */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Break Times</Text>
            <TouchableOpacity style={styles.addBreakBtn} onPress={addBreak}>
              <Plus size={16} color="#0ea5e9" />
              <Text style={styles.addBreakText}>Add Break</Text>
            </TouchableOpacity>
          </View>

          {breaks.map((b) => (
            <View key={b.id} style={styles.breakCard}>
              <Text style={styles.breakTitle}>{b.label}</Text>
              <TouchableOpacity style={styles.breakDelete} onPress={() => deleteBreak(b.id)}>
                <Trash2 size={16} color="#ef4444" />
              </TouchableOpacity>

              <View style={styles.timeRow}>
                <Clock3 size={16} color="#334155" />
                <Text style={styles.timeText}>{b.start} - {b.end}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Save */}
        <TouchableOpacity activeOpacity={0.95} onPress={save} style={{ marginHorizontal: 16 }}>
          <LinearGradient
            colors={["#0ea5e9", "#0369a1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.saveBtn}
          >
            <Text style={styles.saveText}>Save All Changes</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#fff" },

  topbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { flex: 1, textAlign: "center", fontSize: 20, fontWeight: "800", color: "#0f172a" },

  section: {
    marginHorizontal: 16,
    backgroundColor: "#f8fafc",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
    marginTop: 12,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#0f172a" },

  dayCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 10,
  },
  dayHeaderRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  dayTitle: { fontSize: 16, fontWeight: "800", color: "#0f172a" },
  copyBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },

  timeRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 10 },
  timeText: { color: "#111827", fontWeight: "700" },
  availability: { marginLeft: "auto", fontWeight: "700" },

  addBreakBtn: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#7dd3fc",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  addBreakText: { color: "#0ea5e9", fontWeight: "700", marginLeft: 6 },

  breakCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginTop: 10,
  },
  breakTitle: { fontWeight: "800", color: "#0f172a", fontSize: 15 },
  breakDelete: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#fee2e2",
    alignItems: "center",
    justifyContent: "center",
  },

  saveBtn: {
    marginTop: 16,
    marginBottom: 20,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  saveText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});