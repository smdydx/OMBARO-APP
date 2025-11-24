import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, X, Edit3, CheckCircle, Plus, Search } from "lucide-react-native";
import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions, View, TextInput, Modal } from "react-native";
import { useState } from "react";

const COLORS = {
  gradient1: "#00FF87", gradient2: "#016B3A", gradient3: "#013B1F", gradient4: "#012B17",
  primary: "#016B3A", primaryLight: "#10B981", white: "#FFFFFF", text: "#1A1A1A", textSecondary: "#666666",
  textLight: "#999999", bg: "#F5F9FC", cardBg: "#F9FAFB", border: "#E5E7EB", success: "#10B981", danger: "#EF4444",
  warning: "#F59E0B", info: "#3B82F6",
};

function useScale() {
  const { width } = useWindowDimensions();
  return { sw: (n) => Math.round((Math.min(width, 480) / 390) * n) };
}

const ROLES_DATA = [
  {
    id: 1, name: "Accounts Department", color: "#8B5CF6", icon: "💜", count: 1, desc: "Financial accounting and bookkeeping",
    description: "Financial accounting and bookkeeping operations",
    modules: [{ name: "Financial Management", desc: "Financial operations and reporting", submodules: ["Accounting", "Payment Processing", "Budget Management"] }],
    permissions: ["accounts:read", "accounts:create", "accounts:update", "invoices:create", "payments:read"],
    reportsTo: ["Finance Department", "Directors' Details"],
    canManage: ["Accounting Staff"]
  },
  {
    id: 2, name: "Legal Department", color: "#8B5CF6", icon: "⚖️", count: 2, desc: "Legal affairs and compliance",
    description: "Legal affairs and compliance management",
    modules: [{ name: "Legal Documentation", desc: "Legal documents and compliance", submodules: ["Contracts", "Policies"] }],
    permissions: ["legal:read", "legal:create", "compliance:read"],
    reportsTo: ["Finance Department"],
    canManage: ["Legal Staff"]
  },
  {
    id: 3, name: "Vendor List Management", color: "#8B5CF6", icon: "🔗", count: 3, desc: "Vendor database management",
    description: "Vendor database and relationship management",
    modules: [{ name: "Vendor Management", desc: "Vendor operations and relationships", submodules: ["Database", "Relations"] }],
    permissions: ["vendor:read", "vendor:create", "vendor:update"],
    reportsTo: ["Finance Department"],
    canManage: ["Vendor Staff"]
  },
  {
    id: 4, name: "IT Department", color: "#8B5CF6", icon: "💻", count: 5, desc: "Technology and infrastructure",
    description: "Technology infrastructure and support",
    modules: [{ name: "Systems Management", desc: "IT systems and infrastructure", submodules: ["Infrastructure", "Support", "Security"] }],
    permissions: ["it:read", "it:create", "systems:read"],
    reportsTo: ["Directors' Details"],
    canManage: ["IT Staff"]
  },
  {
    id: 5, name: "Corporate Office Details", color: "#8B5CF6", icon: "🏢", count: 7, desc: "Corporate operations",
    description: "Corporate office operations and management",
    modules: [{ name: "Operations", desc: "Corporate operations management", submodules: ["Admin", "Facilities"] }],
    permissions: ["corporate:read", "corporate:create"],
    reportsTo: ["Directors' Details"],
    canManage: ["Corporate Staff"]
  },
  {
    id: 6, name: "Directors' Details", color: "#8B5CF6", icon: "👔", count: 8, desc: "Executive management",
    description: "Board of directors and executive management",
    modules: [{ name: "Executive", desc: "Executive operations", submodules: ["Strategic", "Planning"] }],
    permissions: ["director:read", "director:create", "director:update"],
    reportsTo: ["Board"],
    canManage: ["All Departments"]
  },
  {
    id: 7, name: "Employee", color: "#8B5CF6", icon: "👤", count: 1, desc: "Employee management",
    description: "Employee management and operations",
    modules: [{ name: "Employee Management", desc: "Employee operations", submodules: ["Profile", "Records"] }],
    permissions: ["employee:read", "employee:update"],
    reportsTo: ["HR Department"],
    canManage: ["Self"]
  },
  {
    id: 8, name: "Marketing Department", color: "#EC4899", icon: "📊", count: 6, desc: "Brand and customer acquisition",
    description: "Brand promotion and customer acquisition",
    modules: [{ name: "Marketing", desc: "Marketing campaigns and analytics", submodules: ["Campaigns", "Analytics", "Communications"] }],
    permissions: ["marketing:read", "campaigns:create", "analytics:read"],
    reportsTo: ["Directors' Details"],
    canManage: ["Marketing Staff"]
  },
  {
    id: 9, name: "Customer Care", color: "#EC4899", icon: "💬", count: 4, desc: "Customer support services",
    description: "Customer support and service operations",
    modules: [{ name: "Customer Support", desc: "Customer care and support", submodules: ["Support", "Feedback", "Issues"] }],
    permissions: ["customer:read", "support:create"],
    reportsTo: ["Marketing Department"],
    canManage: ["Support Staff"]
  },
  {
    id: 10, name: "Customer Data Management", color: "#EC4899", icon: "📋", count: 2, desc: "Customer analytics",
    description: "Customer information and analytics management",
    modules: [{ name: "Data Management", desc: "Customer data and analytics", submodules: ["Data", "Analytics", "Reporting"] }],
    permissions: ["data:read", "analytics:read"],
    reportsTo: ["Marketing Department"],
    canManage: ["Data Analysts"]
  },
  {
    id: 11, name: "Command Power - Super Admin", color: "#EC4899", icon: "⚡", count: 8, desc: "Ultimate system control",
    description: "Ultimate system control and administration",
    modules: [{ name: "System Control", desc: "Full system administration", submodules: ["All Modules", "Users", "Settings"] }],
    permissions: ["*:read", "*:create", "*:update", "*:delete", "admin:full"],
    reportsTo: ["System"],
    canManage: ["All Users"]
  },
  {
    id: 12, name: "Finance Department", color: "#F59E0B", icon: "💰", count: 8, desc: "Financial planning",
    description: "Financial planning and analysis",
    modules: [{ name: "Finance", desc: "Financial planning and reporting", submodules: ["Budget", "Reports", "Analysis"] }],
    permissions: ["finance:read", "finance:create", "budget:read"],
    reportsTo: ["Directors' Details"],
    canManage: ["Finance Staff"]
  },
  {
    id: 13, name: "Advocate", color: "#F59E0B", icon: "📄", count: 1, desc: "Legal representation",
    description: "Legal advocacy and representation",
    modules: [{ name: "Advocacy", desc: "Legal representation", submodules: ["Cases", "Documentation"] }],
    permissions: ["advocacy:read", "advocacy:create"],
    reportsTo: ["Legal Department"],
    canManage: ["Legal Staff"]
  },
  {
    id: 14, name: "HR Department", color: "#3B82F6", icon: "👥", count: 5, desc: "Human resources",
    description: "Human resources and employee management",
    modules: [{ name: "HR Management", desc: "HR operations and management", submodules: ["Recruitment", "Payroll", "Benefits"] }],
    permissions: ["hr:read", "hr:create", "payroll:read"],
    reportsTo: ["Directors' Details"],
    canManage: ["HR Staff"]
  },
  {
    id: 15, name: "Staff Department", color: "#10B981", icon: "👫", count: 8, desc: "Staff management",
    description: "Staff management and operations",
    modules: [{ name: "Staff Ops", desc: "Staff operations", submodules: ["Scheduling", "Assignments"] }],
    permissions: ["staff:read", "staff:create"],
    reportsTo: ["HR Department"],
    canManage: ["Staff"]
  },
  {
    id: 16, name: "F.2 Department", color: "#10B981", icon: "🏛️", count: 3, desc: "Department operations",
    description: "Department-level operations",
    modules: [{ name: "Dept Ops", desc: "Department operations", submodules: ["Planning", "Execution"] }],
    permissions: ["dept:read", "dept:create"],
    reportsTo: ["Directors' Details"],
    canManage: ["Dept Staff"]
  },
  {
    id: 17, name: "H.O. Details", color: "#10B981", icon: "🏪", count: 1, desc: "Head office details",
    description: "Head office information and management",
    modules: [{ name: "HO Management", desc: "Head office operations", submodules: ["Details", "Operations"] }],
    permissions: ["ho:read", "ho:update"],
    reportsTo: ["Directors' Details"],
    canManage: ["HO Staff"]
  },
  {
    id: 18, name: "GA & CS", color: "#EC4899", icon: "⚙️", count: 4, desc: "General admin & customer success",
    description: "General administration and customer success",
    modules: [{ name: "Admin & CS", desc: "Admin and customer success", submodules: ["Admin", "Support"] }],
    permissions: ["admin:read", "cs:read", "cs:create"],
    reportsTo: ["Directors' Details"],
    canManage: ["Admin Staff"]
  },
  {
    id: 19, name: "Customer", color: "#3B82F6", icon: "🛍️", count: 2, desc: "Customer account",
    description: "Customer account management",
    modules: [{ name: "Customer Account", desc: "Customer account operations", submodules: ["Profile", "Bookings"] }],
    permissions: ["customer:read", "booking:read"],
    reportsTo: ["System"],
    canManage: ["Self"]
  },
  {
    id: 20, name: "Admin", color: "#EF4444", icon: "🔐", count: 3, desc: "General administrator",
    description: "General system administration",
    modules: [{ name: "Administration", desc: "System administration", submodules: ["Users", "Config"] }],
    permissions: ["admin:read", "admin:create", "admin:update"],
    reportsTo: ["System"],
    canManage: ["System Users"]
  },
  {
    id: 21, name: "System Admin", color: "#EF4444", icon: "⚙️", count: 2, desc: "System administration",
    description: "Full system administration and control",
    modules: [{ name: "System Admin", desc: "Complete system administration", submodules: ["All Systems", "Database", "Servers"] }],
    permissions: ["*:read", "*:create", "*:update", "system:admin"],
    reportsTo: ["System"],
    canManage: ["All Admins"]
  },
];

