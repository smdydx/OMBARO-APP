import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, MapPin, Navigation, Search, ChevronDown, CheckCircle, Clock, MapPinOff } from "lucide-react-native";
import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View, TextInput } from "react-native";
import { useState } from "react";

const COLORS = {
  gradient1: "#00FF87", gradient2: "#016B3A", gradient3: "#013B1F", gradient4: "#012B17",
  primary: "#016B3A", primaryLight: "#10B981", white: "#FFFFFF", text: "#1A1A1A", textSecondary: "#666666",
  textLight: "#999999", bg: "#FFFFFF", cardBg: "#F9FAFB", border: "#E5E7EB", success: "#10B981", warning: "#F59E0B", danger: "#EF4444",
};

function useScale() {
  const { width } = useWindowDimensions();
  return { sw: (n) => Math.round((Math.min(width, 480) / 390) * n) };
}

export default function LocationTracking({ onBack }) {
  const { sw } = useScale();
  const nav = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("All Employees");

  const employees = [
    { id: 1, name: "John Doe", role: "EMP001 • Spa Manager", status: "Check in", time: "Just now", statusColor: COLORS.success },
    { id: 2, name: "Priya Sharma", role: "EMP002 • Field Executive", status: "Client Visit", time: "30 min ago", statusColor: COLORS.warning },
    { id: 3, name: "Rahul Kumar", role: "EMP003 • Spa Coordinator", status: "Field Work", time: "1 hour ago", statusColor: COLORS.danger },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gradient2 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} translucent={false} />
      <LinearGradient colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ paddingTop: Platform.OS === 'ios' ? sw(50) : sw(40), paddingBottom: sw(16), paddingHorizontal: sw(20) }}>
        <TouchableOpacity onPress={() => onBack ? onBack() : nav.goBack()} style={{ width: sw(40), height: sw(40), borderRadius: sw(20), backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginBottom: sw(10) }}>
          <ArrowLeft size={sw(22)} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={{ alignItems: "center", marginBottom: sw(12) }}>
          <Text style={{ color: "#FFFFFF", fontSize: sw(14), fontWeight: "800" }}>Location Tracking</Text>
          <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(9), marginTop: sw(1) }}>Real-time employee location monitoring</Text>
        </View>
        <View style={{ backgroundColor: "rgba(255,255,255,0.15)", borderRadius: sw(12), flexDirection: "row", alignItems: "center", paddingHorizontal: sw(12), marginBottom: sw(10) }}>
          <Search size={sw(16)} color="rgba(255,255,255,0.6)" strokeWidth={2} />
          <TextInput
            placeholder="Search employees..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ flex: 1, paddingVertical: sw(10), paddingHorizontal: sw(10), color: "#FFFFFF", fontSize: sw(11) }}
          />
        </View>
        <TouchableOpacity style={{ backgroundColor: "rgba(255,255,255,0.15)", borderRadius: sw(8), paddingHorizontal: sw(10), paddingVertical: sw(7), flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ fontSize: sw(10), color: "#FFFFFF", fontWeight: "600" }}>{filterEmployee}</Text>
          <ChevronDown size={sw(14)} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </LinearGradient>
      <View style={{ flex: 1, backgroundColor: COLORS.bg, borderTopLeftRadius: sw(24), borderTopRightRadius: sw(24), marginTop: -sw(4) }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <ScrollView style={{ flex: 0.4, backgroundColor: COLORS.white, borderRightWidth: 1, borderRightColor: COLORS.border, paddingTop: sw(10) }} contentContainerStyle={{ paddingHorizontal: sw(8), paddingBottom: sw(100) }} showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.text, paddingHorizontal: sw(8), marginBottom: sw(8) }}>Employees ({employees.length})</Text>
            {employees.map((emp) => (
              <View key={emp.id} style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(10), padding: sw(8), marginBottom: sw(8), alignItems: "flex-start" }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(6), width: "100%" }}>
                  <View style={{ width: sw(28), height: sw(28), borderRadius: sw(14), backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center", marginRight: sw(6) }}>
                    <Text style={{ color: "#FFFFFF", fontSize: sw(11), fontWeight: "700" }}>{emp.name[0]}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.text }}>{emp.name}</Text>
                    <Text style={{ fontSize: sw(8), color: COLORS.textSecondary, marginTop: sw(1) }}>{emp.role}</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: `${emp.statusColor}15`, paddingHorizontal: sw(6), paddingVertical: sw(3), borderRadius: sw(4), width: "100%", marginBottom: sw(3) }}>
                  <Text style={{ fontSize: sw(8), color: emp.statusColor, fontWeight: "600" }}>{emp.status}</Text>
                </View>
                <Text style={{ fontSize: sw(8), color: COLORS.textLight }}>{emp.time}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={{ flex: 0.6, backgroundColor: "#E8F0F9", alignItems: "center", justifyContent: "center", paddingTop: sw(16) }}>
            <View style={{ backgroundColor: "rgba(255,255,255,0.7)", borderRadius: sw(12), padding: sw(12), alignItems: "center", marginBottom: sw(16), width: "85%" }}>
              <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text }}>Live Location Map</Text>
              <Text style={{ fontSize: sw(8), color: COLORS.textSecondary, marginTop: sw(2) }}>Real-time employee locations</Text>
            </View>
            {employees.slice(0, 2).map((emp, idx) => (
              <View key={idx} style={{ width: sw(32), height: sw(32), borderRadius: sw(16), backgroundColor: COLORS.success, alignItems: "center", justifyContent: "center", marginBottom: sw(80), marginHorizontal: sw(idx === 0 ? -30 : 30) }} >
                <Navigation size={sw(16)} color="#FFFFFF" strokeWidth={2} />
              </View>
            ))}
            <View style={{ alignItems: "center", paddingVertical: sw(12), backgroundColor: "rgba(255,255,255,0.6)", borderRadius: sw(8), paddingHorizontal: sw(16), marginTop: sw(40) }}>
              <Text style={{ fontSize: sw(9), color: COLORS.textLight }}>You are here</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
