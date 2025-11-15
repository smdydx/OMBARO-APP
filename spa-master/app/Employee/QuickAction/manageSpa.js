import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Building2, MapPin, Users, Calendar, Settings, BarChart } from "lucide-react-native";
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

function ActionCard({ icon: Icon, title, description, color, onPress, sw }) {
  return (
    <TouchableOpacity style={{
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(14),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(16),
      marginBottom: sw(12),
    }} onPress={onPress} activeOpacity={0.7}>
      <View style={{
        backgroundColor: `${color}15`,
        width: sw(48),
        height: sw(48),
        borderRadius: sw(12),
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Icon size={sw(22)} color={color} strokeWidth={2.5} />
      </View>
      <View style={{ flex: 1, marginLeft: sw(14) }}>
        <Text style={{ fontSize: sw(15), fontWeight: "700", color: COLORS.text, marginBottom: sw(4) }}>
          {title}
        </Text>
        <Text style={{ fontSize: sw(12), color: COLORS.textSecondary }}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ManageSpa({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

  const actions = [
    { icon: Building2, title: "Spa Details", description: "View and edit spa information", color: COLORS.primaryLight },
    { icon: Users, title: "Staff Management", description: "Manage therapists and staff", color: "#7C3AED" },
    { icon: Calendar, title: "Schedule & Bookings", description: "Manage appointments", color: "#0EA5E9" },
    { icon: Settings, title: "Services & Pricing", description: "Configure spa services", color: "#F59E0B" },
    { icon: BarChart, title: "Performance Reports", description: "View spa analytics", color: "#10B981" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gradient2 }}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={COLORS.gradient2}
        translucent={false}
      />

      <LinearGradient 
        colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: headerHeight,
          paddingTop: Platform.OS === 'ios' ? sw(50) : sw(20),
          paddingHorizontal: sw(20),
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(20) }}>
          <TouchableOpacity 
            onPress={() => onBack ? onBack() : nav.goBack()} 
            style={{
              width: sw(42),
              height: sw(42),
              borderRadius: sw(21),
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowLeft size={sw(20)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center", marginRight: sw(42),marginTop:sw(50) }}>
            <Text style={{ color: "#FFFFFF", fontSize: sw(20), fontWeight: "800" }}>Manage Spa</Text>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(12), marginTop: sw(2) }}>
              Spa Operations
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: sw(10) }}>
          <View style={{
            backgroundColor: "rgba(255,255,255,0.25)",
            borderRadius: sw(16),
            padding: sw(14),
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.3)",
          }}>
            <Text style={{ fontSize: sw(16), fontWeight: "800", color: "#FFFFFF", marginBottom: sw(6) }}>
              Luxury Wellness Spa
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MapPin size={sw(14)} color="rgba(255,255,255,0.95)" strokeWidth={2.5} />
              <Text style={{ fontSize: sw(12), color: "rgba(255,255,255,0.95)", marginLeft: sw(6), fontWeight: "600" }}>
                Mumbai, Maharashtra
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={{ 
        height: contentHeight,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: sw(30),
        borderTopRightRadius: sw(30),
      }}>
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: sw(24), paddingHorizontal: sw(20), paddingBottom: sw(150) }} 
          showsVerticalScrollIndicator={false}
        >
          {actions.map((action, index) => (
            <ActionCard key={index} {...action} sw={sw} onPress={() => {}} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
