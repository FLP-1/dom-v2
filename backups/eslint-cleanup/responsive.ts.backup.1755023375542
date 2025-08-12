/**
 * @fileoverview Responsive Utilities - Utilitários de responsividade
 * @version 2.0.0
 * @generated 2025-01-27T11:20:00.000Z
 */

import { useState, useEffect } from 'react';
import { ScaledSize } from 'react-native';

export interface Breakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
}

export const defaultBreakpoints: Breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200
};

export type BreakpointName = keyof Breakpoints;

export const useWindowDimensions = () => {
  const [windowData, setWindowData] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = (result: { window: ScaledSize }) => {
      setWindowData(result.window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  return windowData;
};

export const useBreakpoint = (breakpoints: Breakpoints = defaultBreakpoints) => {
  const { width } = useWindowDimensions();

  const getCurrentBreakpoint = (): BreakpointName => {
    if (width >= breakpoints.desktop) return 'desktop';
    if (width >= breakpoints.tablet) return 'tablet';
    return 'mobile';
  };

  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointName>(
    getCurrentBreakpoint()
  );

  useEffect(() => {
    setCurrentBreakpoint(getCurrentBreakpoint());
  }, [width]);

  const isBreakpoint = (breakpoint: BreakpointName): boolean => {
    return currentBreakpoint === breakpoint;
  };

  const isBreakpointUp = (breakpoint: BreakpointName): boolean => {
    const breakpointOrder: BreakpointName[] = ['mobile', 'tablet', 'desktop'];
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
    const targetIndex = breakpointOrder.indexOf(breakpoint);
    return currentIndex >= targetIndex;
  };

  const isBreakpointDown = (breakpoint: BreakpointName): boolean => {
    const breakpointOrder: BreakpointName[] = ['mobile', 'tablet', 'desktop'];
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
    const targetIndex = breakpointOrder.indexOf(breakpoint);
    return currentIndex <= targetIndex;
  };

  return {
    currentBreakpoint,
    width,
    isBreakpoint,
    isBreakpointUp,
    isBreakpointDown,
    isMobile: isBreakpoint('mobile'),
    isTablet: isBreakpoint('tablet'),
    isDesktop: isBreakpoint('desktop')
  };
};

export const responsiveValue = <T>(
  values: Partial<Record<BreakpointName, T>>,
  fallback: T
): T => {
  const { currentBreakpoint } = useBreakpoint();
  
  return values[currentBreakpoint] ?? 
         values.mobile ?? 
         values.tablet ?? 
         values.desktop ?? 
         fallback;
};
