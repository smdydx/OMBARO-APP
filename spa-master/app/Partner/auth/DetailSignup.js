import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, CheckCircle2, Mail, Phone, User, Lock } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function VendorPersonalInfo() {
  const router = useRouter();
  const [step] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [otpMode, setOtpMode] = useState({ email: false, phone: false });
  const [verified, setVerified] = useState({ email: false, phone: false });
  const [otp, setOtp] = useState({ email: "", phone: "" });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const verifyHandler = (type) => {
    if (verified[type]) return;
    setOtpMode({ ...otpMode, [type]: true });
  };

  const handleOtpSubmit = (type) => {
    // simulate verification success
    setVerified({ ...verified, [type]: true });
    setOtpMode({ ...otpMode, [type]: false });
  };

  const allValid =
    form.name &&
    verified.email &&
    verified.phone &&
    form.password.length >= 8 &&
    form.password === form.confirmPassword;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.heroCard}>
            <LinearGradient
              colors={["#012B17", "#016B3A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroGradient}
            >
              <View style={styles.heroHeader}>
                <TouchableOpacity
                  onPress={() => router.back()}
                  activeOpacity={0.8}
                  style={styles.backButton}
                >
                  <ArrowLeft size={18} color="#fff" />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Text style={styles.heroTitle}>Vendor Registration</Text>
                  <Text style={styles.heroSub}>Personal information & verification</Text>
                </View>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepBadgeText}>{`Step ${step} of 4`}</Text>
                </View>
              </View>

              <View style={styles.heroStatsRow}>
                {[
                  { label: "Category", value: "Salon" },
                  { label: "Verification", value: verified.email && verified.phone ? "In Review" : "Pending" },
                  { label: "Support SLA", value: "24h" },
                ].map((item) => (
                  <View key={item.label} style={styles.heroStat}>
                    <Text style={styles.heroStatLabel}>{item.label}</Text>
                    <Text style={styles.heroStatValue}>{item.value}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </View>

          {/* Stepper */}
          <View style={styles.stepContainer}>
            {[1, 2, 3, 4].map((n) => (
              <View key={n} style={styles.stepItem}>
                <View
                  style={[
                    styles.stepCircle,
                    n <= step && styles.stepCircleActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.stepNumber,
                      n <= step && styles.stepNumberActive,
                    ]}
                  >
                    {n}
                  </Text>
                </View>
                {n !== 4 && (
                  <View
                    style={[
                      styles.stepLine,
                      n < step && styles.stepLineActive,
                    ]}
                  />
                )}
              </View>
            ))}
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <Text style={styles.sectionSub}>
              Every detail here helps us verify and launch your vendor account.
            </Text>

            <View style={styles.categoryStrip}>
              {[
                { label: "Category", value: "Salon" },
                { label: "Region", value: "PAN India" },
                {
                  label: "KYC Status",
                  value: verified.email && verified.phone ? "Verified" : "Pending",
                },
              ].map((item) => (
                <View key={item.label} style={styles.categoryPill}>
                  <Text style={styles.categoryPillLabel}>{item.label}</Text>
                  <Text style={styles.categoryPillValue}>{item.value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.infoBanner}>
              <CheckCircle2 size={18} color="#22c55e" />
              <Text style={styles.infoBannerText}>
                Email and mobile verification are required to continue with onboarding.
              </Text>
            </View>

            {/* Full Name */}
            <InputField
              label="Full Name"
              icon={<User size={18} color="#94A3B8" />}
              placeholder="Enter your full name"
              value={form.name}
              onChangeText={(t) => handleChange("name", t)}
              helper="Use the same name that appears on your government ID."
            />

            {/* Email */}
            <VerifyField
              label="Email"
              type="email"
              value={form.email}
              placeholder="Enter your email"
              icon={<Mail size={18} color="#94A3B8" />}
              verified={verified.email}
              otpMode={otpMode.email}
              onVerify={() => verifyHandler("email")}
              onOtpSubmit={() => handleOtpSubmit("email")}
              onChangeText={(t) => handleChange("email", t)}
              otp={otp.email}
              setOtp={(v) => setOtp({ ...otp, email: v })}
            />

            {/* Phone */}
            <VerifyField
              label="Mobile Number"
              type="phone"
              value={form.mobile}
              placeholder="Enter 10-digit mobile number"
              icon={<Phone size={18} color="#94A3B8" />}
              verified={verified.phone}
              otpMode={otpMode.phone}
              onVerify={() => verifyHandler("phone")}
              onOtpSubmit={() => handleOtpSubmit("phone")}
              onChangeText={(t) => handleChange("mobile", t.replace(/[^0-9]/g, ""))}
              otp={otp.phone}
              setOtp={(v) => setOtp({ ...otp, phone: v })}
            />

            {/* Password */}
            <InputField
              label="Password"
              icon={<Lock size={18} color="#94A3B8" />}
              placeholder="Create a strong password (min 8)"
              secureTextEntry
              value={form.password}
              onChangeText={(t) => handleChange("password", t)}
            />

            <InputField
              label="Confirm Password"
              icon={<Lock size={18} color="#94A3B8" />}
              placeholder="Re-enter your password"
              secureTextEntry
              value={form.confirmPassword}
              onChangeText={(t) => handleChange("confirmPassword", t)}
            />

            {/* Next Button */}
            <TouchableOpacity
              activeOpacity={0.9}
              disabled={!allValid}
              style={[styles.nextBtn, !allValid && { opacity: 0.6 }]}
            >
              <LinearGradient
                colors={allValid ? ["#00FF87", "#016B3A"] : ["#CBD5E1", "#94A3B8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.nextGradient}
              >
                <Text style={styles.nextText}>Next: Business Information</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* INPUT FIELD */
const InputField = ({ label, icon, helper, ...props }) => (
  <View style={styles.inputGroup}>
    <View style={styles.labelRow}>
      <Text style={styles.label}>{label}</Text>
    </View>
    <View style={styles.inputWrapper}>
      <View style={styles.icon}>{icon}</View>
      <TextInput style={styles.input} placeholderTextColor="#94A3B8" {...props} />
    </View>
    {helper ? <Text style={styles.helperText}>{helper}</Text> : null}
  </View>
);

/* VERIFY FIELD */
const VerifyField = ({
  label,
  icon,
  verified,
  otpMode,
  onVerify,
  onOtpSubmit,
  otp,
  setOtp,
  ...props
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <View style={styles.icon}>{icon}</View>
      <TextInput
        style={[styles.input, verified && { color: "#16A34A" }]}
        placeholderTextColor="#94A3B8"
        editable={!verified}
        {...props}
      />
      {!verified && !otpMode && (
        <TouchableOpacity style={styles.verifyBtn} onPress={onVerify}>
          <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>
      )}
      {verified && (
        <View style={styles.verifiedTag}>
          <CheckCircle2 size={16} color="#16A34A" />
          <Text style={styles.verifiedText}>Verified</Text>
        </View>
      )}
    </View>

    {otpMode && !verified && (
      <View style={styles.otpContainer}>
        <TextInput
          style={styles.otpInput}
          placeholder="Enter OTP"
          placeholderTextColor="#9CA3AF"
          value={otp}
          keyboardType="number-pad"
          maxLength={6}
          onChangeText={setOtp}
        />
        <TouchableOpacity
          style={[styles.verifyBtn, { marginLeft: 10 }]}
          onPress={onOtpSubmit}
        >
          <Text style={styles.verifyText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  scroll: { padding: 20, paddingBottom: 60 },
  heroCard: { marginBottom: 20 },
  heroGradient: {
    borderRadius: 24,
    padding: 18,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  heroSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  stepBadge: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  stepBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  heroStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  heroStat: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 16,
    padding: 12,
  },
  heroStatLabel: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
  },
  heroStatValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 4,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  stepItem: { flexDirection: "row", alignItems: "center" },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  stepCircleActive: {
    backgroundColor: "#00FF87",
    borderColor: "#016B3A",
  },
  stepNumber: { fontSize: 14, color: "#94A3B8", fontWeight: "700" },
  stepNumberActive: { color: "#012B17", fontWeight: "800" },
  stepLine: { width: 28, height: 2, backgroundColor: "#E5E7EB" },
  stepLineActive: { backgroundColor: "#00FF87" },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#012B17",
    marginBottom: 4,
  },
  sectionSub: { color: "#64748B", fontSize: 13, marginBottom: 12 },
  categoryStrip: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  categoryPill: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
  },
  categoryPillLabel: {
    fontSize: 11,
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  categoryPillValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#ECFDF5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 18,
  },
  infoBannerText: {
    flex: 1,
    color: "#064E3B",
    fontSize: 13,
    fontWeight: "600",
  },
  inputGroup: { marginBottom: 16 },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: { fontSize: 13, fontWeight: "700", color: "#012B17" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    height: 50,
  },
  icon: { marginRight: 8 },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#1E293B",
    fontWeight: "500",
  },
  helperText: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 6,
  },
  verifyBtn: {
    backgroundColor: "#DCFCE7",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  verifyText: { color: "#166534", fontWeight: "700", fontSize: 13 },
  verifiedTag: { flexDirection: "row", alignItems: "center", gap: 4 },
  verifiedText: { color: "#16A34A", fontWeight: "700", fontSize: 13 },
  otpContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  otpInput: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    height: 46,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: "#F9FAFB",
  },
  nextBtn: { borderRadius: 14, overflow: "hidden", marginTop: 20 },
  nextGradient: {
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  nextText: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 15,
    letterSpacing: 0.3,
  },
});
