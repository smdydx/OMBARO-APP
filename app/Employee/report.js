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
    padding: 12,
    backgroundColor: "#F0FDF4",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#014D2A",
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#016B3A",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  downloadText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 5,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    flex: 0.48,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  iconBox: {
    backgroundColor: "#E6F7EE",
    borderRadius: 8,
    padding: 6,
    marginRight: 8,
  },
  value: {
    fontWeight: "700",
    fontSize: 14,
    color: "#014D2A",
  },
  label: {
    color: "#047857",
    fontSize: 10,
  },
  subheading: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 8,
    color: "#014D2A",
  },
  reportBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  reportText: {
    fontSize: 11,
    color: "#047857",
    marginBottom: 3,
  },
  bold: {
    fontWeight: "700",
    color: "#016B3A",
  },
  chartBox: {
    borderWidth: 1,
    borderColor: "#D1FAE5",
    borderRadius: 12,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  chartPlaceholder: {
    color: "#047857",
    fontSize: 11,
  },
});
