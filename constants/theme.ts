/**
 * HAUSHALT Budget App - Modern UI Theme
 * Clean, professional color scheme for financial wellness
 */

import { Platform } from 'react-native';

const tintColorLight = '#0066CC'; // Professional blue
const tintColorDark = '#4A90E2'; // Lighter blue for dark mode

export const Colors = {
  light: {
    text: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    background: '#FFFFFF',
    backgroundSecondary: '#F8F9FA',
    backgroundTertiary: '#F1F3F4',
    tint: tintColorLight,
    icon: '#666666',
    tabIconDefault: '#999999',
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    success: '#10B981',
    successLight: '#D1FAE5',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    expense: '#EF4444',
    income: '#10B981',
    neutral: '#6B7280',
    primary: '#0066CC',
    primaryLight: '#EBF4FF',
    surface: '#FFFFFF',
    surfaceVariant: '#F8F9FA',
    outline: '#D1D5DB',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    text: '#FFFFFF',
    textSecondary: '#A1A1AA',
    textTertiary: '#71717A',
    background: '#0F0F0F',
    backgroundSecondary: '#1A1A1A',
    backgroundTertiary: '#262626',
    tint: tintColorDark,
    icon: '#A1A1AA',
    tabIconDefault: '#71717A',
    tabIconSelected: tintColorDark,
    card: '#1A1A1A',
    border: '#404040',
    borderLight: '#262626',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#78350F',
    error: '#F87171',
    errorLight: '#7F1D1D',
    expense: '#F87171',
    income: '#34D399',
    neutral: '#A1A1AA',
    primary: '#4A90E2',
    primaryLight: '#1E3A8A',
    surface: '#1A1A1A',
    surfaceVariant: '#262626',
    outline: '#404040',
    shadow: 'rgba(0, 0, 0, 0.3)',
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
