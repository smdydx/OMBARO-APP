import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, FileText, Download } from "lucide-react-native";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const COLORS = {
  gradient1: "#00FF87",
  gradient2: "#016B3A",
  gradient3: "#013B1F",
  gradient4: "#012B17",
  primary: "#016B3A",
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

function DocumentCard({ title, date, size, sw }) {
  return (
    <TouchableOpacity style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
      marginBottom: sw(10),
      flexDirection: "row",
      alignItems: "center",
    }} activeOpacity={0.7}>
      <View style={{
        width: sw(40),
        height: sw(40),
        borderRadius: sw(10),
        backgroundColor: `${COLORS.primary}15`,
        alignItems: "center",
        justifyContent: "center",
      }}>
        <FileText size={sw(18)} color={COLORS.primary} strokeWidth={2.5} />
      </View>

      <View style={{ flex: 1, marginLeft: sw(10) }}>
        <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(3) }}>
          {title}
        </Text>
        <Text style={{ fontSize: sw(10), color: COLORS.textSecondary }}>
          {date} • {size}
        </Text>
      </View>

      <TouchableOpacity style={{
        width: sw(32),
        height: sw(32),
        borderRadius: sw(8),
        backgroundColor: `${COLORS.primary}10`,
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Download size={sw(15)} color={COLORS.primary} strokeWidth={2.5} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function HrDocument({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();
  const [tab, setTab] = useState("all");

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

  const documents = [
    { title: "Employment Contract", date: "Jan 15, 2023", size: "2.4 MB" },
    { title: "Payslip - December", date: "Dec 31, 2024", size: "180 KB" },
    { title: "Tax Declaration Form", date: "Nov 20, 2024", size: "450 KB" },
    { title: "Leave Policy 2025", date: "Jan 1, 2025", size: "320 KB" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gradient2 }}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={COLORS.gradient2}
        translucent={false}
      />

      <LinearGradient 
        colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: headerHeight,
          paddingTop: Platform.OS === 'ios' ? sw(50) : sw(20),
          paddingHorizontal: sw(20),
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: sw(20) }}>
          <TouchableOpacity 
            onPress={() => onBack ? onBack() : nav.goBack()} 
            style={{
              width: sw(42),
              height: sw(42),
              borderRadius: sw(21),
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowLeft size={sw(20)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center", marginRight: sw(42),marginTop:sw(50)  }}>
            <Text style={{ color: "#FFFFFF", fontSize: sw(20), fontWeight: "800" }}>HR Documents</Text>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: sw(12), marginTop: sw(2) }}>
              Your Documents
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: sw(14),
            padding: sw(6),
            flexDirection: "row",
            gap: sw(6),
          }}>
            {["All", "Payslips", "Contracts"].map((label) => (
              <TouchableOpacity
                key={label}
                onPress={() => setTab(label.toLowerCase())}
                style={{
                  flex: 1,
                  paddingVertical: sw(10),
                  borderRadius: sw(10),
                  backgroundColor: tab === label.toLowerCase() ? "#FFFFFF" : "transparent",
                  alignItems: "center",
                }}
              >
                <Text style={{
                  color: tab === label.toLowerCase() ? COLORS.primary : "#FFFFFF",
                  fontWeight: "700",
                  fontSize: sw(12),
                }}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </LinearGradient>

      <View style={{ 
        height: contentHeight,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: sw(28),
        borderTopRightRadius: sw(28),
        marginTop: -sw(1),
      }}>
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: sw(18), paddingHorizontal: sw(16), paddingBottom: sw(120) }} 
          showsVerticalScrollIndicator={false}
        >
          {documents.map((doc, index) => (
            <DocumentCard key={index} {...doc} sw={sw} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
