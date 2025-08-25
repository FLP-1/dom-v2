/**
 * @fileoverview useMemoizedValue - Hook para memoização inteligente
 * @version 2.0.0
 * @generated 2025-01-27T11:30:00.000Z
 */

import { useMemo, useRef } from 'react';

// Comparação profunda simples para valores
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  
  if (typeof a === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;
    
    return keysA.every(key => deepEqual(a[key], b[key]));
  }
  
  return false;
}

export const useMemoizedValue = <T>(
  value: T,
  compareFunction?: (prev: T, next: T) => boolean
): T => {
  const prevValueRef = useRef<T>(value);
  const memoizedValueRef = useRef<T>(value);
  
  const compare = compareFunction || deepEqual;
  
  return useMemo(() => {
    if (!compare(prevValueRef.current, value)) {
      prevValueRef.current = value;
      memoizedValueRef.current = value;
    }
    
    return memoizedValueRef.current;
  }, [value, compare]);
};

// Hook especializado para arrays
export const useMemoizedArray = <T>(array: T[]): T[] => {
  return useMemoizedValue(array, (prev, next) => {
    if (prev.length !== next.length) return false;
    return prev.every((item, index) => Object.is(item, next[index]));
  });
};

// Hook especializado para objetos
export const useMemoizedObject = <T extends Record<string, any>>(obj: T): T => {
  return useMemoizedValue(obj, deepEqual);
};

export default useMemoizedValue;
