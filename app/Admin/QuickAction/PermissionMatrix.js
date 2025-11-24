import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Check, X, Save } from "lucide-react-native";
import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useState } from "react";

const COLORS = {
  gradient1: "#00FF87", gradient2: "#016B3A", gradient3: "#013B1F", gradient4: "#012B17",
  primary: "#016B3A", primaryLight: "#10B981", white: "#FFFFFF", text: "#1A1A1A", textSecondary: "#666666",
  textLight: "#999999", bg: "#FFFFFF", cardBg: "#F9FAFB", border: "#E5E7EB", success: "#10B981", danger: "#EF4444",
};

function useScale() {
  const { width } = useWindowDimensions();
  return { sw: (n) => Math.round((Math.min(width, 480) / 390) * n) };
}

const ROLES = [
  { id: 1, name: "Accounts", color: "#8B5CF6", permissions: { accounts: true, admin: false, analytics: false, audit: false, bookings: false, budget: false, campaigns: false, chat: false, compliance: false, contract: false, contact: false, customize: false, employee: false, fees: false } },
  { id: 2, name: "Marketing", color: "#EC4899", permissions: { accounts: false, admin: false, analytics: true, audit: false, bookings: false, budget: false, campaigns: true, chat: true, compliance: false, contract: false, contact: true, customize: false, employee: false, fees: false } },
  { id: 3, name: "Finance", color: "#F59E0B", permissions: { accounts: true, admin: false, analytics: false, audit: false, bookings: false, budget: true, campaigns: false, chat: false, compliance: false, contract: false, contact: false, customize: false, employee: false, fees: true } },
  { id: 4, name: "Legal", color: "#3B82F6", permissions: { accounts: false, admin: false, analytics: false, audit: true, bookings: false, budget: false, campaigns: false, chat: false, compliance: true, contract: true, contact: true, customize: false, employee: false, fees: false } },
];

const PERMISSIONS = [
  { key: "accounts", label: "Accounts" },
  { key: "admin", label: "Admin" },
  { key: "analytics", label: "Analytics" },
  { key: "audit", label: "Audit" },
  { key: "bookings", label: "Bookings" },
  { key: "budget", label: "Budget" },
  { key: "campaigns", label: "Campaigns" },
  { key: "chat", label: "Chat" },
  { key: "compliance", label: "Compliance" },
  { key: "contract", label: "Contract" },
  { key: "contact", label: "Contact" },
  { key: "customize", label: "Customize" },
  { key: "employee", label: "Employee" },
  { key: "fees", label: "Fees" },
];

function PermissionCell({ role, permission, sw, onToggle }) {
  const isAllowed = role.permissions[permission.key];
  return (
    <TouchableOpacity
      onPress={() => onToggle(role.id, permission.key)}
      style={{
        width: sw(32),
        height: sw(32),
        borderRadius: sw(6),
        backgroundColor: isAllowed ? `${COLORS.success}20` : `${COLORS.danger}20`,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: isAllowed ? COLORS.success : COLORS.danger,
      }}
    >
      {isAllowed ? (
        <Check size={sw(14)} color={COLORS.success} strokeWidth={3} />
      ) : (
        <X size={sw(14)} color={COLORS.danger} strokeWidth={3} />
      )}
    </TouchableOpacity>
  );
}

export default function PermissionMatrix({ onBack }) {
  const { sw } = useScale();
  const nav = useNavigation();
  const [roles, setRoles] = useState(ROLES);

  const togglePermission = (roleId, permissionKey) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [permissionKey]: !role.permissions[permissionKey],
          },
        };
      }
      return role;
    }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} translucent={false} />
      <LinearGradient colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ paddingTop: Platform.OS === 'ios' ? sw(50) : sw(40), paddingBottom: sw(16), paddingHorizontal: sw(20) }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(12) }}>
          <TouchableOpacity onPress={() => onBack ? onBack() : nav.goBack()} style={{ width: sw(38), height: sw(38), borderRadius: sw(19), backgroundColor: "rgba(255,255,255,0.25)", alignItems: "center", justifyContent: "center" }}>
            <ArrowLeft size={sw(20)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <View>
            <Text style={{ color: "#FFFFFF", fontSize: sw(14), fontWeight: "800", textAlign: "center" }}>Permission Matrix</Text>
          </View>
          <View style={{ width: sw(38) }} />
        </View>
        <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(9), textAlign: "center" }}>Configure role permissions</Text>
      </LinearGradient>

      <ScrollView style={{ flex: 1, backgroundColor: COLORS.bg }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: sw(12), paddingVertical: sw(12), paddingBottom: sw(80) }}>
        {roles.map((role) => (
          <View key={role.id} style={{ marginBottom: sw(16) }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(8), paddingHorizontal: sw(4) }}>
              <View style={{ width: sw(24), height: sw(24), borderRadius: sw(6), backgroundColor: role.color, marginRight: sw(8) }} />
              <Text style={{ fontSize: sw(12), fontWeight: "800", color: COLORS.text, flex: 1 }}>{role.name}</Text>
              <View style={{ backgroundColor: `${role.color}20`, paddingHorizontal: sw(6), paddingVertical: sw(3), borderRadius: sw(4) }}>
                <Text style={{ fontSize: sw(8), fontWeight: "700", color: role.color }}>
                  {Object.values(role.permissions).filter(Boolean).length}/{PERMISSIONS.length}
                </Text>
              </View>
            </View>
            
            <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(10), padding: sw(10), borderWidth: 1, borderColor: COLORS.border }}>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: sw(8) }}>
                {PERMISSIONS.map((permission) => (
                  <View key={permission.key} style={{ width: "48%", marginBottom: sw(8) }}>
                    <View style={{ backgroundColor: COLORS.white, borderRadius: sw(8), padding: sw(8), borderWidth: 1, borderColor: COLORS.border }}>
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(6) }}>
                        <Text style={{ fontSize: sw(9), fontWeight: "600", color: COLORS.text, flex: 1 }}>{permission.label}</Text>
                        <PermissionCell role={role} permission={permission} sw={sw} onToggle={togglePermission} />
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={{ backgroundColor: COLORS.primary, borderRadius: sw(12), paddingVertical: sw(12), alignItems: "center", justifyContent: "center", flexDirection: "row", gap: sw(8), marginTop: sw(16) }}>
          <Save size={sw(16)} color="#FFFFFF" strokeWidth={2.5} />
          <Text style={{ fontSize: sw(11), fontWeight: "700", color: "#FFFFFF" }}>Save Configuration</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
