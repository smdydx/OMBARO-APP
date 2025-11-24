import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, MapPin, Clock, CheckCircle, LogIn, LogOut, RefreshCw, Copy, Share2, Calendar, Home } from "lucide-react-native";
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

const getMockLocation = () => ({
  latitude: 28.531098,
  longitude: 77.093274,
  accuracy: 15,
});

const formatTimeOnly = (date) => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

const formatDate = () => {
  const now = new Date();
  return now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
};

const calculateDuration = (checkInTime, checkOutTime) => {
  if (!checkInTime || !checkOutTime) return null;

  const diffMs = checkOutTime - checkInTime;
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
    display: `${hours}h ${minutes}m ${seconds}s`,
    shortDisplay: `${hours}h ${minutes}m`,
  };
};

const ATTENDANCE_HISTORY = [
  { date: "Jan 14, 2025", day: "Mon", checkIn: "09:15 AM", checkOut: "06:10 PM", status: "Present", duration: "8h 55m 30s", location: "28.531098, 77.093274" },
  { date: "Jan 13, 2025", day: "Sun", checkIn: "09:05 AM", checkOut: "06:05 PM", status: "Present", duration: "8h 59m 45s", location: "28.531098, 77.093274" },
  { date: "Jan 12, 2025", day: "Sat", checkIn: "--", checkOut: "--", status: "Absent", duration: "0h 0m 0s", location: "N/A" },
  { date: "Jan 11, 2025", day: "Fri", checkIn: "09:30 AM", checkOut: "06:15 PM", status: "Present", duration: "8h 45m 15s", location: "28.531098, 77.093274" },
  { date: "Jan 10, 2025", day: "Thu", checkIn: "08:45 AM", checkOut: "01:00 PM", status: "Half Day", duration: "4h 15m 30s", location: "28.531098, 77.093274" },
  { date: "Jan 09, 2025", day: "Wed", checkIn: "02:00 PM", checkOut: "06:00 PM", status: "Work From Home", duration: "4h 0m 0s", location: "Home" },
  { date: "Jan 08, 2025", day: "Tue", checkIn: "09:20 AM", checkOut: "05:50 PM", status: "Present", duration: "8h 30m 45s", location: "28.531098, 77.093274" },
];

function LocationCard({ location, sw }) {
  return (
    <View style={{ marginBottom: sw(18) }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(12) }}>
        <Text style={{ fontSize: sw(13), fontWeight: "800", color: COLORS.text }}>Current Location</Text>
        <TouchableOpacity style={{ padding: sw(4) }}>
          <RefreshCw size={sw(16)} color={COLORS.info} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={["#D1FAE5", "#ECFDF5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: sw(14), overflow: "hidden", borderWidth: 1.5, borderColor: "#A7F3D0" }}
      >
        <View style={{ padding: sw(16) }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(14) }}>
            <View style={{ width: sw(28), height: sw(28), borderRadius: sw(14), backgroundColor: COLORS.success, alignItems: "center", justifyContent: "center", marginRight: sw(12) }}>
              <MapPin size={sw(14)} color={COLORS.white} strokeWidth={2.5} />
            </View>
            <Text style={{ fontSize: sw(11), fontWeight: "800", color: COLORS.success }}>Location Tagged</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: sw(14) }}>
            <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.7)", borderRadius: sw(10), padding: sw(10), marginRight: sw(8) }}>
              <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginBottom: sw(4), fontWeight: "600" }}>Latitude</Text>
              <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text }}>{location.latitude}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.7)", borderRadius: sw(10), padding: sw(10) }}>
              <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginBottom: sw(4), fontWeight: "600" }}>Longitude</Text>
              <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text }}>{location.longitude}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: sw(10) }}>
            <TouchableOpacity style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.6)", borderRadius: sw(10), paddingVertical: sw(10), alignItems: "center", justifyContent: "center", flexDirection: "row", gap: sw(6) }}>
              <Copy size={sw(13)} color={COLORS.success} strokeWidth={2.5} />
              <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.success }}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.6)", borderRadius: sw(10), paddingVertical: sw(10), alignItems: "center", justifyContent: "center", flexDirection: "row", gap: sw(6) }}>
              <Share2 size={sw(13)} color={COLORS.success} strokeWidth={2.5} />
              <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.success }}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

