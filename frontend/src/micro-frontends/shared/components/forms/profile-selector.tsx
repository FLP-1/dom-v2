







import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../utils/theme-provider';
import { UserProfileType } from '../utils/user-profiles';


function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}


function handleError(error: Error, context: string): void {
  console.error(`[ERROR] ${context}


function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}


function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}


function validateType(value: any, expectedType: string): boolean {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null;
    case 'array':
      return Array.isArray(value);
    default:
      return false;
  }
}] [${level.toUpperCase()}] ${message}`, data || '');
}`);
  }
}:`, error.message);
  // Implementar logging, notificação, etc.
}
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


Referências externas:
 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
  */