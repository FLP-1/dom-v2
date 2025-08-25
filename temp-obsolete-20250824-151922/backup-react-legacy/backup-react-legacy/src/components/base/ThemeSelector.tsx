/**
 * @fileoverview ThemeSelector - Componente para seleção de temas
 * @version 2.0.0
 * @generated 2025-01-27T11:25:00.000Z
 */

import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { BaseComponentProps, AccessibilityProps } from './types/ComponentProps';
import { useThemeManager, ThemeName, ThemeConfig } from './utils/themeManager';
import { BaseCard } from './BaseCard';
import  from './BaseButton';

export interface ThemeSelectorProps extends BaseComponentProps, AccessibilityProps {
  showSystemOption?: boolean;
  showCustomThemeButton?: boolean;
  onCustomThemePress?: () => void;
  compact?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  showSystemOption = true,
  showCustomThemeButton = true,
  onCustomThemePress,
  compact = false,
  style,
  ...props
}) => {
  const {
    currentTheme,
    themeName,
    availableThemes,
    setTheme,
    isSystemTheme,
    resetToSystemTheme,
    isTransitioning,
  } = useThemeManager();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleThemeSelect = async (selectedThemeName: ThemeName) => {
    await setTheme(selectedThemeName);
    if (!compact) {
      setIsModalVisible(false);
    }
  };

  const handleSystemThemeSelect = () => {
    resetToSystemTheme();
    if (!compact) {
      setIsModalVisible(false);
    }
  };

  const renderThemeOption = (theme: ThemeConfig, isSelected: boolean) => {
    const isAccessibilityTheme = theme.category === 'accessibility';
    
    return (
      <TouchableOpacity
        key={theme.name}
        style={[
          styles.themeOption,
          {
            backgroundColor: theme.colors.surface,
            borderColor: isSelected ? theme.colors.primary : theme.colors.border,
            borderWidth: isSelected ? 2 : 1,
          },
          isSelected && styles.selectedTheme,
        ]}
        onPress={() => handleThemeSelect(theme.name)}
        accessibilityRole="button"
        accessibilityLabel={`Selecionar tema ${theme.displayName}`}
        accessibilityHint={theme.description}
        accessibilityState={{ selected: isSelected }}
      >
        <View style={styles.themePreview}>
          <View style={[styles.colorPreview, { backgroundColor: theme.colors.primary }]} />
          <View style={[styles.colorPreview, { backgroundColor: theme.colors.secondary }]} />
          <View style={[styles.colorPreview, { backgroundColor: theme.colors.success }]} />
          <View style={[styles.colorPreview, { backgroundColor: theme.colors.background }]} />
        </View>
        
        <View style={styles.themeInfo}>
          <Text style={[styles.themeName, { color: theme.colors.text }]}>
            {theme.displayName}
            {isAccessibilityTheme && ' ♿'}
          </Text>
          <Text style={[styles.themeDescription, { color: theme.colors.textSecondary }]}>
            {theme.description}
          </Text>
        </View>
        
        {isSelected && (
          <View style={[styles.selectedIndicator, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.selectedText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderSystemThemeOption = () => {
    if (!showSystemOption) return null;

    return (
      <TouchableOpacity
        style={[
          styles.themeOption,
          styles.systemThemeOption,
          {
            backgroundColor: currentTheme.colors.surface,
            borderColor: isSystemTheme ? currentTheme.colors.primary : currentTheme.colors.border,
            borderWidth: isSystemTheme ? 2 : 1,
          },
          isSystemTheme && styles.selectedTheme,
        ]}
        onPress={handleSystemThemeSelect}
        accessibilityRole="button"
        accessibilityLabel="Usar tema do sistema"
        accessibilityHint="Seguir automaticamente o tema claro/escuro do dispositivo"
        accessibilityState={{ selected: isSystemTheme }}
      >
        <View style={styles.systemThemePreview}>
          <Text style={[styles.systemThemeIcon, { color: currentTheme.colors.primary }]}>
            🌓
          </Text>
        </View>
        
        <View style={styles.themeInfo}>
          <Text style={[styles.themeName, { color: currentTheme.colors.text }]}>
            Automático
          </Text>
          <Text style={[styles.themeDescription, { color: currentTheme.colors.textSecondary }]}>
            Seguir tema do sistema
          </Text>
        </View>
        
        {isSystemTheme && (
          <View style={[styles.selectedIndicator, { backgroundColor: currentTheme.colors.primary }]}>
            <Text style={styles.selectedText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderCompactSelector = () => {
    return (
      <View style={[styles.compactContainer, style]} {...props}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {renderSystemThemeOption()}
          {Object.values(availableThemes).map((theme) => {
            if (theme.name === 'custom' && !theme.colors) return null;
            const isSelected = !isSystemTheme && themeName === theme.name;
            return renderThemeOption(theme, isSelected);
          })}
        </ScrollView>
        
        {showCustomThemeButton && (
          <BaseButton
            title="Personalizar"
            variant="outline"
            size="sm"
            onPress={onCustomThemePress}
            style={styles.customThemeButton}
          />
        )}
      </View>
    );
  };

  const renderFullSelector = () => {
    return (
      <View style={[styles.container, style]} {...props}>
        <BaseCard padding="sm" onPress={() => setIsModalVisible(true)}>
          <View style={styles.currentThemeDisplay}>
            <View style={styles.currentThemePreview}>
              <View style={[styles.colorPreview, { backgroundColor: currentTheme.colors.primary }]} />
              <View style={[styles.colorPreview, { backgroundColor: currentTheme.colors.secondary }]} />
            </View>
            <View style={styles.currentThemeInfo}>
              <Text style={[styles.currentThemeName, { color: currentTheme.colors.text }]}>
                {isSystemTheme ? 'Automático' : currentTheme.displayName}
              </Text>
              <Text style={[styles.currentThemeDescription, { color: currentTheme.colors.textSecondary }]}>
                Toque para alterar
              </Text>
            </View>
          </View>
        </BaseCard>

        <Modal
          visible={isModalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={[styles.modalContainer, { backgroundColor: currentTheme.colors.background }]}>
            <View style={[styles.modalHeader, { borderBottomColor: currentTheme.colors.border }]}>
              <Text style={[styles.modalTitle, { color: currentTheme.colors.text }]}>
                Escolher Tema
              </Text>
              <BaseButton
                title="Fechar"
                variant="ghost"
                onPress={() => setIsModalVisible(false)}
              />
            </View>

            <ScrollView style={styles.modalContent}>
              {renderSystemThemeOption()}
              
              {Object.values(availableThemes).map((theme) => {
                if (theme.name === 'custom' && !theme.colors) return null;
                const isSelected = !isSystemTheme && themeName === theme.name;
                return renderThemeOption(theme, isSelected);
              })}

              {showCustomThemeButton && (
                <BaseButton
                  title="Criar Tema Personalizado"
                  variant="outline"
                  onPress={() => {
                    setIsModalVisible(false);
                    onCustomThemePress?.();
                  }}
                  style={styles.customThemeButtonModal}
                />
              )}
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  };

  if (isTransitioning) {
    return (
      <View style={[styles.transitionContainer, { backgroundColor: currentTheme.colors.surface }]}>
        <Text style={[styles.transitionText, { color: currentTheme.colors.textSecondary }]}>
          Aplicando tema...
        </Text>
      </View>
    );
  }

  return compact ? renderCompactSelector() : renderFullSelector();
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  currentThemeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  
  currentThemePreview: {
    flexDirection: 'row',
    marginRight: 12,
  },
  
  currentThemeInfo: {
    flex: 1,
  },
  
  currentThemeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  
  currentThemeDescription: {
    fontSize: 14,
  },
  
  modalContainer: {
    flex: 1,
  },
  
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  modalContent: {
    flex: 1,
    padding: 16,
  },
  
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 120,
  },
  
  systemThemeOption: {
    backgroundColor: 'transparent',
  },
  
  selectedTheme: {
    // Adicional estilo para tema selecionado
  },
  
  themePreview: {
    flexDirection: 'row',
    marginRight: 12,
  },
  
  systemThemePreview: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  
  systemThemeIcon: {
    fontSize: 24,
  },
  
  colorPreview: {
    width: 8,
    height: 24,
    marginRight: 2,
    borderRadius: 2,
  },
  
  themeInfo: {
    flex: 1,
  },
  
  themeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  
  themeDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  
  selectedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  customThemeButton: {
    marginTop: 8,
  },
  
  customThemeButtonModal: {
    marginTop: 16,
    marginBottom: 32,
  },
  
  transitionContainer: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  transitionText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default ThemeSelector;
