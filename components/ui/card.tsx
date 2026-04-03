import React from 'react';
import { StyleSheet, View, ViewStyle, } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export function Card({
  children,
  style,
  variant = 'default',
  padding = 'medium'
}: CardProps) {
  const backgroundColor = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const shadow = useThemeColor({}, 'shadow');

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      overflow: 'hidden',
    };

    switch (variant) {
      case 'default':
        return {
          ...baseStyle,
          backgroundColor,
        };
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor,
          borderWidth: 1,
          borderColor: border,
        };
      case 'elevated':
        return {
          ...baseStyle,
          backgroundColor,
          shadowColor: shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        };
      default:
        return baseStyle;
    }
  };

  const getPaddingStyle = (): ViewStyle => {
    switch (padding) {
      case 'none':
        return { padding: 0 };
      case 'small':
        return { padding: 12 };
      case 'medium':
        return { padding: 20 };
      case 'large':
        return { padding: 24 };
      default:
        return { padding: 20 };
    }
  };

  return (
    <View style={[
      styles.card,
      getCardStyle(),
      getPaddingStyle(),
      style,
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
  },
});
