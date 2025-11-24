import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Star, ThumbsUp } from "lucide-react-native";
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

function ReviewCard({ customer, service, rating, comment, date, sw }) {
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
            {customer}
          </Text>
          <Text style={{ fontSize: sw(11), color: COLORS.textSecondary }}>
            {service}
          </Text>
        </View>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#FEF9C3",
          paddingHorizontal: sw(8),
          paddingVertical: sw(4),
          borderRadius: sw(8),
        }}>
          <Star size={sw(11)} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
          <Text style={{ fontSize: sw(11), fontWeight: "700", color: "#92400E", marginLeft: sw(3) }}>
            {rating}
          </Text>
        </View>
      </View>

      <Text style={{ fontSize: sw(12), color: COLORS.text, lineHeight: sw(18), marginBottom: sw(8) }}>
        {comment}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: sw(10), color: COLORS.textLight }}>
          {date}
        </Text>
        <TouchableOpacity style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: `${COLORS.primary}10`,
          paddingHorizontal: sw(10),
          paddingVertical: sw(5),
          borderRadius: sw(8),
        }}>
          <ThumbsUp size={sw(11)} color={COLORS.primary} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.primary, marginLeft: sw(4) }}>
            Reply
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function CustomerReviews({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

  const reviews = [
    { customer: "Rahul Sharma", service: "Swedish Massage", rating: "5.0", comment: "Amazing experience! The therapist was very professional and the ambiance was perfect.", date: "Dec 23, 2024" },
    { customer: "Priya Patel", service: "Deep Tissue Massage", rating: "4.8", comment: "Great service, felt very relaxed after the session. Will definitely come back!", date: "Dec 22, 2024" },
    { customer: "Anita Kumar", service: "Aromatherapy", rating: "5.0", comment: "Loved the aromatherapy session. The essential oils were of great quality.", date: "Dec 21, 2024" },
    { customer: "Vikram Singh", service: "Facial Treatment", rating: "4.5", comment: "Good facial treatment, my skin feels refreshed. Could improve wait time.", date: "Dec 20, 2024" },
    { customer: "Meera Desai", service: "Hair Spa", rating: "5.0", comment: "Excellent hair spa! My hair feels so soft and healthy now.", date: "Dec 19, 2024" },
  ];

  const avgRating = "4.8";
  const totalReviews = reviews.length;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gradient2 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} />

      <LinearGradient
        colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]}
        style={{ paddingTop: Platform.OS === "ios" ? sw(50) : sw(40), paddingBottom: sw(56), paddingHorizontal: sw(20) }}
      >
        <TouchableOpacity
          onPress={onBack}
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

        <View style={{ alignItems: "center" }}>
          <View style={{
            width: sw(65),
            height: sw(65),
            borderRadius: sw(18),
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: sw(12),
          }}>
            <Star size={sw(32)} color="#FFD700" fill="#FFD700" strokeWidth={0} />
          </View>
          <Text style={{ 
            fontSize: sw(16), 
            fontWeight: "800", 
            color: "#FFFFFF",
            marginBottom: sw(5),
            textAlign: "center",
          }}>
            Customer Reviews
          </Text>
          <Text style={{ fontSize: sw(10), color: "rgba(255,255,255,0.95)", fontWeight: "500", textAlign: "center" }}>
            {avgRating} avg rating from {totalReviews} reviews
          </Text>
        </View>
      </LinearGradient>

      <View style={{
        height: contentHeight,
        backgroundColor: COLORS.bg,
        borderTopLeftRadius: sw(24),
        borderTopRightRadius: sw(24),
        marginTop: -sw(2),
        paddingTop: sw(20),
      }}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: sw(20), paddingBottom: sw(100) }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text, marginBottom: sw(12) }}>
            All Reviews ({totalReviews})
          </Text>
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} sw={sw} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
