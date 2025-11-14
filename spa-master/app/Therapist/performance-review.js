// performanceReview.js
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Star,
  Users,
} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const KPIS = [
  { id: 1, label: "Total Bookings", value: "145", tint: "#e0ecff", Icon: Users },
  { id: 2, label: "Completed", value: "142", tint: "#dcfce7", Icon: CheckCircle2 },
  { id: 3, label: "Average Rating", value: "4.8", tint: "#fef3c7", Icon: Star },
  { id: 4, label: "Customer Satisfaction", value: "96%", tint: "#efe2ff", Icon: Award },
];

const REVIEWS = [
  {
    id: "r1",
    name: "Sarah Johnson",
    rating: 5,
    text: "Excellent service! Very professional and skilled.",
    date: "25/01/2025",
  },
  {
    id: "r2",
    name: "Mike Brown",
    rating: 5,
    text: "Best massage I have ever had. Highly recommended!",
    date: "23/01/2025",
  },
  {
    id: "r3",
    name: "Emily Davis",
    rating: 4,
    text: "Great experience, very relaxing session.",
    date: "20/01/2025",
  },
];

const performanceReview = () => {
  return (
    <View style={styles.wrap}>
      {/* Top bar */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn}>
          <ArrowLeft size={18} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>Performance & Reviews</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* KPI grid */}
        <View style={styles.kpiGrid}>
          {KPIS.map(({ id, label, value, tint, Icon }) => (
            <View key={id} style={styles.kpiCard}>
              <View style={[styles.kpiIcon, { backgroundColor: tint }]}>
                <Icon size={20} color="#334155" />
              </View>
              <Text style={styles.kpiValue}>{value}</Text>
              <Text style={styles.kpiLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Reviews</Text>

          {REVIEWS.map((r) => (
            <View key={r.id} style={styles.reviewCard}>
              <View style={styles.reviewHead}>
                <Text style={styles.reviewer}>{r.name}</Text>
                <Stars rating={r.rating} />
              </View>
              <Text style={styles.reviewText}>{r.text}</Text>
              <Text style={styles.reviewDate}>{r.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default performanceReview;

/* Small components */
const Stars = ({ rating = 0 }) => {
  const items = [1, 2, 3, 4, 5];
  return (
    <View style={{ flexDirection: "row", gap: 4 }}>
      {items.map((i) => (
        <Star
          key={i}
          size={16}
          color="#f59e0b"
          fill={i <= rating ? "#f59e0b" : "transparent"}
        />
      ))}
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

  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  kpiCard: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  kpiIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  kpiValue: { fontSize: 26, fontWeight: "900", color: "#0f172a" },
  kpiLabel: { color: "#475569", marginTop: 4, fontSize: 14 },

  section: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
  },
  sectionTitle: { fontWeight: "800", color: "#0f172a", fontSize: 18, marginBottom: 10 },

  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
    marginBottom: 12,
  },
  reviewHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  reviewer: { fontWeight: "800", fontSize: 18, color: "#0f172a" },
  reviewText: { color: "#334155", marginTop: 8, lineHeight: 20, fontSize: 14 },
  reviewDate: { color: "#94a3b8", marginTop: 10 },
});