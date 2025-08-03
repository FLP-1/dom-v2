
/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: [DESCREVER IMPLEMENTAÇÃO ATUAL]
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - [CRITÉRIO 1]
 * - [CRITÉRIO 2]
 * - [CRITÉRIO 3]
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 * - Segurança vs Usabilidade
 */


/**
 * Referências externas e fontes de informação
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * 
 * @alternatives
 * - Para autenticação: JWT, OAuth 2.0, Session-based
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 * - Performance: Otimização para dispositivos móveis
 * - Segurança: LGPD compliance, criptografia
 * - Escalabilidade: Arquitetura distribuída
 * - Manutenibilidade: Código limpo e documentado
 */


/**
 * Sistema de logging estruturado
 * @param {string} level - Nível do log (info, warn, error, debug)
 * @param {string} message - Mensagem do log
 * @param {object} data - Dados adicionais
 */
function logStructured(level, message, data = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    file: __filename,
    function: arguments.callee.name || 'anonymous'
  };
  
  // Console output
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
  
  // File logging
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'application.log'),
      JSON.stringify(logEntry) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
}

// Aplicar logging
logStructured('info', 'Iniciando execução', { context: 'main' });



/**
 * Validação de tipos
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 * @returns {boolean} - True se o tipo está correto
 */
function validateType(value: any, expectedType: string): boolean {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null;
    case 'array':
      return Array.isArray(value);
    default:
      return false;
  }
}

