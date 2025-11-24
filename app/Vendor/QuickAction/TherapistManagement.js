import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Users, Plus, Phone, Star, Calendar, Search, Edit2, Trash2 } from "lucide-react-native";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  TextInput,
} from "react-native";
import { useState } from "react";
import AddTherapist from "./AddTherapist";

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

function TherapistCard({ name, specialty, phone, rating, bookings, experience, status, sw }) {
  const initials = name.split(" ").map(n => n.charAt(0)).join("");
  const availabilityStatus = status === "Active" ? "available" : "busy";
  
  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(14),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(14),
      marginBottom: sw(12),
    }}>
      <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: sw(12) }}>
        <View style={{
          width: sw(50),
          height: sw(50),
          borderRadius: sw(25),
          backgroundColor: "#C026D3",
          alignItems: "center",
          justifyContent: "center",
          marginRight: sw(12),
        }}>
          <Text style={{ fontSize: sw(18), fontWeight: "800", color: "#FFFFFF" }}>
            {initials}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(3) }}>
            <Text style={{ fontSize: sw(13), fontWeight: "800", color: COLORS.text }}>
              {name}
            </Text>
          </View>
          <Text style={{ fontSize: sw(11), color: COLORS.textSecondary, marginBottom: sw(6) }}>
            {phone}
          </Text>
          <View style={{ flexDirection: "row", gap: sw(6) }}>
            <View style={{
              backgroundColor: "#DCFCE7",
              paddingHorizontal: sw(8),
              paddingVertical: sw(3),
              borderRadius: sw(6),
            }}>
              <Text style={{ fontSize: sw(10), fontWeight: "700", color: "#166534" }}>
                {status}
              </Text>
            </View>
            <View style={{
              backgroundColor: availabilityStatus === "available" ? "#DCFCE7" : "#FEF3C7",
              paddingHorizontal: sw(8),
              paddingVertical: sw(3),
              borderRadius: sw(6),
            }}>
              <Text style={{ fontSize: sw(10), fontWeight: "700", color: availabilityStatus === "available" ? "#166534" : "#92400E" }}>
                {availabilityStatus}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: sw(8) }}>
          <TouchableOpacity style={{
            width: sw(32),
            height: sw(32),
            borderRadius: sw(6),
            backgroundColor: COLORS.cardBg,
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Edit2 size={sw(14)} color={COLORS.primary} strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: sw(32),
            height: sw(32),
            borderRadius: sw(6),
            backgroundColor: "#FEE2E2",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Trash2 size={sw(14)} color="#EF4444" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: sw(12), marginBottom: sw(12) }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Star size={sw(14)} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
          <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text, marginLeft: sw(4) }}>
            {rating} ({bookings} reviews)
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: sw(8), marginBottom: sw(12) }}>
        <Calendar size={sw(12)} color={COLORS.textLight} strokeWidth={2.5} />
        <Text style={{ fontSize: sw(11), color: COLORS.textSecondary }}>
          {experience} years experience
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: sw(6), marginBottom: sw(12), flexWrap: "wrap" }}>
        {specialty && (
          <View style={{
            backgroundColor: "#E9D5FF",
            paddingHorizontal: sw(8),
            paddingVertical: sw(4),
            borderRadius: sw(6),
          }}>
            <Text style={{ fontSize: sw(10), fontWeight: "600", color: "#6B21A8" }}>
              {specialty}
            </Text>
          </View>
        )}
      </View>

      <View style={{ flexDirection: "row", gap: sw(8) }}>
        <TouchableOpacity style={{
          flex: 1,
          borderWidth: 1,
          borderColor: COLORS.primary,
          borderRadius: sw(10),
          paddingVertical: sw(10),
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.primary }}>
            View Assignments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          flex: 1,
          backgroundColor: COLORS.primary,
          borderRadius: sw(10),
          paddingVertical: sw(10),
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Text style={{ fontSize: sw(12), fontWeight: "700", color: "#FFFFFF" }}>
            Assign Task
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function TherapistManagement({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  
  const [therapists, setTherapists] = useState([
    { name: "Priya Sharma", specialty: "Swedish Massage", phone: "+91 98765 11111", rating: "4.8", bookings: "156", experience: "5", status: "Active" },
    { name: "Rahul Kumar", specialty: "Deep Tissue", phone: "+91 98765 22222", rating: "4.6", bookings: "89", experience: "3", status: "Active" },
    { name: "Anita Desai", specialty: "Aromatherapy", phone: "+91 98765 33333", rating: "4.7", bookings: "120", experience: "4", status: "Active" },
    { name: "Vikram Singh", specialty: "Sports Massage", phone: "+91 98765 44444", rating: "4.9", bookings: "180", experience: "6", status: "Inactive" },
    { name: "Meera Patel", specialty: "Ayurvedic", phone: "+91 98765 55555", rating: "4.8", bookings: "145", experience: "5", status: "On leave" },
  ]);

  const handleAddTherapist = (newTherapist) => {
    setTherapists([newTherapist, ...therapists]);
  };

  const filterOptions = ["All", "Active", "Inactive", "On leave"];

  const filteredTherapists = therapists.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchText.toLowerCase()) || 
                          t.phone.includes(searchText);
    const matchesFilter = activeFilter === "All" || t.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const headerHeight = height * 0.25;
  const contentHeight = height * 0.75;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gradient2 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} />

      <LinearGradient
        colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]}
        style={{ paddingTop: Platform.OS === "ios" ? sw(50) : sw(40), paddingBottom: sw(56), paddingHorizontal: sw(20) }}
      >
        <TouchableOpacity
          onPress={onBack}
          style={{
            width: sw(40),
            height: sw(40),
            borderRadius: sw(20),
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: sw(12),
          }}
        >
          <ArrowLeft size={sw(22)} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <View style={{
            width: sw(60),
            height: sw(60),
            borderRadius: sw(16),
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: sw(10),
          }}>
            <Users size={sw(32)} color="#FFFFFF" strokeWidth={2.5} />
          </View>
          <Text style={{ 
            fontSize: sw(15), 
            fontWeight: "800", 
            color: "#FFFFFF",
            marginBottom: sw(5),
            textAlign: "center",
          }} numberOfLines={1}>
            Therapist Management
          </Text>
          <Text style={{ fontSize: sw(10), color: "rgba(255,255,255,0.95)", fontWeight: "500", textAlign: "center" }} numberOfLines={1}>
            Manage your staff and therapists
          </Text>
        </View>
      </LinearGradient>

      <View style={{
        height: contentHeight,
        backgroundColor: COLORS.bg,
        borderTopLeftRadius: sw(24),
        borderTopRightRadius: sw(24),
        marginTop: -sw(2),
        paddingTop: sw(16),
      }}>
        {/* Search Bar */}
        <View style={{ paddingHorizontal: sw(16), marginBottom: sw(12) }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: COLORS.border,
            borderRadius: sw(12),
            paddingHorizontal: sw(12),
            paddingVertical: sw(10),
            backgroundColor: COLORS.cardBg,
          }}>
            <Search size={sw(16)} color={COLORS.textLight} strokeWidth={2} />
            <TextInput
              style={{
                flex: 1,
                marginLeft: sw(8),
                fontSize: sw(12),
                color: COLORS.text,
              }}
              placeholder="Search therapists..."
              placeholderTextColor={COLORS.textLight}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={{ paddingHorizontal: sw(16), marginBottom: sw(12) }}>
          <View style={{ flexDirection: "row", gap: sw(8) }}>
            {filterOptions.map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={{
                  paddingHorizontal: sw(14),
                  paddingVertical: sw(8),
                  borderRadius: sw(20),
                  backgroundColor: activeFilter === filter ? COLORS.primary : COLORS.cardBg,
                  borderWidth: activeFilter === filter ? 0 : 1,
                  borderColor: COLORS.border,
                }}
              >
                <Text style={{
                  fontSize: sw(12),
                  fontWeight: "700",
                  color: activeFilter === filter ? "#FFFFFF" : COLORS.text,
                }}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: sw(16), paddingBottom: sw(100) }}
          showsVerticalScrollIndicator={false}
        >
          {/* Add Button */}
          <TouchableOpacity 
            onPress={() => setShowAddModal(true)}
            style={{
              backgroundColor: COLORS.primary,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: sw(12),
              borderRadius: sw(12),
              marginBottom: sw(16),
            }}
          >
            <Plus size={sw(16)} color="#FFFFFF" strokeWidth={2.5} />
            <Text style={{ 
              color: "#FFFFFF", 
              fontSize: sw(12), 
              fontWeight: "700",
              marginLeft: sw(6),
            }}>
              Add New Therapist
            </Text>
          </TouchableOpacity>

          <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(10) }}>
            {activeFilter === "All" ? "All Therapists" : activeFilter} ({filteredTherapists.length})
          </Text>
          
          {filteredTherapists.length > 0 ? (
            filteredTherapists.map((therapist, index) => (
              <TherapistCard key={index} {...therapist} sw={sw} />
            ))
          ) : (
            <View style={{ alignItems: "center", paddingVertical: sw(40) }}>
              <Text style={{ fontSize: sw(12), color: COLORS.textSecondary }}>
                No therapists found
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <AddTherapist 
        visible={showAddModal} 
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddTherapist}
      />
    </View>
  );
}
