import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OmbaroTheme } from '../../constants/theme';

const { height, width } = Dimensions.get('window');
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export default function OtpVerificationScreen() {
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

  const inputRef = useRef(null);
  const inputsRef = useRef([]);
  const router = useRouter();
  // const { phoneNumber, verifyOTP } = useAuth();

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const maskPhone = (phone) => {
    if (!phone || phone.length < 4) return phone;
    const last4 = phone.slice(-4);
    const prefix = phone.slice(0, 2);
    return `${prefix}****${last4}`;
  };

  const setCharAt = (str, index, chr) => {
    const arr = str.split('');
    while (arr.length < OTP_LENGTH) arr.push('');
    arr[index] = chr;
    return arr.join('');
  };

  const onChangeCode = (text) => {
    const digits = text.replace(/[^\d]/g, '').slice(0, OTP_LENGTH);
    setCode(digits);
    setError('');
  };

  const onChangeAtIndex = (i, val) => {
    const d = val.replace(/[^\d]/g, '').slice(-1);
    const next = setCharAt(code, i, d);
    setCode(next);
    setError('');
    if (d && i < OTP_LENGTH - 1) {
      inputsRef.current[i + 1]?.focus();
    }
  };

  const onKeyPressAtIndex = (i, e) => {
    if (e.nativeEvent.key === 'Backspace') {
      const currentChar = code[i] || '';
      if (!currentChar && i > 0) {
        inputsRef.current[i - 1]?.focus();
        // also clear previous char
        const prev = setCharAt(code, i - 1, '');
        setCode(prev);
      }
    }
  };

  const handleVerify = async () => {
    if (code.length !== OTP_LENGTH || verifying) return;

    setVerifying(true);
    setError('');

    // const result = verifyOTP(code);
    // Temporary success flow until API wiring
    try {
      // Simulate success when complete
      router.replace('/(tabs)');
    } catch (e) {
      setError('Verification failed. Please try again.');
      setVerifying(false);
    }
  };

  const handleResend = () => {
    if (seconds > 0) return;
    setSeconds(RESEND_SECONDS);
    setCode('');
    setError('');
  };

  const isComplete = code.length === OTP_LENGTH;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <ArrowLeft size={scale(20)} color={OmbaroTheme.colors.textDark} />
          </TouchableOpacity>

          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>✨</Text>
            </View>
            <Text style={styles.brand}>OMBARO</Text>
            <Text style={styles.tagline}>Beauty & Wellness Hub</Text>
            <Text style={styles.title}>Enter Verification Code</Text>
            <Text style={styles.subtitle}>
              We've sent a {OTP_LENGTH}-digit code to {maskPhone('+1234567890')}
            </Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.otpRow}>
              {Array.from({ length: OTP_LENGTH }).map((_, i) => {
                const char = code[i] ?? '';
                const active = i === code.length && code.length < OTP_LENGTH;
                return (
                  <TextInput
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    value={char}
                    onChangeText={(t) => onChangeAtIndex(i, t)}
                    onKeyPress={(e) => onKeyPressAtIndex(i, e)}
                    keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                    maxLength={1}
                    autoFocus={i === 0}
                    textContentType="oneTimeCode"
                    style={[styles.otpCell, styles.otpInput, active && styles.otpCellActive, error && styles.otpCellError]}
                    returnKeyType={i === OTP_LENGTH - 1 ? 'done' : 'next'}
                  />
                );
              })}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>
                Didn't receive the code?{' '}
                <Text
                  style={[
                    styles.resendLink,
                    { color: seconds > 0 ? '#9CA3AF' : '#1e3a8a' }
                  ]}
                  onPress={handleResend}
                >
                  {seconds > 0 ? `Resend in ${seconds}s` : 'Tap to resend'}
                </Text>
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.button, !isComplete && styles.buttonDisabled]}
              onPress={handleVerify}
              disabled={!isComplete}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {verifying ? 'Verifying...' : 'Verify & Continue'}
              </Text>
            </TouchableOpacity>

            <View style={styles.hintCard}>
              <Text style={styles.hintText}>
                💡 Hint: Use OTP code <Text style={styles.hintCode}>123456</Text> to verify
              </Text>
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
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(10),
    backgroundColor: OmbaroTheme.colors.beige,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12),
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  iconContainer: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(12),
    backgroundColor: OmbaroTheme.colors.roseGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(8),
  },
  icon: {
    fontSize: scale(24),
  },
  brand: {
    fontSize: scale(22),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
    letterSpacing: 1.5,
    marginBottom: verticalScale(4),
  },
  tagline: {
    fontSize: scale(11),
    color: OmbaroTheme.colors.roseGoldDark,
    fontWeight: OmbaroTheme.fontWeight.medium,
    marginBottom: verticalScale(12),
  },
  title: {
    fontSize: scale(18),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
    textAlign: 'center',
    marginTop: verticalScale(6),
  },
  subtitle: {
    fontSize: scale(12),
    color: OmbaroTheme.colors.textGray,
    textAlign: 'center',
    marginTop: verticalScale(4),
  },
  formSection: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  // hidden input removed; using visible per-cell inputs
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(20),
    gap: scale(8),
  },
  otpCell: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: scale(52),
    backgroundColor: '#f8fafc',
    borderRadius: scale(10),
    borderWidth: 2,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpInput: {
    textAlign: 'center',
    fontSize: scale(22),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  otpCellActive: {
    borderColor: '#016B3A',
  },
  otpCellError: {
    borderColor: OmbaroTheme.colors.error,
  },
  otpChar: {
    fontSize: scale(24),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textDark,
  },
  errorText: {
    fontSize: scale(11),
    color: OmbaroTheme.colors.error,
    textAlign: 'center',
    marginTop: verticalScale(-12),
    marginBottom: verticalScale(8),
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  resendText: {
    fontSize: scale(11),
    color: OmbaroTheme.colors.textDark,
  },
  resendLink: {
    fontWeight: OmbaroTheme.fontWeight.semibold,
  },
  button: {
    backgroundColor: '#016B3A',
    borderRadius: scale(10),
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: OmbaroTheme.colors.darkCard,
    opacity: 0.5,
  },
  buttonText: {
    fontSize: scale(14),
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  hintCard: {
    backgroundColor: '#eff6ff',
    borderRadius: scale(10),
    padding: scale(10),
    marginTop: verticalScale(12),
    borderWidth: 1,
    borderColor: '#016B3A',
  },
  hintText: {
    fontSize: scale(11),
    color: OmbaroTheme.colors.textDark,
    textAlign: 'center',
  },
  hintCode: {
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: '#1e3a8a',
  },
});
