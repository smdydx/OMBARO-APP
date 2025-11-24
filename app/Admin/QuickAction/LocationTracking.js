import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, MapPin, Navigation } from "lucide-react-native";
import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

const COLORS = {
  gradient1: "#00FF87", gradient2: "#016B3A", gradient3: "#013B1F", gradient4: "#012B17",
  primary: "#016B3A", primaryLight: "#10B981", white: "#FFFFFF", text: "#1A1A1A", textSecondary: "#666666",
  textLight: "#999999", bg: "#FFFFFF", cardBg: "#F9FAFB", border: "#E5E7EB", success: "#10B981",
};

function useScale() {
  const { width } = useWindowDimensions();
  return { sw: (n) => Math.round((Math.min(width, 480) / 390) * n) };
}

export default function LocationTracking({ onBack }) {
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
          <Text style={{ color: "#FFFFFF", fontSize: sw(16), fontWeight: "800", marginBottom: sw(5) }}>Location Tracking</Text>
          <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: sw(10) }}>Track all spas</Text>
        </View>
      </LinearGradient>
      <View style={{ flex: 1, backgroundColor: COLORS.bg, borderTopLeftRadius: sw(28), borderTopRightRadius: sw(28), marginTop: 0 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: sw(16), paddingTop: sw(16), paddingBottom: sw(120) }} showsVerticalScrollIndicator={false}>
          {[{ name: "Serenity Wellness", loc: "Koramangala" }, { name: "Bliss Center", loc: "Indiranagar" }].map((item, idx) => (
            <View key={idx} style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(12), borderWidth: 1, borderColor: COLORS.border, padding: sw(12), marginBottom: sw(10), flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: sw(36), height: sw(36), borderRadius: sw(10), backgroundColor: `${COLORS.success}15`, alignItems: "center", justifyContent: "center", marginRight: sw(10) }}>
                <Navigation size={sw(16)} color={COLORS.success} strokeWidth={2.5} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text }}>{item.name}</Text>
                <Text style={{ fontSize: sw(9), color: COLORS.textSecondary, marginTop: sw(2) }}>{item.loc}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
