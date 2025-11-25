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
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COLORS = {
  gradient1: "#00FF87",
  gradient2: "#016B3A",
  gradient3: "#013B1F",
  gradientAlt: "#00DD7F",
  primary: "#016B3A",
  primaryLight: "#10B981",
  primaryDark: "#0D5C31",
  white: "#FFFFFF",
  text: "#0F172A",
  textSecondary: "#475569",
  textLight: "#94A3B8",
  bg: "#F8FAFC",
  cardBg: "#F1F5F9",
  border: "#E2E8F0",
  success: "#10B981",
  warning: "#F59E0B",
  blue: "#0EA5E9",
  blueHover: "#0284C7",
  error: "#EF4444",
  shadow: "rgba(0, 0, 0, 0.1)",
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

const ModernProgressBar = ({ currentStep, totalSteps, sw }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  return (
    <View style={{ marginBottom: sw(20) }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: sw(8), alignItems: "center" }}>
        <Text style={{ fontSize: Math.max(sw(10), 9), fontWeight: "600", color: COLORS.text }}>
          Progress
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: sw(4) }}>
          <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.primary }}>
            {currentStep + 1}
          </Text>
          <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "600", color: COLORS.textLight }}>
            of {totalSteps}
          </Text>
        </View>
      </View>
      <View style={{ height: sw(8), backgroundColor: COLORS.cardBg, borderRadius: sw(4), overflow: "hidden", shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 }}>
        <LinearGradient
          colors={[COLORS.primaryLight, COLORS.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            height: "100%",
            width: `${progress}%`,
            borderRadius: sw(4),
          }}
        />
      </View>
    </View>
  );
};

const ModernStepCard = ({ number, title, description, isActive, isCompleted, sw }) => {
  return (
    <LinearGradient
      colors={isActive ? [COLORS.white + "25", COLORS.white + "10"] : isCompleted ? [COLORS.success + "15", COLORS.success + "08"] : [COLORS.white + "08", COLORS.white + "03"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        paddingVertical: sw(14),
        paddingHorizontal: sw(14),
        marginBottom: sw(10),
        borderRadius: sw(12),
        borderWidth: 1,
        borderColor: isActive ? COLORS.white + "40" : isCompleted ? COLORS.success + "30" : COLORS.white + "20",
        shadowColor: isActive ? COLORS.primary : "transparent",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isActive ? 0.1 : 0,
        shadowRadius: 8,
        elevation: isActive ? 3 : 0,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: sw(10) }}>
        <View
          style={{
            width: sw(36),
            height: sw(36),
            borderRadius: sw(10),
            backgroundColor: isCompleted ? COLORS.success : isActive ? COLORS.white : COLORS.white + "30",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: isCompleted || isActive ? COLORS.shadow : "transparent",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          {isCompleted ? (
            <Check size={sw(18)} color={COLORS.primary} strokeWidth={3} />
          ) : (
            <Text style={{ fontSize: sw(14), fontWeight: "800", color: isActive ? COLORS.primary : COLORS.textLight }}>
              {number}
            </Text>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: Math.max(sw(12), 11), fontWeight: "700", color: COLORS.white, marginBottom: sw(2) }}>
            {title}
          </Text>
          {description && (
            <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.white + "75", fontWeight: "500" }}>
              {description}
            </Text>
          )}
        </View>
        {isActive && (
          <ChevronRight size={sw(18)} color={COLORS.white + "60"} strokeWidth={2} />
        )}
      </View>
    </LinearGradient>
  );
};