function AttendanceButtons({ isCheckedIn, isCheckedOut, checkInTimeDisplay, attendanceType, onCheckIn, onCheckOut, onHalfDay, onWorkFromHome, sw }) {
  return (
    <View style={{ marginBottom: sw(18) }}>
      <Text style={{ fontSize: sw(13), fontWeight: "800", color: COLORS.text, marginBottom: sw(12) }}>Mark Attendance</Text>

      {!isCheckedIn ? (
        <>
          <TouchableOpacity
            onPress={onCheckIn}
            style={{
              backgroundColor: COLORS.info,
              borderRadius: sw(14),
              paddingVertical: sw(16),
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: sw(10),
              marginBottom: sw(12),
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <LogIn size={sw(20)} color={COLORS.white} strokeWidth={2.5} />
            <View>
              <Text style={{ fontSize: sw(13), fontWeight: "800", color: COLORS.white }}>Check In</Text>
              <Text style={{ fontSize: sw(9), color: "rgba(255,255,255,0.8)" }}>Regular Attendance</Text>
            </View>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", gap: sw(10) }}>
            <TouchableOpacity
              onPress={onHalfDay}
              style={{
                flex: 1,
                borderWidth: 2,
                borderColor: COLORS.warning,
                borderRadius: sw(12),
                paddingVertical: sw(13),
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: sw(6),
                backgroundColor: `${COLORS.warning}08`,
              }}
            >
              <Clock size={sw(16)} color={COLORS.warning} strokeWidth={2.5} />
              <View>
                <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.warning }}>Half Day</Text>
                <Text style={{ fontSize: sw(7), color: COLORS.textLight }}>4 hours</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={onWorkFromHome}
              style={{
                flex: 1,
                borderWidth: 2,
                borderColor: COLORS.success,
                borderRadius: sw(12),
                paddingVertical: sw(13),
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: sw(6),
                backgroundColor: `${COLORS.success}08`,
              }}
            >
              <Home size={sw(16)} color={COLORS.success} strokeWidth={2.5} />
              <View>
                <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.success }}>WFH</Text>
                <Text style={{ fontSize: sw(7), color: COLORS.textLight }}>Remote</Text>
              </View>
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
                borderRadius: sw(14),
                paddingVertical: sw(16),
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: sw(10),
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <LogOut size={sw(20)} color={COLORS.white} strokeWidth={2.5} />
              <View>
                <Text style={{ fontSize: sw(13), fontWeight: "800", color: COLORS.white }}>Check Out</Text>
                <Text style={{ fontSize: sw(9), color: "rgba(255,255,255,0.8)" }}>End your day</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </>
      )}
    </View>
  );
}

function TodaysAttendanceCard({ isCheckedIn, checkInTimeDisplay, checkOutTimeDisplay, duration, location, attendanceType, sw }) {
  if (!isCheckedIn) return null;

  return (
    <View style={{ marginBottom: sw(18) }}>
      <Text style={{ fontSize: sw(13), fontWeight: "800", color: COLORS.text, marginBottom: sw(12) }}>Today's Attendance</Text>

      <LinearGradient
        colors={["#D1FAE5", "#ECFDF5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: sw(14), overflow: "hidden", borderWidth: 1.5, borderColor: "#A7F3D0" }}
      >
        <View style={{ padding: sw(16) }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(14) }}>
            <CheckCircle size={sw(18)} color={COLORS.success} strokeWidth={2.5} />
            <Text style={{ fontSize: sw(12), fontWeight: "800", color: COLORS.success, marginLeft: sw(10) }}>
              {attendanceType === "HalfDay" ? "Half Day" : attendanceType === "WorkFromHome" ? "Work From Home" : "Present"}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: sw(14) }}>
            <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.7)", borderRadius: sw(10), padding: sw(12), marginRight: sw(8) }}>
              <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginBottom: sw(4), fontWeight: "600" }}>Check In</Text>
              <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>{checkInTimeDisplay}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.7)", borderRadius: sw(10), padding: sw(12) }}>
              <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginBottom: sw(4), fontWeight: "600" }}>Check Out</Text>
              <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>{checkOutTimeDisplay || "--"}</Text>
            </View>
          </View>

          {duration && (
            <View style={{ backgroundColor: "rgba(255,255,255,0.7)", borderRadius: sw(10), padding: sw(12), marginBottom: sw(12) }}>
              <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginBottom: sw(4), fontWeight: "600" }}>Total Time</Text>
              <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.success }}>
                {duration.hours}h {duration.minutes}m {duration.seconds}s
              </Text>
            </View>
          )}

          <View style={{ backgroundColor: "rgba(255,255,255,0.7)", borderRadius: sw(10), padding: sw(12) }}>
            <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginBottom: sw(4), fontWeight: "600" }}>Location</Text>
            <Text style={{ fontSize: sw(10), fontWeight: "600", color: COLORS.text }}>📍 {location}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

