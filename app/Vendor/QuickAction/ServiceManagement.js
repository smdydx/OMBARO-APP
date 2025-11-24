import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Package, Plus, Edit, Trash2, Clock, DollarSign } from "lucide-react-native";
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

function ServiceCard({ name, category, duration, price, sw }) {
  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
      marginBottom: sw(10),
    }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: sw(10) }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: sw(14), fontWeight: "700", color: COLORS.text, marginBottom: sw(4) }}>
            {name}
          </Text>
          <View style={{
            backgroundColor: `${COLORS.primary}15`,
            paddingHorizontal: sw(8),
            paddingVertical: sw(4),
            borderRadius: sw(8),
            alignSelf: "flex-start",
          }}>
            <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.primary }}>
              {category}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: sw(8) }}>
          <TouchableOpacity style={{
            width: sw(32),
            height: sw(32),
            borderRadius: sw(8),
            backgroundColor: `${COLORS.primary}10`,
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Edit size={sw(14)} color={COLORS.primary} strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: sw(32),
            height: sw(32),
            borderRadius: sw(8),
            backgroundColor: "#FEE2E2",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Trash2 size={sw(14)} color="#EF4444" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: sw(12) }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Clock size={sw(12)} color={COLORS.textLight} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(11), color: COLORS.textSecondary, marginLeft: sw(4) }}>
            {duration}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <DollarSign size={sw(12)} color={COLORS.textLight} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(11), color: COLORS.textSecondary, marginLeft: sw(4) }}>
            ₹{price}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function ServiceManagement({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

  const services = [
    { name: "Swedish Massage", category: "Massage", duration: "60 min", price: "2,500" },
    { name: "Deep Tissue Massage", category: "Massage", duration: "90 min", price: "3,500" },
    { name: "Aromatherapy", category: "Spa", duration: "75 min", price: "3,000" },
    { name: "Facial Treatment", category: "Beauty", duration: "45 min", price: "1,800" },
    { name: "Hair Spa", category: "Hair Care", duration: "60 min", price: "2,200" },
    { name: "Manicure & Pedicure", category: "Beauty", duration: "90 min", price: "1,500" },
  ];

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
            width: sw(60),
            height: sw(60),
            borderRadius: sw(16),
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: sw(10),
          }}>
            <Package size={sw(32)} color="#FFFFFF" strokeWidth={2.5} />
          </View>
          <Text style={{ 
            fontSize: sw(15), 
            fontWeight: "800", 
            color: "#FFFFFF",
            marginBottom: sw(5),
            textAlign: "center",
          }} numberOfLines={1}>
            Service Management
          </Text>
          <Text style={{ fontSize: sw(10), color: "rgba(255,255,255,0.95)", fontWeight: "500", textAlign: "center" }} numberOfLines={1}>
            Manage spa services and pricing
          </Text>
        </View>
      </LinearGradient>

      <View style={{
        flex: 1,
        backgroundColor: COLORS.bg,
        borderTopLeftRadius: sw(24),
        borderTopRightRadius: sw(24),
        marginTop: 0,
        paddingTop: sw(20),
      }}>
        <View style={{ paddingHorizontal: sw(20), marginBottom: sw(15) }}>
          <TouchableOpacity style={{
            backgroundColor: COLORS.primary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: sw(14),
            borderRadius: sw(12),
          }}>
            <Plus size={sw(18)} color="#FFFFFF" strokeWidth={2.5} />
            <Text style={{ 
              color: "#FFFFFF", 
              fontSize: sw(14), 
              fontWeight: "700",
              marginLeft: sw(8),
            }}>
              Add New Service
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: sw(20), paddingBottom: sw(100) }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text, marginBottom: sw(12) }}>
            All Services ({services.length})
          </Text>
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} sw={sw} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
