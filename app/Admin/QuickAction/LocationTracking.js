import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, MapPin, Navigation, Search, ChevronDown, Plus, Filter, Share2, Zap, Copy } from "lucide-react-native";
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

function EmployeeCard({ emp, sw, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginBottom: sw(10) }}>
      <LinearGradient colors={[`${emp.statusColor}08`, `${emp.statusColor}02`]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: sw(12), overflow: "hidden" }}>
        <View style={{ backgroundColor: "rgba(255,255,255,0.95)", borderRadius: sw(12), padding: sw(12), borderLeftWidth: 4, borderLeftColor: emp.statusColor }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: sw(8) }}>
            <View style={{ width: sw(40), height: sw(40), borderRadius: sw(20), backgroundColor: emp.statusColor, alignItems: "center", justifyContent: "center", marginRight: sw(10) }}>
              <Text style={{ color: "#FFFFFF", fontSize: sw(16), fontWeight: "800" }}>{emp.name[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>{emp.name}</Text>
              <Text style={{ fontSize: sw(8), color: COLORS.textSecondary, marginTop: sw(2) }}>{emp.role}</Text>
            </View>
            <View style={{ backgroundColor: `${emp.statusColor}20`, paddingHorizontal: sw(8), paddingVertical: sw(4), borderRadius: sw(6) }}>
              <Text style={{ fontSize: sw(9), color: emp.statusColor, fontWeight: "700" }}>●</Text>
            </View>
          </View>
          <View style={{ backgroundColor: `${emp.statusColor}15`, paddingHorizontal: sw(10), paddingVertical: sw(6), borderRadius: sw(8), marginBottom: sw(6) }}>
            <Text style={{ fontSize: sw(10), color: emp.statusColor, fontWeight: "600" }}>{emp.status}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: `${COLORS.border}40`, paddingTopWidth: sw(8) }}>
            <Text style={{ fontSize: sw(8), color: COLORS.textLight, fontWeight: "500" }}>⏱ {emp.time}</Text>
            <Navigation size={sw(12)} color={emp.statusColor} strokeWidth={2} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function LocationTracking({ onBack }) {
  const { sw } = useScale();
  const { width } = useWindowDimensions();
  const nav = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [showCopied, setShowCopied] = useState(false);
  const isMobile = width < 500;

  const currentLocation = { lat: "12.9716°N", lon: "77.5946°E", address: "Ombarc Beauty & Wellness Hub, Bangalore" };

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
    <View style={{ flex: 1, backgroundColor: "#F5F9FC" }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} translucent={false} />
      <LinearGradient colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ paddingTop: Platform.OS === 'ios' ? sw(50) : sw(40), paddingBottom: sw(20), paddingHorizontal: sw(20) }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(12) }}>
          <TouchableOpacity onPress={() => onBack ? onBack() : nav.goBack()} style={{ width: sw(38), height: sw(38), borderRadius: sw(19), backgroundColor: "rgba(255,255,255,0.25)", alignItems: "center", justifyContent: "center" }}>
            <ArrowLeft size={sw(20)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <View>
            <Text style={{ color: "#FFFFFF", fontSize: sw(16), fontWeight: "800", textAlign: "center" }}>Location Tracking</Text>
          </View>
          <View style={{ width: sw(38) }} />
        </View>
        <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(10), marginBottom: sw(14), textAlign: "center" }}>Real-time employee monitoring</Text>
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: sw(12), flexDirection: "row", alignItems: "center", paddingHorizontal: sw(12), marginBottom: sw(8) }}>
          <Search size={sw(16)} color={COLORS.primary} strokeWidth={2} />
          <TextInput
            placeholder="Search employees..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ flex: 1, paddingVertical: sw(10), paddingHorizontal: sw(10), color: COLORS.text, fontSize: sw(11), fontWeight: "500" }}
          />
        </View>
      </LinearGradient>
      
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: sw(16), paddingTop: sw(14), paddingBottom: sw(100) }} showsVerticalScrollIndicator={false}>
        {/* Share Your Location Section */}
        <LinearGradient colors={["#00FF8715", "#016B3A10"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: sw(14), overflow: "hidden", marginBottom: sw(16) }}>
          <View style={{ backgroundColor: "rgba(255,255,255,0.96)", borderRadius: sw(14), borderWidth: 1, borderColor: COLORS.primaryLight, padding: sw(12) }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(10) }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: sw(8) }}>
                <View style={{ width: sw(36), height: sw(36), borderRadius: sw(18), backgroundColor: COLORS.success, alignItems: "center", justifyContent: "center" }}>
                  <Zap size={sw(16)} color="#FFFFFF" strokeWidth={2.5} />
                </View>
                <Text style={{ fontSize: sw(12), fontWeight: "800", color: COLORS.text }}>Share Your Location</Text>
              </View>
              <TouchableOpacity onPress={() => setLocationEnabled(!locationEnabled)} style={{ width: sw(48), height: sw(24), borderRadius: sw(12), backgroundColor: locationEnabled ? COLORS.success : COLORS.inactive, alignItems: "center", justifyContent: "center", flexDirection: "row", paddingHorizontal: sw(2) }}>
                <View style={{ width: sw(20), height: sw(20), borderRadius: sw(10), backgroundColor: "#FFFFFF", marginLeft: locationEnabled ? sw(24) : 0 }} />
              </TouchableOpacity>
            </View>
            
            {locationEnabled && (
              <>
                <View style={{ backgroundColor: "#E0F1FF", borderRadius: sw(10), padding: sw(10), marginBottom: sw(10) }}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(8) }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: sw(6) }}>
                      <MapPin size={sw(14)} color={COLORS.primary} strokeWidth={2.5} />
                      <Text style={{ fontSize: sw(9), color: COLORS.textSecondary, fontWeight: "600" }}>Current Location</Text>
                    </View>
                    <TouchableOpacity onPress={() => { setShowCopied(true); setTimeout(() => setShowCopied(false), 2000); }} style={{ backgroundColor: "rgba(1, 107, 58, 0.1)", paddingHorizontal: sw(8), paddingVertical: sw(4), borderRadius: sw(6), flexDirection: "row", alignItems: "center", gap: sw(4) }}>
                      <Copy size={sw(10)} color={COLORS.primary} strokeWidth={2} />
                      <Text style={{ fontSize: sw(8), color: COLORS.primary, fontWeight: "600" }}>{showCopied ? "Copied" : "Copy"}</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text, marginBottom: sw(4) }}>{currentLocation.address}</Text>
                  <View style={{ backgroundColor: "rgba(255,255,255,0.8)", borderRadius: sw(6), padding: sw(6) }}>
                    <Text style={{ fontSize: sw(8), color: COLORS.textSecondary, fontFamily: "monospace" }}>📍 {currentLocation.lat} {currentLocation.lon}</Text>
                  </View>
                </View>
                
                <View style={{ flexDirection: "row", gap: sw(6) }}>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: `${COLORS.success}20`, borderRadius: sw(8), paddingVertical: sw(8), alignItems: "center", flexDirection: "row", justifyContent: "center", gap: sw(4) }}>
                    <Navigation size={sw(12)} color={COLORS.success} strokeWidth={2} />
                    <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.success }}>View Map</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: `${COLORS.primary}20`, borderRadius: sw(8), paddingVertical: sw(8), alignItems: "center", flexDirection: "row", justifyContent: "center", gap: sw(4) }}>
                    <Share2 size={sw(12)} color={COLORS.primary} strokeWidth={2} />
                    <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.primary }}>Share</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </LinearGradient>

        {/* Employees List Section */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: sw(14) }}>
          <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF", borderRadius: sw(10), padding: sw(4), gap: sw(4) }}>
            {["All", "Active", "Inactive"].map((tab) => (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={{ paddingHorizontal: sw(12), paddingVertical: sw(6), borderRadius: sw(8), backgroundColor: activeTab === tab ? COLORS.primary : "transparent" }}>
                <Text style={{ fontSize: sw(10), fontWeight: activeTab === tab ? "700" : "600", color: activeTab === tab ? "#FFFFFF" : COLORS.textLight }}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: "row", gap: sw(8) }}>
            <TouchableOpacity style={{ width: sw(36), height: sw(36), borderRadius: sw(10), backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" }}>
              <Filter size={sw(16)} color={COLORS.primary} strokeWidth={2.5} />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: sw(36), height: sw(36), borderRadius: sw(10), backgroundColor: COLORS.success, alignItems: "center", justifyContent: "center" }}>
              <Plus size={sw(16)} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginBottom: sw(8) }}>
          <Text style={{ fontSize: sw(13), fontWeight: "800", color: COLORS.text, marginBottom: sw(10) }}>
            📍 {filteredEmployees.length} {activeTab === "All" ? "Employees" : activeTab === "Active" ? "Active" : "Inactive"}
          </Text>
        </View>

        {filteredEmployees.map((emp) => (
          <EmployeeCard key={emp.id} emp={emp} sw={sw} onPress={() => {}} />
        ))}

        {filteredEmployees.length === 0 && (
          <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: sw(40) }}>
            <MapPin size={sw(48)} color={COLORS.textLight} strokeWidth={1.5} />
            <Text style={{ fontSize: sw(12), color: COLORS.textLight, marginTop: sw(10), fontWeight: "500" }}>No employees found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
