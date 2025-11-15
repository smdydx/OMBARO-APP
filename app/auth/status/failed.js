import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const EmailVerifyFailed = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
      }}
    >
      {/* ❌ Error Icon */}
      <View
        style={{
          backgroundColor: "#ffe5e5",
          padding: 20,
          borderRadius: 100,
          marginBottom: 20,
        }}
      >
        <MaterialIcons name="error-outline" size={60} color="#ff4d4d" />
      </View>

      {/* Title */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: "#ff4d4d",
          marginBottom: 10,
        }}
      >
        Verification Failed
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "#666",
          marginBottom: 30,
          lineHeight: 22,
        }}
      >
        We couldn't verify your email.  
        The verification link may be expired or invalid.
      </Text>

      {/* Retry Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          backgroundColor: "#ff4d4d",
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 8,
          marginBottom: 15,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
          Try Again
        </Text>
      </TouchableOpacity>

      {/* Home Link */}
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Text style={{ color: "#333", fontSize: 15, marginTop: 5 }}>
          Back to Home →
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailVerifyFailed;
