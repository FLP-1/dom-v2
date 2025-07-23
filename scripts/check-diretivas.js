#!/usr/bin/env node

/**
 * ✅ SCRIPT RÁPIDO DE VERIFICAÇÃO DAS DIRETIVAS
 * Execução simples: node scripts/check-diretivas.js
 */

const GarantiaDiretivas = require('./garantia-diretivas');

console.log('🛡️ VERIFICAÇÃO RÁPIDA DAS DIRETIVAS - DOM v2\n');

const garantia = new GarantiaDiretivas();
garantia.executar(); 