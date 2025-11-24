import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, X, Edit3, CheckCircle, Plus, Search } from "lucide-react-native";
import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View, TextInput, Modal } from "react-native";
import { useState } from "react";

const COLORS = {
  gradient1: "#00FF87", gradient2: "#016B3A", gradient3: "#013B1F", gradient4: "#012B17",
  primary: "#016B3A", primaryLight: "#10B981", white: "#FFFFFF", text: "#1A1A1A", textSecondary: "#666666",
  textLight: "#999999", bg: "#FFFFFF", cardBg: "#F9FAFB", border: "#E5E7EB", success: "#10B981", danger: "#EF4444",
  warning: "#F59E0B", info: "#3B82F6",
};

function useScale() {
  const { width } = useWindowDimensions();
  return { sw: (n) => Math.round((Math.min(width, 480) / 390) * n) };
}

const ROLES_DATA = [
  {
    id: 1, name: "Accounts Department", icon: "💜", color: "#8B5CF6", count: 1, description: "Financial accounting and bookkeeping operations",
    modules: ["Financial Management", "Accounting", "Payment Processing", "Budget Management"],
    permissions: ["accounts-read", "accounts-update", "payments-read", "accounts-create", "invoices-create"],
    reportsTo: ["Finance Department", "Directors' Details"], canManage: ["Accounting Staff"],
  },
  {
    id: 2, name: "Legal Department", icon: "⚖️", color: "#8B5CF6", count: 2, description: "Legal affairs and compliance management",
    modules: ["Legal Documentation", "Compliance", "Contracts"],
    permissions: ["legal-read", "legal-create", "contracts-read", "compliance-read"],
    reportsTo: ["Finance Department"], canManage: ["Legal Staff"],
  },
  {
    id: 3, name: "Vendor List Management", icon: "🔗", color: "#8B5CF6", count: 3, description: "Vendor database and relationship management",
    modules: ["Vendor Database", "Vendor Relations"],
    permissions: ["vendor-read", "vendor-create", "vendor-update"],
    reportsTo: ["Finance Department"], canManage: ["Vendor Staff"],
  },
  {
    id: 4, name: "IT Department", icon: "💻", color: "#8B5CF6", count: 5, description: "Technology infrastructure and support",
    modules: ["Systems", "Infrastructure", "Support"],
    permissions: ["it-read", "it-create", "systems-read"],
    reportsTo: ["Directors' Details"], canManage: ["IT Staff"],
  },
  {
    id: 5, name: "Corporate Office Details", icon: "🏢", color: "#8B5CF6", count: 7, description: "Corporate office operations and management",
    modules: ["Operations", "Management"],
    permissions: ["corporate-read", "corporate-create"],
    reportsTo: ["Directors' Details"], canManage: ["Corporate Staff"],
  },
  {
    id: 6, name: "Directors' Details", icon: "👔", color: "#8B5CF6", count: 8, description: "Board of directors and executive management",
    modules: ["Strategic Planning", "Executive"],
    permissions: ["director-read", "director-create", "director-update"],
    reportsTo: ["Board"], canManage: ["All Departments"],
  },
  {
    id: 7, name: "Marketing Department", icon: "📊", color: "#EC4899", count: 6, description: "Brand promotion and customer acquisition",
    modules: ["Campaigns", "Analytics", "Communications"],
    permissions: ["marketing-read", "campaigns-create", "analytics-read"],
    reportsTo: ["Directors' Details"], canManage: ["Marketing Staff"],
  },
  {
    id: 8, name: "Finance Department", icon: "💰", color: "#F59E0B", count: 8, description: "Financial planning and analysis",
    modules: ["Budget", "Reports", "Analysis"],
    permissions: ["finance-read", "finance-create", "budget-read"],
    reportsTo: ["Directors' Details"], canManage: ["Finance Staff"],
  },
  {
    id: 9, name: "HR Department", icon: "👥", color: "#3B82F6", count: 5, description: "Human resources and employee management",
    modules: ["Recruitment", "Payroll", "Benefits"],
    permissions: ["hr-read", "hr-create", "payroll-read"],
    reportsTo: ["Directors' Details"], canManage: ["HR Staff"],
  },
  {
    id: 10, name: "System Roles", icon: "⚙️", color: "#10B981", count: 4, description: "Core system and admin roles",
    modules: ["Admin", "System", "Configuration"],
    permissions: ["admin-read", "system-read", "config-read"],
    reportsTo: ["System"], canManage: ["All Users"],
  },
  {
    id: 11, name: "Modules", icon: "📦", color: "#F59E0B", count: 8, description: "System modules and features",
    modules: ["Core Modules", "Extensions"],
    permissions: ["module-read", "module-create"],
    reportsTo: ["System"], canManage: ["Module Admins"],
  },
  {
    id: 12, name: "Departments", icon: "🏛️", color: "#3B82F6", count: 6, description: "Department management and structure",
    modules: ["Org Structure", "Departments"],
    permissions: ["dept-read", "dept-create"],
    reportsTo: ["Directors' Details"], canManage: ["Dept Heads"],
  },
];

