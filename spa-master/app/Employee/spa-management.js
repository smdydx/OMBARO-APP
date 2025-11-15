import { Edit, Eye, MapPin, Plus, Star, Trash2 } from "lucide-react-native";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
    Platform,
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
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  return (
    <ScrollView style={[styles.container, isMobile && styles.containerMobile]} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Spa Management</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Plus color="#FFFFFF" size={18} />
          <Text style={styles.addText}>Add New Spa</Text>
        </TouchableOpacity>
      </View>

      {spas.map((spa) => (
        <View key={spa.id} style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <MapPin color="#016B3A" size={22} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.spaName}>{spa.name}</Text>
              <Text style={styles.location}>
                {spa.location} • Onboarded by {spa.onboardedBy}
              </Text>

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
                    <Star color="#FBBF24" size={14} fill="#FBBF24" />
                    <Text style={styles.ratingText}>{spa.rating}</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.actionBtns}>
              <TouchableOpacity style={styles.eyeBtn}>
                <Eye color="#016B3A" size={16} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.editBtn}>
                <Edit color="#64748B" size={16} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn}>
                <Trash2 color="#EF4444" size={16} />
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
    backgroundColor: "#F0FDF4",
  },
  containerMobile: {
    padding: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    flexWrap: "wrap",
    gap: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#014D2A",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#016B3A",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  addText: {
    color: "#FFFFFF",
    marginLeft: 6,
    fontWeight: "600",
    fontSize: 13,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    ...Platform.select({
      ios: {
        shadowColor: "#016B3A",
        shadowOpacity: 0.06,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  iconBox: {
    width: 38,
    height: 38,
    backgroundColor: "#E6F7EE",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  spaName: {
    fontWeight: "700",
    fontSize: 15,
    color: "#111827",
  },
  location: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    flexWrap: "wrap",
    gap: 6,
  },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  active: {
    backgroundColor: "#E6F7EE",
  },
  pending: {
    backgroundColor: "#FEF9C3",
  },
  review: {
    backgroundColor: "#E0F2FE",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  activeText: {
    color: "#016B3A",
  },
  pendingText: {
    color: "#854D0E",
  },
  reviewText: {
    color: "#0369A1",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
  },
  ratingText: {
    fontSize: 12,
    color: "#374151",
    marginLeft: 4,
    fontWeight: "600",
  },
  actionBtns: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  eyeBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#E6F7EE",
  },
  editBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#F1F5F9",
  },
  deleteBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#FEE2E2",
  },
});
