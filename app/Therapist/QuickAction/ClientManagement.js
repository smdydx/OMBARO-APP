
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Search,
  Star,
  Calendar,
  TrendingUp,
} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const sw = (val) => (width / 375) * val;

const COLORS = {
  primary: "#014D2A",
  primaryLight: "#10B981",
  accent: "#00FF87",
  text: "#014D2A",
  textMuted: "#047857",
  border: "#D1FAE5",
  cardBg: "#FAFFFE",
  surface: "#FFFFFF",
};

export default function ClientManagement() {
  const router = useRouter();

  const clients = [
    {
      id: 1,
      name: "Rahul Sharma",
      totalSessions: 24,
      rating: 5.0,
      lastVisit: "2 days ago",
      favorite: true,
    },
    {
      id: 2,
      name: "Priya Verma",
      totalSessions: 18,
      rating: 4.8,
      lastVisit: "1 week ago",
      favorite: true,
    },
    {
      id: 3,
      name: "Amit Kumar",
      totalSessions: 15,
      rating: 4.9,
      lastVisit: "3 days ago",
      favorite: false,
    },
    {
      id: 4,
      name: "Neha Singh",
      totalSessions: 12,
      rating: 5.0,
      lastVisit: "Today",
      favorite: false,
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primaryLight, COLORS.primary]}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={sw(24)} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Client Management</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={sw(20)} color={COLORS.textMuted} />
          <TextInput
            placeholder="Search clients..."
            placeholderTextColor={COLORS.textMuted}
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={styles.miniStatCard}>
            <Text style={styles.miniStatValue}>45</Text>
            <Text style={styles.miniStatLabel}>Total Clients</Text>
          </View>
          <View style={styles.miniStatCard}>
            <Text style={styles.miniStatValue}>12</Text>
            <Text style={styles.miniStatLabel}>This Month</Text>
          </View>
          <View style={styles.miniStatCard}>
            <Text style={styles.miniStatValue}>8</Text>
            <Text style={styles.miniStatLabel}>Regulars</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Clients</Text>

        {clients.map((client) => (
          <View key={client.id} style={styles.clientCard}>
            <View style={styles.clientHeader}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {client.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.clientInfo}>
                  <Text style={styles.clientName}>{client.name}</Text>
                  <View style={styles.ratingRow}>
                    <Star
                      size={sw(14)}
                      color="#F59E0B"
                      fill="#F59E0B"
                      strokeWidth={2}
                    />
                    <Text style={styles.ratingText}>{client.rating}</Text>
                  </View>
                </View>
              </View>
              {client.favorite && (
                <View style={styles.favoriteBadge}>
                  <Text style={styles.favoriteText}>⭐ Favorite</Text>
                </View>
              )}
            </View>

            <View style={styles.clientStats}>
              <View style={styles.statItem}>
                <Calendar size={sw(16)} color={COLORS.textMuted} strokeWidth={2} />
                <Text style={styles.statText}>
                  {client.totalSessions} sessions
                </Text>
              </View>
              <View style={styles.statItem}>
                <TrendingUp size={sw(16)} color={COLORS.textMuted} strokeWidth={2} />
                <Text style={styles.statText}>Last: {client.lastVisit}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: sw(50),
    paddingBottom: sw(20),
    paddingHorizontal: sw(20),
  },
  backButton: {
    width: sw(40),
    height: sw(40),
    borderRadius: sw(12),
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: sw(20),
    fontWeight: "800",
    color: "#FFFFFF",
  },
  placeholder: {
    width: sw(40),
  },
  searchContainer: {
    paddingHorizontal: sw(20),
    paddingVertical: sw(16),
    backgroundColor: "#FFFFFF",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
    borderRadius: sw(12),
    paddingHorizontal: sw(16),
    paddingVertical: sw(12),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: sw(12),
    fontSize: sw(15),
    color: COLORS.text,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    paddingHorizontal: sw(20),
  },
  statsRow: {
    flexDirection: "row",
    gap: sw(12),
    marginBottom: sw(24),
  },
  miniStatCard: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: sw(12),
    padding: sw(16),
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  miniStatValue: {
    fontSize: sw(24),
    fontWeight: "900",
    color: COLORS.primary,
    marginBottom: sw(4),
  },
  miniStatLabel: {
    fontSize: sw(11),
    fontWeight: "600",
    color: COLORS.textMuted,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: sw(18),
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: sw(16),
  },
  clientCard: {
    backgroundColor: COLORS.surface,
    borderRadius: sw(16),
    padding: sw(16),
    marginBottom: sw(16),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  clientHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: sw(16),
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: sw(48),
    height: sw(48),
    borderRadius: sw(24),
    backgroundColor: COLORS.primaryLight + "30",
    alignItems: "center",
    justifyContent: "center",
    marginRight: sw(12),
  },
  avatarText: {
    fontSize: sw(20),
    fontWeight: "800",
    color: COLORS.primary,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: sw(16),
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: sw(4),
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: sw(14),
    fontWeight: "600",
    color: COLORS.text,
    marginLeft: sw(4),
  },
  favoriteBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: sw(10),
    paddingVertical: sw(6),
    borderRadius: sw(20),
  },
  favoriteText: {
    fontSize: sw(11),
    fontWeight: "700",
    color: "#92400E",
  },
  clientStats: {
    gap: sw(12),
    marginBottom: sw(16),
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: sw(14),
    fontWeight: "600",
    color: COLORS.text,
    marginLeft: sw(8),
  },
  viewButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    paddingVertical: sw(10),
    borderRadius: sw(12),
    alignItems: "center",
  },
  viewButtonText: {
    fontSize: sw(14),
    fontWeight: "700",
    color: COLORS.primary,
  },
});
