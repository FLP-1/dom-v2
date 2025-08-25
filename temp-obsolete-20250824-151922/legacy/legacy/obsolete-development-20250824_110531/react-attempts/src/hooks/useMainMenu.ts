/**
 * @fileoverview Hook para Menu Principal - DOM v2
 * @description Hook para gerenciar estado e funcionalidades do menu principal
 * @created 2025-01-23
 * @lastModified 2025-01-23
 * @author DOM Team v2
 */

import { useState, useCallback, useEffect } from 'react';

interface UseMainMenuProps {
  userProfile?: string;
  userPermissions?: string[];
  onNavigate?: (screen: string) => void;
}

interface UseMainMenuReturn {
  isMenuVisible: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  handleNavigate: (screen: string) => void;
  menuStats: {
    totalFeatures: number;
    activeFeatures: number;
    developmentFeatures: number;
    plannedFeatures: number;
  };
}

export const useMainMenu = ({
  userProfile = 'employer',
  userPermissions = [],
  onNavigate
}: UseMainMenuProps = {}): UseMainMenuReturn => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const menuStats = {
    totalFeatures: 25,
    activeFeatures: 20,
    developmentFeatures: 3,
    plannedFeatures: 2
  };

  const openMenu = useCallback(() => {
    setIsMenuVisible(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuVisible(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuVisible(prev => !prev);
  }, []);

  const handleNavigate = useCallback((screen: string) => {
    if (onNavigate) {
      onNavigate(screen);
    }
    closeMenu();
  }, [onNavigate, closeMenu]);

  // Fechar menu ao pressionar ESC (web)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuVisible) {
        closeMenu();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isMenuVisible, closeMenu]);

  // Fechar menu ao clicar fora (web)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuVisible && !target.closest('[data-menu-container]')) {
        closeMenu();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuVisible, closeMenu]);

  return {
    isMenuVisible,
    openMenu,
    closeMenu,
    toggleMenu,
    handleNavigate,
    menuStats
  };
};

export default useMainMenu;