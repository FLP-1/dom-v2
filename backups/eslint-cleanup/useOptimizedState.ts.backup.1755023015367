/**
 * @fileoverview useOptimizedState - Hook para estado otimizado
 * @version 2.0.0
 * @generated 2025-01-27T11:30:00.000Z
 */

import { useState, useCallback, useRef } from 'react';

export const useOptimizedState = <T>(initialState: T) => {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);
  
  const optimizedSetState = useCallback((newState: T | ((prevState: T) => T)) => {
    const nextState = typeof newState === 'function' 
      ? (newState as (prevState: T) => T)(stateRef.current)
      : newState;
    
    // Evitar re-renders desnecessários comparando valores
    if (Object.is(stateRef.current, nextState)) {
      return;
    }
    
    stateRef.current = nextState;
    setState(nextState);
  }, []);
  
  return [state, optimizedSetState] as const;
};

export default useOptimizedState;
