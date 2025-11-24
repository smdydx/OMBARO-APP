import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Building2, Mail, Phone, MapPin, Clock, Star, Upload, Check } from "lucide-react-native";
import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { useState } from "react";

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

const TABS = [
  { id: "info", label: "Info", icon: "📋" },
  { id: "contact", label: "Contact Details", icon: "📞" },
  { id: "location", label: "Location", icon: "📍" },
  { id: "hours", label: "Operating Hours", icon: "🕒" },
  { id: "banking", label: "Banking Details", icon: "🏦" },
  { id: "documents", label: "Documents", icon: "📄" },
];

function TabHeader({ tabs, activeTab, onTabPress, sw }) {
  const scrollViewRef = useState(null)[1];
  
  return (
    <View style={{ 
      backgroundColor: COLORS.cardBg, 
      borderBottomWidth: 1, 
      borderBottomColor: COLORS.border,
      paddingVertical: sw(8),
      paddingHorizontal: sw(16),
    }}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={{ flexDirection: "row", gap: sw(8) }}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onTabPress(tab.id)}
              style={{
                paddingHorizontal: sw(12),
                paddingVertical: sw(8),
                borderBottomWidth: 2,
                borderBottomColor: activeTab === tab.id ? COLORS.primary : "transparent",
              }}
            >
              <Text style={{
                fontSize: sw(12),
                fontWeight: activeTab === tab.id ? "800" : "600",
                color: activeTab === tab.id ? COLORS.primary : COLORS.textSecondary,
              }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function InfoTab({ sw }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: sw(80) }}>
      <View style={{ padding: sw(16), gap: sw(16) }}>
        <View style={{
          backgroundColor: COLORS.cardBg,
          borderRadius: sw(12),
          padding: sw(16),
          alignItems: "center",
          borderWidth: 1,
          borderColor: COLORS.border,
        }}>
          <View style={{
            width: sw(80),
            height: sw(80),
            borderRadius: sw(12),
            backgroundColor: `${COLORS.primary}15`,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: sw(12),
          }}>
            <Building2 size={sw(40)} color={COLORS.primary} strokeWidth={2} />
          </View>
          <Text style={{ fontSize: sw(12), color: COLORS.textSecondary, marginBottom: sw(8) }}>
            Upload your business logo
          </Text>
          <TouchableOpacity style={{
            borderWidth: 1,
            borderColor: COLORS.primary,
            borderRadius: sw(8),
            paddingHorizontal: sw(16),
            paddingVertical: sw(8),
          }}>
            <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.primary }}>
              Upload Logo
            </Text>
          </TouchableOpacity>
        </View>

        <FormField label="Business Name" value="Ombarc Spa & Wellness" placeholder="Enter business name" sw={sw} />
        
        <View>
          <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(6) }}>
            Business Type
          </Text>
          <View style={{
            borderWidth: 1,
            borderColor: COLORS.border,
            borderRadius: sw(10),
            paddingHorizontal: sw(12),
            paddingVertical: sw(12),
            backgroundColor: COLORS.bg,
          }}>
            <Text style={{ fontSize: sw(12), color: COLORS.text }}>Spa & Wellness</Text>
          </View>
        </View>

        <View>
          <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(6) }}>
            Partner Type
          </Text>
          <View style={{
            borderWidth: 1,
            borderColor: COLORS.border,
            borderRadius: sw(10),
            paddingHorizontal: sw(12),
            paddingVertical: sw(12),
            backgroundColor: COLORS.bg,
          }}>
            <Text style={{ fontSize: sw(12), color: COLORS.text }}>Franchise</Text>
          </View>
        </View>

        <FormField 
          label="Business Description" 
          value="Premium spa and wellness center offering massage therapy, beauty treatments, and wellness services."
          placeholder="Describe your business..."
          multiline
          sw={sw} 
        />
      </View>
    </ScrollView>
  );
}

function ContactDetailsTab({ sw }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: sw(80) }}>
      <View style={{ padding: sw(16), gap: sw(12) }}>
        <FormField label="Contact Person Name" value="Rajesh Kumar" placeholder="Enter name" sw={sw} />
        <FormField label="Contact Mobile" value="+91 98765 43210" placeholder="Enter phone" sw={sw} />
        <FormField label="Contact Email" value="rajesh@ombarc.com" placeholder="Enter email" sw={sw} />
        <FormField label="Alternate Phone" value="+91 98765 43211" placeholder="Enter alternate phone" sw={sw} />
        <FormField label="Website" value="www.ombarc.com" placeholder="Enter website" sw={sw} />
      </View>
    </ScrollView>
  );
}

