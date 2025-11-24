import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, BarChart3, TrendingUp, Users, DollarSign, Calendar } from "lucide-react-native";
import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useState } from "react";

const COLORS = {
  gradient1: "#00FF87", gradient2: "#016B3A", gradient3: "#013B1F", gradient4: "#012B17",
  primary: "#016B3A", primaryLight: "#10B981", white: "#FFFFFF", text: "#1A1A1A", textSecondary: "#666666",
  textLight: "#999999", bg: "#FFFFFF", cardBg: "#F9FAFB", border: "#E5E7EB", success: "#10B981", warning: "#F59E0B", info: "#3B82F6",
};

function useScale() {
  const { width } = useWindowDimensions();
  return { sw: (n) => Math.round((Math.min(width, 480) / 390) * n) };
}

function MetricCard({ icon: Icon, label, value, change, color, sw }) {
  return (
    <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(12), borderWidth: 1, borderColor: COLORS.border, padding: sw(12), marginBottom: sw(10) }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(8) }}>
        <View style={{ width: sw(32), height: sw(32), borderRadius: sw(8), backgroundColor: `${color}15`, alignItems: "center", justifyContent: "center", marginRight: sw(8) }}>
          <Icon size={sw(14)} color={color} strokeWidth={2.5} />
        </View>
        <Text style={{ fontSize: sw(10), color: COLORS.textLight, flex: 1 }}>{label}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: sw(2) }}>
          <TrendingUp size={sw(10)} color={COLORS.success} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.success }}>{change}</Text>
        </View>
      </View>
      <Text style={{ fontSize: sw(16), fontWeight: "800", color: color }}>{value}</Text>
    </View>
  );
}

export default function Analytics({ onBack }) {
  const { sw } = useScale();
  const nav = useNavigation();
  const [timePeriod, setTimePeriod] = useState("Month");

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gradient2 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} translucent={false} />
      <LinearGradient colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ paddingTop: Platform.OS === 'ios' ? sw(50) : sw(40), paddingBottom: sw(24), paddingHorizontal: sw(20) }}>
        <TouchableOpacity onPress={() => onBack ? onBack() : nav.goBack()} style={{ width: sw(40), height: sw(40), borderRadius: sw(20), backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginBottom: sw(12) }}>
          <ArrowLeft size={sw(22)} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={{ alignItems: "center", marginBottom: sw(16) }}>
          <Text style={{ color: "#FFFFFF", fontSize: sw(16), fontWeight: "800", marginBottom: sw(5) }}>Analytics</Text>
          <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: sw(10) }}>Platform Performance Metrics</Text>
        </View>
        <View style={{ backgroundColor: "rgba(255,255,255,0.15)", borderRadius: sw(10), padding: sw(4), flexDirection: "row", gap: sw(4) }}>
          {["Week", "Month", "Year"].map((period) => (
            <TouchableOpacity key={period} onPress={() => setTimePeriod(period)} style={{ flex: 1, paddingVertical: sw(8), paddingHorizontal: sw(6), borderRadius: sw(8), backgroundColor: timePeriod === period ? "#FFFFFF" : "transparent", alignItems: "center" }}>
              <Text style={{ fontSize: sw(10), fontWeight: timePeriod === period ? "700" : "600", color: timePeriod === period ? COLORS.primary : "#FFFFFF" }}>{period}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
      <View style={{ flex: 1, backgroundColor: COLORS.bg, borderTopLeftRadius: sw(28), borderTopRightRadius: sw(28), marginTop: 0 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: sw(16), paddingTop: sw(16), paddingBottom: sw(120) }} showsVerticalScrollIndicator={false}>
          <MetricCard icon={Users} label="User Growth" value="2,847" change="+12%" color={COLORS.primary} sw={sw} />
          <MetricCard icon={DollarSign} label="Revenue" value="₹8.4L" change="+23%" color={COLORS.warning} sw={sw} />
          <MetricCard icon={BarChart3} label="Bookings" value="1,245" change="+8%" color={COLORS.info} sw={sw} />
          <MetricCard icon={Calendar} label="Services" value="356" change="+5%" color={COLORS.success} sw={sw} />
          <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(12), borderWidth: 1, borderColor: COLORS.border, padding: sw(12), marginBottom: sw(10) }}>
            <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(10) }}>Top Performing Spas</Text>
            {[{ name: "Serenity Wellness", revenue: "₹2.5L", bookings: "245" }, { name: "Bliss Beauty", revenue: "₹2.1L", bookings: "189" }].map((spa, idx) => (
              <View key={idx} style={{ paddingVertical: sw(8), borderTopWidth: idx > 0 ? 1 : 0, borderTopColor: COLORS.border, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.text }}>{spa.name}</Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.success }}>{spa.revenue}</Text>
                  <Text style={{ fontSize: sw(8), color: COLORS.textLight, marginTop: sw(2) }}>{spa.bookings} bookings</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
