/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#1A1A1A',
    background: '#FFFFFF',
    tint: '#1e3a8a',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#1e3a8a',
    primary: '#1e3a8a',
    cardBg: '#FFFFFF',
    border: '#E5E7EB',
    purple: '#a855f7',
    pink: '#ec4899',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    cream: '#2C2520',
    cardBg: '#1A1A1A',
    border: '#3A3A3A',
    purple: '#a855f7',
    pink: '#ec4899',
  },
};

export const OmbaroTheme = {
  colors: {
    navyBlue: '#1e3a8a',
    navyBlueDark: '#1e40af',
    navyBlueLight: '#3b82f6',
    white: '#FFFFFF',
    darkBg: '#2C2C2C',
    darkCard: '#3A3A3A',
    primary: '#1e3a8a',
    primaryLight: '#3b82f6',
    primaryDark: '#1e40af',
    accent: '#FFFFFF',
    textDark: '#2C2C2C',
    textLight: '#FFFFFF',
    textGray: '#666666',
    border: '#4A4A4A',
    success: '#4CAF50',
    error: '#F44336',
    // Additional named accents referenced in screens
    beige: '#F5F5DC',
    roseGold: '#E6B7A9',
    roseGoldDark: '#C48A78',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
