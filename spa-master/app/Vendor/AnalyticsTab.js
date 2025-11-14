import { LinearGradient } from "expo-linear-gradient";
import { Star } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AnalyticsTab() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Performance Analytics</Text>

      {/* Revenue Trends */}
      <GradientCard colors={["#eef2ff", "#f5faff"]}>
        <Text style={styles.cardTitle}>Revenue Trends</Text>
        <View style={styles.row}>
          <Text style={styles.key}>This Month</Text>
          <Text style={[styles.value, styles.positive]}>₹45,280</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Last Month</Text>
          <Text style={styles.value}>₹38,420</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Growth</Text>
          <Text style={[styles.value, styles.positive]}>+18%</Text>
        </View>
      </GradientCard>

      {/* Service Performance */}
      <GradientCard colors={["#ecfdf5", "#f5fff8"]}>
        <Text style={styles.cardTitle}>Service Performance</Text>
        <KV left="Most Popular" right={"Swedish\nMassage"} boldRight />
        <KV left="Highest Rated" right={"Couples\nMassage"} boldRight />
        <View style={[styles.row, { marginTop: 6 }]}>
          <Text style={styles.key}>Avg. Rating</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.value}>4.8</Text>
            <Star size={14} color="#f59e0b" fill="#f59e0b" style={{ marginLeft: 4 }} />
          </View>
        </View>
      </GradientCard>

      {/* Customer Insights */}
      <GradientCard colors={["#fff0f6", "#fff6fb"]}>
        <Text style={styles.cardTitle}>Customer Insights</Text>
        <KV left="Total Customers" right="89" />
        <KV left="Repeat Customers" right="67%" />
        <KV left="Avg. Booking Value" right="₹3,200" />
      </GradientCard>

      {/* Operational Metrics */}
      <GradientCard colors={["#fff7ed", "#fffaf0"]}>
        <Text style={styles.cardTitle}>Operational Metrics</Text>
        <KV left="Booking Rate" right="92%" rightColor="#16a34a" />
        <KV left="Cancellation Rate" right="3%" />
        <KV left="Response Time" right="< 2 hours" />
      </GradientCard>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <OutlineBtn label="Export Report" />
        <OutlineBtn label="View Detailed Analytics" />
      </View>
    </ScrollView>
  );
}

/* --- Small building blocks --- */

const GradientCard = ({ colors, children }) => (
  <LinearGradient
    colors={colors}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.card}
  >
    {children}
  </LinearGradient>
);

const KV = ({ left, right, boldRight, rightColor }) => (
  <View style={styles.row}>
    <Text style={styles.key}>{left}</Text>
    <Text
      style={[
        styles.value,
        boldRight && { fontWeight: "800" },
        rightColor && { color: rightColor },
      ]}
    >
      {right}
    </Text>
  </View>
);

const OutlineBtn = ({ label, onPress }) => (
  <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.9} onPress={onPress}>
    <Text style={styles.outlineBtnText}>{label}</Text>
  </TouchableOpacity>
);

/* --- Styles --- */
const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 16 },
  heading: { fontSize: 18, fontWeight: "800", color: "#0f172a", marginBottom: 10 },

  card: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eef2f7",
  },
  cardTitle: { fontWeight: "800", color: "#111827", marginBottom: 8 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  key: { color: "#475569", fontSize: 13 },
  value: { color: "#0f172a", fontWeight: "700", fontSize: 14 },
  positive: { color: "#16a34a" },

  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 6,
    marginBottom: 8,
  },
  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#7dd3fc",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  outlineBtnText: { color: "#0ea5e9", fontWeight: "700" },
});