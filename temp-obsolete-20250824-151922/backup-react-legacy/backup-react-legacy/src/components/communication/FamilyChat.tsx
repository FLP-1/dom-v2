import React, { useState, useRef, useEffect } from 'react';
import AudioMessage from './AudioMessage';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  type: 'text' | 'audio' | 'image';
  audioUrl?: string;
  audioDuration?: number;
  imageUrl?: string;
}

interface FamilyChatProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  onSendAudio?: (audioBlob: Blob) => void;
  style?: React.CSSProperties;
}

const FamilyChat: React.FC<FamilyChatProps> = ({
  messages = [],
  onSendMessage,
  onSendAudio,
  style = {}
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && onSendMessage) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        onSendAudio?.(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Erro ao iniciar gravação:', error);
      alert('Erro ao acessar microfone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxHeight: '600px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      ...style
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f8fafc'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1e293b',
          margin: 0
        }}>
          💬 Chat Familiar
        </h3>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: message.sender === 'Eu' ? 'flex-end' : 'flex-start',
              maxWidth: '70%'
            }}
          >
            <div style={{
              backgroundColor: message.sender === 'Eu' ? '#6366f1' : '#f3f4f6',
              color: message.sender === 'Eu' ? '#ffffff' : '#374151',
              padding: '12px 16px',
              borderRadius: '18px',
              fontSize: '14px',
              wordBreak: 'break-word'
            }}>
              {message.type === 'audio' && message.audioUrl ? (
                <AudioMessage
                  audioUrl={message.audioUrl}
                  duration={message.audioDuration || 0}
                />
              ) : message.type === 'image' && message.imageUrl ? (
                <img
                  src={message.imageUrl}
                  alt="Imagem"
                  style={{
                    maxWidth: '100%',
                    borderRadius: '8px'
                  }}
                />
              ) : (
                message.text
              )}
            </div>
            
            <div style={{
              fontSize: '12px',
              color: '#6b7280',
              marginTop: '4px',
              textAlign: message.sender === 'Eu' ? 'right' : 'left'
            }}>
              {message.sender} • {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid #e5e7eb',
        backgroundColor: '#f8fafc',
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-end'
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            style={{
              width: '100%',
              minHeight: '44px',
              maxHeight: '120px',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
          
          {isRecording && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '8px',
              fontSize: '12px',
              color: '#ef4444'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                animation: 'pulse 1s infinite'
              }} />
              Gravando... {formatTime(recordingTime)}
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: isRecording ? '#ef4444' : '#6366f1',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}
            aria-label={isRecording ? 'Parar gravação' : 'Iniciar gravação'}
          >
            {isRecording ? '⏹️' : '🎤'}
          </button>

          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: newMessage.trim() ? '#6366f1' : '#9ca3af',
              color: '#ffffff',
              cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}
            aria-label="Enviar mensagem"
          >
            ➤
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};

export default FamilyChat;
