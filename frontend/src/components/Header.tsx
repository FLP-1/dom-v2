/**
 * @fileoverview Header do DOM v2
 * @description Header com menu lateral e informações do usuário
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-23
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface HeaderProps {
  title: string;
  onMenuPress: () => void;
  onLogout?: () => void;
  user?: {
    name: string;
    profile: string;
  };
  showMenu?: boolean;
  showLogout?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onMenuPress,
  onLogout,
  user,
  showMenu = true,
  showLogout = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showMenu && (
          <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {user && (
            <Text style={styles.subtitle}>
              Olá, {user.name} ({user.profile})
            </Text>
          )}
        </View>
      </View>

      <View style={styles.rightSection}>
        {showLogout && onLogout && (
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <Text style={styles.logoutIcon}>🚪</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuIcon: {
    fontSize: 18,
    color: '#495057',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dc3545',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default Header; 