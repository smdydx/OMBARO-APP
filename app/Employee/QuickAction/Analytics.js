import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, TrendingUp, Users, DollarSign, Star } from "lucide-react-native";
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

export default function Analytics({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

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
            <Text style={{ color: "#FFFFFF", fontSize: sw(20), fontWeight: "800" }}>Analytics</Text>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(12), marginTop: sw(2) }}>
              Performance Overview
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: sw(10) }}>
          <View style={{ flexDirection: "row", gap: sw(12) }}>
            <View style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.25)",
              borderRadius: sw(16),
              padding: sw(14),
              alignItems: "center",
            }}>
              <TrendingUp size={sw(26)} color="#FFFFFF" strokeWidth={2} />
              <Text style={{ fontSize: sw(18), fontWeight: "900", color: "#FFFFFF", marginTop: sw(8) }}>
                +25%
              </Text>
              <Text style={{ fontSize: sw(11), color: "rgba(255,255,255,0.95)", marginTop: sw(4), fontWeight: "600" }}>
                Growth
              </Text>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.25)",
              borderRadius: sw(16),
              padding: sw(14),
              alignItems: "center",
            }}>
              <Users size={sw(26)} color="#FFFFFF" strokeWidth={2} />
              <Text style={{ fontSize: sw(18), fontWeight: "900", color: "#FFFFFF", marginTop: sw(8) }}>
                234
              </Text>
              <Text style={{ fontSize: sw(11), color: "rgba(255,255,255,0.95)", marginTop: sw(4), fontWeight: "600" }}>
                Clients
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
            Key Metrics
          </Text>

          <View style={{ flexDirection: "row", gap: sw(10), marginBottom: sw(10) }}>
            <StatCard icon={Users} label="Total Clients" value="234" trend="+12%" color="#7C3AED" sw={sw} />
            <StatCard icon={DollarSign} label="Revenue" value="₹45K" trend="+18%" color="#10B981" sw={sw} />
          </View>

          <View style={{ flexDirection: "row", gap: sw(10), marginBottom: sw(10) }}>
            <StatCard icon={Star} label="Rating" value="4.8" color="#F59E0B" sw={sw} />
            <StatCard icon={TrendingUp} label="Growth" value="+25%" color="#0EA5E9" sw={sw} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
