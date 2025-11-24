import { ArrowLeft, Plus, X } from "lucide-react-native";
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
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
};

function useScale() {
  const { width, height } = useWindowDimensions();
  const base = Math.min(width, 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw, width, height };
}

export default function AddTherapist({ visible, onClose, onAdd }) {
  const { sw, width, height } = useScale();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [experience, setExperience] = useState("0");
  const [status, setStatus] = useState("Active");
  const [specializations, setSpecializations] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [newSpec, setNewSpec] = useState("");
  const [newCert, setNewCert] = useState("");

  const handleAddSpec = () => {
    if (newSpec.trim()) {
      setSpecializations([...specializations, newSpec]);
      setNewSpec("");
    }
  };

  const handleAddCert = () => {
    if (newCert.trim()) {
      setCertifications([...certifications, newCert]);
      setNewCert("");
    }
  };

  const handleRemoveSpec = (index) => {
    setSpecializations(specializations.filter((_, i) => i !== index));
  };

  const handleRemoveCert = (index) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleAddTherapist = () => {
    if (fullName.trim() && email.trim() && mobile.trim()) {
      const newTherapist = {
        name: fullName,
        specialty: specializations[0] || "General Therapist",
        phone: mobile,
        rating: "4.5",
        bookings: "0",
        experience: experience,
        status: status,
        specializations,
        certifications,
      };
      onAdd(newTherapist);
      handleClose();
    }
  };

  const handleClose = () => {
    setFullName("");
    setEmail("");
    setMobile("");
    setExperience("0");
    setStatus("Active");
    setSpecializations([]);
    setCertifications([]);
    setNewSpec("");
    setNewCert("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} />

        <LinearGradient
          colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]}
          style={{ paddingHorizontal: sw(20), paddingTop: Platform.OS === "ios" ? sw(50) : sw(40), paddingBottom: sw(16) }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <TouchableOpacity
              onPress={handleClose}
              style={{
                width: sw(40),
                height: sw(40),
                borderRadius: sw(20),
                backgroundColor: "rgba(255,255,255,0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowLeft size={sw(22)} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={{ fontSize: sw(16), fontWeight: "800", color: "#FFFFFF" }}>
              Add New Therapist
            </Text>
            <TouchableOpacity
              onPress={handleClose}
              style={{
                width: sw(40),
                height: sw(40),
                borderRadius: sw(20),
                backgroundColor: "rgba(255,255,255,0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={sw(22)} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: sw(16), paddingVertical: sw(20), paddingBottom: sw(100) }}
          showsVerticalScrollIndicator={false}
        >
          {/* Basic Information Section */}
          <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.text, marginBottom: sw(12) }}>
            Basic Information
          </Text>

          <FormField label="Full Name" value={fullName} onChangeText={setFullName} placeholder="Enter therapist name" sw={sw} />
          <FormField label="Email" value={email} onChangeText={setEmail} placeholder="Enter email address" sw={sw} />
          <FormField label="Mobile Number" value={mobile} onChangeText={setMobile} placeholder="Enter mobile number" sw={sw} />

          <View style={{ marginBottom: sw(12) }}>
            <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(6) }}>
              Years of Experience
            </Text>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: COLORS.border,
              borderRadius: sw(10),
              backgroundColor: COLORS.bg,
              paddingHorizontal: sw(12),
              paddingVertical: sw(8),
            }}>
              <TouchableOpacity
                onPress={() => setExperience(Math.max(0, parseInt(experience) - 1).toString())}
                style={{
                  width: sw(32),
                  height: sw(32),
                  borderRadius: sw(6),
                  backgroundColor: COLORS.cardBg,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: sw(16), fontWeight: "700", color: COLORS.primary }}>−</Text>
              </TouchableOpacity>
              <TextInput
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: sw(14),
                  fontWeight: "700",
                  color: COLORS.text,
                }}
                value={experience}
                onChangeText={setExperience}
                keyboardType="number-pad"
              />
              <TouchableOpacity
                onPress={() => setExperience((parseInt(experience) + 1).toString())}
                style={{
                  width: sw(32),
                  height: sw(32),
                  borderRadius: sw(6),
                  backgroundColor: COLORS.cardBg,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: sw(16), fontWeight: "700", color: COLORS.primary }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: sw(16) }}>
            <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(6) }}>
              Status
            </Text>
            <View style={{
              borderWidth: 1,
              borderColor: COLORS.border,
              borderRadius: sw(10),
              paddingHorizontal: sw(12),
              paddingVertical: sw(10),
              backgroundColor: COLORS.bg,
            }}>
              <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: sw(12), color: COLORS.text, fontWeight: "600" }}>{status}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Specializations Section */}
          <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.text, marginBottom: sw(12) }}>
            Specializations
          </Text>

          <View style={{ flexDirection: "row", gap: sw(8), marginBottom: sw(12) }}>
            <TextInput
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: COLORS.border,
                borderRadius: sw(10),
                paddingHorizontal: sw(12),
                paddingVertical: sw(10),
                fontSize: sw(12),
                color: COLORS.text,
                backgroundColor: COLORS.bg,
              }}
              placeholder="Add specialization"
              placeholderTextColor={COLORS.textLight}
              value={newSpec}
              onChangeText={setNewSpec}
            />
            <TouchableOpacity
              onPress={handleAddSpec}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: sw(10),
                paddingHorizontal: sw(12),
                paddingVertical: sw(10),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Plus size={sw(18)} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          {specializations.length > 0 && (
            <View style={{ gap: sw(8), marginBottom: sw(16) }}>
              {specializations.map((spec, idx) => (
                <View
                  key={idx}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: `${COLORS.primary}15`,
                    borderRadius: sw(10),
                    paddingHorizontal: sw(12),
                    paddingVertical: sw(10),
                  }}
                >
                  <Text style={{ fontSize: sw(12), fontWeight: "600", color: COLORS.primary }}>{spec}</Text>
                  <TouchableOpacity onPress={() => handleRemoveSpec(idx)}>
                    <X size={sw(16)} color={COLORS.primary} strokeWidth={2.5} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Certifications Section */}
          <Text style={{ fontSize: sw(14), fontWeight: "800", color: COLORS.text, marginBottom: sw(12) }}>
            Certifications
          </Text>

          <View style={{ flexDirection: "row", gap: sw(8), marginBottom: sw(12) }}>
            <TextInput
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: COLORS.border,
                borderRadius: sw(10),
                paddingHorizontal: sw(12),
                paddingVertical: sw(10),
                fontSize: sw(12),
                color: COLORS.text,
                backgroundColor: COLORS.bg,
              }}
              placeholder="Add certification"
              placeholderTextColor={COLORS.textLight}
              value={newCert}
              onChangeText={setNewCert}
            />
            <TouchableOpacity
              onPress={handleAddCert}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: sw(10),
                paddingHorizontal: sw(12),
                paddingVertical: sw(10),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Plus size={sw(18)} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          {certifications.length > 0 && (
            <View style={{ gap: sw(8), marginBottom: sw(16) }}>
              {certifications.map((cert, idx) => (
                <View
                  key={idx}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: `${COLORS.primary}15`,
                    borderRadius: sw(10),
                    paddingHorizontal: sw(12),
                    paddingVertical: sw(10),
                  }}
                >
                  <Text style={{ fontSize: sw(12), fontWeight: "600", color: COLORS.primary }}>{cert}</Text>
                  <TouchableOpacity onPress={() => handleRemoveCert(idx)}>
                    <X size={sw(16)} color={COLORS.primary} strokeWidth={2.5} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Add Button */}
          <TouchableOpacity
            onPress={handleAddTherapist}
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: sw(12),
              paddingVertical: sw(14),
              alignItems: "center",
              justifyContent: "center",
              marginTop: sw(12),
            }}
          >
            <Text style={{ fontSize: sw(14), fontWeight: "800", color: "#FFFFFF" }}>
              Add Therapist
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}

function FormField({ label, value, onChangeText, placeholder, sw }) {
  return (
    <View style={{ marginBottom: sw(12) }}>
      <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(6) }}>
        {label}
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: COLORS.border,
          borderRadius: sw(10),
          paddingHorizontal: sw(12),
          paddingVertical: sw(10),
          fontSize: sw(12),
          color: COLORS.text,
          backgroundColor: COLORS.bg,
        }}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
