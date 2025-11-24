import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Users, Mail, Phone, CheckCircle, XCircle, Edit2, Trash2, Shield, Search } from "lucide-react-native";
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
  danger: "#EF4444",
};

function useScale() {
  const { width } = useWindowDimensions();
  const base = Math.min(width, 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw, width };
}

function UserCard({ name, email, role, status, sw }) {
  const roleColor = role === "Admin" ? COLORS.danger : role === "Manager" ? COLORS.warning : COLORS.success;
  
  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
      marginBottom: sw(10),
      flexDirection: "row",
      alignItems: "center",
    }}>
      <View style={{
        width: sw(40),
        height: sw(40),
        borderRadius: sw(20),
        backgroundColor: `${roleColor}15`,
        alignItems: "center",
        justifyContent: "center",
        marginRight: sw(10),
      }}>
        <Users size={sw(18)} color={roleColor} strokeWidth={2.5} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>
          {name}
        </Text>
        <Text style={{ fontSize: sw(9), color: COLORS.textSecondary, marginTop: sw(2) }}>
          {email}
        </Text>
        <View style={{ flexDirection: "row", gap: sw(6), marginTop: sw(4) }}>
          <View style={{
            backgroundColor: `${roleColor}15`,
            paddingHorizontal: sw(6),
            paddingVertical: sw(3),
            borderRadius: sw(4),
          }}>
            <Text style={{ fontSize: sw(8), fontWeight: "600", color: roleColor }}>
              {role}
            </Text>
          </View>
          {status === "Active" ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: sw(2) }}>
              <CheckCircle size={sw(10)} color={COLORS.success} strokeWidth={2.5} fill={COLORS.success} />
              <Text style={{ fontSize: sw(8), fontWeight: "600", color: COLORS.success }}>Active</Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center", gap: sw(2) }}>
              <XCircle size={sw(10)} color={COLORS.danger} strokeWidth={2.5} />
              <Text style={{ fontSize: sw(8), fontWeight: "600", color: COLORS.danger }}>Inactive</Text>
            </View>
          )}
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: sw(6) }}>
        <TouchableOpacity style={{
          width: sw(28),
          height: sw(28),
          borderRadius: sw(6),
          backgroundColor: `${COLORS.primary}15`,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Edit2 size={sw(12)} color={COLORS.primary} strokeWidth={2.5} />
        </TouchableOpacity>
        <TouchableOpacity style={{
          width: sw(28),
          height: sw(28),
          borderRadius: sw(6),
          backgroundColor: `${COLORS.danger}15`,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Trash2 size={sw(12)} color={COLORS.danger} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function UserManagement({ onBack }) {
  const { sw, width } = useScale();
  const nav = useNavigation();
  const [searchText, setSearchText] = useState("");

  const users = [
    { id: 1, name: "Rajesh Sharma", email: "rajesh@spa.com", role: "Admin", status: "Active" },
    { id: 2, name: "Priya Sharma", email: "priya@spa.com", role: "Manager", status: "Active" },
    { id: 3, name: "Rahul Kumar", email: "rahul@spa.com", role: "Employee", status: "Active" },
    { id: 4, name: "Vikram Singh", email: "vikram@spa.com", role: "Manager", status: "Active" },
    { id: 5, name: "Anjali Patel", email: "anjali@spa.com", role: "Employee", status: "Inactive" },
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
            User Management
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: sw(10), textAlign: "center" }}>
            Manage system users
          </Text>
        </View>

        <View style={{
          backgroundColor: "rgba(255,255,255,0.15)",
          borderRadius: sw(10),
          paddingHorizontal: sw(12),
          paddingVertical: sw(8),
          flexDirection: "row",
          alignItems: "center",
          marginBottom: sw(12),
        }}>
          <Search size={sw(16)} color="rgba(255,255,255,0.6)" strokeWidth={2} />
          <Text style={{ fontSize: sw(11), color: "rgba(255,255,255,0.6)", marginLeft: sw(8), flex: 1 }}>
            Search users...
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: sw(6) }}>
          <View style={{
            flex: 1,
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: sw(10),
            padding: sw(10),
            alignItems: "center",
          }}>
            <Text style={{ fontSize: sw(16), fontWeight: "800", color: "#FFFFFF" }}>12</Text>
            <Text style={{ fontSize: sw(9), color: "rgba(255,255,255,0.9)", marginTop: sw(2) }}>Total Users</Text>
          </View>
          <View style={{
            flex: 1,
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: sw(10),
            padding: sw(10),
            alignItems: "center",
          }}>
            <Text style={{ fontSize: sw(16), fontWeight: "800", color: "#FFFFFF" }}>11</Text>
            <Text style={{ fontSize: sw(9), color: "rgba(255,255,255,0.9)", marginTop: sw(2) }}>Active</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={{ 
        flex: 1,
        backgroundColor: COLORS.bg,
        borderTopLeftRadius: sw(28),
        borderTopRightRadius: sw(28),
        marginTop: 0,
      }}>
        <ScrollView 
          contentContainerStyle={{ paddingHorizontal: sw(16), paddingTop: sw(16), paddingBottom: sw(120) }} 
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={{
            backgroundColor: COLORS.primary,
            borderRadius: sw(10),
            paddingVertical: sw(10),
            alignItems: "center",
            marginBottom: sw(16),
            flexDirection: "row",
            justifyContent: "center",
            gap: sw(6),
          }}>
            <Users size={sw(14)} color="#FFFFFF" strokeWidth={2.5} />
            <Text style={{ fontSize: sw(11), fontWeight: "700", color: "#FFFFFF" }}>Add New User</Text>
          </TouchableOpacity>

          {users.map((user) => (
            <UserCard key={user.id} {...user} sw={sw} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
