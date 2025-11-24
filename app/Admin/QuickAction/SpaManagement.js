import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Building2, MapPin, Users, Star, Phone, Mail, Edit2, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

const COLORS = {
  gradient1: "#00FF87", gradient2: "#016B3A", gradient3: "#013B1F", gradient4: "#012B17",
  primary: "#016B3A", primaryLight: "#10B981", white: "#FFFFFF", text: "#1A1A1A", textSecondary: "#666666",
  textLight: "#999999", bg: "#FFFFFF", cardBg: "#F9FAFB", border: "#E5E7EB", success: "#10B981", warning: "#F59E0B",
};

function useScale() {
  const { width } = useWindowDimensions();
  return { sw: (n) => Math.round((Math.min(width, 480) / 390) * n) };
}

export default function SpaManagement({ onBack }) {
  const { sw } = useScale();
  const nav = useNavigation();
  
  const spas = [
    { id: 1, name: "Serenity Wellness", location: "Koramangala", staff: 12, rating: 4.8 },
    { id: 2, name: "Bliss Beauty Center", location: "Indiranagar", staff: 8, rating: 4.5 },
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
          <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: sw(10) }}>Manage all spas</Text>
        </View>
      </LinearGradient>
      <View style={{ flex: 1, backgroundColor: COLORS.bg, borderTopLeftRadius: sw(28), borderTopRightRadius: sw(28), marginTop: 0 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: sw(16), paddingTop: sw(16), paddingBottom: sw(120) }} showsVerticalScrollIndicator={false}>
          {spas.map((spa) => (
            <View key={spa.id} style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(12), borderWidth: 1, borderColor: COLORS.border, padding: sw(12), marginBottom: sw(10) }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: sw(8) }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>{spa.name}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: sw(4), marginTop: sw(4) }}>
                    <MapPin size={sw(12)} color={COLORS.primary} strokeWidth={2.5} />
                    <Text style={{ fontSize: sw(10), color: COLORS.textSecondary }}>{spa.location}</Text>
                  </View>
                </View>
              </View>
              <View style={{ backgroundColor: COLORS.white, borderRadius: sw(8), padding: sw(8), flexDirection: "row", justifyContent: "space-around", marginBottom: sw(8) }}>
                <View style={{ alignItems: "center" }}>
                  <Users size={sw(14)} color={COLORS.info} strokeWidth={2.5} />
                  <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.text, marginTop: sw(4) }}>{spa.staff}</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Star size={sw(14)} color={COLORS.warning} fill={COLORS.warning} strokeWidth={2.5} />
                  <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.text, marginTop: sw(4) }}>{spa.rating}★</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: sw(6) }}>
                <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: COLORS.primaryLight, borderRadius: sw(8), paddingVertical: sw(8), alignItems: "center" }}>
                  <Edit2 size={sw(14)} color={COLORS.primary} strokeWidth={2.5} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: "#EF4444", borderRadius: sw(8), paddingVertical: sw(8), alignItems: "center" }}>
                  <Trash2 size={sw(14)} color="#EF4444" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
