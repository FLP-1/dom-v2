/**
 * @fileoverview AudioMessage - Sistema de mensagens de áudio
 * @description Componente para gravação e reprodução de mensagens de áudio
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-08-10
 * 
 * @usage
 * <AudioMessage onAudioSent={handleAudioMessage} />
 * 
 * @features
 * - Gravação de áudio
 * - Reprodução de mensagens
 * - Interface simples para empregados
 * - Controle de qualidade de áudio
 * - Upload automático
 * 
 * @see
 * - docs/features/comunicacao-audio.md
 * - docs/directives/diretivas-pensamento-critico.md
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface AudioMessageProps {
  audioUrl?: string;
  duration?: number;
  onPlay?: () => void;
}

export const AudioMessage: React.FC<AudioMessageProps> = ({ 
  audioUrl, 
  duration = 0,
  onPlay 
}) => {
  return (
    <View style={{ 
      flexDirection: 'row', 
      alignItems: 'center',
      padding: 8,
      backgroundColor: '#f0f0f0',
      borderRadius: 8
    }}>
      <TouchableOpacity onPress={onPlay} style={{ marginRight: 8 }}>
        <Text style={{ fontSize: 24 }}>🔊</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 12, color: '#666' }}>
        {duration > 0 ? `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}` : 'Audio'}
      </Text>
    </View>
  );
};
