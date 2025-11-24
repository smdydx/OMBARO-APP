import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, BarChart2, TrendingUp, Users, DollarSign, Star, Calendar } from "lucide-react-native";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const COLORS = {
  gradient1: "#00FF87",
  gradient2: "#016B3A",
  gradient3: "#013B1F",
  gradient4: "#012B17",
  primary: "#016B3A",
  primaryLight: "#10B981",
  white: "#FFFFFF",
  text: "#1A1A1A",
  textSecondary: "#666666",
  textLight: "#999999",
  bg: "#FFFFFF",
  cardBg: "#F9FAFB",
  border: "#E5E7EB",
};

function useScale() {
  const { width, height } = useWindowDimensions();
  const base = Math.min(width, 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw, width, height };
}

function MetricCard({ icon: Icon, label, value, trend, color, sw }) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
    }}>
      <View style={{
        width: sw(36),
        height: sw(36),
        borderRadius: sw(10),
        backgroundColor: `${color}10`,
        borderColor: `${color}30`,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: sw(10),
      }}>
        <Icon size={sw(18)} color={color} strokeWidth={2.5} />
      </View>
      <Text style={{ fontWeight: "800", fontSize: sw(20), color: COLORS.text, marginBottom: sw(3) }}>
        {value}
      </Text>
      <Text style={{ color: COLORS.textSecondary, fontWeight: "500", fontSize: sw(10), marginBottom: sw(4) }}>
        {label}
      </Text>
      {trend && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TrendingUp size={sw(10)} color="#10B981" strokeWidth={2.5} />
          <Text style={{ color: "#10B981", fontWeight: "600", fontSize: sw(9), marginLeft: sw(3) }}>
            {trend}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function AnalyticsDashboard({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gradient2 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} />

      <LinearGradient
        colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]}
        style={{ paddingTop: Platform.OS === "ios" ? sw(50) : sw(40), paddingBottom: sw(56), paddingHorizontal: sw(20) }}
      >
        <TouchableOpacity
          onPress={onBack}
          style={{
            width: sw(40),
            height: sw(40),
            borderRadius: sw(20),
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: sw(12),
          }}
        >
          <ArrowLeft size={sw(22)} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <View style={{
            width: sw(65),
            height: sw(65),
            borderRadius: sw(18),
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: sw(12),
          }}>
            <BarChart2 size={sw(32)} color="#FFFFFF" strokeWidth={2.5} />
          </View>
          <Text style={{ 
            fontSize: sw(16), 
            fontWeight: "800", 
            color: "#FFFFFF",
            marginBottom: sw(5),
            textAlign: "center",
          }}>
            Analytics Dashboard
          </Text>
          <Text style={{ fontSize: sw(10), color: "rgba(255,255,255,0.95)", fontWeight: "500", textAlign: "center" }}>
            Monitor your business performance
          </Text>
        </View>
      </LinearGradient>

      <View style={{
        height: contentHeight,
        backgroundColor: COLORS.bg,
        borderTopLeftRadius: sw(24),
        borderTopRightRadius: sw(24),
        marginTop: -sw(2),
        paddingTop: sw(20),
      }}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: sw(20), paddingBottom: sw(100) }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text, marginBottom: sw(12) }}>
            Key Metrics
          </Text>
          <View style={{ flexDirection: "row", gap: sw(12), marginBottom: sw(12) }}>
            <MetricCard icon={DollarSign} label="Revenue" value="₹2.5L" trend="+15%" color={COLORS.primary} sw={sw} />
            <MetricCard icon={Calendar} label="Bookings" value="250" trend="+10%" color="#F59E0B" sw={sw} />
          </View>
          <View style={{ flexDirection: "row", gap: sw(12), marginBottom: sw(20) }}>
            <MetricCard icon={Users} label="Customers" value="180" trend="+20%" color="#8B5CF6" sw={sw} />
            <MetricCard icon={Star} label="Rating" value="4.8" trend="+2%" color="#FFD700" sw={sw} />
          </View>

          <View style={{
            backgroundColor: COLORS.cardBg,
            borderRadius: sw(12),
            borderWidth: 1,
            borderColor: COLORS.border,
            padding: sw(14),
            marginBottom: sw(20),
          }}>
            <Text style={{ fontSize: sw(14), fontWeight: "700", color: COLORS.text, marginBottom: sw(12) }}>
              Popular Services
            </Text>
            <View style={{ gap: sw(8) }}>
              {[
                { name: "Swedish Massage", bookings: "85", revenue: "₹2.1L" },
                { name: "Deep Tissue Massage", bookings: "60", revenue: "₹2.1L" },
                { name: "Aromatherapy", bookings: "45", revenue: "₹1.35L" },
                { name: "Facial Treatment", bookings: "35", revenue: "₹63K" },
                { name: "Hair Spa", bookings: "25", revenue: "₹55K" },
              ].map((service, index) => (
                <View 
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: sw(8),
                    borderBottomWidth: index < 4 ? 1 : 0,
                    borderBottomColor: COLORS.border,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: sw(12), fontWeight: "600", color: COLORS.text }}>
                      {service.name}
                    </Text>
                    <Text style={{ fontSize: sw(10), color: COLORS.textSecondary, marginTop: sw(2) }}>
                      {service.bookings} bookings
                    </Text>
                  </View>
                  <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.primary }}>
                    {service.revenue}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
