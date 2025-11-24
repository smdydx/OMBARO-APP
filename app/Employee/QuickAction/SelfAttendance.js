import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, MapPin, Clock, CheckCircle, LogIn, LogOut, RefreshCw, AlertCircle, Copy, Share2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Alert,
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
  danger: "#DC2626",
  info: "#3B82F6",
  white: "#FFFFFF",
  text: "#1A1A1A",
  textSecondary: "#666666",
  textLight: "#999999",
  bg: "#F9FAFB",
  cardBg: "#FFFFFF",
  border: "#E5E7EB",
};

function useScale() {
  const { width } = useWindowDimensions();
  const base = Math.min(width, 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw, width };
}

// Mock location data
const getMockLocation = () => ({
  latitude: 28.631908,
  longitude: 77.093274,
  accuracy: 15,
});

const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

const formatDate = () => {
  const now = new Date();
  return now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
};

const calculateDuration = (checkInTime, checkOutTime) => {
  if (!checkInTime || !checkOutTime) return "0h 0m";
  
  const checkIn = new Date(`2025-01-01 ${checkInTime}`);
  const checkOut = new Date(`2025-01-01 ${checkOutTime}`);
  
  const diffMs = checkOut - checkIn;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
};

function LocationCard({ location, sw }) {
  return (
    <View style={{ marginBottom: sw(16) }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(10) }}>
        <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text }}>Current Location</Text>
        <TouchableOpacity style={{ padding: sw(4) }}>
          <RefreshCw size={sw(14)} color={COLORS.info} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={["#D1FAE5", "#ECFDF5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: sw(12), overflow: "hidden", borderWidth: 1, borderColor: "#A7F3D0" }}
      >
        <View style={{ padding: sw(14) }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(10) }}>
            <View style={{ width: sw(24), height: sw(24), borderRadius: sw(12), backgroundColor: COLORS.success, alignItems: "center", justifyContent: "center", marginRight: sw(10) }}>
              <MapPin size={sw(12)} color={COLORS.white} strokeWidth={2.5} />
            </View>
            <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.success }}>Location Tagged</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: sw(12) }}>
            <View>
              <Text style={{ fontSize: sw(8), color: COLORS.textLight, marginBottom: sw(2) }}>Latitude</Text>
              <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.text }}>{location.latitude}</Text>
            </View>
            <View>
              <Text style={{ fontSize: sw(8), color: COLORS.textLight, marginBottom: sw(2) }}>Longitude</Text>
              <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.text }}>{location.longitude}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: sw(8) }}>
            <TouchableOpacity style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.6)", borderRadius: sw(8), paddingVertical: sw(8), alignItems: "center", justifyContent: "center", flexDirection: "row", gap: sw(4) }}>
              <Copy size={sw(11)} color={COLORS.success} strokeWidth={2.5} />
              <Text style={{ fontSize: sw(8), fontWeight: "700", color: COLORS.success }}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.6)", borderRadius: sw(8), paddingVertical: sw(8), alignItems: "center", justifyContent: "center", flexDirection: "row", gap: sw(4) }}>
              <Share2 size={sw(11)} color={COLORS.success} strokeWidth={2.5} />
              <Text style={{ fontSize: sw(8), fontWeight: "700", color: COLORS.success }}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

function AttendanceButtons({ isCheckedIn, isCheckedOut, checkInTime, checkOutTime, onCheckIn, onCheckOut, sw }) {
  return (
    <View style={{ marginBottom: sw(16) }}>
      <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text, marginBottom: sw(10) }}>Mark Attendance</Text>

      {!isCheckedIn ? (
        <>
          <TouchableOpacity
            onPress={onCheckIn}
            style={{
              backgroundColor: COLORS.info,
              borderRadius: sw(12),
              paddingVertical: sw(14),
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: sw(8),
              marginBottom: sw(10),
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <LogIn size={sw(18)} color={COLORS.white} strokeWidth={2.5} />
            <Text style={{ fontSize: sw(12), fontWeight: "800", color: COLORS.white }}>Check In</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", gap: sw(8) }}>
            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: COLORS.border, borderRadius: sw(10), paddingVertical: sw(11), alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.textSecondary }}>Half Day</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: COLORS.border, borderRadius: sw(10), paddingVertical: sw(11), alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.textSecondary }}>Work From Home</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {!isCheckedOut ? (
            <TouchableOpacity
              onPress={onCheckOut}
              style={{
                backgroundColor: COLORS.warning,
                borderRadius: sw(12),
                paddingVertical: sw(14),
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: sw(8),
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <LogOut size={sw(18)} color={COLORS.white} strokeWidth={2.5} />
              <Text style={{ fontSize: sw(12), fontWeight: "800", color: COLORS.white }}>Check Out</Text>
            </TouchableOpacity>
          ) : null}
        </>
      )}
    </View>
  );
}

