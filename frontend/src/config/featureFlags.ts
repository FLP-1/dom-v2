/**
 * Flags de funcionalidades (feature toggles)
 * Utilize para habilitar/desabilitar módulos experimentais ou de showcase.
 */

export type FeatureFlags = {
  /**
   * Telas de demonstração/backup (showcase) não fazem parte do produto.
   * Mantenha desativado em produção e ambientes de QA.
   */
  enableShowcaseScreens: boolean;
};

export const featureFlags: FeatureFlags = {
  enableShowcaseScreens: false,
};

export const isShowcaseEnabled = (): boolean => featureFlags.enableShowcaseScreens;


