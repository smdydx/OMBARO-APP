import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Building2, MapPin, Globe, Phone, Mail, AlertCircle, Check, Clock, Users, Utensils, Shield, ChevronRight, Sparkles } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Alert,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COLORS = {
  gradient1: "#00FF87",
  gradient2: "#016B3A",
  gradient3: "#013B1F",
  primary: "#016B3A",
  primaryLight: "#10B981",
  primaryDark: "#0D5C31",
  white: "#FFFFFF",
  text: "#1F2937",
  textSecondary: "#4B5563",
  textLight: "#9CA3AF",
  bg: "#F3F4F6",
  cardBg: "#FFFFFF",
  inputBg: "#F9FAFB",
  border: "#E5E7EB",
  divider: "#D1D5DB",
  success: "#10B981",
  error: "#EF4444",
  overlay: "rgba(0, 0, 0, 0.04)",
};

function useResponsiveScale() {
  const { width, height } = useWindowDimensions();
  
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  let base = width;
  if (isMobile) {
    base = Math.min(width, 480);
  } else if (isTablet) {
    base = Math.min(width - 40, 600);
  } else {
    base = Math.min(width - 60, 800);
  }

  const sw = (n) => Math.round((base / 390) * n);

  return {
    sw,
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    contentPaddingHorizontal: isMobile ? sw(16) : isTablet ? sw(20) : sw(28),
  };
}

const SmoothProgressBar = ({ currentStep, totalSteps, sw }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  return (
    <View style={{ marginBottom: sw(20) }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: sw(8), alignItems: "center" }}>
        <Text style={{ fontSize: Math.max(sw(10), 9), fontWeight: "500", color: COLORS.textSecondary, letterSpacing: 0.2 }}>
          PROGRESS
        </Text>
        <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.primary }}>
          {currentStep + 1}<Text style={{ fontWeight: "500", color: COLORS.textLight }}> / {totalSteps}</Text>
        </Text>
      </View>
      <View style={{ height: sw(6), backgroundColor: COLORS.border, borderRadius: sw(3), overflow: "hidden" }}>
        <LinearGradient
          colors={[COLORS.primaryLight, COLORS.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            height: "100%",
            width: `${progress}%`,
            borderRadius: sw(3),
          }}
        />
      </View>
    </View>
  );
};

const SectionHeader = ({ title, description, icon: Icon, sw }) => {
  return (
    <View style={{ marginBottom: sw(18) }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: sw(10), marginBottom: sw(6) }}>
        {Icon && (
          <View style={{ width: sw(36), height: sw(36), borderRadius: sw(10), backgroundColor: COLORS.primary + "12", alignItems: "center", justifyContent: "center" }}>
            <Icon size={sw(20)} color={COLORS.primary} strokeWidth={2} />
          </View>
        )}
        <Text style={{ fontSize: Math.max(sw(14), 12), fontWeight: "700", color: COLORS.text }}>
          {title}
        </Text>
      </View>
      {description && (
        <Text style={{ fontSize: Math.max(sw(10), 9), color: COLORS.textLight, marginLeft: Icon ? sw(46) : 0 }}>
          {description}
        </Text>
      )}
    </View>
  );
};

