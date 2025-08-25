/**
 * @fileoverview BaseTabs - Componente de abas
 * @version 2.0.0
 * @generated 2025-01-27T11:35:00.000Z
 */

import React, { memo, useMemo, useCallback, useState, useRef, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { BaseComponentProps, AccessibilityProps, ThemeProps } from './types/ComponentProps';
import { useTheme } from './utils/theme';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';
import { useBreakpoint } from './utils/responsive';

export interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  closable?: boolean;
  children?: React.ReactNode;
}

export interface BaseTabsProps extends BaseComponentProps, AccessibilityProps, ThemeProps {
  items: TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (activeKey: string) => void;
  onTabClick?: (key: string, event: unknown) => void;
  onEdit?: (targetKey: string | React.MouseEvent, action: 'add' | 'remove') => void;
  type?: 'line' | 'card' | 'editable-card';
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'small' | 'middle' | 'large';
  animated?: boolean;
  tabBarExtraContent?: React.ReactNode;
  tabBarStyle?: unknown;
  tabBarGutter?: number;
  hideAdd?: boolean;
  centered?: boolean;
  destroyInactiveTabPane?: boolean;
  indicatorSize?: (origin: number) => number;
  renderTabBar?: (props: unknown, DefaultTabBar: unknown) => React.ReactElement;
  keyboard?: boolean;
  lazy?: boolean;
}

