import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Clock, CheckCircle, Calendar, LogIn, LogOut, TrendingUp } from "lucide-react-native";
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
  success: "#10B981",
  warning: "#F59E0B",
  info: "#3B82F6",
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

function AttendanceCard({ date, checkIn, checkOut, status, duration, sw }) {
  const isPresent = status === "Present";
  const statusBg = isPresent ? "#DCFCE7" : "#FEE2E2";
  const statusColor = isPresent ? "#15803D" : "#DC2626";

  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
      marginBottom: sw(10),
    }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(10) }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Calendar size={sw(14)} color={COLORS.primary} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginLeft: sw(6) }}>
            {date}
          </Text>
        </View>
        <View style={{
          backgroundColor: statusBg,
          paddingHorizontal: sw(8),
          paddingVertical: sw(4),
          borderRadius: sw(8),
        }}>
          <Text style={{ 
            fontSize: sw(9), 
            fontWeight: "700", 
            color: statusColor 
          }}>
            {status}
          </Text>
        </View>
      </View>

      <View style={{
        backgroundColor: COLORS.white,
        borderRadius: sw(8),
        padding: sw(10),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginBottom: sw(3) }}>Check In</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: sw(4) }}>
            <LogIn size={sw(13)} color={COLORS.success} strokeWidth={2.5} />
            <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>
              {checkIn}
            </Text>
          </View>
        </View>

        <View style={{ width: 1, height: sw(30), backgroundColor: COLORS.border }} />

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginBottom: sw(3) }}>Check Out</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: sw(4) }}>
            <LogOut size={sw(13)} color={COLORS.warning} strokeWidth={2.5} />
            <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>
              {checkOut}
            </Text>
          </View>
        </View>

        <View style={{ width: 1, height: sw(30), backgroundColor: COLORS.border }} />

        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginBottom: sw(3) }}>Duration</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: sw(4) }}>
            <TrendingUp size={sw(13)} color={COLORS.info} strokeWidth={2.5} />
            <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>
              {duration}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function StatCard({ label, value, icon: IconComponent, color, sw }) {
  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
      alignItems: "center",
      flex: 1,
      marginRight: sw(8),
    }}>
      <View style={{
        width: sw(36),
        height: sw(36),
        borderRadius: sw(18),
        backgroundColor: `${color}20`,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: sw(8),
      }}>
        <IconComponent size={sw(16)} color={color} strokeWidth={2.5} />
      </View>
      <Text style={{ fontSize: sw(14), fontWeight: "800", color, marginBottom: sw(4) }}>
        {value}
      </Text>
      <Text style={{ fontSize: sw(9), color: COLORS.textLight, textAlign: "center" }}>
        {label}
      </Text>
    </View>
  );
}

