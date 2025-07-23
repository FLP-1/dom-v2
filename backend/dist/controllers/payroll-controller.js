"use strict";
/**
 * @fileoverview Controller de Folha de Pagamento para DOM v2
 * @description Endpoints para cálculos complexos de folha de pagamento
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-22
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollController = void 0;
const database_1 = require("../database");
class PayrollController {
    // Listar todas as folhas de pagamento
    static getAllPayrolls(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payrolls = yield database_1.prisma.payroll.findMany();
                res.json({
                    success: true,
                    data: payrolls,
                    total: payrolls.length
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Erro ao buscar folhas de pagamento',
                    message: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Buscar folha de pagamento por ID
    static getPayrollById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const payroll = yield database_1.prisma.payroll.findUnique({
                    where: { id }
                });
                if (!payroll) {
                    res.status(404).json({
                        success: false,
                        error: 'Folha de pagamento não encontrada'
                    });
                    return;
                }
                res.json({
                    success: true,
                    data: payroll
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Erro ao buscar folha de pagamento',
                    message: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Calcular folha de pagamento
    static calculatePayroll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { baseSalary, overtimeHours = 0, overtimeRate = 1.5, bonuses = 0, deductions = 0 } = req.body;
                // Validar dados de entrada
                if (!baseSalary || baseSalary <= 0) {
                    res.status(400).json({
                        success: false,
                        error: 'Salário base é obrigatório e deve ser maior que zero'
                    });
                    return;
                }
                // Cálculos simplificados
                const overtimePay = overtimeHours * overtimeRate * (baseSalary / 160);
                const grossSalary = baseSalary + overtimePay + bonuses;
                const inss = grossSalary * 0.11; // 11% INSS
                const irrf = Math.max(0, (grossSalary - inss) * 0.15); // 15% IRRF
                const fgts = grossSalary * 0.08; // 8% FGTS
                const netSalary = grossSalary - inss - irrf - deductions;
                const calculation = {
                    grossSalary,
                    netSalary,
                    inssValue: inss,
                    irrfValue: irrf,
                    fgtsValue: fgts,
                    totalDeductions: inss + irrf + deductions
                };
                res.json({
                    success: true,
                    data: calculation,
                    summary: {
                        totalEarnings: calculation.grossSalary,
                        totalDeductions: calculation.totalDeductions,
                        netSalary: calculation.netSalary,
                        fgts: calculation.fgtsValue
                    }
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Erro ao calcular folha de pagamento',
                    message: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Criar nova folha de pagamento
    static createPayroll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payrollData = req.body;
                const newPayroll = yield database_1.prisma.payroll.create({
                    data: payrollData
                });
                res.status(201).json({
                    success: true,
                    data: newPayroll,
                    message: 'Folha de pagamento criada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Erro ao criar folha de pagamento',
                    message: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Atualizar status da folha de pagamento
    static updatePayrollStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status } = req.body;
                // Validar status
                if (!['pending', 'approved', 'paid'].includes(status)) {
                    res.status(400).json({
                        success: false,
                        error: 'Status inválido'
                    });
                    return;
                }
                const payroll = yield database_1.prisma.payroll.update({
                    where: { id },
                    data: { status }
                });
                res.json({
                    success: true,
                    data: payroll,
                    message: 'Status atualizado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Erro ao atualizar status',
                    message: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Obter estatísticas da folha de pagamento
    static getPayrollStats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [totalPayrolls, pendingPayrolls, approvedPayrolls, paidPayrolls] = yield Promise.all([
                    database_1.prisma.payroll.count(),
                    database_1.prisma.payroll.count({ where: { status: 'pending' } }),
                    database_1.prisma.payroll.count({ where: { status: 'approved' } }),
                    database_1.prisma.payroll.count({ where: { status: 'paid' } })
                ]);
                const payrolls = yield database_1.prisma.payroll.findMany();
                const totalGrossSalary = payrolls.reduce((sum, p) => sum + p.grossSalary, 0);
                const totalNetSalary = payrolls.reduce((sum, p) => sum + p.netSalary, 0);
                const totalDeductions = payrolls.reduce((sum, p) => sum + p.inss + p.irrf + p.deductions, 0);
                res.json({
                    success: true,
                    data: {
                        totalPayrolls,
                        pendingPayrolls,
                        approvedPayrolls,
                        paidPayrolls,
                        totalGrossSalary,
                        totalNetSalary,
                        totalDeductions,
                        averageGrossSalary: totalPayrolls > 0 ? totalGrossSalary / totalPayrolls : 0,
                        averageNetSalary: totalPayrolls > 0 ? totalNetSalary / totalPayrolls : 0
                    }
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Erro ao buscar estatísticas',
                    message: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
}
exports.PayrollController = PayrollController;
