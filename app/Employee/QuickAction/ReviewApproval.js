import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react-native";
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

function ApprovalCard({ title, requester, date, status, sw }) {
  const statusConfig = {
    pending: { color: COLORS.warning, icon: Clock, label: "Pending" },
    approved: { color: COLORS.success, icon: CheckCircle, label: "Approved" },
    rejected: { color: COLORS.danger, icon: XCircle, label: "Rejected" },
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
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(8) }}>
        <View style={{
          backgroundColor: `${config.color}15`,
          paddingHorizontal: sw(10),
          paddingVertical: sw(5),
          borderRadius: sw(12),
          flexDirection: "row",
          alignItems: "center",
        }}>
          <StatusIcon size={sw(11)} color={config.color} strokeWidth={2.5} />
          <Text style={{ color: config.color, fontSize: sw(10), marginLeft: sw(5), fontWeight: "700" }}>
            {config.label}
          </Text>
        </View>
      </View>

      <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(5) }}>
        {title}
      </Text>
      <Text style={{ fontSize: sw(11), color: COLORS.textSecondary, marginBottom: sw(3) }}>
        Requested by: {requester}
      </Text>
      <Text style={{ fontSize: sw(10), color: COLORS.textLight }}>
        {date}
      </Text>

      {status === "pending" && (
        <View style={{ flexDirection: "row", gap: sw(8), marginTop: sw(12) }}>
          <TouchableOpacity style={{
            flex: 1,
            paddingVertical: sw(8),
            borderRadius: sw(8),
            backgroundColor: `${COLORS.success}15`,
            borderWidth: 1,
            borderColor: COLORS.success,
            alignItems: "center",
          }}>
            <Text style={{ fontSize: sw(11), color: COLORS.success, fontWeight: "700" }}>
              Approve
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            flex: 1,
            paddingVertical: sw(8),
            borderRadius: sw(8),
            backgroundColor: `${COLORS.danger}15`,
            borderWidth: 1,
            borderColor: COLORS.danger,
            alignItems: "center",
          }}>
            <Text style={{ fontSize: sw(11), color: COLORS.danger, fontWeight: "700" }}>
              Reject
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function ReviewApproval({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

  const approvals = [
    { id: 1, title: "Leave Request - 3 Days", requester: "Rahul Kumar", date: "Jan 15, 2025", status: "pending" },
    { id: 2, title: "Expense Claim - ₹5,000", requester: "Priya Sharma", date: "Jan 14, 2025", status: "pending" },
    { id: 3, title: "Overtime Request", requester: "Amit Singh", date: "Jan 13, 2025", status: "approved" },
    { id: 4, title: "Equipment Purchase", requester: "Neha Patel", date: "Jan 12, 2025", status: "rejected" },
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
            Review & Approvals
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: sw(10), textAlign: "center" }}>
            Pending Requests
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: sw(10) }}>
          <View style={{
            flex: 1,
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: sw(12),
            padding: sw(12),
            alignItems: "center",
          }}>
            <Text style={{ fontSize: sw(18), fontWeight: "900", color: "#FFFFFF" }}>4</Text>
            <Text style={{ fontSize: sw(10), color: "rgba(255,255,255,0.95)", marginTop: sw(3), fontWeight: "600" }}>
              Total
            </Text>
          </View>
          <View style={{
            flex: 1,
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: sw(12),
            padding: sw(12),
            alignItems: "center",
          }}>
            <Text style={{ fontSize: sw(18), fontWeight: "900", color: "#FFFFFF" }}>2</Text>
            <Text style={{ fontSize: sw(10), color: "rgba(255,255,255,0.95)", marginTop: sw(3), fontWeight: "600" }}>
              Pending
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={{ 
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: sw(28),
        borderTopRightRadius: sw(28),
        marginTop: 0,
      }}>
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: sw(18), paddingHorizontal: sw(16), paddingBottom: sw(120) }} 
          showsVerticalScrollIndicator={false}
        >
          {approvals.map((approval) => (
            <ApprovalCard key={approval.id} {...approval} sw={sw} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