export default function SelfAttendance({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();
  const [activeTab, setActiveTab] = useState("Today");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const attendanceData = [
    { date: "Jan 15, 2025 (Today)", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "Present", duration: "9h 0m" },
    { date: "Jan 14, 2025", checkIn: "09:15 AM", checkOut: "06:10 PM", status: "Present", duration: "8h 55m" },
    { date: "Jan 13, 2025", checkIn: "09:05 AM", checkOut: "06:05 PM", status: "Present", duration: "8h 59m" },
    { date: "Jan 12, 2025", checkIn: "--", checkOut: "--", status: "Absent", duration: "0h 0m" },
    { date: "Jan 11, 2025", checkIn: "09:30 AM", checkOut: "06:15 PM", status: "Present", duration: "8h 45m" },
  ];

  const weeklyStats = [
    { date: "Mon", status: "Present", duration: "9h 0m" },
    { date: "Tue", status: "Present", duration: "8h 55m" },
    { date: "Wed", status: "Present", duration: "8h 59m" },
    { date: "Thu", status: "Absent", duration: "0h 0m" },
    { date: "Fri", status: "Present", duration: "8h 45m" },
    { date: "Sat", status: "Half Day", duration: "4h 30m" },
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
          paddingBottom: sw(32),
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
            Self Attendance
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: sw(10), textAlign: "center" }}>
            Track your daily check-in and check-out
          </Text>
        </View>

        <View style={{
          backgroundColor: "rgba(255,255,255,0.15)",
          borderRadius: sw(12),
          padding: sw(4),
          flexDirection: "row",
          gap: sw(4),
        }}>
          {["Today", "Weekly", "Monthly"].map((label) => (
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
          {activeTab === "Today" && (
            <>
              {/* Check In / Check Out Buttons */}
              <View style={{ marginBottom: sw(16) }}>
                <View style={{ flexDirection: "row", gap: sw(10), marginBottom: sw(12) }}>
                  <TouchableOpacity
                    onPress={() => setIsCheckedIn(!isCheckedIn)}
                    style={{
                      flex: 1,
                      backgroundColor: isCheckedIn ? COLORS.success : COLORS.cardBg,
                      borderRadius: sw(12),
                      borderWidth: 2,
                      borderColor: isCheckedIn ? COLORS.success : COLORS.border,
                      paddingVertical: sw(14),
                      alignItems: "center",
                      justifyContent: "center",
                      gap: sw(6),
                    }}
                  >
                    <LogIn size={sw(18)} color={isCheckedIn ? "#FFFFFF" : COLORS.success} strokeWidth={2.5} />
                    <View>
                      <Text style={{ fontSize: sw(12), fontWeight: "700", color: isCheckedIn ? "#FFFFFF" : COLORS.success, textAlign: "center" }}>
                        Check In
                      </Text>
                      <Text style={{ fontSize: sw(9), color: isCheckedIn ? "rgba(255,255,255,0.8)" : COLORS.textLight, textAlign: "center", marginTop: sw(2) }}>
                        09:00 AM
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setIsCheckedOut(!isCheckedOut)}
                    style={{
                      flex: 1,
                      backgroundColor: isCheckedOut ? COLORS.warning : COLORS.cardBg,
                      borderRadius: sw(12),
                      borderWidth: 2,
                      borderColor: isCheckedOut ? COLORS.warning : COLORS.border,
                      paddingVertical: sw(14),
                      alignItems: "center",
                      justifyContent: "center",
                      gap: sw(6),
                    }}
                  >
                    <LogOut size={sw(18)} color={isCheckedOut ? "#FFFFFF" : COLORS.warning} strokeWidth={2.5} />
                    <View>
                      <Text style={{ fontSize: sw(12), fontWeight: "700", color: isCheckedOut ? "#FFFFFF" : COLORS.warning, textAlign: "center" }}>
                        Check Out
                      </Text>
                      <Text style={{ fontSize: sw(9), color: isCheckedOut ? "rgba(255,255,255,0.8)" : COLORS.textLight, textAlign: "center", marginTop: sw(2) }}>
                        06:00 PM
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {(isCheckedIn || isCheckedOut) && (
                  <View style={{
                    backgroundColor: "#DCFCE7",
                    borderRadius: sw(10),
                    padding: sw(10),
                    borderLeftWidth: 4,
                    borderLeftColor: COLORS.success,
                  }}>
                    <Text style={{ fontSize: sw(10), color: "#15803D", fontWeight: "600" }}>
                      ✓ Attendance marked successfully for today
                    </Text>
                  </View>
                )}
              </View>

              {/* Today's Stats */}
              <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(10) }}>
                Today's Summary
              </Text>
              <View style={{ flexDirection: "row", marginBottom: sw(16) }}>
                <StatCard label="Check In" value="09:00" icon={LogIn} color={COLORS.success} sw={sw} />
                <StatCard label="Check Out" value="06:00" icon={LogOut} color={COLORS.warning} sw={sw} />
                <StatCard label="Duration" value="9h 0m" icon={TrendingUp} color={COLORS.info} sw={sw} />
              </View>

              {/* Today's Attendance */}
              <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(10) }}>
                Attendance History
              </Text>
              <AttendanceCard {...attendanceData[0]} sw={sw} />
            </>
          )}

          {activeTab === "Weekly" && (
            <>
              <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(10) }}>
                Weekly Attendance
              </Text>
              
              {/* Weekly Stats Overview */}
              <View style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: sw(12),
                borderWidth: 1,
                borderColor: COLORS.border,
                padding: sw(12),
                marginBottom: sw(16),
              }}>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.success, marginBottom: sw(4) }}>
                      5
                    </Text>
                    <Text style={{ fontSize: sw(9), color: COLORS.textLight }}>Days Present</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.warning, marginBottom: sw(4) }}>
                      1
                    </Text>
                    <Text style={{ fontSize: sw(9), color: COLORS.textLight }}>Absent</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.info, marginBottom: sw(4) }}>
                      42h 45m
                    </Text>
                    <Text style={{ fontSize: sw(9), color: COLORS.textLight }}>Total Hours</Text>
                  </View>
                </View>
              </View>

              {/* Weekly Days */}
              {weeklyStats.map((day, idx) => (
                <View key={idx} style={{
                  backgroundColor: COLORS.cardBg,
                  borderRadius: sw(12),
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  padding: sw(10),
                  marginBottom: sw(8),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, minWidth: sw(50) }}>
                    {day.date}
                  </Text>
                  <View style={{
                    backgroundColor: day.status === "Present" ? "#DCFCE7" : day.status === "Half Day" ? "#FEF9C3" : "#FEE2E2",
                    paddingHorizontal: sw(8),
                    paddingVertical: sw(4),
                    borderRadius: sw(6),
                    marginRight: sw(8),
                  }}>
                    <Text style={{
                      fontSize: sw(9),
                      fontWeight: "700",
                      color: day.status === "Present" ? "#15803D" : day.status === "Half Day" ? "#A16207" : "#DC2626",
                    }}>
                      {day.status}
                    </Text>
                  </View>
                  <Text style={{ fontSize: sw(10), fontWeight: "600", color: COLORS.text }}>
                    {day.duration}
                  </Text>
                </View>
              ))}
            </>
          )}

          {activeTab === "Monthly" && (
            <>
              <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(10) }}>
                Monthly Attendance Report
              </Text>
              
              {/* Monthly Overview */}
              <View style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: sw(12),
                borderWidth: 1,
                borderColor: COLORS.border,
                padding: sw(12),
                marginBottom: sw(16),
              }}>
                <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: sw(12) }}>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.success, marginBottom: sw(4) }}>
                      22
                    </Text>
                    <Text style={{ fontSize: sw(9), color: COLORS.textLight }}>Days Present</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.warning, marginBottom: sw(4) }}>
                      2
                    </Text>
                    <Text style={{ fontSize: sw(9), color: COLORS.textLight }}>Absent</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.info, marginBottom: sw(4) }}>
                      176h 30m
                    </Text>
                    <Text style={{ fontSize: sw(9), color: COLORS.textLight }}>Total Hours</Text>
                  </View>
                </View>
              </View>

              {/* Monthly Records */}
              <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(10) }}>
                Recent Days
              </Text>
              {attendanceData.map((item, index) => (
                <AttendanceCard key={index} {...item} sw={sw} />
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
