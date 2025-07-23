/**
 * @fileoverview Seletor de perfil para testes de personalização
 * @directory frontend/src/components
 * @description Componente para testar diferentes perfis de usuário
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../utils/theme-provider';
import { UserProfileType } from '../utils/user-profiles';
import { getMessage } from '../utils/messages';

interface ProfileSelectorProps {
  visible?: boolean;
}

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({ visible = true }) => {
  const { profile, updateProfile } = useTheme();
  
  const profiles: UserProfileType[] = [
    'EMPLOYER', 'EMPLOYEE', 'FAMILY', 'PARTNER', 
    'SUBORDINATE', 'ADMIN', 'OWNER'
  ];

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione seu perfil:</Text>
      <View style={styles.profilesContainer}>
        {profiles.map((profileType) => (
          <TouchableOpacity
            key={profileType}
            style={[
              styles.profileButton,
              profile.type === profileType && styles.activeProfileButton
            ]}
            onPress={() => updateProfile(profileType)}
          >
            <Text style={[
              styles.profileText,
              profile.type === profileType && styles.activeProfileText
            ]}>
              {profileType}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Perfil Atual:</Text>
        <Text style={styles.infoText}>
          {profile.type}
        </Text>
        <Text style={styles.infoSubtext}>
          Experiência: {profile.experience} | 
          Dispositivo: {profile.device} | 
          Tempo: {profile.timeAvailable}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#212121',
  },
  profilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  profileButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#e9ecef',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  activeProfileButton: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  profileText: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '500',
  },
  activeProfileText: {
    color: '#ffffff',
  },
  infoContainer: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#212121',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#007bff',
  },
  infoSubtext: {
    fontSize: 12,
    color: '#6c757d',
  },
}); 