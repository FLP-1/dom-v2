import React, { useState } from 'react';
import { UserProfile } from '../utils/userProfileConfig';

interface ProfileSwitcherProps {
  currentProfile: UserProfile;
  onProfileChange: (profile: UserProfile) => void;
}

const ProfileSwitcher: React.FC<ProfileSwitcherProps> = ({ currentProfile, onProfileChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const profiles = [
    { id: 'employer', name: 'Empregador', icon: '👔', description: 'Controle total da gestão' },
    { id: 'employee', name: 'Empregado', icon: '👨‍🔧', description: 'Foco em tarefas e ponto' },
    { id: 'family', name: 'Familiar', icon: '👨‍👩‍👧‍👦', description: 'Visão familiar' },
    { id: 'admin', name: 'Administrador', icon: '🔧', description: 'Administração completa' },
    { id: 'partner', name: 'Parceiro', icon: '🤝', description: 'Prestador de serviços' },
    { id: 'supplier', name: 'Fornecedor', icon: '📦', description: 'Fornecedor de produtos' }
  ] as const;

  const currentProfileData = profiles.find(p => p.id === currentProfile);

  const handleProfileChange = (newProfile: UserProfile) => {
    onProfileChange(newProfile);
    setIsOpen(false);
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={styles.currentProfile}>
          <span style={styles.icon}>{currentProfileData?.icon}</span>
          <span style={styles.name}>{currentProfileData?.name}</span>
        </span>
        <span style={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div style={styles.dropdown}>
          {profiles.map((profile) => (
            <button
              key={profile.id}
              style={{
                ...styles.option,
                ...(profile.id === currentProfile ? styles.optionActive : {})
              }}
              onClick={() => handleProfileChange(profile.id as UserProfile)}
            >
              <span style={styles.optionIcon}>{profile.icon}</span>
              <div style={styles.optionContent}>
                <div style={styles.optionName}>{profile.name}</div>
                <div style={styles.optionDescription}>{profile.description}</div>
              </div>
              {profile.id === currentProfile && (
                <span style={styles.checkmark}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative' as const,
    display: 'inline-block',
  },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s',
  },
  currentProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  icon: {
    fontSize: '18px',
  },
  name: {
    fontWeight: '500',
    color: '#1a202c',
  },
  arrow: {
    fontSize: '12px',
    color: '#718096',
  },
  dropdown: {
    position: 'absolute' as const,
    top: '100%',
    left: '0',
    right: '0',
    marginTop: '4px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    zIndex: 1000,
    minWidth: '200px',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    width: '100%',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    textAlign: 'left' as const,
    transition: 'background-color 0.2s',
  },
  optionActive: {
    backgroundColor: '#f7fafc',
  },
  optionIcon: {
    fontSize: '20px',
    minWidth: '24px',
  },
  optionContent: {
    flex: 1,
  },
  optionName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1a202c',
    marginBottom: '2px',
  },
  optionDescription: {
    fontSize: '12px',
    color: '#718096',
  },
  checkmark: {
    color: '#38a169',
    fontWeight: 'bold',
  },
};

export default ProfileSwitcher;