const PremiumFormInput = ({ label, placeholder, value, onChangeText, sw, icon: Icon, multiline = false, height = null, required = false, error = null }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputHeight = height || sw(52);
  
  return (
    <View style={{ marginBottom: sw(16) }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(6) }}>
        <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "600", color: COLORS.text }}>
          {label}
        </Text>
        {required && <Text style={{ color: COLORS.error, marginLeft: sw(4), fontSize: Math.max(sw(11), 10), fontWeight: "700" }}>*</Text>}
      </View>
      <Pressable
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: multiline ? "flex-start" : "center",
          borderWidth: 1.5,
          borderColor: error ? COLORS.error : isFocused ? COLORS.primary : COLORS.border,
          borderRadius: sw(12),
          paddingHorizontal: sw(14),
          paddingVertical: multiline ? sw(12) : 0,
          backgroundColor: isFocused ? COLORS.cardBg : COLORS.inputBg,
          minHeight: inputHeight,
          opacity: pressed ? 0.95 : 1,
        })}
      >
        {Icon && (
          <View style={{ marginRight: sw(12), marginTop: multiline ? sw(6) : 0 }}>
            <Icon size={Math.max(sw(18), 16)} color={isFocused ? COLORS.primary : COLORS.textLight} strokeWidth={2} />
          </View>
        )}
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          style={{
            flex: 1,
            paddingVertical: sw(10),
            fontSize: Math.max(sw(12), 11),
            color: COLORS.text,
            height: inputHeight,
            textAlignVertical: multiline ? "top" : "center",
            fontWeight: "500",
          }}
          placeholderTextColor={COLORS.textLight}
        />
      </Pressable>
      {error && (
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: sw(6) }}>
          <AlertCircle size={Math.max(sw(12), 11)} color={COLORS.error} strokeWidth={2} style={{ marginRight: sw(6) }} />
          <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.error, fontWeight: "600" }}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const PremiumDropdown = ({ label, value, options, onSelect, sw, required = false, error = null }) => {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ marginBottom: sw(16) }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(6) }}>
        <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "600", color: COLORS.text }}>
          {label}
        </Text>
        {required && <Text style={{ color: COLORS.error, marginLeft: sw(4), fontSize: Math.max(sw(11), 10), fontWeight: "700" }}>*</Text>}
      </View>
      <Pressable
        onPress={() => {
          setOpen(!open);
          setIsFocused(!open);
        }}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1.5,
          borderColor: error ? COLORS.error : isFocused ? COLORS.primary : COLORS.border,
          borderRadius: sw(12),
          paddingHorizontal: sw(14),
          paddingVertical: sw(14),
          backgroundColor: isFocused ? COLORS.cardBg : COLORS.inputBg,
          minHeight: sw(52),
          opacity: pressed ? 0.95 : 1,
        })}
      >
        <Text style={{ flex: 1, fontSize: Math.max(sw(12), 11), color: value ? COLORS.text : COLORS.textLight, fontWeight: "500" }}>
          {value || placeholder}
        </Text>
        <ChevronRight size={Math.max(sw(18), 16)} color={isFocused ? COLORS.primary : COLORS.textLight} strokeWidth={2.5} style={{ transform: [{ rotate: open ? "90deg" : "0deg" }] }} />
      </Pressable>

      {open && (
        <View
          style={{
            backgroundColor: COLORS.cardBg,
            borderWidth: 1,
            borderColor: COLORS.border,
            borderRadius: sw(12),
            marginTop: sw(8),
            maxHeight: sw(200),
            zIndex: 10,
            overflow: "hidden",
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {options.map((opt, idx) => (
              <Pressable
                key={idx}
                onPress={() => {
                  onSelect(opt);
                  setOpen(false);
                  setIsFocused(false);
                }}
                style={({ pressed }) => ({
                  paddingVertical: sw(13),
                  paddingHorizontal: sw(14),
                  backgroundColor: value === opt ? COLORS.primary + "08" : pressed ? COLORS.overlay : COLORS.cardBg,
                  borderBottomWidth: idx < options.length - 1 ? 1 : 0,
                  borderBottomColor: COLORS.divider,
                })}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {value === opt && (
                    <Check size={sw(16)} color={COLORS.primary} strokeWidth={3} style={{ marginRight: sw(8) }} />
                  )}
                  <Text style={{ fontSize: Math.max(sw(11), 10), color: COLORS.text, fontWeight: value === opt ? "700" : "500" }}>
                    {opt}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
      {error && (
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: sw(6) }}>
          <AlertCircle size={Math.max(sw(12), 11)} color={COLORS.error} strokeWidth={2} style={{ marginRight: sw(6) }} />
          <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.error, fontWeight: "600" }}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const PremiumAmenityItem = ({ icon: Icon, label, selected, onToggle, sw }) => {
  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => ({
        alignItems: "center",
        paddingVertical: sw(12),
        paddingHorizontal: sw(8),
        borderWidth: 2,
        borderColor: selected ? COLORS.primary : COLORS.border,
        borderRadius: sw(12),
        backgroundColor: selected ? COLORS.primary + "08" : COLORS.inputBg,
        justifyContent: "center",
        flex: 1,
        minHeight: sw(100),
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <View
        style={{
          width: sw(36),
          height: sw(36),
          borderRadius: sw(10),
          backgroundColor: selected ? COLORS.primary : COLORS.border,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: sw(8),
        }}
      >
        <Icon size={Math.max(sw(18), 16)} color={selected ? COLORS.white : COLORS.textLight} strokeWidth={2.5} />
      </View>
      <Text
        style={{
          fontSize: Math.max(sw(9), 8),
          color: COLORS.text,
          textAlign: "center",
          fontWeight: selected ? "700" : "600",
          lineHeight: Math.max(sw(11), 10),
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const amenitiesWithIcons = [
  { label: "Free WiFi", icon: Globe },
  { label: "Parking", icon: MapPin },
  { label: "Card Payment", icon: Shield },
  { label: "Refreshments", icon: Utensils },
  { label: "24/7 Security", icon: Shield },
  { label: "Air Conditioning", icon: Clock },
  { label: "Lockers", icon: Building2 },
  { label: "Shower Facilities", icon: Utensils },
];

export default function OnboardNewSpa({ onBack }) {
  const { sw, width, height, isMobile, isTablet, isDesktop, contentPaddingHorizontal } = useResponsiveScale();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    spaName: "", address: "", phone: "", email: "", website: "", description: "",
    openingTime: "", closingTime: "", priceRange: "", staffCount: "",
    instagram: "", facebook: "", twitter: "", amenities: [], specialities: "", mainService: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const savedData = await AsyncStorage.getItem("onboardSpaFormData");
      if (savedData) setFormData(JSON.parse(savedData));
    } catch (error) {
      console.log("Error loading form data:", error);
    }
  };

  const saveFormData = async () => {
    try {
      await AsyncStorage.setItem("onboardSpaFormData", JSON.stringify(formData));
    } catch (error) {
      console.log("Error saving form data:", error);
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 0) {
      if (!formData.spaName.trim()) newErrors.spaName = "Spa name required";
      if (!formData.address.trim()) newErrors.address = "Address required";
      if (!formData.phone.trim()) newErrors.phone = "Phone required";
      if (!formData.email.trim()) newErrors.email = "Email required";
      if (formData.email && !formData.email.includes("@")) newErrors.email = "Invalid email";
    }
    if (currentStep === 1) {
      if (!formData.openingTime.trim()) newErrors.openingTime = "Opening time required";
      if (!formData.closingTime.trim()) newErrors.closingTime = "Closing time required";
      if (!formData.staffCount.trim()) newErrors.staffCount = "Staff count required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
        saveFormData();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      saveFormData();
    }
  };

  const handleSubmit = () => {
    Alert.alert("Submit Spa Details", "Ready to onboard your spa? You can edit these details later.", [
      { text: "Cancel", onPress: () => {}, style: "cancel" },
      {
        text: "Submit",
        onPress: async () => {
          setLoading(true);
          console.log("Form submitted:", formData);
          await AsyncStorage.removeItem("onboardSpaFormData");
          Alert.alert("Success!", "Your spa has been onboarded successfully.", [
            {
              text: "Done",
              onPress: () => {
                setFormData({
                  spaName: "", address: "", phone: "", email: "", website: "", description: "",
                  openingTime: "", closingTime: "", priceRange: "", staffCount: "",
                  instagram: "", facebook: "", twitter: "", amenities: [], specialities: "", mainService: "",
                });
                setCurrentStep(0);
              },
            },
          ]);
          setLoading(false);
        },
      },
    ]);
  };

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  const descriptionOptions = ["Full Service Spa", "Day Spa", "Medical Spa", "Wellness Center", "Beauty Salon", "Massage Center"];
  const priceRanges = ["Budget ₹500-1000", "Mid-range ₹2000-5000", "Premium ₹5000-10000", "Luxury ₹10000+"];
  const amenityGridCols = isMobile ? 4 : isTablet ? 6 : 8;
  const amenityWidth = `${100 / amenityGridCols}%`;

  const steps = [
    { title: "Basic Info", description: "Your spa details" },
    { title: "Operating", description: "Hours & pricing" },
    { title: "Amenities", description: "Facilities offered" },
    { title: "Services", description: "Main services" },
    { title: "Review", description: "Confirm details" },
  ];

  if (isMobile) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />

        {/* Header */}
        <LinearGradient
          colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingHorizontal: contentPaddingHorizontal, paddingTop: sw(14), paddingBottom: sw(16) }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: sw(12) }}>
            <Pressable onPress={onBack} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
              <ArrowLeft size={Math.max(sw(24), 20)} color={COLORS.white} strokeWidth={2.5} />
            </Pressable>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: Math.max(sw(14), 13), fontWeight: "800", color: COLORS.white, marginBottom: sw(2) }}>
                Onboard New Spa
              </Text>
              <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.white + "90" }}>
                Step {currentStep + 1} of 5
              </Text>
            </View>
          </View>
        </LinearGradient>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: contentPaddingHorizontal, paddingVertical: sw(16) }}
          showsVerticalScrollIndicator={false}
        >
          <SmoothProgressBar currentStep={currentStep} totalSteps={5} sw={sw} />

          {currentStep === 0 && (
            <View style={{ marginBottom: sw(20) }}>
              <SectionHeader title="Spa Information" description="Tell us about your business" icon={Building2} sw={sw} />
              <PremiumFormInput label="Spa Name" placeholder="Your spa name" value={formData.spaName} onChangeText={(v) => updateFormData("spaName", v)} sw={sw} icon={Building2} required error={errors.spaName} />
              <PremiumFormInput label="Location Address" placeholder="Full address" value={formData.address} onChangeText={(v) => updateFormData("address", v)} sw={sw} icon={MapPin} multiline height={sw(90)} required error={errors.address} />
              <PremiumFormInput label="Phone Number" placeholder="+91 98765 43210" value={formData.phone} onChangeText={(v) => updateFormData("phone", v)} sw={sw} icon={Phone} required error={errors.phone} />
              <PremiumFormInput label="Email Address" placeholder="you@yourspa.com" value={formData.email} onChangeText={(v) => updateFormData("email", v)} sw={sw} icon={Mail} required error={errors.email} />
              <PremiumFormInput label="Website" placeholder="yourwebsite.com" value={formData.website} onChangeText={(v) => updateFormData("website", v)} sw={sw} icon={Globe} />
              <PremiumDropdown label="Business Type" value={formData.description} options={descriptionOptions} onSelect={(v) => updateFormData("description", v)} sw={sw} placeholder="Select business type" />
            </View>
          )}

          {currentStep === 1 && (
            <View style={{ marginBottom: sw(20) }}>
              <SectionHeader title="Operating Hours" description="Set your working schedule" icon={Clock} sw={sw} />
              <PremiumFormInput label="Opening Time" placeholder="09:00 AM" value={formData.openingTime} onChangeText={(v) => updateFormData("openingTime", v)} sw={sw} required error={errors.openingTime} />
              <PremiumFormInput label="Closing Time" placeholder="09:00 PM" value={formData.closingTime} onChangeText={(v) => updateFormData("closingTime", v)} sw={sw} required error={errors.closingTime} />
              <PremiumDropdown label="Price Range" value={formData.priceRange} options={priceRanges} onSelect={(v) => updateFormData("priceRange", v)} sw={sw} placeholder="Select price range" />
              <PremiumFormInput label="Staff Count" placeholder="e.g. 5-10" value={formData.staffCount} onChangeText={(v) => updateFormData("staffCount", v)} sw={sw} icon={Users} required error={errors.staffCount} />
              
              <View style={{ marginTop: sw(16), paddingTop: sw(16), borderTopWidth: 1, borderTopColor: COLORS.border }}>
                <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.text, marginBottom: sw(10) }}>Social Media</Text>
                <PremiumFormInput label="Instagram" placeholder="@yourhandle" value={formData.instagram} onChangeText={(v) => updateFormData("instagram", v)} sw={sw} />
                <PremiumFormInput label="Facebook" placeholder="Your Page" value={formData.facebook} onChangeText={(v) => updateFormData("facebook", v)} sw={sw} />
                <PremiumFormInput label="Twitter" placeholder="@yourhandle" value={formData.twitter} onChangeText={(v) => updateFormData("twitter", v)} sw={sw} />
              </View>
            </View>
          )}

          {currentStep === 2 && (
            <View style={{ marginBottom: sw(20) }}>
              <SectionHeader title="Amenities" description="What facilities do you offer?" icon={Utensils} sw={sw} />
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: sw(8), marginBottom: sw(20) }}>
                {amenitiesWithIcons.map((item, idx) => (
                  <View key={idx} style={{ width: amenityWidth, paddingHorizontal: sw(2) }}>
                    <PremiumAmenityItem
                      icon={item.icon}
                      label={item.label}
                      selected={formData.amenities.includes(item.label)}
                      onToggle={() => {
                        const amenities = formData.amenities.includes(item.label)
                          ? formData.amenities.filter((a) => a !== item.label)
                          : [...formData.amenities, item.label];
                        updateFormData("amenities", amenities);
                      }}
                      sw={sw}
                    />
                  </View>
                ))}
              </View>
              <PremiumFormInput label="Specialities" placeholder="Deep Tissue, Aromatherapy..." value={formData.specialities} onChangeText={(v) => updateFormData("specialities", v)} sw={sw} multiline height={sw(90)} />
            </View>
          )}

          {currentStep === 3 && (
            <View style={{ marginBottom: sw(20) }}>
              <SectionHeader title="Services" description="What services do you offer?" icon={Sparkles} sw={sw} />
              <PremiumFormInput label="Main Services" placeholder="E.g., Massage, Facial, Hair Treatment..." value={formData.mainService} onChangeText={(v) => updateFormData("mainService", v)} sw={sw} multiline height={sw(110)} />
              <View style={{ backgroundColor: COLORS.primary + "08", borderRadius: sw(12), padding: sw(14), marginTop: sw(14), borderLeftWidth: 4, borderLeftColor: COLORS.primary }}>
                <Text style={{ fontSize: Math.max(sw(10), 9), fontWeight: "700", color: COLORS.text, marginBottom: sw(4) }}>💡 Tip</Text>
                <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.textSecondary }}>Separate services with commas. Example: Swedish Massage, Hot Stone, Facial</Text>
              </View>
            </View>
          )}

          {currentStep === 4 && (
            <View style={{ marginBottom: sw(20) }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: sw(10), marginBottom: sw(18) }}>
                <View style={{ width: sw(36), height: sw(36), borderRadius: sw(10), backgroundColor: COLORS.success + "20", alignItems: "center", justifyContent: "center" }}>
                  <Check size={sw(20)} color={COLORS.success} strokeWidth={3} />
                </View>
                <Text style={{ fontSize: Math.max(sw(14), 12), fontWeight: "700", color: COLORS.text }}>
                  Review Your Details
                </Text>
              </View>

              {/* Basic Info Card */}
              <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(14), padding: sw(14), marginBottom: sw(12), borderWidth: 1, borderColor: COLORS.border }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: sw(8), marginBottom: sw(12), paddingBottom: sw(12), borderBottomWidth: 1, borderBottomColor: COLORS.divider }}>
                  <View style={{ width: sw(32), height: sw(32), borderRadius: sw(8), backgroundColor: COLORS.primary + "12", alignItems: "center", justifyContent: "center" }}>
                    <Building2 size={sw(16)} color={COLORS.primary} strokeWidth={2} />
                  </View>
                  <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.text }}>Business Details</Text>
                </View>
                <View style={{ gap: sw(8) }}>
                  <View>
                    <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.textLight, fontWeight: "600", marginBottom: sw(2) }}>Spa Name</Text>
                    <Text style={{ fontSize: Math.max(sw(11), 10), color: COLORS.text, fontWeight: "600" }}>{formData.spaName}</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.textLight, fontWeight: "600", marginBottom: sw(2) }}>Location</Text>
                    <Text style={{ fontSize: Math.max(sw(11), 10), color: COLORS.text, fontWeight: "600" }}>{formData.address}</Text>
                  </View>
                </View>
              </View>

              {/* Operating Details Card */}
              <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(14), padding: sw(14), marginBottom: sw(12), borderWidth: 1, borderColor: COLORS.border }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: sw(8), marginBottom: sw(12), paddingBottom: sw(12), borderBottomWidth: 1, borderBottomColor: COLORS.divider }}>
                  <View style={{ width: sw(32), height: sw(32), borderRadius: sw(8), backgroundColor: COLORS.primary + "12", alignItems: "center", justifyContent: "center" }}>
                    <Clock size={sw(16)} color={COLORS.primary} strokeWidth={2} />
                  </View>
                  <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.text }}>Operating Hours</Text>
                </View>
                <View style={{ gap: sw(8) }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.textLight, fontWeight: "600" }}>Hours</Text>
                    <Text style={{ fontSize: Math.max(sw(11), 10), color: COLORS.text, fontWeight: "700" }}>{formData.openingTime} - {formData.closingTime}</Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.textLight, fontWeight: "600" }}>Staff</Text>
                    <Text style={{ fontSize: Math.max(sw(11), 10), color: COLORS.text, fontWeight: "700" }}>{formData.staffCount}</Text>
                  </View>
                </View>
              </View>

              {/* Amenities Card */}
              {formData.amenities.length > 0 && (
                <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(14), padding: sw(14), marginBottom: sw(12), borderWidth: 1, borderColor: COLORS.border }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: sw(8), marginBottom: sw(12), paddingBottom: sw(12), borderBottomWidth: 1, borderBottomColor: COLORS.divider }}>
                    <View style={{ width: sw(32), height: sw(32), borderRadius: sw(8), backgroundColor: COLORS.primary + "12", alignItems: "center", justifyContent: "center" }}>
                      <Utensils size={sw(16)} color={COLORS.primary} strokeWidth={2} />
                    </View>
                    <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.text }}>Amenities ({formData.amenities.length})</Text>
                  </View>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: sw(6) }}>
                    {formData.amenities.map((amenity, idx) => (
                      <View key={idx} style={{ backgroundColor: COLORS.primary + "12", paddingHorizontal: sw(10), paddingVertical: sw(6), borderRadius: sw(8), borderWidth: 1, borderColor: COLORS.primary + "30" }}>
                        <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.primary, fontWeight: "700" }}>
                          {amenity}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
        </ScrollView>

        {/* Footer Buttons */}
        <View style={{ backgroundColor: COLORS.white, paddingHorizontal: contentPaddingHorizontal, paddingVertical: sw(14), gap: sw(10), borderTopWidth: 1, borderTopColor: COLORS.border }}>
          <View style={{ flexDirection: "row", gap: sw(10) }}>
            {currentStep > 0 && (
              <Pressable
                onPress={handlePrevious}
                style={({ pressed }) => ({
                  flex: 1,
                  paddingVertical: sw(14),
                  borderRadius: sw(10),
                  borderWidth: 1.5,
                  borderColor: COLORS.primary,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: pressed ? COLORS.primary + "08" : COLORS.white,
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text style={{ fontSize: Math.max(sw(12), 11), fontWeight: "700", color: COLORS.primary }}>Back</Text>
              </Pressable>
            )}
            <Pressable
              onPress={currentStep === 4 ? handleSubmit : handleNext}
              style={({ pressed }) => ({
                flex: 1,
                paddingVertical: 0,
                borderRadius: sw(10),
                overflow: "hidden",
                minHeight: sw(48),
                opacity: pressed || loading ? 0.85 : 1,
              })}
              disabled={loading}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: "100%",
                  paddingVertical: sw(14),
                  borderRadius: sw(10),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: Math.max(sw(12), 11), fontWeight: "700", color: COLORS.white }}>
                  {loading ? "Submitting..." : currentStep === 4 ? "Submit" : "Continue"}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  // Desktop/Tablet layout
  const sidebarWidth = isDesktop ? "33.33%" : "40%";
  const formWidth = isDesktop ? "66.67%" : "60%";

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg, flexDirection: "row" }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Left Sidebar */}
      <LinearGradient
        colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ width: sidebarWidth, paddingHorizontal: sw(18), paddingVertical: sw(24) }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable onPress={onBack} style={({ pressed }) => ({ marginBottom: sw(24), opacity: pressed ? 0.7 : 1 })}>
            <ArrowLeft size={sw(24)} color={COLORS.white} strokeWidth={2.5} />
          </Pressable>

          <View style={{ marginBottom: sw(32) }}>
            <Text style={{ fontSize: sw(22), fontWeight: "800", color: COLORS.white, marginBottom: sw(6) }}>
              Onboard Your Spa
            </Text>
            <Text style={{ fontSize: sw(11), color: COLORS.white + "85" }}>
              Complete all steps to get started
            </Text>
          </View>

          {steps.map((step, idx) => (
            <Pressable
              key={idx}
              style={({ pressed }) => ({
                paddingVertical: sw(14),
                paddingHorizontal: sw(14),
                marginBottom: sw(10),
                borderRadius: sw(12),
                backgroundColor: idx === currentStep ? COLORS.white + "20" : COLORS.white + "08",
                borderWidth: 1.5,
                borderColor: idx === currentStep ? COLORS.white : COLORS.white + "20",
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: sw(10) }}>
                <View
                  style={{
                    width: sw(36),
                    height: sw(36),
                    borderRadius: sw(10),
                    backgroundColor: idx < currentStep ? COLORS.success : idx === currentStep ? COLORS.white : COLORS.white + "30",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {idx < currentStep ? (
                    <Check size={sw(18)} color={COLORS.primary} strokeWidth={3} />
                  ) : (
                    <Text style={{ fontSize: sw(14), fontWeight: "800", color: idx === currentStep ? COLORS.primary : COLORS.white }}>{idx + 1}</Text>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.white, marginBottom: sw(2) }}>
                    {step.title}
                  </Text>
                  <Text style={{ fontSize: sw(10), color: COLORS.white + "75" }}>{step.description}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </LinearGradient>

      {/* Right Form Area */}
      <View style={{ width: formWidth, backgroundColor: COLORS.bg, flexDirection: "column" }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: sw(24), paddingVertical: sw(28) }}
          showsVerticalScrollIndicator={false}
        >
          {currentStep === 0 && (
            <View>
              <SectionHeader title="Business Information" description="Tell us about your spa" sw={sw} />
              <PremiumFormInput label="Spa Name" placeholder="Enter spa name" value={formData.spaName} onChangeText={(v) => updateFormData("spaName", v)} sw={sw} icon={Building2} required error={errors.spaName} />
              <PremiumFormInput label="Address" placeholder="Complete address" value={formData.address} onChangeText={(v) => updateFormData("address", v)} sw={sw} icon={MapPin} multiline height={sw(100)} required error={errors.address} />
              <View style={{ flexDirection: "row", gap: sw(14) }}>
                <View style={{ flex: 1 }}>
                  <PremiumFormInput label="Phone" placeholder="+91 98765 43210" value={formData.phone} onChangeText={(v) => updateFormData("phone", v)} sw={sw} icon={Phone} required error={errors.phone} />
                </View>
                <View style={{ flex: 1 }}>
                  <PremiumFormInput label="Email" placeholder="you@spa.com" value={formData.email} onChangeText={(v) => updateFormData("email", v)} sw={sw} icon={Mail} required error={errors.email} />
                </View>
              </View>
              <PremiumFormInput label="Website" placeholder="yourwebsite.com" value={formData.website} onChangeText={(v) => updateFormData("website", v)} sw={sw} icon={Globe} />
              <PremiumDropdown label="Business Type" value={formData.description} options={descriptionOptions} onSelect={(v) => updateFormData("description", v)} sw={sw} placeholder="Select type" />
            </View>
          )}

          {currentStep === 1 && (
            <View>
              <SectionHeader title="Operating Schedule" description="Set your hours and pricing" sw={sw} />
              <View style={{ flexDirection: "row", gap: sw(14) }}>
                <View style={{ flex: 1 }}>
                  <PremiumFormInput label="Opening Time" placeholder="09:00 AM" value={formData.openingTime} onChangeText={(v) => updateFormData("openingTime", v)} sw={sw} required error={errors.openingTime} />
                </View>
                <View style={{ flex: 1 }}>
                  <PremiumFormInput label="Closing Time" placeholder="09:00 PM" value={formData.closingTime} onChangeText={(v) => updateFormData("closingTime", v)} sw={sw} required error={errors.closingTime} />
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: sw(14) }}>
                <View style={{ flex: 1 }}>
                  <PremiumDropdown label="Price Range" value={formData.priceRange} options={priceRanges} onSelect={(v) => updateFormData("priceRange", v)} sw={sw} placeholder="Select range" />
                </View>
                <View style={{ flex: 1 }}>
                  <PremiumFormInput label="Staff Count" placeholder="5-10" value={formData.staffCount} onChangeText={(v) => updateFormData("staffCount", v)} sw={sw} icon={Users} required error={errors.staffCount} />
                </View>
              </View>
              <View style={{ marginTop: sw(18), paddingTop: sw(18), borderTopWidth: 1, borderTopColor: COLORS.border }}>
                <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(12) }}>Social Media Links</Text>
                <PremiumFormInput label="Instagram" placeholder="@yourhandle" value={formData.instagram} onChangeText={(v) => updateFormData("instagram", v)} sw={sw} />
                <PremiumFormInput label="Facebook" placeholder="Your Page" value={formData.facebook} onChangeText={(v) => updateFormData("facebook", v)} sw={sw} />
                <PremiumFormInput label="Twitter" placeholder="@yourhandle" value={formData.twitter} onChangeText={(v) => updateFormData("twitter", v)} sw={sw} />
              </View>
            </View>
          )}

          {currentStep === 2 && (
            <View>
              <SectionHeader title="Amenities" description="What facilities do you offer?" sw={sw} />
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: sw(10), marginBottom: sw(24) }}>
                {amenitiesWithIcons.map((item, idx) => (
                  <View key={idx} style={{ width: amenityWidth, paddingHorizontal: sw(2) }}>
                    <PremiumAmenityItem
                      icon={item.icon}
                      label={item.label}
                      selected={formData.amenities.includes(item.label)}
                      onToggle={() => {
                        const amenities = formData.amenities.includes(item.label)
                          ? formData.amenities.filter((a) => a !== item.label)
                          : [...formData.amenities, item.label];
                        updateFormData("amenities", amenities);
                      }}
                      sw={sw}
                    />
                  </View>
                ))}
              </View>
              <PremiumFormInput label="Specialities" placeholder="E.g., Deep Tissue, Aromatherapy..." value={formData.specialities} onChangeText={(v) => updateFormData("specialities", v)} sw={sw} multiline height={sw(100)} />
            </View>
          )}

          {currentStep === 3 && (
            <View>
              <SectionHeader title="Your Services" description="Describe what you offer" sw={sw} />
              <PremiumFormInput label="Main Services" placeholder="List your services..." value={formData.mainService} onChangeText={(v) => updateFormData("mainService", v)} sw={sw} multiline height={sw(140)} />
              <View style={{ backgroundColor: COLORS.primary + "08", borderRadius: sw(12), padding: sw(14), marginTop: sw(16), borderLeftWidth: 4, borderLeftColor: COLORS.primary }}>
                <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text, marginBottom: sw(4) }}>💡 Pro Tip</Text>
                <Text style={{ fontSize: sw(10), color: COLORS.textSecondary }}>Separate each service with a comma for better organization and searchability.</Text>
              </View>
            </View>
          )}

          {currentStep === 4 && (
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: sw(12), marginBottom: sw(24) }}>
                <View style={{ width: sw(40), height: sw(40), borderRadius: sw(12), backgroundColor: COLORS.success + "15", alignItems: "center", justifyContent: "center" }}>
                  <Check size={sw(22)} color={COLORS.success} strokeWidth={3} />
                </View>
                <Text style={{ fontSize: sw(18), fontWeight: "800", color: COLORS.text }}>Final Review</Text>
              </View>

              <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(14), padding: sw(16), marginBottom: sw(14), borderWidth: 1, borderColor: COLORS.border }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: sw(10), marginBottom: sw(14), paddingBottom: sw(14), borderBottomWidth: 1, borderBottomColor: COLORS.divider }}>
                  <View style={{ width: sw(36), height: sw(36), borderRadius: sw(10), backgroundColor: COLORS.primary + "12", alignItems: "center", justifyContent: "center" }}>
                    <Building2 size={sw(18)} color={COLORS.primary} strokeWidth={2} />
                  </View>
                  <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>Business Details</Text>
                </View>
                <View style={{ gap: sw(10) }}>
                  <View>
                    <Text style={{ fontSize: sw(10), color: COLORS.textLight, fontWeight: "600", marginBottom: sw(3) }}>SPA NAME</Text>
                    <Text style={{ fontSize: sw(12), color: COLORS.text, fontWeight: "700" }}>{formData.spaName}</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: sw(10), color: COLORS.textLight, fontWeight: "600", marginBottom: sw(3) }}>LOCATION</Text>
                    <Text style={{ fontSize: sw(12), color: COLORS.text, fontWeight: "700" }}>{formData.address}</Text>
                  </View>
                </View>
              </View>

              <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(14), padding: sw(16), marginBottom: sw(14), borderWidth: 1, borderColor: COLORS.border }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: sw(10), marginBottom: sw(14), paddingBottom: sw(14), borderBottomWidth: 1, borderBottomColor: COLORS.divider }}>
                  <View style={{ width: sw(36), height: sw(36), borderRadius: sw(10), backgroundColor: COLORS.primary + "12", alignItems: "center", justifyContent: "center" }}>
                    <Clock size={sw(18)} color={COLORS.primary} strokeWidth={2} />
                  </View>
                  <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>Operating Details</Text>
                </View>
                <View style={{ gap: sw(8) }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: sw(10), color: COLORS.textLight, fontWeight: "600" }}>HOURS</Text>
                    <Text style={{ fontSize: sw(12), color: COLORS.text, fontWeight: "700" }}>{formData.openingTime} - {formData.closingTime}</Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: sw(10), color: COLORS.textLight, fontWeight: "600" }}>PRICE RANGE</Text>
                    <Text style={{ fontSize: sw(12), color: COLORS.text, fontWeight: "700" }}>{formData.priceRange}</Text>
                  </View>
                </View>
              </View>

              {formData.amenities.length > 0 && (
                <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(14), padding: sw(16), borderWidth: 1, borderColor: COLORS.border }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: sw(10), marginBottom: sw(12) }}>
                    <View style={{ width: sw(36), height: sw(36), borderRadius: sw(10), backgroundColor: COLORS.primary + "12", alignItems: "center", justifyContent: "center" }}>
                      <Utensils size={sw(18)} color={COLORS.primary} strokeWidth={2} />
                    </View>
                    <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>Amenities ({formData.amenities.length})</Text>
                  </View>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: sw(8) }}>
                    {formData.amenities.map((amenity, idx) => (
                      <View key={idx} style={{ backgroundColor: COLORS.primary + "12", paddingHorizontal: sw(12), paddingVertical: sw(7), borderRadius: sw(8), borderWidth: 1, borderColor: COLORS.primary + "30" }}>
                        <Text style={{ fontSize: sw(10), color: COLORS.primary, fontWeight: "700" }}>{amenity}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
        </ScrollView>

        {/* Footer */}
        <View style={{ backgroundColor: COLORS.white, paddingHorizontal: sw(24), paddingVertical: sw(18), gap: sw(12), borderTopWidth: 1, borderTopColor: COLORS.border }}>
          <View style={{ flexDirection: "row", gap: sw(12) }}>
            {currentStep > 0 && (
              <Pressable
                onPress={handlePrevious}
                style={({ pressed }) => ({
                  flex: 1,
                  paddingVertical: sw(14),
                  borderRadius: sw(10),
                  borderWidth: 1.5,
                  borderColor: COLORS.primary,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: pressed ? COLORS.primary + "08" : COLORS.white,
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.primary }}>Back</Text>
              </Pressable>
            )}
            <Pressable
              onPress={currentStep === 4 ? handleSubmit : handleNext}
              style={({ pressed }) => ({
                flex: 1,
                paddingVertical: 0,
                borderRadius: sw(10),
                overflow: "hidden",
                minHeight: sw(48),
                opacity: pressed || loading ? 0.85 : 1,
              })}
              disabled={loading}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: "100%",
                  paddingVertical: sw(14),
                  borderRadius: sw(10),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.white }}>
                  {loading ? "Submitting..." : currentStep === 4 ? "Submit" : "Continue"}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
