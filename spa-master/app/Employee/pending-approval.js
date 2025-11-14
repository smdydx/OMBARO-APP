import { AlertCircle } from "lucide-react-native";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const pendingItems = [
  {
    id: 1,
    title: "Spa Registration",
    subtitle: "Luxury Spa & Wellness • Vendor",
    priority: "High Priority",
    time: "1 day ago",
  },
  {
    id: 2,
    title: "Vendor KYC Verification",
    subtitle: "Lotus Wellness • Vendor",
    priority: "Medium Priority",
    time: "2 days ago",
  },
  {
    id: 3,
    title: "New Spa Request",
    subtitle: "Oceanic Retreat • Vendor",
    priority: "Low Priority",
    time: "3 days ago",
  },
];

export default function PendingApproval() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Pending Approvals</Text>

      {pendingItems.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <AlertCircle color="#f59e0b" size={20} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>

              <View style={styles.bottomRow}>
                <View
                  style={[
                    styles.priorityBadge,
                    item.priority === "High Priority"
                      ? styles.high
                      : item.priority === "Medium Priority"
                      ? styles.medium
                      : styles.low,
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      item.priority === "High Priority"
                        ? styles.highText
                        : item.priority === "Medium Priority"
                        ? styles.mediumText
                        : styles.lowText,
                    ]}
                  >
                    {item.priority}
                  </Text>
                </View>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.reviewBtn}>
              <Text style={styles.reviewText}>Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

/* ---- Styles ---- */
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 40,
    height: 40,
    backgroundColor: "#fef3c7",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 15,
    color: "#111",
  },
  subtitle: {
    fontSize: 12,
    color: "#555",
    marginBottom: 6,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  priorityBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  high: {
    backgroundColor: "#fee2e2",
  },
  medium: {
    backgroundColor: "#fef9c3",
  },
  low: {
    backgroundColor: "#dcfce7",
  },
  priorityText: {
    fontSize: 11,
    fontWeight: "600",
  },
  highText: {
    color: "#b91c1c",
  },
  mediumText: {
    color: "#854d0e",
  },
  lowText: {
    color: "#166534",
  },
  timeText: {
    fontSize: 11,
    color: "#999",
    marginLeft: 8,
  },
  reviewBtn: {
    borderWidth: 1,
    borderColor: "#3b82f6",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginLeft: 10,
  },
  reviewText: {
    color: "#3b82f6",
    fontWeight: "600",
    fontSize: 13,
  },
});
