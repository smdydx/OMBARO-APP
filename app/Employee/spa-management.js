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
    padding: 12,
    backgroundColor: "#F0FDF4",
  },
  containerMobile: {
    padding: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    flexWrap: "wrap",
    gap: 8,
  },
  heading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#014D2A",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#016B3A",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  addText: {
    color: "#FFFFFF",
    marginLeft: 5,
    fontWeight: "600",
    fontSize: 11,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    ...Platform.select({
      ios: {
        shadowColor: "#016B3A",
        shadowOpacity: 0.04,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
      },
      android: {
        elevation: 1,
      },
    }),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  iconBox: {
    width: 32,
    height: 32,
    backgroundColor: "#E6F7EE",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  spaName: {
    fontWeight: "700",
    fontSize: 13,
    color: "#014D2A",
  },
  location: {
    fontSize: 10,
    color: "#047857",
    marginTop: 1,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    flexWrap: "wrap",
    gap: 4,
  },
  statusBadge: {
    borderRadius: 5,
    paddingHorizontal: 6,
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
    fontSize: 10,
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
    marginLeft: 3,
  },
  ratingText: {
    fontSize: 10,
    color: "#047857",
    marginLeft: 3,
    fontWeight: "600",
  },
  actionBtns: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  eyeBtn: {
    padding: 5,
    borderRadius: 6,
    backgroundColor: "#E6F7EE",
  },
  editBtn: {
    padding: 5,
    borderRadius: 6,
    backgroundColor: "#F1F5F9",
  },
  deleteBtn: {
    padding: 5,
    borderRadius: 6,
    backgroundColor: "#FEE2E2",
  },
});
