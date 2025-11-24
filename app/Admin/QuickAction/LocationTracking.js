import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, MapPin, Navigation, Search, ChevronDown, Plus, Filter } from "lucide-react-native";
import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View, TextInput } from "react-native";
import { useState } from "react";

const COLORS = {
  gradient1: "#00FF87", gradient2: "#016B3A", gradient3: "#013B1F", gradient4: "#012B17",
  primary: "#016B3A", primaryLight: "#10B981", white: "#FFFFFF", text: "#1A1A1A", textSecondary: "#666666",
  textLight: "#999999", bg: "#FFFFFF", cardBg: "#F9FAFB", border: "#E5E7EB", success: "#10B981", warning: "#F59E0B", danger: "#EF4444", inactive: "#D1D5DB",
};

function useScale() {
  const { width } = useWindowDimensions();
  return { sw: (n) => Math.round((Math.min(width, 480) / 390) * n) };
}

export default function LocationTracking({ onBack }) {
  const { sw } = useScale();
  const nav = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const allEmployees = [
    { id: 1, name: "John Doe", role: "EMP001 • Spa Manager", status: "Check in", time: "Just now", statusColor: COLORS.success, isActive: true },
    { id: 2, name: "Priya Sharma", role: "EMP002 • Field Executive", status: "Client Visit", time: "30 min ago", statusColor: COLORS.warning, isActive: true },
    { id: 3, name: "Rahul Kumar", role: "EMP003 • Spa Coordinator", status: "Field Work", time: "1 hour ago", statusColor: COLORS.danger, isActive: true },
    { id: 4, name: "Vikram Singh", role: "EMP004 • Therapist", status: "Offline", time: "3 hours ago", statusColor: COLORS.inactive, isActive: false },
    { id: 5, name: "Anjali Patel", role: "EMP005 • Manager", status: "On Break", time: "2 hours ago", statusColor: COLORS.warning, isActive: false },
    { id: 6, name: "Nikhil Desai", role: "EMP006 • Technician", status: "At Spa", time: "15 min ago", statusColor: COLORS.success, isActive: true },
  ];

  const filteredEmployees = activeTab === "All" ? allEmployees : activeTab === "Active" ? allEmployees.filter(e => e.isActive) : allEmployees.filter(e => !e.isActive);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} translucent={false} />
      <LinearGradient colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ paddingTop: Platform.OS === 'ios' ? sw(50) : sw(40), paddingBottom: sw(14), paddingHorizontal: sw(20) }}>
        <TouchableOpacity onPress={() => onBack ? onBack() : nav.goBack()} style={{ width: sw(40), height: sw(40), borderRadius: sw(20), backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginBottom: sw(8) }}>
          <ArrowLeft size={sw(22)} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={{ alignItems: "center", marginBottom: sw(10) }}>
          <Text style={{ color: "#FFFFFF", fontSize: sw(13), fontWeight: "800" }}>Location Tracking</Text>
          <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(8), marginTop: sw(1) }}>Real-time employee location monitoring</Text>
        </View>
        <View style={{ backgroundColor: "rgba(255,255,255,0.15)", borderRadius: sw(10), flexDirection: "row", alignItems: "center", paddingHorizontal: sw(10), marginBottom: sw(8) }}>
          <Search size={sw(14)} color="rgba(255,255,255,0.6)" strokeWidth={2} />
          <TextInput
            placeholder="Search employees..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ flex: 1, paddingVertical: sw(8), paddingHorizontal: sw(8), color: "#FFFFFF", fontSize: sw(10) }}
          />
        </View>
      </LinearGradient>
      <View style={{ flex: 1, backgroundColor: COLORS.bg, borderTopLeftRadius: sw(20), borderTopRightRadius: sw(20), marginTop: -sw(6) }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: sw(14), paddingVertical: sw(10), borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
          <View style={{ flexDirection: "row", gap: sw(6) }}>
            {["All", "Active", "Inactive"].map((tab) => (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={{ paddingHorizontal: sw(10), paddingVertical: sw(5) }}>
                <Text style={{ fontSize: sw(10), fontWeight: activeTab === tab ? "700" : "600", color: activeTab === tab ? COLORS.primary : COLORS.textLight, borderBottomWidth: activeTab === tab ? 2 : 0, borderBottomColor: COLORS.primary, paddingBottom: sw(1) }}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: "row", gap: sw(6) }}>
            <TouchableOpacity style={{ width: sw(28), height: sw(28), borderRadius: sw(6), backgroundColor: `${COLORS.primary}15`, alignItems: "center", justifyContent: "center" }}>
              <Filter size={sw(12)} color={COLORS.primary} strokeWidth={2.5} />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: sw(28), height: sw(28), borderRadius: sw(6), backgroundColor: `${COLORS.success}15`, alignItems: "center", justifyContent: "center" }}>
              <Plus size={sw(12)} color={COLORS.success} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <ScrollView style={{ flex: 0.42, backgroundColor: COLORS.white, borderRightWidth: 1, borderRightColor: COLORS.border, paddingTop: sw(8) }} contentContainerStyle={{ paddingHorizontal: sw(8), paddingBottom: sw(100) }} showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.text, paddingHorizontal: sw(8), marginBottom: sw(8) }}>Employees ({filteredEmployees.length})</Text>
            {filteredEmployees.map((emp) => (
              <View key={emp.id} style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(9), padding: sw(7), marginBottom: sw(7), alignItems: "flex-start", borderLeftWidth: 3, borderLeftColor: emp.statusColor }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(5), width: "100%" }}>
                  <View style={{ width: sw(26), height: sw(26), borderRadius: sw(13), backgroundColor: emp.statusColor, alignItems: "center", justifyContent: "center", marginRight: sw(5) }}>
                    <Text style={{ color: "#FFFFFF", fontSize: sw(10), fontWeight: "700" }}>{emp.name[0]}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.text }}>{emp.name}</Text>
                    <Text style={{ fontSize: sw(7), color: COLORS.textSecondary, marginTop: sw(1) }}>{emp.role}</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: `${emp.statusColor}20`, paddingHorizontal: sw(5), paddingVertical: sw(2), borderRadius: sw(3), width: "100%", marginBottom: sw(2) }}>
                  <Text style={{ fontSize: sw(7), color: emp.statusColor, fontWeight: "600" }}>{emp.status}</Text>
                </View>
                <Text style={{ fontSize: sw(7), color: COLORS.textLight }}>{emp.time}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={{ flex: 0.58, backgroundColor: "#E0F1FF", alignItems: "center", justifyContent: "center", paddingVertical: sw(12) }}>
            <View style={{ backgroundColor: "rgba(255,255,255,0.8)", borderRadius: sw(10), paddingHorizontal: sw(10), paddingVertical: sw(10), alignItems: "center", marginBottom: sw(12), width: "88%" }}>
              <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.text }}>Live Location Map</Text>
              <Text style={{ fontSize: sw(7), color: COLORS.textSecondary, marginTop: sw(2) }}>Real-time monitoring</Text>
            </View>
            {filteredEmployees.slice(0, 3).map((emp, idx) => (
              <View key={idx} style={{ width: sw(30), height: sw(30), borderRadius: sw(15), backgroundColor: emp.statusColor, alignItems: "center", justifyContent: "center", marginBottom: sw(60), marginHorizontal: sw(idx === 0 ? -20 : idx === 1 ? 0 : 20), zIndex: 10 - idx }}>
                <Navigation size={sw(14)} color="#FFFFFF" strokeWidth={2} />
              </View>
            ))}
            <View style={{ alignItems: "center", paddingVertical: sw(10), backgroundColor: "rgba(255,255,255,0.7)", borderRadius: sw(8), paddingHorizontal: sw(12), marginTop: sw(30) }}>
              <Text style={{ fontSize: sw(8), color: COLORS.textLight, fontWeight: "600" }}>📍 You are here</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
