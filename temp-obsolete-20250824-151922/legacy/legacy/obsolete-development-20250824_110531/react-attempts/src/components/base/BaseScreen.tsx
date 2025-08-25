/**
 * @fileoverview Componente Base para Telas - DOM v2
 * @created 2025-01-23
 * @lastModified 2025-01-23
 * @author DOM Team v2
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../../styles/design-tokens';
import { getMessage } from '../../utils/messages-centralized';
import MainMenu from '../MainMenu';
import MenuButton from '../MenuButton';
import useMainMenu from '../../hooks/useMainMenu';

interface BaseScreenProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  showHeader?: boolean;
  showScroll?: boolean;
  backgroundColor?: string;
  padding?: keyof typeof Spacing;
  onRefresh?: () => void;
  refreshing?: boolean;
  headerRight?: React.ReactNode;
  headerLeft?: React.ReactNode;
  footer?: React.ReactNode;
  safeArea?: boolean;
  showMenu?: boolean;
  userProfile?: string;
  userPermissions?: string[];
  onNavigate?: (screen: string) => void;
}

/**
 * Fornece estrutura consistente, loading, erro e header
 */
export const BaseScreen: React.FC<BaseScreenProps> = ({
  title,
  subtitle,
  children,
  loading = false,
  error = null,
  showHeader = true,
  showScroll = true,
  backgroundColor = Colors.background.primary,
  padding = 'md',
  onRefresh,
  refreshing = false,
  headerRight,
  headerLeft,
  footer,
  safeArea = true,
  showMenu = true,
  userProfile = 'employer',
  userPermissions = [],
  onNavigate
}) => {
  const { isMenuVisible, openMenu, closeMenu, handleNavigate } = useMainMenu({
    userProfile,
    userPermissions,
    onNavigate
  });

  const containerStyle = [
    styles.container,
    { backgroundColor },
    { padding: Spacing[padding] }
  ];

  const renderHeader = () => {
    if (!showHeader) return null;

    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {showMenu && (
            <MenuButton onPress={openMenu} size="medium" />
          )}
          {headerLeft}
        </View>
        <View style={styles.headerContent}>
          {title && (
            <Text style={styles.title}>{title}</Text>
          )}
          {subtitle && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}
        </View>
        <View style={styles.headerRight}>
          {headerRight}
        </View>
      </View>
    );
  };

  const renderLoading = () => {
    if (!loading) return null;

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>
          {getMessage('system.loading')}
        </Text>
      </View>
    );
  };

  const renderError = () => {
    if (!error) return null;

    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  };

  const renderContent = () => {
    if (loading) {
      return renderLoading();
    }

    if (error) {
      return renderError();
    }

    const content = (
      <View style={styles.content}>
        {children}
      </View>
    );

    if (showScroll) {
      return (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={onRefresh ? {
            refreshing,
            onRefresh
          } : undefined}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      );
    }

    return content;
  };

  return (
    <View style={containerStyle}>
      {renderHeader()}
      {renderContent()}
      {footer && (
        <View style={styles.footer}>
          {footer}
        </View>
      )}
      
      {/* Menu Principal */}
      <MainMenu
        visible={isMenuVisible}
        onClose={closeMenu}
        onNavigate={handleNavigate}
        userProfile={userProfile}
        userPermissions={userPermissions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerContent: {
    flex: 2,
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    ...Typography.h3,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  loadingText: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginTop: Spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  errorText: {
    ...Typography.body,
    color: Colors.error,
    textAlign: 'center',
  },
  footer: {
    padding: Spacing.md,
    backgroundColor: Colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
});

export default BaseScreen;