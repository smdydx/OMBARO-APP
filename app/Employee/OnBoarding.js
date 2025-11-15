// OnboardNewSpaScreen.js
import React, { useMemo, useState } from "react";
import {
  View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView,
  TextInput, Image, Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

// ---------- theme ----------
const C = {
  bg: "#F7F8FB",
  card: "#FFFFFF",
  text: "#0F172A",
  muted: "#6B7280",
  border: "#E5E7EB",
  primary: "#2563EB",
  accent: "#7C3AED",
  success: "#10B981",
  warn: "#F59E0B",
  shadow: "rgba(15,23,42,0.06)",
};

const STEP_META = [
  { key: "basic", label: "Basic Information" },
  { key: "operating", label: "Operating Details" },
  { key: "amenities", label: "Amenities & Specialties" },
  { key: "services", label: "Services" }, // placeholder step
];

// ---------- small UI helpers ----------
const Header = ({ step, onBack }) => (
  <View style={s.headerWrap}>
    <Pressable onPress={onBack} style={s.backBtn}>
      <Ionicons name="chevron-back" size={22} color={C.text} />
    </Pressable>
    <Text style={s.headerTitle}>Onboard New Spa</Text>
  </View>
);

const Stepper = ({ step }) => (
  <View style={s.stepper}>
    {STEP_META.map((st, idx) => {
      const i = idx + 1;
      const active = i === step;
      const done = i < step;
      return (
        <View key={st.key} style={{ alignItems: "center", flex: 1 }}>
          <View style={s.stepRow}>
            <View style={[s.dot, active && s.dotActive, done && s.dotDone]}>
              <Text style={[s.dotText, (active || done) && { color: "#FFF" }]}>{i}</Text>
            </View>
            {i !== STEP_META.length && (
              <View style={[s.stepLine, (done || active) && { backgroundColor: C.accent }]} />
            )}
          </View>
          <Text style={[s.stepLabel, active && { color: C.text, fontWeight: "700" }]}>
            {st.label}
          </Text>
        </View>
      );
    })}
  </View>
);

const Labeled = ({ label, children }) => (
  <View style={{ marginBottom: 14 }}>
    <Text style={s.label}>{label}</Text>
    {children}
  </View>
);

const Input = ({ icon, multiline, ...props }) => (
  <View style={[s.input, multiline && { height: 120, paddingTop: 12 }]}>
    {icon ? <View style={{ marginRight: 8 }}>{icon}</View> : null}
    <TextInput style={[s.inputText, { flex: 1 }]} placeholderTextColor={C.muted} multiline={multiline} {...props} />
  </View>
);

const Button = ({ label, onPress, kind = "primary", icon }) => {
  const styleMap = {
    primary: { bg: C.primary, fg: "#FFF" },
    ghost: { bg: "#FFF", fg: C.primary, border: C.primary },
    soft: { bg: "#E6F0FF", fg: C.primary, border: "#CDE1FF" },
  };
  const t = styleMap[kind];
  return (
    <Pressable onPress={onPress} style={[s.btn, { backgroundColor: t.bg, borderColor: t.border || "transparent" }]}>
      {icon ? <View style={{ marginRight: 8 }}>{icon}</View> : null}
      <Text style={[s.btnText, { color: t.fg }]}>{label}</Text>
    </Pressable>
  );
};

const ChipToggle = ({ label, selected, onToggle, leftIcon }) => (
  <Pressable onPress={onToggle} style={[s.amenity, selected && { borderColor: C.primary, backgroundColor: "#FAFCFF" }]}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {leftIcon ? <View style={{ marginRight: 10 }}>{leftIcon}</View> : null}
      <Text style={{ color: C.text, fontWeight: "600" }}>{label}</Text>
    </View>
    <Ionicons name={selected ? "checkmark-circle" : "ellipse-outline"} size={20} color={selected ? C.primary : C.muted} />
  </Pressable>
);

// ---------- main screen ----------
export default function OnboardNewSpaScreen({ navigation }) {
  const [step, setStep] = useState(1);

  // ----- Step 1: Basic Info -----
  const [basic, setBasic] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    category: "Full Service Spa",
  });

  // ----- Step 2: Operating Details -----
  const [opening, setOpening] = useState(new Date());
  const [closing, setClosing] = useState(new Date());
  const [showOpen, setShowOpen] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [priceRange, setPriceRange] = useState("Mid-range (₹₹₹) - ₹2000-5000");
  const [staffCount, setStaffCount] = useState("");
  const [social, setSocial] = useState({ ig: "", fb: "", tw: "" });

  // ----- Step 3: Amenities & Specialties + media/location -----
  const AMENITIES = useMemo(
    () => [
      { key: "wifi", label: "Free WiFi", icon: <Ionicons name="wifi-outline" size={18} color={C.muted} /> },
      { key: "parking", label: "Parking", icon: <Ionicons name="car-outline" size={18} color={C.muted} /> },
      { key: "card", label: "Card Payment", icon: <Ionicons name="card-outline" size={18} color={C.muted} /> },
      { key: "refresh", label: "Refreshments", icon: <MaterialCommunityIcons name="coffee-outline" size={18} color={C.muted} /> },
      { key: "security", label: "24/7 Security", icon: <MaterialCommunityIcons name="shield-outline" size={18} color={C.muted} /> },
      { key: "ac", label: "Air Conditioning", icon: <Ionicons name="star-outline" size={18} color={C.muted} /> },
      { key: "lockers", label: "Lockers", icon: <Ionicons name="lock-closed-outline" size={18} color={C.muted} /> },
      { key: "shower", label: "Shower Facilities", icon: <Ionicons name="star-outline" size={18} color={C.muted} /> },
    ],
    []
  );
  const [amenities, setAmenities] = useState({});
  const toggleAmenity = (key) => setAmenities((p) => ({ ...p, [key]: !p[key] }));

  const [specialtyText, setSpecialtyText] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const addSpecialty = () => {
    const t = specialtyText.trim();
    if (!t) return;
    if (specialties.length >= 12) return Alert.alert("Limit reached", "You can add up to 12 specialties.");
    setSpecialties((p) => [...p, t]);
    setSpecialtyText("");
  };
  const removeSpecialty = (i) => setSpecialties((p) => p.filter((_, idx) => idx !== i));

  const [photos, setPhotos] = useState([]);
  const pickPhotos = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please allow photo library access.");
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({ allowsMultipleSelection: false, quality: 0.6 });
    if (!res.canceled) setPhotos((p) => [...p, res.assets[0].uri]);
  };

  const [geo, setGeo] = useState(null);
  const getLiveLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please allow location access.");
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setGeo({ lat: loc.coords.latitude, lng: loc.coords.longitude });
  };

  const goNext = () => setStep((p) => Math.min(4, p + 1));
  const goPrev = () => setStep((p) => Math.max(1, p - 1));

  const handleSubmit = () => {
    const payload = {
      basic,
      operating: {
        openingTime: opening.toISOString(),
        closingTime: closing.toISOString(),
        priceRange,
        staffCount: Number(staffCount || 0),
        social,
      },
      amenities: Object.keys(amenities).filter((k) => amenities[k]),
      specialties,
      location: geo,
      photos,
      // services: [] // add in step 4 when you define services UI
    };
    console.log("SUBMIT SPA:", JSON.stringify(payload, null, 2));
    Alert.alert("Submitted", "Payload printed to console. Wire this to your API.");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <Header step={step} onBack={() => navigation?.goBack?.()} />
      <Stepper step={step} />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 28 }}>
        <View style={s.card}>
          {/* --------- STEP 1 --------- */}
          {step === 1 && (
            <View>
              <Text style={s.sectionTitle}>Basic Information</Text>

              <Labeled label="Spa Name *">
                <Input
                  placeholder="Enter spa name"
                  value={basic.name}
                  onChangeText={(v) => setBasic({ ...basic, name: v })}
                  icon={<Ionicons name="location-outline" size={18} color={C.muted} />}
                />
              </Labeled>

              <Labeled label="Complete Address *">
                <Input
                  placeholder="Enter complete address with pincode"
                  value={basic.address}
                  onChangeText={(v) => setBasic({ ...basic, address: v })}
                  icon={<Ionicons name="location-outline" size={18} color={C.muted} />}
                />
              </Labeled>

              <Labeled label="Contact Number *">
                <Input
                  placeholder="Enter contact number"
                  keyboardType="phone-pad"
                  value={basic.phone}
                  onChangeText={(v) => setBasic({ ...basic, phone: v })}
                  icon={<Ionicons name="call-outline" size={18} color={C.muted} />}
                />
              </Labeled>

              <Labeled label="Email Address *">
                <Input
                  placeholder="Enter email address"
                  keyboardType="email-address"
                  value={basic.email}
                  onChangeText={(v) => setBasic({ ...basic, email: v })}
                  icon={<Ionicons name="mail-outline" size={18} color={C.muted} />}
                />
              </Labeled>

              <Labeled label="Website (Optional)">
                <Input
                  placeholder="https://www.example.com"
                  autoCapitalize="none"
                  value={basic.website}
                  onChangeText={(v) => setBasic({ ...basic, website: v })}
                  icon={<Ionicons name="globe-outline" size={18} color={C.muted} />}
                />
              </Labeled>

              <Labeled label="Description">
                <Input
                  placeholder="Describe the spa, its ambiance, and unique features..."
                  multiline
                  value={basic.description}
                  onChangeText={(v) => setBasic({ ...basic, description: v })}
                />
              </Labeled>

              <Labeled label="Spa Category">
                <View style={s.pickerWrap}>
                  <Picker
                    selectedValue={basic.category}
                    onValueChange={(v) => setBasic({ ...basic, category: v })}
                  >
                    <Picker.Item label="Full Service Spa" value="Full Service Spa" />
                    <Picker.Item label="Day Spa" value="Day Spa" />
                    <Picker.Item label="Medical Spa" value="Medical Spa" />
                    <Picker.Item label="Resort Spa" value="Resort Spa" />
                  </Picker>
                </View>
              </Labeled>
            </View>
          )}

          {/* --------- STEP 2 --------- */}
          {step === 2 && (
            <View>
              <Text style={s.sectionTitle}>Operating Details</Text>

              <Labeled label="Opening Time">
                <Pressable style={s.input} onPress={() => setShowOpen(true)}>
                  <Ionicons name="time-outline" size={18} color={C.muted} style={{ marginRight: 8 }} />
                  <Text style={s.inputText}>{opening.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
                </Pressable>
                {showOpen && (
                  <DateTimePicker
                    mode="time"
                    value={opening}
                    onChange={(_, d) => {
                      setShowOpen(false);
                      if (d) setOpening(d);
                    }}
                  />
                )}
              </Labeled>

              <Labeled label="Closing Time">
                <Pressable style={s.input} onPress={() => setShowClose(true)}>
                  <Ionicons name="time-outline" size={18} color={C.muted} style={{ marginRight: 8 }} />
                  <Text style={s.inputText}>{closing.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
                </Pressable>
                {showClose && (
                  <DateTimePicker
                    mode="time"
                    value={closing}
                    onChange={(_, d) => {
                      setShowClose(false);
                      if (d) setClosing(d);
                    }}
                  />
                )}
              </Labeled>

              <Labeled label="Price Range">
                <View style={s.pickerWrap}>
                  <Picker selectedValue={priceRange} onValueChange={(v) => setPriceRange(v)}>
                    <Picker.Item label="Budget (₹) - Under ₹2000" value="Budget (₹) - Under ₹2000" />
                    <Picker.Item label="Mid-range (₹₹₹) - ₹2000-5000" value="Mid-range (₹₹₹) - ₹2000-5000" />
                    <Picker.Item label="Premium (₹₹₹₹) - ₹5000-10000" value="Premium (₹₹₹₹) - ₹5000-10000" />
                    <Picker.Item label="Luxury (₹₹₹₹₹) - ₹10000+" value="Luxury (₹₹₹₹₹) - ₹10000+" />
                  </Picker>
                </View>
              </Labeled>

              <Labeled label="Staff Count">
                <Input
                  placeholder="Number of staff members"
                  keyboardType="number-pad"
                  value={staffCount}
                  onChangeText={setStaffCount}
                />
              </Labeled>

              <Text style={[s.sectionTitle, { marginTop: 8 }]}>Social Media Links</Text>
              <Labeled label="Instagram">
                <Input
                  placeholder="https://instagram.com/yourhandle"
                  autoCapitalize="none"
                  value={social.ig}
                  onChangeText={(v) => setSocial({ ...social, ig: v })}
                  icon={<Ionicons name="logo-instagram" size={18} color={C.muted} />}
                />
              </Labeled>
              <Labeled label="Facebook">
                <Input
                  placeholder="https://facebook.com/yourpage"
                  autoCapitalize="none"
                  value={social.fb}
                  onChangeText={(v) => setSocial({ ...social, fb: v })}
                  icon={<Ionicons name="logo-facebook" size={18} color={C.muted} />}
                />
              </Labeled>
              <Labeled label="Twitter / X">
                <Input
                  placeholder="https://twitter.com/yourhandle"
                  autoCapitalize="none"
                  value={social.tw}
                  onChangeText={(v) => setSocial({ ...social, tw: v })}
                  icon={<Ionicons name="logo-twitter" size={18} color={C.muted} />}
                />
              </Labeled>
            </View>
          )}

          {/* --------- STEP 3 --------- */}
          {step === 3 && (
            <View>
              <Text style={s.sectionTitle}>Amenities & Specialties</Text>
              <Text style={s.subhead}>Available Amenities</Text>
              <View style={{ marginTop: 8 }}>
                {AMENITIES.map((a) => (
                  <ChipToggle
                    key={a.key}
                    label={a.label}
                    selected={!!amenities[a.key]}
                    leftIcon={a.icon}
                    onToggle={() => toggleAmenity(a.key)}
                  />
                ))}
              </View>

              <View style={{ marginTop: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={s.subhead}>Specialties</Text>
                <Button
                  label="+ Add"
                  kind="soft"
                  onPress={addSpecialty}
                />
              </View>
              <Input
                placeholder="e.g., Deep Tissue Massage, Aromatherapy"
                value={specialtyText}
                onChangeText={setSpecialtyText}
              />
              {/* specialty chips */}
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 6 }}>
                {specialties.map((sp, i) => (
                  <Pressable key={`${sp}-${i}`} onPress={() => removeSpecialty(i)} style={s.tag}>
                    <Text style={{ color: C.primary, fontWeight: "700" }}>{sp}</Text>
                    <Ionicons name="close" size={16} color={C.primary} style={{ marginLeft: 4 }} />
                  </Pressable>
                ))}
              </View>

              <Text style={[s.sectionTitle, { marginTop: 10 }]}>Photo Upload</Text>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={s.label}>Location Tagging</Text>
                <Button
                  label="Get Live Location"
                  kind="ghost"
                  onPress={getLiveLocation}
                  icon={<Ionicons name="navigate-outline" size={16} color={C.primary} />}
                />
              </View>
              {geo ? (
                <Text style={{ color: C.muted, marginBottom: 8 }}>
                  Lat: {geo.lat.toFixed(5)}  Lng: {geo.lng.toFixed(5)}
                </Text>
              ) : null}

              <Pressable style={s.uploadBox} onPress={pickPhotos}>
                <Ionicons name="camera-outline" size={28} color={C.muted} />
                <Text style={{ color: C.text, marginTop: 6, fontWeight: "700" }}>Upload spa photos</Text>
                <Text style={{ color: C.muted, marginTop: 4 }}>Tap to choose from gallery</Text>
                <Button
                  label="Choose Files"
                  kind="soft"
                  onPress={pickPhotos}
                  icon={<Feather name="upload" size={16} color={C.primary} />}
                />
              </Pressable>

              {photos.length > 0 && (
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                  {photos.map((uri, idx) => (
                    <Image key={idx} source={{ uri }} style={s.thumb} />
                  ))}
                </View>
              )}
            </View>
          )}

          {/* --------- STEP 4 (placeholder) --------- */}
          {step === 4 && (
            <View>
              <Text style={s.sectionTitle}>Services</Text>
              <Text style={{ color: C.muted }}>
                Build your services UI here (categories, durations, pricing). For now, submitting will print payload.
              </Text>
            </View>
          )}
        </View>

        {/* Footer buttons */}
        <View style={s.footer}>
          <Button label="Previous" kind="ghost" onPress={goPrev} icon={<Ionicons name="chevron-back" size={16} color={C.primary} />} />
          {step < 4 ? (
            <Button label="Next Step" onPress={goNext} icon={<Ionicons name="chevron-forward" size={16} color="#FFF" />} />
          ) : (
            <Button label="Submit" onPress={handleSubmit} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------- styles ----------
const s = StyleSheet.create({
  headerWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 6,
    backgroundColor: C.bg,
  },
  backBtn: {
    height: 40, width: 40, borderRadius: 12, justifyContent: "center", alignItems: "center",
    backgroundColor: "#FFF", borderWidth: 1, borderColor: C.border,
  },
  headerTitle: { fontSize: 22, fontWeight: "800", marginLeft: 10, color: C.text },

  stepper: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, marginBottom: 8 },
  stepRow: { flexDirection: "row", alignItems: "center", width: "100%" },
  dot: {
    height: 32, width: 32, borderRadius: 16, backgroundColor: "#E5E7EB",
    justifyContent: "center", alignItems: "center",
  },
  dotActive: { backgroundColor: C.accent },
  dotDone: { backgroundColor: C.accent },
  dotText: { fontWeight: "800", color: C.text },
  stepLine: { height: 4, flex: 1, marginHorizontal: 6, borderRadius: 4, backgroundColor: "#E5E7EB" },
  stepLabel: { color: C.muted, fontSize: 12, marginTop: 6, textAlign: "center" },

  card: {
    backgroundColor: C.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: C.border,
    shadowColor: C.shadow,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: C.text, marginBottom: 10 },
  subhead: { color: C.text, fontWeight: "700", marginTop: 6 },

  label: { color: C.text, fontWeight: "700", marginBottom: 8 },
  input: {
    flexDirection: "row", alignItems: "center",
    borderWidth: 1, borderColor: C.border, borderRadius: 14,
    paddingHorizontal: 12, height: 52, backgroundColor: "#FFF",
  },
  inputText: { color: C.text, fontSize: 15 },

  pickerWrap: {
    borderWidth: 1, borderColor: C.border, borderRadius: 14, overflow: "hidden", backgroundColor: "#FFF",
  },

  amenity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: "#FFF",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  uploadBox: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderStyle: "dashed",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
    backgroundColor: "#FFF",
  },
  thumb: { height: 72, width: 72, borderRadius: 12, marginRight: 10, marginBottom: 10 },

  tag: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CDE1FF",
    backgroundColor: "#EAF2FF",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },

  footer: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  btn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  btnText: { fontWeight: "800", fontSize: 15 },
});
