import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, User, Mail, Phone, MapPin, Briefcase, Calendar, Award, Heart, FileText, MoreVertical, Star, TrendingUp, LogOut } from "lucide-react-native";
import { useState } from "react";
import {
    Platform,
    StatusBar,
    Text,
    useWindowDimensions,
    View,
    TouchableOpacity,
    ScrollView,
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
  const { width, height } = useWindowDimensions();
  const base = Math.min(width, 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw, width, height };
}

function InfoRow({ icon: Icon, label, value, sw }) {
  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: sw(10),
    }}>
      <View style={{ 
        width: sw(36), 
        height: sw(36), 
        borderRadius: sw(10), 
        backgroundColor: `${COLORS.primaryLight}15`,
        alignItems: "center",
        justifyContent: "center",
        marginRight: sw(10)
      }}>
        <Icon size={sw(16)} color={COLORS.primary} strokeWidth={2.5} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ 
          color: COLORS.textLight, 
          fontSize: sw(9), 
          marginBottom: sw(2),
          fontWeight: "500",
          letterSpacing: 0.3,
        }}>
          {label}
        </Text>
        <Text style={{ 
          color: COLORS.text, 
          fontSize: sw(12), 
          fontWeight: "700", 
        }}>
          {value}
        </Text>
      </View>
    </View>
  );
}

function TabButton({ label, icon: Icon, active, onPress, sw }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        paddingVertical: sw(12),
        alignItems: "center",
        borderRadius: sw(12),
        backgroundColor: active ? "#FFFFFF" : "transparent",
        borderBottomWidth: active ? 3 : 0,
        borderBottomColor: active ? COLORS.primary : "transparent",
      }}
    >
      <Icon size={sw(16)} color={active ? COLORS.primary : "rgba(255,255,255,0.8)"} strokeWidth={2.5} />
      <Text style={{
        fontSize: sw(9),
        fontWeight: active ? "700" : "600",
        color: active ? COLORS.primary : "rgba(255,255,255,0.8)",
        marginTop: sw(3),
      }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function StatCard({ icon: Icon, value, label, color, sw }) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(10),
      alignItems: "center",
      marginHorizontal: sw(4),
    }}>
      <View style={{
        backgroundColor: `${color}15`,
        width: sw(32),
        height: sw(32),
        borderRadius: sw(10),
        alignItems: "center",
        justifyContent: "center",
        marginBottom: sw(6),
      }}>
        <Icon size={sw(14)} color={color} strokeWidth={2.5} />
      </View>
      <Text style={{ fontSize: sw(14), fontWeight: "800", color: color }}>
        {value}
      </Text>
      <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginTop: sw(3), textAlign: "center" }}>
        {label}
      </Text>
    </View>
  );
}

function SectionCard({ title, children, sw }) {
  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      padding: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      marginBottom: sw(12),
    }}>
      {title && (
        <Text style={{
          fontSize: sw(12),
          fontWeight: "700",
          color: COLORS.text,
          marginBottom: sw(10),
          paddingBottom: sw(10),
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
        }}>
          {title}
        </Text>
      )}
      {children}
    </View>
  );
}

