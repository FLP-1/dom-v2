#!/usr/bin/env node

/**
 * Script de Teste de Integração - DOM v2
 * 
 * Este script testa todas as integrações com PostgreSQL para verificar
 * se os endpoints estão funcionando corretamente.
 */

const API_BASE_URL = 'http://localhost:3001/api';

// Cores para output no terminal
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
    log(`✅ ${message}`, 'green');
}

function logError(message) {
    log(`❌ ${message}`, 'red');
}

function logWarning(message) {
    log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
    log(`ℹ️  ${message}`, 'blue');
}

// Função para testar endpoint
async function testEndpoint(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await response.json();

        return {
            success: response.ok,
            status: response.status,
            data: data
        };
    } catch (error) {
        return {
            success: false,
            status: 0,
            error: error.message
        };
    }
}

// Testes específicos por categoria
async function testHealthCheck() {
    logInfo('Testando Health Check...');
    const result = await testEndpoint('/health');
    
    if (result.success) {
        logSuccess('Health Check OK');
        return true;
    } else {
        logError(`Health Check falhou: ${result.status}`);
        return false;
    }
}

async function testAuthentication() {
    logInfo('Testando Endpoints de Autenticação...');
    
    const tests = [
        { endpoint: '/auth/login', method: 'POST', body: { cpf: '12345678901', password: 'test123' } },
        { endpoint: '/auth/validate', method: 'GET' }
    ];

    let passed = 0;
    for (const test of tests) {
        const result = await testEndpoint(test.endpoint, test.method, test.body);
        if (result.success || result.status === 401) { // 401 é esperado para credenciais inválidas
            logSuccess(`${test.method} ${test.endpoint} - OK`);
            passed++;
        } else {
            logError(`${test.method} ${test.endpoint} - Falhou (${result.status})`);
        }
    }
    
    return passed === tests.length;
}

async function testPayments() {
    logInfo('Testando Endpoints de Pagamentos...');
    
    const tests = [
        { endpoint: '/payments', method: 'GET' },
        { endpoint: '/payments/stats/summary', method: 'GET' }
    ];

    let passed = 0;
    for (const test of tests) {
        const result = await testEndpoint(test.endpoint, test.method);
        if (result.success) {
            logSuccess(`${test.method} ${test.endpoint} - OK`);
            passed++;
        } else {
            logError(`${test.method} ${test.endpoint} - Falhou (${result.status})`);
        }
    }
    
    return passed === tests.length;
}

async function testEmployees() {
    logInfo('Testando Endpoints de Funcionários...');
    
    const tests = [
        { endpoint: '/employees', method: 'GET' }
    ];

    let passed = 0;
    for (const test of tests) {
        const result = await testEndpoint(test.endpoint, test.method);
        if (result.success) {
            logSuccess(`${test.method} ${test.endpoint} - OK`);
            passed++;
        } else {
            logError(`${test.method} ${test.endpoint} - Falhou (${result.status})`);
        }
    }
    
    return passed === tests.length;
}

async function testBudgets() {
    logInfo('Testando Endpoints de Orçamentos...');
    
    const tests = [
        { endpoint: '/budgets', method: 'GET' }
    ];

    let passed = 0;
    for (const test of tests) {
        const result = await testEndpoint(test.endpoint, test.method);
        if (result.success) {
            logSuccess(`${test.method} ${test.endpoint} - OK`);
            passed++;
        } else {
            logError(`${test.method} ${test.endpoint} - Falhou (${result.status})`);
        }
    }
    
    return passed === tests.length;
}

async function testNotifications() {
    logInfo('Testando Endpoints de Notificações...');
    
    const tests = [
        { endpoint: '/notifications', method: 'GET' }
    ];

    let passed = 0;
    for (const test of tests) {
        const result = await testEndpoint(test.endpoint, test.method);
        if (result.success) {
            logSuccess(`${test.method} ${test.endpoint} - OK`);
            passed++;
        } else {
            logError(`${test.method} ${test.endpoint} - Falhou (${result.status})`);
        }
    }
    
    return passed === tests.length;
}

