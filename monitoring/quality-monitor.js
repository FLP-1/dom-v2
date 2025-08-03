#!/usr/bin/env node

/**
 * @fileoverview Monitoramento de Qualidade - Fase 2
 * @description Monitora qualidade do projeto em tempo real
 */

const fs = require('fs');
const path = require('path');

class QualityMonitor {
  constructor() {
    this.metrics = {
      totalFiles: 0,
      qualityScore: 0,
      lastCheck: null,
      issues: []
    };
  }

  async monitorQuality() {
    try {
      // Executar validação
      const { execSync } = require('child_process');
      const output = execSync('npm run validate-directives', { encoding: 'utf8' });
      
      // Extrair métricas
      const scoreMatch = output.match(/Pontuação média: (\d+\.\d+)%/);
      if (scoreMatch) {
        this.metrics.qualityScore = parseFloat(scoreMatch[1]);
      }
      
      this.metrics.lastCheck = new Date().toISOString();
      
      // Salvar métricas
      fs.writeFileSync(
        path.join(__dirname, 'quality-metrics.json'),
        JSON.stringify(this.metrics, null, 2)
      );
      
      console.log(`✅ Qualidade monitorada: ${this.metrics.qualityScore}%`);
      
    } catch (error) {
      console.error('❌ Erro no monitoramento:', error.message);
    }
  }
}

const monitor = new QualityMonitor();
monitor.monitorQuality();
