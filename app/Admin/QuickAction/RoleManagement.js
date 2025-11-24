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
  { id: 1, name: "Accounts Department", color: "#8B5CF6", icon: "💜", count: 1, desc: "Financial accounting and bookkeeping", description: "Financial accounting and bookkeeping operations", modules: [{ name: "Financial Management", desc: "Financial operations and reporting", submodules: ["Accounting", "Payment Processing", "Budget Management"] }], permissions: ["accounts:read", "accounts:create", "accounts:update", "invoices:create", "payments:read"], reportsTo: ["Finance Department", "Directors' Details"], canManage: ["Accounting Staff"] },
  { id: 2, name: "Legal Department", color: "#8B5CF6", icon: "⚖️", count: 2, desc: "Legal affairs and compliance", description: "Legal affairs and compliance management", modules: [{ name: "Legal Documentation", desc: "Legal documents and compliance", submodules: ["Contracts", "Policies"] }], permissions: ["legal:read", "legal:create", "compliance:read"], reportsTo: ["Finance Department"], canManage: ["Legal Staff"] },
  { id: 3, name: "Vendor List Management", color: "#8B5CF6", icon: "🔗", count: 3, desc: "Vendor database management", description: "Vendor database and relationship management", modules: [{ name: "Vendor Management", desc: "Vendor operations and relationships", submodules: ["Database", "Relations"] }], permissions: ["vendor:read", "vendor:create", "vendor:update"], reportsTo: ["Finance Department"], canManage: ["Vendor Staff"] },
  { id: 4, name: "IT Department", color: "#8B5CF6", icon: "💻", count: 5, desc: "Technology and infrastructure", description: "Technology infrastructure and support", modules: [{ name: "Systems Management", desc: "IT systems and infrastructure", submodules: ["Infrastructure", "Support", "Security"] }], permissions: ["it:read", "it:create", "systems:read"], reportsTo: ["Directors' Details"], canManage: ["IT Staff"] },
  { id: 5, name: "Corporate Office Details", color: "#8B5CF6", icon: "🏢", count: 7, desc: "Corporate operations", description: "Corporate office operations and management", modules: [{ name: "Operations", desc: "Corporate operations management", submodules: ["Admin", "Facilities"] }], permissions: ["corporate:read", "corporate:create"], reportsTo: ["Directors' Details"], canManage: ["Corporate Staff"] },
  { id: 6, name: "Directors' Details", color: "#8B5CF6", icon: "👔", count: 8, desc: "Executive management", description: "Board of directors and executive management", modules: [{ name: "Executive", desc: "Executive operations", submodules: ["Strategic", "Planning"] }], permissions: ["director:read", "director:create", "director:update"], reportsTo: ["Board"], canManage: ["All Departments"] },
  { id: 7, name: "Employee", color: "#8B5CF6", icon: "👤", count: 1, desc: "Employee management", description: "Employee management and operations", modules: [{ name: "Employee Management", desc: "Employee operations", submodules: ["Profile", "Records"] }], permissions: ["employee:read", "employee:update"], reportsTo: ["HR Department"], canManage: ["Self"] },
  { id: 8, name: "Marketing Department", color: "#EC4899", icon: "📊", count: 6, desc: "Brand and customer acquisition", description: "Brand promotion and customer acquisition", modules: [{ name: "Marketing", desc: "Marketing campaigns and analytics", submodules: ["Campaigns", "Analytics", "Communications"] }], permissions: ["marketing:read", "campaigns:create", "analytics:read"], reportsTo: ["Directors' Details"], canManage: ["Marketing Staff"] },
  { id: 9, name: "Customer Care", color: "#EC4899", icon: "💬", count: 4, desc: "Customer support services", description: "Customer support and service operations", modules: [{ name: "Customer Support", desc: "Customer care and support", submodules: ["Support", "Feedback", "Issues"] }], permissions: ["customer:read", "support:create"], reportsTo: ["Marketing Department"], canManage: ["Support Staff"] },
  { id: 10, name: "Customer Data Management", color: "#EC4899", icon: "📋", count: 2, desc: "Customer analytics", description: "Customer information and analytics management", modules: [{ name: "Data Management", desc: "Customer data and analytics", submodules: ["Data", "Analytics", "Reporting"] }], permissions: ["data:read", "analytics:read"], reportsTo: ["Marketing Department"], canManage: ["Data Analysts"] },
  { id: 11, name: "Command Power - Super Admin", color: "#EC4899", icon: "⚡", count: 8, desc: "Ultimate system control", description: "Ultimate system control and administration", modules: [{ name: "System Control", desc: "Full system administration", submodules: ["All Modules", "Users", "Settings"] }], permissions: ["*:read", "*:create", "*:update", "*:delete", "admin:full"], reportsTo: ["System"], canManage: ["All Users"] },
  { id: 12, name: "Finance Department", color: "#F59E0B", icon: "💰", count: 8, desc: "Financial planning", description: "Financial planning and analysis", modules: [{ name: "Finance", desc: "Financial planning and reporting", submodules: ["Budget", "Reports", "Analysis"] }], permissions: ["finance:read", "finance:create", "budget:read"], reportsTo: ["Directors' Details"], canManage: ["Finance Staff"] },
  { id: 13, name: "Advocate", color: "#F59E0B", icon: "📄", count: 1, desc: "Legal representation", description: "Legal advocacy and representation", modules: [{ name: "Advocacy", desc: "Legal representation", submodules: ["Cases", "Documentation"] }], permissions: ["advocacy:read", "advocacy:create"], reportsTo: ["Legal Department"], canManage: ["Legal Staff"] },
  { id: 14, name: "HR Department", color: "#3B82F6", icon: "👥", count: 5, desc: "Human resources", description: "Human resources and employee management", modules: [{ name: "HR Management", desc: "HR operations and management", submodules: ["Recruitment", "Payroll", "Benefits"] }], permissions: ["hr:read", "hr:create", "payroll:read"], reportsTo: ["Directors' Details"], canManage: ["HR Staff"] },
  { id: 15, name: "Staff Department", color: "#10B981", icon: "👫", count: 8, desc: "Staff management", description: "Staff management and operations", modules: [{ name: "Staff Ops", desc: "Staff operations", submodules: ["Scheduling", "Assignments"] }], permissions: ["staff:read", "staff:create"], reportsTo: ["HR Department"], canManage: ["Staff"] },
  { id: 16, name: "F.2 Department", color: "#10B981", icon: "🏛️", count: 3, desc: "Department operations", description: "Department-level operations", modules: [{ name: "Dept Ops", desc: "Department operations", submodules: ["Planning", "Execution"] }], permissions: ["dept:read", "dept:create"], reportsTo: ["Directors' Details"], canManage: ["Dept Staff"] },
  { id: 17, name: "H.O. Details", color: "#10B981", icon: "🏪", count: 1, desc: "Head office details", description: "Head office information and management", modules: [{ name: "HO Management", desc: "Head office operations", submodules: ["Details", "Operations"] }], permissions: ["ho:read", "ho:update"], reportsTo: ["Directors' Details"], canManage: ["HO Staff"] },
  { id: 18, name: "GA & CS", color: "#EC4899", icon: "⚙️", count: 4, desc: "General admin & customer success", description: "General administration and customer success", modules: [{ name: "Admin & CS", desc: "Admin and customer success", submodules: ["Admin", "Support"] }], permissions: ["admin:read", "cs:read", "cs:create"], reportsTo: ["Directors' Details"], canManage: ["Admin Staff"] },
  { id: 19, name: "Customer", color: "#3B82F6", icon: "🛍️", count: 2, desc: "Customer account", description: "Customer account management", modules: [{ name: "Customer Account", desc: "Customer account operations", submodules: ["Profile", "Bookings"] }], permissions: ["customer:read", "booking:read"], reportsTo: ["System"], canManage: ["Self"] },
  { id: 20, name: "Admin", color: "#EF4444", icon: "🔐", count: 3, desc: "General administrator", description: "General system administration", modules: [{ name: "Administration", desc: "System administration", submodules: ["Users", "Config"] }], permissions: ["admin:read", "admin:create", "admin:update"], reportsTo: ["System"], canManage: ["System Users"] },
  { id: 21, name: "System Admin", color: "#EF4444", icon: "⚙️", count: 2, desc: "System administration", description: "Full system administration and control", modules: [{ name: "System Admin", desc: "Complete system administration", submodules: ["All Systems", "Database", "Servers"] }], permissions: ["*:read", "*:create", "*:update", "system:admin"], reportsTo: ["System"], canManage: ["All Admins"] },
];