async function testTimeclock() {
    logInfo('Testando Endpoints de Registro de Ponto...');
    
    const tests = [
        { endpoint: '/timeclock', method: 'GET' }
    ];

    let passed = 0;
    for (const test of tests) {
        const result = await testEndpoint(test.endpoint, test.method);
        if (result.success) {
            logSuccess(`${test.method} ${test.endpoint} - OK`);
            passed++;
        } else {
            logError(`${test.method} ${test.endpoint} - Falhou (${result.status})`);
        }
    }
    
    return passed === tests.length;
}

async function testAdmin() {
    logInfo('Testando Endpoints Administrativos...');
    
    const tests = [
        { endpoint: '/admin/users', method: 'GET' },
        { endpoint: '/admin/users/stats/summary', method: 'GET' }
    ];

    let passed = 0;
    for (const test of tests) {
        const result = await testEndpoint(test.endpoint, test.method);
        if (result.success) {
            logSuccess(`${test.method} ${test.endpoint} - OK`);
            passed++;
        } else {
            logError(`${test.method} ${test.endpoint} - Falhou (${result.status})`);
        }
    }
    
    return passed === tests.length;
}

async function testCommunication() {
    logInfo('Testando Endpoints de Comunicação...');
    
    const tests = [
        { endpoint: '/messages', method: 'GET' },
        { endpoint: '/groups', method: 'GET' },
        { endpoint: '/communication/stats', method: 'GET' }
    ];

    let passed = 0;
    for (const test of tests) {
        const result = await testEndpoint(test.endpoint, test.method);
        if (result.success) {
            logSuccess(`${test.method} ${test.endpoint} - OK`);
            passed++;
        } else {
            logError(`${test.method} ${test.endpoint} - Falhou (${result.status})`);
        }
    }
    
    return passed === tests.length;
}

// Função principal
async function runIntegrationTests() {
    log('🚀 Iniciando Testes de Integração - DOM v2', 'bright');
    log('=' .repeat(60), 'cyan');
    
    const startTime = Date.now();
    const results = [];
    
    // Executar todos os testes
    const tests = [
        { name: 'Health Check', fn: testHealthCheck },
        { name: 'Autenticação', fn: testAuthentication },
        { name: 'Pagamentos', fn: testPayments },
        { name: 'Funcionários', fn: testEmployees },
        { name: 'Orçamentos', fn: testBudgets },
        { name: 'Notificações', fn: testNotifications },
        { name: 'Registro de Ponto', fn: testTimeclock },
        { name: 'Administração', fn: testAdmin },
        { name: 'Comunicação', fn: testCommunication }
    ];
    
    for (const test of tests) {
        log(`\n📋 Testando: ${test.name}`, 'magenta');
        const result = await test.fn();
        results.push({ name: test.name, passed: result });
    }
    
    // Resumo dos resultados
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    log('\n' + '=' .repeat(60), 'cyan');
    log('📊 RESUMO DOS TESTES', 'bright');
    log('=' .repeat(60), 'cyan');
    
    const totalTests = results.length;
    const passedTests = results.filter(r => r.passed).length;
    const failedTests = totalTests - passedTests;
    
    results.forEach(result => {
        if (result.passed) {
            logSuccess(`${result.name}: PASSOU`);
        } else {
            logError(`${result.name}: FALHOU`);
        }
    });
    
    log('\n' + '=' .repeat(60), 'cyan');
    log(`⏱️  Duração: ${duration}ms`, 'yellow');
    log(`📈 Total: ${totalTests} testes`, 'blue');
    log(`✅ Passou: ${passedTests} testes`, 'green');
    log(`❌ Falhou: ${failedTests} testes`, 'red');
    
    if (failedTests === 0) {
        log('\n🎉 TODOS OS TESTES PASSARAM!', 'bright');
        log('✅ Integração com PostgreSQL está funcionando perfeitamente!', 'green');
    } else {
        log('\n⚠️  ALGUNS TESTES FALHARAM!', 'bright');
        log('🔧 Verifique se o backend está rodando e o banco está conectado.', 'yellow');
    }
    
    log('\n' + '=' .repeat(60), 'cyan');
}

// Executar se chamado diretamente
if (require.main === module) {
    runIntegrationTests().catch(error => {
        logError(`Erro durante os testes: ${error.message}`);
        process.exit(1);
    });
}

module.exports = {
    runIntegrationTests,
    testEndpoint
};
