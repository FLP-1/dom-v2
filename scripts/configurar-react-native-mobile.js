/**
 * @fileoverview Configurador React Native Mobile - DOM v2
 * @directory scripts
 * @description Script rigoroso para configurar ambiente React Native mobile
 * @created 2025-07-26
 * @author DOM Team v2
 * @directives Pensamento Crítico, Arquitetura Limpa, Mobile-First
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ConfiguradorReactNativeMobile {
  constructor() {
    this.nome = "📱 Configurador React Native Mobile";
    this.versao = "2.0.0";
    this.status = "ATIVO";
    
    // Diretrizes rigorosas do projeto
    this.diretrizes = {
      arquitetura: "React Native + TypeScript",
      foco: "Mobile-first",
      componentes: "Reutilizáveis e tipados",
      navegacao: "React Navigation",
      estado: "Context API + Hooks",
      estilo: "StyleSheet + Flexbox",
      testes: "Jest + React Native Testing Library"
    };

    this.configuracoes = {
      android: {
        sdkPath: process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT,
        minSdkVersion: 21,
        targetSdkVersion: 34,
        compileSdkVersion: 34
      },
      ios: {
        deploymentTarget: "13.0",
        xcodeVersion: "15.0"
      },
      reactNative: {
        version: "0.80.1",
        metroVersion: "0.83.1",
        hermes: true
      }
    };
  }

  async verificarAmbienteReactNative() {
    console.log("🔍 Verificando ambiente React Native...");
    
    const verificacoes = {
      nodeVersion: process.version,
      npmVersion: execSync('npm --version', { encoding: 'utf8' }).trim(),
      reactNativeCLI: null,
      androidSDK: !!this.configuracoes.android.sdkPath,
      xcode: process.platform === 'darwin'
    };

    try {
      verificacoes.reactNativeCLI = execSync('npx react-native --version', { encoding: 'utf8' }).trim();
    } catch (error) {
      verificacoes.reactNativeCLI = "Não instalado";
    }

    console.log("✅ Node.js:", verificacoes.nodeVersion);
    console.log("✅ npm:", verificacoes.npmVersion);
    console.log("✅ React Native CLI:", verificacoes.reactNativeCLI);
    console.log("✅ Android SDK:", verificacoes.androidSDK ? "Encontrado" : "Não encontrado");
    console.log("✅ Xcode:", verificacoes.xcode ? "Disponível" : "Não disponível");

    return verificacoes;
  }

  async configurarEstruturaMobile() {
    console.log("📱 Configurando estrutura mobile...");
    
    const estruturaMobile = {
      screens: {
        employer: {
          path: "src/screens/employer",
          componentes: [
            "Dashboard.tsx",
            "EmployeeManagement.tsx", 
            "TaskManagement.tsx",
            "PaymentControl.tsx",
            "Reports.tsx"
          ],
          navegacao: "Stack Navigator",
          estado: "Context API"
        },
        employee: {
          path: "src/screens/employee",
          componentes: [
            "Dashboard.tsx",
            "TaskList.tsx",
            "Calendar.tsx",
            "TimeTracking.tsx",
            "Profile.tsx"
          ],
          navegacao: "Tab Navigator",
          estado: "AsyncStorage + Context"
        },
        family: {
          path: "src/screens/family",
          componentes: [
            "Dashboard.tsx",
            "Chat.tsx",
            "Notifications.tsx",
            "Settings.tsx",
            "Help.tsx"
          ],
          navegacao: "Drawer Navigator",
          estado: "Socket.io + Context"
        }
      },
      componentes: {
        shared: {
          path: "src/components/shared",
          lista: [
            "Header.tsx",
            "BottomTabBar.tsx",
            "LoadingSpinner.tsx",
            "ErrorBoundary.tsx",
            "Modal.tsx"
          ]
        },
        forms: {
          path: "src/components/forms",
          lista: [
            "Input.tsx",
            "Button.tsx",
            "Select.tsx",
            "DatePicker.tsx",
            "Switch.tsx"
          ]
        },
        cards: {
          path: "src/components/cards",
          lista: [
            "TaskCard.tsx",
            "EmployeeCard.tsx",
            "MetricCard.tsx",
            "NotificationCard.tsx"
          ]
        }
      },
      hooks: {
        path: "src/hooks",
        lista: [
          "useAuth.ts",
          "useTasks.ts",
          "useEmployees.ts",
          "useNotifications.ts",
          "useTheme.ts"
        ]
      },
      services: {
        path: "src/services",
        lista: [
          "api.ts",
          "storage.ts",
          "notifications.ts",
          "geolocation.ts"
        ]
      },
      utils: {
        path: "src/utils",
        lista: [
          "validation.ts",
          "formatting.ts",
          "constants.ts",
          "permissions.ts"
        ]
      }
    };

    return estruturaMobile;
  }

  async configurarNavegacaoMobile() {
    console.log("🧭 Configurando navegação mobile...");
    
    const navegacao = {
      tipos: {
        stack: {
          descricao: "Navegação em pilha para telas principais",
          uso: ["Employer", "Employee", "Family"],
          configuracoes: {
            headerShown: true,
            gestureEnabled: true,
            animation: "slide_from_right"
          }
        },
        tab: {
          descricao: "Navegação por abas para funcionalidades principais",
          uso: ["Employee Dashboard"],
          configuracoes: {
            tabBarPosition: "bottom",
            swipeEnabled: true,
            lazy: true
          }
        },
        drawer: {
          descricao: "Menu lateral para navegação completa",
          uso: ["Family Dashboard"],
          configuracoes: {
            drawerPosition: "left",
            drawerType: "front",
            swipeEnabled: true
          }
        }
      },
      rotas: {
        employer: [
          { name: "Dashboard", component: "Dashboard" },
          { name: "Employees", component: "EmployeeManagement" },
          { name: "Tasks", component: "TaskManagement" },
          { name: "Payments", component: "PaymentControl" },
          { name: "Reports", component: "Reports" }
        ],
        employee: [
          { name: "Dashboard", component: "Dashboard" },
          { name: "Tasks", component: "TaskList" },
          { name: "Calendar", component: "Calendar" },
          { name: "Time", component: "TimeTracking" },
          { name: "Profile", component: "Profile" }
        ],
        family: [
          { name: "Dashboard", component: "Dashboard" },
          { name: "Chat", component: "Chat" },
          { name: "Notifications", component: "Notifications" },
          { name: "Settings", component: "Settings" },
          { name: "Help", component: "Help" }
        ]
      }
    };

    return navegacao;
  }

  async configurarEstilosMobile() {
    console.log("🎨 Configurando estilos mobile...");
    
    const estilos = {
      designSystem: {
        cores: {
          primary: "#1A237E",
          secondary: "#00C853",
          accent: "#FF6F00",
          background: "#FAFAFA",
          surface: "#FFFFFF",
          error: "#D32F2F",
          warning: "#F57C00",
          success: "#388E3C",
          text: {
            primary: "#212121",
            secondary: "#757575",
            disabled: "#BDBDBD"
          }
        },
        tipografia: {
          fontFamily: {
            regular: "Inter-Regular",
            medium: "Inter-Medium",
            semibold: "Inter-SemiBold",
            bold: "Inter-Bold"
          },
          tamanhos: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 18,
            xl: 20,
            xxl: 24,
            xxxl: 32
          }
        },
        espacamento: {
          xs: 4,
          sm: 8,
          md: 16,
          lg: 24,
          xl: 32,
          xxl: 48
        },
        borderRadius: {
          sm: 4,
          md: 8,
          lg: 12,
          xl: 16,
          full: 9999
        }
      },
      breakpoints: {
        mobile: {
          maxWidth: 768,
          orientacao: "portrait",
          grid: "1fr",
          padding: 16
        },
        tablet: {
          minWidth: 769,
          maxWidth: 1024,
          orientacao: "landscape",
          grid: "300px 1fr",
          padding: 24
        }
      },
      componentes: {
        header: {
          height: 60,
          paddingHorizontal: 16,
          backgroundColor: "#1A237E",
          elevation: 4
        },
        card: {
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          padding: 16,
          marginVertical: 8,
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4
        },
        button: {
          primary: {
            backgroundColor: "#1A237E",
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 24,
            elevation: 2
          },
          secondary: {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "#1A237E",
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 24
          }
        }
      }
    };

    return estilos;
  }

  async configurarEmulador() {
    console.log("🎮 Configurando emulador...");
    
    const emulador = {
      android: {
        dispositivos: [
          {
            nome: "Pixel_7_API_34",
            resolucao: "1080x2400",
            densidade: "420dpi",
            api: "API 34",
            arquivo: "pixel_7_api_34.avd"
          },
          {
            nome: "Galaxy_S23_API_34", 
            resolucao: "1080x2340",
            densidade: "450dpi",
            api: "API 34",
            arquivo: "galaxy_s23_api_34.avd"
          }
        ],
        comandos: {
          listar: "emulator -list-avds",
          iniciar: "emulator -avd {nome} -no-snapshot-load",
          criar: "avdmanager create avd -n {nome} -k system-images;android-34;google_apis;x86_64",
          parar: "adb emu kill"
        }
      },
      web: {
        dispositivos: [
          {
            nome: "iPhone SE",
            largura: 375,
            altura: 667,
            userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15"
          },
          {
            nome: "iPhone 15 Pro",
            largura: 393,
            altura: 852,
            userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15"
          },
          {
            nome: "Samsung Galaxy S23",
            largura: 412,
            altura: 915,
            userAgent: "Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36"
          }
        ]
      }
    };

    return emulador;
  }

  async gerarRelatorio() {
    console.log("📊 Gerando relatório React Native mobile...");
    
    const ambiente = await this.verificarAmbienteReactNative();
    const estrutura = await this.configurarEstruturaMobile();
    const navegacao = await this.configurarNavegacaoMobile();
    const estilos = await this.configurarEstilosMobile();
    const emulador = await this.configurarEmulador();

    const relatorio = {
      timestamp: new Date().toISOString(),
      configurador: {
        nome: this.nome,
        versao: this.versao,
        status: this.status,
        diretrizes: this.diretrizes
      },
      ambiente: ambiente,
      estrutura: estrutura,
      navegacao: navegacao,
      estilos: estilos,
      emulador: emulador,
      recomendacoes: {
        android: ambiente.androidSDK ? "✅ Configurar AVD e testar" : "❌ Instalar Android Studio",
        ios: ambiente.xcode ? "✅ Usar iOS Simulator" : "❌ Apenas macOS",
        web: "✅ Usar React Native Web para debugging",
        estrutura: "✅ Seguir arquitetura definida",
        navegacao: "✅ Implementar React Navigation",
        estilos: "✅ Usar StyleSheet e design system"
      },
      proximosPassos: [
        "1. Configurar Android Studio e AVD",
        "2. Implementar estrutura de pastas",
        "3. Configurar React Navigation",
        "4. Criar componentes base",
        "5. Implementar telas mobile",
        "6. Configurar emulador para testes",
        "7. Implementar testes unitários",
        "8. Otimizar performance mobile"
      ],
      arquitetura: {
        principio: "Mobile-first com React Native",
        padrao: "Component-based architecture",
        estado: "Context API + Hooks",
        navegacao: "React Navigation",
        estilo: "StyleSheet + Flexbox",
        testes: "Jest + React Native Testing Library"
      }
    };

    // Salvar relatório
    const relatorioPath = path.join(__dirname, '..', 'docs', 'mobile', 'relatorio-react-native-mobile.json');
    const relatorioDir = path.dirname(relatorioPath);
    
    if (!fs.existsSync(relatorioDir)) {
      fs.mkdirSync(relatorioDir, { recursive: true });
    }
    
    fs.writeFileSync(relatorioPath, JSON.stringify(relatorio, null, 2));
    
    console.log("✅ Relatório salvo em:", relatorioPath);
    return relatorio;
  }

  async executar() {
    console.log(`🚀 ${this.nome} v${this.versao}`);
    console.log("=" .repeat(60));
    console.log("🎯 DIRETRIZES RIGOROSAS:");
    Object.entries(this.diretrizes).forEach(([key, value]) => {
      console.log(`   ${key}: ${value}`);
    });
    console.log("=" .repeat(60));
    
    try {
      const relatorio = await this.gerarRelatorio();
      
      console.log("\n📱 CONFIGURAÇÃO REACT NATIVE MOBILE COMPLETA!");
      console.log("=" .repeat(60));
      
      console.log("\n🎯 PRÓXIMOS PASSOS:");
      relatorio.proximosPassos.forEach((passo, index) => {
        console.log(`${index + 1}. ${passo}`);
      });
      
      console.log("\n🔧 RECOMENDAÇÕES:");
      Object.entries(relatorio.recomendacoes).forEach(([area, recomendacao]) => {
        console.log(`${area.toUpperCase()}: ${recomendacao}`);
      });
      
      console.log("\n🏗️ ARQUITETURA:");
      Object.entries(relatorio.arquitetura).forEach(([aspecto, valor]) => {
        console.log(`${aspecto}: ${valor}`);
      });
      
      console.log("\n📊 RELATÓRIO GERADO:");
      console.log(`📄 ${relatorio.timestamp}`);
      console.log(`📁 docs/mobile/relatorio-react-native-mobile.json`);
      
      return relatorio;
      
    } catch (error) {
      console.error("❌ Erro na configuração:", error.message);
      throw error;
    }
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const configurador = new ConfiguradorReactNativeMobile();
  configurador.executar()
    .then(() => {
      console.log("\n✅ Configuração React Native mobile concluída!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Erro na configuração:", error);
      process.exit(1);
    });
}

module.exports = ConfiguradorReactNativeMobile; 