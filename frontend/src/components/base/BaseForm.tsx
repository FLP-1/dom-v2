/**
 * @created 2025-01-23
 * @lastModified 2025-01-23
 * @author DOM Team v2
 */

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../../styles/design-tokens';
import { getMessage } from '../../utils/messages-centralized';

interface FormField {
  name: string;
  label: string;
  required?: boolean;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date' | 'select' | 'textarea';
  placeholder?: string;
  value: any;
  error?: string;
  options?: Array<{ label: string; value: any }>;
  validation?: (value: any) => string | null;
}

interface BaseFormProps {
  title?: string;
  subtitle?: string;
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  showCancel?: boolean;
  validateOnSubmit?: boolean;
  showFieldErrors?: boolean;
  layout?: 'vertical' | 'horizontal' | 'grid';
  maxWidth?: number;
}

/**
 */
export const BaseForm: React.FC<BaseFormProps> = ({
  title,
  subtitle,
  fields,
  onSubmit,
  onCancel,
  submitText = getMessage('form.submit'),
  cancelText = getMessage('form.cancel'),
  loading = false,
  showCancel = true,
  validateOnSubmit = true,
  showFieldErrors = true,
  layout = 'vertical',
  maxWidth
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initialData: Record<string, any> = {};
    fields.forEach(field => {
      initialData[field.name] = field.value || '';
    });
    return initialData;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  /**
   * Atualiza o valor de um campo
   */
  const handleFieldChange = useCallback((name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Marca campo como tocado
    if (!touched[name]) {
      setTouched(prev => ({ ...prev, [name]: true }));
    }
  }, [errors, touched]);

  /**
   */
  const validateField = useCallback((field: FormField, value: any): string | null => {
    if (field.required && (!value || value.toString().trim() === '')) {
      return getMessage('validation.required');
    }

    if (field.validation) {
      return field.validation(value);
    }

    switch (field.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          return getMessage('validation.email.invalid');
        }
        break;
      
      case 'password':
        if (value && value.length < 8) {
          return getMessage('validation.password.weak');
        }
        break;
      
      case 'tel':
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (value && !phoneRegex.test(value.replace(/\D/g, ''))) {
          return getMessage('validation.phone.invalid');
        }
        break;
    }

    return null;
  }, []);

  /**
   * Valida todos os campos
   */
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fields, formData, validateField]);

  /**
   */
  const handleSubmit = useCallback(async () => {
    if (validateOnSubmit && !validateForm()) {
      Alert.alert(
        getMessage('form.validation.error.title'),
        getMessage('form.validation.error.message')
      );
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      Alert.alert(
        getMessage('form.submit.error.title'),
        getMessage('form.submit.error.message')
      );
    }
  }, [formData, onSubmit, validateForm, validateOnSubmit]);

  /**
   */
  const renderField = (field: FormField) => {
    const fieldError = errors[field.name];
    const isTouched = touched[field.name];
    const showError = showFieldErrors && isTouched && fieldError;

    return (
      <View key={field.name} style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>
          {field.label}
          {field.required && <Text style={styles.required}> *</Text>}
        </Text>
        
        <View style={[
          styles.fieldInput,
          showError && styles.fieldInputError
        ]}>
          <Text style={styles.fieldPlaceholder}>
            {field.placeholder || `Digite ${field.label.toLowerCase()}`}
          </Text>
        </View>
        
        {showError && (
          <Text style={styles.fieldError}>{fieldError}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, maxWidth && { maxWidth }]}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <View style={[
          styles.fieldsContainer,
          layout === 'horizontal' && styles.fieldsHorizontal,
          layout === 'grid' && styles.fieldsGrid
        ]}>
          {fields.map(renderField)}
        </View>
      </ScrollView>

      <View style={styles.actions}>
        {showCancel && onCancel && (
          <View style={styles.cancelButton}>
            <Text style={styles.cancelButtonText} onPress={onCancel}>
              {cancelText}
            </Text>
          </View>
        )}
        
        <View style={styles.submitButton}>
          <Text 
            style={[
              styles.submitButtonText,
              loading && styles.submitButtonDisabled
            ]} 
            onPress={loading ? undefined : handleSubmit}
          >
            {loading ? getMessage('system.loading') : submitText}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.lg,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  title: {
    ...Typography.h4,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
  },
  formContainer: {
    maxHeight: 400,
  },
  fieldsContainer: {
    padding: Spacing.lg,
  },
  fieldsHorizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  fieldsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  fieldContainer: {
    marginBottom: Spacing.md,
    flex: 1,
    minWidth: 200,
  },
  fieldLabel: {
    ...Typography.bodySmall,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
    fontWeight: '600',
  },
  required: {
    color: Colors.error,
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: Colors.border.medium,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    backgroundColor: Colors.background.primary,
    minHeight: 48,
    justifyContent: 'center',
  },
  fieldInputError: {
    borderColor: Colors.error,
  },
  fieldPlaceholder: {
    ...Typography.body,
    color: Colors.text.tertiary,
  },
  fieldError: {
    ...Typography.caption,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    gap: Spacing.md,
  },
  cancelButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border.medium,
    alignItems: 'center',
  },
  cancelButtonText: {
    ...Typography.button,
    color: Colors.text.secondary,
  },
  submitButton: {
    flex: 2,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  submitButtonText: {
    ...Typography.button,
    color: Colors.text.inverse,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
});

export default BaseForm;