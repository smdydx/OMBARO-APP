// profile.js
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  CreditCardIcon as Id,
  Mail,
  MapPin,
  Medal,
  Phone
} from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const [form, setForm] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    address: "Mumbai, Maharashtra",
    experience: "5 years",
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <View style={styles.wrap}>
      {/* Top bar */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.navBtn}>
          <ArrowLeft size={18} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile Settings</Text>
        <View style={styles.placeholderBtn} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header card */}
        <LinearGradient
          colors={["#7b2ff7", "#f107a3"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.avatar}>
            {/* simple circle avatar icon */}
            <View style={styles.avatarInner} />
          </View>
          <Text style={styles.heroName}>Priya Sharma</Text>
          <Text style={styles.heroSub}>Certified Therapist</Text>
        </LinearGradient>

        {/* Personal information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <Field
            label="Full Name"
            icon={<Id size={18} color="#64748b" />}
            value={form.name}
            onChangeText={(v) => set("name", v)}
          />
          <Field
            label="Email"
            icon={<Mail size={18} color="#64748b" />}
            value={form.email}
            keyboardType="email-address"
            onChangeText={(v) => set("email", v)}
          />
          <Field
            label="Phone"
            icon={<Phone size={18} color="#64748b" />}
            value={form.phone}
            keyboardType="phone-pad"
            onChangeText={(v) => set("phone", v)}
          />
          <Field
            label="Address"
            icon={<MapPin size={18} color="#64748b" />}
            value={form.address}
            onChangeText={(v) => set("address", v)}
          />
          <Field
            label="Experience"
            icon={<Medal size={18} color="#64748b" />}
            value={form.experience}
            onChangeText={(v) => set("experience", v)}
          />
        </View>

        {/* Specializations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specializations</Text>
          <View style={styles.chipsRow}>
            {["Swedish Massage", "Deep Tissue", "Aromatherapy"].map((t) => (
              <Chip key={t} label={t} color="#ede9fe" text="#7c3aed" />
            ))}
          </View>
        </View>

        {/* Languages */}
        <View style={[styles.section, { marginBottom: 16 }]}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.chipsRow}>
            {["English", "Hindi", "Marathi"].map((t) => (
              <Chip key={t} label={t} color="#dbeafe" text="#1d4ed8" />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/* ---------- Small components ---------- */

const Field = ({ label, icon, ...inputProps }) => (
  <View style={{ marginTop: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrap}>
      <View style={styles.leading}>{icon}</View>
      <TextInput style={styles.input} placeholderTextColor="#94a3b8" {...inputProps} />
    </View>
  </View>
);

const Chip = ({ label, color, text }) => (
  <View style={[styles.chip, { backgroundColor: color }]}>
    <Text style={[styles.chipText, { color: text }]}>{label}</Text>
  </View>
);

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#fff" },

  topbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderBtn: { width: 40, height: 40 },
  title: {
    flex: 1,
    textAlign: "center",
    fontWeight: "800",
    fontSize: 20,
    color: "#0f172a",
  },

  hero: {
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 22,
    paddingVertical: 32,
    alignItems: "center",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatarInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.9)",
  },
  heroName: { color: "#fff", fontWeight: "900", fontSize: 22 },
  heroSub: { color: "#f3e8ff", marginTop: 4, fontWeight: "600" },

  section: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#0f172a" },

  label: { color: "#475569", marginBottom: 6, fontWeight: "600" },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    height: 48,
  },
  leading: { width: 26, alignItems: "center", marginRight: 6 },
  input: { flex: 1, color: "#0f172a", fontWeight: "600" },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },
  chip: {
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  chipText: { fontWeight: "700" },
});