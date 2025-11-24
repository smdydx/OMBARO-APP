import { LinearGradient } from "expo-linear-gradient";
import { Star, TrendingUp, Users, Zap } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Platform,
} from "react-native";

export default function AnalyticsTab() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      {/* Swipeable Analytics Cards */}
      <View style={styles.statsSection}>
        <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>
          Performance Analytics
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.cardsContainer, isMobile && styles.cardsContainerMobile]}
          style={styles.cardsScrollView}
        >
          <AnalyticsCard
            icon={<TrendingUp color="#FFFFFF" size={24} />}
            gradient={["#014D2A", "#016B3A"]}
            title="Revenue Trends"
            rows={[
              { label: "This Month", value: "₹45,280", highlight: true },
              { label: "Last Month", value: "₹38,420" },
              { label: "Growth", value: "+18%", highlight: true },
            ]}
            isMobile={isMobile}
            width={width}
          />
          <AnalyticsCard
            icon={<Zap color="#FFFFFF" size={24} />}
            gradient={["#016B3A", "#047857"]}
            title="Service Performance"
            rows={[
              { label: "Most Popular", value: "Swedish Massage", bold: true },
              { label: "Highest Rated", value: "Couples Massage", bold: true },
              { label: "Avg. Rating", value: "4.8 ⭐" },
            ]}
            isMobile={isMobile}
            width={width}
          />
          <AnalyticsCard
            icon={<Users color="#FFFFFF" size={24} />}
            gradient={["#047857", "#10B981"]}
            title="Customer Insights"
            rows={[
              { label: "Total Customers", value: "89" },
              { label: "Repeat Customers", value: "67%" },
              { label: "Avg. Booking Value", value: "₹3,200" },
            ]}
            isMobile={isMobile}
            width={width}
          />
          <AnalyticsCard
            icon={<TrendingUp color="#FFFFFF" size={24} />}
            gradient={["#10B981", "#34D399"]}
            title="Operational Metrics"
            rows={[
              { label: "Booking Rate", value: "92%", highlight: true },
              { label: "Cancellation Rate", value: "3%" },
              { label: "Response Time", value: "< 2 hours" },
            ]}
            isMobile={isMobile}
            width={width}
          />
        </ScrollView>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={[styles.actionBtn, styles.outlineBtn]}>
          <Text style={styles.outlineBtnText}>📊 Export Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.outlineBtn]}>
          <Text style={styles.outlineBtnText}>📈 View Detailed Analytics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const AnalyticsCard = ({ icon, gradient, title, rows, isMobile, width }) => (
  <LinearGradient
    colors={gradient}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={[
      styles.card,
      {
        width: isMobile ? width * 0.75 : 300,
        marginRight: 16,
      },
    ]}
  >
    <View style={styles.cardHeader}>
      {icon}
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <View style={styles.cardContent}>
      {rows.map((row, idx) => (
        <View key={idx} style={styles.row}>
          <Text style={styles.label}>{row.label}</Text>
          <Text
            style={[
              styles.value,
              row.highlight && styles.highlightValue,
              row.bold && styles.boldValue,
            ]}
          >
            {row.value}
          </Text>
        </View>
      ))}
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0FDF4",
  },

  statsSection: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#F0FDF4",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#014D2A",
    marginBottom: 12,
  },

  sectionTitleMobile: {
    fontSize: 16,
  },

  cardsContainerMobile: {
    paddingRight: 8,
  },

  cardsContainer: {
    paddingRight: 16,
  },

  cardsScrollView: {
    marginBottom: 8,
  },

  card: {
    borderRadius: 20,
    padding: 16,
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  cardHeader: {
    marginBottom: 14,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 10,
  },

  cardContent: {
    justifyContent: "flex-end",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  label: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.85)",
    fontWeight: "500",
  },

  value: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },

  highlightValue: {
    fontWeight: "800",
    fontSize: 15,
  },

  boldValue: {
    fontWeight: "700",
  },

  actionsContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },

  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  outlineBtn: {
    borderWidth: 2,
    borderColor: "#016B3A",
    backgroundColor: "#FFFFFF",
  },

  outlineBtnText: {
    color: "#016B3A",
    fontWeight: "700",
    fontSize: 13,
  },
});
