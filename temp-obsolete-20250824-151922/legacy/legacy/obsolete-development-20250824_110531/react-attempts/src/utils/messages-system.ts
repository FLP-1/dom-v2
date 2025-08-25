/**
 * @fileoverview Arquivo migrado - messages-system
 * @description Este arquivo foi migrado para o sistema centralizado de mensagens
 * @migrated 2025-01-23
 * @deprecated Use messages-centralized.ts instead
 */

// Use: import { getMessage, Messages } from './messages-centralized';

export { getMessage, Messages, MessagesCentralized } from './messages-centralized';

export const getMessageText = (id: string) => {
  console.warn('getMessageText is deprecated. Use getMessage instead.');
  return getMessage(id);
};

export const getMessageConfig = (id: string) => {
  console.warn('getMessageConfig is deprecated. Use Messages.get instead.');
  return Messages.get(id);
};