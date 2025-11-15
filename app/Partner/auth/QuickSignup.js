import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Facebook, Instagram, LogIn, Sparkles } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function DetailSignup() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF', '#FFFFFF']}
        style={styles.gradient}>
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}>
            <View style={styles.iconWrapper}>
              <LinearGradient
                colors={['#00FF87', '#016B3A']}
                style={styles.iconGradient}>
                <Sparkles size={32} color="#FFFFFF" />
              </LinearGradient>
            </View>
            <Text style={styles.title}>Welcome to Ombaro</Text>
            <Text style={styles.subtitle}>
              Join thousands of partners growing their business with us
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.socialContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}>
            <Text style={styles.sectionLabel}>Quick Sign Up</Text>

            <TouchableOpacity
              style={[styles.socialBtn, styles.googleBtn]}
              activeOpacity={0.7}>
              <View style={styles.socialIconWrapper}>
                <AntDesign name="google" size={20} color="#DB4437" />
              </View>
              <Text style={styles.socialText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialBtn, styles.fbBtn]}
              activeOpacity={0.7}>
              <View style={styles.socialIconWrapper}>
                <Facebook size={20} color="#1877F2" />
              </View>
              <Text style={styles.socialText}>Continue with Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialBtn, styles.igBtn]}
              activeOpacity={0.7}>
              <View style={styles.socialIconWrapper}>
                <Instagram size={20} color="#E1306C" />
              </View>
              <Text style={styles.socialText}>Continue with Instagram</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={[
              styles.dividerContainer,
              {
                opacity: fadeAnim,
              },
            ]}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or sign up with</Text>
            <View style={styles.dividerLine} />
          </Animated.View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}>
            <TouchableOpacity
              style={styles.manualBtn}
              activeOpacity={0.9}
              onPress={() => router.push('/business')}>
              <LinearGradient
                colors={['#00FF87', '#00D96F', '#016B3A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.manualGradient}>
                <LogIn size={22} color="#fff" strokeWidth={2.5} />
                <Text style={styles.manualText}>Email or Mobile Number</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
            <Text style={styles.footerText}>
              By continuing, you agree to our{' '}
              <Text style={styles.footerLink}>Terms</Text> &{' '}
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </Text>
          </Animated.View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconWrapper: {
    marginBottom: 20,
    shadowColor: '#00FF87',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  iconGradient: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#016B3A',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    color: '#64748B',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
    fontWeight: '500',
  },
  socialContainer: {
    width: '100%',
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#016B3A',
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  socialIconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  socialText: {
    color: '#1E293B',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    color: '#94A3B8',
    marginHorizontal: 16,
    fontWeight: '600',
    fontSize: 13,
  },
  manualBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#00FF87',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  manualGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 58,
    gap: 10,
  },
  manualText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  footer: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  footerText: {
    color: '#64748B',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
  },
  footerLink: {
    color: '#016B3A',
    fontWeight: '700',
  },
});