export default function MyProfile({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();
  const [activeTab, setActiveTab] = useState("personal");

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
            marginBottom: sw(16),
          }}
        >
          <ArrowLeft size={sw(22)} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>

        {/* Profile Section */}
        <View style={{ alignItems: "center", marginBottom: sw(16) }}>
          <View style={{
            width: sw(80),
            height: sw(80),
            borderRadius: sw(40),
            backgroundColor: "rgba(255,255,255,0.25)",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: "rgba(255,255,255,0.4)",
            marginBottom: sw(12),
          }}>
            <User size={sw(40)} color="#FFFFFF" strokeWidth={2} />
          </View>
          <Text style={{ 
            color: "#FFFFFF", 
            fontSize: sw(16), 
            fontWeight: "800",
          }}>
            Rahul Kumar
          </Text>
          <Text style={{ 
            color: "rgba(255,255,255,0.95)", 
            fontSize: sw(11),
            marginTop: sw(4),
          }}>
            Spa Manager • Operations
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={{ flexDirection: "row", gap: sw(6), marginBottom: sw(2) }}>
          <StatCard icon={Award} value="4.8" label="Rating" color={COLORS.warning} sw={sw} />
          <StatCard icon={Heart} value="2" label="Years" color={COLORS.success} sw={sw} />
          <StatCard icon={TrendingUp} value="95%" label="Performance" color={COLORS.primary} sw={sw} />
        </View>

        {/* Tabs */}
        <View style={{
          backgroundColor: "rgba(255,255,255,0.15)",
          borderRadius: sw(12),
          padding: sw(4),
          flexDirection: "row",
          gap: sw(2),
        }}>
          <TabButton label="Personal" icon={User} active={activeTab === "personal"} onPress={() => setActiveTab("personal")} sw={sw} />
          <TabButton label="Work" icon={Briefcase} active={activeTab === "work"} onPress={() => setActiveTab("work")} sw={sw} />
          <TabButton label="Documents" icon={FileText} active={activeTab === "documents"} onPress={() => setActiveTab("documents")} sw={sw} />
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
          style={{ flex: 1 }}
          contentContainerStyle={{ 
            paddingTop: sw(16), 
            paddingHorizontal: sw(16), 
            paddingBottom: sw(120) 
          }} 
          showsVerticalScrollIndicator={false}
        >
          {activeTab === "personal" && (
            <>
              <SectionCard title="Contact Information" sw={sw}>
                <InfoRow icon={Mail} label="EMAIL" value="rahul.kumar@spa.com" sw={sw} />
                <View style={{ height: 1, backgroundColor: COLORS.border, marginVertical: sw(8) }} />
                <InfoRow icon={Phone} label="PHONE" value="+91 98765 43210" sw={sw} />
                <View style={{ height: 1, backgroundColor: COLORS.border, marginVertical: sw(8) }} />
                <InfoRow icon={MapPin} label="LOCATION" value="Mumbai, Maharashtra" sw={sw} />
              </SectionCard>

              <SectionCard title="Emergency Contact" sw={sw}>
                <InfoRow icon={User} label="NAME" value="Priya Kumar" sw={sw} />
                <View style={{ height: 1, backgroundColor: COLORS.border, marginVertical: sw(8) }} />
                <InfoRow icon={Phone} label="PHONE" value="+91 99876 54321" sw={sw} />
              </SectionCard>

              <TouchableOpacity style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
                borderRadius: sw(12),
                paddingVertical: sw(12),
                marginTop: sw(8),
              }}>
                <Text style={{ 
                  fontSize: sw(13), 
                  color: "#FFFFFF", 
                  fontWeight: "700",
                }}>
                  Edit Personal Info
                </Text>
              </TouchableOpacity>
            </>
          )}

          {activeTab === "work" && (
            <>
              <SectionCard title="Employment Details" sw={sw}>
                <InfoRow icon={Shield} label="EMPLOYEE ID" value="SPA-2023-001" sw={sw} />
                <View style={{ height: 1, backgroundColor: COLORS.border, marginVertical: sw(8) }} />
                <InfoRow icon={Calendar} label="JOINING DATE" value="15 Jan 2023" sw={sw} />
                <View style={{ height: 1, backgroundColor: COLORS.border, marginVertical: sw(8) }} />
                <InfoRow icon={Briefcase} label="DEPARTMENT" value="Operations" sw={sw} />
                <View style={{ height: 1, backgroundColor: COLORS.border, marginVertical: sw(8) }} />
                <InfoRow icon={Award} label="DESIGNATION" value="Spa Manager" sw={sw} />
              </SectionCard>

              <SectionCard title="Manager & Team" sw={sw}>
                <InfoRow icon={User} label="REPORTING MANAGER" value="Vikram Singh" sw={sw} />
                <View style={{ height: 1, backgroundColor: COLORS.border, marginVertical: sw(8) }} />
                <InfoRow icon={Briefcase} label="TEAM SIZE" value="8 Members" sw={sw} />
              </SectionCard>

              <SectionCard title="Current Assignments" sw={sw}>
                <TouchableOpacity style={{
                  backgroundColor: COLORS.white,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  borderRadius: sw(10),
                  padding: sw(10),
                  marginBottom: sw(8),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <View>
                    <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text, marginBottom: sw(2) }}>
                      Spa Operations
                    </Text>
                    <Text style={{ fontSize: sw(9), color: COLORS.textLight }}>
                      Primary Role
                    </Text>
                  </View>
                  <Star size={sw(16)} color={COLORS.warning} fill={COLORS.warning} strokeWidth={2} />
                </TouchableOpacity>
              </SectionCard>
            </>
          )}

          {activeTab === "documents" && (
            <>
              <SectionCard title="Important Documents" sw={sw}>
                <TouchableOpacity style={{
                  backgroundColor: COLORS.white,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  borderRadius: sw(10),
                  padding: sw(10),
                  marginBottom: sw(8),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                    <View style={{
                      width: sw(36),
                      height: sw(36),
                      borderRadius: sw(8),
                      backgroundColor: "#FEF3C7",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: sw(10),
                    }}>
                      <FileText size={sw(16)} color="#F59E0B" strokeWidth={2.5} />
                    </View>
                    <View>
                      <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text }}>
                        Employment Contract
                      </Text>
                      <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginTop: sw(2) }}>
                        Signed • 15 Jan 2023
                      </Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: sw(10), color: COLORS.success, fontWeight: "700" }}>✓</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                  backgroundColor: COLORS.white,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  borderRadius: sw(10),
                  padding: sw(10),
                  marginBottom: sw(8),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                    <View style={{
                      width: sw(36),
                      height: sw(36),
                      borderRadius: sw(8),
                      backgroundColor: "#DBEAFE",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: sw(10),
                    }}>
                      <FileText size={sw(16)} color="#3B82F6" strokeWidth={2.5} />
                    </View>
                    <View>
                      <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text }}>
                        Spa Therapist Certification
                      </Text>
                      <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginTop: sw(2) }}>
                        Valid till 15 Jan 2026
                      </Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: sw(10), color: COLORS.success, fontWeight: "700" }}>✓</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                  backgroundColor: COLORS.white,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  borderRadius: sw(10),
                  padding: sw(10),
                  marginBottom: sw(8),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                    <View style={{
                      width: sw(36),
                      height: sw(36),
                      borderRadius: sw(8),
                      backgroundColor: "#DBEAFE",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: sw(10),
                    }}>
                      <FileText size={sw(16)} color="#3B82F6" strokeWidth={2.5} />
                    </View>
                    <View>
                      <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text }}>
                        Health Insurance Details
                      </Text>
                      <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginTop: sw(2) }}>
                        Updated • 01 Jan 2025
                      </Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: sw(10), color: COLORS.success, fontWeight: "700" }}>✓</Text>
                </TouchableOpacity>
              </SectionCard>

              <SectionCard title="Leave Balance" sw={sw}>
                <View style={{
                  backgroundColor: COLORS.white,
                  borderRadius: sw(10),
                  padding: sw(10),
                }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: sw(8) }}>
                    <Text style={{ fontSize: sw(10), fontWeight: "600", color: COLORS.text }}>Casual Leave</Text>
                    <Text style={{ fontSize: sw(12), fontWeight: "800", color: COLORS.primary }}>5 / 12</Text>
                  </View>
                  <View style={{
                    height: sw(6),
                    backgroundColor: COLORS.border,
                    borderRadius: sw(3),
                    overflow: "hidden",
                  }}>
                    <View style={{
                      width: "42%",
                      height: sw(6),
                      backgroundColor: COLORS.success,
                      borderRadius: sw(3),
                    }} />
                  </View>
                </View>
              </SectionCard>
            </>
          )}

          {/* Logout Button - appears on all tabs */}
          <TouchableOpacity style={{
            marginTop: sw(24),
            marginBottom: sw(80),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `${COLORS.danger}15`,
            borderRadius: sw(12),
            paddingVertical: sw(12),
            borderWidth: 1,
            borderColor: COLORS.danger,
          }}>
            <LogOut size={sw(16)} color={COLORS.danger} strokeWidth={2.5} />
            <Text style={{ 
              fontSize: sw(13), 
              color: COLORS.danger, 
              fontWeight: "700",
              marginLeft: sw(6),
            }}>
              Logout
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
