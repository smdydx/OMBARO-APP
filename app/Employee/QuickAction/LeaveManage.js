import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Calendar as CalendarIcon, Send, CheckCircle, Clock, AlertCircle } from "lucide-react-native";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  TextInput,
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

function LeaveBalanceCard({ type, balance, color, sw }) {
  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      marginRight: sw(8),
    }}>
      <Text style={{ fontSize: sw(18), fontWeight: "800", color, marginBottom: sw(4) }}>
        {balance}
      </Text>
      <Text style={{ fontSize: sw(10), color: COLORS.textLight, textAlign: "center" }}>
        {type}
      </Text>
    </View>
  );
}

function LeaveHistoryCard({ type, from, to, days, reason, appliedDate, approvedDate, approver, status, sw }) {
  const statusColors = {
    Approved: { bg: "#DCFCE7", text: "#15803D", icon: CheckCircle },
    Pending: { bg: "#FEF9C3", text: "#A16207", icon: Clock },
    Rejected: { bg: "#FEE2E2", text: "#B91C1C", icon: AlertCircle },
  };

  const statusColor = statusColors[status] || statusColors.Pending;
  const IconComponent = statusColor.icon;

  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
      marginBottom: sw(12),
    }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: sw(8) }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(4) }}>
            {type}
          </Text>
          <Text style={{ fontSize: sw(10), color: COLORS.textSecondary }}>
            {from} - {to}
          </Text>
          <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginTop: sw(2) }}>
            {days} days
          </Text>
        </View>
        <View style={{
          backgroundColor: statusColor.bg,
          paddingHorizontal: sw(10),
          paddingVertical: sw(5),
          borderRadius: sw(8),
          flexDirection: "row",
          alignItems: "center",
          gap: sw(4),
        }}>
          <IconComponent size={sw(14)} color={statusColor.text} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(10), fontWeight: "700", color: statusColor.text }}>
            {status}
          </Text>
        </View>
      </View>

      <View style={{ backgroundColor: COLORS.white, borderRadius: sw(8), padding: sw(10), marginBottom: sw(8) }}>
        <Text style={{ fontSize: sw(10), color: COLORS.textLight, marginBottom: sw(4) }}>
          Reason:
        </Text>
        <Text style={{ fontSize: sw(10), color: COLORS.text, fontWeight: "500", marginBottom: sw(6) }}>
          {reason}
        </Text>
        <View style={{ borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: sw(6) }}>
          <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginBottom: sw(2) }}>
            Applied: {appliedDate}
          </Text>
          {approvedDate && (
            <Text style={{ fontSize: sw(9), color: COLORS.textLight }}>
              Approved: {approvedDate} by {approver}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

export default function LeaveManage({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();
  const [activeTab, setActiveTab] = useState("Apply");
  const [leaveType, setLeaveType] = useState("Casual");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const leaveBalance = [
    { type: "Casual Leave", balance: 8, color: "#A855F7" },
    { type: "Sick Leave", balance: 5, color: "#3B82F6" },
    { type: "Earned Leave", balance: 15, color: "#F59E0B" },
    { type: "Maternity Leave", balance: 180, color: "#EC4899" },
    { type: "Paternity Leave", balance: 15, color: "#06B6D4" },
    { type: "Emergency Leave", balance: 3, color: "#EF4444" },
  ];

  const leaveHistory = [
    {
      type: "Casual Leave",
      from: "1/30/2025",
      to: "1/02/2025",
      days: 3,
      reason: "Family function",
      appliedDate: "1/5/2025",
      approvedDate: "1/6/2025",
      approver: "Manager",
      status: "Approved",
    },
    {
      type: "Sick Leave",
      from: "12/20/2024",
      to: "12/22/2024",
      days: 3,
      reason: "Fever and cold",
      appliedDate: "12/18/2024",
      approvedDate: "12/19/2024",
      approver: "Manager",
      status: "Approved",
    },
    {
      type: "Earned Leave",
      from: "2/15/2025",
      to: "2/20/2025",
      days: 6,
      reason: "Vacation with family",
      appliedDate: "1/30/2025",
      approvedDate: null,
      approver: null,
      status: "Pending",
    },
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
            Leave Management
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: sw(10), textAlign: "center" }}>
            Apply for leave or view history
          </Text>
        </View>

        <View style={{
          backgroundColor: "rgba(255,255,255,0.15)",
          borderRadius: sw(12),
          padding: sw(4),
          flexDirection: "row",
          gap: sw(4),
        }}>
          {["Apply", "History"].map((label) => (
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
                {label} Leave
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
          {activeTab === "Apply" && (
            <>
              {/* Leave Balance Section */}
              <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(12) }}>
                Leave Balance
              </Text>
              <View style={{ marginBottom: sw(16) }}>
                {Array.from({ length: Math.ceil(leaveBalance.length / 3) }).map((_, rowIdx) => (
                  <View key={rowIdx} style={{ flexDirection: "row", marginBottom: sw(8) }}>
                    {leaveBalance.slice(rowIdx * 3, rowIdx * 3 + 3).map((leave, colIdx) => (
                      <View key={colIdx} style={{ flex: 1, marginRight: colIdx < 2 ? sw(8) : 0 }}>
                        <LeaveBalanceCard {...leave} sw={sw} />
                      </View>
                    ))}
                    {rowIdx === Math.ceil(leaveBalance.length / 3) - 1 &&
                      Array.from({
                        length: 3 - (leaveBalance.length % 3 === 0 ? 3 : leaveBalance.length % 3),
                      }).map((_, idx) => (
                        <View key={`empty-${idx}`} style={{ flex: 1, marginRight: idx < 2 ? sw(8) : 0 }} />
                      ))}
                  </View>
                ))}
              </View>

              {/* Apply for Leave Form */}
              <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(12) }}>
                Apply for Leave
              </Text>

              {/* Leave Type Dropdown */}
              <View style={{ marginBottom: sw(12) }}>
                <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.text, marginBottom: sw(6) }}>
                  Leave Type
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDropdown(!showDropdown)}
                  style={{
                    backgroundColor: COLORS.cardBg,
                    borderRadius: sw(10),
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    paddingHorizontal: sw(12),
                    paddingVertical: sw(11),
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: sw(12), color: COLORS.text, fontWeight: "500" }}>
                    {leaveType} (Balance: {leaveBalance.find(l => l.type.includes(leaveType))?.balance})
                  </Text>
                  <Text style={{ fontSize: sw(16), color: COLORS.textLight }}>▼</Text>
                </TouchableOpacity>
                
                {showDropdown && (
                  <View style={{
                    backgroundColor: COLORS.white,
                    borderRadius: sw(10),
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    marginTop: sw(6),
                    overflow: "hidden",
                  }}>
                    {["Casual", "Sick", "Earned", "Maternity", "Paternity", "Emergency"].map((type) => (
                      <TouchableOpacity
                        key={type}
                        onPress={() => {
                          setLeaveType(type);
                          setShowDropdown(false);
                        }}
                        style={{
                          paddingHorizontal: sw(12),
                          paddingVertical: sw(10),
                          borderBottomWidth: 1,
                          borderBottomColor: COLORS.border,
                        }}
                      >
                        <Text style={{ fontSize: sw(11), color: COLORS.text }}>
                          {type} Leave
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* From Date */}
              <View style={{ marginBottom: sw(12) }}>
                <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.text, marginBottom: sw(6) }}>
                  From Date
                </Text>
                <View style={{
                  backgroundColor: COLORS.cardBg,
                  borderRadius: sw(10),
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  paddingHorizontal: sw(12),
                  paddingVertical: sw(11),
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                  <TextInput
                    placeholder="mm/dd/yyyy"
                    value={fromDate}
                    onChangeText={setFromDate}
                    style={{ flex: 1, fontSize: sw(12), color: COLORS.text }}
                    placeholderTextColor={COLORS.textLight}
                  />
                  <CalendarIcon size={sw(16)} color={COLORS.textLight} strokeWidth={2.5} />
                </View>
              </View>

              {/* To Date */}
              <View style={{ marginBottom: sw(12) }}>
                <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.text, marginBottom: sw(6) }}>
                  To Date
                </Text>
                <View style={{
                  backgroundColor: COLORS.cardBg,
                  borderRadius: sw(10),
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  paddingHorizontal: sw(12),
                  paddingVertical: sw(11),
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                  <TextInput
                    placeholder="mm/dd/yyyy"
                    value={toDate}
                    onChangeText={setToDate}
                    style={{ flex: 1, fontSize: sw(12), color: COLORS.text }}
                    placeholderTextColor={COLORS.textLight}
                  />
                  <CalendarIcon size={sw(16)} color={COLORS.textLight} strokeWidth={2.5} />
                </View>
              </View>

              {/* Reason */}
              <View style={{ marginBottom: sw(12) }}>
                <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.text, marginBottom: sw(6) }}>
                  Reason
                </Text>
                <TextInput
                  placeholder="Please provide reason for leave..."
                  value={reason}
                  onChangeText={setReason}
                  multiline
                  numberOfLines={4}
                  style={{
                    backgroundColor: COLORS.cardBg,
                    borderRadius: sw(10),
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    paddingHorizontal: sw(12),
                    paddingVertical: sw(11),
                    fontSize: sw(11),
                    color: COLORS.text,
                    textAlignVertical: "top",
                  }}
                  placeholderTextColor={COLORS.textLight}
                />
              </View>

              {/* Submit Button */}
              <TouchableOpacity style={{
                backgroundColor: COLORS.primary,
                borderRadius: sw(10),
                paddingVertical: sw(12),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: sw(8),
              }}>
                <Send size={sw(15)} color="#FFFFFF" strokeWidth={2.5} />
                <Text style={{ fontSize: sw(12), fontWeight: "700", color: "#FFFFFF" }}>
                  Submit Request
                </Text>
              </TouchableOpacity>
            </>
          )}

          {activeTab === "History" && (
            <>
              <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(12) }}>
                Leave History
              </Text>
              {leaveHistory.map((leave, index) => (
                <LeaveHistoryCard key={index} {...leave} sw={sw} />
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
