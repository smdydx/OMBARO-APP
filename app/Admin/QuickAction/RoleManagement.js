import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, X, Edit3, CheckCircle, Plus, Search, ChevronRight } from "lucide-react-native";
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
  { id: 1, name: "Accounts Department", color: "#8B5CF6", icon: "💜", count: 1, desc: "Financial accounting and bookkeeping" },
  { id: 2, name: "Legal Department", color: "#8B5CF6", icon: "⚖️", count: 2, desc: "Legal affairs and compliance" },
  { id: 3, name: "Vendor List Management", color: "#8B5CF6", icon: "🔗", count: 3, desc: "Vendor database management" },
  { id: 4, name: "IT Department", color: "#8B5CF6", icon: "💻", count: 5, desc: "Technology and infrastructure" },
  { id: 5, name: "Corporate Office Details", color: "#8B5CF6", icon: "🏢", count: 7, desc: "Corporate operations" },
  { id: 6, name: "Directors' Details", color: "#8B5CF6", icon: "👔", count: 8, desc: "Executive management" },
  { id: 7, name: "Employee", color: "#8B5CF6", icon: "👤", count: 1, desc: "Employee management" },
  { id: 8, name: "Marketing Department", color: "#EC4899", icon: "📊", count: 6, desc: "Brand and customer acquisition" },
  { id: 9, name: "Customer Care", color: "#EC4899", icon: "💬", count: 4, desc: "Customer support services" },
  { id: 10, name: "Customer Data Management", color: "#EC4899", icon: "📋", count: 2, desc: "Customer analytics" },
  { id: 11, name: "Command Power - Super Admin", color: "#EC4899", icon: "⚡", count: 8, desc: "Ultimate system control" },
  { id: 12, name: "Finance Department", color: "#F59E0B", icon: "💰", count: 8, desc: "Financial planning" },
  { id: 13, name: "Advocate", color: "#F59E0B", icon: "📄", count: 1, desc: "Legal representation" },
  { id: 14, name: "HR Department", color: "#3B82F6", icon: "👥", count: 5, desc: "Human resources" },
  { id: 15, name: "Staff Department", color: "#10B981", icon: "👫", count: 8, desc: "Staff management" },
  { id: 16, name: "F.2 Department", color: "#10B981", icon: "🏛️", count: 3, desc: "Department operations" },
  { id: 17, name: "H.O. Details", color: "#10B981", icon: "🏪", count: 1, desc: "Head office details" },
  { id: 18, name: "GA & CS", color: "#EC4899", icon: "⚙️", count: 4, desc: "General admin & customer success" },
  { id: 19, name: "Customer", color: "#3B82F6", icon: "🛍️", count: 2, desc: "Customer account" },
  { id: 20, name: "Admin", color: "#EF4444", icon: "🔐", count: 3, desc: "General administrator" },
  { id: 21, name: "System Admin", color: "#EF4444", icon: "⚙️", count: 2, desc: "System administration" },
];

