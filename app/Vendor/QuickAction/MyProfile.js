import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Building2, Mail, Phone, MapPin, Clock, Star, Edit3 } from "lucide-react-native";
import {
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
    TouchableOpacity,
    ScrollView,
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

function InfoRow({ icon: Icon, label, value, sw, isLast }) {
  return (
    <View 
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: sw(10),
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: "#F3F4F6",
      }}
    >
      <View style={{ 
        width: sw(32), 
        height: sw(32), 
        borderRadius: sw(16), 
        backgroundColor: `${COLORS.primary}10`,
        alignItems: "center",
        justifyContent: "center",
        marginRight: sw(10)
      }}>
        <Icon size={sw(15)} color={COLORS.primary} strokeWidth={2.5} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ 
          color: COLORS.textLight, 
          fontSize: sw(9), 
          marginBottom: sw(3),
          fontWeight: "500",
          letterSpacing: 0.3,
        }}>
          {label}
        </Text>
        <Text style={{ 
          color: COLORS.text, 
          fontSize: sw(12), 
          fontWeight: "600", 
        }}>
          {value}
        </Text>
      </View>
    </View>
  );
}

function StatCard({ label, value, sw }) {
  return (
    <View style={{
      flex: 1,
      minWidth: sw(90),
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
      alignItems: "center",
      justifyContent: "center",
      minHeight: sw(80),
    }}>
      <Text style={{ fontSize: sw(22), fontWeight: "800", color: COLORS.primary }}>
        {value}
      </Text>
      <Text style={{ fontSize: sw(9), color: COLORS.textSecondary, marginTop: sw(4), textAlign: "center" }}>
        {label}
      </Text>
    </View>
  );
}

export default function MyProfile({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();

  const isMobile = width < 480;
  const headerHeight = height * 0.333;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={COLORS.gradient2}
      />

      <LinearGradient
        colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]}
        style={{ height: headerHeight, justifyContent: "space-between", paddingBottom: sw(15), paddingHorizontal: sw(20) }}
      >
        <View style={{ paddingTop: Platform.OS === "ios" ? sw(50) : sw(40) }}>
          <TouchableOpacity
            onPress={onBack}
            style={{
              width: sw(40),
              height: sw(40),
              borderRadius: sw(20),
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowLeft size={sw(22)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", flex: 1, justifyContent: "flex-end", paddingBottom: sw(8) }}>
          <View style={{
            width: sw(70),
            height: sw(70),
            borderRadius: sw(35),
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: sw(8),
            borderWidth: 2,
            borderColor: "rgba(255,255,255,0.3)",
          }}>
            <Building2 size={sw(34)} color="#FFFFFF" strokeWidth={2.5} />
          </View>
          <Text style={{ 
            fontSize: sw(16), 
            fontWeight: "800", 
            color: "#FFFFFF",
            marginBottom: sw(5),
            textAlign: "center",
          }} numberOfLines={1}>
            Ombarc Spa & Wellness
          </Text>
          <View style={{ 
            flexDirection: "row", 
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.2)",
            paddingHorizontal: sw(10),
            paddingVertical: sw(4),
            borderRadius: sw(16),
          }}>
            <Star size={sw(12)} color="#FFD700" fill="#FFD700" strokeWidth={0} />
            <Text style={{ color: "#FFFFFF", fontSize: sw(10), fontWeight: "700", marginLeft: sw(4) }}>
              4.8 Rating
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={{
        flex: 1,
        backgroundColor: COLORS.bg,
        borderTopLeftRadius: sw(24),
        borderTopRightRadius: sw(24),
        marginTop: -sw(12),
        paddingTop: sw(16),
        overflow: "hidden",
      }}>
        <ScrollView
          contentContainerStyle={{ 
            paddingHorizontal: sw(20), 
            paddingBottom: sw(40) 
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ 
            flexDirection: "row", 
            justifyContent: "space-between", 
            alignItems: "center",
            marginBottom: sw(20),
          }}>
            <Text style={{ 
              fontSize: sw(18), 
              fontWeight: "800", 
              color: COLORS.text 
            }}>
              Business Information
            </Text>
            <TouchableOpacity style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: COLORS.primary,
              paddingHorizontal: sw(16),
              paddingVertical: sw(8),
              borderRadius: sw(20),
            }}>
              <Edit3 size={sw(14)} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={{ 
                color: "#FFFFFF", 
                fontSize: sw(12), 
                fontWeight: "700",
                marginLeft: sw(6),
              }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{
            backgroundColor: COLORS.cardBg,
            borderRadius: sw(16),
            borderWidth: 1,
            borderColor: COLORS.border,
            padding: sw(16),
          }}>
            <InfoRow icon={Building2} label="Business Name" value="Ombarc Spa & Wellness" sw={sw} />
            <InfoRow icon={Mail} label="Email" value="vendor@ombarc.com" sw={sw} />
            <InfoRow icon={Phone} label="Phone" value="+91 98765 43210" sw={sw} />
            <InfoRow icon={MapPin} label="Location" value="Mumbai, Maharashtra" sw={sw} />
            <InfoRow icon={Clock} label="Working Hours" value="9:00 AM - 9:00 PM" sw={sw} isLast />
          </View>

          <View style={{ marginTop: sw(16), marginBottom: sw(20) }}>
            <Text style={{ 
              fontSize: sw(16), 
              fontWeight: "800", 
              color: COLORS.text,
              marginBottom: sw(12),
            }}>
              Business Stats
            </Text>
            <View style={{ flexDirection: "row", gap: sw(10), flexWrap: "wrap" }}>
              <StatCard label="Total Bookings" value="250+" sw={sw} />
              <StatCard label="Services" value="15" sw={sw} />
              <StatCard label="Therapists" value="8" sw={sw} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
