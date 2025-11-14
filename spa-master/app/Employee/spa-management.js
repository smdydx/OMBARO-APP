import { Edit, Eye, MapPin, Plus, Star, Trash2 } from "lucide-react-native";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const spas = [
  {
    id: 1,
    name: "Serenity Wellness Spa",
    location: "Koramangala",
    onboardedBy: "You",
    status: "Active",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Bliss Beauty Center",
    location: "Indiranagar",
    onboardedBy: "Rahul K.",
    status: "Pending",
  },
  {
    id: 3,
    name: "Ayurvedic Healing",
    location: "Whitefield",
    onboardedBy: "You",
    status: "Active",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Urban Spa Lounge",
    location: "MG Road",
    onboardedBy: "Priya S.",
    status: "Review",
  },
];

export default function SpaManagement() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Spa Management</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Plus color="#fff" size={18} />
          <Text style={styles.addText}>Add New Spa</Text>
        </TouchableOpacity>
      </View>

      {/* Spa List */}
      {spas.map((spa) => (
        <View key={spa.id} style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <MapPin color="#a855f7" size={22} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.spaName}>{spa.name}</Text>
              <Text style={styles.location}>
                {spa.location} • Onboarded by {spa.onboardedBy}
              </Text>

              {/* Status & Rating */}
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusBadge,
                    spa.status === "Active"
                      ? styles.active
                      : spa.status === "Pending"
                      ? styles.pending
                      : styles.review,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      spa.status === "Active"
                        ? styles.activeText
                        : spa.status === "Pending"
                        ? styles.pendingText
                        : styles.reviewText,
                    ]}
                  >
                    {spa.status}
                  </Text>
                </View>

                {spa.rating && (
                  <View style={styles.ratingRow}>
                    <Star color="#fbbf24" size={14} fill="#fbbf24" />
                    <Text style={styles.ratingText}>{spa.rating}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionBtns}>
              <TouchableOpacity style={styles.eyeBtn}>
                <Eye color="#3b82f6" size={16} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.editBtn}>
                <Edit color="#64748b" size={16} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn}>
                <Trash2 color="#ef4444" size={16} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
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
    marginBottom: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0369a1",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  addText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
    fontSize: 13,
  },
  card: {
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 38,
    height: 38,
    backgroundColor: "#f3e8ff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  spaName: {
    fontWeight: "700",
    fontSize: 15,
    color: "#111",
  },
  location: {
    fontSize: 12,
    color: "#666",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  active: {
    backgroundColor: "#dcfce7",
  },
  pending: {
    backgroundColor: "#fef9c3",
  },
  review: {
    backgroundColor: "#e0f2fe",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  activeText: {
    color: "#166534",
  },
  pendingText: {
    color: "#854d0e",
  },
  reviewText: {
    color: "#0369a1",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  ratingText: {
    fontSize: 12,
    color: "#555",
    marginLeft: 4,
  },
  actionBtns: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  eyeBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#eff6ff",
    marginHorizontal: 2,
  },
  editBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#f1f5f9",
    marginHorizontal: 2,
  },
  deleteBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#fee2e2",
    marginHorizontal: 2,
  },
});
