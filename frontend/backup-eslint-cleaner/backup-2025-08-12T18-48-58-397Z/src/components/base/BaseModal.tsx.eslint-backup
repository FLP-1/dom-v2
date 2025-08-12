/**
 * @fileoverview BaseModal - Sistema de modais acessíveis
 * @version 2.0.0
 * @generated 2025-01-27T11:35:00.000Z
 */

import React, { memo, useMemo, useCallback, useEffect, useRef } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Animated, Dimensions, BackHandler } from 'react-native';
import { BaseComponentProps, AccessibilityProps, ThemeProps } from './types/ComponentProps';
import { useTheme } from './utils/theme';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';

export interface BaseModalProps extends BaseComponentProps, AccessibilityProps, ThemeProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  closable?: boolean;
  backdrop?: boolean;
  backdropClosable?: boolean;
  animationType?: 'none' | 'slide' | 'fade' | 'scale';
  position?: 'center' | 'top' | 'bottom' | 'fullscreen';
  maxWidth?: number | string;
  maxHeight?: number | string;
  closeOnBackPress?: boolean;
  preventBodyScroll?: boolean;
  focusTrap?: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const BaseModal: React.FC<BaseModalProps> = memo(({
  visible,
  onClose,
  children,
  title,
  closable = true,
  backdrop = true,
  backdropClosable = true,
  animationType = 'fade',
  position = 'center',
  maxWidth = '90%',
  maxHeight = '80%',
  closeOnBackPress = true,
  preventBodyScroll = true,
  focusTrap = true,
  onShow,
  onHide,
  accessibilityLabel = 'Modal',
  style,
  ...props
}) => {
  const theme = useTheme();
  const performanceData = usePerformanceMonitor('BaseModal');
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  
  // Focus management
  const modalRef = useRef<View>(null);
  const previousFocus = useRef<any>(null);

  // Animation configuration
  const animationConfig = useMemo(() => ({
    duration: 300,
    useNativeDriver: true,
  }), []);

  const getAnimationValue = useCallback(() => {
    switch (animationType) {
      case 'scale':
        return scaleAnim;
      case 'slide':
        return slideAnim;
      default:
        return fadeAnim;
    }
  }, [animationType, fadeAnim, scaleAnim, slideAnim]);

  const animateIn = useCallback(() => {
    const anim = getAnimationValue();
    
    if (animationType === 'scale') {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, ...animationConfig }),
        Animated.timing(scaleAnim, { toValue: 1, ...animationConfig })
      ]).start();
    } else if (animationType === 'slide') {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, ...animationConfig }),
        Animated.timing(slideAnim, { toValue: 0, ...animationConfig })
      ]).start();
    } else {
      Animated.timing(fadeAnim, { toValue: 1, ...animationConfig }).start();
    }
  }, [animationType, fadeAnim, scaleAnim, slideAnim, animationConfig, getAnimationValue]);

  const animateOut = useCallback((callback?: () => void) => {
    const anim = getAnimationValue();
    
    if (animationType === 'scale') {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, ...animationConfig }),
        Animated.timing(scaleAnim, { toValue: 0.9, ...animationConfig })
      ]).start(callback);
    } else if (animationType === 'slide') {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, ...animationConfig }),
        Animated.timing(slideAnim, { toValue: screenHeight, ...animationConfig })
      ]).start(callback);
    } else {
      Animated.timing(fadeAnim, { toValue: 0, ...animationConfig }).start(callback);
    }
  }, [animationType, fadeAnim, scaleAnim, slideAnim, animationConfig, getAnimationValue]);

  // Handle modal show/hide
  useEffect(() => {
    if (visible) {
      // Store previous focus for restoration
      if (focusTrap && document?.activeElement) {
        previousFocus.current = document.activeElement;
      }
      
      animateIn();
      onShow?.();
      
      // Focus trap - move focus to modal
      if (focusTrap && modalRef.current) {
        setTimeout(() => {
          modalRef.current?.focus?.();
        }, 100);
      }
    } else {
      animateOut(() => {
        onHide?.();
        
        // Restore previous focus
        if (focusTrap && previousFocus.current) {
          previousFocus.current.focus?.();
          previousFocus.current = null;
        }
      });
    }
  }, [visible, animateIn, animateOut, onShow, onHide, focusTrap]);

  // Handle Android back button
  useEffect(() => {
    if (!visible || !closeOnBackPress) return;

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (closable) {
        handleClose();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [visible, closeOnBackPress, closable]);

  const handleClose = useCallback(() => {
    if (closable) {
      onClose();
    }
  }, [closable, onClose]);

  const handleBackdropPress = useCallback(() => {
    if (backdropClosable) {
      handleClose();
    }
  }, [backdropClosable, handleClose]);

  // Keyboard event handler for accessibility
  const handleKeyDown = useCallback((event: any) => {
    if (!visible) return;

    switch (event.key) {
      case 'Escape':
        if (closable) {
          handleClose();
        }
        break;
      case 'Tab':
        if (focusTrap) {
          // Implement focus trap logic here
          // This would cycle focus within the modal
        }
        break;
    }
  }, [visible, closable, handleClose, focusTrap]);

  // Modal position styles
  const getModalPositionStyle = useMemo(() => {
    const baseStyle = {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      maxWidth: typeof maxWidth === 'string' ? maxWidth : maxWidth,
      maxHeight: typeof maxHeight === 'string' ? maxHeight : maxHeight,
    };

    switch (position) {
      case 'top':
        return {
          ...baseStyle,
          alignSelf: 'center',
          marginTop: 50,
          marginHorizontal: 20,
        };
      case 'bottom':
        return {
          ...baseStyle,
          alignSelf: 'center',
          marginBottom: 50,
          marginHorizontal: 20,
        };
      case 'fullscreen':
        return {
          ...baseStyle,
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: 0,
          margin: 0,
        };
      default: // center
        return {
          ...baseStyle,
          alignSelf: 'center',
          marginHorizontal: 20,
        };
    }
  }, [position, theme, maxWidth, maxHeight]);

  const getContainerStyle = useMemo(() => {
    switch (position) {
      case 'top':
        return [styles.overlay, styles.justifyStart];
      case 'bottom':
        return [styles.overlay, styles.justifyEnd];
      case 'fullscreen':
        return [styles.overlay, styles.fullscreen];
      default:
        return [styles.overlay, styles.justifyCenter];
    }
  }, [position]);

  const getAnimatedStyle = useMemo(() => {
    const baseStyle = {
      opacity: fadeAnim,
    };

    switch (animationType) {
      case 'scale':
        return {
          ...baseStyle,
          transform: [{ scale: scaleAnim }],
        };
      case 'slide':
        return {
          ...baseStyle,
          transform: [{ translateY: slideAnim }],
        };
      default:
        return baseStyle;
    }
  }, [animationType, fadeAnim, scaleAnim, slideAnim]);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none" // We handle animations manually
      onRequestClose={handleClose}
      statusBarTranslucent
      accessibilityLabel={accessibilityLabel}
      onShow={onShow}
      {...props}
    >
      <View style={getContainerStyle}>
        {backdrop && (
          <TouchableOpacity 
            style={[styles.backdrop, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}
            onPress={handleBackdropPress}
            activeOpacity={1}
            accessibilityLabel="Fechar modal"
            accessibilityRole="button"
          />
        )}
        
        <Animated.View
          ref={modalRef}
          style={[
            getModalPositionStyle,
            getAnimatedStyle,
            style,
          ]}
          onKeyDown={handleKeyDown}
          accessible={true}
          accessibilityRole="dialog"
          accessibilityLabel={title || accessibilityLabel}
          accessibilityModal={true}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
});

BaseModal.displayName = 'BaseModal';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  
  justifyCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  justifyStart: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  
  justifyEnd: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  
  fullscreen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default BaseModal;
