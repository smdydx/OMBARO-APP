import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Building2, MapPin, Users, Star, Phone, Mail, Edit2, Trash2, Plus } from "lucide-react-native";
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

export default function SpaManagement({ onBack }) {
  const { sw } = useScale();
  const nav = useNavigation();
  const [activeTab, setActiveTab] = useState("Active");

  const spas = [
    { id: 1, name: "Serenity Wellness Spa", location: "Koramangala", staff: 12, rating: 4.8, bookings: 245, status: "Active" },
    { id: 2, name: "Bliss Beauty Center", location: "Indiranagar", staff: 8, rating: 4.5, bookings: 189, status: "Active" },
    { id: 3, name: "Ayurvedic Healing", location: "Whitefield", staff: 6, rating: 4.9, bookings: 156, status: "Active" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gradient2 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} translucent={false} />
      <LinearGradient colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ paddingTop: Platform.OS === 'ios' ? sw(50) : sw(40), paddingBottom: sw(24), paddingHorizontal: sw(20) }}>
        <TouchableOpacity onPress={() => onBack ? onBack() : nav.goBack()} style={{ width: sw(40), height: sw(40), borderRadius: sw(20), backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginBottom: sw(12) }}>
          <ArrowLeft size={sw(22)} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={{ alignItems: "center", marginBottom: sw(16) }}>
          <Text style={{ color: "#FFFFFF", fontSize: sw(16), fontWeight: "800", marginBottom: sw(5) }}>Spa Management</Text>
          <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: sw(10) }}>Manage all spa locations</Text>
        </View>
      </LinearGradient>
      <View style={{ flex: 1, backgroundColor: COLORS.bg, borderTopLeftRadius: sw(28), borderTopRightRadius: sw(28), marginTop: 0 }}>
        <View style={{ backgroundColor: COLORS.cardBg, borderBottomWidth: 1, borderBottomColor: COLORS.border, paddingHorizontal: sw(16), paddingVertical: sw(10), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flexDirection: "row", gap: sw(4) }}>
            {["All", "Active", "Inactive"].map((tab) => (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={{ paddingHorizontal: sw(10), paddingVertical: sw(6), borderBottomWidth: activeTab === tab ? 2 : 0, borderBottomColor: activeTab === tab ? COLORS.primary : "transparent" }}>
                <Text style={{ fontSize: sw(10), fontWeight: activeTab === tab ? "700" : "600", color: activeTab === tab ? COLORS.primary : COLORS.textLight }}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={{ width: sw(28), height: sw(28), borderRadius: sw(6), backgroundColor: `${COLORS.success}15`, alignItems: "center", justifyContent: "center" }}>
            <Plus size={sw(12)} color={COLORS.success} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: sw(16), paddingTop: sw(12), paddingBottom: sw(120) }} showsVerticalScrollIndicator={false}>
          {spas.map((spa) => (
            <View key={spa.id} style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(12), borderWidth: 1, borderColor: COLORS.border, padding: sw(12), marginBottom: sw(10) }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: sw(8) }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>{spa.name}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: sw(4), marginTop: sw(4) }}>
                    <MapPin size={sw(12)} color={COLORS.primary} strokeWidth={2.5} />
                    <Text style={{ fontSize: sw(9), color: COLORS.textSecondary }}>{spa.location}</Text>
                  </View>
                </View>
              </View>
              <View style={{ backgroundColor: COLORS.white, borderRadius: sw(8), padding: sw(8), flexDirection: "row", justifyContent: "space-around", marginBottom: sw(8) }}>
                <View style={{ alignItems: "center", flex: 1 }}>
                  <Users size={sw(14)} color={COLORS.info} strokeWidth={2.5} />
                  <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.text, marginTop: sw(4) }}>{spa.staff}</Text>
                  <Text style={{ fontSize: sw(8), color: COLORS.textLight }}>Staff</Text>
                </View>
                <View style={{ alignItems: "center", flex: 1 }}>
                  <Star size={sw(14)} color={COLORS.warning} fill={COLORS.warning} strokeWidth={2.5} />
                  <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.text, marginTop: sw(4) }}>{spa.rating}</Text>
                  <Text style={{ fontSize: sw(8), color: COLORS.textLight }}>Rating</Text>
                </View>
                <View style={{ alignItems: "center", flex: 1 }}>
                  <Building2 size={sw(14)} color={COLORS.success} strokeWidth={2.5} />
                  <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.text, marginTop: sw(4) }}>{spa.bookings}</Text>
                  <Text style={{ fontSize: sw(8), color: COLORS.textLight }}>Bookings</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: sw(6) }}>
                <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: COLORS.primaryLight, borderRadius: sw(8), paddingVertical: sw(8), alignItems: "center", flexDirection: "row", justifyContent: "center", gap: sw(4) }}>
                  <Edit2 size={sw(12)} color={COLORS.primary} strokeWidth={2.5} />
                  <Text style={{ fontSize: sw(10), fontWeight: "600", color: COLORS.primary }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: "#EF4444", borderRadius: sw(8), paddingVertical: sw(8), alignItems: "center", flexDirection: "row", justifyContent: "center", gap: sw(4) }}>
                  <Trash2 size={sw(12)} color="#EF4444" strokeWidth={2.5} />
                  <Text style={{ fontSize: sw(10), fontWeight: "600", color: "#EF4444" }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
