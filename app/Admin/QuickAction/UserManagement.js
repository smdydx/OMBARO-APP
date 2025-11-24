import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Users, Mail, Phone, CheckCircle, XCircle, Edit2, Trash2, Search, Plus, Filter } from "lucide-react-native";
import { useState } from "react";
import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View, TextInput } from "react-native";

const COLORS = {
  gradient1: "#00FF87", gradient2: "#016B3A", gradient3: "#013B1F", gradient4: "#012B17",
  primary: "#016B3A", primaryLight: "#10B981", white: "#FFFFFF", text: "#1A1A1A", textSecondary: "#666666",
  textLight: "#999999", bg: "#FFFFFF", cardBg: "#F9FAFB", border: "#E5E7EB", success: "#10B981", warning: "#F59E0B", danger: "#EF4444",
};

function useScale() {
  const { width } = useWindowDimensions();
  return { sw: (n) => Math.round((Math.min(width, 480) / 390) * n) };
}

function UserCard({ name, email, role, phone, status, sw }) {
  const roleColors = { Admin: COLORS.danger, Manager: COLORS.warning, Employee: COLORS.success };
  return (
    <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(12), borderWidth: 1, borderColor: COLORS.border, padding: sw(12), marginBottom: sw(10) }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: sw(8) }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>{name}</Text>
          <Text style={{ fontSize: sw(9), color: COLORS.textSecondary, marginTop: sw(2) }}>{email}</Text>
        </View>
        <View style={{ backgroundColor: status === "Active" ? "#DCFCE7" : "#FEE2E2", paddingHorizontal: sw(8), paddingVertical: sw(4), borderRadius: sw(6) }}>
          <Text style={{ fontSize: sw(9), fontWeight: "700", color: status === "Active" ? "#15803D" : "#DC2626" }}>{status}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: sw(8), borderTopWidth: 1, borderTopColor: COLORS.border }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: sw(4) }}>
          <View style={{ backgroundColor: `${roleColors[role]}15`, paddingHorizontal: sw(6), paddingVertical: sw(3), borderRadius: sw(4) }}>
            <Text style={{ fontSize: sw(8), fontWeight: "600", color: roleColors[role] }}>{role}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: sw(4) }}>
            <Phone size={sw(11)} color={COLORS.textLight} strokeWidth={2} />
            <Text style={{ fontSize: sw(9), color: COLORS.textLight }}>{phone}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: sw(6) }}>
          <TouchableOpacity style={{ width: sw(28), height: sw(28), borderRadius: sw(6), backgroundColor: `${COLORS.primary}15`, alignItems: "center", justifyContent: "center" }}>
            <Edit2 size={sw(12)} color={COLORS.primary} strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: sw(28), height: sw(28), borderRadius: sw(6), backgroundColor: `${COLORS.danger}15`, alignItems: "center", justifyContent: "center" }}>
            <Trash2 size={sw(12)} color={COLORS.danger} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function UserManagement({ onBack }) {
  const { sw } = useScale();
  const nav = useNavigation();
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Total Users", value: "2,847", color: COLORS.primary },
    { label: "Active", value: "2,650", color: COLORS.success },
    { label: "Inactive", value: "197", color: COLORS.warning },
  ];

  const users = [
    { id: 1, name: "Rajesh Sharma", email: "rajesh@spa.com", role: "Admin", phone: "+91 98765 43210", status: "Active" },
    { id: 2, name: "Priya Sharma", email: "priya@spa.com", role: "Manager", phone: "+91 98765 43211", status: "Active" },
    { id: 3, name: "Rahul Kumar", email: "rahul@spa.com", role: "Employee", phone: "+91 98765 43212", status: "Active" },
    { id: 4, name: "Vikram Singh", email: "vikram@spa.com", role: "Manager", phone: "+91 98765 43213", status: "Inactive" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gradient2 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} translucent={false} />
      <LinearGradient colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ paddingTop: Platform.OS === 'ios' ? sw(50) : sw(40), paddingBottom: sw(16), paddingHorizontal: sw(20) }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(14) }}>
          <TouchableOpacity onPress={() => onBack ? onBack() : nav.goBack()} style={{ width: sw(40), height: sw(40), borderRadius: sw(20), backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" }}>
            <ArrowLeft size={sw(22)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ color: "#FFFFFF", fontSize: sw(15), fontWeight: "800" }}>User Management</Text>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(9), marginTop: sw(2) }}>Manage all system users</Text>
          </View>
          <View style={{ width: sw(40) }} />
        </View>
        <View style={{ backgroundColor: "rgba(255,255,255,0.15)", borderRadius: sw(12), flexDirection: "row", alignItems: "center", paddingHorizontal: sw(12) }}>
          <Search size={sw(16)} color="rgba(255,255,255,0.6)" strokeWidth={2} />
          <TextInput
            placeholder="Search users..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ flex: 1, paddingVertical: sw(10), paddingHorizontal: sw(10), color: "#FFFFFF", fontSize: sw(12) }}
          />
        </View>
      </LinearGradient>
      <View style={{ flex: 1, backgroundColor: COLORS.bg, borderTopLeftRadius: sw(24), borderTopRightRadius: sw(24), marginTop: -sw(8) }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: sw(16), paddingVertical: sw(12), borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
          <View style={{ flexDirection: "row", gap: sw(8) }}>
            {["All", "Active", "Inactive"].map((tab) => (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={{ paddingHorizontal: sw(12), paddingVertical: sw(6) }}>
                <Text style={{ fontSize: sw(11), fontWeight: activeTab === tab ? "700" : "600", color: activeTab === tab ? COLORS.primary : COLORS.textLight, borderBottomWidth: activeTab === tab ? 2 : 0, borderBottomColor: COLORS.primary, paddingBottom: sw(2) }}>{tab}</Text>
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
        <ScrollView contentContainerStyle={{ paddingHorizontal: sw(16), paddingTop: sw(12), paddingBottom: sw(120) }} showsVerticalScrollIndicator={false}>
          {users.map((user) => (
            <UserCard key={user.id} {...user} sw={sw} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
