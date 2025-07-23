/**
 * @fileoverview Componente Input reutilizável para o DOM v2
 * @description Campo de entrada padronizado com validação e diferentes tipos
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-22
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps
} from 'react-native';
import { getMessage, MessageType } from '../../utils/messages';
import { getValue } from '../../utils/config';

// Tipos de input
export enum InputType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  NUMBER = 'number',
  PHONE = 'phone',
  CPF = 'cpf',
  CNPJ = 'cnpj',
  CEP = 'cep',
  DATE = 'date',
  TIME = 'time',
  SEARCH = 'search',
  TEXTAREA = 'textarea'
}

// Estados do input
export enum InputState {
  DEFAULT = 'default',
  FOCUSED = 'focused',
  ERROR = 'error',
  SUCCESS = 'success',
  DISABLED = 'disabled'
}

// Tamanhos do input
export enum InputSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

// Interface do componente
export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  type?: InputType;
  size?: InputSize;
  state?: InputState;
  error?: string;
  success?: string;
  helper?: string;
  required?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  successStyle?: TextStyle;
  helperStyle?: TextStyle;
  testID?: string;
}

// Cores dos estados
const stateColors = {
  [InputState.DEFAULT]: {
    border: '#E1E5E9',
    background: '#FFFFFF',
    text: '#212529',
    label: '#6C757D'
  },
  [InputState.FOCUSED]: {
    border: '#007AFF',
    background: '#FFFFFF',
    text: '#212529',
    label: '#007AFF'
  },
  [InputState.ERROR]: {
    border: '#DC3545',
    background: '#FFFFFF',
    text: '#212529',
    label: '#DC3545'
  },
  [InputState.SUCCESS]: {
    border: '#28A745',
    background: '#FFFFFF',
    text: '#212529',
    label: '#28A745'
  },
  [InputState.DISABLED]: {
    border: '#E1E5E9',
    background: '#F8F9FA',
    text: '#6C757D',
    label: '#6C757D'
  }
};

// Tamanhos do input
const inputSizes = {
  [InputSize.SMALL]: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    borderRadius: 4,
    minHeight: 36
  },
  [InputSize.MEDIUM]: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderRadius: 6,
    minHeight: 44
  },
  [InputSize.LARGE]: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 18,
    borderRadius: 8,
    minHeight: 52
  }
};

// Componente Input
export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = InputType.TEXT,
  size = InputSize.MEDIUM,
  state = InputState.DEFAULT,
  error,
  success,
  helper,
  required = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  successStyle,
  helperStyle,
  testID,
  value,
  onChangeText,
  onFocus,
  onBlur,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  multiline,
  numberOfLines,
  maxLength,
  editable,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const colors = stateColors[state === InputState.DEFAULT && isFocused ? InputState.FOCUSED : state];
  const sizes = inputSizes[size];
  const animationDuration = getValue('ui.animation.duration') || 300;

  // Configurar propriedades baseadas no tipo
  const getInputProps = () => {
    const props: TextInputProps = {
      secureTextEntry: type === InputType.PASSWORD || secureTextEntry,
      keyboardType: getKeyboardType(type, keyboardType),
      autoCapitalize: getAutoCapitalize(type, autoCapitalize),
      autoCorrect: type === InputType.EMAIL ? false : autoCorrect,
      multiline: type === InputType.TEXTAREA || multiline,
      numberOfLines: type === InputType.TEXTAREA ? 4 : numberOfLines,
      maxLength: getMaxLength(type, maxLength)
    };
    return props;
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const containerStyleFinal: ViewStyle = {
    width: fullWidth ? '100%' : 'auto',
    marginBottom: 16,
    ...containerStyle
  };

  const inputContainerStyle: ViewStyle = {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    borderRadius: sizes.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: sizes.minHeight,
    paddingHorizontal: sizes.paddingHorizontal,
    opacity: state === InputState.DISABLED ? 0.6 : 1
  };

  const inputStyleFinal: TextStyle = {
    flex: 1,
    fontSize: sizes.fontSize,
    color: colors.text,
    paddingVertical: sizes.paddingVertical,
    paddingHorizontal: leftIcon || rightIcon ? 8 : 0,
    textAlignVertical: type === InputType.TEXTAREA ? 'top' : 'center',
    ...inputStyle
  };

  const labelStyleFinal: TextStyle = {
    fontSize: sizes.fontSize - 2,
    color: colors.label,
    marginBottom: 4,
    fontWeight: '500',
    ...labelStyle
  };

  const errorStyleFinal: TextStyle = {
    fontSize: 12,
    color: '#DC3545',
    marginTop: 4,
    fontWeight: '400',
    ...errorStyle
  };

  const successStyleFinal: TextStyle = {
    fontSize: 12,
    color: '#28A745',
    marginTop: 4,
    fontWeight: '400',
    ...successStyle
  };

  const helperStyleFinal: TextStyle = {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 4,
    fontWeight: '400',
    ...helperStyle
  };

  return (
    <View style={containerStyleFinal} testID={testID}>
      {label && (
        <Text style={labelStyleFinal}>
          {label}
          {required && <Text style={{ color: '#DC3545' }}> *</Text>}
        </Text>
      )}
      
      <View style={inputContainerStyle}>
        {leftIcon && (
          <View style={styles.iconContainer}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={inputStyleFinal}
          placeholder={placeholder}
          placeholderTextColor="#6C757D"
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={state !== InputState.DISABLED && editable !== false}
          {...getInputProps()}
          {...rest}
        />
        
        {rightIcon && (
          <View style={styles.iconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {error && (
        <Text style={errorStyleFinal}>
          {error}
        </Text>
      )}
      
      {success && !error && (
        <Text style={successStyleFinal}>
          {success}
        </Text>
      )}
      
      {helper && !error && !success && (
        <Text style={helperStyleFinal}>
          {helper}
        </Text>
      )}
    </View>
  );
};

// Funções utilitárias
const getKeyboardType = (type: InputType, keyboardType?: any) => {
  if (keyboardType) return keyboardType;
  
  switch (type) {
    case InputType.EMAIL:
      return 'email-address';
    case InputType.NUMBER:
      return 'numeric';
    case InputType.PHONE:
      return 'phone-pad';
    case InputType.CPF:
    case InputType.CNPJ:
    case InputType.CEP:
      return 'numeric';
    default:
      return 'default';
  }
};

const getAutoCapitalize = (type: InputType, autoCapitalize?: any) => {
  if (autoCapitalize) return autoCapitalize;
  
  switch (type) {
    case InputType.EMAIL:
    case InputType.PASSWORD:
    case InputType.CPF:
    case InputType.CNPJ:
    case InputType.CEP:
      return 'none';
    default:
      return 'sentences';
  }
};

const getMaxLength = (type: InputType, maxLength?: number) => {
  if (maxLength) return maxLength;
  
  switch (type) {
    case InputType.CPF:
      return 14; // 000.000.000-00
    case InputType.CNPJ:
      return 18; // 00.000.000/0000-00
    case InputType.CEP:
      return 9; // 00000-000
    case InputType.PHONE:
      return 15; // (00) 00000-0000
    default:
      return undefined;
  }
};

// Estilos
const styles = StyleSheet.create({
  iconContainer: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Input; 