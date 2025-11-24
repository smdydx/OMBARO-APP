import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, BarChart3, TrendingUp } from "lucide-react-native";
import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

const COLORS = {
  gradient1: "#00FF87", gradient2: "#016B3A", gradient3: "#013B1F", gradient4: "#012B17",
  primary: "#016B3A", primaryLight: "#10B981", white: "#FFFFFF", text: "#1A1A1A", textSecondary: "#666666",
  textLight: "#999999", bg: "#FFFFFF", cardBg: "#F9FAFB", border: "#E5E7EB", warning: "#F59E0B", info: "#3B82F6",
};

function useScale() {
  const { width } = useWindowDimensions();
  return { sw: (n) => Math.round((Math.min(width, 480) / 390) * n) };
}

export default function Analytics({ onBack }) {
  const { sw } = useScale();
  const nav = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gradient2 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} translucent={false} />
      <LinearGradient colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ paddingTop: Platform.OS === 'ios' ? sw(50) : sw(40), paddingBottom: sw(24), paddingHorizontal: sw(20) }}>
        <TouchableOpacity onPress={() => onBack ? onBack() : nav.goBack()} style={{ width: sw(40), height: sw(40), borderRadius: sw(20), backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginBottom: sw(12) }}>
          <ArrowLeft size={sw(22)} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={{ alignItems: "center", marginBottom: sw(16) }}>
          <Text style={{ color: "#FFFFFF", fontSize: sw(16), fontWeight: "800", marginBottom: sw(5) }}>Analytics</Text>
          <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: sw(10) }}>Platform Metrics</Text>
        </View>
      </LinearGradient>
      <View style={{ flex: 1, backgroundColor: COLORS.bg, borderTopLeftRadius: sw(28), borderTopRightRadius: sw(28), marginTop: 0 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: sw(16), paddingTop: sw(16), paddingBottom: sw(120) }} showsVerticalScrollIndicator={false}>
          <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(12), borderWidth: 1, borderColor: COLORS.border, padding: sw(12), marginBottom: sw(12) }}>
            <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text, marginBottom: sw(10) }}>User Growth</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: sw(8) }}>
              <Text style={{ fontSize: sw(12), fontWeight: "800", color: COLORS.primary }}>2,847</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: sw(2) }}>
                <TrendingUp size={sw(12)} color="#10B981" strokeWidth={2.5} />
                <Text style={{ fontSize: sw(10), fontWeight: "700", color: "#10B981" }}>+12%</Text>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(12), borderWidth: 1, borderColor: COLORS.border, padding: sw(12), marginBottom: sw(12) }}>
            <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text, marginBottom: sw(10) }}>Revenue</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: sw(8) }}>
              <Text style={{ fontSize: sw(12), fontWeight: "800", color: COLORS.warning }}>₹8.4L</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: sw(2) }}>
                <TrendingUp size={sw(12)} color="#10B981" strokeWidth={2.5} />
                <Text style={{ fontSize: sw(10), fontWeight: "700", color: "#10B981" }}>+8%</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
