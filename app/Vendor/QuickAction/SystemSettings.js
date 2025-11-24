import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Settings, Bell, Lock, Globe, Moon, ChevronRight } from "lucide-react-native";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Switch,
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

function SettingToggleRow({ icon: Icon, title, subtitle, value, onToggle, sw }) {
  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(14),
      marginBottom: sw(10),
    }}>
      <View style={{
        width: sw(40),
        height: sw(40),
        borderRadius: sw(10),
        backgroundColor: `${COLORS.primary}10`,
        alignItems: "center",
        justifyContent: "center",
        marginRight: sw(12),
      }}>
        <Icon size={sw(18)} color={COLORS.primary} strokeWidth={2.5} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(2) }}>
          {title}
        </Text>
        <Text style={{ fontSize: sw(10), color: COLORS.textSecondary }}>
          {subtitle}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#E5E7EB", true: COLORS.primaryLight }}
        thumbColor={value ? COLORS.primary : "#F3F4F6"}
      />
    </View>
  );
}

function SettingNavRow({ icon: Icon, title, subtitle, onPress, sw }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.cardBg,
        borderRadius: sw(12),
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: sw(14),
        marginBottom: sw(10),
      }}
      activeOpacity={0.7}
    >
      <View style={{
        width: sw(40),
        height: sw(40),
        borderRadius: sw(10),
        backgroundColor: `${COLORS.primary}10`,
        alignItems: "center",
        justifyContent: "center",
        marginRight: sw(12),
      }}>
        <Icon size={sw(18)} color={COLORS.primary} strokeWidth={2.5} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(2) }}>
          {title}
        </Text>
        {subtitle && (
          <Text style={{ fontSize: sw(10), color: COLORS.textSecondary }}>
            {subtitle}
          </Text>
        )}
      </View>
      <ChevronRight size={sw(18)} color={COLORS.textLight} strokeWidth={2.5} />
    </TouchableOpacity>
  );
}

export default function SystemSettings({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gradient2 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.gradient2} />

      <LinearGradient
        colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]}
        style={{ height: headerHeight }}
      >
        <View style={{ 
          paddingTop: Platform.OS === "ios" ? sw(50) : sw(40), 
          paddingHorizontal: sw(20),
          flex: 1,
        }}>
          <TouchableOpacity
            onPress={onBack}
            style={{
              width: sw(40),
              height: sw(40),
              borderRadius: sw(20),
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: sw(20),
            }}
          >
            <ArrowLeft size={sw(22)} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={{
              width: sw(80),
              height: sw(80),
              borderRadius: sw(20),
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: sw(15),
            }}>
              <Settings size={sw(40)} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <Text style={{ 
              fontSize: sw(26), 
              fontWeight: "800", 
              color: "#FFFFFF",
              marginBottom: sw(8),
            }}>
              System Settings
            </Text>
            <Text style={{ fontSize: sw(13), color: "rgba(255,255,255,0.9)", fontWeight: "500" }}>
              Configure your app settings
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={{
        height: contentHeight,
        backgroundColor: COLORS.bg,
        borderTopLeftRadius: sw(24),
        borderTopRightRadius: sw(24),
        marginTop: -sw(20),
        paddingTop: sw(20),
      }}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: sw(20), paddingBottom: sw(100) }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text, marginBottom: sw(12) }}>
            General
          </Text>
          <SettingToggleRow
            icon={Bell}
            title="Push Notifications"
            subtitle="Receive booking and payment alerts"
            value={notifications}
            onToggle={setNotifications}
            sw={sw}
          />
          <SettingToggleRow
            icon={Moon}
            title="Dark Mode"
            subtitle="Switch to dark theme"
            value={darkMode}
            onToggle={setDarkMode}
            sw={sw}
          />

          <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text, marginTop: sw(20), marginBottom: sw(12) }}>
            Account
          </Text>
          <SettingNavRow
            icon={Lock}
            title="Privacy & Security"
            subtitle="Manage your account security"
            onPress={() => {}}
            sw={sw}
          />
          <SettingNavRow
            icon={Globe}
            title="Language & Region"
            subtitle="English (India)"
            onPress={() => {}}
            sw={sw}
          />

          <TouchableOpacity style={{
            backgroundColor: "#FEE2E2",
            borderRadius: sw(12),
            padding: sw(16),
            alignItems: "center",
            marginTop: sw(20),
          }}>
            <Text style={{ fontSize: sw(14), fontWeight: "700", color: "#DC2626" }}>
              Logout
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
