import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Briefcase, Phone, Mail, MapPin, Star, TrendingUp } from "lucide-react-native";
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

function VendorCard({ name, category, location, rating, performance, sw }) {
  return (
    <TouchableOpacity style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(14),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(16),
      marginBottom: sw(12),
    }} activeOpacity={0.7}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(12) }}>
        <View style={{
          width: sw(48),
          height: sw(48),
          borderRadius: sw(24),
          backgroundColor: `${COLORS.primaryLight}15`,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Briefcase size={sw(22)} color={COLORS.primary} strokeWidth={2.5} />
        </View>
        <View style={{ flex: 1, marginLeft: sw(12) }}>
          <Text style={{ fontSize: sw(15), fontWeight: "700", color: COLORS.text }}>{name}</Text>
          <Text style={{ fontSize: sw(12), color: COLORS.textSecondary, marginTop: sw(2) }}>{category}</Text>
        </View>
        <View style={{
          paddingHorizontal: sw(10),
          paddingVertical: sw(6),
          backgroundColor: "#FEF3C7",
          borderRadius: sw(12),
          flexDirection: "row",
          alignItems: "center",
        }}>
          <Star size={sw(13)} color="#F59E0B" strokeWidth={2.5} fill="#F59E0B" />
          <Text style={{ fontSize: sw(12), color: "#92400E", fontWeight: "700", marginLeft: sw(4) }}>
            {rating}
          </Text>
        </View>
      </View>

      <View style={{ gap: sw(8) }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MapPin size={sw(14)} color={COLORS.textLight} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(12), color: COLORS.textSecondary, marginLeft: sw(6) }}>{location}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TrendingUp size={sw(14)} color="#10B981" strokeWidth={2.5} />
          <Text style={{ fontSize: sw(12), color: "#10B981", fontWeight: "600", marginLeft: sw(6) }}>
            Performance: {performance}%
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: sw(10), marginTop: sw(14) }}>
        <TouchableOpacity style={{
          flex: 1,
          paddingVertical: sw(10),
          borderRadius: sw(10),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: `${COLORS.primary}10`,
          borderWidth: 1,
          borderColor: `${COLORS.primary}30`,
        }}>
          <Phone size={sw(15)} color={COLORS.primary} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(13), color: COLORS.primary, fontWeight: "700", marginLeft: sw(6) }}>
            Call
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          flex: 1,
          paddingVertical: sw(10),
          borderRadius: sw(10),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: `${COLORS.primary}10`,
          borderWidth: 1,
          borderColor: `${COLORS.primary}30`,
        }}>
          <Mail size={sw(15)} color={COLORS.primary} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(13), color: COLORS.primary, fontWeight: "700", marginLeft: sw(6) }}>
            Email
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function VendorRelations({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

  const vendors = [
    { id: 1, name: "Luxury Spa Supplies", category: "Equipment Supplier", location: "Mumbai, MH", rating: "4.8", performance: "95" },
    { id: 2, name: "Organic Beauty Products", category: "Product Vendor", location: "Delhi, DL", rating: "4.6", performance: "92" },
    { id: 3, name: "Wellness Training Inc", category: "Training Partner", location: "Bangalore, KA", rating: "4.9", performance: "98" },
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
          <View style={{ flex: 1, alignItems: "center", marginRight: sw(42) }}>
            <Text style={{ color: "#FFFFFF", fontSize: sw(20), fontWeight: "800",marginTop:sw(50)  }}>
              Vendor Relations
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(12), marginTop: sw(2) }}>
              Partner Management
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: sw(10) }}>
          <View style={{
            backgroundColor: "rgba(255,255,255,0.25)",
            borderRadius: sw(16),
            padding: sw(16),
            alignItems: 'center',
          }}>
            <Briefcase size={sw(36)} color="#FFFFFF" strokeWidth={2} />
            <Text style={{ 
              color: "#FFFFFF", 
              fontSize: sw(20), 
              fontWeight: "900",
              marginTop: sw(10),
            }}>
              {vendors.length}
            </Text>
            <Text style={{ 
              color: "rgba(255,255,255,0.95)", 
              fontSize: sw(12), 
              fontWeight: "600",
              marginTop: sw(4),
            }}>
              Active Partners
            </Text>
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
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} {...vendor} sw={sw} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