function EditRoleModal({ visible, role, sw, onClose, onSave }) {
  const [description, setDescription] = useState(role?.description || "");
  const [enabledPermissions, setEnabledPermissions] = useState(role?.permissions ? new Set(role.permissions) : new Set());

  const togglePermission = (permission) => {
    const newSet = new Set(enabledPermissions);
    if (newSet.has(permission)) {
      newSet.delete(permission);
    } else {
      newSet.add(permission);
    }
    setEnabledPermissions(newSet);
  };

  if (!role) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" }}>
        <View style={{ backgroundColor: "#FFFFFF", borderTopLeftRadius: sw(24), borderTopRightRadius: sw(24), paddingHorizontal: sw(18), paddingTop: sw(18), paddingBottom: sw(24), maxHeight: "95%" }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(16) }}>
            <Text style={{ fontSize: sw(15), fontWeight: "800", color: COLORS.text }}>Edit {role.name}</Text>
            <TouchableOpacity onPress={onClose} style={{ width: sw(36), height: sw(36), borderRadius: sw(18), backgroundColor: COLORS.cardBg, alignItems: "center", justifyContent: "center" }}>
              <X size={sw(18)} color={COLORS.text} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: sw(16) }} nestedScrollEnabled={true}>
            
            {/* Description */}
            <View style={{ marginBottom: sw(14) }}>
              <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(6) }}>DESCRIPTION</Text>
              <View style={{ backgroundColor: `${role.color}15`, borderRadius: sw(10), borderWidth: 1, borderColor: `${role.color}30`, padding: sw(10) }}>
                <Text style={{ fontSize: sw(10), color: COLORS.text, lineHeight: sw(16) }}>{role.description}</Text>
              </View>
            </View>

            {/* Available Modules */}
            <View style={{ marginBottom: sw(14) }}>
              <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(8) }}>AVAILABLE MODULES</Text>
              {role.modules.map((mod, idx) => (
                <View key={idx} style={{ backgroundColor: `${role.color}10`, borderRadius: sw(10), borderWidth: 1, borderColor: `${role.color}30`, padding: sw(10), marginBottom: idx < role.modules.length - 1 ? sw(8) : 0 }}>
                  <Text style={{ fontSize: sw(10), fontWeight: "700", color: role.color, marginBottom: sw(4) }}>{mod.name}</Text>
                  <Text style={{ fontSize: sw(8), color: COLORS.textSecondary, marginBottom: sw(6) }}>{mod.desc}</Text>
                  <Text style={{ fontSize: sw(8), fontWeight: "600", color: COLORS.textLight, marginBottom: sw(4) }}>Sub-modules:</Text>
                  {mod.submodules.map((sub, sidx) => (
                    <Text key={sidx} style={{ fontSize: sw(8), color: role.color, marginLeft: sw(8), marginBottom: sidx < mod.submodules.length - 1 ? sw(2) : 0 }}>• {sub}</Text>
                  ))}
                </View>
              ))}
            </View>

            {/* Permissions */}
            <View style={{ marginBottom: sw(14) }}>
              <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(8) }}>PERMISSIONS</Text>
              <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(10), borderWidth: 1, borderColor: COLORS.border, overflow: "hidden" }}>
                {role.permissions.map((perm, idx) => {
                  const isEnabled = enabledPermissions.has(perm);
                  return (
                    <TouchableOpacity key={idx} onPress={() => togglePermission(perm)} style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: sw(10), paddingVertical: sw(8), borderBottomWidth: idx < role.permissions.length - 1 ? 1 : 0, borderBottomColor: COLORS.border, backgroundColor: isEnabled ? `${COLORS.success}08` : "transparent" }}>
                      <View style={{ width: sw(18), height: sw(18), borderRadius: sw(4), borderWidth: 2, borderColor: isEnabled ? COLORS.success : COLORS.border, backgroundColor: isEnabled ? COLORS.success : "transparent", alignItems: "center", justifyContent: "center" }}>
                        {isEnabled && <CheckCircle size={sw(12)} color="#FFFFFF" strokeWidth={3} />}
                      </View>
                      <Text style={{ fontSize: sw(9), color: COLORS.text, fontWeight: "600", marginLeft: sw(10), textDecorationLine: isEnabled ? "none" : "none" }}>{perm}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text style={{ fontSize: sw(7), color: COLORS.textLight, marginTop: sw(6), fontStyle: "italic" }}>Enabled: {enabledPermissions.size} / {role.permissions.length}</Text>
            </View>

            {/* Reporting Structure */}
            <View style={{ marginBottom: sw(14) }}>
              <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(8) }}>REPORTING STRUCTURE</Text>
              
              {/* Reports To */}
              <View style={{ backgroundColor: "#FEF3C7", borderRadius: sw(10), padding: sw(10), marginBottom: sw(8) }}>
                <Text style={{ fontSize: sw(8), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(6) }}>Reports To:</Text>
                {role.reportsTo.map((dept, idx) => (
                  <View key={idx} style={{ backgroundColor: "#FCD34D", paddingHorizontal: sw(8), paddingVertical: sw(4), borderRadius: sw(5), marginBottom: idx < role.reportsTo.length - 1 ? sw(4) : 0 }}>
                    <Text style={{ fontSize: sw(9), fontWeight: "600", color: "#92400E" }}>{dept}</Text>
                  </View>
                ))}
              </View>

              {/* Can Manage */}
              <View style={{ backgroundColor: "#D1FAE5", borderRadius: sw(10), padding: sw(10) }}>
                <Text style={{ fontSize: sw(8), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(6) }}>Can Manage:</Text>
                {role.canManage.map((staff, idx) => (
                  <Text key={idx} style={{ fontSize: sw(9), fontWeight: "600", color: COLORS.success, marginBottom: idx < role.canManage.length - 1 ? sw(4) : 0 }}>✓ {staff}</Text>
                ))}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={{ flexDirection: "row", gap: sw(10), marginTop: sw(16) }}>
              <TouchableOpacity onPress={onClose} style={{ flex: 1, borderWidth: 1, borderColor: COLORS.primary, borderRadius: sw(10), paddingVertical: sw(11), alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.primary }}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { onSave({ description, permissions: Array.from(enabledPermissions) }); onClose(); }} style={{ flex: 1, backgroundColor: COLORS.primary, borderRadius: sw(10), paddingVertical: sw(11), alignItems: "center", justifyContent: "center", flexDirection: "row", gap: sw(6) }}>
                <CheckCircle size={sw(12)} color="#FFFFFF" strokeWidth={2} />
                <Text style={{ fontSize: sw(10), fontWeight: "700", color: "#FFFFFF" }}>Save Role</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function RoleCard({ role, sw, onEdit }) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={{ marginBottom: sw(10) }}>
      <LinearGradient colors={[`${role.color}08`, `${role.color}02`]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: sw(12), overflow: "hidden" }}>
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: sw(12), padding: sw(11), borderWidth: 1, borderColor: COLORS.border }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: sw(9) }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(3), gap: sw(6) }}>
                <Text style={{ fontSize: sw(18) }}>{role.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.text }}>{role.name}</Text>
                  <Text style={{ fontSize: sw(7), color: COLORS.textLight, marginTop: sw(1) }}>{role.desc}</Text>
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: `${role.color}20`, paddingHorizontal: sw(7), paddingVertical: sw(3), borderRadius: sw(5) }}>
              <Text style={{ fontSize: sw(8), fontWeight: "700", color: role.color }}>{role.count}</Text>
            </View>
          </View>
          
          <TouchableOpacity onPress={() => onEdit(role)} style={{ backgroundColor: `${COLORS.primary}10`, borderRadius: sw(7), paddingVertical: sw(7), alignItems: "center", justifyContent: "center", flexDirection: "row", gap: sw(5) }}>
            <Edit3 size={sw(11)} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.primary }}>Edit Role</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function RoleManagement({ onBack }) {
  const { sw } = useScale();
  const nav = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const filteredRoles = ROLES_DATA.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (role) => {
    setSelectedRole(role);
    setEditModalVisible(true);
  };

  const handleSave = (data) => {
    console.log("Saved:", data);
    alert(`✓ Saved ${selectedRole?.name}\n✓ Permissions: ${data.permissions.length}\n✓ All changes saved successfully!`);
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
            <Text style={{ color: "#FFFFFF", fontSize: sw(14), fontWeight: "800" }}>Role Management</Text>
            <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: sw(8), textAlign: "center", marginTop: sw(1) }}>Manage system roles and permissions</Text>
          </View>
          <TouchableOpacity style={{ width: sw(38), height: sw(38), borderRadius: sw(19), backgroundColor: "rgba(255,255,255,0.25)", alignItems: "center", justifyContent: "center" }}>
            <Plus size={sw(20)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: "#FFFFFF", borderRadius: sw(10), flexDirection: "row", alignItems: "center", paddingHorizontal: sw(12) }}>
          <Search size={sw(16)} color={COLORS.primary} strokeWidth={2} />
          <TextInput
            placeholder="Search roles..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ flex: 1, paddingVertical: sw(10), paddingHorizontal: sw(10), color: COLORS.text, fontSize: sw(10) }}
          />
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: sw(14), paddingTop: sw(14), paddingBottom: sw(100) }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: sw(8), marginBottom: sw(14) }}>
          <View style={{ flex: 1, backgroundColor: "#E0F1FF", borderRadius: sw(10), padding: sw(10), alignItems: "center" }}>
            <Text style={{ fontSize: sw(8), color: COLORS.info, fontWeight: "600" }}>Total Roles</Text>
            <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.info, marginTop: sw(2) }}>21</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#FEF3C7", borderRadius: sw(10), padding: sw(10), alignItems: "center" }}>
            <Text style={{ fontSize: sw(8), color: COLORS.warning, fontWeight: "600" }}>Users</Text>
            <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.warning, marginTop: sw(2) }}>85</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#D1FAE5", borderRadius: sw(10), padding: sw(10), alignItems: "center" }}>
            <Text style={{ fontSize: sw(8), color: COLORS.success, fontWeight: "600" }}>Active</Text>
            <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.success, marginTop: sw(2) }}>18</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(10) }}>
          <Text style={{ fontSize: sw(11), fontWeight: "800", color: COLORS.text }}>All Roles ({filteredRoles.length})</Text>
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          {filteredRoles.map((role) => (
            <View key={role.id} style={{ width: "48%", marginBottom: sw(8) }}>
              <RoleCard role={role} sw={sw} onEdit={handleEdit} />
            </View>
          ))}
        </View>

        {filteredRoles.length === 0 && (
          <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: sw(40) }}>
            <Text style={{ fontSize: sw(12), color: COLORS.textLight, fontWeight: "500" }}>No roles found</Text>
          </View>
        )}
      </ScrollView>

      <EditRoleModal visible={editModalVisible} role={selectedRole} sw={sw} onClose={() => setEditModalVisible(false)} onSave={handleSave} />
    </View>
  );
}