export const BaseTabs: React.FC<BaseTabsProps> = memo(({
  items,
  activeKey,
  defaultActiveKey,
  onChange,
  onTabClick,
  onEdit,
  type = 'line',
  position = 'top',
  size = 'middle',
  animated = true,
  tabBarExtraContent,
  tabBarStyle,
  tabBarGutter = 0,
  hideAdd = false,
  centered = false,
  destroyInactiveTabPane = false,
  indicatorSize,
  renderTabBar,
  keyboard = true,
  lazy = false,
  style,
  ...props
}) => {
  const theme = useTheme();
  const performanceData = usePerformanceMonitor('BaseTabs');
  const { isMobile } = useBreakpoint();
  
  // State
  const [internalActiveKey, setInternalActiveKey] = useState(defaultActiveKey || items[0]?.key || '');
  const actualActiveKey = activeKey || internalActiveKey;
  
  // Animation
  const indicatorAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  
  // Refs
  const tabBarRef = useRef<ScrollView>(null);
  const tabRefs = useRef<{ [key: string]: View }>( { /* TODO: Implement error handling */ } );
  
  // Find active tab index
  const activeTabIndex = useMemo(() => {
    return items.findIndex(item => item.key === actualActiveKey);
  }, [items, actualActiveKey]);

  // Size styles
  const sizeStyles = useMemo(() => {
    switch (size) {
      case 'small':
        return {
          tabHeight: 32,
          fontSize: theme.typography.fontSizes.sm,
          padding: theme.spacing.sm,
        };
      case 'middle':
        return {
          tabHeight: 40,
          fontSize: theme.typography.fontSizes.md,
          padding: theme.spacing.md,
        };
      case 'large':
        return {
          tabHeight: 48,
          fontSize: theme.typography.fontSizes.lg,
          padding: theme.spacing.lg,
        };
      default:
        return {
          tabHeight: 40,
          fontSize: theme.typography.fontSizes.md,
          padding: theme.spacing.md,
        };
    }
  }, [size, theme]);

  // Handle tab change
  const handleTabChange = useCallback((key: string, event?: unknown) => {
    const item = items.find(item => item.key === key);
    if (!item || item.disabled) return;

    if (onTabClick) {
      onTabClick(key, event);
    }

    if (onChange) {
      onChange(key);
    } else {
      setInternalActiveKey(key);
    }
  }, [items, onTabClick, onChange]);

  // Handle tab close
  const handleTabClose = useCallback((key: string, event: unknown) => {
    event.stopPropagation();
    if (onEdit) {
      onEdit(key, 'remove');
    }
  }, [onEdit]);

  // Handle add tab
  const handleAddTab = useCallback((event: unknown) => {
    if (onEdit) {
      onEdit(event, 'add');
    }
  }, [onEdit]);

  // Animate indicator
  useEffect(() => {
    if (!animated) return;

    Animated.timing(indicatorAnim, {
      toValue: activeTabIndex,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activeTabIndex, animated, indicatorAnim]);

  // Animate content
  useEffect(() => {
    if (!animated) return;

    Animated.timing(contentAnim, {
      toValue: activeTabIndex,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activeTabIndex, animated, contentAnim]);

  // Keyboard navigation
  useEffect(() => {
    if (!keyboard) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = activeTabIndex;
      let newIndex = currentIndex;

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'Home':
          newIndex = 0;
          break;
        case 'End':
          newIndex = items.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      const newItem = items[newIndex];
      if (newItem && !newItem.disabled) {
        handleTabChange(newItem.key);
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [keyboard, activeTabIndex, items, handleTabChange]);

  // Render tab
  const renderTab = useCallback((item: TabItem, index: number) => {
    const isActive = item.key === actualActiveKey;
    const isEditable = type === 'editable-card';

    const tabStyle = [
      styles.tab,
      type === 'card' && styles.cardTab,
      type === 'editable-card' && styles.editableCardTab,
      {
        height: sizeStyles.tabHeight,
        paddingHorizontal: sizeStyles.padding,
        backgroundColor: type === 'line' 
          ? 'transparent'
          : isActive 
          ? theme.colors.surface 
          : theme.colors.background,
        borderBottomColor: type === 'line' && isActive 
          ? theme.colors.primary 
          : 'transparent',
        borderBottomWidth: type === 'line' ? 2 : 0,
        marginRight: tabBarGutter,
      },
      position === 'left' && styles.leftTab,
      position === 'right' && styles.rightTab,
      position === 'bottom' && styles.bottomTab,
      item.disabled && styles.disabledTab,
      centered && items.length <= 5 && { flex: 1 },
    ];

    const textStyle = [
      styles.tabText,
      {
        fontSize: sizeStyles.fontSize,
        color: isActive 
          ? theme.colors.primary 
          : item.disabled 
          ? theme.colors.disabled 
          : theme.colors.text,
        fontWeight: isActive 
          ? theme.typography.fontWeights.semibold 
          : theme.typography.fontWeights.normal,
      }
    ];

    return (
      <TouchableOpacity
        key={item.key}
        ref={(ref) => { if (ref) tabRefs.current[item.key] = ref; }}
        style={tabStyle}
        onPress={(event) => handleTabChange(item.key, event)}
        disabled={item.disabled}
        accessibilityRole="tab"
        accessibilityLabel={item.label}
        accessibilityState={{
          selected: isActive,
          disabled: item.disabled,
        }}
      >
        <View style={styles.tabContent}>
          {/* Icon */}
          {item.icon && (
            <View style={styles.tabIcon}>
              {item.icon}
            </View>
          )}

          {/* Label */}
          <Text style={textStyle} numberOfLines={1}>
            {item.label}
          </Text>

          {/* Close button */}
          {isEditable && item.closable !== false && (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={(event) => handleTabClose(item.key, event)}
              accessibilityRole="button"
              accessibilityLabel={`Fechar aba ${item.label}`}
            >
              <Text style={[styles.closeIcon, { color: theme.colors.textSecondary }]}>
                ×
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  }, [
    actualActiveKey, type, sizeStyles, theme, tabBarGutter, position, centered,
    items.length, handleTabChange, handleTabClose
  ]);

  // Render tab bar
  const renderTabBarContent = useCallback(() => {
    const isVertical = position === 'left' || position === 'right';
    
    return (
      <View style={[
        styles.tabBar,
        {
          backgroundColor: theme.colors.background,
          borderBottomColor: type === 'line' ? theme.colors.border : 'transparent',
          borderBottomWidth: type === 'line' ? 1 : 0,
        },
        isVertical && styles.verticalTabBar,
        centered && styles.centeredTabBar,
        tabBarStyle,
      ]}>
        <ScrollView
          ref={tabBarRef}
          horizontal={!isVertical}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.tabScrollView}
          contentContainerStyle={[
            styles.tabScrollContent,
            centered && styles.centeredTabContent,
          ]}
        >
          {items.map(renderTab)}

          {/* Add button */}
          {type === 'editable-card' && !hideAdd && (
            <TouchableOpacity
              style={[styles.addButton, { height: sizeStyles.tabHeight }]}
              onPress={handleAddTab}
              accessibilityRole="button"
              accessibilityLabel="Adicionar aba"
            >
              <Text style={[styles.addIcon, { color: theme.colors.primary }]}>
                +
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        {/* Extra content */}
        {tabBarExtraContent && (
          <View style={styles.extraContent}>
            {tabBarExtraContent}
          </View>
        )}

        {/* Animated indicator */}
        {type === 'line' && animated && items.length > 0 && (
          <Animated.View
            style={[
              styles.indicator,
              {
                backgroundColor: theme.colors.primary,
                left: indicatorAnim.interpolate({
                  inputRange: items.map((_, index) => index),
                  outputRange: items.map((_, index) => index * (100 / items.length) + '%'),
                  extrapolate: 'clamp',
                }),
                width: indicatorSize 
                  ? `${indicatorSize(100 / items.length)}%`
                  : `${100 / items.length}%`,
              }
            ]}
          />
        )}
      </View>
    );
  }, [
    position, theme, type, tabBarStyle, centered, items, renderTab, 
    sizeStyles, hideAdd, handleAddTab, tabBarExtraContent, animated,
    indicatorAnim, indicatorSize
  ]);

  // Render content
  const renderContent = useCallback(() => {
    const activeItem = items.find(item => item.key === actualActiveKey);
    
    if (!activeItem) return null;

    if (lazy && !animated) {
      // Render only active tab content
      return (
        <View style={styles.tabPane}>
          {activeItem.children}
        </View>
      );
    }

    if (animated) {
      // Render all tab panes with animation
      return (
        <Animated.View
          style={[
            styles.animatedContent,
            {
              transform: [{
                translateX: contentAnim.interpolate({
                  inputRange: items.map((_, index) => index),
                  outputRange: items.map((_, index) => index * -100 + '%'),
                  extrapolate: 'clamp',
                }),
              }],
            }
          ]}
        >
          {items.map((item, index) => (
            <View key={item.key} style={styles.tabPane}>
              {(!destroyInactiveTabPane || item.key === actualActiveKey) && item.children}
            </View>
          ))}
        </Animated.View>
      );
    }

    // Static content
    return (
      <View style={styles.tabPane}>
        {activeItem.children}
      </View>
    );
  }, [items, actualActiveKey, lazy, animated, destroyInactiveTabPane, contentAnim]);

  // Container layout
  const isVertical = position === 'left' || position === 'right';
  const containerStyle = [
    styles.container,
    isVertical && styles.verticalContainer,
    style,
  ];

  const tabBarComponent = renderTabBar ? 
    renderTabBar( { /* TODO: Implement error handling */ } , renderTabBarContent) : 
    renderTabBarContent();

  if (position === 'bottom') {
    return (
      <View style={containerStyle} {...props}>
        <View style={styles.content}>
          {renderContent()}
        </View>
        {tabBarComponent}
      </View>
    );
  }

  if (position === 'right') {
    return (
      <View style={[containerStyle, styles.horizontalLayout]} {...props}>
        <View style={styles.content}>
          {renderContent()}
        </View>
        {tabBarComponent}
      </View>
    );
  }

  return (
    <View style={containerStyle} {...props}>
      {tabBarComponent}
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
});

BaseTabs.displayName = 'BaseTabs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  verticalContainer: {
    flexDirection: 'row',
  },
  
  horizontalLayout: {
    flexDirection: 'row',
  },
  
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  
  verticalTabBar: {
    flexDirection: 'column',
    alignItems: 'stretch',
    width: 200,
  },
  
  centeredTabBar: {
    justifyContent: 'center',
  },
  
  tabScrollView: {
    flex: 1,
  },
  
  tabScrollContent: {
    alignItems: 'center',
  },
  
  centeredTabContent: {
    justifyContent: 'center',
    flex: 1,
  },
  
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  
  cardTab: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  
  editableCardTab: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  
  leftTab: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  
  rightTab: {
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  
  bottomTab: {
    borderTopWidth: 2,
    borderBottomWidth: 0,
  },
  
  disabledTab: {
    opacity: 0.5,
  },
  
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  tabIcon: {
    marginRight: 8,
  },
  
  tabText: {
    fontSize: 14,
  },
  
  closeButton: {
    marginLeft: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  closeIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
    paddingHorizontal: 8,
  },
  
  addIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  extraContent: {
    marginLeft: 16,
  },
  
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
  },
  
  content: {
    flex: 1,
    overflow: 'hidden',
  },
  
  animatedContent: {
    flexDirection: 'row',
    flex: 1,
  },
  
  tabPane: {
    flex: 1,
    width: '100%',
  },
});

export default BaseTabs;
