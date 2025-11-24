import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Users, CheckCircle, Clock, UserPlus, Target, Briefcase } from "lucide-react-native";
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
};

function useScale() {
  const { width, height } = useWindowDimensions();
  const base = Math.min(width, 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw, width, height };
}

function OnboardingCard({ name, role, status, date, progress, sw }) {
  const statusConfig = {
    pending: { color: COLORS.warning, icon: Clock, label: "In Progress" },
    completed: { color: COLORS.success, icon: CheckCircle, label: "Completed" },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const StatusIcon = config.icon;

  return (
    <TouchableOpacity style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
      marginBottom: sw(10),
    }} activeOpacity={0.7}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(10) }}>
        <View style={{
          width: sw(40),
          height: sw(40),
          borderRadius: sw(20),
          backgroundColor: `${COLORS.primaryLight}15`,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Users size={sw(18)} color={COLORS.primary} strokeWidth={2.5} />
        </View>
        <View style={{ flex: 1, marginLeft: sw(10) }}>
          <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text }}>{name}</Text>
          <Text style={{ fontSize: sw(10), color: COLORS.textSecondary, marginTop: sw(1) }}>{role}</Text>
        </View>
        <View style={{
          backgroundColor: `${config.color}15`,
          paddingHorizontal: sw(8),
          paddingVertical: sw(5),
          borderRadius: sw(10),
          flexDirection: "row",
          alignItems: "center",
        }}>
          <StatusIcon size={sw(11)} color={config.color} strokeWidth={2.5} />
          <Text style={{ color: config.color, fontSize: sw(9), marginLeft: sw(4), fontWeight: "700" }}>
            {config.label}
          </Text>
        </View>
      </View>

      <View style={{
        height: sw(5),
        backgroundColor: "#E5E7EB",
        borderRadius: sw(2.5),
        overflow: "hidden",
        marginBottom: sw(6),
      }}>
        <View style={{
          width: `${progress}%`,
          height: sw(5),
          backgroundColor: COLORS.primaryLight,
          borderRadius: sw(2.5),
        }} />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: sw(9), color: COLORS.textLight }}>Start: {date}</Text>
        <Text style={{ fontSize: sw(10), fontWeight: "600", color: config.color }}>
          {progress}% Complete
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function TaskCard({ task, completed, sw }) {
  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: completed ? COLORS.success : COLORS.border,
      padding: sw(12),
      marginBottom: sw(8),
      flexDirection: "row",
      alignItems: "center",
      opacity: completed ? 0.6 : 1,
    }}>
      <TouchableOpacity style={{
        width: sw(24),
        height: sw(24),
        borderRadius: sw(12),
        borderWidth: 2,
        borderColor: completed ? COLORS.success : COLORS.border,
        backgroundColor: completed ? COLORS.success : "transparent",
        alignItems: "center",
        justifyContent: "center",
        marginRight: sw(10),
      }}>
        {completed && <CheckCircle size={sw(14)} color="#FFFFFF" strokeWidth={2.5} fill={COLORS.success} />}
      </TouchableOpacity>
      <Text style={{ fontSize: sw(12), fontWeight: completed ? "500" : "600", color: COLORS.text, flex: 1, textDecorationLine: completed ? "line-through" : "none" }}>
        {task}
      </Text>
    </View>
  );
}

export default function Onboarding({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();
  const [activeTab, setActiveTab] = useState("Employees");

  const employees = [
    { id: 1, name: "Anjali Desai", role: "Spa Therapist", status: "pending", date: "Jan 20, 2025", progress: 65 },
    { id: 2, name: "Vikram Singh", role: "Receptionist", status: "completed", date: "Jan 15, 2025", progress: 100 },
    { id: 3, name: "Meera Kapoor", role: "Beautician", status: "pending", date: "Jan 22, 2025", progress: 40 },
  ];

  const onboardingTasks = [
    { task: "Document Collection", completed: true },
    { task: "Background Verification", completed: true },
    { task: "System Access Setup", completed: true },
    { task: "Training Enrollment", completed: false },
    { task: "Certification Verification", completed: false },
    { task: "First Shift Assignment", completed: false },
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
            Onboarding
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: sw(10), textAlign: "center" }}>
            Manage new employee onboarding process
          </Text>
        </View>

        <View style={{
          backgroundColor: "rgba(255,255,255,0.15)",
          borderRadius: sw(12),
          padding: sw(4),
          flexDirection: "row",
          gap: sw(4),
        }}>
          {["Employees", "Checklist"].map((label) => (
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
          {activeTab === "Employees" && (
            <>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: sw(12) }}>
                <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text }}>
                  New Employees
                </Text>
                <TouchableOpacity style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: sw(8),
                  paddingHorizontal: sw(12),
                  paddingVertical: sw(6),
                  flexDirection: "row",
                  gap: sw(4),
                  alignItems: "center",
                }}>
                  <UserPlus size={sw(13)} color="#FFFFFF" strokeWidth={2.5} />
                  <Text style={{ fontSize: sw(10), fontWeight: "700", color: "#FFFFFF" }}>
                    Add Employee
                  </Text>
                </TouchableOpacity>
              </View>

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
                  <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.warning }}>2</Text>
                  <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginTop: sw(2) }}>In Progress</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.success }}>1</Text>
                  <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginTop: sw(2) }}>Completed</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.primary }}>3</Text>
                  <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginTop: sw(2) }}>Total</Text>
                </View>
              </View>

              {employees.map((emp, idx) => (
                <OnboardingCard key={idx} {...emp} sw={sw} />
              ))}
            </>
          )}

          {activeTab === "Checklist" && (
            <>
              <View style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: sw(12),
                borderWidth: 1,
                borderColor: COLORS.border,
                padding: sw(12),
                marginBottom: sw(16),
              }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: sw(8), marginBottom: sw(10) }}>
                  <Target size={sw(16)} color={COLORS.primary} strokeWidth={2.5} />
                  <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>Onboarding Checklist</Text>
                </View>
                <View style={{
                  height: sw(6),
                  backgroundColor: "#E5E7EB",
                  borderRadius: sw(3),
                  overflow: "hidden",
                  marginBottom: sw(6),
                }}>
                  <View style={{
                    width: "50%",
                    height: sw(6),
                    backgroundColor: COLORS.success,
                    borderRadius: sw(3),
                  }} />
                </View>
                <Text style={{ fontSize: sw(10), color: COLORS.textSecondary }}>
                  3 of 6 tasks completed (50%)
                </Text>
              </View>

              <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(10) }}>
                Standard Tasks
              </Text>
              {onboardingTasks.map((item, idx) => (
                <TaskCard key={idx} task={item.task} completed={item.completed} sw={sw} />
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
                <CheckCircle size={sw(16)} color="#FFFFFF" strokeWidth={2.5} />
                <Text style={{ fontSize: sw(12), fontWeight: "700", color: "#FFFFFF" }}>
                  Update Checklist
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
