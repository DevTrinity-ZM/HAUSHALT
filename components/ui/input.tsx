import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  ...textInputProps
}: InputProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const errorColor = useThemeColor({}, 'error');

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: text }]}>{label}</Text>
      )}
      
      <View style={styles.inputContainer}>
        {leftIcon && (
          <View style={styles.iconContainer}>{leftIcon}</View>
        )}
        
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor,
              borderColor: error ? errorColor : border,
              color: text,
              paddingLeft: leftIcon ? 48 : 16,
              paddingRight: rightIcon ? 48 : 16,
            },
            style,
          ]}
          placeholderTextColor={textSecondary}
          {...textInputProps}
        />
        
        {rightIcon && (
          <View style={styles.rightIconContainer}>{rightIcon}</View>
        )}
      </View>
      
      {error && (
        <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    height: 48,
    paddingVertical: 12,
  },
  iconContainer: {
    position: 'absolute',
    left: 16,
    top: 12,
    zIndex: 1,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 16,
    top: 12,
    zIndex: 1,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
});
