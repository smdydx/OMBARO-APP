import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function DepartmentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    router.replace('/Department');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.splitContainer}>
          <LinearGradient
            colors={['#1e3a8a', '#1e40af', '#2563eb']}
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
              <Text style={styles.brandTagline}>Department Portal</Text>
            </View>
          </LinearGradient>

          <View style={styles.bottomSection}>
            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#FFFFFF' }]} />

            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Login to Continue</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputWrapper}>
                  <Mail size={Math.min(width * 0.045, 18)} color="#1e3a8a" strokeWidth={2} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="rgba(30, 58, 138, 0.4)"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <Lock size={Math.min(width * 0.045, 18)} color="#1e3a8a" strokeWidth={2} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="rgba(30, 58, 138, 0.4)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLogin} activeOpacity={0.9}>
                <LinearGradient
                  colors={['#1e3a8a', '#2563eb']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginButtonText}>LOGIN</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  splitContainer: {
    flex: 1,
  },
  topSection: {
    flex: 1.8,
    paddingHorizontal: Math.min(width * 0.06, 24),
    paddingTop: height * 0.02,
    paddingBottom: height * 0.04,
    justifyContent: 'space-between',
  },
  backButton: {
    width: Math.min(width * 0.1, 40),
    height: Math.min(width * 0.1, 40),
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    width: Math.min(width * 0.14, 56),
    height: Math.min(width * 0.14, 56),
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.015,
  },
  iconCircle: {
    width: Math.min(width * 0.08, 32),
    height: Math.min(width * 0.08, 32),
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  iconText: {
    fontSize: Math.min(width * 0.08, 32),
    color: '#FFFFFF',
  },
  brandName: {
    fontSize: Math.min(width * 0.065, 26),
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 3,
    marginBottom: height * 0.006,
  },
  brandTagline: {
    fontSize: Math.min(width * 0.03, 12),
    fontWeight: '700',
    color: '#93c5fd',
    letterSpacing: 1,
    marginBottom: height * 0.02,
  },
  welcomeText: {
    fontSize: Math.min(width * 0.065, 26),
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: height * 0.008,
    textAlign: 'center',
  },
  subText: {
    fontSize: Math.min(width * 0.032, 13),
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  bottomSection: {
    flex: 3,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    overflow: 'hidden',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: Math.min(width * 0.06, 24),
    paddingTop: height * 0.035,
    paddingBottom: height * 0.025,
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: Math.min(width * 0.065, 26),
    fontWeight: '900',
    color: '#1e3a8a',
    marginBottom: height * 0.035,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: height * 0.02,
  },
  label: {
    fontSize: Math.min(width * 0.035, 14),
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: height * 0.008,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    paddingHorizontal: width * 0.04,
    height: Math.min(height * 0.065, 54),
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: Math.min(width * 0.04, 16),
    color: '#1e293b',
    fontWeight: '600',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: height * 0.025,
  },
  forgotText: {
    fontSize: Math.min(width * 0.035, 14),
    fontWeight: '700',
    color: '#2563eb',
  },
  loginButton: {
    height: Math.min(height * 0.065, 54),
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    fontSize: Math.min(width * 0.042, 17),
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
});