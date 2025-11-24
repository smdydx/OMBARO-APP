import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, DollarSign, TrendingUp, Calendar, CreditCard } from "lucide-react-native";
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
};

function useScale() {
  const { width, height } = useWindowDimensions();
  const base = Math.min(width, 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw, width, height };
}

function StatCard({ icon: Icon, label, value, trend, color, sw }) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
    }}>
      <View style={{
        width: sw(36),
        height: sw(36),
        borderRadius: sw(10),
        backgroundColor: `${color}10`,
        borderColor: `${color}30`,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: sw(10),
      }}>
        <Icon size={sw(18)} color={color} strokeWidth={2.5} />
      </View>
      <Text style={{ fontWeight: "800", fontSize: sw(20), color: COLORS.text, marginBottom: sw(3) }}>
        {value}
      </Text>
      <Text style={{ color: COLORS.textSecondary, fontWeight: "500", fontSize: sw(10), marginBottom: sw(4) }}>
        {label}
      </Text>
      {trend && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TrendingUp size={sw(10)} color="#10B981" strokeWidth={2.5} />
          <Text style={{ color: "#10B981", fontWeight: "600", fontSize: sw(9), marginLeft: sw(3) }}>
            {trend}
          </Text>
        </View>
      )}
    </View>
  );
}

function TransactionCard({ date, service, amount, customer, sw }) {
  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
      marginBottom: sw(10),
    }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: sw(8) }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(3) }}>
            {service}
          </Text>
          <Text style={{ fontSize: sw(10), color: COLORS.textSecondary }}>
            {customer}
          </Text>
        </View>
        <View style={{
          backgroundColor: "#D1FAE5",
          paddingHorizontal: sw(10),
          paddingVertical: sw(5),
          borderRadius: sw(8),
        }}>
          <Text style={{ fontSize: sw(12), fontWeight: "800", color: "#059669" }}>
            ₹{amount}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Calendar size={sw(11)} color={COLORS.textLight} strokeWidth={2.5} />
        <Text style={{ fontSize: sw(10), color: COLORS.textLight, marginLeft: sw(4) }}>
          {date}
        </Text>
      </View>
    </View>
  );
}

export default function RevenueReports({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

  const transactions = [
    { date: "Dec 23, 2024", service: "Swedish Massage", amount: "2,500", customer: "Rahul Sharma" },
    { date: "Dec 23, 2024", service: "Deep Tissue Massage", amount: "3,500", customer: "Priya Patel" },
    { date: "Dec 22, 2024", service: "Aromatherapy", amount: "3,000", customer: "Anita Kumar" },
    { date: "Dec 22, 2024", service: "Facial Treatment", amount: "1,800", customer: "Vikram Singh" },
    { date: "Dec 21, 2024", service: "Hair Spa", amount: "2,200", customer: "Meera Desai" },
  ];

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
              <DollarSign size={sw(40)} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <Text style={{ 
              fontSize: sw(26), 
              fontWeight: "800", 
              color: "#FFFFFF",
              marginBottom: sw(8),
            }}>
              Revenue Reports
            </Text>
            <Text style={{ fontSize: sw(13), color: "rgba(255,255,255,0.9)", fontWeight: "500" }}>
              Track your earnings and revenue
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
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: sw(20), paddingBottom: sw(100) }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text, marginBottom: sw(12) }}>
            Revenue Overview
          </Text>
          <View style={{ flexDirection: "row", gap: sw(12), marginBottom: sw(20) }}>
            <StatCard icon={DollarSign} label="Today's Revenue" value="₹18K" trend="+12%" color={COLORS.primary} sw={sw} />
            <StatCard icon={CreditCard} label="Total Bookings" value="45" trend="+8%" color="#F59E0B" sw={sw} />
          </View>

          <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text, marginBottom: sw(12) }}>
            Recent Transactions
          </Text>
          {transactions.map((transaction, index) => (
            <TransactionCard key={index} {...transaction} sw={sw} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
