import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Calendar, Clock, User, Phone } from "lucide-react-native";
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

function BookingCard({ customer, service, therapist, time, date, status, phone, sw }) {
  const statusColors = {
    Confirmed: { bg: "#DCFCE7", text: "#15803D" },
    Pending: { bg: "#FEF9C3", text: "#A16207" },
    Completed: { bg: "#DBEAFE", text: "#1E40AF" },
    Cancelled: { bg: "#FEE2E2", text: "#B91C1C" },
  };

  const statusColor = statusColors[status] || statusColors.Pending;

  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
      marginBottom: sw(10),
    }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: sw(10) }}>
        <Text style={{ fontSize: sw(14), fontWeight: "700", color: COLORS.text }}>{service}</Text>
        <View style={{
          backgroundColor: statusColor.bg,
          paddingHorizontal: sw(8),
          paddingVertical: sw(4),
          borderRadius: sw(8),
        }}>
          <Text style={{ fontSize: sw(10), fontWeight: "700", color: statusColor.text }}>{status}</Text>
        </View>
      </View>

      <View style={{ gap: sw(6) }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <User size={sw(12)} color={COLORS.textLight} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(11), color: COLORS.textSecondary, marginLeft: sw(6) }}>
            {customer} {phone && `• ${phone}`}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Calendar size={sw(12)} color={COLORS.textLight} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(11), color: COLORS.textSecondary, marginLeft: sw(6) }}>
            {date} • {time}
          </Text>
        </View>
        {therapist && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <User size={sw(12)} color={COLORS.textLight} strokeWidth={2.5} />
            <Text style={{ fontSize: sw(11), color: COLORS.textSecondary, marginLeft: sw(6) }}>
              Therapist: {therapist}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default function BookingManagement({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();
  const [tab, setTab] = useState("upcoming");

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

  const bookings = {
    upcoming: [
      { customer: "Rahul Sharma", service: "Swedish Massage", therapist: "Priya Sharma", time: "2:00 PM", date: "Dec 24, 2024", status: "Confirmed", phone: "+91 98765 11111" },
      { customer: "Anita Patel", service: "Facial Treatment", therapist: "Meera Desai", time: "4:00 PM", date: "Dec 24, 2024", status: "Confirmed", phone: "+91 98765 22222" },
      { customer: "Vikram Singh", service: "Deep Tissue Massage", therapist: "Rahul Kumar", time: "11:00 AM", date: "Dec 25, 2024", status: "Pending", phone: "+91 98765 33333" },
    ],
    completed: [
      { customer: "Priya Kumar", service: "Aromatherapy", therapist: "Anita Desai", time: "10:00 AM", date: "Dec 23, 2024", status: "Completed" },
      { customer: "Meera Sharma", service: "Hair Spa", therapist: "Priya Sharma", time: "1:00 PM", date: "Dec 22, 2024", status: "Completed" },
    ],
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gradient2 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} />

      <LinearGradient
        colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]}
        style={{ height: headerHeight }}
      >
        <View style={{ 
          paddingTop: Platform.OS === "ios" ? sw(50) : sw(40), 
          paddingHorizontal: sw(20),
          flex: 1,
        }}>
          <TouchableOpacity
            onPress={onBack}
            style={{
              width: sw(40),
              height: sw(40),
              borderRadius: sw(20),
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: sw(20),
            }}
          >
            <ArrowLeft size={sw(22)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={{
              width: sw(80),
              height: sw(80),
              borderRadius: sw(20),
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: sw(15),
            }}>
              <Calendar size={sw(40)} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <Text style={{ 
              fontSize: sw(26), 
              fontWeight: "800", 
              color: "#FFFFFF",
              marginBottom: sw(8),
            }}>
              Booking Management
            </Text>
            <Text style={{ fontSize: sw(13), color: "rgba(255,255,255,0.9)", fontWeight: "500" }}>
              Manage customer bookings
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={{
        height: contentHeight,
        backgroundColor: COLORS.bg,
        borderTopLeftRadius: sw(24),
        borderTopRightRadius: sw(24),
        marginTop: -sw(20),
        paddingTop: sw(20),
      }}>
        <View style={{ paddingHorizontal: sw(20), marginBottom: sw(15) }}>
          <View style={{ flexDirection: "row", gap: sw(10) }}>
            <TouchableOpacity
              onPress={() => setTab("upcoming")}
              style={{
                flex: 1,
                paddingVertical: sw(10),
                borderRadius: sw(10),
                backgroundColor: tab === "upcoming" ? COLORS.primary : "transparent",
                borderWidth: 1,
                borderColor: tab === "upcoming" ? COLORS.primary : COLORS.border,
                alignItems: "center",
              }}
            >
              <Text style={{
                fontSize: sw(12),
                fontWeight: "700",
                color: tab === "upcoming" ? "#FFFFFF" : COLORS.textSecondary,
              }}>
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab("completed")}
              style={{
                flex: 1,
                paddingVertical: sw(10),
                borderRadius: sw(10),
                backgroundColor: tab === "completed" ? COLORS.primary : "transparent",
                borderWidth: 1,
                borderColor: tab === "completed" ? COLORS.primary : COLORS.border,
                alignItems: "center",
              }}
            >
              <Text style={{
                fontSize: sw(12),
                fontWeight: "700",
                color: tab === "completed" ? "#FFFFFF" : COLORS.textSecondary,
              }}>
                Completed
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: sw(20), paddingBottom: sw(100) }}
          showsVerticalScrollIndicator={false}
        >
          {bookings[tab].map((booking, index) => (
            <BookingCard key={index} {...booking} sw={sw} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
