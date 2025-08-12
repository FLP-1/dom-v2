/**
 * @fileoverview ThemeCustomizer - Componente para customização de temas
 * @version 2.0.0
 * @generated 2025-01-27T11:25:00.000Z
 */

import React, { useState, useCallback } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import { BaseComponentProps, AccessibilityProps } from './types/ComponentProps';
import { useThemeManager, ThemeConfig, createCustomTheme } from './utils/themeManager';
import { BaseCard } from './BaseCard';
import  from './BaseButton';
import { Theme } from './utils/theme';

export interface ThemeCustomizerProps extends BaseComponentProps, AccessibilityProps {
  onSave?: (theme: ThemeConfig) => void;
  onCancel?: () => void;
  baseTheme?: ThemeConfig;
}

interface ColorCategory {
  name: string;
  displayName: string;
  colors: Array<{
    key: keyof Theme['colors'];
    name: string;
    description: string;
  }>;
}

const COLOR_CATEGORIES: ColorCategory[] = [
  {
    name: 'primary',
    displayName: 'Cores Principais',
    colors: [
      { key: 'primary', name: 'Primária', description: 'Cor principal da aplicação' },
      { key: 'secondary', name: 'Secundária', description: 'Cor secundária para destaques' },
    ],
  },
  {
    name: 'status',
    displayName: 'Cores de Status',
    colors: [
      { key: 'success', name: 'Sucesso', description: 'Indica operações bem-sucedidas' },
      { key: 'warning', name: 'Aviso', description: 'Indica situações de atenção' },
      { key: 'error', name: 'Erro', description: 'Indica erros ou problemas' },
      { key: 'info', name: 'Informação', description: 'Informações gerais' },
    ],
  },
  {
    name: 'layout',
    displayName: 'Cores de Layout',
    colors: [
      { key: 'background', name: 'Fundo', description: 'Cor de fundo principal' },
      { key: 'surface', name: 'Superfície', description: 'Cor de cartões e painéis' },
      { key: 'border', name: 'Borda', description: 'Cor das bordas e divisores' },
    ],
  },
  {
    name: 'text',
    displayName: 'Cores de Texto',
    colors: [
      { key: 'text', name: 'Texto Principal', description: 'Cor do texto principal' },
      { key: 'textSecondary', name: 'Texto Secundário', description: 'Cor do texto menos importante' },
      { key: 'disabled', name: 'Desabilitado', description: 'Cor para elementos desabilitados' },
    ],
  },
];

