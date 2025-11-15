import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function VerifyRedirect() {
  const router = useRouter();
  const { token } = useLocalSearchParams();

  useEffect(() => {
    console.log("🔄 Email verification redirect triggered with token:", token);

    if (token) {
      // Call the verification API directly and navigate to phone-register
      verifyEmailToken(token);
    } else {
      // No token, go back to phone registration
      router.replace("/auth/phone-register");
    }
  }, [token, router]);

  const verifyEmailToken = async (emailToken) => {
    try {
      const response = await fetch('https://api.gateway.ombaro.com/api/v1/auth/verify/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: emailToken }),
      });

      const result = await response.json();
      console.log("Email verification API response:", result);

      console.log(result.success)

      if (result.success) {
        // Store the token
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        await AsyncStorage.setItem('accessToken', result.data.cookies.accessToken);
        console.log("✅ Email verified successfully");
        // Navigate to success screen
        router.replace("/auth/status/success");
      } else {
        console.log("❌ Email verification failed:", result.msg);
        // Navigate to failure screen
        router.replace("/auth/status/failed");
      }
    } catch (error) {
      console.error("Email verification error:", error);
      // Navigate to failure screen on error
      router.replace("/auth/status/failed");
    }
  };

  return (
    <LinearGradient
      colors={["#064e3b", "#047857", "#059669"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.text}>Verifying your email...</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