function AttendanceHistoryCard({ item, sw }) {
  const getStatusColor = () => {
    if (item.status === "Present") return "#10B981";
    if (item.status === "Half Day") return "#F59E0B";
    if (item.status === "Work From Home") return "#10B981";
    return "#DC2626";
  };

  const getStatusBg = () => {
    if (item.status === "Present") return "#DCFCE7";
    if (item.status === "Half Day") return "#FEF3C7";
    if (item.status === "Work From Home") return "#D1FAE5";
    return "#FEE2E2";
  };

  return (
    <View style={{ marginBottom: sw(10), backgroundColor: "#FFFFFF", borderRadius: sw(12), borderWidth: 1, borderColor: COLORS.border, padding: sw(14), overflow: "hidden" }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(10) }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text }}>{item.date}</Text>
          <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginTop: sw(2) }}>{item.day}</Text>
        </View>
        <View style={{ backgroundColor: getStatusBg(), paddingHorizontal: sw(12), paddingVertical: sw(6), borderRadius: sw(10) }}>
          <Text style={{ fontSize: sw(9), fontWeight: "700", color: getStatusColor() }}>{item.status}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: sw(8), marginBottom: sw(10) }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: sw(8), color: COLORS.textLight, marginBottom: sw(3) }}>Check In</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: sw(4) }}>
            <LogIn size={sw(12)} color={COLORS.success} strokeWidth={2.5} />
            <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.text }}>{item.checkIn}</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: sw(8), color: COLORS.textLight, marginBottom: sw(3) }}>Check Out</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: sw(4) }}>
            <LogOut size={sw(12)} color={COLORS.warning} strokeWidth={2.5} />
            <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.text }}>{item.checkOut}</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: sw(8), color: COLORS.textLight, marginBottom: sw(3) }}>Total Time</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: sw(4) }}>
            <Clock size={sw(12)} color={COLORS.info} strokeWidth={2.5} />
            <Text style={{ fontSize: sw(9), fontWeight: "700", color: COLORS.text }}>{item.duration}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function StatsCards({ daysPresent = 22, avgHours = 8.5, sw }) {
  return (
    <View style={{ flexDirection: "row", gap: sw(12), marginBottom: sw(18) }}>
      <LinearGradient
        colors={["#D1FAE5", "#ECFDF5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, borderRadius: sw(12), overflow: "hidden", borderWidth: 1.5, borderColor: "#A7F3D0", padding: sw(14), alignItems: "center" }}
      >
        <Text style={{ fontSize: sw(18), fontWeight: "800", color: COLORS.success, marginBottom: sw(4) }}>{daysPresent}</Text>
        <Text style={{ fontSize: sw(10), color: COLORS.textLight, textAlign: "center", fontWeight: "600" }}>Days Present</Text>
      </LinearGradient>

      <LinearGradient
        colors={["#FEF3C7", "#FFFBEB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, borderRadius: sw(12), overflow: "hidden", borderWidth: 1.5, borderColor: "#FDE68A", padding: sw(14), alignItems: "center" }}
      >
        <Text style={{ fontSize: sw(18), fontWeight: "800", color: COLORS.warning, marginBottom: sw(4) }}>{avgHours}</Text>
        <Text style={{ fontSize: sw(10), color: COLORS.textLight, textAlign: "center", fontWeight: "600" }}>Avg Hours</Text>
      </LinearGradient>
    </View>
  );
}

export default function SelfAttendance({ onBack }) {
  const { sw } = useScale();
  const nav = useNavigation();
  
  const [activeTab, setActiveTab] = useState("Today");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [checkInTimeDisplay, setCheckInTimeDisplay] = useState(null);
  const [checkOutTimeDisplay, setCheckOutTimeDisplay] = useState(null);
  const [location, setLocation] = useState(getMockLocation());
  const [showNotification, setShowNotification] = useState(false);
  const [attendanceType, setAttendanceType] = useState("Regular");
  const [duration, setDuration] = useState(null);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setCheckInTimeDisplay(formatTimeOnly(now));
    setIsCheckedIn(true);
    setAttendanceType("Regular");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleHalfDay = () => {
    const now = new Date();
    setCheckInTime(now);
    setCheckInTimeDisplay(formatTimeOnly(now));
    setIsCheckedIn(true);
    setAttendanceType("HalfDay");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleWorkFromHome = () => {
    const now = new Date();
    setCheckInTime(now);
    setCheckInTimeDisplay(formatTimeOnly(now));
    setIsCheckedIn(true);
    setAttendanceType("WorkFromHome");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(now);
    setCheckOutTimeDisplay(formatTimeOnly(now));
    setIsCheckedOut(true);
    
    // Calculate duration
    if (checkInTime) {
      const calc = calculateDuration(checkInTime, now);
      setDuration(calc);
    }
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const filteredData = activeTab === "Today"
    ? []
    : activeTab === "Weekly"
    ? ATTENDANCE_HISTORY.slice(0, 7)
    : ATTENDANCE_HISTORY;

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
            width: sw(42),
            height: sw(42),
            borderRadius: sw(21),
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: sw(14),
          }}
        >
          <ArrowLeft size={sw(22)} color={COLORS.white} strokeWidth={2.5} />
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <Text style={{ color: COLORS.white, fontSize: sw(18), fontWeight: "800", marginBottom: sw(4) }}>
            Self Attendance
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(11) }}>
            {formatDate()}
          </Text>
        </View>
      </LinearGradient>

      {/* Employee Profile Card */}
      <View style={{ paddingHorizontal: sw(16), paddingTop: sw(14) }}>
        <LinearGradient
          colors={["#E0F2FE", "#F0F9FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: sw(14), overflow: "hidden", borderWidth: 1.5, borderColor: "#BAE6FD", padding: sw(14), flexDirection: "row", alignItems: "center", marginBottom: sw(14) }}
        >
          <View style={{ width: sw(50), height: sw(50), borderRadius: sw(25), backgroundColor: COLORS.info, alignItems: "center", justifyContent: "center", marginRight: sw(12) }}>
            <Text style={{ fontSize: sw(22) }}>👤</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: sw(12), fontWeight: "800", color: COLORS.text }}>John Doe</Text>
            <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginTop: sw(2) }}>EMP001 • Spa Manager Operations</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Tabs */}
      <View style={{ paddingHorizontal: sw(16), marginBottom: sw(14) }}>
        <View style={{ flexDirection: "row", gap: sw(8), backgroundColor: COLORS.cardBg, borderRadius: sw(12), padding: sw(6), borderWidth: 1, borderColor: COLORS.border }}>
          {["Today", "Weekly", "All"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                flex: 1,
                paddingVertical: sw(10),
                paddingHorizontal: sw(8),
                borderRadius: sw(10),
                backgroundColor: activeTab === tab ? COLORS.info : "transparent",
                alignItems: "center",
              }}
            >
              <Text style={{
                color: activeTab === tab ? COLORS.white : COLORS.textLight,
                fontWeight: activeTab === tab ? "800" : "600",
                fontSize: sw(11),
              }}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: sw(16), paddingBottom: sw(60) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Notification */}
        {showNotification && (
          <View style={{ backgroundColor: "#DCFCE7", borderRadius: sw(10), borderLeftWidth: 4, borderLeftColor: COLORS.success, padding: sw(12), marginBottom: sw(14), flexDirection: "row", alignItems: "center" }}>
            <CheckCircle size={sw(15)} color={COLORS.success} strokeWidth={2.5} />
            <Text style={{ fontSize: sw(10), color: "#15803D", fontWeight: "700", marginLeft: sw(10) }}>
              ✓ Attendance marked successfully
            </Text>
          </View>
        )}

        {/* Location Card */}
        {activeTab === "Today" && <LocationCard location={location} sw={sw} />}

        {/* Attendance Buttons - Only on Today tab */}
        {activeTab === "Today" && (
          <AttendanceButtons
            isCheckedIn={isCheckedIn}
            isCheckedOut={isCheckedOut}
            checkInTimeDisplay={checkInTimeDisplay}
            attendanceType={attendanceType}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
            onHalfDay={handleHalfDay}
            onWorkFromHome={handleWorkFromHome}
            sw={sw}
          />
        )}

        {/* Today's Attendance */}
        {activeTab === "Today" && isCheckedIn && (
          <TodaysAttendanceCard
            isCheckedIn={isCheckedIn}
            checkInTimeDisplay={checkInTimeDisplay}
            checkOutTimeDisplay={checkOutTimeDisplay}
            duration={duration}
            location={location.latitude + ", " + location.longitude}
            attendanceType={attendanceType}
            sw={sw}
          />
        )}

        {/* Stats */}
        {activeTab === "Today" && <StatsCards daysPresent={22} avgHours={8.5} sw={sw} />}

        {/* Attendance History */}
        {(activeTab === "Weekly" || activeTab === "All") && (
          <>
            <Text style={{ fontSize: sw(13), fontWeight: "800", color: COLORS.text, marginBottom: sw(12) }}>
              {activeTab === "Weekly" ? "Weekly Attendance" : "All Attendance Records"}
            </Text>

            {filteredData.map((item, index) => (
              <AttendanceHistoryCard key={index} item={item} sw={sw} />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}
