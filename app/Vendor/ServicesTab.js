// MyServices.js
import {
  Eye,
  LayoutList,
  Package,
  Plus,
  Settings,
  Star,
} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SERVICES = [
  {
    id: 1,
    name: "Swedish Full Body Massage",
    price: "₹2500",
    duration: "90 min",
    bookings: 45,
    status: "Active",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Deep Tissue Massage",
    price: "₹3200",
    duration: "120 min",
    bookings: 38,
    status: "Active",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Aromatherapy Session",
    price: "₹4500",
    duration: "150 min",
    bookings: 22,
    status: "Active",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Hot Stone Therapy",
    price: "₹2800",
    duration: "100 min",
    bookings: 31,
    status: "Paused",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Couples Massage",
    price: "₹6500",
    duration: "120 min",
    bookings: 18,
    status: "Active",
    rating: 4.9,
  },
];

export default function ServicesTab() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Heading + Add Service */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>My Services</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Plus size={16} color="#fff" />
          <Text style={styles.addText}>Add Service</Text>
        </TouchableOpacity>
      </View>

      {/* Service cards */}
      {SERVICES.map((s) => (
        <View key={s.id} style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Package size={18} color="#7c3aed" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{s.name}</Text>
              <Text style={styles.meta}>
                {s.price} • {s.duration}
              </Text>
              <Text style={styles.subMeta}>• {s.bookings} bookings</Text>

              <View style={styles.badgeRow}>
                <View
                  style={[
                    styles.badge,
                    s.status === "Active" ? styles.active : styles.paused,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      s.status === "Active" ? styles.activeText : styles.pausedText,
                    ]}
                  >
                    {s.status}
                  </Text>
                </View>

                <View style={styles.ratingRow}>
                  <Star size={12} color="#f59e0b" fill="#f59e0b" />
                  <Text style={styles.ratingText}>{s.rating}</Text>
                </View>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.btnIcon}>
                <Eye size={16} color="#3b82f6" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnIcon, styles.btnIconGray]}>
                <LayoutList size={16} color="#475569" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnIcon, styles.btnIconYellow]}>
                <Settings size={16} color="#ca8a04" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

/* ---- Styles ---- */
const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  heading: { fontSize: 18, fontWeight: "800", color: "#0f172a" },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#016B3A",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  addText: { color: "#fff", fontWeight: "700", marginLeft: 6, fontSize: 13 },

  card: {
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eef2f7",
  },
  row: { flexDirection: "row", alignItems: "center" },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  name: { fontWeight: "800", fontSize: 14.5, color: "#0f172a" },
  meta: { fontSize: 12, color: "#334155", marginTop: 2 },
  subMeta: { fontSize: 12, color: "#94a3b8", marginTop: 2 },

  badgeRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  badge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  active: { backgroundColor: "#D1FAE5" },
  paused: { backgroundColor: "#FEF3C7" },
  badgeText: { fontSize: 11, fontWeight: "700" },
  activeText: { color: "#014D2A" },
  pausedText: { color: "#92400E" },

  ratingRow: { flexDirection: "row", alignItems: "center", marginLeft: 10 },
  ratingText: { fontSize: 12, color: "#475569", marginLeft: 4 },

  actions: { flexDirection: "row", marginLeft: 8 },
  btnIcon: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#D1FAE5",
    marginLeft: 6,
  },
  btnIconGray: { backgroundColor: "#D1FAE5" },
  btnIconGreen: { backgroundColor: "#D1FAE5" },
});