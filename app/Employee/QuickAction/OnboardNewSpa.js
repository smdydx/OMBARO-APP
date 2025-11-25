import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Building2, MapPin, Globe, Phone, Mail, Plus, Camera } from "lucide-react-native";
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
import * as Location from "expo-location";

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
  blue: "#0EA5E9",
};

function useScale() {
  const { width, height } = useWindowDimensions();
  const base = Math.min(width, 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw, width, height };
}

const StepIndicator = ({ currentStep, totalSteps, sw }) => {
  const steps = ["Basic Information", "Operating Details", "Amenities & Specialities", "Services"];
  
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(20) }}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View key={index} style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                width: sw(24),
                height: sw(24),
                borderRadius: sw(12),
                backgroundColor: index < currentStep ? COLORS.primaryLight : index === currentStep ? COLORS.primaryLight : "#E5E7EB",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: sw(4),
              }}
            >
              <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.white }}>
                {index + 1}
              </Text>
            </View>
            <Text style={{ fontSize: sw(8), color: COLORS.textLight, textAlign: "center" }}>
              {steps[index]}
            </Text>
            {index < totalSteps - 1 && (
              <View
                style={{
                  position: "absolute",
                  left: "50%",
                  top: sw(12),
                  width: "50%",
                  height: sw(2),
                  backgroundColor: index < currentStep - 1 ? COLORS.primaryLight : "#E5E7EB",
                }}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const FormInput = ({ label, placeholder, value, onChangeText, sw, icon: Icon, multiline = false, height = sw(42) }) => {
  return (
    <View style={{ marginBottom: sw(14) }}>
      <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.text, marginBottom: sw(5) }}>
        {label}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: COLORS.border, borderRadius: sw(8), paddingHorizontal: sw(12), backgroundColor: COLORS.white }}>
        {Icon && <Icon size={sw(16)} color={COLORS.textLight} strokeWidth={2} style={{ marginRight: sw(8) }} />}
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          style={{
            flex: 1,
            paddingVertical: sw(10),
            fontSize: sw(12),
            color: COLORS.text,
            height: height,
            textAlignVertical: multiline ? "top" : "center",
          }}
          placeholderTextColor={COLORS.textLight}
        />
      </View>
    </View>
  );
};

