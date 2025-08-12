/**
 * @fileoverview BaseNavigation - Sistema de navegação completo
 * @version 2.0.0
 * @generated 2025-01-27T11:35:00.000Z
 */

import React, { memo, useMemo, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BaseComponentProps, AccessibilityProps, ThemeProps } from './types/ComponentProps';
import { useTheme } from './utils/theme';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';
import { useBreakpoint } from './utils/responsive';

export interface NavigationItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  children?: NavigationItem[];
  onPress?: () => void;
  href?: string;
  target?: '_blank' | '_self';
}

export interface BaseNavigationProps extends BaseComponentProps, AccessibilityProps, ThemeProps {
  items: NavigationItem[];
  mode?: 'horizontal' | 'vertical' | 'breadcrumb' | 'tabs' | 'sidebar';
  selectedKeys?: string[];
  openKeys?: string[];
  onSelect?: (selectedKeys: string[], info: { key: string; item: NavigationItem }) => void;
  onOpenChange?: (openKeys: string[]) => void;
  collapsible?: boolean;
  collapsed?: boolean;
  theme?: 'light' | 'dark';
  inlineCollapsed?: boolean;
  expandIcon?: (props: { isActive: boolean }) => React.ReactNode;
  overflowedIndicator?: React.ReactNode;
  subMenuCloseDelay?: number;
  subMenuOpenDelay?: number;
  triggerSubMenuAction?: 'hover' | 'click';
  forceSubMenuRender?: boolean;
  multiple?: boolean;
  selectable?: boolean;
  level?: number;
}

const DEFAULT_EXPAND_ICON = ({ isActive }: { isActive: boolean }) => (
  <Text style={{ fontSize: 12 }}>{isActive ? '▼' : '▶'}</Text>
);

