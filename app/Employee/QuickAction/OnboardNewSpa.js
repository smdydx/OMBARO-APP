import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Building2, MapPin, Globe, Phone, Mail, Plus, AlertCircle, Check, Clock, Users, Utensils, Shield } from "lucide-react-native";
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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COLORS = {
  gradient1: "#00FF87",
  gradient2: "#016B3A",
  gradient3: "#013B1F",
  primary: "#016B3A",
  primaryLight: "#10B981",
  white: "#FFFFFF",
  text: "#1A1A1A",
  textSecondary: "#666666",
  textLight: "#999999",
  bg: "#FFFFFF",
  cardBg: "#F9FAFB",
  border: "#E5E7EB",
  success: "#10B981",
  warning: "#F59E0B",
  blue: "#0EA5E9",
  error: "#EF4444",
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
    contentPaddingHorizontal: isMobile ? sw(16) : isTablet ? sw(20) : sw(24),
  };
}

const ProgressBar = ({ currentStep, totalSteps, sw }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  return (
    <View style={{ marginBottom: sw(16) }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: sw(6) }}>
        <Text style={{ fontSize: Math.max(sw(10), 10), fontWeight: "700", color: COLORS.text }}>
          Progress
        </Text>
        <Text style={{ fontSize: Math.max(sw(10), 10), fontWeight: "700", color: COLORS.primaryLight }}>
          {currentStep + 1}/{totalSteps}
        </Text>
      </View>
      <View style={{ height: Math.max(sw(6), 5), backgroundColor: COLORS.border, borderRadius: sw(3), overflow: "hidden" }}>
        <View
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: COLORS.primaryLight,
            borderRadius: sw(3),
          }}
        />
      </View>
    </View>
  );
};