function LocationTab({ sw }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: sw(80) }}>
      <View style={{ padding: sw(16), gap: sw(12) }}>
        <FormField label="Address Line 1" value="123 Wellness Avenue" placeholder="Enter address" sw={sw} />
        <FormField label="Address Line 2" value="Bandra West" placeholder="Enter address" sw={sw} />
        
        <View style={{ flexDirection: "row", gap: sw(12) }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(6) }}>City</Text>
            <View style={{
              borderWidth: 1,
              borderColor: COLORS.border,
              borderRadius: sw(10),
              paddingHorizontal: sw(12),
              paddingVertical: sw(10),
            }}>
              <Text style={{ fontSize: sw(12), color: COLORS.text }}>Mumbai</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(6) }}>State</Text>
            <View style={{
              borderWidth: 1,
              borderColor: COLORS.border,
              borderRadius: sw(10),
              paddingHorizontal: sw(12),
              paddingVertical: sw(10),
            }}>
              <Text style={{ fontSize: sw(12), color: COLORS.text }}>Maharashtra</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: sw(12) }}>
          <View style={{ flex: 1 }}>
            <FormField label="PIN Code" value="400050" placeholder="Enter PIN" sw={sw} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(6) }}>Country</Text>
            <View style={{
              borderWidth: 1,
              borderColor: COLORS.border,
              borderRadius: sw(10),
              paddingHorizontal: sw(12),
              paddingVertical: sw(10),
            }}>
              <Text style={{ fontSize: sw(12), color: COLORS.text }}>India</Text>
            </View>
          </View>
        </View>

        <View style={{
          backgroundColor: "#E3F2FD",
          borderRadius: sw(10),
          padding: sw(12),
          borderLeftWidth: 4,
          borderLeftColor: COLORS.primary,
        }}>
          <Text style={{ fontSize: sw(11), color: COLORS.primary, fontWeight: "600" }}>
            💡 Accurate location information helps customers find your business easily.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

function OperatingHoursTab({ sw }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: sw(80) }}>
      <View style={{ padding: sw(16), gap: sw(12) }}>
        {days.map((day) => (
          <View key={day} style={{
            backgroundColor: COLORS.cardBg,
            borderRadius: sw(10),
            padding: sw(12),
            borderWidth: 1,
            borderColor: COLORS.border,
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: sw(8) }}>
              <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>{day}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{
                  width: sw(18),
                  height: sw(18),
                  borderRadius: sw(3),
                  backgroundColor: COLORS.primary,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: sw(6),
                }}>
                  <Check size={sw(12)} color="white" strokeWidth={3} />
                </View>
                <Text style={{ fontSize: sw(11), color: COLORS.textSecondary }}>Open</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: sw(8) }}>
              <View style={{ flex: 1, borderWidth: 1, borderColor: COLORS.border, borderRadius: sw(8), paddingHorizontal: sw(8), paddingVertical: sw(6) }}>
                <Text style={{ fontSize: sw(11), color: COLORS.text }}>09:00 AM</Text>
              </View>
              <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.textSecondary }}>to</Text>
              <View style={{ flex: 1, borderWidth: 1, borderColor: COLORS.border, borderRadius: sw(8), paddingHorizontal: sw(8), paddingVertical: sw(6) }}>
                <Text style={{ fontSize: sw(11), color: COLORS.text }}>09:00 PM</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function BankingDetailsTab({ sw }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: sw(80) }}>
      <View style={{ padding: sw(16), gap: sw(12) }}>
        <FormField label="Bank Name" value="HDFC Bank" placeholder="Enter bank name" sw={sw} />
        <FormField label="Account Holder Name" value="Ombarc Spa Private Ltd" placeholder="Enter account holder name" sw={sw} />
        <FormField label="Account Number" value="1234567890123456" placeholder="Enter account number" sw={sw} />
        <FormField label="IFSC Code" value="HDFC0000123" placeholder="Enter IFSC code" sw={sw} />
        <FormField label="GST Number" value="27AABCT1234H2Z0" placeholder="Enter GST number" sw={sw} />
        <FormField label="PAN Number" value="AAABP1234C" placeholder="Enter PAN number" sw={sw} />
      </View>
    </ScrollView>
  );
}

