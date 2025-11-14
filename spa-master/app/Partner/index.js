import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { memo, useCallback, useState } from "react";
import {
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// --- Dark Green Color Palette ----------------------------------------------------
const COLORS = {
    bg: "#F8FAFC",
    gradientColors: ["#00FF87", "#016B3A", "#013B1F", "#012B17"],
    cardBg: "#FFFFFF",
    text: "#0f172a",
    textMuted: "#64748B",
    primary: "#016B3A",
    border: "#E2E8F0",
    iconColor: "#016B3A",
    selectedBorder: "#016B3A",
    selectedBg: "#E8F5E9",
    noteBg: "#E8F5E9",
    noteText: "#013B1F",
    shadow: "#000000",
};

// --- Responsive helpers -----------------------------------------
function useScale() {
    const { width, height } = useWindowDimensions();
    const baseWidth = 390;
    const baseHeight = 844;

    // More accurate scaling for different screen sizes
    const scale = Math.min(width / baseWidth, 1.2);
    const verticalScale = Math.min(height / baseHeight, 1.2);

    const sw = (size) => Math.round(size * scale);
    const sh = (size) => Math.round(size * verticalScale);

    return { sw, sh, width, height };
}

// --- Data --------------------------------------------------------
const CATEGORIES = [
    {
        id: "spa",
        title: "Spa & Massage",
        subtitle: "Full-service spa with massage therapy",
        icon: "water",
    },
    {
        id: "salon",
        title: "Beauty Salon",
        subtitle: "Hair, makeup, and beauty services",
        icon: "cut",
    },
    {
        id: "wellness",
        title: "Wellness Center",
        subtitle: "Holistic wellness and therapy center",
        icon: "heart",
    },
    {
        id: "home",
        title: "Home Service",
        subtitle: "Mobile spa and salon services",
        icon: "home",
    },
    {
        id: "hotel",
        title: "Hotel Spa",
        subtitle: "Luxury hotel spa facilities",
        icon: "business",
    },
    {
        id: "gym",
        title: "Gym & Fitness",
        subtitle: "Fitness center with wellness services",
        icon: "fitness",
    },
    {
        id: "yoga",
        title: "Yoga & Meditation",
        subtitle: "Yoga studio and meditation center",
        icon: "leaf",
    },
    {
        id: "ayurveda",
        title: "Ayurveda Center",
        subtitle: "Traditional Ayurvedic treatments",
        icon: "flower",
    },
];

// --- Category Card (memo) --------------------------------------------
const CategoryCard = memo(function CategoryCard({
    item,
    selected,
    onPress,
    sw,
    sh,
}) {
    const isSelected = selected?.id === item.id;

    return (
        <Pressable
            onPress={() => onPress(item)}
            style={({ pressed }) => [
                {
                    borderRadius: sw(16),
                    padding: sw(14),
                    marginBottom: sh(12),
                    borderWidth: 2,
                    borderColor: isSelected
                        ? COLORS.selectedBorder
                        : COLORS.border,
                    backgroundColor: isSelected
                        ? COLORS.selectedBg
                        : COLORS.cardBg,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                    ...Platform.select({
                        ios: {
                            shadowColor: COLORS.shadow,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.08,
                            shadowRadius: 8,
                        },
                        android: {
                            elevation: 3,
                        },
                    }),
                },
            ]}
        >
            <View style={styles.cardContent}>
                <View
                    style={[
                        styles.iconContainer,
                        {
                            width: sw(48),
                            height: sw(48),
                            borderRadius: sw(14),
                            backgroundColor: isSelected ? "#C8E6C9" : "#F1F5F9",
                        },
                    ]}
                >
                    <Ionicons
                        name={item.icon}
                        size={sw(24)}
                        color={COLORS.iconColor}
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text
                        numberOfLines={1}
                        style={[styles.categoryTitle, { fontSize: sw(14) }]}
                    >
                        {item.title}
                    </Text>
                    <Text
                        numberOfLines={2}
                        style={[styles.categorySubtitle, { fontSize: sw(11) }]}
                    >
                        {item.subtitle}
                    </Text>
                </View>

                <View
                    style={[
                        styles.radioOuter,
                        {
                            width: sw(24),
                            height: sw(24),
                            borderRadius: sw(12),
                            borderWidth: 2,
                            borderColor: isSelected
                                ? COLORS.primary
                                : "#CBD5E1",
                        },
                    ]}
                >
                    {isSelected && (
                        <View
                            style={[
                                styles.radioInner,
                                {
                                    width: sw(12),
                                    height: sw(12),
                                    borderRadius: sw(6),
                                    backgroundColor: COLORS.primary,
                                },
                            ]}
                        />
                    )}
                </View>
            </View>
        </Pressable>
    );
});

// --- Main Screen ------------------------------------------------
export default function index() {
    const { sw, sh, width, height } = useScale();
    const [selected, setSelected] = useState(null);
    const insets = useSafeAreaInsets();

    const handlePress = useCallback((item) => setSelected(item), []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Modern Header with Dark Green Gradient */}
            <LinearGradient
                colors={COLORS.gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[
                    styles.header,
                    {
                        paddingBottom: sh(30),
                        paddingTop: sh(10),
                    },
                ]}
            >
                <View style={[styles.headerTop, { paddingHorizontal: sw(20), marginTop: sh(30) }]}>
                    <Pressable
                        hitSlop={12}
                        onPress={() => router.back()}
                        style={[
                            styles.backButton,
                            {
                                width: sw(44),
                                height: sw(44),
                                borderRadius: sw(12),
                            },
                        ]}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={sw(20)}
                            color="#FFFFFF"
                        />
                    </Pressable>

                    <View
                        style={[
                            styles.headerBadge,
                            {
                                paddingHorizontal: sw(12),
                                paddingVertical: sh(6),
                                borderRadius: sw(20),
                            },
                        ]}
                    >
                        <Ionicons
                            name="briefcase"
                            size={sw(16)}
                            color="#00FF87"
                        />
                        <Text
                            style={[
                                styles.headerBadgeText,
                                { fontSize: sw(12), marginLeft: sw(6) },
                            ]}
                        >
                            Partner Program
                        </Text>
                    </View>
                </View>

                <View
                    style={[
                        styles.headerContent,
                        { marginTop: sh(20), paddingHorizontal: sw(20) },
                    ]}
                >
                    <Text
                        style={[
                            styles.headerTitle,
                            { fontSize: sw(24), color: "#FFFFFF" },
                        ]}
                    >
                        Join Our Partner Network
                    </Text>
                    <Text
                        style={[
                            styles.headerSubtitle,
                            {
                                fontSize: sw(12),
                                marginTop: sh(8),
                                color: "#FFFFFF",
                            },
                        ]}
                    >
                        Grow your business with India's leading wellness
                        platform
                    </Text>
                </View>
            </LinearGradient>

            {/* Content with Leaf Pattern */}
            <View
                style={[
                    styles.scrollView,
                    {
                        borderTopLeftRadius: sw(28),
                        borderTopRightRadius: sw(28),
                        overflow: "hidden",
                    },
                ]}
            >
                {/* Gradient Background */}
                <LinearGradient
                    colors={["#E8F5E9", "#F1F8F1", "#FFFFFF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[
                        styles.contentGradient,
                        {
                            borderTopLeftRadius: sw(28),
                            borderTopRightRadius: sw(28),
                        },
                    ]}
                />

                {/* Leaf Pattern Overlay */}
                <View
                    style={[
                        styles.leafPattern,
                        {
                            borderTopLeftRadius: sw(28),
                            borderTopRightRadius: sw(28),
                        },
                    ]}
                >
                    <Ionicons
                        name="leaf"
                        size={sw(120)}
                        color="rgba(1, 107, 58, 0.03)"
                        style={{
                            position: "absolute",
                            top: sh(20),
                            right: sw(-20),
                            transform: [{ rotate: "25deg" }],
                        }}
                    />
                    <Ionicons
                        name="leaf"
                        size={sw(80)}
                        color="rgba(1, 107, 58, 0.04)"
                        style={{
                            position: "absolute",
                            top: sh(140),
                            left: sw(-10),
                            transform: [{ rotate: "-15deg" }],
                        }}
                    />
                    <Ionicons
                        name="leaf"
                        size={sw(100)}
                        color="rgba(1, 107, 58, 0.03)"
                        style={{
                            position: "absolute",
                            top: sh(280),
                            right: sw(10),
                            transform: [{ rotate: "45deg" }],
                        }}
                    />
                    <Ionicons
                        name="leaf"
                        size={sw(70)}
                        color="rgba(1, 107, 58, 0.05)"
                        style={{
                            position: "absolute",
                            top: sh(400),
                            left: sw(20),
                            transform: [{ rotate: "-30deg" }],
                        }}
                    />
                    <Ionicons
                        name="leaf"
                        size={sw(90)}
                        color="rgba(1, 107, 58, 0.02)"
                        style={{
                            position: "absolute",
                            top: sh(520),
                            right: sw(30),
                            transform: [{ rotate: "60deg" }],
                        }}
                    />
                </View>

                <ScrollView
                    style={styles.scrollViewInner}
                    contentContainerStyle={[
                        styles.scrollContent,
                        {
                            paddingHorizontal: sw(20),
                            paddingTop: sh(40),
                            paddingBottom: sh(120),
                        },
                    ]}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Section Title */}
                    <View
                        style={[styles.sectionHeader, { marginBottom: sh(20) }]}
                    >
                        <Text
                            style={[styles.sectionTitle, { fontSize: sw(15) }]}
                        >
                            Select Your Business Type
                        </Text>
                        <Text
                            style={[
                                styles.sectionSubtitle,
                                { fontSize: sw(11), marginTop: sh(4) },
                            ]}
                        >
                            Choose the category that best describes your
                            services
                        </Text>
                    </View>

                    {/* Categories Grid */}
                    {CATEGORIES.map((item) => (
                        <CategoryCard
                            key={item.id}
                            item={item}
                            selected={selected}
                            onPress={handlePress}
                            sw={sw}
                            sh={sh}
                        />
                    ))}
                </ScrollView>
            </View>

            {/* Fixed Bottom Button */}
            <View
                style={[
                    styles.bottomBar,
                    { 
                        paddingHorizontal: sw(16), 
                        paddingTop: sh(12),
                        paddingBottom: Math.max(insets.bottom + sh(8), 20),
                        bottom: 0,
                    },
                ]}
            >
                <Pressable
                    onPress={() =>
                        selected && router.push("Partner/SignupMethod")
                    }
                    disabled={!selected}
                    style={({ pressed }) => [
                        {
                            opacity: pressed ? 0.9 : 1,
                        },
                    ]}
                >
                    <LinearGradient
                        colors={
                            selected
                                ? COLORS.gradientColors
                                : ["#94A3B8", "#CBD5E1"]
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[
                            styles.ctaButton,
                            { borderRadius: sw(14), paddingVertical: sh(16) },
                        ]}
                    >
                        <Text style={[styles.ctaText, { fontSize: sw(16) }]}>
                            {selected
                                ? `Continue with ${selected.title}`
                                : "Select a Category to Continue"}
                        </Text>
                        {selected && (
                            <Ionicons
                                name="arrow-forward"
                                size={sw(20)}
                                color="#FFFFFF"
                                style={{ marginLeft: sw(8) }}
                            />
                        )}
                    </LinearGradient>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

// --- Styles -----------------------------------------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#012B17',
    },
    header: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 10,
    },
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    backButton: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        alignItems: "center",
        justifyContent: "center",
    },
    headerBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
    headerBadgeText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },
    headerContent: {
        alignItems: "center",
    },
    headerTitle: {
        fontWeight: "900",
        textAlign: "center",
        letterSpacing: 0.5,
        lineHeight: 36,
    },
    headerSubtitle: {
        textAlign: "center",
        fontWeight: "500",
    },
    scrollView: {
        flex: 1,
        marginTop: 0,
        backgroundColor: "#FFFFFF",
    },
    contentGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    leafPattern: {
        ...StyleSheet.absoluteFillObject,
    },
    scrollViewInner: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    sectionHeader: {},
    sectionTitle: {
        color: COLORS.text,
        fontWeight: "800",
    },
    sectionSubtitle: {
        color: COLORS.textMuted,
        fontWeight: "500",
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
        marginRight: 12,
    },
    categoryTitle: {
        color: COLORS.text,
        fontWeight: "800",
        marginBottom: 4,
    },
    categorySubtitle: {
        color: COLORS.textMuted,
        fontWeight: "500",
        lineHeight: 18,
    },
    radioOuter: {
        alignItems: "center",
        justifyContent: "center",
    },
    radioInner: {},
    bottomBar: {
        position: "absolute",
        left: 0,
        right: 0,
        backgroundColor: COLORS.bg,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 20,
        zIndex: 1000,
    },
    ctaButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    ctaText: {
        color: "#FFFFFF",
        fontWeight: "900",
        letterSpacing: 0.5,
    },
});