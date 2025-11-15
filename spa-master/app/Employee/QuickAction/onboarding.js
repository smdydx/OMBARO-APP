import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Users, CheckCircle, Clock, UserPlus } from "lucide-react-native";
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
};

function useScale() {
  const { width, height } = useWindowDimensions();
  const base = Math.min(width, 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw, width, height };
}

function OnboardingCard({ name, role, status, date, progress, sw }) {
  const statusConfig = {
    pending: { color: "#F59E0B", icon: Clock, label: "In Progress" },
    completed: { color: "#10B981", icon: CheckCircle, label: "Completed" },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const StatusIcon = config.icon;

  return (
    <TouchableOpacity style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(14),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(16),
      marginBottom: sw(12),
    }} activeOpacity={0.7}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(12) }}>
        <View style={{
          width: sw(48),
          height: sw(48),
          borderRadius: sw(24),
          backgroundColor: `${COLORS.primaryLight}15`,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Users size={sw(22)} color={COLORS.primary} strokeWidth={2.5} />
        </View>
        <View style={{ flex: 1, marginLeft: sw(12) }}>
          <Text style={{ fontSize: sw(15), fontWeight: "700", color: COLORS.text }}>{name}</Text>
          <Text style={{ fontSize: sw(12), color: COLORS.textSecondary, marginTop: sw(2) }}>{role}</Text>
        </View>
        <View style={{
          backgroundColor: `${config.color}15`,
          paddingHorizontal: sw(10),
          paddingVertical: sw(6),
          borderRadius: sw(12),
          flexDirection: "row",
          alignItems: "center",
        }}>
          <StatusIcon size={sw(13)} color={config.color} strokeWidth={2.5} />
          <Text style={{ color: config.color, fontSize: sw(11), marginLeft: sw(6), fontWeight: "700" }}>
            {config.label}
          </Text>
        </View>
      </View>

      <View style={{ gap: sw(8) }}>
        <Text style={{ fontSize: sw(12), color: COLORS.textLight }}>Start Date: {date}</Text>
        
        {status === "pending" && (
          <>
            <View style={{
              height: sw(6),
              backgroundColor: "#E5E7EB",
              borderRadius: sw(3),
              overflow: "hidden",
            }}>
              <View style={{
                width: `${progress}%`,
                height: sw(6),
                backgroundColor: COLORS.primaryLight,
                borderRadius: sw(3),
              }} />
            </View>
            <Text style={{ fontSize: sw(12), color: COLORS.textSecondary, fontWeight: "600" }}>
              Progress: {progress}%
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function Onboarding({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

  const employees = [
    { id: 1, name: "Anjali Desai", role: "Spa Therapist", status: "pending", date: "Jan 20, 2025", progress: 65 },
    { id: 2, name: "Vikram Singh", role: "Receptionist", status: "completed", date: "Jan 15, 2025", progress: 100 },
    { id: 3, name: "Meera Kapoor", role: "Beautician", status: "pending", date: "Jan 22, 2025", progress: 40 },
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
          height: headerHeight,
          paddingTop: Platform.OS === 'ios' ? sw(50) : sw(20),
          paddingHorizontal: sw(20),
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(20) }}>
          <TouchableOpacity 
            onPress={() => onBack ? onBack() : nav.goBack()} 
            style={{
              width: sw(42),
              height: sw(42),
              borderRadius: sw(21),
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowLeft size={sw(20)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center", marginRight: sw(42) }}>
            <Text style={{ color: "#FFFFFF", fontSize: sw(20), fontWeight: "800",marginTop:sw(50)  }}>Onboarding</Text>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(12), marginTop: sw(2) }}>
              New Employee Management
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: sw(10) }}>
          <TouchableOpacity style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: sw(14),
            paddingVertical: sw(12),
            paddingHorizontal: sw(16),
          }}>
            <UserPlus size={sw(18)} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={{ fontSize: sw(13), color: COLORS.primary, fontWeight: "700", marginLeft: sw(8) }}>
              Add New Employee
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={{ 
        height: contentHeight,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: sw(30),
        borderTopRightRadius: sw(30),
      }}>
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: sw(24), paddingHorizontal: sw(20), paddingBottom: sw(150) }} 
          showsVerticalScrollIndicator={false}
        >
          {employees.map((employee) => (
            <OnboardingCard key={employee.id} {...employee} sw={sw} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