function EditRoleModal({ visible, role, sw, onClose, onSave }) {
  const [description, setDescription] = useState(role?.desc || "");

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" }}>
        <View style={{ backgroundColor: "#FFFFFF", borderTopLeftRadius: sw(24), borderTopRightRadius: sw(24), paddingHorizontal: sw(20), paddingTop: sw(20), paddingBottom: sw(30), maxHeight: "90%" }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(18) }}>
            <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text }}>Edit {role?.name}</Text>
            <TouchableOpacity onPress={onClose} style={{ width: sw(36), height: sw(36), borderRadius: sw(18), backgroundColor: COLORS.cardBg, alignItems: "center", justifyContent: "center" }}>
              <X size={sw(18)} color={COLORS.text} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: sw(20) }}>
            <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(6) }}>ROLE ICON</Text>
            <View style={{ backgroundColor: `${role?.color}15`, borderRadius: sw(12), padding: sw(14), marginBottom: sw(16), alignItems: "center" }}>
              <Text style={{ fontSize: sw(40) }}>{role?.icon}</Text>
            </View>

            <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(6) }}>DESCRIPTION</Text>
            <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(10), borderWidth: 1, borderColor: COLORS.border, padding: sw(12), marginBottom: sw(16), minHeight: sw(80) }}>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Enter role description"
                placeholderTextColor={COLORS.textLight}
                multiline
                style={{ fontSize: sw(10), color: COLORS.text, fontFamily: "System" }}
              />
            </View>

            <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.textLight, marginBottom: sw(8) }}>PERMISSIONS</Text>
            <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(10), padding: sw(12), marginBottom: sw(16) }}>
              {["read", "write", "delete", "admin"].map((perm, idx) => (
                <View key={idx} style={{ flexDirection: "row", alignItems: "center", paddingVertical: sw(8), borderBottomWidth: idx < 3 ? 1 : 0, borderBottomColor: COLORS.border }}>
                  <TouchableOpacity style={{ width: sw(18), height: sw(18), borderRadius: sw(4), borderWidth: 2, borderColor: COLORS.primary, marginRight: sw(10), alignItems: "center", justifyContent: "center" }}>
                    <CheckCircle size={sw(14)} color={COLORS.primary} strokeWidth={2} />
                  </TouchableOpacity>
                  <Text style={{ fontSize: sw(9), fontWeight: "600", color: COLORS.text, textTransform: "capitalize" }}>{perm}</Text>
                </View>
              ))}
            </View>

            <View style={{ flexDirection: "row", gap: sw(10) }}>
              <TouchableOpacity onPress={onClose} style={{ flex: 1, borderWidth: 1, borderColor: COLORS.primary, borderRadius: sw(10), paddingVertical: sw(12), alignItems: "center" }}>
                <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.primary }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { onSave(description); onClose(); }} style={{ flex: 1, backgroundColor: COLORS.primary, borderRadius: sw(10), paddingVertical: sw(12), alignItems: "center" }}>
                <Text style={{ fontSize: sw(10), fontWeight: "700", color: "#FFFFFF" }}>Save Changes</Text>
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
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: sw(12), padding: sw(12), borderWidth: 1, borderColor: COLORS.border }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: sw(10) }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(4), gap: sw(6) }}>
                <Text style={{ fontSize: sw(18) }}>{role.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.text }}>{role.name}</Text>
                  <Text style={{ fontSize: sw(7), color: COLORS.textLight, marginTop: sw(2) }}>{role.desc}</Text>
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: `${role.color}20`, paddingHorizontal: sw(8), paddingVertical: sw(4), borderRadius: sw(6) }}>
              <Text style={{ fontSize: sw(9), fontWeight: "700", color: role.color }}>{role.count}</Text>
            </View>
          </View>
          
          <TouchableOpacity onPress={() => onEdit(role)} style={{ backgroundColor: `${COLORS.primary}10`, borderRadius: sw(8), paddingVertical: sw(8), alignItems: "center", justifyContent: "center", flexDirection: "row", gap: sw(6) }}>
            <Edit3 size={sw(12)} color={COLORS.primary} strokeWidth={2.5} />
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

  const handleSave = (desc) => {
    console.log("Saved:", desc);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} translucent={false} />
      
      <LinearGradient colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ paddingTop: Platform.OS === 'ios' ? sw(50) : sw(40), paddingBottom: sw(18), paddingHorizontal: sw(20) }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(14) }}>
          <TouchableOpacity onPress={() => onBack ? onBack() : nav.goBack()} style={{ width: sw(38), height: sw(38), borderRadius: sw(19), backgroundColor: "rgba(255,255,255,0.25)", alignItems: "center", justifyContent: "center" }}>
            <ArrowLeft size={sw(20)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <View>
            <Text style={{ color: "#FFFFFF", fontSize: sw(15), fontWeight: "800" }}>Role Management</Text>
            <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: sw(8), textAlign: "center", marginTop: sw(2) }}>Manage system roles and permissions</Text>
          </View>
          <TouchableOpacity style={{ width: sw(38), height: sw(38), borderRadius: sw(19), backgroundColor: "rgba(255,255,255,0.25)", alignItems: "center", justifyContent: "center" }}>
            <Plus size={sw(20)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: "#FFFFFF", borderRadius: sw(11), flexDirection: "row", alignItems: "center", paddingHorizontal: sw(12) }}>
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
          <TouchableOpacity style={{ backgroundColor: `${COLORS.primary}15`, paddingHorizontal: sw(8), paddingVertical: sw(4), borderRadius: sw(6) }}>
            <Text style={{ fontSize: sw(8), fontWeight: "700", color: COLORS.primary }}>Sort</Text>
          </TouchableOpacity>
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
