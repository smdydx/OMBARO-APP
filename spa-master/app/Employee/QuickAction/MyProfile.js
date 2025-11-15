import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, User, Mail, Phone, MapPin, Briefcase, Calendar, Shield, Edit3 } from "lucide-react-native";
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
        paddingVertical: sw(14),
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: "#F3F4F6",
      }}
    >
      <View style={{ 
        width: sw(40), 
        height: sw(40), 
        borderRadius: sw(20), 
        backgroundColor: `${COLORS.primary}10`,
        alignItems: "center",
        justifyContent: "center",
        marginRight: sw(12)
      }}>
        <Icon size={sw(18)} color={COLORS.primary} strokeWidth={2.5} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ 
          color: COLORS.textLight, 
          fontSize: sw(11), 
          marginBottom: sw(4),
          fontWeight: "500",
          letterSpacing: 0.3,
        }}>
          {label}
        </Text>
        <Text style={{ 
          color: COLORS.text, 
          fontSize: sw(14), 
          fontWeight: "600", 
        }}>
          {value}
        </Text>
      </View>
    </View>
  );
}

export default function MyProfile({ onBack }) {
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
          paddingTop:sw(20),
          paddingHorizontal: sw(20),
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(30),marginTop:sw(30) }}>
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
          <View style={{ flex: 1, alignItems: "center", marginRight: sw(42) }}>
            <Text style={{ color: "#FFFFFF", fontSize: sw(20), fontWeight: "800" }}>My Profile</Text>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(12), marginTop: sw(2) }}>
              Personal Information
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{
            width: sw(90),
            height: sw(90),
            borderRadius: sw(45),
            backgroundColor: "rgba(255,255,255,0.25)",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 3,
            borderColor: "rgba(255,255,255,0.4)",
          }}>
            <User size={sw(45)} color="#FFFFFF" strokeWidth={2} />
          </View>
          <Text style={{ 
            color: "#FFFFFF", 
            fontSize: sw(18), 
            fontWeight: "800",
            marginTop: sw(12),
          }}>
            Rahul Kumar
          </Text>
          <Text style={{ 
            color: "rgba(255,255,255,0.9)", 
            fontSize: sw(13),
            marginTop: sw(4),
          }}>
            Spa Manager
          </Text>
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
          contentContainerStyle={{ 
            paddingTop: sw(24), 
            paddingHorizontal: sw(20), 
            paddingBottom: sw(40) 
          }} 
          showsVerticalScrollIndicator={false}
        >
          <View style={{
            backgroundColor: COLORS.cardBg,
            borderRadius: sw(16),
            padding: sw(18),
            borderWidth: 1,
            borderColor: COLORS.border,
          }}>
            <InfoRow icon={Mail} label="EMAIL" value="rahul.kumar@spa.com" sw={sw} />
            <InfoRow icon={Phone} label="PHONE" value="+91 98765 43210" sw={sw} />
            <InfoRow icon={MapPin} label="LOCATION" value="Mumbai, Maharashtra" sw={sw} />
            <InfoRow icon={Briefcase} label="DEPARTMENT" value="Operations" sw={sw} />
            <InfoRow icon={Calendar} label="JOINING DATE" value="15 Jan 2023" sw={sw} />
            <InfoRow icon={Shield} label="EMPLOYEE ID" value="SPA-2023-001" sw={sw} isLast={true} />
          </View>

          <TouchableOpacity style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.primary,
            borderRadius: sw(14),
            paddingVertical: sw(14),
            marginTop: sw(20),
          }}>
            <Edit3 size={sw(18)} color="#FFFFFF" strokeWidth={2.5} />
            <Text style={{ 
              fontSize: sw(15), 
              color: "#FFFFFF", 
              fontWeight: "700",
              marginLeft: sw(8),
            }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