export const BaseNavigation: React.FC<BaseNavigationProps> = memo(({
  items,
  mode = 'horizontal',
  selectedKeys = [],
  openKeys = [],
  onSelect,
  onOpenChange,
  collapsible = false,
  collapsed = false,
  theme: navTheme = 'light',
  inlineCollapsed = false,
  expandIcon = DEFAULT_EXPAND_ICON,
  overflowedIndicator,
  subMenuCloseDelay = 0.1,
  subMenuOpenDelay = 0,
  triggerSubMenuAction = 'click',
  forceSubMenuRender = false,
  multiple = false,
  selectable = true,
  level = 0,
  style,
  ...props
}) => {
  const theme = useTheme();
  const performanceData = usePerformanceMonitor('BaseNavigation');
  const { isMobile, isTablet } = useBreakpoint();
  
  // State for internal open keys management
  const [internalOpenKeys, setInternalOpenKeys] = useState<string[]>(openKeys);
  const actualOpenKeys = onOpenChange ? openKeys : internalOpenKeys;

  // Responsive mode adjustment
  const responsiveMode = useMemo(() => {
    if (isMobile && (mode === 'horizontal' || mode === 'tabs')) {
      return 'vertical';
    }
    return mode;
  }, [mode, isMobile]);

  // Theme colors
  const getThemeColors = useCallback(() => {
    const isDark = navTheme === 'dark';
    return {
      background: isDark ? theme.colors.surface : theme.colors.background,
      itemBackground: isDark ? theme.colors.background : theme.colors.surface,
      text: isDark ? '#FFFFFF' : theme.colors.text,
      textSecondary: isDark ? '#CCCCCC' : theme.colors.textSecondary,
      selectedBackground: theme.colors.primary + '20',
      selectedText: theme.colors.primary,
      hoverBackground: theme.colors.primary + '10',
      border: theme.colors.border,
    };
  }, [navTheme, theme]);

  const colors = getThemeColors();

  // Handle item selection
  const handleItemSelect = useCallback((item: NavigationItem) => {
    if (item.disabled) return;

    if (item.children && item.children.length > 0) {
      // Handle submenu toggle
      const newOpenKeys = [...actualOpenKeys];
      const isOpen = actualOpenKeys.includes(item.key);
      
      if (isOpen) {
        const index = newOpenKeys.indexOf(item.key);
        newOpenKeys.splice(index, 1);
      } else {
        if (!multiple) {
          // Close other submenus if not multiple
          const parentKeys = newOpenKeys.filter(key => {
            const parentItem = findItemByKey(items, key);
            return parentItem && parentItem.children && parentItem.children.length > 0;
          });
          newOpenKeys.splice(0, newOpenKeys.length, ...parentKeys);
        }
        newOpenKeys.push(item.key);
      }
      
      if (onOpenChange) {
        onOpenChange(newOpenKeys);
      } else {
        setInternalOpenKeys(newOpenKeys);
      }
    } else {
      // Handle item selection
      if (selectable && onSelect) {
        let newSelectedKeys = [...selectedKeys];
        
        if (multiple) {
          const index = newSelectedKeys.indexOf(item.key);
          if (index > -1) {
            newSelectedKeys.splice(index, 1);
          } else {
            newSelectedKeys.push(item.key);
          }
        } else {
          newSelectedKeys = [item.key];
        }
        
        onSelect(newSelectedKeys, { key: item.key, item });
      }
      
      // Handle navigation
      if (item.onPress) {
        item.onPress();
      } else if (item.href) {
        // Handle web navigation
        if (typeof window !== 'undefined') {
          if (item.target === '_blank') {
            window.open(item.href, '_blank');
          } else {
            window.location.href = item.href;
          }
        }
      }
    }
  }, [actualOpenKeys, selectedKeys, onOpenChange, onSelect, selectable, multiple, items]);

  // Find item by key
  const findItemByKey = useCallback((itemList: NavigationItem[], key: string): NavigationItem | null => {
    for (const item of itemList) {
      if (item.key === key) {
        return item;
      }
      if (item.children) {
        const found = findItemByKey(item.children, key);
        if (found) return found;
      }
    }
    return null;
  }, []);

  // Render navigation item
  const renderNavigationItem = useCallback((item: NavigationItem, depth: number = 0) => {
    const isSelected = selectedKeys.includes(item.key);
    const isOpen = actualOpenKeys.includes(item.key);
    const hasChildren = item.children && item.children.length > 0;
    const isCollapsedMode = collapsed || inlineCollapsed;

    const itemStyle = [
      styles.navigationItem,
      responsiveMode === 'horizontal' && styles.horizontalItem,
      responsiveMode === 'breadcrumb' && styles.breadcrumbItem,
      responsiveMode === 'tabs' && styles.tabItem,
      responsiveMode === 'sidebar' && styles.sidebarItem,
      {
        backgroundColor: isSelected ? colors.selectedBackground : 'transparent',
        paddingLeft: responsiveMode === 'vertical' || responsiveMode === 'sidebar' 
          ? 16 + (depth * 20) 
          : 16,
        borderLeftWidth: responsiveMode === 'sidebar' && isSelected ? 3 : 0,
        borderLeftColor: theme.colors.primary,
      },
      item.disabled && styles.disabledItem,
    ];

    const textStyle = [
      styles.navigationText,
      {
        color: isSelected ? colors.selectedText : 
               item.disabled ? colors.textSecondary : colors.text,
        fontSize: responsiveMode === 'tabs' ? theme.typography.fontSizes.md : theme.typography.fontSizes.sm,
        fontWeight: isSelected ? theme.typography.fontWeights.semibold : theme.typography.fontWeights.normal,
      },
      isCollapsedMode && depth === 0 && styles.collapsedText,
    ];

    return (
      <View key={item.key}>
        <TouchableOpacity
          style={itemStyle}
          onPress={() => handleItemSelect(item)}
          disabled={item.disabled}
          accessibilityRole="button"
          accessibilityLabel={item.label}
          accessibilityState={{
            selected: isSelected,
            disabled: item.disabled,
            expanded: hasChildren ? isOpen : undefined,
          }}
        >
          {/* Icon */}
          {item.icon && (
            <View style={[
              styles.iconContainer,
              isCollapsedMode && depth === 0 && styles.collapsedIcon,
            ]}>
              {item.icon}
            </View>
          )}

          {/* Label */}
          {(!isCollapsedMode || depth > 0) && (
            <Text style={textStyle} numberOfLines={1}>
              {item.label}
            </Text>
          )}

          {/* Badge */}
          {item.badge && (!isCollapsedMode || depth > 0) && (
            <View style={[styles.badge, { backgroundColor: theme.colors.error }]}>
              <Text style={[styles.badgeText, { color: '#FFFFFF' }]}>
                {item.badge}
              </Text>
            </View>
          )}

          {/* Expand icon */}
          {hasChildren && (!isCollapsedMode || depth > 0) && (
            <View style={styles.expandIconContainer}>
              {expandIcon({ isActive: isOpen })}
            </View>
          )}

          {/* Breadcrumb separator */}
          {responsiveMode === 'breadcrumb' && (
            <Text style={[styles.breadcrumbSeparator, { color: colors.textSecondary }]}>
              /
            </Text>
          )}
        </TouchableOpacity>

        {/* Submenu */}
        {hasChildren && (isOpen || forceSubMenuRender) && (
          <View
            style={[
              styles.submenu,
              {
                backgroundColor: colors.background,
                borderLeftColor: colors.border,
                maxHeight: isOpen ? 1000 : 0,
                overflow: 'hidden',
              },
              responsiveMode === 'sidebar' && styles.sidebarSubmenu,
            ]}
          >
            {item.children!.map(child => renderNavigationItem(child, depth + 1))}
          </View>
        )}
      </View>
    );
  }, [
    selectedKeys, actualOpenKeys, colors, responsiveMode, collapsed, inlineCollapsed,
    theme, handleItemSelect, expandIcon, forceSubMenuRender
  ]);

  // Container styles
  const containerStyle = useMemo(() => [
    styles.container,
    responsiveMode === 'horizontal' && styles.horizontalContainer,
    responsiveMode === 'vertical' && styles.verticalContainer,
    responsiveMode === 'breadcrumb' && styles.breadcrumbContainer,
    responsiveMode === 'tabs' && styles.tabsContainer,
    responsiveMode === 'sidebar' && styles.sidebarContainer,
    {
      backgroundColor: colors.background,
      borderColor: colors.border,
    },
    style,
  ], [responsiveMode, colors, style]);

  return (
    <View style={containerStyle} {...props}>
      <ScrollView
        horizontal={responsiveMode === 'horizontal' || responsiveMode === 'breadcrumb' || responsiveMode === 'tabs'}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={[
          responsiveMode === 'horizontal' && styles.horizontalContent,
          responsiveMode === 'breadcrumb' && styles.breadcrumbContent,
          responsiveMode === 'tabs' && styles.tabsContent,
        ]}>
          {items.map(item => renderNavigationItem(item, 0))}
        </View>
      </ScrollView>
    </View>
  );
});

