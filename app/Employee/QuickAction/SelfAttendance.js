import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Clock, CheckCircle, Calendar } from "lucide-react-native";
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
  success: "#10B981",
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

function AttendanceCard({ date, checkIn, checkOut, status, sw }) {
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
          backgroundColor: status === "Present" ? "#D1FAE5" : "#FEE2E2",
          paddingHorizontal: sw(8),
          paddingVertical: sw(4),
          borderRadius: sw(8),
        }}>
          <Text style={{ 
            fontSize: sw(9), 
            fontWeight: "700", 
            color: status === "Present" ? "#059669" : "#DC2626" 
          }}>
            {status}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: sw(12) }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginBottom: sw(3) }}>Check In</Text>
          <Text style={{ fontSize: sw(12), fontWeight: "600", color: COLORS.text }}>{checkIn}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginBottom: sw(3) }}>Check Out</Text>
          <Text style={{ fontSize: sw(12), fontWeight: "600", color: COLORS.text }}>{checkOut}</Text>
        </View>
      </View>
    </View>
  );
}

export default function SelfAttendance({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

  const attendanceData = [
    { date: "Jan 15, 2025", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "Present" },
    { date: "Jan 14, 2025", checkIn: "09:15 AM", checkOut: "06:10 PM", status: "Present" },
    { date: "Jan 13, 2025", checkIn: "09:05 AM", checkOut: "06:05 PM", status: "Present" },
    { date: "Jan 12, 2025", checkIn: "--", checkOut: "--", status: "Absent" },
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
          <View style={{ flex: 1, alignItems: "center", marginRight: sw(42),marginTop:sw(40)  }}>
            <Text style={{ color: "#FFFFFF", fontSize: sw(20), fontWeight: "800" }}>Self Attendance</Text>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(12), marginTop: sw(2) }}>
              Track Your Time
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: sw(4) }}>
          <View style={{ flexDirection: "row", gap: sw(12) }}>
            <View style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: sw(16),
              padding: sw(14),
              alignItems: "center",
            }}>
              <Clock size={sw(26)} color="#FFFFFF" strokeWidth={2} />
              <Text style={{ fontSize: sw(20), fontWeight: "900", color: "#FFFFFF", marginTop: sw(8) }}>
                09:00 AM
              </Text>
              <Text style={{ fontSize: sw(11), color: "rgba(255,255,255,0.95)", marginTop: sw(4), fontWeight: "600" }}>
                Check In
              </Text>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: sw(16),
              padding: sw(14),
              alignItems: "center",
            }}>
              <CheckCircle size={sw(26)} color="#FFFFFF" strokeWidth={2} />
              <Text style={{ fontSize: sw(20), fontWeight: "900", color: "#FFFFFF", marginTop: sw(8) }}>
                06:00 PM
              </Text>
              <Text style={{ fontSize: sw(11), color: "rgba(255,255,255,0.95)", marginTop: sw(4), fontWeight: "600" }}>
                Check Out
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={{ 
        height: contentHeight,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: sw(28),
        borderTopRightRadius: sw(28),
        marginTop: -sw(1),
      }}>
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: sw(18), paddingHorizontal: sw(16), paddingBottom: sw(120) }} 
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontSize: sw(14), fontWeight: "700", color: COLORS.text, marginBottom: sw(12) }}>
            Recent Attendance
          </Text>
          {attendanceData.map((item, index) => (
            <AttendanceCard key={index} {...item} sw={sw} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