const PREDEFINED_COLORS = [
  '#4CAF50', '#2196F3', '#FF9800', '#F44336', '#9C27B0',
  '#00BCD4', '#FFEB3B', '#795548', '#607D8B', '#E91E63',
  '#3F51B5', '#FF5722', '#8BC34A', '#FFC107', '#673AB7',
];

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  onSave,
  onCancel,
  baseTheme,
  style,
  ...props
}) => {
  const { currentTheme, setCustomTheme, availableThemes } = useThemeManager();
  
  const initialTheme = baseTheme || currentTheme;
  const [customThemeData, setCustomThemeData] = useState<Theme>(initialTheme);
  const [previewMode, setPreviewMode] = useState(false);

  const handleColorChange = useCallback((colorKey: keyof Theme['colors'], newColor: string) => {
    setCustomThemeData(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: newColor,
      },
    }));
  }, []);

  const handleSpacingChange = useCallback((spacingKey: keyof Theme['spacing'], newValue: number) => {
    setCustomThemeData(prev => ({
      ...prev,
      spacing: {
        ...prev.spacing,
        [spacingKey]: newValue,
      },
    }));
  }, []);

  const handlePreviewToggle = () => {
    if (!previewMode) {
      // Aplicar tema temporariamente para preview
      const previewTheme = createCustomTheme(availableThemes.light, customThemeData);
      setCustomTheme(previewTheme);
    }
    setPreviewMode(!previewMode);
  };

  const handleSave = () => {
    try {
      const newCustomTheme = createCustomTheme(availableThemes.light, customThemeData);
      setCustomTheme(newCustomTheme);
      onSave?.(newCustomTheme);
      
      Alert.alert(
        'Tema Salvo!',
        'Seu tema personalizado foi salvo com sucesso.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao salvar o tema. Tente novamente.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Resetar Tema',
      'Tem certeza que deseja resetar todas as alterações?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Resetar', 
          style: 'destructive',
          onPress: () => setCustomThemeData(initialTheme)
        }
      ]
    );
  };

  const renderColorPicker = (colorKey: keyof Theme['colors'], colorInfo: unknown) => {
    const currentColor = customThemeData.colors[colorKey];
    
    return (
      <BaseCard key={colorKey} style={styles.colorPickerCard} padding="md">
        <View style={styles.colorPickerHeader}>
          <View style={styles.colorInfo}>
            <Text style={[styles.colorName, { color: currentTheme.colors.text }]}>
              {colorInfo.name}
            </Text>
            <Text style={[styles.colorDescription, { color: currentTheme.colors.textSecondary }]}>
              {colorInfo.description}
            </Text>
          </View>
          <View style={[styles.currentColorPreview, { backgroundColor: currentColor }]} />
        </View>

        <View style={styles.colorInput}>
          <Text style={[styles.colorHex, { color: currentTheme.colors.text }]}>
            {currentColor}
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorPalette}>
          {PREDEFINED_COLORS.map((color) => (
            <BaseButton
              key={color}
              onPress={() => handleColorChange(colorKey, color)}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                currentColor === color && styles.selectedColorOption
              ]}
              accessibilityLabel={`Selecionar cor ${color}`}
            />
          ))}
        </ScrollView>
      </BaseCard>
    );
  };

  const renderSpacingControls = () => {
    return (
      <BaseCard style={styles.spacingCard} padding="md">
        <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>
          Espaçamentos
        </Text>
        
        {Object.entries(customThemeData.spacing).map(([key, value]) => (
          <View key={key} style={styles.spacingControl}>
            <Text style={[styles.spacingLabel, { color: currentTheme.colors.text }]}>
              {key}: {value}px
            </Text>
            <View style={styles.spacingButtons}>
              <BaseButton
                title="-"
                size="sm"
                variant="outline"
                onPress={() => handleSpacingChange(key as keyof Theme['spacing'], Math.max(0, value - 2))}
              />
              <BaseButton
                title="+"
                size="sm"
                variant="outline"
                onPress={() => handleSpacingChange(key as keyof Theme['spacing'], value + 2)}
              />
            </View>
          </View>
        ))}
      </BaseCard>
    );
  };

  const renderPreview = () => {
    return (
      <BaseCard style={styles.previewCard} padding="md">
        <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>
          Preview do Tema
        </Text>
        
        <View style={styles.previewContent}>
          <BaseCard 
            style={[styles.previewElement, { backgroundColor: customThemeData.colors.surface }]}
            padding="sm"
          >
            <Text style={[styles.previewText, { color: customThemeData.colors.text }]}>
              Texto Principal
            </Text>
            <Text style={[styles.previewTextSecondary, { color: customThemeData.colors.textSecondary }]}>
              Texto secundário
            </Text>
          </BaseCard>

          <View style={styles.previewButtons}>
            <BaseButton
              title="Primário"
              variant="solid"
              size="sm"
              style={{ backgroundColor: customThemeData.colors.primary }}
            />
            <BaseButton
              title="Secundário"
              variant="outline"
              size="sm"
              style={{ borderColor: customThemeData.colors.secondary }}
            />
          </View>

          <View style={styles.previewStatusColors}>
            {(['success', 'warning', 'error', 'info'] as const).map((status) => (
              <View
                key={status}
                style={[
                  styles.previewStatusColor,
                  { backgroundColor: customThemeData.colors[status] }
                ]}
              />
            ))}
          </View>
        </View>
      </BaseCard>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.background }, style]} {...props}>
      <View style={[styles.header, { borderBottomColor: currentTheme.colors.border }]}>
        <Text style={[styles.title, { color: currentTheme.colors.text }]}>
          Customizar Tema
        </Text>
        <View style={styles.headerButtons}>
          <BaseButton
            title={previewMode ? "Parar Preview" : "Preview"}
            variant="outline"
            size="sm"
            onPress={handlePreviewToggle}
          />
          <BaseButton
            title="Resetar"
            variant="ghost"
            size="sm"
            onPress={handleReset}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderPreview()}

        {COLOR_CATEGORIES.map((category) => (
          <View key={category.name} style={styles.colorCategory}>
            <Text style={[styles.categoryTitle, { color: currentTheme.colors.text }]}>
              {category.displayName}
            </Text>
            {category.colors.map((colorInfo) => 
              renderColorPicker(colorInfo.key, colorInfo)
            )}
          </View>
        ))}

        {renderSpacingControls()}
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: currentTheme.colors.border }]}>
        <BaseButton
          title="Cancelar"
          variant="ghost"
          onPress={onCancel}
          style={styles.footerButton}
        />
        <BaseButton
          title="Salvar Tema"
          variant="solid"
          onPress={handleSave}
          style={styles.footerButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  
  content: {
    flex: 1,
    padding: 16,
  },
  
  colorCategory: {
    marginBottom: 24,
  },
  
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  
  colorPickerCard: {
    marginBottom: 12,
  },
  
  colorPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  colorInfo: {
    flex: 1,
  },
  
  colorName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  
  colorDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  
  currentColorPreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 12,
  },
  
  colorInput: {
    marginBottom: 12,
  },
  
  colorHex: {
    fontSize: 14,
    fontFamily: 'monospace',
    textAlign: 'center',
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
  },
  
  colorPalette: {
    flexDirection: 'row',
  },
  
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    padding: 0,
  },
  
  selectedColorOption: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  
  spacingCard: {
    marginBottom: 24,
  },
  
  spacingControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  
  spacingLabel: {
    fontSize: 14,
    flex: 1,
  },
  
  spacingButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  
  previewCard: {
    marginBottom: 24,
  },
  
  previewContent: {
    gap: 12,
  },
  
  previewElement: {
    borderRadius: 8,
  },
  
  previewText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  
  previewTextSecondary: {
    fontSize: 14,
  },
  
  previewButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  
  previewStatusColors: {
    flexDirection: 'row',
    gap: 8,
  },
  
  previewStatusColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
  },
  
  footerButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default ThemeCustomizer;
