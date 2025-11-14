import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

const COLORS = {
  bg: "#F6F7FB",
  surface: "#FFFFFF",
  text: "#0F172A",
  textMuted: "#6B7280",
  border: "rgba(2,6,23,0.08)",
  divider: "rgba(2,6,23,0.06)",
  purple: "#7C3AED",
  pink: "#EC4899",
  blue: "#2563EB",
  gradient1: "#A855F7",
  gradient2: "#EC4899",
  cardShadow: "rgba(0,0,0,0.1)",
};

/* --- Responsive helper --- */
function useScale() {
  const { width } = useWindowDimensions();
  const base = Math.min(Math.max(width, 320), 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw };
}

/* --- Small field item --- */
function InfoField({ icon, label, value, sw }) {
  return (
    <View style={{ marginBottom: sw(10) }}>
      <Text style={{ color: COLORS.textMuted, fontSize: sw(13), marginBottom: sw(4) }}>
        {label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F9FAFB",
          borderWidth: 1,
          borderColor: COLORS.border,
          borderRadius: sw(12),
          paddingVertical: sw(10),
          paddingHorizontal: sw(12),
        }}
      >
        <Text style={{ fontSize: sw(16), marginRight: sw(8) }}>{icon}</Text>
        <Text style={{ color: COLORS.text, fontSize: sw(15), flexShrink: 1 }}>{value}</Text>
      </View>
    </View>
  );
}

/* --- Card container --- */
function SectionCard({ title, children, sw }) {
  return (
    <View
      style={[
        styles.card,
        {
          borderRadius: sw(16),
          padding: sw(16),
          marginBottom: sw(18),
        },
      ]}
    >
      <Text style={{ color: COLORS.text, fontWeight: "800", fontSize: sw(17), marginBottom: sw(12) }}>
        {title}
      </Text>
      {children}
    </View>
  );
}

/* --- Main screen --- */
export default function MyProfile({ onBack, onEdit }) {
  const { sw } = useScale();

  const navigation = useNavigation();

  // dummy data (replace with API / props)
  const profile = {
    name: "Rahul Kumar",
    designation: "Field Operations Manager",
    id: "EMP001",
    email: "rahul.kumar@ombaro.com",
    phone: "+91 98765 43210",
    address: "Bangalore, Karnataka",
    department: "Operations",
    joiningDate: "2024-01-15",
    emergencyPhone: "+91 98765 00000",
    bloodGroup: "O+",
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{ padding: sw(16), paddingBottom: sw(24),paddingTop:40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(10) }}>
          <Pressable
            onPress={()=>navigation.goBack()}
            hitSlop={12}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1, marginRight: sw(6) }]}
          >
            <Text style={{ color: COLORS.textMuted, fontSize: sw(16) }}>← Back</Text>
          </Pressable>
          <Text style={{ flex: 1, textAlign: "center", color: COLORS.text, fontWeight: "900", fontSize: sw(20) }}>
            My Profile
          </Text>
          <Pressable
            onPress={onEdit}
            hitSlop={12}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <View
              style={{
                backgroundColor: "#F3E8FF",
                padding: sw(8),
                borderRadius: sw(12),
              }}
            >
              <Text style={{ fontSize: sw(16) }}>✎</Text>
            </View>
          </Pressable>
        </View>

        {/* Gradient profile card */}
        <LinearGradient
          colors={[COLORS.gradient1, COLORS.gradient2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: sw(18),
            paddingVertical: sw(24),
            alignItems: "center",
            marginBottom: sw(18),
          }}
        >
          <View
            style={{
              width: sw(80),
              height: sw(80),
              borderRadius: sw(40),
              backgroundColor: "rgba(255,255,255,0.15)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: sw(12),
            }}
          >
            <Text style={{ fontSize: sw(36), color: "#fff" }}>👤</Text>
          </View>
          <Text style={{ color: "#fff", fontWeight: "800", fontSize: sw(20) }}>{profile.name}</Text>
          <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(15), marginTop: sw(4) }}>
            {profile.designation}
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: sw(13), marginTop: sw(2) }}>
            ID: {profile.id}
          </Text>
        </LinearGradient>

        {/* Personal info */}
        <SectionCard title="Personal Information" sw={sw}>
          <InfoField icon="👤" label="Full Name" value={profile.name} sw={sw} />
          <InfoField icon="📧" label="Email" value={profile.email} sw={sw} />
          <InfoField icon="📞" label="Phone" value={profile.phone} sw={sw} />
          <InfoField icon="📍" label="Address" value={profile.address} sw={sw} />
        </SectionCard>

        {/* Work info */}
        <SectionCard title="Work Information" sw={sw}>
          <InfoField icon="🆔" label="Employee ID" value={profile.id} sw={sw} />
          <InfoField icon="🏢" label="Department" value={profile.department} sw={sw} />
          <InfoField icon="💼" label="Designation" value={profile.designation} sw={sw} />
          <InfoField icon="📅" label="Joining Date" value={profile.joiningDate} sw={sw} />
        </SectionCard>

        {/* Emergency info */}
        <SectionCard title="Emergency Details" sw={sw}>
          <InfoField icon="📞" label="Emergency Contact" value={profile.emergencyPhone} sw={sw} />
          <InfoField icon="🩸" label="Blood Group" value={profile.bloodGroup} sw={sw} />
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}

/* --- Styles --- */
const shadowStyle =
  Platform.OS === "ios"
    ? { shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } }
    : { elevation: 2 };

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
  },
});