function DocumentsTab({ sw }) {
  const documents = [
    { name: "Business Registration Certificate", formats: "PDF, DOC (Max 5MB)" },
    { name: "GST Certificate", formats: "PDF, DOC (Max 5MB)" },
    { name: "Trade License", formats: "PDF, DOC (Max 5MB)" },
    { name: "PAN Card", formats: "PDF, JPG, PNG (Max 2MB)" },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: sw(80) }}>
      <View style={{ padding: sw(16), gap: sw(12) }}>
        {documents.map((doc, idx) => (
          <View key={idx} style={{
            backgroundColor: COLORS.cardBg,
            borderRadius: sw(10),
            padding: sw(12),
            borderWidth: 1,
            borderColor: COLORS.border,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <View>
              <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(3) }}>
                {doc.name}
              </Text>
              <Text style={{ fontSize: sw(10), color: COLORS.textSecondary }}>
                {doc.formats}
              </Text>
            </View>
            <TouchableOpacity style={{
              borderWidth: 1,
              borderColor: COLORS.primary,
              borderRadius: sw(8),
              paddingHorizontal: sw(14),
              paddingVertical: sw(6),
            }}>
              <Text style={{ fontSize: sw(10), fontWeight: "700", color: COLORS.primary }}>
                Upload
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function FormField({ label, value, placeholder, multiline, sw }) {
  return (
    <View>
      <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(6) }}>
        {label}
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: COLORS.border,
          borderRadius: sw(10),
          paddingHorizontal: sw(12),
          paddingVertical: multiline ? sw(10) : sw(10),
          fontSize: sw(12),
          color: COLORS.text,
          backgroundColor: COLORS.bg,
          minHeight: multiline ? sw(80) : sw(40),
        }}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        defaultValue={value}
        multiline={multiline}
        editable
      />
    </View>
  );
}

export default function MyProfile({ onBack }) {
  const { sw, width, height } = useScale();
  const [activeTab, setActiveTab] = useState("info");

  const headerHeight = height * 0.25;

  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return <InfoTab sw={sw} />;
      case "contact":
        return <ContactDetailsTab sw={sw} />;
      case "location":
        return <LocationTab sw={sw} />;
      case "hours":
        return <OperatingHoursTab sw={sw} />;
      case "banking":
        return <BankingDetailsTab sw={sw} />;
      case "documents":
        return <DocumentsTab sw={sw} />;
      default:
        return <InfoTab sw={sw} />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} />

      <LinearGradient
        colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]}
        style={{ height: headerHeight, justifyContent: "space-between", paddingBottom: sw(12), paddingHorizontal: sw(20) }}
      >
        <View style={{ paddingTop: Platform.OS === "ios" ? sw(50) : sw(40) }}>
          <TouchableOpacity
            onPress={onBack}
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
        </View>

        <View style={{ alignItems: "center", paddingBottom: sw(8) }}>
          <View style={{
            width: sw(60),
            height: sw(60),
            borderRadius: sw(16),
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: sw(8),
          }}>
            <Building2 size={sw(32)} color="#FFFFFF" strokeWidth={2.5} />
          </View>
          <Text style={{ 
            fontSize: sw(16), 
            fontWeight: "800", 
            color: "#FFFFFF",
            marginBottom: sw(4),
            textAlign: "center",
          }} numberOfLines={1}>
            My Profile
          </Text>
          <View style={{ 
            flexDirection: "row", 
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.2)",
            paddingHorizontal: sw(10),
            paddingVertical: sw(4),
            borderRadius: sw(16),
          }}>
            <Star size={sw(12)} color="#FFD700" fill="#FFD700" strokeWidth={0} />
            <Text style={{ color: "#FFFFFF", fontSize: sw(10), fontWeight: "700", marginLeft: sw(4) }}>
              4.8 Rating
            </Text>
          </View>
        </View>
      </LinearGradient>

      <TabHeader tabs={TABS} activeTab={activeTab} onTabPress={setActiveTab} sw={sw} />

      <View style={{ flex: 1 }}>
        {renderTabContent()}
      </View>
    </View>
  );
}