function EditRoleModal({ visible, role, sw, onClose, onSave }) {
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
            <Text style={{ fontSize: sw(15), fontWeight: "800", color: COLORS.text }}>{role.icon} {role.name}</Text>
            <TouchableOpacity onPress={onClose} style={{ width: sw(36), height: sw(36), borderRadius: sw(18), backgroundColor: COLORS.cardBg, alignItems: "center", justifyContent: "center" }}>
              <X size={sw(18)} color={COLORS.text} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: sw(16) }} nestedScrollEnabled={true}>
            <View style={{ marginBottom: sw(14) }}>
              <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(6) }}>DESCRIPTION</Text>
              <View style={{ backgroundColor: `${role.color}15`, borderRadius: sw(10), borderWidth: 1, borderColor: `${role.color}30`, padding: sw(10) }}>
                <Text style={{ fontSize: sw(10), color: COLORS.text, lineHeight: sw(16) }}>{role.description}</Text>
              </View>
            </View>

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
                      <Text style={{ fontSize: sw(9), color: COLORS.text, fontWeight: "600", marginLeft: sw(10) }}>{perm}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text style={{ fontSize: sw(7), color: COLORS.textLight, marginTop: sw(6), fontStyle: "italic" }}>Enabled: {enabledPermissions.size} / {role.permissions.length}</Text>
            </View>

            <View style={{ marginBottom: sw(14) }}>
              <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(8) }}>REPORTING STRUCTURE</Text>
              <View style={{ backgroundColor: "#FEF3C7", borderRadius: sw(10), padding: sw(10), marginBottom: sw(8) }}>
                <Text style={{ fontSize: sw(8), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(6) }}>Reports To:</Text>
                {role.reportsTo.map((dept, idx) => (
                  <View key={idx} style={{ backgroundColor: "#FCD34D", paddingHorizontal: sw(8), paddingVertical: sw(4), borderRadius: sw(5), marginBottom: idx < role.reportsTo.length - 1 ? sw(4) : 0 }}>
                    <Text style={{ fontSize: sw(9), fontWeight: "600", color: "#92400E" }}>{dept}</Text>
                  </View>
                ))}
              </View>
              <View style={{ backgroundColor: "#D1FAE5", borderRadius: sw(10), padding: sw(10) }}>
                <Text style={{ fontSize: sw(8), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(6) }}>Can Manage:</Text>
                {role.canManage.map((staff, idx) => (
                  <Text key={idx} style={{ fontSize: sw(9), fontWeight: "600", color: COLORS.success, marginBottom: idx < role.canManage.length - 1 ? sw(4) : 0 }}>✓ {staff}</Text>
                ))}
              </View>
            </View>

            <View style={{ flexDirection: "row", gap: sw(10), marginTop: sw(16) }}>
              <TouchableOpacity onPress={onClose} style={{ flex: 1, borderWidth: 1, borderColor: COLORS.primary, borderRadius: sw(10), paddingVertical: sw(11), alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.primary }}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { onSave({ permissions: Array.from(enabledPermissions) }); onClose(); }} style={{ flex: 1, backgroundColor: COLORS.primary, borderRadius: sw(10), paddingVertical: sw(11), alignItems: "center", justifyContent: "center", flexDirection: "row", gap: sw(6) }}>
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
    <TouchableOpacity activeOpacity={0.7} onPress={() => onEdit(role)}>
      <LinearGradient colors={[`${role.color}15`, `${role.color}08`]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: sw(16), overflow: "hidden", width: sw(280), height: sw(220) }}>
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: sw(16), padding: sw(14), borderWidth: 1, borderColor: COLORS.border, flex: 1, justifyContent: "space-between" }}>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(12) }}>
              <Text style={{ fontSize: sw(32) }}>{role.icon}</Text>
              <View style={{ backgroundColor: `${role.color}20`, paddingHorizontal: sw(10), paddingVertical: sw(5), borderRadius: sw(8) }}>
                <Text style={{ fontSize: sw(10), fontWeight: "700", color: role.color }}>{role.count} Users</Text>
              </View>
            </View>
            <Text style={{ fontSize: sw(12), fontWeight: "800", color: COLORS.text, marginBottom: sw(4) }}>{role.name}</Text>
            <Text style={{ fontSize: sw(8), color: COLORS.textLight, lineHeight: sw(12) }}>{role.desc}</Text>
          </View>
          
          <View style={{ flexDirection: "row", gap: sw(8) }}>
            <TouchableOpacity style={{ flex: 1, backgroundColor: `${role.color}15`, borderRadius: sw(10), paddingVertical: sw(8), alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: sw(9), fontWeight: "700", color: role.color }}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onEdit(role)} style={{ flex: 1, backgroundColor: COLORS.primary, borderRadius: sw(10), paddingVertical: sw(8), alignItems: "center", justifyContent: "center", flexDirection: "row", gap: sw(4) }}>
              <Edit3 size={sw(10)} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={{ fontSize: sw(9), fontWeight: "700", color: "#FFFFFF" }}>Edit</Text>
            </TouchableOpacity>
          </View>
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

  const departmentalRoles = ROLES_DATA.filter(r => ![11, 20, 21].includes(r.id)).length;
  const systemRoles = ROLES_DATA.filter(r => [11, 20, 21].includes(r.id)).length;

  const handleEdit = (role) => {
    setSelectedRole(role);
    setEditModalVisible(true);
  };

  const handleSave = (data) => {
    alert(`✓ Saved ${selectedRole?.name}\n✓ Permissions: ${data.permissions.length}`);
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
          </View>
          <TouchableOpacity style={{ width: sw(38), height: sw(38), borderRadius: sw(19), backgroundColor: "rgba(255,255,255,0.25)", alignItems: "center", justifyContent: "center" }}>
            <Plus size={sw(20)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: "#FFFFFF", borderRadius: sw(10), flexDirection: "row", alignItems: "center", paddingHorizontal: sw(12), marginBottom: sw(10) }}>
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

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: sw(14), paddingBottom: sw(20) }} showsVerticalScrollIndicator={false}>
        
        {/* Stats Cards */}
        <View style={{ flexDirection: "row", gap: sw(6), paddingHorizontal: sw(14), marginBottom: sw(16) }}>
          <View style={{ flex: 1, backgroundColor: "#E0F1FF", borderRadius: sw(10), padding: sw(8), alignItems: "center" }}>
            <Text style={{ fontSize: sw(7), color: COLORS.info, fontWeight: "600" }}>Total Roles</Text>
            <Text style={{ fontSize: sw(13), fontWeight: "800", color: COLORS.info, marginTop: sw(1) }}>21</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#FEF3C7", borderRadius: sw(10), padding: sw(8), alignItems: "center" }}>
            <Text style={{ fontSize: sw(7), color: COLORS.warning, fontWeight: "600" }}>Departmental</Text>
            <Text style={{ fontSize: sw(13), fontWeight: "800", color: COLORS.warning, marginTop: sw(1) }}>8</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#D1FAE5", borderRadius: sw(10), padding: sw(8), alignItems: "center" }}>
            <Text style={{ fontSize: sw(7), color: COLORS.success, fontWeight: "600" }}>System Roles</Text>
            <Text style={{ fontSize: sw(13), fontWeight: "800", color: COLORS.success, marginTop: sw(1) }}>4</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#FCE7F3", borderRadius: sw(10), padding: sw(8), alignItems: "center" }}>
            <Text style={{ fontSize: sw(7), color: "#EC4899", fontWeight: "600" }}>Modules</Text>
            <Text style={{ fontSize: sw(13), fontWeight: "800", color: "#EC4899", marginTop: sw(1) }}>8</Text>
          </View>
        </View>

        {/* Swipeable Roles */}
        <View style={{ marginBottom: sw(10) }}>
          <Text style={{ fontSize: sw(11), fontWeight: "800", color: COLORS.text, paddingHorizontal: sw(14), marginBottom: sw(10) }}>
            {searchQuery ? `Found ${filteredRoles.length} Roles` : "All Roles"}
          </Text>
          
          {filteredRoles.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: sw(14), gap: sw(10) }} scrollEventThrottle={16}>
              {filteredRoles.map((role) => (
                <RoleCard key={role.id} role={role} sw={sw} onEdit={handleEdit} />
              ))}
            </ScrollView>
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: sw(40), paddingHorizontal: sw(20) }}>
              <Text style={{ fontSize: sw(12), color: COLORS.textLight, fontWeight: "500" }}>No roles found</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <EditRoleModal visible={editModalVisible} role={selectedRole} sw={sw} onClose={() => setEditModalVisible(false)} onSave={handleSave} />
    </View>
  );
}
