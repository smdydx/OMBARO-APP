import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Calendar as CalendarIcon, FileText } from "lucide-react-native";
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

function LeaveCard({ type, from, to, days, status, sw }) {
  const statusColors = {
    Approved: { bg: "#DCFCE7", text: "#15803D" },
    Pending: { bg: "#FEF9C3", text: "#A16207" },
    Rejected: { bg: "#FEE2E2", text: "#B91C1C" },
  };

  const statusColor = statusColors[status] || statusColors.Pending;

  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(14),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(16),
      marginBottom: sw(12),
    }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: sw(12) }}>
        <Text style={{ fontSize: sw(15), fontWeight: "700", color: COLORS.text }}>{type}</Text>
        <View style={{
          backgroundColor: statusColor.bg,
          paddingHorizontal: sw(10),
          paddingVertical: sw(5),
          borderRadius: sw(10),
        }}>
          <Text style={{ fontSize: sw(11), fontWeight: "700", color: statusColor.text }}>{status}</Text>
        </View>
      </View>

      <View style={{ gap: sw(8) }}>
        <Text style={{ fontSize: sw(12), color: COLORS.textSecondary }}>
          From: {from} • To: {to}
        </Text>
        <Text style={{ fontSize: sw(12), color: COLORS.textLight }}>
          Duration: {days} days
        </Text>
      </View>
    </View>
  );
}

export default function LeaveManage({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

  const leaves = [
    { type: "Casual Leave", from: "Jan 20", to: "Jan 22", days: 3, status: "Pending" },
    { type: "Sick Leave", from: "Jan 10", to: "Jan 11", days: 2, status: "Approved" },
    { type: "Paid Leave", from: "Dec 24", to: "Dec 26", days: 3, status: "Approved" },
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
          <View style={{ flex: 1, alignItems: "center", marginRight: sw(42),marginTop:sw(50)  }}>
            <Text style={{ color: "#FFFFFF", fontSize: sw(20), fontWeight: "800" }}>Leave Management</Text>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(12), marginTop: sw(2) }}>
              Manage Your Leaves
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
              <Text style={{ fontSize: sw(22), fontWeight: "900", color: "#FFFFFF" }}>12</Text>
              <Text style={{ fontSize: sw(11), color: "rgba(255,255,255,0.95)", marginTop: sw(4), fontWeight: "600" }}>
                Available
              </Text>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: sw(16),
              padding: sw(14),
              alignItems: "center",
            }}>
              <Text style={{ fontSize: sw(22), fontWeight: "900", color: "#FFFFFF" }}>8</Text>
              <Text style={{ fontSize: sw(11), color: "rgba(255,255,255,0.95)", marginTop: sw(4), fontWeight: "600" }}>
                Used
              </Text>
            </View>
          </View>
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
          <TouchableOpacity style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.primary,
            borderRadius: sw(14),
            paddingVertical: sw(14),
            marginBottom: sw(20),
          }}>
            <FileText size={sw(18)} color="#FFFFFF" strokeWidth={2.5} />
            <Text style={{ fontSize: sw(15), color: "#FFFFFF", fontWeight: "700", marginLeft: sw(8) }}>
              Request New Leave
            </Text>
          </TouchableOpacity>

          <Text style={{ fontSize: sw(16), fontWeight: "700", color: COLORS.text, marginBottom: sw(16) }}>
            Recent Leaves
          </Text>
          {leaves.map((leave, index) => (
            <LeaveCard key={index} {...leave} sw={sw} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
