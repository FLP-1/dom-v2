/**
 * @fileoverview Configurador Mobile e Emulador - DOM v2
 * @directory scripts
 * @description Script para configurar ambiente mobile e emulador para depuração
 * @created 2025-07-26
 * @author DOM Team v2
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ConfiguradorMobileEmulador {
  constructor() {
    this.nome = "📱 Configurador Mobile e Emulador";
    this.versao = "1.0.0";
    this.status = "ATIVO";
    
    this.configuracoes = {
      android: {
        sdkPath: process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT,
        emulatorPath: null,
        avdPath: null
      },
      ios: {
        simulatorPath: null,
        xcodePath: null
      },
      telas: {
        breakpoints: {
          mobile: 768,
          tablet: 1024,
          desktop: 1200
        },
        orientacoes: ['portrait', 'landscape']
      }
    };
  }

  async verificarAmbiente() {
    console.log("🔍 Verificando ambiente mobile...");
    
    // Verificar Android
    if (this.configuracoes.android.sdkPath) {
      console.log("✅ Android SDK encontrado:", this.configuracoes.android.sdkPath);
      this.configuracoes.android.emulatorPath = path.join(this.configuracoes.android.sdkPath, 'emulator', 'emulator.exe');
      this.configuracoes.android.avdPath = path.join(this.configuracoes.android.sdkPath, 'avd');
    } else {
      console.log("❌ Android SDK não encontrado");
    }

    // Verificar iOS (apenas no macOS)
    if (process.platform === 'darwin') {
      this.configuracoes.ios.simulatorPath = '/Applications/Xcode.app/Contents/Developer/Applications/Simulator.app';
      this.configuracoes.ios.xcodePath = '/Applications/Xcode.app';
      
      if (fs.existsSync(this.configuracoes.ios.simulatorPath)) {
        console.log("✅ iOS Simulator encontrado");
      } else {
        console.log("❌ iOS Simulator não encontrado");
      }
    }

    return this.configuracoes;
  }

  async configurarTelasMobile() {
    console.log("📱 Configurando telas para mobile...");
    
    const telasMobile = {
      employer: {
        nome: "Empregador Mobile",
        breakpoints: {
          mobile: {
            grid: "1fr",
            padding: "15px",
            fontSize: "14px"
          },
          tablet: {
            grid: "300px 1fr",
            padding: "20px",
            fontSize: "16px"
          }
        },
        componentes: {
          header: {
            mobile: {
              height: "60px",
              padding: "10px 15px"
            }
          },
          sidebar: {
            mobile: {
              position: "bottom",
              height: "60px",
              display: "flex",
              flexDirection: "row"
            }
          },
          cards: {
            mobile: {
              margin: "10px 0",
              padding: "15px"
            }
          }
        }
      },
      employee: {
        nome: "Funcionário Mobile",
        breakpoints: {
          mobile: {
            grid: "1fr",
            padding: "15px",
            fontSize: "14px"
          }
        },
        componentes: {
          taskList: {
            mobile: {
              swipeActions: true,
              pullToRefresh: true
            }
          },
          calendar: {
            mobile: {
              view: "week",
              touchEnabled: true
            }
          }
        }
      },
      family: {
        nome: "Família Mobile",
        breakpoints: {
          mobile: {
            grid: "1fr",
            padding: "15px",
            fontSize: "14px"
          }
        },
        componentes: {
          chat: {
            mobile: {
              fullscreen: true,
              keyboardAvoiding: true
            }
          },
          notifications: {
            mobile: {
              position: "top",
              swipeToDismiss: true
            }
          }
        }
      }
    };

    return telasMobile;
  }

  async criarConfiguracaoEmulador() {
    console.log("🎮 Criando configuração de emulador...");
    
    const configEmulador = {
      android: {
        dispositivos: [
          {
            nome: "Pixel 7",
            resolucao: "1080x2400",
            densidade: "420dpi",
            api: "API 34"
          },
          {
            nome: "Galaxy S23",
            resolucao: "1080x2340",
            densidade: "450dpi",
            api: "API 34"
          },
          {
            nome: "iPhone 15",
            resolucao: "1179x2556",
            densidade: "460dpi",
            api: "API 34"
          }
        ],
        comandos: {
          listar: "emulator -list-avds",
          iniciar: "emulator -avd {nome}",
          criar: "avdmanager create avd -n {nome} -k {api}"
        }
      },
      web: {
        dispositivos: [
          {
            nome: "Mobile S",
            largura: 375,
            altura: 667
          },
          {
            nome: "Mobile M",
            largura: 414,
            altura: 896
          },
          {
            nome: "Tablet",
            largura: 768,
            altura: 1024
          }
        ]
      }
    };

    return configEmulador;
  }

  async gerarRelatorio() {
    console.log("📊 Gerando relatório de configuração...");
    
    const ambiente = await this.verificarAmbiente();
    const telasMobile = await this.configurarTelasMobile();
    const emulador = await this.criarConfiguracaoEmulador();

    const relatorio = {
      timestamp: new Date().toISOString(),
      configurador: {
        nome: this.nome,
        versao: this.versao,
        status: this.status
      },
      ambiente: ambiente,
      telasMobile: telasMobile,
      emulador: emulador,
      recomendacoes: {
        android: ambiente.android.sdkPath ? "✅ Configurar AVD e iniciar emulador" : "❌ Instalar Android Studio e SDK",
        ios: process.platform === 'darwin' && ambiente.ios.simulatorPath ? "✅ Usar iOS Simulator" : "❌ Apenas disponível no macOS",
        web: "✅ Usar DevTools do navegador para mobile debugging"
      },
      proximosPassos: [
        "1. Instalar Android Studio (se não instalado)",
        "2. Criar AVD (Android Virtual Device)",
        "3. Adaptar telas para mobile",
        "4. Testar em diferentes dispositivos",
        "5. Implementar gestos touch",
        "6. Otimizar performance mobile"
      ]
    };

    // Salvar relatório
    const relatorioPath = path.join(__dirname, '..', 'docs', 'mobile', 'relatorio-configuracao-mobile.json');
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
    console.log("=" .repeat(50));
    
    try {
      const relatorio = await this.gerarRelatorio();
      
      console.log("\n📱 CONFIGURAÇÃO MOBILE COMPLETA!");
      console.log("=" .repeat(50));
      
      console.log("\n🎯 PRÓXIMOS PASSOS:");
      relatorio.proximosPassos.forEach((passo, index) => {
        console.log(`${index + 1}. ${passo}`);
      });
      
      console.log("\n🔧 RECOMENDAÇÕES:");
      Object.entries(relatorio.recomendacoes).forEach(([plataforma, recomendacao]) => {
        console.log(`${plataforma.toUpperCase()}: ${recomendacao}`);
      });
      
      console.log("\n📊 RELATÓRIO GERADO:");
      console.log(`📄 ${relatorio.timestamp}`);
      console.log(`📁 docs/mobile/relatorio-configuracao-mobile.json`);
      
      return relatorio;
      
    } catch (error) {
      console.error("❌ Erro na configuração:", error.message);
      throw error;
    }
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const configurador = new ConfiguradorMobileEmulador();
  configurador.executar()
    .then(() => {
      console.log("\n✅ Configuração mobile concluída!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Erro na configuração:", error);
      process.exit(1);
    });
}

module.exports = ConfiguradorMobileEmulador; 