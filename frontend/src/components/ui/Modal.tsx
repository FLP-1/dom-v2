/**
 * @fileoverview Componente Modal para interações modais
 * @description Componente reutilizável para modais com foco na simplicidade
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-23
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal as RNModal,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';

// Tipos para o componente
export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'full';
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  animation?: 'fade' | 'slide' | 'none';
  position?: 'center' | 'top' | 'bottom';
}

export interface ModalHeaderProps {
  title?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

// Componente de cabeçalho do modal
const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
  showCloseButton = true
}) => {
  return (
    <View style={styles.header}>
      {title && (
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      )}
      {showCloseButton && onClose && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.closeIcon}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Componente de rodapé do modal
const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  align = 'right'
}) => {
  return (
    <View style={[
      styles.footer,
      { justifyContent: align === 'left' ? 'flex-start' : 
                  align === 'center' ? 'center' : 'flex-end' }
    ]}>
      {children}
    </View>
  );
};

// Componente principal do modal
const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeOnBackdrop = true,
  animation = 'fade',
  position = 'center'
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  const getModalSize = () => {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    
    switch (size) {
      case 'small':
        return { width: screenWidth * 0.8, maxWidth: 400 };
      case 'large':
        return { width: screenWidth * 0.9, maxWidth: 800 };
      case 'full':
        return { width: screenWidth, height: screenHeight };
      case 'medium':
      default:
        return { width: screenWidth * 0.85, maxWidth: 600 };
    }
  };

  const getModalPosition = () => {
    switch (position) {
      case 'top':
        return { marginTop: 50, marginBottom: 'auto' };
      case 'bottom':
        return { marginTop: 'auto', marginBottom: 50 };
      case 'center':
      default:
        return { marginTop: 'auto', marginBottom: 'auto' };
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View 
          style={[
            styles.backdrop,
            { opacity: fadeAnim }
          ]}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View
              style={[
                styles.modalContainer,
                getModalSize(),
                getModalPosition(),
                {
                  transform: [{ scale: scaleAnim }],
                  opacity: fadeAnim
                }
              ]}
            >
              <View style={styles.modal}>
                <ModalHeader
                  title={title}
                  onClose={onClose}
                  showCloseButton={showCloseButton}
                />
                <View style={styles.content}>
                  {children}
                </View>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    maxHeight: '80%',
  },
  modal: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    flex: 1,
    marginRight: 16,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 20,
    color: '#6c757d',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e1e5e9',
    gap: 12,
  },
});

// Exportar componentes
export { ModalHeader, ModalFooter };
export default Modal; 