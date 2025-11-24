import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Building2, MapPin, Users, Calendar, Settings, BarChart2, Phone, Mail, MapPinIcon, Star } from "lucide-react-native";
import { useState } from "react";
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
  success: "#10B981",
  warning: "#F59E0B",
  info: "#3B82F6",
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
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
      marginBottom: sw(10),
    }} onPress={onPress} activeOpacity={0.7}>
      <View style={{
        backgroundColor: `${color}15`,
        width: sw(40),
        height: sw(40),
        borderRadius: sw(10),
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Icon size={sw(18)} color={color} strokeWidth={2.5} />
      </View>
      <View style={{ flex: 1, marginLeft: sw(10) }}>
        <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(3) }}>
          {title}
        </Text>
        <Text style={{ fontSize: sw(10), color: COLORS.textSecondary }}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function SpaCard({ name, location, staff, rating, status, sw }) {
  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
      marginBottom: sw(10),
    }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: sw(8) }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(2) }}>
            {name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: sw(4), marginBottom: sw(6) }}>
            <MapPin size={sw(12)} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={{ fontSize: sw(10), color: COLORS.textSecondary }}>
              {location}
            </Text>
          </View>
        </View>
        <View style={{
          backgroundColor: status === "Active" ? "#DCFCE7" : "#FEF9C3",
          paddingHorizontal: sw(8),
          paddingVertical: sw(4),
          borderRadius: sw(6),
        }}>
          <Text style={{ fontSize: sw(9), fontWeight: "700", color: status === "Active" ? "#15803D" : "#A16207" }}>
            {status}
          </Text>
        </View>
      </View>

      <View style={{
        backgroundColor: COLORS.white,
        borderRadius: sw(8),
        padding: sw(10),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: sw(8),
      }}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Users size={sw(14)} color={COLORS.info} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.text, marginTop: sw(4) }}>
            {staff} Staff
          </Text>
        </View>
        <View style={{ width: 1, height: sw(24), backgroundColor: COLORS.border }} />
        <View style={{ alignItems: "center", flex: 1 }}>
          <Star size={sw(14)} color={COLORS.warning} strokeWidth={2.5} fill={COLORS.warning} />
          <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.text, marginTop: sw(4) }}>
            {rating}★
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: sw(6) }}>
        <TouchableOpacity style={{
          flex: 1,
          borderWidth: 1,
          borderColor: COLORS.primaryLight,
          borderRadius: sw(8),
          paddingVertical: sw(8),
          alignItems: "center",
        }}>
          <Text style={{ fontSize: sw(10), fontWeight: "600", color: COLORS.primary }}>
            View Details
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          flex: 1,
          backgroundColor: COLORS.primaryLight,
          borderRadius: sw(8),
          paddingVertical: sw(8),
          alignItems: "center",
        }}>
          <Text style={{ fontSize: sw(10), fontWeight: "700", color: "#FFFFFF" }}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ManageSpa({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();
  const [activeTab, setActiveTab] = useState("Overview");

  const actions = [
    { icon: Building2, title: "Spa Details", description: "View and edit spa information", color: COLORS.primaryLight },
    { icon: Users, title: "Staff Management", description: "Manage therapists and staff", color: COLORS.info },
    { icon: Calendar, title: "Schedule & Bookings", description: "Manage appointments", color: COLORS.success },
    { icon: Settings, title: "Services & Pricing", description: "Configure spa services", color: COLORS.warning },
    { icon: BarChart2, title: "Performance Reports", description: "View spa analytics", color: "#10B981" },
  ];

  const spas = [
    { name: "Serenity Wellness Spa", location: "Koramangala", staff: 12, rating: 4.8, status: "Active" },
    { name: "Bliss Beauty Center", location: "Indiranagar", staff: 8, rating: 4.5, status: "Active" },
    { name: "Ayurvedic Healing", location: "Whitefield", staff: 6, rating: 4.9, status: "Active" },
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
          paddingTop: Platform.OS === 'ios' ? sw(50) : sw(40),
          paddingBottom: sw(24),
          paddingHorizontal: sw(20),
        }}
      >
        <TouchableOpacity 
          onPress={() => onBack ? onBack() : nav.goBack()} 
          style={{
            width: sw(40),
            height: sw(40),
            borderRadius: sw(20),
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: sw(12),
          }}
        >
          <ArrowLeft size={sw(22)} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginBottom: sw(16) }}>
          <Text style={{ color: "#FFFFFF", fontSize: sw(16), fontWeight: "800", marginBottom: sw(5), textAlign: "center" }}>
            Manage Spa
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: sw(10), textAlign: "center" }}>
            Manage all spa operations
          </Text>
        </View>

        <View style={{
          backgroundColor: "rgba(255,255,255,0.15)",
          borderRadius: sw(12),
          padding: sw(4),
          flexDirection: "row",
          gap: sw(4),
        }}>
          {["Overview", "Operations"].map((label) => (
            <TouchableOpacity
              key={label}
              onPress={() => setActiveTab(label)}
              style={{
                flex: 1,
                paddingVertical: sw(10),
                paddingHorizontal: sw(8),
                borderRadius: sw(10),
                backgroundColor: activeTab === label ? "#FFFFFF" : "transparent",
                alignItems: "center",
              }}
            >
              <Text style={{
                color: activeTab === label ? COLORS.primary : "#FFFFFF",
                fontWeight: activeTab === label ? "700" : "600",
                fontSize: sw(11),
              }}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <View style={{ flex: 1, backgroundColor: COLORS.bg, borderTopLeftRadius: sw(24), borderTopRightRadius: sw(24), marginTop: 0 }}>
        <ScrollView 
          contentContainerStyle={{ paddingHorizontal: sw(16), paddingTop: sw(16), paddingBottom: sw(120) }} 
          showsVerticalScrollIndicator={false}
        >
          {activeTab === "Overview" && (
            <>
              {/* Stats */}
              <View style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: sw(12),
                borderWidth: 1,
                borderColor: COLORS.border,
                padding: sw(12),
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: sw(16),
              }}>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.primary }}>3</Text>
                  <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginTop: sw(2) }}>Active Spas</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.success }}>26</Text>
                  <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginTop: sw(2) }}>Total Staff</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.warning }}>4.7</Text>
                  <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginTop: sw(2) }}>Avg Rating</Text>
                </View>
              </View>

              <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(12) }}>
                Your Spas
              </Text>
              {spas.map((spa, idx) => (
                <SpaCard key={idx} {...spa} sw={sw} />
              ))}
            </>
          )}

          {activeTab === "Operations" && (
            <>
              <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(12) }}>
                Quick Actions
              </Text>
              {actions.map((action, idx) => (
                <ActionCard key={idx} {...action} sw={sw} />
              ))}

              <TouchableOpacity style={{
                backgroundColor: COLORS.primary,
                borderRadius: sw(10),
                paddingVertical: sw(12),
                alignItems: "center",
                marginTop: sw(16),
                flexDirection: "row",
                justifyContent: "center",
                gap: sw(8),
              }}>
                <Building2 size={sw(16)} color="#FFFFFF" strokeWidth={2.5} />
                <Text style={{ fontSize: sw(12), fontWeight: "700", color: "#FFFFFF" }}>
                  Add New Spa
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