const StepCard = ({ number, title, description, isActive, isCompleted, sw }) => {
  return (
    <View
      style={{
        paddingVertical: sw(14),
        paddingHorizontal: sw(12),
        marginBottom: sw(10),
        borderRadius: sw(10),
        backgroundColor: isActive ? COLORS.white + "20" : COLORS.white + "10",
        borderWidth: isActive ? 2 : 1,
        borderColor: isActive ? COLORS.white : COLORS.white + "30",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(6) }}>
        <View
          style={{
            width: sw(32),
            height: sw(32),
            borderRadius: sw(16),
            backgroundColor: isCompleted ? COLORS.success : COLORS.white,
            alignItems: "center",
            justifyContent: "center",
            marginRight: sw(10),
          }}
        >
          {isCompleted ? (
            <Check size={sw(16)} color={COLORS.primary} strokeWidth={3} />
          ) : (
            <Text style={{ fontSize: sw(14), fontWeight: "700", color: COLORS.primary }}>
              {number}
            </Text>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: Math.max(sw(12), 11), fontWeight: "700", color: COLORS.white }}>
            {title}
          </Text>
          {description && (
            <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.white + "80", marginTop: sw(2) }}>
              {description}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const FormInput = ({ label, placeholder, value, onChangeText, sw, icon: Icon, multiline = false, height = null, required = false, error = null }) => {
  const inputHeight = height || sw(44);
  return (
    <View style={{ marginBottom: sw(14) }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(5) }}>
        <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "600", color: COLORS.text, flex: 1 }}>
          {label}
        </Text>
        {required && <Text style={{ color: COLORS.error, marginLeft: sw(4), fontSize: Math.max(sw(11), 10) }}>*</Text>}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: multiline ? "flex-start" : "center",
          borderWidth: 1,
          borderColor: error ? COLORS.error : COLORS.border,
          borderRadius: sw(8),
          paddingHorizontal: sw(12),
          paddingVertical: multiline ? sw(8) : 0,
          backgroundColor: COLORS.white,
          minHeight: inputHeight,
        }}
      >
        {Icon && <Icon size={Math.max(sw(16), 14)} color={COLORS.textLight} strokeWidth={2} style={{ marginRight: sw(8), marginTop: multiline ? sw(4) : 0 }} />}
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          style={{
            flex: 1,
            paddingVertical: sw(10),
            fontSize: Math.max(sw(12), 11),
            color: COLORS.text,
            height: inputHeight,
            textAlignVertical: multiline ? "top" : "center",
          }}
          placeholderTextColor={COLORS.textLight}
        />
      </View>
      {error && (
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: sw(4) }}>
          <AlertCircle size={Math.max(sw(12), 11)} color={COLORS.error} strokeWidth={2} style={{ marginRight: sw(4) }} />
          <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.error }}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const Dropdown = ({ label, value, options, onSelect, sw, required = false, error = null }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ marginBottom: sw(14) }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(5) }}>
        <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "600", color: COLORS.text, flex: 1 }}>
          {label}
        </Text>
        {required && <Text style={{ color: COLORS.error, marginLeft: sw(4), fontSize: Math.max(sw(11), 10) }}>*</Text>}
      </View>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: error ? COLORS.error : COLORS.border,
          borderRadius: sw(8),
          paddingHorizontal: sw(12),
          paddingVertical: sw(12),
          backgroundColor: COLORS.white,
          minHeight: sw(44),
        }}
      >
        <Text style={{ flex: 1, fontSize: Math.max(sw(12), 11), color: value ? COLORS.text : COLORS.textLight }}>
          {value || "Select option"}
        </Text>
      </TouchableOpacity>

      {open && (
        <View
          style={{
            backgroundColor: COLORS.cardBg,
            borderWidth: 1,
            borderColor: COLORS.border,
            borderRadius: sw(8),
            marginTop: sw(4),
            maxHeight: sw(150),
            zIndex: 10,
          }}
        >
          <ScrollView>
            {options.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  onSelect(opt);
                  setOpen(false);
                }}
                style={{
                  paddingVertical: sw(12),
                  paddingHorizontal: sw(12),
                  backgroundColor: value === opt ? COLORS.primaryLight + "20" : COLORS.white,
                }}
              >
                <Text style={{ fontSize: Math.max(sw(11), 10), color: COLORS.text }}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      {error && (
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: sw(4) }}>
          <AlertCircle size={Math.max(sw(12), 11)} color={COLORS.error} strokeWidth={2} style={{ marginRight: sw(4) }} />
          <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.error }}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const AmenityItem = ({ icon: Icon, label, selected, onToggle, sw }) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={{
        alignItems: "center",
        paddingVertical: sw(10),
        paddingHorizontal: sw(6),
        borderWidth: 1.5,
        borderColor: selected ? COLORS.primaryLight : COLORS.border,
        borderRadius: sw(8),
        backgroundColor: selected ? COLORS.primaryLight + "15" : COLORS.white,
        justifyContent: "center",
        flex: 1,
        minHeight: sw(90),
      }}
    >
      <View
        style={{
          width: sw(28),
          height: sw(28),
          borderRadius: sw(14),
          backgroundColor: selected ? COLORS.primaryLight : COLORS.cardBg,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: sw(4),
        }}
      >
        <Icon size={Math.max(sw(14), 12)} color={selected ? COLORS.white : COLORS.primaryLight} strokeWidth={2} />
      </View>
      <Text
        style={{
          fontSize: Math.max(sw(8), 7),
          color: COLORS.text,
          textAlign: "center",
          fontWeight: selected ? "600" : "500",
          lineHeight: Math.max(sw(10), 9),
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
    Alert.alert("Confirm Submission", "Submit spa onboarding?", [
      { text: "Cancel", onPress: () => {}, style: "cancel" },
      {
        text: "Submit",
        onPress: async () => {
          setLoading(true);
          console.log("Form submitted:", formData);
          await AsyncStorage.removeItem("onboardSpaFormData");
          Alert.alert("Success", "Spa onboarded successfully!", [
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
    // Mobile layout - single column
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

        <LinearGradient
          colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingHorizontal: contentPaddingHorizontal, paddingTop: sw(12), paddingBottom: sw(16) }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(8) }}>
            <TouchableOpacity onPress={onBack} style={{ marginRight: sw(12), padding: sw(4) }}>
              <ArrowLeft size={Math.max(sw(22), 18)} color={COLORS.white} strokeWidth={2.5} />
            </TouchableOpacity>
            <Building2 size={Math.max(sw(22), 18)} color={COLORS.white} strokeWidth={2.5} />
            <Text
              style={{
                fontSize: Math.max(sw(13), 12),
                fontWeight: "800",
                color: COLORS.white,
                marginLeft: sw(8),
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
          <ProgressBar currentStep={currentStep} totalSteps={5} sw={sw} />

          {currentStep === 0 && (
            <View>
              <FormInput label="Spa Name" placeholder="Enter spa name" value={formData.spaName} onChangeText={(v) => updateFormData("spaName", v)} sw={sw} icon={Building2} required error={errors.spaName} />
              <FormInput label="Complete Address" placeholder="Enter address" value={formData.address} onChangeText={(v) => updateFormData("address", v)} sw={sw} icon={MapPin} multiline height={sw(80)} required error={errors.address} />
              <View style={{ flexDirection: "column", gap: sw(8) }}>
                <FormInput label="Contact Number" placeholder="Phone" value={formData.phone} onChangeText={(v) => updateFormData("phone", v)} sw={sw} icon={Phone} required error={errors.phone} />
                <FormInput label="Email Address" placeholder="Email" value={formData.email} onChangeText={(v) => updateFormData("email", v)} sw={sw} icon={Mail} required error={errors.email} />
              </View>
              <FormInput label="Website (Optional)" placeholder="https://example.com" value={formData.website} onChangeText={(v) => updateFormData("website", v)} sw={sw} icon={Globe} />
              <Dropdown label="Description" value={formData.description} options={descriptionOptions} onSelect={(v) => updateFormData("description", v)} sw={sw} />
            </View>
          )}

          {currentStep === 1 && (
            <View>
              <View style={{ flexDirection: "column", gap: sw(8) }}>
                <FormInput label="Opening Time" placeholder="e.g. 09:00 AM" value={formData.openingTime} onChangeText={(v) => updateFormData("openingTime", v)} sw={sw} required error={errors.openingTime} />
                <FormInput label="Closing Time" placeholder="e.g. 09:00 PM" value={formData.closingTime} onChangeText={(v) => updateFormData("closingTime", v)} sw={sw} required error={errors.closingTime} />
              </View>
              <View style={{ flexDirection: "column", gap: sw(8) }}>
                <Dropdown label="Price Range" value={formData.priceRange} options={priceRanges} onSelect={(v) => updateFormData("priceRange", v)} sw={sw} />
                <FormInput label="Staff Count" placeholder="e.g. 5-10" value={formData.staffCount} onChangeText={(v) => updateFormData("staffCount", v)} sw={sw} icon={Users} required error={errors.staffCount} />
              </View>
              <FormInput label="Instagram" placeholder="https://instagram.com/handle" value={formData.instagram} onChangeText={(v) => updateFormData("instagram", v)} sw={sw} />
              <FormInput label="Facebook" placeholder="https://facebook.com/page" value={formData.facebook} onChangeText={(v) => updateFormData("facebook", v)} sw={sw} />
              <FormInput label="Twitter" placeholder="https://twitter.com/handle" value={formData.twitter} onChangeText={(v) => updateFormData("twitter", v)} sw={sw} />
            </View>
          )}

          {currentStep === 2 && (
            <View>
              <Text style={{ fontSize: Math.max(sw(12), 11), fontWeight: "700", color: COLORS.text, marginBottom: sw(12) }}>Available Amenities</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: sw(8), marginBottom: sw(20) }}>
                {amenitiesWithIcons.map((item, idx) => (
                  <View key={idx} style={{ width: amenityWidth, paddingHorizontal: sw(2) }}>
                    <AmenityItem icon={item.icon} label={item.label} selected={formData.amenities.includes(item.label)} onToggle={() => {
                      const amenities = formData.amenities.includes(item.label)
                        ? formData.amenities.filter((a) => a !== item.label)
                        : [...formData.amenities, item.label];
                      updateFormData("amenities", amenities);
                    }} sw={sw} />
                  </View>
                ))}
              </View>
              <FormInput label="Specialities" placeholder="e.g., Deep Tissue, Aromatherapy" value={formData.specialities} onChangeText={(v) => updateFormData("specialities", v)} sw={sw} multiline height={sw(80)} />
            </View>
          )}

          {currentStep === 3 && (
            <View>
              <FormInput label="Main Services" placeholder="e.g., Massage, Facial, Hair Treatment" value={formData.mainService} onChangeText={(v) => updateFormData("mainService", v)} sw={sw} multiline height={sw(90)} />
              <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(10), padding: sw(12), marginTop: sw(12) }}>
                <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.text, marginBottom: sw(6) }}>💡 Tip: Add comma-separated services</Text>
                <Text style={{ fontSize: Math.max(sw(10), 9), color: COLORS.textSecondary }}>Example: Swedish Massage, Hot Stone Therapy, Facial Treatment, Hair Spa</Text>
              </View>
            </View>
          )}

          {currentStep === 4 && (
            <View>
              <Text style={{ fontSize: Math.max(sw(13), 12), fontWeight: "800", color: COLORS.text, marginBottom: sw(14) }}>Review Your Information</Text>
              <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(10), padding: sw(12), marginBottom: sw(12) }}>
                <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.primary, marginBottom: sw(8) }}>Basic Information</Text>
                <View style={{ gap: sw(6) }}>
                  <Text style={{ fontSize: Math.max(sw(10), 9), color: COLORS.text }}><Text style={{ fontWeight: "600" }}>Spa Name:</Text> {formData.spaName}</Text>
                  <Text style={{ fontSize: Math.max(sw(10), 9), color: COLORS.text }}><Text style={{ fontWeight: "600" }}>Address:</Text> {formData.address}</Text>
                  <Text style={{ fontSize: Math.max(sw(10), 9), color: COLORS.text }}><Text style={{ fontWeight: "600" }}>Phone:</Text> {formData.phone}</Text>
                  <Text style={{ fontSize: Math.max(sw(10), 9), color: COLORS.text }}><Text style={{ fontWeight: "600" }}>Email:</Text> {formData.email}</Text>
                </View>
              </View>
              <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(10), padding: sw(12), marginBottom: sw(12) }}>
                <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.primary, marginBottom: sw(8) }}>Operating Details</Text>
                <View style={{ gap: sw(6) }}>
                  <Text style={{ fontSize: Math.max(sw(10), 9), color: COLORS.text }}><Text style={{ fontWeight: "600" }}>Hours:</Text> {formData.openingTime} - {formData.closingTime}</Text>
                  <Text style={{ fontSize: Math.max(sw(10), 9), color: COLORS.text }}><Text style={{ fontWeight: "600" }}>Price Range:</Text> {formData.priceRange}</Text>
                  <Text style={{ fontSize: Math.max(sw(10), 9), color: COLORS.text }}><Text style={{ fontWeight: "600" }}>Staff Count:</Text> {formData.staffCount}</Text>
                </View>
              </View>
              <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(10), padding: sw(12), marginBottom: sw(12) }}>
                <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.primary, marginBottom: sw(8) }}>Amenities ({formData.amenities.length})</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: sw(6) }}>
                  {formData.amenities.map((amenity, idx) => (
                    <View key={idx} style={{ backgroundColor: COLORS.primaryLight + "20", paddingHorizontal: sw(8), paddingVertical: sw(4), borderRadius: sw(6) }}>
                      <Text style={{ fontSize: Math.max(sw(9), 8), color: COLORS.primary, fontWeight: "600" }}>{amenity}</Text>
                    </View>
                  ))}
                </View>
              </View>
              {formData.mainService && (
                <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(10), padding: sw(12) }}>
                  <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.primary, marginBottom: sw(8) }}>Services</Text>
                  <Text style={{ fontSize: Math.max(sw(10), 9), color: COLORS.text }}>{formData.mainService}</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>

        <LinearGradient colors={["transparent", "rgba(255,255,255,0.5)"]} style={{ paddingHorizontal: contentPaddingHorizontal, paddingVertical: sw(14), gap: sw(8) }}>
          <View style={{ flexDirection: "row", gap: sw(8) }}>
            {currentStep > 0 && (
              <TouchableOpacity onPress={handlePrevious} style={{ flex: 1, paddingVertical: Math.max(sw(12), 10), borderRadius: sw(8), borderWidth: 1.5, borderColor: COLORS.blue, alignItems: "center", justifyContent: "center" }} activeOpacity={0.7}>
                <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.blue }}>Previous</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={currentStep === 4 ? handleSubmit : handleNext} style={{ flex: 1, paddingVertical: 0, borderRadius: sw(8), overflow: "hidden", minHeight: Math.max(sw(44), 40) }} activeOpacity={0.7} disabled={loading}>
              <LinearGradient colors={[COLORS.blue, COLORS.blue]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: "100%", paddingVertical: Math.max(sw(12), 10), borderRadius: sw(8), alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: Math.max(sw(11), 10), fontWeight: "700", color: COLORS.white }}>{loading ? "Submitting..." : currentStep === 4 ? "Submit" : "Next Step"}</Text>
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
        style={{ width: sidebarWidth, paddingHorizontal: sw(16), paddingVertical: sw(20) }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={onBack} style={{ marginBottom: sw(20), padding: sw(8), width: sw(40) }}>
            <ArrowLeft size={sw(24)} color={COLORS.white} strokeWidth={2.5} />
          </TouchableOpacity>

          <View style={{ marginBottom: sw(24) }}>
            <Building2 size={sw(40)} color={COLORS.white} strokeWidth={2} />
            <Text style={{ fontSize: sw(18), fontWeight: "800", color: COLORS.white, marginTop: sw(12) }}>Onboard New Spa</Text>
            <Text style={{ fontSize: sw(11), color: COLORS.white + "80", marginTop: sw(6) }}>Complete all steps to onboard your spa</Text>
          </View>

          <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.white, marginBottom: sw(12) }}>Progress: {currentStep + 1}/5</Text>

          {steps.map((step, idx) => (
            <StepCard
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
      <View style={{ width: formWidth, backgroundColor: COLORS.white, flexDirection: "column" }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: sw(20), paddingVertical: sw(24) }}
          showsVerticalScrollIndicator={false}
        >
          {currentStep === 0 && (
            <View>
              <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text, marginBottom: sw(4) }}>Basic Information</Text>
              <Text style={{ fontSize: sw(12), color: COLORS.textSecondary, marginBottom: sw(20) }}>Tell us about your spa business</Text>
              <FormInput label="Spa Name" placeholder="Enter spa name" value={formData.spaName} onChangeText={(v) => updateFormData("spaName", v)} sw={sw} icon={Building2} required error={errors.spaName} />
              <FormInput label="Complete Address" placeholder="Enter address" value={formData.address} onChangeText={(v) => updateFormData("address", v)} sw={sw} icon={MapPin} multiline height={sw(80)} required error={errors.address} />
              <View style={{ flexDirection: "row", gap: sw(12) }}>
                <View style={{ flex: 1 }}>
                  <FormInput label="Contact Number" placeholder="Phone" value={formData.phone} onChangeText={(v) => updateFormData("phone", v)} sw={sw} icon={Phone} required error={errors.phone} />
                </View>
                <View style={{ flex: 1 }}>
                  <FormInput label="Email Address" placeholder="Email" value={formData.email} onChangeText={(v) => updateFormData("email", v)} sw={sw} icon={Mail} required error={errors.email} />
                </View>
              </View>
              <FormInput label="Website (Optional)" placeholder="https://example.com" value={formData.website} onChangeText={(v) => updateFormData("website", v)} sw={sw} icon={Globe} />
              <Dropdown label="Description" value={formData.description} options={descriptionOptions} onSelect={(v) => updateFormData("description", v)} sw={sw} />
            </View>
          )}

          {currentStep === 1 && (
            <View>
              <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text, marginBottom: sw(4) }}>Operating Details</Text>
              <Text style={{ fontSize: sw(12), color: COLORS.textSecondary, marginBottom: sw(20) }}>Set your working hours and team info</Text>
              <View style={{ flexDirection: "row", gap: sw(12) }}>
                <View style={{ flex: 1 }}>
                  <FormInput label="Opening Time" placeholder="e.g. 09:00 AM" value={formData.openingTime} onChangeText={(v) => updateFormData("openingTime", v)} sw={sw} required error={errors.openingTime} />
                </View>
                <View style={{ flex: 1 }}>
                  <FormInput label="Closing Time" placeholder="e.g. 09:00 PM" value={formData.closingTime} onChangeText={(v) => updateFormData("closingTime", v)} sw={sw} required error={errors.closingTime} />
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: sw(12) }}>
                <View style={{ flex: 1 }}>
                  <Dropdown label="Price Range" value={formData.priceRange} options={priceRanges} onSelect={(v) => updateFormData("priceRange", v)} sw={sw} />
                </View>
                <View style={{ flex: 1 }}>
                  <FormInput label="Staff Count" placeholder="e.g. 5-10" value={formData.staffCount} onChangeText={(v) => updateFormData("staffCount", v)} sw={sw} icon={Users} required error={errors.staffCount} />
                </View>
              </View>
              <FormInput label="Instagram" placeholder="https://instagram.com/handle" value={formData.instagram} onChangeText={(v) => updateFormData("instagram", v)} sw={sw} />
              <FormInput label="Facebook" placeholder="https://facebook.com/page" value={formData.facebook} onChangeText={(v) => updateFormData("facebook", v)} sw={sw} />
              <FormInput label="Twitter" placeholder="https://twitter.com/handle" value={formData.twitter} onChangeText={(v) => updateFormData("twitter", v)} sw={sw} />
            </View>
          )}

          {currentStep === 2 && (
            <View>
              <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text, marginBottom: sw(4) }}>Amenities & Specialities</Text>
              <Text style={{ fontSize: sw(12), color: COLORS.textSecondary, marginBottom: sw(20) }}>Select available amenities and specialities</Text>
              <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(12) }}>Available Amenities</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: sw(8), marginBottom: sw(20) }}>
                {amenitiesWithIcons.map((item, idx) => (
                  <View key={idx} style={{ width: amenityWidth, paddingHorizontal: sw(2) }}>
                    <AmenityItem icon={item.icon} label={item.label} selected={formData.amenities.includes(item.label)} onToggle={() => {
                      const amenities = formData.amenities.includes(item.label)
                        ? formData.amenities.filter((a) => a !== item.label)
                        : [...formData.amenities, item.label];
                      updateFormData("amenities", amenities);
                    }} sw={sw} />
                  </View>
                ))}
              </View>
              <FormInput label="Specialities" placeholder="e.g., Deep Tissue, Aromatherapy" value={formData.specialities} onChangeText={(v) => updateFormData("specialities", v)} sw={sw} multiline height={sw(80)} />
            </View>
          )}

          {currentStep === 3 && (
            <View>
              <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text, marginBottom: sw(4) }}>Services</Text>
              <Text style={{ fontSize: sw(12), color: COLORS.textSecondary, marginBottom: sw(20) }}>Describe your main services</Text>
              <FormInput label="Main Services" placeholder="e.g., Massage, Facial, Hair Treatment" value={formData.mainService} onChangeText={(v) => updateFormData("mainService", v)} sw={sw} multiline height={sw(120)} />
              <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(10), padding: sw(14), marginTop: sw(16) }}>
                <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text, marginBottom: sw(8) }}>💡 Tip: Add comma-separated services</Text>
                <Text style={{ fontSize: sw(10), color: COLORS.textSecondary }}>Example: Swedish Massage, Hot Stone Therapy, Facial Treatment, Hair Spa</Text>
              </View>
            </View>
          )}

          {currentStep === 4 && (
            <View>
              <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text, marginBottom: sw(4) }}>Review Your Information</Text>
              <Text style={{ fontSize: sw(12), color: COLORS.textSecondary, marginBottom: sw(20) }}>Confirm all details before submitting</Text>
              
              <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(10), padding: sw(14), marginBottom: sw(12) }}>
                <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.primary, marginBottom: sw(10) }}>Basic Information</Text>
                <View style={{ gap: sw(6) }}>
                  <Text style={{ fontSize: sw(10), color: COLORS.text }}><Text style={{ fontWeight: "600" }}>Spa Name:</Text> {formData.spaName}</Text>
                  <Text style={{ fontSize: sw(10), color: COLORS.text }}><Text style={{ fontWeight: "600" }}>Address:</Text> {formData.address}</Text>
                  <Text style={{ fontSize: sw(10), color: COLORS.text }}><Text style={{ fontWeight: "600" }}>Phone:</Text> {formData.phone}</Text>
                  <Text style={{ fontSize: sw(10), color: COLORS.text }}><Text style={{ fontWeight: "600" }}>Email:</Text> {formData.email}</Text>
                </View>
              </View>

              <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(10), padding: sw(14), marginBottom: sw(12) }}>
                <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.primary, marginBottom: sw(10) }}>Operating Details</Text>
                <View style={{ gap: sw(6) }}>
                  <Text style={{ fontSize: sw(10), color: COLORS.text }}><Text style={{ fontWeight: "600" }}>Hours:</Text> {formData.openingTime} - {formData.closingTime}</Text>
                  <Text style={{ fontSize: sw(10), color: COLORS.text }}><Text style={{ fontWeight: "600" }}>Price Range:</Text> {formData.priceRange}</Text>
                  <Text style={{ fontSize: sw(10), color: COLORS.text }}><Text style={{ fontWeight: "600" }}>Staff Count:</Text> {formData.staffCount}</Text>
                </View>
              </View>

              <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(10), padding: sw(14), marginBottom: sw(12) }}>
                <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.primary, marginBottom: sw(10) }}>Amenities ({formData.amenities.length})</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: sw(6) }}>
                  {formData.amenities.map((amenity, idx) => (
                    <View key={idx} style={{ backgroundColor: COLORS.primaryLight + "20", paddingHorizontal: sw(10), paddingVertical: sw(6), borderRadius: sw(6) }}>
                      <Text style={{ fontSize: sw(9), color: COLORS.primary, fontWeight: "600" }}>{amenity}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {formData.mainService && (
                <View style={{ backgroundColor: COLORS.cardBg, borderRadius: sw(10), padding: sw(14) }}>
                  <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.primary, marginBottom: sw(8) }}>Services</Text>
                  <Text style={{ fontSize: sw(10), color: COLORS.text }}>{formData.mainService}</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>

        {/* Footer */}
        <LinearGradient colors={["transparent", "rgba(255,255,255,0.3)"]} style={{ paddingHorizontal: sw(20), paddingVertical: sw(16), gap: sw(10), borderTopWidth: 1, borderTopColor: COLORS.border }}>
          <View style={{ flexDirection: "row", gap: sw(12) }}>
            {currentStep > 0 && (
              <TouchableOpacity
                onPress={handlePrevious}
                style={{
                  flex: 1,
                  paddingVertical: Math.max(sw(12), 10),
                  borderRadius: sw(8),
                  borderWidth: 1.5,
                  borderColor: COLORS.blue,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                activeOpacity={0.7}
              >
                <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.blue }}>Previous</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={currentStep === 4 ? handleSubmit : handleNext}
              style={{
                flex: 1,
                paddingVertical: 0,
                borderRadius: sw(8),
                overflow: "hidden",
                minHeight: Math.max(sw(44), 40),
              }}
              activeOpacity={0.7}
              disabled={loading}
            >
              <LinearGradient
                colors={[COLORS.blue, COLORS.blue]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: "100%",
                  paddingVertical: Math.max(sw(12), 10),
                  borderRadius: sw(8),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.white }}>
                  {loading ? "Submitting..." : currentStep === 4 ? "Submit" : "Next Step"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}
