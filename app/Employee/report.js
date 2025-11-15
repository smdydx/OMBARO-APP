import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { BarChart2, TrendingUp, Download } from "lucide-react-native";

export default function Report() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Reports & Analytics</Text>
        <TouchableOpacity style={styles.downloadBtn}>
          <Download color="#fff" size={16} />
          <Text style={styles.downloadText}>Export</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Cards */}
      <View style={styles.cardRow}>
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <BarChart2 color="#3b82f6" size={20} />
          </View>
          <View>
            <Text style={styles.value}>₹2.4L</Text>
            <Text style={styles.label}>Monthly Revenue</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <TrendingUp color="#22c55e" size={20} />
          </View>
          <View>
            <Text style={styles.value}>+12%</Text>
            <Text style={styles.label}>Growth Rate</Text>
          </View>
        </View>
      </View>

      {/* Section */}
      <Text style={styles.subheading}>Insights Summary</Text>
      <View style={styles.reportBox}>
        <Text style={styles.reportText}>
          • Spas onboarded this month increased by <Text style={styles.bold}>5</Text>.
        </Text>
        <Text style={styles.reportText}>
          • Active vendors grew by <Text style={styles.bold}>9%</Text>.
        </Text>
        <Text style={styles.reportText}>
          • Average customer satisfaction: <Text style={styles.bold}>4.7★</Text>.
        </Text>
        <Text style={styles.reportText}>
          • Pending approvals reduced from 12 to 8 this week.
        </Text>
      </View>

      {/* Placeholder for future chart */}
      <View style={styles.chartBox}>
        <Text style={styles.chartPlaceholder}>[Charts & Graphs Placeholder]</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0284c7",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  downloadText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 14,
    flex: 0.48,
  },
  iconBox: {
    backgroundColor: "#e0f2fe",
    borderRadius: 10,
    padding: 8,
    marginRight: 10,
  },
  value: {
    fontWeight: "700",
    fontSize: 16,
    color: "#111",
  },
  label: {
    color: "#666",
    fontSize: 12,
  },
  subheading: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
    color: "#111",
  },
  reportBox: {
    backgroundColor: "#f9fafb",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  reportText: {
    fontSize: 13,
    color: "#444",
    marginBottom: 4,
  },
  bold: {
    fontWeight: "700",
    color: "#0284c7",
  },
  chartBox: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  chartPlaceholder: {
    color: "#999",
    fontSize: 13,
  },
});