/**
 * Asserções de validação
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 */
function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}/**
 * @fileoverview Componente de Autenticação Biométrica
 * @directory frontend/src/components/biometric
 * @description Autenticação por face recognition e digital fingerprint
 * @created 2025-07-26
 * @author DOM Team v2
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}
import * as faceapi from 'face-api.js';

interface BiometricLoginProps {
  onSuccess: (method: 'face' | 'fingerprint') => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

interface BiometricData {
  faceDescriptors?: Float32Array[];
  fingerprintData?: string;
}

export const BiometricLogin: React.FC<BiometricLoginProps> = ({
  onSuccess,
  onError,
  onCancel,
}) => {
  const [isBiometricAvailable, setBiometricAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFaceDialog, setShowFaceDialog] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [biometricData, setBiometricData] = useState<BiometricData>({});
  const [isInitialized, setIsInitialized] = useState(false);

  const videoRefCallback = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    initializeBiometric();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const initializeBiometric = async () => {
    try {
      setIsLoading(true);
      
      // Verificar se o navegador suporta WebAuthn
      if (!window.PublicKeyCredential) {
        throw new Error('WebAuthn não é suportado neste navegador');
      }

      // Verificar se há câmera disponível
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some(device => device.kind === 'videoinput');
      
      if (!hasCamera) {
        throw new Error('Câmera não encontrada');
      }

      // Carregar modelos do face-api.js
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

      setBiometricAvailable(true);
      setIsInitialized(true);
    } catch (error) {
      console.error('Erro ao inicializar biométrica:', error);
      onError('Biometria não disponível: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFingerprintAuth = async () => {
    try {
      setIsLoading(true);
      
      // Verificar se há credenciais biométricas salvas
      const credentials = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          rpId: window.location.hostname,
          userVerification: 'required',
        },
      });

      if (credentials) {
        onSuccess('fingerprint');
      } else {
        // Criar nova credencial biométrica
        const credential = await navigator.credentials.create({
          publicKey: {
            challenge: new Uint8Array(32),
            rp: {
              name: 'DOM v2',
              id: window.location.hostname,
            },
            user: {
              id: new Uint8Array(16),
              name: 'usuario@dom-v2.com',
              displayName: 'Usuário DOM v2',
            },
            pubKeyCredParams: [
              {
                type: 'public-key',
                alg: -7, // ES256
              },
            ],
            authenticatorSelection: {
              authenticatorAttachment: 'platform',
              userVerification: 'required',
            },
            timeout: 60000,
          },
        });

        if (credential) {
          setBiometricData(prev => ({
            ...prev,
            fingerprintData: 'registered',
          }));
          onSuccess('fingerprint');
        }
      }
    } catch (error) {
      console.error('Erro na autenticação por digital:', error);
      onError('Erro na autenticação por digital');
    } finally {
      setIsLoading(false);
    }
  };

  const startFaceRecognition = async () => {
    try {
      setIsLoading(true);
      
      // Obter stream da câmera
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      
      setStream(mediaStream);
      setShowFaceDialog(true);

      // Configurar video element
      if (videoRefCallback.current) {
        videoRefCallback.current.srcObject = mediaStream;
        videoRefCallback.current.play();
      }
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      onError('Erro ao acessar câmera');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFaceAuth = async () => {
    try {
      setIsLoading(true);

      if (!videoRefCallback.current) {
        throw new Error('Video não disponível');
      }

      // Detectar face no vídeo
      const detections = await faceapi
        .detectAllFaces(videoRefCallback.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detections.length === 0) {
        throw new Error('Nenhuma face detectada');
      }

      if (detections.length > 1) {
        throw new Error('Múltiplas faces detectadas');
      }

      const faceDescriptor = detections[0].descriptor;

      // Verificar se há dados de face salvos
      if (biometricData.faceDescriptors && biometricData.faceDescriptors.length > 0) {
        // Comparar com dados salvos
        const distance = faceapi.euclideanDistance(faceDescriptor, biometricData.faceDescriptors[0]);
        
        if (distance < 0.6) { // Threshold para reconhecimento
          onSuccess('face');
        } else {
          throw new Error('Face não reconhecida');
        }
      } else {
        // Salvar nova face
        setBiometricData(prev => ({
          ...prev,
          faceDescriptors: [faceDescriptor],
        }));
        onSuccess('face');
      }
    } catch (error) {
      console.error('Erro no reconhecimento facial:', error);
      onError('Erro no reconhecimento facial: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowFaceDialog(false);
  };

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.loadingText}>Inicializando biometria...</Text>
      </View>
    );
  }

  if (!isBiometricAvailable) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Biometria não disponível</Text>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Autenticação Biométrica</Text>
      <Text style={styles.subtitle}>Escolha seu método de autenticação</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.fingerprintButton]}
          onPress={handleFingerprintAuth}
          disabled={isLoading}
        >
          <Text style={styles.buttonIcon}>👆</Text>
          <Text style={styles.buttonText}>Digital</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.faceButton]}
          onPress={startFaceRecognition}
          disabled={isLoading}
        >
          <Text style={styles.buttonIcon}>👁️</Text>
          <Text style={styles.buttonText}>Face</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>

      {/* Modal para reconhecimento facial */}
      <Modal
        visible={showFaceDialog}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseDialog}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reconhecimento Facial</Text>
            
            <View style={styles.videoContainer}>
              <video
                ref={videoRefCallback}
                style={styles.video}
                autoPlay
                muted
                playsInline
              />
            </View>

            <Text style={styles.modalInstructions}>
              Posicione seu rosto no centro da câmera
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.verifyButton]}
                onPress={handleFaceAuth}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.buttonText}>Verificar</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCloseDialog}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  button: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fingerprintButton: {
    backgroundColor: '#28a745',
  },
  faceButton: {
    backgroundColor: '#007bff',
  },
  buttonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  videoContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  modalInstructions: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  verifyButton: {
    backgroundColor: '#28a745',
    flex: 1,
    marginRight: 10,
  },
});

export default BiometricLogin; 

/**
 * 
/**
 * Alternativas consideradas:
 * - Alternativa A: Descrição e motivo da rejeição
 * - Alternativa B: Descrição e motivo da rejeição
 * - Solução escolhida: Justificativa da escolha atual
 */
Referências externas:
 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
 */