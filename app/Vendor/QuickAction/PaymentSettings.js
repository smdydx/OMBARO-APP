import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, CreditCard, Building2, Wallet, ChevronRight } from "lucide-react-native";
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

function PaymentMethodCard({ icon: Icon, title, subtitle, connected, onToggle, sw }) {
  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(14),
      marginBottom: sw(10),
      flexDirection: "row",
      alignItems: "center",
    }}>
      <View style={{
        width: sw(48),
        height: sw(48),
        borderRadius: sw(12),
        backgroundColor: `${COLORS.primary}10`,
        alignItems: "center",
        justifyContent: "center",
        marginRight: sw(12),
      }}>
        <Icon size={sw(24)} color={COLORS.primary} strokeWidth={2.5} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: sw(14), fontWeight: "700", color: COLORS.text, marginBottom: sw(3) }}>
          {title}
        </Text>
        <Text style={{ fontSize: sw(11), color: COLORS.textSecondary }}>
          {subtitle}
        </Text>
      </View>
      <Switch
        value={connected}
        onValueChange={onToggle}
        trackColor={{ false: "#E5E7EB", true: COLORS.primaryLight }}
        thumbColor={connected ? COLORS.primary : "#F3F4F6"}
      />
    </View>
  );
}

function SettingRow({ label, value, icon: Icon, onPress, sw }) {
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
      {Icon && (
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
      )}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: sw(12), color: COLORS.textLight, marginBottom: sw(2) }}>
          {label}
        </Text>
        <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text }}>
          {value}
        </Text>
      </View>
      <ChevronRight size={sw(18)} color={COLORS.textLight} strokeWidth={2.5} />
    </TouchableOpacity>
  );
}

export default function PaymentSettings({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();

  const [cardPayment, setCardPayment] = useState(true);
  const [upiPayment, setUpiPayment] = useState(true);
  const [walletPayment, setWalletPayment] = useState(false);

  const headerHeight = height * 0.333;
  const contentHeight = height * 0.667;

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
            width: sw(65),
            height: sw(65),
            borderRadius: sw(18),
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: sw(12),
          }}>
            <CreditCard size={sw(32)} color="#FFFFFF" strokeWidth={2.5} />
          </View>
          <Text style={{ 
            fontSize: sw(16), 
            fontWeight: "800", 
            color: "#FFFFFF",
            marginBottom: sw(5),
            textAlign: "center",
          }}>
            Payment Settings
          </Text>
          <Text style={{ fontSize: sw(10), color: "rgba(255,255,255,0.95)", fontWeight: "500", textAlign: "center" }}>
            Manage payment methods and accounts
          </Text>
        </View>
      </LinearGradient>

      <View style={{
        flex: 1,
        backgroundColor: COLORS.bg,
        borderTopLeftRadius: sw(24),
        borderTopRightRadius: sw(24),
        marginTop: 0,
        paddingTop: sw(20),
      }}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: sw(20), paddingBottom: sw(100) }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text, marginBottom: sw(12) }}>
            Payment Methods
          </Text>
          <PaymentMethodCard
            icon={CreditCard}
            title="Card Payments"
            subtitle="Accept credit & debit cards"
            connected={cardPayment}
            onToggle={setCardPayment}
            sw={sw}
          />
          <PaymentMethodCard
            icon={Building2}
            title="UPI Payments"
            subtitle="Accept UPI payments"
            connected={upiPayment}
            onToggle={setUpiPayment}
            sw={sw}
          />
          <PaymentMethodCard
            icon={Wallet}
            title="Digital Wallets"
            subtitle="Accept Paytm, PhonePe, etc."
            connected={walletPayment}
            onToggle={setWalletPayment}
            sw={sw}
          />

          <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.text, marginTop: sw(20), marginBottom: sw(12) }}>
            Bank Account
          </Text>
          <SettingRow
            icon={Building2}
            label="Account Number"
            value="XXXX XXXX 1234"
            onPress={() => {}}
            sw={sw}
          />
          <SettingRow
            icon={Building2}
            label="IFSC Code"
            value="HDFC0001234"
            onPress={() => {}}
            sw={sw}
          />
          <SettingRow
            icon={Building2}
            label="Account Holder"
            value="Ombarc Spa & Wellness"
            onPress={() => {}}
            sw={sw}
          />
        </ScrollView>
      </View>
    </View>
  );
}
