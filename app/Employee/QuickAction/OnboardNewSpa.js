import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Building2, Clock, MapPin, Briefcase, Star } from "lucide-react-native";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
  StyleSheet,
} from "react-native";

const COLORS = {
  gradient1: "#00FF87",
  gradient2: "#016B3A",
  gradient3: "#013B1F",
  gradient4: "#012B17",
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
};

function useScale() {
  const { width, height } = useWindowDimensions();
  const base = Math.min(width, 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw, width, height };
}

const StepIndicator = ({ currentStep, totalSteps, sw }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(20) }}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View key={index} style={{ flex: 1, alignItems: "center" }}>
          <View
            style={{
              width: sw(28),
              height: sw(28),
              borderRadius: sw(14),
              backgroundColor: index < currentStep ? COLORS.primaryLight : index === currentStep ? COLORS.primaryLight : "#E5E7EB",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: sw(4),
            }}
          >
            <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.white }}>
              {index + 1}
            </Text>
          </View>
          {index < totalSteps - 1 && (
            <View
              style={{
                position: "absolute",
                left: "50%",
                width: "50%",
                height: sw(2),
                backgroundColor: index < currentStep - 1 ? COLORS.primaryLight : "#E5E7EB",
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const FormInput = ({ label, placeholder, value, onChangeText, sw, multiline = false, height = sw(45) }) => {
  return (
    <View style={{ marginBottom: sw(16) }}>
      <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text, marginBottom: sw(6) }}>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        style={{
          backgroundColor: COLORS.cardBg,
          borderRadius: sw(10),
          borderWidth: 1,
          borderColor: COLORS.border,
          paddingHorizontal: sw(12),
          paddingVertical: sw(10),
          fontSize: sw(12),
          color: COLORS.text,
          height: height,
          textAlignVertical: multiline ? "top" : "center",
        }}
        placeholderTextColor={COLORS.textLight}
      />
    </View>
  );
};

export default function OnboardNewSpa({ onBack }) {
  const { sw, width, height } = useScale();
  const [currentStep, setCurrentStep] = useState(0);

  const [basicInfo, setBasicInfo] = useState({
    spaName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [operatingDetails, setOperatingDetails] = useState({
    openingTime: "",
    closingTime: "",
    daysOpen: "",
    manager: "",
  });

  const [amenities, setAmenities] = useState({
    wifi: false,
    parking: false,
    ac: false,
    lockers: false,
    description: "",
  });

  const [services, setServices] = useState({
    mainService: "",
    subServices: "",
    specialization: "",
    staffCount: "",
  });

  const steps = [
    {
      title: "Basic Information",
      description: "Tell us about your spa business",
    },
    {
      title: "Operating Details",
      description: "Set your working hours and team",
    },
    {
      title: "Amenities & Specialities",
      description: "Add facilities and features",
    },
    {
      title: "Services",
      description: "Define your service offerings",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", { basicInfo, operatingDetails, amenities, services });
    alert("Spa Onboarding Complete!");
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Header */}
      <LinearGradient
        colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingHorizontal: sw(16),
          paddingTop: sw(12),
          paddingBottom: sw(20),
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(12) }}>
          <TouchableOpacity onPress={onBack} style={{ marginRight: sw(12) }}>
            <ArrowLeft size={sw(24)} color={COLORS.white} strokeWidth={2.5} />
          </TouchableOpacity>
          <Building2 size={sw(24)} color={COLORS.white} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.white, marginLeft: sw(8) }}>
            Onboard New Spa
          </Text>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: sw(16),
          paddingVertical: sw(20),
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep + 1} totalSteps={steps.length} sw={sw} />

        {/* Step Title */}
        <View style={{ marginBottom: sw(20) }}>
          <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text }}>
            {steps[currentStep].title}
          </Text>
          <Text style={{ fontSize: sw(11), color: COLORS.textSecondary, marginTop: sw(4) }}>
            {steps[currentStep].description}
          </Text>
        </View>

        {/* Step 1: Basic Information */}
        {currentStep === 0 && (
          <View>
            <FormInput
              label="Spa Name"
              placeholder="Enter spa name"
              value={basicInfo.spaName}
              onChangeText={(text) => setBasicInfo({ ...basicInfo, spaName: text })}
              sw={sw}
            />
            <FormInput
              label="Email Address"
              placeholder="Enter email"
              value={basicInfo.email}
              onChangeText={(text) => setBasicInfo({ ...basicInfo, email: text })}
              sw={sw}
            />
            <FormInput
              label="Phone Number"
              placeholder="Enter phone number"
              value={basicInfo.phone}
              onChangeText={(text) => setBasicInfo({ ...basicInfo, phone: text })}
              sw={sw}
            />
            <FormInput
              label="Address"
              placeholder="Enter complete address"
              value={basicInfo.address}
              onChangeText={(text) => setBasicInfo({ ...basicInfo, address: text })}
              sw={sw}
              multiline
              height={sw(70)}
            />
          </View>
        )}

        {/* Step 2: Operating Details */}
        {currentStep === 1 && (
          <View>
            <FormInput
              label="Opening Time"
              placeholder="e.g., 09:00 AM"
              value={operatingDetails.openingTime}
              onChangeText={(text) => setOperatingDetails({ ...operatingDetails, openingTime: text })}
              sw={sw}
            />
            <FormInput
              label="Closing Time"
              placeholder="e.g., 09:00 PM"
              value={operatingDetails.closingTime}
              onChangeText={(text) => setOperatingDetails({ ...operatingDetails, closingTime: text })}
              sw={sw}
            />
            <FormInput
              label="Days Open"
              placeholder="e.g., Monday to Sunday"
              value={operatingDetails.daysOpen}
              onChangeText={(text) => setOperatingDetails({ ...operatingDetails, daysOpen: text })}
              sw={sw}
            />
            <FormInput
              label="Manager Name"
              placeholder="Enter manager name"
              value={operatingDetails.manager}
              onChangeText={(text) => setOperatingDetails({ ...operatingDetails, manager: text })}
              sw={sw}
            />
          </View>
        )}

        {/* Step 3: Amenities & Specialities */}
        {currentStep === 2 && (
          <View>
            <View style={{ marginBottom: sw(16) }}>
              <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text, marginBottom: sw(8) }}>
                Available Amenities
              </Text>
              {["WiFi Available", "Parking", "Air Conditioning", "Lockers"].map((amenity, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: sw(8),
                    paddingHorizontal: sw(10),
                    backgroundColor: COLORS.cardBg,
                    borderRadius: sw(8),
                    marginBottom: sw(6),
                    borderWidth: 1,
                    borderColor: COLORS.border,
                  }}
                >
                  <View
                    style={{
                      width: sw(18),
                      height: sw(18),
                      borderRadius: sw(4),
                      borderWidth: 2,
                      borderColor: COLORS.primaryLight,
                      backgroundColor: COLORS.white,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: sw(8),
                    }}
                  >
                    <View
                      style={{
                        width: sw(10),
                        height: sw(10),
                        borderRadius: sw(2),
                        backgroundColor: COLORS.primaryLight,
                      }}
                    />
                  </View>
                  <Text style={{ fontSize: sw(11), color: COLORS.text }}>{amenity}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <FormInput
              label="Special Features Description"
              placeholder="Describe special features..."
              value={amenities.description}
              onChangeText={(text) => setAmenities({ ...amenities, description: text })}
              sw={sw}
              multiline
              height={sw(70)}
            />
          </View>
        )}

        {/* Step 4: Services */}
        {currentStep === 3 && (
          <View>
            <FormInput
              label="Main Service Category"
              placeholder="e.g., Massage, Facial, Hair"
              value={services.mainService}
              onChangeText={(text) => setServices({ ...services, mainService: text })}
              sw={sw}
            />
            <FormInput
              label="Sub Services"
              placeholder="e.g., Swedish, Deep Tissue, Hot Stone"
              value={services.subServices}
              onChangeText={(text) => setServices({ ...services, subServices: text })}
              sw={sw}
              multiline
              height={sw(70)}
            />
            <FormInput
              label="Specialization"
              placeholder="e.g., Wellness, Bridal, Sports"
              value={services.specialization}
              onChangeText={(text) => setServices({ ...services, specialization: text })}
              sw={sw}
            />
            <FormInput
              label="Staff Count"
              placeholder="e.g., 5-10 therapists"
              value={services.staffCount}
              onChangeText={(text) => setServices({ ...services, staffCount: text })}
              sw={sw}
            />
          </View>
        )}
      </ScrollView>

      {/* Footer Buttons */}
      <LinearGradient
        colors={["transparent", "rgba(255,255,255,0.5)"]}
        style={{
          paddingHorizontal: sw(16),
          paddingVertical: sw(16),
          gap: sw(10),
        }}
      >
        <View style={{ flexDirection: "row", gap: sw(10) }}>
          {currentStep > 0 && (
            <TouchableOpacity
              onPress={handlePrevious}
              style={{
                flex: 1,
                paddingVertical: sw(12),
                borderRadius: sw(10),
                borderWidth: 1.5,
                borderColor: COLORS.primaryLight,
                alignItems: "center",
              }}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.primary }}>
                Previous
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            style={{
              flex: 1,
              paddingVertical: sw(12),
              borderRadius: sw(10),
              alignItems: "center",
            }}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={[COLORS.gradient1, COLORS.gradient2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: "100%",
                paddingVertical: sw(12),
                borderRadius: sw(10),
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.white }}>
                {currentStep === steps.length - 1 ? "Submit" : "Next"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}
