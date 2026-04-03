import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle, ActivityIndicator, View } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon
}: ButtonProps) {
  const backgroundColor = useThemeColor({}, 'primary');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const border = useThemeColor({}, 'border');
  const backgroundSecondary = useThemeColor({}, 'backgroundSecondary');

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? '#ccc' : backgroundColor,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: backgroundSecondary,
          borderWidth: 1,
          borderColor: disabled ? '#ccc' : backgroundColor,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? '#ccc' : backgroundColor,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: disabled ? '#ccc' : backgroundColor,
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: '600',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          color: '#ffffff',
        };
      case 'secondary':
      case 'outline':
        return {
          ...baseStyle,
          color: disabled ? '#ccc' : backgroundColor,
        };
      case 'ghost':
        return {
          ...baseStyle,
          color: disabled ? '#ccc' : backgroundColor,
        };
      default:
        return {
          ...baseStyle,
          color: '#ffffff',
        };
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: 16,
          paddingVertical: 8,
          minHeight: 36,
        };
      case 'medium':
        return {
          paddingHorizontal: 24,
          paddingVertical: 12,
          minHeight: 44,
        };
      case 'large':
        return {
          paddingHorizontal: 32,
          paddingVertical: 16,
          minHeight: 52,
        };
      default:
        return {
          paddingHorizontal: 24,
          paddingVertical: 12,
          minHeight: 44,
        };
    }
  };

  const getTextSize = (): TextStyle => {
    switch (size) {
      case 'small':
        return { fontSize: 14 };
      case 'medium':
        return { fontSize: 16 };
      case 'large':
        return { fontSize: 18 };
      default:
        return { fontSize: 16 };
    }
  };

  const textStyles = [
    styles.text,
    getTextStyle(),
    getTextSize(),
    textStyle
  ];
  
  if (icon) {
    textStyles.push({ marginLeft: 8 });
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getSizeStyle(),
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? '#ffffff' : backgroundColor} 
        />
      ) : (
        <>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={textStyles}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
  },
  text: {
    textAlign: 'center',
  },
  textWithIcon: {
    marginLeft: 8,
  },
  icon: {
    marginRight: 4,
  },
});