BaseNavigation.displayName = 'BaseNavigation';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  
  horizontalContainer: {
    flexDirection: 'row',
  },
  
  verticalContainer: {
    flexDirection: 'column',
  },
  
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  
  sidebarContainer: {
    flexDirection: 'column',
    minHeight: '100%',
  },
  
  scrollView: {
    flex: 1,
  },
  
  horizontalContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  breadcrumbContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  tabsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  navigationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  
  horizontalItem: {
    marginRight: 8,
    borderRadius: 4,
  },
  
  breadcrumbItem: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  
  tabItem: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    borderRadius: 0,
  },
  
  sidebarItem: {
    borderRadius: 0,
    marginVertical: 1,
  },
  
  disabledItem: {
    opacity: 0.5,
  },
  
  iconContainer: {
    marginRight: 12,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  collapsedIcon: {
    marginRight: 0,
  },
  
  navigationText: {
    flex: 1,
    fontSize: 14,
  },
  
  collapsedText: {
    display: 'none',
  },
  
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },
  
  expandIconContainer: {
    marginLeft: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  breadcrumbSeparator: {
    marginLeft: 8,
    fontSize: 12,
  },
  
  submenu: {
    borderLeftWidth: 1,
    marginLeft: 16,
  },
  
  sidebarSubmenu: {
    borderLeftWidth: 0,
    marginLeft: 0,
  },
});

export default BaseNavigation;
