/**
 * @fileoverview Event Types - Tipos para eventos
 * @version 2.0.0
 * @generated 2025-01-27T11:20:00.000Z
 */

import { GestureResponderEvent } from 'react-native';

export interface BaseEventHandlers {
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
}

export interface KeyboardHandlers {
  onKeyDown?: (event: unknown) => void;
  onKeyUp?: (event: unknown) => void;
  onKeyPress?: (event: unknown) => void;
}

export interface TouchHandlers {
  onTouchStart?: (event: GestureResponderEvent) => void;
  onTouchMove?: (event: GestureResponderEvent) => void;
  onTouchEnd?: (event: GestureResponderEvent) => void;
}

export interface FormEventHandlers {
  onChange?: (value: unknown) => void;
  onSubmit?: (data: unknown) => void;
  onReset?: () => void;
  onValidate?: (value: unknown) => boolean | string;
}

export interface ModalEventHandlers {
  onOpen?: () => void;
  onClose?: () => void;
  onBackdropPress?: () => void;
  onEscapePress?: () => void;
}