const ModernFormInput = ({ label, placeholder, value, onChangeText, sw, icon: Icon, multiline = false, height = null, required = false, error = null }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputHeight = height || sw(48);
  
  return (
    <View style={{ marginBottom: sw(16) }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(6) }}>
        <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "600", color: COLORS.text, flex: 1 }}>
          {label}
        </Text>
        {required && <Text style={{ color: COLORS.error, marginLeft: sw(4), fontSize: Math.max(sw(11), 10), fontWeight: "700" }}>*</Text>}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: multiline ? "flex-start" : "center",
          borderWidth: 1.5,
          borderColor: error ? COLORS.error : isFocused ? COLORS.primary : COLORS.border,
          borderRadius: sw(10),
          paddingHorizontal: sw(14),
          paddingVertical: multiline ? sw(12) : 0,
          backgroundColor: isFocused ? COLORS.white : COLORS.cardBg,
          minHeight: inputHeight,
          shadowColor: isFocused ? COLORS.primary : "transparent",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isFocused ? 0.08 : 0,
          shadowRadius: 6,
          elevation: isFocused ? 2 : 0,
        }}
      >
        {Icon && <Icon size={Math.max(sw(18), 16)} color={isFocused ? COLORS.primary : COLORS.textLight} strokeWidth={2} style={{ marginRight: sw(10), marginTop: multiline ? sw(6) : 0 }} />}
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
      </View>
      {error && (
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: sw(6) }}>
          <AlertCircle size={Math.max(sw(12), 11)} color={COLORS.error} strokeWidth={2} style={{ marginRight: sw(6) }} />
          <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.error, fontWeight: "600" }}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const ModernDropdown = ({ label, value, options, onSelect, sw, required = false, error = null }) => {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ marginBottom: sw(16) }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(6) }}>
        <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "600", color: COLORS.text, flex: 1 }}>
          {label}
        </Text>
        {required && <Text style={{ color: COLORS.error, marginLeft: sw(4), fontSize: Math.max(sw(11), 10), fontWeight: "700" }}>*</Text>}
      </View>
      <TouchableOpacity
        onPress={() => {
          setOpen(!open);
          setIsFocused(!open);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1.5,
          borderColor: error ? COLORS.error : isFocused ? COLORS.primary : COLORS.border,
          borderRadius: sw(10),
          paddingHorizontal: sw(14),
          paddingVertical: sw(14),
          backgroundColor: isFocused ? COLORS.white : COLORS.cardBg,
          minHeight: sw(48),
          shadowColor: isFocused ? COLORS.primary : "transparent",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isFocused ? 0.08 : 0,
          shadowRadius: 6,
          elevation: isFocused ? 2 : 0,
        }}
      >
        <Text style={{ flex: 1, fontSize: Math.max(sw(12), 11), color: value ? COLORS.text : COLORS.textLight, fontWeight: "500" }}>
          {value || "Select option"}
        </Text>
        <ChevronRight size={Math.max(sw(18), 16)} color={COLORS.primary} strokeWidth={2} style={{ transform: [{ rotate: open ? "90deg" : "0deg" }] }} />
      </TouchableOpacity>

      {open && (
        <View
          style={{
            backgroundColor: COLORS.white,
            borderWidth: 1,
            borderColor: COLORS.border,
            borderRadius: sw(10),
            marginTop: sw(8),
            maxHeight: sw(180),
            zIndex: 10,
            shadowColor: COLORS.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 5,
            overflow: "hidden",
          }}
        >
          <ScrollView>
            {options.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  onSelect(opt);
                  setOpen(false);
                  setIsFocused(false);
                }}
                style={{
                  paddingVertical: sw(12),
                  paddingHorizontal: sw(14),
                  backgroundColor: value === opt ? COLORS.primaryLight + "15" : COLORS.white,
                  borderBottomWidth: idx < options.length - 1 ? 1 : 0,
                  borderBottomColor: COLORS.cardBg,
                }}
              >
                <Text style={{ fontSize: Math.max(sw(11), 10), color: COLORS.text, fontWeight: value === opt ? "700" : "500" }}>
                  {value === opt && "✓ "}{opt}
                </Text>
              </TouchableOpacity>
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

const ModernAmenityItem = ({ icon: Icon, label, selected, onToggle, sw }) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={{
        alignItems: "center",
        paddingVertical: sw(12),
        paddingHorizontal: sw(8),
        borderWidth: 1.5,
        borderColor: selected ? COLORS.primary : COLORS.border,
        borderRadius: sw(12),
        backgroundColor: selected ? COLORS.primary + "08" : COLORS.white,
        justifyContent: "center",
        flex: 1,
        minHeight: sw(100),
        shadowColor: selected ? COLORS.primary : "transparent",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: selected ? 0.1 : 0,
        shadowRadius: 4,
        elevation: selected ? 2 : 0,
      }}
    >
      <LinearGradient
        colors={selected ? [COLORS.primary, COLORS.primaryDark] : [COLORS.cardBg, COLORS.cardBg]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: sw(32),
          height: sw(32),
          borderRadius: sw(12),
          alignItems: "center",
          justifyContent: "center",
          marginBottom: sw(8),
        }}
      >
        <Icon size={Math.max(sw(16), 14)} color={selected ? COLORS.white : COLORS.primary} strokeWidth={2.5} />
      </LinearGradient>
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
    </TouchableOpacity>
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
    Alert.alert("Confirm Submission", "Ready to submit your spa details?", [
      { text: "Cancel", onPress: () => {}, style: "cancel" },
      {
        text: "Submit",
        onPress: async () => {
          setLoading(true);
          console.log("Form submitted:", formData);
          await AsyncStorage.removeItem("onboardSpaFormData");
          Alert.alert("Success", "Your spa has been onboarded successfully!", [
            {
              text: "OK",
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
  const priceRanges = ["Budget (₹) - ₹500-1000", "Mid-range (₹₹) - ₹2000-5000", "Premium (₹₹₹) - ₹5000-10000", "Luxury (₹₹₹₹) - ₹10000+"];
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
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

        <LinearGradient
          colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingHorizontal: contentPaddingHorizontal, paddingTop: sw(14), paddingBottom: sw(18) }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(10) }}>
            <TouchableOpacity onPress={onBack} style={{ marginRight: sw(12), padding: sw(6), backgroundColor: COLORS.white + "20", borderRadius: sw(10) }}>
              <ArrowLeft size={Math.max(sw(20), 18)} color={COLORS.white} strokeWidth={2.5} />
            </TouchableOpacity>
            <Building2 size={Math.max(sw(24), 20)} color={COLORS.white} strokeWidth={2} />
            <Text
              style={{
                fontSize: Math.max(sw(14), 12),
                fontWeight: "800",
                color: COLORS.white,
                marginLeft: sw(10),
                flex: 1,
              }}
              numberOfLines={1}
            >
              Onboard New Spa
            </Text>
          </View>
        </LinearGradient>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: contentPaddingHorizontal, paddingVertical: sw(16) }}
          showsVerticalScrollIndicator={false}
        >
          <ModernProgressBar currentStep={currentStep} totalSteps={5} sw={sw} />

          {currentStep === 0 && (
            <View>
              <ModernFormInput label="Spa Name" placeholder="Enter your spa name" value={formData.spaName} onChangeText={(v) => updateFormData("spaName", v)} sw={sw} icon={Building2} required error={errors.spaName} />
              <ModernFormInput label="Complete Address" placeholder="Enter your location" value={formData.address} onChangeText={(v) => updateFormData("address", v)} sw={sw} icon={MapPin} multiline height={sw(80)} required error={errors.address} />
              <ModernFormInput label="Contact Number" placeholder="Your phone number" value={formData.phone} onChangeText={(v) => updateFormData("phone", v)} sw={sw} icon={Phone} required error={errors.phone} />
              <ModernFormInput label="Email Address" placeholder="Your email" value={formData.email} onChangeText={(v) => updateFormData("email", v)} sw={sw} icon={Mail} required error={errors.email} />
              <ModernFormInput label="Website (Optional)" placeholder="https://yourwebsite.com" value={formData.website} onChangeText={(v) => updateFormData("website", v)} sw={sw} icon={Globe} />
              <ModernDropdown label="Business Type" value={formData.description} options={descriptionOptions} onSelect={(v) => updateFormData("description", v)} sw={sw} />
            </View>
          )}

          {currentStep === 1 && (
            <View>
              <ModernFormInput label="Opening Time" placeholder="09:00 AM" value={formData.openingTime} onChangeText={(v) => updateFormData("openingTime", v)} sw={sw} required error={errors.openingTime} />
              <ModernFormInput label="Closing Time" placeholder="09:00 PM" value={formData.closingTime} onChangeText={(v) => updateFormData("closingTime", v)} sw={sw} required error={errors.closingTime} />
              <ModernDropdown label="Price Range" value={formData.priceRange} options={priceRanges} onSelect={(v) => updateFormData("priceRange", v)} sw={sw} />
              <ModernFormInput label="Staff Count" placeholder="e.g. 5-10" value={formData.staffCount} onChangeText={(v) => updateFormData("staffCount", v)} sw={sw} icon={Users} required error={errors.staffCount} />
              <ModernFormInput label="Instagram" placeholder="https://instagram.com/yourhandle" value={formData.instagram} onChangeText={(v) => updateFormData("instagram", v)} sw={sw} />
              <ModernFormInput label="Facebook" placeholder="https://facebook.com/yourpage" value={formData.facebook} onChangeText={(v) => updateFormData("facebook", v)} sw={sw} />
              <ModernFormInput label="Twitter" placeholder="https://twitter.com/yourhandle" value={formData.twitter} onChangeText={(v) => updateFormData("twitter", v)} sw={sw} />
            </View>
          )}

          {currentStep === 2 && (
            <View>
              <Text style={{ fontSize: Math.max(sw(13), 11), fontWeight: "700", color: COLORS.text, marginBottom: sw(14) }}>
                Select Available Amenities
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: sw(8), marginBottom: sw(20) }}>
                {amenitiesWithIcons.map((item, idx) => (
                  <View key={idx} style={{ width: amenityWidth, paddingHorizontal: sw(2) }}>
                    <ModernAmenityItem
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
              <ModernFormInput label="Specialities" placeholder="Deep Tissue, Aromatherapy..." value={formData.specialities} onChangeText={(v) => updateFormData("specialities", v)} sw={sw} multiline height={sw(80)} />
            </View>
          )}

          {currentStep === 3 && (
            <View>
              <ModernFormInput label="Main Services" placeholder="List your main services..." value={formData.mainService} onChangeText={(v) => updateFormData("mainService", v)} sw={sw} multiline height={sw(100)} />
              <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(12), padding: sw(14), marginTop: sw(14), borderWidth: 1, borderColor: COLORS.primaryLight + "30" }}>
                <View style={{ flexDirection: "row", gap: sw(8) }}>
                  <Sparkles size={sw(20)} color={COLORS.primary} strokeWidth={2} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.text, marginBottom: sw(4) }}>Pro Tip</Text>
                    <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.textSecondary }}>Use commas to separate services. Example: Swedish Massage, Facial, Hair Spa</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {currentStep === 4 && (
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: sw(8), marginBottom: sw(16) }}>
                <Check size={sw(24)} color={COLORS.success} strokeWidth={2.5} />
                <Text style={{ fontSize: Math.max(sw(13), 11), fontWeight: "700", color: COLORS.text }}>
                  Review Your Details
                </Text>
              </View>
              
              <LinearGradient colors={[COLORS.cardBg, COLORS.white]} style={{ borderRadius: sw(12), padding: sw(14), marginBottom: sw(12), borderWidth: 1, borderColor: COLORS.border }}>
                <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.primary, marginBottom: sw(10) }}>📍 Basic Information</Text>
                <View style={{ gap: sw(6) }}>
                  <Text style={{ fontSize: Math.max(sw(10), 9), color: COLORS.text }}><Text style={{ fontWeight: "700" }}>Name:</Text> {formData.spaName}</Text>
                  <Text style={{ fontSize: Math.max(sw(10), 9), color: COLORS.text }}><Text style={{ fontWeight: "700" }}>Address:</Text> {formData.address}</Text>
                  <Text style={{ fontSize: Math.max(sw(10), 9), color: COLORS.text }}><Text style={{ fontWeight: "700" }}>Phone:</Text> {formData.phone}</Text>
                </View>
              </LinearGradient>

              <LinearGradient colors={[COLORS.cardBg, COLORS.white]} style={{ borderRadius: sw(12), padding: sw(14), marginBottom: sw(12), borderWidth: 1, borderColor: COLORS.border }}>
                <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.primary, marginBottom: sw(10) }}>⏰ Operating Details</Text>
                <View style={{ gap: sw(6) }}>
                  <Text style={{ fontSize: Math.max(sw(10), 9), color: COLORS.text }}><Text style={{ fontWeight: "700" }}>Hours:</Text> {formData.openingTime} - {formData.closingTime}</Text>
                  <Text style={{ fontSize: Math.max(sw(10), 9), color: COLORS.text }}><Text style={{ fontWeight: "700" }}>Staff:</Text> {formData.staffCount}</Text>
                </View>
              </LinearGradient>

              {formData.amenities.length > 0 && (
                <LinearGradient colors={[COLORS.cardBg, COLORS.white]} style={{ borderRadius: sw(12), padding: sw(14), marginBottom: sw(12), borderWidth: 1, borderColor: COLORS.border }}>
                  <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.primary, marginBottom: sw(8) }}>✨ Amenities</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: sw(6) }}>
                    {formData.amenities.map((amenity, idx) => (
                      <View key={idx} style={{ backgroundColor: COLORS.primary + "15", paddingHorizontal: sw(10), paddingVertical: sw(5), borderRadius: sw(8), borderWidth: 1, borderColor: COLORS.primary + "30" }}>
                        <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.primary, fontWeight: "600" }}>
                          {amenity}
                        </Text>
                      </View>
                    ))}
                  </View>
                </LinearGradient>
              )}
            </View>
          )}
        </ScrollView>

        <LinearGradient colors={["transparent", COLORS.white]} style={{ paddingHorizontal: contentPaddingHorizontal, paddingVertical: sw(14), gap: sw(8), borderTopWidth: 1, borderTopColor: COLORS.border }}>
          <View style={{ flexDirection: "row", gap: sw(10) }}>
            {currentStep > 0 && (
              <TouchableOpacity
                onPress={handlePrevious}
                style={{
                  flex: 1,
                  paddingVertical: Math.max(sw(12), 10),
                  borderRadius: sw(10),
                  borderWidth: 1.5,
                  borderColor: COLORS.blue,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.blue + "08",
                }}
                activeOpacity={0.6}
              >
                <Text style={{ fontSize: Math.max(sw(12), 11), fontWeight: "700", color: COLORS.blue }}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={currentStep === 4 ? handleSubmit : handleNext}
              style={{
                flex: 1,
                paddingVertical: 0,
                borderRadius: sw(10),
                overflow: "hidden",
                minHeight: Math.max(sw(48), 44),
              }}
              activeOpacity={0.7}
              disabled={loading}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: "100%",
                  paddingVertical: Math.max(sw(12), 10),
                  borderRadius: sw(10),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: Math.max(sw(12), 11), fontWeight: "700", color: COLORS.white }}>
                  {loading ? "Submitting..." : currentStep === 4 ? "Submit" : "Continue"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

  // Desktop/Tablet layout - 2:4 split
  const sidebarWidth = isDesktop ? "33.33%" : "40%";
  const formWidth = isDesktop ? "66.67%" : "60%";

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg, flexDirection: "row" }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Left Sidebar - Green (2 parts) */}
      <LinearGradient
        colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ width: sidebarWidth, paddingHorizontal: sw(18), paddingVertical: sw(24) }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={onBack} style={{ marginBottom: sw(20), padding: sw(8), width: sw(44), backgroundColor: COLORS.white + "15", borderRadius: sw(10), alignItems: "center", justifyContent: "center" }}>
            <ArrowLeft size={sw(24)} color={COLORS.white} strokeWidth={2.5} />
          </TouchableOpacity>

          <View style={{ marginBottom: sw(28) }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: sw(10), marginBottom: sw(10) }}>
              <Building2 size={sw(36)} color={COLORS.white} strokeWidth={1.8} />
              <Text style={{ fontSize: sw(20), fontWeight: "800", color: COLORS.white }}>Onboard</Text>
            </View>
            <Text style={{ fontSize: sw(11), color: COLORS.white + "85", marginLeft: 0 }}>Complete all steps to onboard your spa</Text>
          </View>

          <View style={{ marginBottom: sw(16) }}>
            <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.white + "80", marginBottom: sw(8), textTransform: "uppercase", letterSpacing: 0.5 }}>
              Progress
            </Text>
            <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.white }}>
              {currentStep + 1} <Text style={{ fontSize: sw(12), fontWeight: "600", color: COLORS.white + "70" }}>/ 5</Text>
            </Text>
          </View>

          {steps.map((step, idx) => (
            <ModernStepCard
              key={idx}
              number={idx + 1}
              title={step.title}
              description={step.description}
              isActive={idx === currentStep}
              isCompleted={idx < currentStep}
              sw={sw}
            />
          ))}
        </ScrollView>
      </LinearGradient>

      {/* Right Form Area - White (4 parts) */}
      <View style={{ width: formWidth, backgroundColor: COLORS.bg, flexDirection: "column" }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: sw(24), paddingVertical: sw(28) }}
          showsVerticalScrollIndicator={false}
        >
          {currentStep === 0 && (
            <View>
              <View style={{ marginBottom: sw(24) }}>
                <Text style={{ fontSize: sw(18), fontWeight: "800", color: COLORS.text, marginBottom: sw(6) }}>Basic Information</Text>
                <Text style={{ fontSize: sw(12), color: COLORS.textSecondary }}>Tell us about your spa business</Text>
              </View>
              <ModernFormInput label="Spa Name" placeholder="Enter your spa name" value={formData.spaName} onChangeText={(v) => updateFormData("spaName", v)} sw={sw} icon={Building2} required error={errors.spaName} />
              <ModernFormInput label="Complete Address" placeholder="Enter your location" value={formData.address} onChangeText={(v) => updateFormData("address", v)} sw={sw} icon={MapPin} multiline height={sw(100)} required error={errors.address} />
              <View style={{ flexDirection: "row", gap: sw(14) }}>
                <View style={{ flex: 1 }}>
                  <ModernFormInput label="Phone" placeholder="Contact number" value={formData.phone} onChangeText={(v) => updateFormData("phone", v)} sw={sw} icon={Phone} required error={errors.phone} />
                </View>
                <View style={{ flex: 1 }}>
                  <ModernFormInput label="Email" placeholder="Your email" value={formData.email} onChangeText={(v) => updateFormData("email", v)} sw={sw} icon={Mail} required error={errors.email} />
                </View>
              </View>
              <ModernFormInput label="Website" placeholder="https://yourwebsite.com" value={formData.website} onChangeText={(v) => updateFormData("website", v)} sw={sw} icon={Globe} />
              <ModernDropdown label="Business Type" value={formData.description} options={descriptionOptions} onSelect={(v) => updateFormData("description", v)} sw={sw} />
            </View>
          )}

          {currentStep === 1 && (
            <View>
              <View style={{ marginBottom: sw(24) }}>
                <Text style={{ fontSize: sw(18), fontWeight: "800", color: COLORS.text, marginBottom: sw(6) }}>Operating Details</Text>
                <Text style={{ fontSize: sw(12), color: COLORS.textSecondary }}>Set your working hours and team info</Text>
              </View>
              <View style={{ flexDirection: "row", gap: sw(14) }}>
                <View style={{ flex: 1 }}>
                  <ModernFormInput label="Opening Time" placeholder="09:00 AM" value={formData.openingTime} onChangeText={(v) => updateFormData("openingTime", v)} sw={sw} required error={errors.openingTime} />
                </View>
                <View style={{ flex: 1 }}>
                  <ModernFormInput label="Closing Time" placeholder="09:00 PM" value={formData.closingTime} onChangeText={(v) => updateFormData("closingTime", v)} sw={sw} required error={errors.closingTime} />
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: sw(14) }}>
                <View style={{ flex: 1 }}>
                  <ModernDropdown label="Price Range" value={formData.priceRange} options={priceRanges} onSelect={(v) => updateFormData("priceRange", v)} sw={sw} />
                </View>
                <View style={{ flex: 1 }}>
                  <ModernFormInput label="Staff Count" placeholder="e.g. 5-10" value={formData.staffCount} onChangeText={(v) => updateFormData("staffCount", v)} sw={sw} icon={Users} required error={errors.staffCount} />
                </View>
              </View>
              <ModernFormInput label="Instagram" placeholder="https://instagram.com/yourhandle" value={formData.instagram} onChangeText={(v) => updateFormData("instagram", v)} sw={sw} />
              <ModernFormInput label="Facebook" placeholder="https://facebook.com/yourpage" value={formData.facebook} onChangeText={(v) => updateFormData("facebook", v)} sw={sw} />
              <ModernFormInput label="Twitter" placeholder="https://twitter.com/yourhandle" value={formData.twitter} onChangeText={(v) => updateFormData("twitter", v)} sw={sw} />
            </View>
          )}

          {currentStep === 2 && (
            <View>
              <View style={{ marginBottom: sw(24) }}>
                <Text style={{ fontSize: sw(18), fontWeight: "800", color: COLORS.text, marginBottom: sw(6) }}>Amenities & Specialities</Text>
                <Text style={{ fontSize: sw(12), color: COLORS.textSecondary }}>Select available amenities and specialities</Text>
              </View>
              <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(14) }}>Available Amenities</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: sw(10), marginBottom: sw(24) }}>
                {amenitiesWithIcons.map((item, idx) => (
                  <View key={idx} style={{ width: amenityWidth, paddingHorizontal: sw(2) }}>
                    <ModernAmenityItem
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
              <ModernFormInput label="Specialities" placeholder="Deep Tissue, Aromatherapy..." value={formData.specialities} onChangeText={(v) => updateFormData("specialities", v)} sw={sw} multiline height={sw(100)} />
            </View>
          )}

          {currentStep === 3 && (
            <View>
              <View style={{ marginBottom: sw(24) }}>
                <Text style={{ fontSize: sw(18), fontWeight: "800", color: COLORS.text, marginBottom: sw(6) }}>Services</Text>
                <Text style={{ fontSize: sw(12), color: COLORS.textSecondary }}>Describe your main services</Text>
              </View>
              <ModernFormInput label="Main Services" placeholder="List your main services..." value={formData.mainService} onChangeText={(v) => updateFormData("mainService", v)} sw={sw} multiline height={sw(140)} />
              <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(14), padding: sw(16), marginTop: sw(18), borderWidth: 1, borderColor: COLORS.primaryLight + "30" }}>
                <View style={{ flexDirection: "row", gap: sw(12) }}>
                  <Sparkles size={sw(22)} color={COLORS.primary} strokeWidth={2} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(4) }}>Pro Tip</Text>
                    <Text style={{ fontSize: sw(10), color: COLORS.textSecondary, lineHeight: sw(16) }}>Use commas to separate services for better organization. Example: Swedish Massage, Facial, Hair Spa, Aromatherapy</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {currentStep === 4 && (
            <View>
              <View style={{ marginBottom: sw(24), flexDirection: "row", alignItems: "center", gap: sw(12) }}>
                <View style={{ width: sw(40), height: sw(40), borderRadius: sw(12), backgroundColor: COLORS.success + "15", alignItems: "center", justifyContent: "center" }}>
                  <Check size={sw(24)} color={COLORS.success} strokeWidth={2.5} />
                </View>
                <Text style={{ fontSize: sw(18), fontWeight: "800", color: COLORS.text }}>
                  Review Details
                </Text>
              </View>
              
              <LinearGradient colors={[COLORS.cardBg + "80", COLORS.white]} style={{ borderRadius: sw(14), padding: sw(16), marginBottom: sw(14), borderWidth: 1, borderColor: COLORS.border }}>
                <View style={{ flexDirection: "row", gap: sw(10), marginBottom: sw(12) }}>
                  <Text style={{ fontSize: sw(16) }}>📍</Text>
                  <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.primary }}>Basic Information</Text>
                </View>
                <View style={{ gap: sw(8) }}>
                  <Text style={{ fontSize: sw(11), color: COLORS.text }}><Text style={{ fontWeight: "700" }}>Spa Name:</Text> {formData.spaName}</Text>
                  <Text style={{ fontSize: sw(11), color: COLORS.text }}><Text style={{ fontWeight: "700" }}>Address:</Text> {formData.address}</Text>
                  <Text style={{ fontSize: sw(11), color: COLORS.text }}><Text style={{ fontWeight: "700" }}>Phone:</Text> {formData.phone}</Text>
                </View>
              </LinearGradient>

              <LinearGradient colors={[COLORS.cardBg + "80", COLORS.white]} style={{ borderRadius: sw(14), padding: sw(16), marginBottom: sw(14), borderWidth: 1, borderColor: COLORS.border }}>
                <View style={{ flexDirection: "row", gap: sw(10), marginBottom: sw(12) }}>
                  <Text style={{ fontSize: sw(16) }}>⏰</Text>
                  <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.primary }}>Operating Details</Text>
                </View>
                <View style={{ gap: sw(8) }}>
                  <Text style={{ fontSize: sw(11), color: COLORS.text }}><Text style={{ fontWeight: "700" }}>Hours:</Text> {formData.openingTime} - {formData.closingTime}</Text>
                  <Text style={{ fontSize: sw(11), color: COLORS.text }}><Text style={{ fontWeight: "700" }}>Price Range:</Text> {formData.priceRange}</Text>
                  <Text style={{ fontSize: sw(11), color: COLORS.text }}><Text style={{ fontWeight: "700" }}>Staff:</Text> {formData.staffCount}</Text>
                </View>
              </LinearGradient>

              {formData.amenities.length > 0 && (
                <LinearGradient colors={[COLORS.cardBg + "80", COLORS.white]} style={{ borderRadius: sw(14), padding: sw(16), marginBottom: sw(14), borderWidth: 1, borderColor: COLORS.border }}>
                  <View style={{ flexDirection: "row", gap: sw(10), marginBottom: sw(12) }}>
                    <Text style={{ fontSize: sw(16) }}>✨</Text>
                    <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.primary }}>Amenities ({formData.amenities.length})</Text>
                  </View>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: sw(8) }}>
                    {formData.amenities.map((amenity, idx) => (
                      <View key={idx} style={{ backgroundColor: COLORS.primary + "12", paddingHorizontal: sw(12), paddingVertical: sw(7), borderRadius: sw(8), borderWidth: 1, borderColor: COLORS.primary + "25" }}>
                        <Text style={{ fontSize: sw(10), color: COLORS.primary, fontWeight: "600" }}>
                          {amenity}
                        </Text>
                      </View>
                    ))}
                  </View>
                </LinearGradient>
              )}
            </View>
          )}
        </ScrollView>

        {/* Footer */}
        <LinearGradient colors={["transparent", COLORS.white]} style={{ paddingHorizontal: sw(24), paddingVertical: sw(18), gap: sw(12), borderTopWidth: 1, borderTopColor: COLORS.border }}>
          <View style={{ flexDirection: "row", gap: sw(12) }}>
            {currentStep > 0 && (
              <TouchableOpacity
                onPress={handlePrevious}
                style={{
                  flex: 1,
                  paddingVertical: Math.max(sw(12), 10),
                  borderRadius: sw(10),
                  borderWidth: 1.5,
                  borderColor: COLORS.blue,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.blue + "08",
                }}
                activeOpacity={0.6}
              >
                <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.blue }}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={currentStep === 4 ? handleSubmit : handleNext}
              style={{
                flex: 1,
                paddingVertical: 0,
                borderRadius: sw(10),
                overflow: "hidden",
                minHeight: Math.max(sw(48), 44),
              }}
              activeOpacity={0.7}
              disabled={loading}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: "100%",
                  paddingVertical: Math.max(sw(12), 10),
                  borderRadius: sw(10),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.white }}>
                  {loading ? "Submitting..." : currentStep === 4 ? "Submit & Onboard" : "Continue"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}
