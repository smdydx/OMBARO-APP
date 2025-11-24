import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Users, Plus, Phone, Star, Calendar } from "lucide-react-native";
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

function TherapistCard({ name, specialty, phone, rating, bookings, sw }) {
  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(14),
      marginBottom: sw(10),
    }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(12) }}>
        <View style={{
          width: sw(50),
          height: sw(50),
          borderRadius: sw(25),
          backgroundColor: `${COLORS.primary}15`,
          alignItems: "center",
          justifyContent: "center",
          marginRight: sw(12),
        }}>
          <Text style={{ fontSize: sw(18), fontWeight: "800", color: COLORS.primary }}>
            {name.charAt(0)}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: sw(14), fontWeight: "700", color: COLORS.text, marginBottom: sw(3) }}>
            {name}
          </Text>
          <Text style={{ fontSize: sw(11), color: COLORS.textSecondary }}>
            {specialty}
          </Text>
        </View>
        <View style={{
          backgroundColor: "#FEF9C3",
          paddingHorizontal: sw(8),
          paddingVertical: sw(4),
          borderRadius: sw(8),
          flexDirection: "row",
          alignItems: "center",
        }}>
          <Star size={sw(10)} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
          <Text style={{ color: "#92400E", fontSize: sw(10), fontWeight: "700", marginLeft: sw(3) }}>
            {rating}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: sw(12) }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Phone size={sw(12)} color={COLORS.textLight} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(11), color: COLORS.textSecondary, marginLeft: sw(4) }}>
            {phone}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Calendar size={sw(12)} color={COLORS.textLight} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(11), color: COLORS.textSecondary, marginLeft: sw(4) }}>
            {bookings} bookings
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function TherapistManagement({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

  const therapists = [
    { name: "Priya Sharma", specialty: "Swedish Massage Specialist", phone: "+91 98765 11111", rating: "4.9", bookings: "45" },
    { name: "Rahul Kumar", specialty: "Deep Tissue Expert", phone: "+91 98765 22222", rating: "4.8", bookings: "38" },
    { name: "Anita Desai", specialty: "Aromatherapy Specialist", phone: "+91 98765 33333", rating: "4.7", bookings: "42" },
    { name: "Vikram Singh", specialty: "Sports Massage Therapist", phone: "+91 98765 44444", rating: "4.9", bookings: "50" },
    { name: "Meera Patel", specialty: "Ayurvedic Specialist", phone: "+91 98765 55555", rating: "4.8", bookings: "35" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gradient2 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} />

      <LinearGradient
        colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]}
        style={{ height: headerHeight, justifyContent: "space-between", paddingBottom: sw(12), paddingHorizontal: sw(20) }}
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

        <View style={{ alignItems: "center", paddingBottom: sw(8) }}>
          <View style={{
            width: sw(60),
            height: sw(60),
            borderRadius: sw(16),
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: sw(8),
          }}>
            <Users size={sw(32)} color="#FFFFFF" strokeWidth={2.5} />
          </View>
          <Text style={{ 
            fontSize: sw(16), 
            fontWeight: "800", 
            color: "#FFFFFF",
            marginBottom: sw(4),
            textAlign: "center",
          }} numberOfLines={1}>
            Therapist Management
          </Text>
          <Text style={{ fontSize: sw(11), color: "rgba(255,255,255,0.9)", fontWeight: "500", textAlign: "center" }} numberOfLines={1}>
            Manage your staff and therapists
          </Text>
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
          <TouchableOpacity style={{
            backgroundColor: COLORS.primary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: sw(14),
            borderRadius: sw(12),
          }}>
            <Plus size={sw(18)} color="#FFFFFF" strokeWidth={2.5} />
            <Text style={{ 
              color: "#FFFFFF", 
              fontSize: sw(14), 
              fontWeight: "700",
              marginLeft: sw(8),
            }}>
              Add New Therapist
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: sw(20), paddingBottom: sw(100) }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text, marginBottom: sw(12) }}>
            All Therapists ({therapists.length})
          </Text>
          {therapists.map((therapist, index) => (
            <TherapistCard key={index} {...therapist} sw={sw} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