function RoleCard({ role, sw, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginBottom: sw(10), marginHorizontal: sw(2) }}>
      <LinearGradient colors={[`${role.color}15`, `${role.color}05`]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: sw(10), overflow: "hidden" }}>
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: sw(10), padding: sw(12), borderWidth: 1, borderColor: COLORS.border }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(8) }}>
            <Text style={{ fontSize: sw(20), marginRight: sw(8) }}>{role.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text }}>{role.name}</Text>
              <Text style={{ fontSize: sw(7), color: COLORS.textLight, marginTop: sw(1) }}>{role.description.substring(0, 40)}...</Text>
            </View>
            <View style={{ backgroundColor: `${role.color}20`, paddingHorizontal: sw(8), paddingVertical: sw(4), borderRadius: sw(6) }}>
              <Text style={{ fontSize: sw(9), fontWeight: "700", color: role.color }}>{role.count}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: sw(4) }}>
            <TouchableOpacity style={{ flex: 1, backgroundColor: `${role.color}10`, borderRadius: sw(6), paddingVertical: sw(4), alignItems: "center" }}>
              <Text style={{ fontSize: sw(8), fontWeight: "600", color: role.color }}>Users</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, backgroundColor: `${COLORS.primary}10`, borderRadius: sw(6), paddingVertical: sw(4), alignItems: "center" }}>
              <Text style={{ fontSize: sw(8), fontWeight: "600", color: COLORS.primary }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function RoleDetailModal({ visible, role, sw, onClose, onEdit }) {
  if (!role) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View style={{ flex: 1, marginTop: sw(40), backgroundColor: "#FFFFFF", borderTopLeftRadius: sw(20), borderTopRightRadius: sw(20), overflow: "hidden" }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: sw(16), paddingTop: sw(16), paddingBottom: sw(20) }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(14) }}>
              <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.text }}>{role.name}</Text>
              <TouchableOpacity onPress={onClose} style={{ width: sw(32), height: sw(32), borderRadius: sw(16), backgroundColor: COLORS.cardBg, alignItems: "center", justifyContent: "center" }}>
                <X size={sw(16)} color={COLORS.text} strokeWidth={2.5} />
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(10), padding: sw(12), marginBottom: sw(14) }}>
              <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(4) }}>DESCRIPTION</Text>
              <Text style={{ fontSize: sw(10), color: COLORS.text, lineHeight: sw(16) }}>{role.description}</Text>
            </View>

            <View style={{ marginBottom: sw(14) }}>
              <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(8) }}>AVAILABLE MODULES</Text>
              <View style={{ backgroundColor: `${role.color}10`, borderRadius: sw(10), padding: sw(10), borderWidth: 1, borderColor: `${role.color}30` }}>
                {role.modules.map((mod, idx) => (
                  <Text key={idx} style={{ fontSize: sw(9), color: role.color, fontWeight: "600", marginBottom: idx < role.modules.length - 1 ? sw(4) : 0 }}>• {mod}</Text>
                ))}
              </View>
            </View>

            <View style={{ marginBottom: sw(14) }}>
              <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(8) }}>PERMISSIONS</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: sw(6) }}>
                {role.permissions.map((perm, idx) => (
                  <View key={idx} style={{ flexDirection: "row", alignItems: "center", backgroundColor: COLORS.cardBg, borderRadius: sw(6), paddingHorizontal: sw(8), paddingVertical: sw(4) }}>
                    <CheckCircle size={sw(10)} color={COLORS.success} strokeWidth={2} />
                    <Text style={{ fontSize: sw(8), color: COLORS.text, marginLeft: sw(4), fontWeight: "500" }}>{perm}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={{ marginBottom: sw(14) }}>
              <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(8) }}>REPORTING STRUCTURE</Text>
              <View style={{ backgroundColor: "#FEF3C7", borderRadius: sw(10), padding: sw(10), marginBottom: sw(8) }}>
                <Text style={{ fontSize: sw(8), color: COLORS.textLight, marginBottom: sw(4) }}>Reports To:</Text>
                {role.reportsTo.map((dept, idx) => (
                  <View key={idx} style={{ backgroundColor: "#FCD34D", paddingHorizontal: sw(8), paddingVertical: sw(4), borderRadius: sw(4), marginBottom: idx < role.reportsTo.length - 1 ? sw(4) : 0 }}>
                    <Text style={{ fontSize: sw(9), fontWeight: "600", color: "#92400E" }}>{dept}</Text>
                  </View>
                ))}
              </View>
              <View style={{ backgroundColor: "#D1FAE5", borderRadius: sw(10), padding: sw(10) }}>
                <Text style={{ fontSize: sw(8), color: COLORS.textLight, marginBottom: sw(4) }}>Can Manage:</Text>
                {role.canManage.map((staff, idx) => (
                  <Text key={idx} style={{ fontSize: sw(9), fontWeight: "600", color: COLORS.success, marginBottom: idx < role.canManage.length - 1 ? sw(4) : 0 }}>• {staff}</Text>
                ))}
              </View>
            </View>

            <View style={{ flexDirection: "row", gap: sw(8) }}>
              <TouchableOpacity onPress={onEdit} style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.primary, borderRadius: sw(10), paddingVertical: sw(10), gap: sw(6) }}>
                <Edit3 size={sw(14)} color={COLORS.primary} strokeWidth={2} />
                <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.primary }}>Edit Role</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={{ flex: 1, backgroundColor: COLORS.primary, borderRadius: sw(10), paddingVertical: sw(10), alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: sw(10), fontWeight: "700", color: "#FFFFFF" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export default function RoleManagement({ onBack }) {
  const { sw } = useScale();
  const nav = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredRoles = ROLES_DATA.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRoles = ROLES_DATA.length;
  const totalUsers = ROLES_DATA.reduce((sum, role) => sum + role.count, 0);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} translucent={false} />
      <LinearGradient colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ paddingTop: Platform.OS === 'ios' ? sw(50) : sw(40), paddingBottom: sw(16), paddingHorizontal: sw(20) }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(12) }}>
          <TouchableOpacity onPress={() => onBack ? onBack() : nav.goBack()} style={{ width: sw(38), height: sw(38), borderRadius: sw(19), backgroundColor: "rgba(255,255,255,0.25)", alignItems: "center", justifyContent: "center" }}>
            <ArrowLeft size={sw(20)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <View>
            <Text style={{ color: "#FFFFFF", fontSize: sw(14), fontWeight: "800", textAlign: "center" }}>Role Management</Text>
          </View>
          <TouchableOpacity style={{ width: sw(38), height: sw(38), borderRadius: sw(19), backgroundColor: `rgba(255,255,255,0.25)`, alignItems: "center", justifyContent: "center" }}>
            <Plus size={sw(20)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
        <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(9), textAlign: "center", marginBottom: sw(10) }}>Manage system roles and permissions</Text>
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: sw(10), flexDirection: "row", alignItems: "center", paddingHorizontal: sw(12) }}>
          <Search size={sw(16)} color={COLORS.primary} strokeWidth={2} />
          <TextInput
            placeholder="Search roles by name or description"
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ flex: 1, paddingVertical: sw(10), paddingHorizontal: sw(10), color: COLORS.text, fontSize: sw(10) }}
          />
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: sw(12), paddingTop: sw(16), paddingBottom: sw(100) }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: sw(8), marginBottom: sw(16) }}>
          <View style={{ flex: 1, backgroundColor: "#E0F1FF", borderRadius: sw(10), padding: sw(10) }}>
            <Text style={{ fontSize: sw(8), color: COLORS.info, fontWeight: "600" }}>Total Roles</Text>
            <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.info, marginTop: sw(2) }}>{totalRoles}</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#D1FAE5", borderRadius: sw(10), padding: sw(10) }}>
            <Text style={{ fontSize: sw(8), color: COLORS.success, fontWeight: "600" }}>Total Users</Text>
            <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.success, marginTop: sw(2) }}>{totalUsers}</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#FEF3C7", borderRadius: sw(10), padding: sw(10) }}>
            <Text style={{ fontSize: sw(8), color: COLORS.warning, fontWeight: "600" }}>Departments</Text>
            <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.warning, marginTop: sw(2) }}>8</Text>
          </View>
        </View>

        <Text style={{ fontSize: sw(11), fontWeight: "800", color: COLORS.text, marginBottom: sw(10) }}>System Roles ({filteredRoles.length})</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          {filteredRoles.map((role) => (
            <View key={role.id} style={{ width: "48%", marginBottom: sw(8) }}>
              <RoleCard role={role} sw={sw} onPress={() => { setSelectedRole(role); setModalVisible(true); }} />
            </View>
          ))}
        </View>
      </ScrollView>

      <RoleDetailModal visible={modalVisible} role={selectedRole} sw={sw} onClose={() => setModalVisible(false)} onEdit={() => { setModalVisible(false); }} />
    </View>
  );
}
