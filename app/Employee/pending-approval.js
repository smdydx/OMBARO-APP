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
    padding: 12,
    backgroundColor: "#F0FDF4",
  },
  heading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#014D2A",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 32,
    height: 32,
    backgroundColor: "#FEF9C3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  title: {
    fontWeight: "700",
    fontSize: 13,
    color: "#014D2A",
  },
  subtitle: {
    fontSize: 10,
    color: "#047857",
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  priorityBadge: {
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  high: {
    backgroundColor: "#FEE2E2",
  },
  medium: {
    backgroundColor: "#FEF9C3",
  },
  low: {
    backgroundColor: "#DCFCE7",
  },
  priorityText: {
    fontSize: 10,
    fontWeight: "600",
  },
  highText: {
    color: "#B91C1C",
  },
  mediumText: {
    color: "#854D0E",
  },
  lowText: {
    color: "#166534",
  },
  timeText: {
    fontSize: 10,
    color: "#047857",
    marginLeft: 6,
  },
  reviewBtn: {
    borderWidth: 1,
    borderColor: "#10B981",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 8,
  },
  reviewText: {
    color: "#016B3A",
    fontWeight: "600",
    fontSize: 11,
  },
});
