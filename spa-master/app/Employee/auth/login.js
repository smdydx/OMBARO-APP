import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Lock, Mail } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function EmployeeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Animated value for card movement
  const cardOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', (e) => {
      // move card up based on keyboard height (safe for all screens)
      Animated.timing(cardOffset, {
        toValue: -e.endCoordinates.height * 0.35, // move up 35% of keyboard height
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(cardOffset, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, [cardOffset]);

  const handleLogin = () => router.replace('/Employee');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.splitContainer}>
            {/* 🟩 Top Gradient Section */}
            <LinearGradient
              colors={['#00FF87', '#016B3A', '#013B1F', '#012B17']}
              style={styles.topSection}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
                activeOpacity={0.7}
              >
                <ArrowLeft size={Math.min(width * 0.05, 20)} color="#FFFFFF" strokeWidth={2.5} />
              </TouchableOpacity>

              <View style={styles.brandSection}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconText}>🤖</Text>
                </View>
                <Text style={styles.brandName}>OMBARO</Text>
                <Text style={styles.brandTagline}>Employee Portal</Text>
              </View>
            </LinearGradient>

            {/* 🧾 Bottom Login Card */}
            <Animated.View
              style={[styles.bottomSection, { transform: [{ translateY: cardOffset }] }]}
            >
              <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#FFFFFF' }]} />

              <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Login to Continue</Text>

                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <Mail size={18} color="#016B3A" strokeWidth={2} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      placeholderTextColor="rgba(1,107,58,0.4)"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType="next"
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <Lock size={18} color="#016B3A" strokeWidth={2} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
                      placeholderTextColor="rgba(1,107,58,0.4)"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      returnKeyType="done"
                    />
                  </View>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotButton}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity onPress={handleLogin} activeOpacity={0.9}>
                  <LinearGradient
                    colors={['#00FF87', '#016B3A', '#013B1F', '#012B17']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#012B17' },
  keyboardView: { flex: 1 },
  splitContainer: { flex: 1 },
  topSection: {
    flex: 1.8,
    paddingHorizontal: 24,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.04,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.015,
  },
  iconText: { fontSize: 32, color: '#FFFFFF' },
  brandName: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 3,
    marginBottom: 6,
  },
  brandTagline: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C6F6D5',
    letterSpacing: 1,
    marginBottom: height * 0.02,
  },
  bottomSection: {
    flex: 3,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: height * 0.035,
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#016B3A',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  inputGroup: { marginBottom: height * 0.02 },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#016B3A',
    marginBottom: height * 0.008,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    paddingHorizontal: 16,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
  },
  forgotButton: { alignSelf: 'flex-end', marginBottom: height * 0.025 },
  forgotText: { fontSize: 14, fontWeight: '700', color: '#016B3A' },
  loginButton: {
    height: 54,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 17,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
});
