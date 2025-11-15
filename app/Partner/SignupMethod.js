import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { memo } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeNavigation } from "../../hooks/useSafeNavigation";

const COLORS = {
  bg: "#F8FAFC",
  cardBg: "#FFFFFF",
  border: "#E2E8F0",
  text: "#0F172A",
  textMuted: "#64748B",
  primary: "#001f3f",
  gradientStart: "#00FF87",
  gradientEnd: "#012B17",
  iconBgQuick: "#FEF3C7",
  iconBgDetailed: "#DBEAFE",
  tagFast: "#F59E0B",
  tagRec: "#10B981",
  noteBg: "#EFF6FF",
  noteText: "#1E40AF",
  check: "#10B981",
  divider: "#E2E8F0",
};

function useScale() {
  const { width } = useWindowDimensions();
  const base = Math.min(Math.max(width, 320), 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw };
}

const CheckItem = memo(({ text, sw }) => (
  <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: sw(8) }}>
    <Text style={{ color: COLORS.check, marginRight: sw(8), fontSize: sw(15), fontWeight: "700" }}>✓</Text>
    <Text style={{ color: COLORS.text, fontSize: sw(14), flex: 1, lineHeight: sw(20) }}>{text}</Text>
  </View>
));

const MethodCard = memo(({ variant, title, subtitle, points, onPress, sw }) => {
  const color = variant === "quick" ? COLORS.iconBgQuick : COLORS.iconBgDetailed;
  const tagBg = variant === "quick" ? COLORS.tagFast : COLORS.tagRec;
  const tagLabel = variant === "quick" ? "FASTEST" : "RECOMMENDED";

  return (
    <Pressable
      onPress={() => onPress(variant)}
      style={({ pressed }) => [
        styles.card,
        {
          borderColor: COLORS.border,
          backgroundColor: COLORS.cardBg,
          transform: [{ scale: pressed ? 0.97 : 1 }],
          opacity: pressed ? 0.95 : 1,
          marginBottom: sw(16),
          padding: sw(18),
          borderRadius: sw(16),
        },
        cardShadowStyle,
      ]}
    >
      <View style={styles.rowBetween}>
        <View
          style={[
            styles.iconWrap,
            { backgroundColor: color, width: sw(56), height: sw(56), borderRadius: sw(14) },
          ]}
        >
          <Text style={{ fontSize: sw(28) }}>{variant === "quick" ? "⚡" : "📋"}</Text>
        </View>
        <View
          style={{
            backgroundColor: tagBg,
            paddingHorizontal: sw(12),
            paddingVertical: sw(6),
            borderRadius: sw(12),
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: sw(11), fontWeight: "700", letterSpacing: 0.5 }}>
            {tagLabel}
          </Text>
        </View>
      </View>

      <Text style={[styles.title, { fontSize: sw(18), marginTop: sw(14), marginBottom: sw(6) }]}>
        {title}
      </Text>
      <Text style={[styles.subtitle, { fontSize: sw(13), marginBottom: sw(14), lineHeight: sw(19) }]}>
        {subtitle}
      </Text>

      <View style={{ marginBottom: sw(12) }}>
        {points.map((p, i) => (
          <CheckItem key={i} text={p} sw={sw} />
        ))}
      </View>

      <View style={{ height: 1, backgroundColor: COLORS.divider, marginVertical: sw(12) }} />

      <View style={styles.rowBetween}>
        {variant === "quick" ? (
          <Text style={{ color: COLORS.textMuted, fontSize: sw(13), fontWeight: "600" }}>
            🔗 Social Login Available
          </Text>
        ) : (
          <View
            style={{
              backgroundColor: COLORS.noteBg,
              borderRadius: sw(8),
              paddingHorizontal: sw(10),
              paddingVertical: sw(5),
            }}
          >
            <Text style={{ color: COLORS.noteText, fontSize: sw(12), fontWeight: "600" }}>
              ⏱️ Takes 5-10 minutes
            </Text>
          </View>
        )}
        <Text style={{ color: COLORS.primary, fontSize: sw(14), fontWeight: "700" }}>
          Tap to select →
        </Text>
      </View>
    </Pressable>
  );
});

export default function SignupMethod() {
  const { sw } = useScale();
  const { isNavigating, navigate } = useSafeNavigation();


  const handleSelect = (variant) => {
    if (variant === "quick") {
      navigate("Partner/auth/QuickSignup");
    } else {
      navigate("Partner/auth/DetailSignup");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" />

      {/* Gradient Header */}
      <LinearGradient
        colors={['#00FF87', '#016B3A', '#013B1F', '#012B17']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradientHeader, {
          paddingTop: sw(12),
          paddingBottom: sw(20),
          paddingHorizontal: sw(20)
        }]}
      >
        {/* Back Button */}
        <Pressable
          hitSlop={12}
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            {
              opacity: pressed ? 0.7 : 1,
              paddingVertical: sw(8),
              paddingHorizontal: sw(12),
              borderRadius: sw(8),
            }
          ]}
        >
          <Text style={[styles.backText, { fontSize: sw(15) }]}>← Back</Text>
        </Pressable>

        {/* Header Title */}
        <View style={{ marginTop: sw(16) }}>
          <Text style={[styles.headerTitle, { fontSize: sw(26), lineHeight: sw(32) }]}>
            Choose Your{"\n"}Signup Method
          </Text>
          <Text style={[styles.headerSubtitle, { fontSize: sw(14), lineHeight: sw(20), marginTop: sw(6) }]}>
            Select the registration process that suits you best
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: sw(20),
          paddingTop: sw(20),
          paddingBottom: sw(20)
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Method Cards */}
        <MethodCard
          variant="quick"
          title="Quick Signup"
          subtitle="Get started in under 2 minutes with social login"
          points={[
            "Sign up with Google or Facebook",
            "Instant mobile OTP verification",
            "Start receiving bookings immediately",
            "Complete profile details anytime later",
          ]}
          disabled={isNavigating}
          onPress={handleSelect}
          sw={sw}
        />

        <MethodCard
          variant="detailed"
          title="Detailed Signup"
          subtitle="Complete business registration for faster approval"
          points={[
            "Provide comprehensive business information",
            "Add GST, PAN, and official documents",
            "Select your partnership model",
            "Priority approval and verification",
          ]}
          onPress={handleSelect}
          disabled={isNavigating}
          sw={sw}
        />

        {/* Info Note */}
        <View
          style={{
            backgroundColor: COLORS.noteBg,
            borderRadius: sw(12),
            padding: sw(16),
            borderLeftWidth: 4,
            borderLeftColor: COLORS.noteText,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-start", gap: sw(10) }}>
            <Text style={{ fontSize: sw(18) }}>ℹ️</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: COLORS.noteText, fontSize: sw(14), lineHeight: sw(20), fontWeight: "600" }}>
                <Text style={{ fontWeight: "700" }}>Quick tip: </Text>
                Quick signup users can complete their detailed profile anytime from the dashboard. Both methods provide full vendor portal access.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const cardShadowStyle =
  Platform.OS === "ios"
    ? { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } }
    : { elevation: 3 };

const styles = StyleSheet.create({
  gradientHeader: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 8,
      },
    }),
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  backText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    borderWidth: 1.5,
    backgroundColor: COLORS.cardBg,
  },
  title: {
    color: COLORS.text,
    fontWeight: "700",
  },
  subtitle: {
    color: COLORS.textMuted,
    fontWeight: "500",
  },
});