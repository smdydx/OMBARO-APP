import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Gift,
  Lock,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useAuth } from "../../context/AuthContext";

const { height, width } = Dimensions.get("window");

const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const GoogleIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48">
    <Path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <Path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <Path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <Path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </Svg>
);

export default function PhoneRegisterScreen() {
  const [mode, setMode] = useState("email");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referral, setReferral] = useState("");
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyNotice, setShowVerifyNotice] = useState(false);

  const router = useRouter();
  const { registerPhone } = useAuth();

  const validateEmail = (text) => {
    setEmail(text);
    setEmailError("");
    if (text.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(text)) {
        setEmailError("Please enter a valid email address");
      }
    }
  };

  const validatePassword = (text) => {
    setPassword(text);
    setPasswordError("");

    if (text.length === 0) return;

    const hasUpper = /[A-Z]/.test(text);
    const hasNumber = /[0-9]/.test(text);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]`~]/.test(text);

    if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else if (!hasUpper) {
      setPasswordError("Password must include at least one uppercase letter");
    } else if (!hasNumber) {
      setPasswordError("Password must include at least one number");
    } else if (!hasSpecial) {
      setPasswordError("Password must include at least one special character");
    }
  };


  const validateMobile = (text) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    setMobile(cleaned);
    setMobileError("");
    if (cleaned.length > 0 && cleaned.length < 10) {
      setMobileError("Mobile number must be 10 digits");
    }
  };

  const handleSendOTP = async () => {
    setError("");
    if (mode === "phone") {
      if (mobile.length !== 10) {
        setMobileError("Mobile number must be 10 digits");
        return;
      }
      const result = registerPhone(mobile);
      if (result.success) {
        router.push("/auth/otp-verification");
      } else {
        setError(result.error);
      }
    } else {
      if (!email || emailError) {
        setEmailError("Please enter a valid email address");
        return;
      }
      if (!password) {
        setPasswordError("Please enter a password");
        return;
      }
      if (passwordError) {
        return;
      }

      const headers = {
        "Content-Type": "application/json",
      };

      const payload = {
        email: email,
        password: password,
        consent: true,
        referralCode: referral.trim() || "",
      };

      try {
        const res = await fetch("https://api.gateway.ombaro.com/api/v1/auth/signup/email",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
          }
        );

        const result = await res.json();
        console.log("Register API Result:", result);

        if (!res.ok || result.success === false) {
          console.log("Register Failed:", result);
          const message = result.msg || 'Registration failed. Please try again.';
          if (/email/i.test(message) && /in use|already/i.test(message)) {
            setEmailError(message);
          } else {
            setError(message);
          }
          return;
        }

        setShowVerifyNotice(true);
      } catch (error) {
        console.log('Register error:', error);
      }

    }
  };

  const isValid =
    mode === "phone"
      ? mobile.length === 10 && !mobileError
      : email.length > 0 &&
      password.length >= 6 &&
      !emailError &&
      !passwordError;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }} edges={['top']}>
      
      {/* STATUSBAR TRANSPARENT + MERGED */}
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <LinearGradient
          colors={["#064e3b", "#047857", "#059669"]}
          style={styles.container}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ArrowLeft
                size={moderateScale(20)}
                color="#FFFFFF"
                strokeWidth={2.5}
              />
            </TouchableOpacity>

            <View style={styles.brandSection}>
              <View style={styles.iconContainer}>
                <Sparkles
                  size={moderateScale(22)}
                  color="#FFFFFF"
                  strokeWidth={2.5}
                />
              </View>
              <Text style={styles.brand}>OMBARO</Text>
              <Text style={styles.tagline}>Beauty & Wellness Hub</Text>
            </View>
          </View>

          <View style={styles.formSection}>
            {showVerifyNotice && (
              <View style={styles.verifyNotice}>
                <View style={styles.verifyLeft}>
                  <Sparkles size={moderateScale(18)} color="#064e3b" />
                </View>
                <View style={styles.verifyBody}>
                  <Text style={styles.verifyTitle}>Please verify your email</Text>
                  <Text style={styles.verifySubtitle} numberOfLines={2}>
                    We have sent a verification link to {email}. Please check your inbox and click the link to activate your account.
                  </Text>
                </View>
              </View>
            )}
            <View style={styles.modeToggle}>
              <TouchableOpacity
                style={[
                  styles.modeButton,
                  mode === "email" && styles.modeButtonActive,
                ]}
                onPress={() => setMode("email")}
              >
                <Mail
                  size={moderateScale(15)}
                  color={mode === "email" ? "#FFFFFF" : "#64748b"}
                />
                <Text
                  style={[
                    styles.modeText,
                    mode === "email" && styles.modeTextActive,
                  ]}
                >
                  Email
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modeButton,
                  mode === "phone" && styles.modeButtonActive,
                ]}
                onPress={() => setMode("phone")}
              >
                <Phone
                  size={moderateScale(15)}
                  color={mode === "phone" ? "#FFFFFF" : "#64748b"}
                />
                <Text
                  style={[
                    styles.modeText,
                    mode === "phone" && styles.modeTextActive,
                  ]}
                >
                  Phone
                </Text>
              </TouchableOpacity>
            </View>

            {mode === "email" ? (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address *</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      focusedField === "email" && styles.inputFocused,
                      emailError && styles.inputError,
                    ]}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      placeholderTextColor="#94a3b8"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={validateEmail}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField("")}
                    />
                  </View>
                  {emailError ? (
                    <Text style={styles.errorText}>{emailError}</Text>
                  ) : null}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password *</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      focusedField === "password" && styles.inputFocused,
                      passwordError && styles.inputError,
                    ]}
                  >
                    <TextInput
                      style={[styles.input, styles.passwordInput]}
                      placeholder="Create a password"
                      placeholderTextColor="#94a3b8"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={validatePassword}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField("")}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      {showPassword ? (
                        <EyeOff size={moderateScale(18)} color="#059669" />
                      ) : (
                        <Eye size={moderateScale(18)} color="#94a3b8" />
                      )}
                    </TouchableOpacity>
                  </View>
                  {passwordError ? (
                    <Text style={styles.errorText}>{passwordError}</Text>
                  ) : (
                    <Text style={styles.passwordHint}>Password must be at least 6 characters and include one uppercase letter,number and special character.</Text>
                  )}
                </View>
              </>
            ) : (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mobile Number *</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    focusedField === "mobile" && styles.inputFocused,
                    mobileError && styles.inputError,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Enter 10-digit number"
                    placeholderTextColor="#94a3b8"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={mobile}
                    onChangeText={validateMobile}
                    onFocus={() => setFocusedField("mobile")}
                    onBlur={() => setFocusedField("")}
                  />
                </View>
                {mobileError ? (
                  <Text style={styles.errorText}>{mobileError}</Text>
                ) : null}
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Referral Code (Optional)</Text>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === "referral" && styles.inputFocused,
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Enter referral code"
                  placeholderTextColor="#94a3b8"
                  value={referral}
                  onChangeText={(text) => setReferral(text.toUpperCase())}
                  onFocus={() => setFocusedField("referral")}
                  onBlur={() => setFocusedField("")}
                />
              </View>
              <View style={styles.hintContainer}>
                <Gift size={moderateScale(10)} color="#059669" />
                <Text style={styles.hint}>Get 10% off your first booking!</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, !isValid && styles.buttonDisabled]}
              onPress={handleSendOTP}
              disabled={!isValid}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {mode === "phone" ? "SEND OTP" : "SIGN UP"}
              </Text>
            </TouchableOpacity>

            {mode === "email" && (
              <>
                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.divider} />
                </View>

                <TouchableOpacity
                  style={styles.socialButton}
                  activeOpacity={0.7}
                >
                  <GoogleIcon size={moderateScale(18)} />
                  <Text style={styles.socialButtonText}>
                    Sign in with Google
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <View style={styles.privacyNote}>
              <Lock size={moderateScale(11)} color="#64748b" />
              <Text style={styles.privacyText}>
                Your privacy is protected
              </Text>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(18),
  },
  backButton: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(10),
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(10),
  },
  brandSection: {
    alignItems: "center",
  },
  iconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(10),
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(5),
  },
  brand: {
    fontSize: moderateScale(18),
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 2,
    marginBottom: verticalScale(2),
  },
  tagline: {
    fontSize: moderateScale(9.5),
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  formSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(8),
  },
  modeToggle: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    borderRadius: moderateScale(10),
    padding: scale(3),
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  modeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(9),
    borderRadius: moderateScale(8),
    gap: scale(5),
  },
  modeButtonActive: {
    backgroundColor: "#059669",
  },
  modeText: {
    fontSize: moderateScale(12.5),
    fontWeight: "600",
    color: "#64748b",
  },
  modeTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  inputGroup: {
    marginBottom: verticalScale(11),
  },
  label: {
    fontSize: moderateScale(11.5),
    fontWeight: "600",
    color: "#334155",
    marginBottom: verticalScale(5),
    letterSpacing: 0.2,
  },
  inputWrapper: {
    backgroundColor: "#f8fafc",
    borderRadius: moderateScale(10),
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    height: verticalScale(44),
    flexDirection: "row",
    alignItems: "center",
  },
  inputFocused: {
    borderColor: "#059669",
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  },
  input: {
    flex: 1,
    fontSize: moderateScale(13.5),
    fontWeight: "500",
    color: "#0f172a",
    paddingHorizontal: scale(12),
    paddingVertical: 0,
    height: verticalScale(44),
  },
  passwordInput: {
    paddingRight: scale(2),
  },
  eyeButton: {
    width: moderateScale(38),
    height: moderateScale(44),
    justifyContent: "center",
    alignItems: "center",
  },
  hintContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(5),
    marginLeft: scale(2),
    gap: scale(5),
  },
  hint: {
    fontSize: moderateScale(10),
    color: "#059669",
    fontWeight: "600",
  },
  errorText: {
    fontSize: moderateScale(10),
    color: "#ef4444",
    marginTop: verticalScale(4),
    marginLeft: scale(2),
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#059669",
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(13),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(6),
  },
  buttonDisabled: {
    backgroundColor: "#cbd5e1",
  },
  buttonText: {
    fontSize: moderateScale(13.5),
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.8,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: verticalScale(12),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e2e8f0",
  },
  dividerText: {
    fontSize: moderateScale(11),
    color: "#64748b",
    fontWeight: "600",
    marginHorizontal: scale(10),
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(10),
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    paddingVertical: verticalScale(11),
    gap: scale(8),
  },
  socialButtonText: {
    fontSize: moderateScale(12.5),
    fontWeight: "600",
    color: "#334155",
  },
  privacyNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(12),
    gap: scale(5),
  },
  privacyText: {
    fontSize: moderateScale(10),
    color: "#64748b",
    fontWeight: "500",
  },
  verifyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  verifyLeft: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(8),
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(10),
  },
  verifyBody: {
    flex: 1,
  },
  verifyTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#064e3b',
    marginBottom: verticalScale(2),
  },
  verifySubtitle: {
    fontSize: moderateScale(12),
    color: '#065f46',
    fontWeight: '500',
  },
  passwordHint: {
    fontSize: moderateScale(11),
    color: '#065f46',
    marginTop: verticalScale(6),
    fontWeight: '500',
  },
});
