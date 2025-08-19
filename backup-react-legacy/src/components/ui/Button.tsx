import React from 'react';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style = {}
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? '#9ca3af' : '#6366f1',
          color: '#ffffff',
          border: 'none'
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          color: disabled ? '#9ca3af' : '#6366f1',
          border: `2px solid ${disabled ? '#9ca3af' : '#6366f1'}`
        };
      case 'danger':
        return {
          backgroundColor: disabled ? '#9ca3af' : '#dc3545',
          color: '#ffffff',
          border: 'none'
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '8px 16px',
          fontSize: '14px',
          minHeight: '36px'
        };
      case 'large':
        return {
          padding: '16px 24px',
          fontSize: '18px',
          minHeight: '56px'
        };
      default:
        return {
          padding: '12px 20px',
          fontSize: '16px',
          minHeight: '44px'
        };
    }
  };

  return (
    <button
      onClick={disabled ? undefined : onPress}
      style={{
        borderRadius: '8px',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style
      }}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
