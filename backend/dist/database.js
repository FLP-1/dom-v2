"use strict";
/**
 * @fileoverview Configuração do banco de dados DOM v2 (PRISMA VERSION)
 * @description Cliente Prisma real para PostgreSQL
 * @author DOM Team v2
 * @version 2.0.0
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.connectDatabase = connectDatabase;
exports.disconnectDatabase = disconnectDatabase;
exports.checkDatabaseHealth = checkDatabaseHealth;
const client_1 = require("@prisma/client");
// Cliente Prisma global (real)
const globalForPrisma = globalThis;
exports.prisma = (_a = globalForPrisma.prisma) !== null && _a !== void 0 ? _a : new client_1.PrismaClient();
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = exports.prisma;
}
// Função para conectar ao banco
function connectDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.prisma.$connect();
            console.log(`[${new Date().toISOString()}] ` + '✅ Conectado ao banco de dados PostgreSQL');
        }
        catch (error) {
            console.error('❌ Erro ao conectar ao banco:', error);
            throw error;
        }
    });
}
// Função para desconectar do banco
function disconnectDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.prisma.$disconnect();
            console.log(`[${new Date().toISOString()}] ` + '🔌 Desconectado do banco de dados PostgreSQL');
        }
        catch (error) {
            console.error('❌ Erro ao desconectar do banco:', error);
        }
    });
}
// Função para verificar saúde do banco
function checkDatabaseHealth() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.prisma.$queryRaw `SELECT 1`;
            return { status: 'healthy', message: 'PostgreSQL operacional' };
        }
        catch (error) {
            return { status: 'unhealthy', message: 'Erro na conexão com PostgreSQL', error };
        }
    });
}
