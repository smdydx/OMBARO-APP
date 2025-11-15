
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
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions,
    Animated,
} from 'react-native'
import { useSafeNavigation } from '../../hooks/useSafeNavigation'
import { Eye, EyeOff, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react-native'

const LOGIN_ENDPOINT = 'https://api.gateway.ombaro.com/api/v1/auth/login/email'
const HERO_GRADIENT_COLORS = ['#013B1F', '#016B3A', '#02945A']
const PASSWORD_RULE = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/
const EMAIL_RULE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LoginScreen = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [feedback, setFeedback] = useState({ type: null, message: '' })
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [emailFocused, setEmailFocused] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)

    const { isNavigating, navigate } = useSafeNavigation()
    const { height: windowHeight, width: windowWidth } = useWindowDimensions()

    const metrics = useMemo(() => {
        const isSmall = windowHeight < 700
        const heroHeight = isSmall ? windowHeight * 0.32 : windowHeight * 0.35
        const logoSize = isSmall ? 90 : 100
        const inputHeight = isSmall ? 56 : 60
        const buttonHeight = isSmall ? 56 : 60
        const spacing = isSmall ? 16 : 20
        const fontSize = {
            brand: isSmall ? 38 : 44,
            title: isSmall ? 28 : 32,
            subtitle: isSmall ? 14 : 15,
            label: isSmall ? 13 : 14,
            input: isSmall ? 15 : 16,
            button: isSmall ? 16 : 17,
            helper: isSmall ? 12 : 13,
        }

        return {
            heroHeight,
            logoSize,
            inputHeight,
            buttonHeight,
            spacing,
            fontSize,
        }
    }, [windowHeight])

    const handleFeedback = (type, message) => {
        setFeedback({ type, message })
    }

    const validateEmail = (text) => {
        setEmail(text)
        if (text.trim() === '') {
            setEmailError('')
        } else if (!EMAIL_RULE.test(text)) {
            setEmailError('Please enter a valid email address')
        } else {
            setEmailError('')
        }
    }

    const validatePassword = (text) => {
        setPassword(text)
        if (text.trim() === '') {
            setPasswordError('')
        } else if (!PASSWORD_RULE.test(text)) {
            setPasswordError('Password must be 6+ chars with uppercase, number & special char')
        } else {
            setPasswordError('')
        }
    }

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            handleFeedback('error', 'Please enter both email and password.')
            return
        }

        if (!EMAIL_RULE.test(email)) {
            handleFeedback('error', 'Please enter a valid email address.')
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

        try {
            const response = await fetch(LOGIN_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            const data = await response.json().catch(() => ({}))

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

    const isButtonDisabled = loading || !email.trim() || !password.trim() || emailError || passwordError

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#013B1F" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <View style={styles.container}>
                    {/* Hero Section with Animated Background */}
                    <LinearGradient
                        colors={HERO_GRADIENT_COLORS}
                        style={[styles.hero, { height: metrics.heroHeight }]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View style={styles.decorativeCircle1} />
                        <View style={styles.decorativeCircle2} />

                        <View style={styles.logoCircle}>
                            <Image
                                source={require('../../assets/Spa/logo.png')}
                                style={[styles.logo, { width: metrics.logoSize * 0.9, height: metrics.logoSize * 0.9 }]}
                                resizeMode="contain"
                            />
                        </View>
                    
                        <Text style={[styles.brandTagline, { fontSize: metrics.fontSize.subtitle }]}>
                            Your Wellness Journey Begins Here
                        </Text>
                    </LinearGradient>

                    {/* Form Section */}
                    <View style={[styles.formContainer, { paddingVertical: metrics.spacing * 1.5 }]}>
                        <View style={styles.titleContainer}>
                            <Text style={[styles.title, { fontSize: metrics.fontSize.title }]}>
                                Welcome Back
                            </Text>
                            <Text style={[styles.subtitle, { fontSize: metrics.fontSize.subtitle }]}>
                                Sign in to continue your spa experience
                            </Text>
                        </View>

                        {/* Email Input with Validation */}
                        <View style={[styles.inputGroup, { marginBottom: metrics.spacing }]}>
                            <Text style={[styles.label, { fontSize: metrics.fontSize.label }]}>Email Address</Text>
                            <View style={[
                                styles.inputWrapper,
                                { height: metrics.inputHeight },
                                emailFocused && styles.inputWrapperFocused,
                                emailError && styles.inputWrapperError
                            ]}>
                                <Mail
                                    size={20}
                                    color={emailError ? '#EF4444' : emailFocused ? '#016B3A' : '#94A3B8'}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    value={email}
                                    onChangeText={validateEmail}
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => setEmailFocused(false)}
                                    placeholder="you@example.com"
                                    placeholderTextColor="#94a3b8"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    textContentType="emailAddress"
                                    style={[
                                        styles.input,
                                        { fontSize: metrics.fontSize.input }
                                    ]}
                                />
                                {email.trim() !== '' && !emailError && (
                                    <CheckCircle size={20} color="#10B981" style={styles.validIcon} />
                                )}
                            </View>
                            {emailError ? (
                                <View style={styles.errorContainer}>
                                    <AlertCircle size={14} color="#EF4444" />
                                    <Text style={[styles.errorText, { fontSize: metrics.fontSize.helper }]}>
                                        {emailError}
                                    </Text>
                                </View>
                            ) : null}
                        </View>

                        {/* Password Input with Toggle */}
                        <View style={[styles.inputGroup, { marginBottom: metrics.spacing * 0.8 }]}>
                            <Text style={[styles.label, { fontSize: metrics.fontSize.label }]}>Password</Text>
                            <View style={[
                                styles.inputWrapper,
                                { height: metrics.inputHeight },
                                passwordFocused && styles.inputWrapperFocused,
                                passwordError && styles.inputWrapperError
                            ]}>
                                <Lock
                                    size={20}
                                    color={passwordError ? '#EF4444' : passwordFocused ? '#016B3A' : '#94A3B8'}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    value={password}
                                    onChangeText={validatePassword}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#94a3b8"
                                    secureTextEntry={!showPassword}
                                    textContentType="password"
                                    style={[
                                        styles.input,
                                        styles.passwordInput,
                                        { fontSize: metrics.fontSize.input }
                                    ]}
                                />
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => setShowPassword((prev) => !prev)}
                                    style={styles.toggleVisibility}
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} color="#64748B" />
                                    ) : (
                                        <Eye size={20} color="#64748B" />
                                    )}
                                </TouchableOpacity>
                            </View>
                            {passwordError ? (
                                <View style={styles.errorContainer}>
                                    <AlertCircle size={14} color="#EF4444" />
                                    <Text style={[styles.errorText, { fontSize: metrics.fontSize.helper }]}>
                                        {passwordError}
                                    </Text>
                                </View>
                            ) : null}
                        </View>

                        <TouchableOpacity activeOpacity={0.7} style={{ marginBottom: metrics.spacing }}>
                            <Text style={[styles.forgotText, { fontSize: metrics.fontSize.label }]}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>

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
                                        { fontSize: metrics.fontSize.label },
                                        feedback.type === 'success' && styles.feedbackTextSuccess,
                                    ]}
                                >
                                    {feedback.message}
                                </Text>
                            </View>
                        ) : null}

                        <TouchableOpacity
                            onPress={handleLogin}
                            style={[styles.button, { height: metrics.buttonHeight }]}
                            disabled={isButtonDisabled || isNavigating}
                            activeOpacity={0.9}
                        >
                            <LinearGradient
                                colors={isButtonDisabled ? ['#94A3B8', '#94A3B8'] : HERO_GRADIENT_COLORS}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.buttonBackground}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#ffffff" />
                                ) : (
                                    <Text style={[styles.buttonText, { fontSize: metrics.fontSize.button }]}>
                                        Sign In Securely
                                    </Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>




                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFB',
    },
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#F8FAFB',
    },
    hero: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    decorativeCircle1: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 255, 135, 0.1)',
        top: -50,
        right: -50,
    },
    decorativeCircle2: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(0, 255, 135, 0.08)',
        bottom: 20,
        left: -30,
    },
    logoCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#ffffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#00FF87',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 15,
        borderWidth: 3,
        borderColor: '#00FF87',
    },
    logo: {
        width: 70,        // <--- Set size smaller than parent
        height: 70,
        borderRadius: 30, // <--- makes perfect circle
        resizeMode: 'contain',
    },
    brand: {
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 6,
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    brandTagline: {
        fontWeight: '600',
        color: '#00FF87',
        letterSpacing: 0.5,
        marginBottom: 0,
        textAlign: 'center',
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#016B3A',
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        elevation: 12,
    },
    titleContainer: {
        marginBottom: 24,
        marginTop: 8,
    },
    title: {
        fontWeight: '900',
        color: '#013B1F',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontWeight: '500',
        color: '#64748B',
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontWeight: '700',
        color: '#013B1F',
        marginBottom: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderRadius: 16,
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 16,
        shadowColor: '#016B3A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    inputWrapperFocused: {
        borderColor: '#016B3A',
        backgroundColor: '#FFFFFF',
        shadowColor: '#016B3A',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    inputWrapperError: {
        borderColor: '#EF4444',
        backgroundColor: '#FEF2F2',
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: '#0F172A',
        fontWeight: '500',
    },
    passwordInput: {
        paddingRight: 0,
    },
    validIcon: {
        marginLeft: 8,
    },
    toggleVisibility: {
        padding: 8,
        marginLeft: 8,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        paddingLeft: 4,
    },
    errorText: {
        color: '#EF4444',
        fontWeight: '600',
        marginLeft: 6,
    },
    feedback: {
        marginBottom: 16,
        borderRadius: 14,
        padding: 14,
        backgroundColor: '#E2E8F0',
        shadowColor: '#016B3A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    feedbackError: {
        backgroundColor: '#FEE2E2',
    },
    feedbackSuccess: {
        backgroundColor: '#DCFCE7',
    },
    feedbackText: {
        color: '#1E293B',
        fontWeight: '600',
        textAlign: 'center',
    },
    feedbackTextSuccess: {
        color: '#166534',
    },
    button: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#016B3A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 10,
        marginBottom: 20,
    },
    buttonBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '900',
        letterSpacing: 1.5,
    },
    forgotText: {
        textAlign: 'right',
        color: '#016B3A',
        fontWeight: '700',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#64748B',
        fontWeight: '600',
    },
    signupButton: {
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#016B3A',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    signupButtonText: {
        color: '#016B3A',
        fontWeight: '800',
        letterSpacing: 1,
    },
})

export default LoginScreen
