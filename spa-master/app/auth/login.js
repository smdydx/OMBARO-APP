import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native'
import { useSafeNavigation } from '../../hooks/useSafeNavigation'

const LOGIN_ENDPOINT =
    'https://api.gateway.ombaro.com/api/v1/auth/login/email'
const HERO_GRADIENT_COLORS = ['#064e3b', '#047857', '#059669']
const PASSWORD_RULE =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/

const LoginScreen = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [feedback, setFeedback] = useState({ type: null, message: '' })


    const { isNavigating, navigate } = useSafeNavigation()

    const { height: windowHeight, width: windowWidth } = useWindowDimensions()

    const metrics = useMemo(() => {
        const heroHeight = Math.max(320, Math.min(460, windowHeight * 0.55))
        const heroRadius = heroHeight * 0.35
        const portraitSize = Math.min(240, heroHeight * 0.52)
        const cardOffset = Math.min(heroHeight * 0.25, 110)
        const heroPaddingTop = Platform.OS === 'ios' ? 40 : 32
        const horizontalPadding = windowWidth < 360 ? 18 : 26

        return {
            heroHeight,
            heroRadius,
            portraitSize,
            cardOffset,
            heroPaddingTop,
            horizontalPadding,
        }
    }, [windowHeight, windowWidth])

    const handleFeedback = (type, message) => {
        setFeedback({ type, message })
    }

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            handleFeedback('error', 'Please enter both email and password.')
            return
        }

        if (!PASSWORD_RULE.test(password)) {
            handleFeedback(
                'error',
                'Password must be 6+ chars with an uppercase letter, number, and special character.'
            )
            return
        }

        setLoading(true)
        handleFeedback(null, '')

        const payload = {
            email: email.toLowerCase(),
            password,
        }
        console.log(payload)

        try {
            const response = await fetch(LOGIN_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            const data = await response.json().catch(() => ({}))

            console.log(data)


            if (!response.ok || data?.success === false) {
                throw new Error(
                    data?.msg || data?.message || 'Unable to sign in. Please try again.'
                )
            }


            const token = data.data.cookies.accessToken

            if (token) {
                await AsyncStorage.setItem('accessToken', token)
            }

            handleFeedback('success', data.msg)
            navigate('/(tabs)')

        } catch (error) {
            handleFeedback('error', error?.message || 'Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    const isButtonDisabled = loading || !email.trim() || !password.trim()

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#064e3b" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContent,
                        { paddingBottom: Math.max(24, metrics.horizontalPadding) },
                    ]}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.screen}>
                        <LinearGradient
                            colors={HERO_GRADIENT_COLORS}
                            style={[
                                styles.hero,
                                {
                                    height: metrics.heroHeight,
                                    borderBottomLeftRadius: metrics.heroRadius,
                                    borderBottomRightRadius: metrics.heroRadius,
                                    paddingHorizontal: metrics.horizontalPadding,
                                    paddingTop: metrics.heroPaddingTop,
                                },
                            ]}
                        >
                            <Text style={styles.brand}>metime</Text>
                            <Text style={styles.brandSubtitle}>
                                Because your skin deserves the best care.
                            </Text>
                            <Image
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
                                }}
                                style={[
                                    styles.heroImage,
                                    {
                                        width: metrics.portraitSize,
                                        height: metrics.portraitSize,
                                        borderRadius: metrics.portraitSize / 2,
                                        marginTop: metrics.heroHeight * 0.09,
                                    },
                                ]}
                                resizeMode="cover"
                            />
                            <View
                                style={[
                                    styles.heroCurve,
                                    {
                                        borderTopLeftRadius: metrics.heroRadius,
                                        borderTopRightRadius: metrics.heroRadius,
                                        height: metrics.cardOffset + 40,
                                    },
                                ]}
                            />
                        </LinearGradient>

                        <View
                            style={[
                                styles.card,
                                {
                                    marginTop: -metrics.cardOffset,
                                    marginHorizontal: 6,
                                    paddingHorizontal: metrics.horizontalPadding,
                                },
                            ]}
                        >
                            <Text style={styles.title}>Your Skin Journey Starts Here!</Text>
                            <Text style={styles.subtitle}>
                                Log in to access personalized routines and bookings.
                            </Text>

                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="you@example.com"
                                placeholderTextColor="#94a3b8"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                style={styles.input}
                            />

                            <Text style={styles.label}>Password</Text>
                            <View style={styles.passwordWrapper}>
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="********"
                                    placeholderTextColor="#94a3b8"
                                    secureTextEntry={!showPassword}
                                    textContentType="password"
                                    style={[styles.input, styles.passwordInput]}
                                />
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => setShowPassword((prev) => !prev)}
                                    style={styles.toggleVisibility}
                                >
                                    <Text style={styles.toggleText}>
                                        {showPassword ? 'Hide' : 'Show'}
                                    </Text>
                                </TouchableOpacity>
                            </View>


                            {feedback.message ? (
                                <View
                                    style={[
                                        styles.feedback,
                                        feedback.type === 'error' && styles.feedbackError,
                                        feedback.type === 'success' && styles.feedbackSuccess,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.feedbackText,
                                            feedback.type === 'success' && styles.feedbackTextSuccess,
                                        ]}
                                    >
                                        {feedback.message}
                                    </Text>
                                </View>
                            ) : null}

                            <TouchableOpacity
                                onPress={handleLogin}
                                style={styles.button}
                                disabled={isButtonDisabled || isNavigating}
                                activeOpacity={0.9}
                            >
                                <LinearGradient
                                    colors={HERO_GRADIENT_COLORS}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={[
                                        styles.buttonBackground,
                                        isButtonDisabled && styles.buttonDisabled,
                                    ]}
                                >
                                    {loading ? (
                                        <ActivityIndicator color="#ffffff" />
                                    ) : (
                                        <Text style={styles.buttonText}>Sign In</Text>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7}>
                                <Text style={styles.forgotText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        backgroundColor: '#f8fafc',
    },
    screen: {
        flex: 1,
    },
    hero: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    brand: {
        fontSize: 36,
        fontWeight: '800',
        color: '#ffffff',
        letterSpacing: 1,
    },
    brandSubtitle: {
        fontSize: 16,
        color: '#bbf7d0',
        textAlign: 'center',
        marginTop: 8,
    },
    heroImage: {
        borderWidth: 5,
        borderColor: '#ecfdf5',
    },
    heroCurve: {
        position: 'absolute',
        bottom: -40,
        left: -20,
        right: -20,
        backgroundColor: '#f8fafc',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 32,
        paddingVertical: 26,
        shadowColor: '#047857',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.25,
        shadowRadius: 30,
        elevation: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1f2937',
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 6,
        fontSize: 14,
        color: '#475569',
        textAlign: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f172a',
        marginTop: 18,
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 20,
        paddingHorizontal: 18,
        paddingVertical: 14,
        fontSize: 16,
        color: '#0f172a',
        backgroundColor: '#f8fafc',
        shadowColor: '#e5e7eb',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 3,
    },
    passwordWrapper: {
        position: 'relative',
    },
    passwordInput: {
        paddingRight: 70,
    },
    toggleVisibility: {
        position: 'absolute',
        right: 12,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    toggleText: {
        color: '#047857',
        fontWeight: '600',
    },
    feedback: {
        marginTop: 20,
        borderRadius: 16,
        padding: 12,
        backgroundColor: '#e2e8f0',
    },
    feedbackError: {
        backgroundColor: '#fee2e2',
    },
    feedbackSuccess: {
        backgroundColor: '#dcfce7',
    },
    feedbackText: {
        color: '#1e293b',
        fontSize: 14,
    },
    feedbackTextSuccess: {
        color: '#166534',
    },
    button: {
        marginTop: 26,
        borderRadius: 22,
        overflow: 'hidden',
    },
    buttonBackground: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    forgotText: {
        marginTop: 18,
        textAlign: 'center',
        color: '#2563eb',
        fontSize: 15,
        fontWeight: '600',
    },
})

export default LoginScreen
