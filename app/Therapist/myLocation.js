// myLocation.js
import {
  ArrowLeft,
  Clock3,
  Info,
  MapPin,
  Send,
} from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const myLocation = () => {
  const [isTracking, setIsTracking] = useState(false);

  return (
    <View style={styles.wrap}>
      {/* Top Bar */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn}>
          <ArrowLeft size={18} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>Location Tracking</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Tracking status */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.iconCircle}>
              <MapPin size={22} color="#22c55e" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>
                {isTracking ? "Location Tracking Active" : "Location Tracking Inactive"}
              </Text>
              <Text style={styles.muted}>
                {isTracking
                  ? "We’re logging your location for attendance."
                  : "Start tracking when you begin work"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.92}
            style={[styles.primaryBtn, isTracking && { backgroundColor: "#ef4444" }]}
            onPress={() => setIsTracking((v) => !v)}
          >
            <Send size={18} color="#fff" />
            <Text style={styles.primaryText}>
              {isTracking ? "Stop Tracking" : "Start Tracking"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Location history */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Location History</Text>
            <Clock3 size={18} color="#7c3aed" />
          </View>

          {/* Empty state (swap with a FlatList when you have data) */}
          <View style={styles.emptyBox}>
            <MapPin size={36} color="#c7cdd8" />
            <Text style={styles.emptyTitle}>No location history yet</Text>
            <Text style={styles.mutedCenter}>
              Start tracking to see your location history
            </Text>
          </View>
        </View>

        {/* Why track location? */}
        <View style={styles.infoBox}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Info size={16} color="#0ea5e9" />
            <Text style={styles.infoTitle}>Why track location?</Text>
          </View>
          <Text style={styles.infoText}>
            Location helps verify on-site attendance, improve assignment routing,
            and calculate accurate travel time. Your data is stored securely.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default myLocation;

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
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
  },

  section: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12, gap: 12 },
  iconCircle: {
    width: 48,
    height: 48,
    backgroundColor: "#dcfce7",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { fontWeight: "800", color: "#111827", fontSize: 16 },
  muted: { color: "#6b7280", marginTop: 2 },
  mutedCenter: { color: "#6b7280", marginTop: 4, textAlign: "center" },

  primaryBtn: {
    marginTop: 12,
    backgroundColor: "#075985",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  primaryText: { color: "#fff", fontWeight: "800", fontSize: 16 },

  emptyBox: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingVertical: 28,
    alignItems: "center",
  },
  emptyTitle: { color: "#111827", fontWeight: "700", marginTop: 10 },

  infoBox: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: "#f0f9ff",
    borderWidth: 1,
    borderColor: "#bae6fd",
    borderRadius: 16,
    padding: 14,
  },
  infoTitle: { color: "#0ea5e9", fontWeight: "800" },
  infoText: { color: "#334155", marginTop: 6, lineHeight: 20 },
});