const Dropdown = ({ label, value, options, onSelect, sw, icon: Icon }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ marginBottom: sw(14) }}>
      <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.text, marginBottom: sw(5) }}>
        {label}
      </Text>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: COLORS.border,
          borderRadius: sw(8),
          paddingHorizontal: sw(12),
          paddingVertical: sw(10),
          backgroundColor: COLORS.white,
        }}
      >
        {Icon && <Icon size={sw(16)} color={COLORS.textLight} strokeWidth={2} style={{ marginRight: sw(8) }} />}
        <Text style={{ flex: 1, fontSize: sw(12), color: value ? COLORS.text : COLORS.textLight }}>
          {value || "Select option"}
        </Text>
      </TouchableOpacity>

      {open && (
        <View style={{
          backgroundColor: COLORS.cardBg,
          borderWidth: 1,
          borderColor: COLORS.border,
          borderRadius: sw(8),
          marginTop: sw(4),
          maxHeight: sw(150),
        }}>
          <ScrollView>
            {options.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  onSelect(opt);
                  setOpen(false);
                }}
                style={{
                  paddingVertical: sw(10),
                  paddingHorizontal: sw(12),
                  backgroundColor: value === opt ? COLORS.primaryLight + "20" : COLORS.white,
                }}
              >
                <Text style={{ fontSize: sw(11), color: COLORS.text }}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const CheckboxGrid = ({ label, items, selected, onToggle, sw }) => {
  return (
    <View style={{ marginBottom: sw(16) }}>
      <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.text, marginBottom: sw(8) }}>
        {label}
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: sw(6) }}>
        {items.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => onToggle(item)}
            style={{
              width: "48%",
              borderWidth: 1,
              borderColor: selected.includes(item) ? COLORS.blue : COLORS.border,
              borderRadius: sw(8),
              paddingVertical: sw(8),
              paddingHorizontal: sw(8),
              backgroundColor: selected.includes(item) ? COLORS.blue + "15" : COLORS.white,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: sw(14),
                height: sw(14),
                borderRadius: sw(3),
                borderWidth: 1.5,
                borderColor: selected.includes(item) ? COLORS.blue : COLORS.border,
                backgroundColor: selected.includes(item) ? COLORS.blue : COLORS.white,
                marginRight: sw(6),
              }}
            />
            <Text style={{ fontSize: sw(10), color: COLORS.text, flex: 1 }}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default function OnboardNewSpa({ onBack }) {
  const { sw, width, height } = useScale();
  const [currentStep, setCurrentStep] = useState(0);

  // Step 1: Basic Information
  const [spaName, setSpaName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("Full Service Spa");

  // Step 2: Operating Details
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [priceRange, setPriceRange] = useState("Mid-range (₹₹) - ₹2000-5000");
  const [staffCount, setStaffCount] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");

  // Step 3: Amenities & Specialities
  const [amenities, setAmenities] = useState([]);
  const [specialities, setSpecialities] = useState("");

  // Step 4: Services (placeholder)
  const [mainService, setMainService] = useState("");

  const amenitiesList = ["Free WiFi", "Parking", "Card Payment", "Refreshments", "24/7 Security", "Air Conditioning", "Lockers", "Shower Facilities"];

  const descriptionOptions = ["Full Service Spa", "Day Spa", "Medical Spa", "Wellness Center", "Beauty Salon", "Massage Center"];

  const priceRanges = [
    "Budget (₹) - ₹500-1000",
    "Mid-range (₹₹) - ₹2000-5000",
    "Premium (₹₹₹) - ₹5000-10000",
    "Luxury (₹₹₹₹) - ₹10000+",
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGetLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        alert(`Location: ${location.coords.latitude}, ${location.coords.longitude}`);
      }
    } catch (error) {
      alert("Could not get location");
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", {
      spaName, address, phone, email, website, description,
      openingTime, closingTime, priceRange, staffCount, instagram, facebook, twitter,
      amenities, specialities, mainService
    });
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
          paddingBottom: sw(16),
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(10) }}>
          <TouchableOpacity onPress={onBack} style={{ marginRight: sw(12) }}>
            <ArrowLeft size={sw(22)} color={COLORS.white} strokeWidth={2.5} />
          </TouchableOpacity>
          <Building2 size={sw(22)} color={COLORS.white} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(13), fontWeight: "800", color: COLORS.white, marginLeft: sw(8) }}>
            Onboard New Spa
          </Text>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: sw(16),
          paddingVertical: sw(16),
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={4} sw={sw} />

        {/* Step 1: Basic Information */}
        {currentStep === 0 && (
          <View>
            <FormInput
              label="Spa Name *"
              placeholder="Enter spa name"
              value={spaName}
              onChangeText={setSpaName}
              sw={sw}
              icon={Building2}
            />
            <FormInput
              label="Complete Address *"
              placeholder="Enter complete address"
              value={address}
              onChangeText={setAddress}
              sw={sw}
              icon={MapPin}
              multiline
              height={sw(60)}
            />
            <View style={{ flexDirection: "row", gap: sw(8) }}>
              <View style={{ flex: 1 }}>
                <FormInput
                  label="Contact Number *"
                  placeholder="Phone number"
                  value={phone}
                  onChangeText={setPhone}
                  sw={sw}
                  icon={Phone}
                />
              </View>
              <View style={{ flex: 1 }}>
                <FormInput
                  label="Email Address *"
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  sw={sw}
                  icon={Mail}
                />
              </View>
            </View>
            <FormInput
              label="Website (Optional)"
              placeholder="https://www.example.com"
              value={website}
              onChangeText={setWebsite}
              sw={sw}
              icon={Globe}
            />
            <Dropdown
              label="Description"
              value={description}
              options={descriptionOptions}
              onSelect={setDescription}
              sw={sw}
            />
          </View>
        )}

        {/* Step 2: Operating Details */}
        {currentStep === 1 && (
          <View>
            <View style={{ flexDirection: "row", gap: sw(8) }}>
              <View style={{ flex: 1 }}>
                <FormInput
                  label="Opening Time"
                  placeholder="--:-- --"
                  value={openingTime}
                  onChangeText={setOpeningTime}
                  sw={sw}
                />
              </View>
              <View style={{ flex: 1 }}>
                <FormInput
                  label="Closing Time"
                  placeholder="--:-- --"
                  value={closingTime}
                  onChangeText={setClosingTime}
                  sw={sw}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: sw(8) }}>
              <View style={{ flex: 1 }}>
                <Dropdown
                  label="Price Range"
                  value={priceRange}
                  options={priceRanges}
                  onSelect={setPriceRange}
                  sw={sw}
                />
              </View>
              <View style={{ flex: 1 }}>
                <FormInput
                  label="Staff Count"
                  placeholder="Number of staff members"
                  value={staffCount}
                  onChangeText={setStaffCount}
                  sw={sw}
                />
              </View>
            </View>
            <FormInput
              label="Instagram"
              placeholder="https://instagram.com/yourhandle"
              value={instagram}
              onChangeText={setInstagram}
              sw={sw}
            />
            <FormInput
              label="Facebook"
              placeholder="https://facebook.com/yourpage"
              value={facebook}
              onChangeText={setFacebook}
              sw={sw}
            />
            <FormInput
              label="Twitter"
              placeholder="https://twitter.com/yourhandle"
              value={twitter}
              onChangeText={setTwitter}
              sw={sw}
            />
          </View>
        )}

        {/* Step 3: Amenities & Specialities */}
        {currentStep === 2 && (
          <View>
            <CheckboxGrid
              label="Available Amenities"
              items={amenitiesList}
              selected={amenities}
              onToggle={(item) => {
                if (amenities.includes(item)) {
                  setAmenities(amenities.filter(a => a !== item));
                } else {
                  setAmenities([...amenities, item]);
                }
              }}
              sw={sw}
            />

            <View style={{ marginBottom: sw(16) }}>
              <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.text, marginBottom: sw(6) }}>
                Specialities
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  placeholder="e.g., Deep Tissue Massage, Aromatherapy"
                  value={specialities}
                  onChangeText={setSpecialities}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    borderRadius: sw(8),
                    paddingHorizontal: sw(12),
                    paddingVertical: sw(10),
                    fontSize: sw(12),
                    color: COLORS.text,
                  }}
                  placeholderTextColor={COLORS.textLight}
                />
                <TouchableOpacity style={{ marginLeft: sw(8), padding: sw(8) }}>
                  <Plus size={sw(20)} color={COLORS.blue} strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginBottom: sw(16) }}>
              <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.text, marginBottom: sw(8) }}>
                Photo Upload
              </Text>
              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  borderStyle: "dashed",
                  borderColor: COLORS.border,
                  borderRadius: sw(10),
                  paddingVertical: sw(24),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Camera size={sw(28)} color={COLORS.textLight} strokeWidth={1.5} />
                <Text style={{ fontSize: sw(11), color: COLORS.textSecondary, marginTop: sw(6), textAlign: "center" }}>
                  Upload spa photos
                </Text>
                <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginTop: sw(2) }}>
                  Drag and drop or click to browse
                </Text>
                <TouchableOpacity
                  style={{
                    marginTop: sw(10),
                    borderWidth: 1,
                    borderColor: COLORS.blue,
                    borderRadius: sw(6),
                    paddingHorizontal: sw(12),
                    paddingVertical: sw(6),
                  }}
                >
                  <Text style={{ fontSize: sw(10), color: COLORS.blue, fontWeight: "600" }}>
                    Choose Files
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.text, marginBottom: sw(8) }}>
                Location Tagging
              </Text>
              <TouchableOpacity
                onPress={handleGetLocation}
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.blue,
                  borderRadius: sw(8),
                  paddingVertical: sw(10),
                  paddingHorizontal: sw(12),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MapPin size={sw(16)} color={COLORS.blue} strokeWidth={2} />
                <Text style={{ fontSize: sw(11), color: COLORS.blue, fontWeight: "600", marginLeft: sw(6) }}>
                  Get Live Location
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Step 4: Services */}
        {currentStep === 3 && (
          <View>
            <FormInput
              label="Main Services"
              placeholder="e.g., Massage, Facial, Hair Treatment"
              value={mainService}
              onChangeText={setMainService}
              sw={sw}
              multiline
              height={sw(70)}
            />
            <Text style={{ fontSize: sw(12), color: COLORS.textSecondary, marginTop: sw(12) }}>
              Review all entered information before submitting the form.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Footer Buttons */}
      <LinearGradient
        colors={["transparent", "rgba(255,255,255,0.5)"]}
        style={{
          paddingHorizontal: sw(16),
          paddingVertical: sw(14),
          gap: sw(8),
        }}
      >
        <View style={{ flexDirection: "row", gap: sw(8) }}>
          {currentStep > 0 && (
            <TouchableOpacity
              onPress={handlePrevious}
              style={{
                flex: 1,
                paddingVertical: sw(10),
                borderRadius: sw(8),
                borderWidth: 1.5,
                borderColor: COLORS.blue,
                alignItems: "center",
              }}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.blue }}>
                Previous
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={currentStep === 3 ? handleSubmit : handleNext}
            style={{
              flex: 1,
              paddingVertical: sw(10),
              borderRadius: sw(8),
              alignItems: "center",
            }}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={[COLORS.blue, COLORS.blue]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: "100%",
                paddingVertical: sw(10),
                borderRadius: sw(8),
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.white }}>
                {currentStep === 3 ? "Submit" : "Next Step"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}
