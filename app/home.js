import { LinearGradient } from "expo-linear-gradient";
import { Building2, MapPin, Sparkles, Zap } from "lucide-react-native";
import { useState } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSafeNavigation } from '../hooks/useSafeNavigation';


const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: "#1e3a8a",
  secondary: "#3b82f6",
  accent: "#FFFFFF",
  dark: "#2C2C2C",
  light: "#FFFFFF",
  white: "#FFFFFF",
  overlay: "rgba(30, 58, 138, 0.15)",
};

const AppLogo = () => {
  return (
    <View style={styles.logoContainer}>
      <View style={styles.logoCircleBorder}>
        <Image
          source={require('..//assets/Spa/logo.png')}
          style={styles.logoGradient}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const PillLink = ({ label, nav, navigate,isNavigating }) => {
  return (
    <TouchableOpacity
      disabled={isNavigating}
      style={styles.pill}
      onPress={() => navigate(nav)}
      activeOpacity={0.7}
    >
      <Text style={styles.pillText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function WelcomeScreen() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const insets = useSafeAreaInsets();


  const { isNavigating, navigate } = useSafeNavigation();


  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(30, 58, 138, 0.05)" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} contentInsetAdjustmentBehavior="automatic" scrollIndicatorInsets={{ bottom: 16 }}>

        {/* Background with optimized image loading */}
        <View style={styles.backgroundContainer}>
          <LinearGradient
            colors={["#1e3a8a", "#3b82f6", "#1e40af"]}
            style={StyleSheet.absoluteFillObject}
          />
          <LinearGradient
            colors={["rgba(30, 58, 138, 0.05)", "rgba(59, 130, 246, 0.03)", "rgba(30, 64, 175, 0.05)"]}
            style={StyleSheet.absoluteFillObject}
          />
        </View>

        {/* Decorative Circles */}
        <View style={styles.decorativeCircles}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]} />
        </View>

        {/* 2:3 Split Layout */}
        <View style={styles.splitContainer}>
          {/* Top Section (2 parts) */}
          <View style={styles.topSection}>
            <Image
            source={require('../assets/images/japanese-girl-bg.jpg')}
            style={styles.topSectionBg}
            resizeMode="cover"
            fadeDuration={200}
            progressiveRenderingEnabled={true}
          />
            <LinearGradient
              colors={['#00FF87', '#016B3A', '#013B1F', '#012B17']}
              style={styles.topSectionOverlay}
            />
            <View style={styles.topContent}>
              <AppLogo />
              <Text style={styles.tagline}>Beauty & Wellness Hub</Text>
              <Text style={styles.heading}>Welcome to Your{'\n'}Spa Journey</Text>
              
            </View>
          </View>

          {/* Bottom Section (3 parts) */}
          <View style={styles.bottomSection}>
            <LinearGradient
              colors={['#1e1e1e', '#2a2520', '#1a1a1a']}
              style={styles.bottomSectionGradient}
            />

            {/* Features Section */}
            <View style={styles.featuresSection}>
              <View style={styles.featureCard}>
                <View style={styles.featureIconBox}>
                  <MapPin size={24} color="#FFFFFF" strokeWidth={2.5} />
                </View>
                <Text style={styles.featureTitle}>Find Nearby</Text>
                <Text style={styles.featureDesc}>Discover salons & spas around you</Text>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIconBox}>
                  <Zap size={24} color="#FFFFFF" strokeWidth={2.5} />
                </View>
                <Text style={styles.featureTitle}>Easy Booking</Text>
                <Text style={styles.featureDesc}>Book appointments in seconds</Text>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIconBox}>
                  <Sparkles size={24} color="#FFFFFF" strokeWidth={2.5} />
                </View>
                <Text style={styles.featureTitle}>Premium Quality</Text>
                <Text style={styles.featureDesc}>Verified professionals</Text>
              </View>
            </View>

            <View style={styles.ctaSection}>
              <TouchableOpacity
                disabled={isNavigating}
                activeOpacity={0.9}
                onPress={() => navigate('/(tabs)')}
              >
                <LinearGradient
                  colors={['#00FF87', '#016B3A', '#013B1F', '#012B17']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.primaryBtn}
                >
                  <Text style={styles.primaryBtnText}>Get Started</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigate('/(tabs)')} style={styles.secondaryBtn} activeOpacity={0.9}>
                <Text style={styles.secondaryBtnText}>Go to Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={isNavigating}
                onPress={() => navigate('/Partner')}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#00FF87', '#016B3A', '#013B1F', '#012B17']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.vendorBtn}
                >
                  <Building2 size={16} color="#fff" strokeWidth={2.5} />
                  <Text style={styles.vendorBtnText}>Become a Partner</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.quickAccessSection}>
              <Text style={styles.quickAccessLabel}>Quick Access</Text>
              <View style={styles.pillsContainer}>
                <PillLink label="Employee" nav="/Employee" navigate={navigate} isNavigating={isNavigating} />
                <PillLink label="Vendor" nav="/Vendor" navigate={navigate} isNavigating={isNavigating}  />
                <PillLink label="Admin" nav="/Admin" navigate={navigate} isNavigating={isNavigating}  />
                <PillLink label="Departments" nav="/Department" navigate={navigate} isNavigating={isNavigating}  />
                <PillLink label="Customer" nav="/(tabs)" navigate={navigate} isNavigating={isNavigating}  />
                <PillLink label="Partner" nav="/Partner" navigate={navigate} isNavigating={isNavigating}  />
              </View>
            </View>


          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: height,
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    overflow: 'hidden',
  },
  decorativeCircles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: 'rgba(141, 89, 10, 0.08)',
  },
  circle1: {
    width: width * 0.6,
    height: width * 0.6,
    top: height * 0.15,
    right: -width * 0.25,
  },
  circle2: {
    width: width * 0.5,
    height: width * 0.5,
    top: height * 0.1,
    left: -width * 0.2,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  circle3: {
    width: width * 0.4,
    height: width * 0.4,
    bottom: height * 0.35,
    left: -width * 0.05,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bottomSectionGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
  },
  splitContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100%',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 1,
    width: '100%',
    maxWidth: '100%',
    backgroundColor: '#1e3a8a',
  },
  topSectionBg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  topSectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    opacity: 1,
  },
  bottomSection: {
    gap:15,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.04,
    paddingBottom: height * 0.03,
    justifyContent: 'space-between',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -Math.min(30, height),
    zIndex: 2,
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  topContent: {
    alignItems: "center",
    width: '100%',
    maxWidth: '100%',
  },
  logoContainer: {
    marginBottom: height * 0.010,
  },
  logoCircleBorder: {
    width: 110,            // smaller circle
    height: 110,           // smaller circle
    backgroundColor: '#f5f5f5ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#00FF87',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 15,
},
  logo: {
        width: 50,        // <--- Set size smaller than parent
        height: 50,
        borderRadius: 30, // <--- makes perfect circle
        resizeMode: 'contain',
    },
  
  logoGradient: {
    width: '60%',
    height: '60%',
    borderRadius: 20,
  },
  logoText: {
    fontSize: Math.min(width * 0.06, 24),
    color: "#1e3a8a",
  },
  tagline: {
    fontSize: Math.min(width * 0.032, 13),
    color: "#00FF87",
    fontWeight: "800",
    marginBottom: height * 0.025,
    letterSpacing: 1.5,
    textAlign: 'center',
    textTransform: 'uppercase',
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heading: {
    fontSize: Math.min(width * 0.07, 28),
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: Math.min(width * 0.085, 34),
    marginBottom: height * 0.012,
    textAlign: "center",
    paddingHorizontal: width * 0.08,
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subheading: {
    fontSize: Math.min(width * 0.035, 14),
    color: "rgba(255, 255, 255, 0.95)",
    lineHeight: Math.min(width * 0.045, 18),
    textAlign: "center",
    paddingHorizontal: width * 0.1,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  featuresSection: {
    flexDirection: 'row',
    gap: width * 0.025,
    justifyContent: 'space-between',
    paddingVertical: height * 0.01,
    width: '100%',
    maxWidth: '100%',
    zIndex: 1,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 18,
    padding: width * 0.03,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    minHeight: height * 0.13,
    justifyContent: 'center',
    maxWidth: width * 0.28,
  },
  featureIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#016B3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.008,
  },
  featureTitle: {
    fontSize: Math.min(width * 0.03, 12),
    fontWeight: '800',
    color: '#016B3A',
    marginBottom: height * 0.004,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: Math.min(width * 0.024, 9.5),
    color: '#64748b',
    textAlign: 'center',
    lineHeight: Math.min(width * 0.032, 13),
  },
  ctaSection: {
    gap: height * 0.01,
    marginVertical: height * 0.008,
    width: '100%',
    maxWidth: '100%',
    zIndex: 1,
  },
  primaryBtn: {
    paddingVertical: height * 0.014,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryBtnText: {
    color: "#FFF",
    fontSize: Math.min(width * 0.04, 16),
    fontWeight: "900",
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  secondaryBtn: {
    paddingVertical: height * 0.014,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#016B3A",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "#016B3A",
    fontSize: Math.min(width * 0.038, 15),
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  vendorBtn: {
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.04,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  vendorBtnText: {
    fontSize: Math.min(width * 0.036, 14),
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
  quickAccessSection: {
    fontSize: Math.min(width * 0.026, 10),
    fontWeight: "800",
    color: "#016B3A",
    letterSpacing: 1.8,
    textTransform: "uppercase",
    marginBottom: height * 0.01,
  },
  
  quickAccessLabel: {
    fontSize: Math.min(width * 0.026, 10),
    fontWeight: "800",
    color: "#016B3A",
    letterSpacing: 1.8,
    textTransform: "uppercase",
    marginBottom: height * 0.01,
  },
  pillsContainer: {
    flexDirection: "row",
    gap: width * 0.02,
    flexWrap: "wrap",
    justifyContent: "center",
    width: '100%',
    maxWidth: '100%',
    paddingHorizontal: width * 0.02,
  },
  pill: {
    paddingHorizontal: width * 0.035,
    paddingVertical: height * 0.009,
    borderRadius: 18,
    backgroundColor: "#f8f9fa",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
  },
  pillText: {
    color: "#016B3A",
    fontWeight: "800",
    fontSize: Math.min(width * 0.026, 10),
    letterSpacing: 0.4,
  },
});