function TodaysAttendanceCard({ isCheckedIn, checkInTime, checkOutTime, location, sw }) {
  if (!isCheckedIn) return null;

  const duration = calculateDuration(checkInTime, checkOutTime);
  const workingHoursNum = parseFloat(duration.split('h')[0]);

  return (
    <View style={{ marginBottom: sw(16) }}>
      <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text, marginBottom: sw(10) }}>Today's Attendance</Text>

      <LinearGradient
        colors={["#D1FAE5", "#ECFDF5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: sw(12), overflow: "hidden", borderWidth: 1, borderColor: "#A7F3D0" }}
      >
        <View style={{ padding: sw(14) }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(12) }}>
            <CheckCircle size={sw(16)} color={COLORS.success} strokeWidth={2.5} />
            <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.success, marginLeft: sw(8) }}>Present</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: sw(12) }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: sw(8), color: COLORS.textLight, marginBottom: sw(3) }}>Check In</Text>
              <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text }}>{checkInTime}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: sw(8), color: COLORS.textLight, marginBottom: sw(3) }}>Check Out</Text>
              <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text }}>{checkOutTime || "--"}</Text>
            </View>
          </View>

          <View style={{ backgroundColor: "rgba(255,255,255,0.5)", borderRadius: sw(8), padding: sw(10), marginBottom: sw(10) }}>
            <Text style={{ fontSize: sw(8), color: COLORS.textLight, marginBottom: sw(2) }}>Working Hours</Text>
            <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.success }}>{duration}</Text>
          </View>

          <View style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", borderRadius: sw(8), padding: sw(10) }}>
            <Text style={{ fontSize: sw(8), color: COLORS.textLight, marginBottom: sw(4) }}>Location</Text>
            <Text style={{ fontSize: sw(9), fontWeight: "600", color: COLORS.text }}>📍 {location.latitude}, {location.longitude}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

function StatsCards({ daysPresent = 22, avgHours = 8.5, sw }) {
  return (
    <View style={{ flexDirection: "row", gap: sw(10) }}>
      <LinearGradient
        colors={["#D1FAE5", "#ECFDF5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, borderRadius: sw(12), overflow: "hidden", borderWidth: 1, borderColor: "#A7F3D0", padding: sw(12), alignItems: "center" }}
      >
        <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.success, marginBottom: sw(2) }}>{daysPresent}</Text>
        <Text style={{ fontSize: sw(9), color: COLORS.textLight, textAlign: "center" }}>Days Present</Text>
      </LinearGradient>

      <LinearGradient
        colors={["#FEF3C7", "#FFFBEB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, borderRadius: sw(12), overflow: "hidden", borderWidth: 1, borderColor: "#FDE68A", padding: sw(12), alignItems: "center" }}
      >
        <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.warning, marginBottom: sw(2) }}>{avgHours}</Text>
        <Text style={{ fontSize: sw(9), color: COLORS.textLight, textAlign: "center" }}>Avg Hours</Text>
      </LinearGradient>
    </View>
  );
}

export default function SelfAttendance({ onBack }) {
  const { sw } = useScale();
  const nav = useNavigation();
  
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [location, setLocation] = useState(getMockLocation());
  const [showNotification, setShowNotification] = useState(false);

  const handleCheckIn = () => {
    const time = formatTime();
    setCheckInTime(time);
    setIsCheckedIn(true);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleCheckOut = () => {
    const time = formatTime();
    setCheckOutTime(time);
    setIsCheckedOut(true);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.gradient2}
        translucent={false}
      />

      {/* Header Gradient */}
      <LinearGradient
        colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: Platform.OS === 'ios' ? sw(50) : sw(40),
          paddingBottom: sw(20),
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
          <ArrowLeft size={sw(20)} color={COLORS.white} strokeWidth={2.5} />
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <Text style={{ color: COLORS.white, fontSize: sw(16), fontWeight: "800", marginBottom: sw(4) }}>
            Self Attendance
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(10) }}>
            {formatDate()}
          </Text>
        </View>
      </LinearGradient>

      {/* Employee Profile Card */}
      <View style={{ paddingHorizontal: sw(16), paddingTop: sw(12) }}>
        <LinearGradient
          colors={["#E0F2FE", "#F0F9FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: sw(12), overflow: "hidden", borderWidth: 1, borderColor: "#BAE6FD", padding: sw(12), flexDirection: "row", alignItems: "center", marginBottom: sw(14) }}
        >
          <View style={{ width: sw(44), height: sw(44), borderRadius: sw(22), backgroundColor: COLORS.info, alignItems: "center", justifyContent: "center", marginRight: sw(10) }}>
            <Text style={{ fontSize: sw(20) }}>👤</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text }}>John Doe</Text>
            <Text style={{ fontSize: sw(8), color: COLORS.textLight }}>EMP001 • Spa Manager Operations</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: sw(16), paddingTop: sw(12), paddingBottom: sw(40) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Notification */}
        {showNotification && (
          <View style={{ backgroundColor: "#DCFCE7", borderRadius: sw(10), borderLeftWidth: 4, borderLeftColor: COLORS.success, padding: sw(10), marginBottom: sw(14), flexDirection: "row", alignItems: "center" }}>
            <CheckCircle size={sw(14)} color={COLORS.success} strokeWidth={2.5} />
            <Text style={{ fontSize: sw(9), color: "#15803D", fontWeight: "600", marginLeft: sw(8) }}>
              ✓ Attendance marked successfully
            </Text>
          </View>
        )}

        {/* Location Card */}
        <LocationCard location={location} sw={sw} />

        {/* Attendance Buttons */}
        <AttendanceButtons
          isCheckedIn={isCheckedIn}
          isCheckedOut={isCheckedOut}
          checkInTime={checkInTime}
          checkOutTime={checkOutTime}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
          sw={sw}
        />

        {/* Today's Attendance */}
        {isCheckedIn && (
          <TodaysAttendanceCard
            isCheckedIn={isCheckedIn}
            checkInTime={checkInTime}
            checkOutTime={checkOutTime}
            location={location}
            sw={sw}
          />
        )}

        {/* Stats */}
        <StatsCards daysPresent={22} avgHours={8.5} sw={sw} />
      </ScrollView>
    </View>
  );
}
