"use strict";
// Controller Payroll com Prisma - Controle de Folha de Pagamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA
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
exports.PayrollControllerPrisma = void 0;
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
class PayrollControllerPrisma {
    // Listar todas as folhas de pagamento
    static getAllPayrolls(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payrolls = yield prisma.payroll.findMany({
                    orderBy: { createdAt: 'desc' }
                });
                res.json({
                    success: true,
                    payrolls,
                    total: payrolls.length
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Erro ao buscar folhas de pagamento'
                });
            }
        });
    }
    // Buscar folha de pagamento por ID
    static getPayrollById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const payroll = yield prisma.payroll.findUnique({
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
                    payroll
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Erro ao buscar folha de pagamento'
                });
            }
        });
    }
    // Criar nova folha de pagamento
    static createPayroll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payrollData = req.body;
                // Calcular valores (simplificado)
                const overtimeValue = (payrollData.overtimeHours || 0) * (payrollData.overtimeRate || 1.5) * (payrollData.baseSalary / 160);
                const grossSalary = payrollData.baseSalary + overtimeValue + (payrollData.bonuses || 0);
                const inss = grossSalary * 0.11; // 11% INSS
                const irrf = Math.max(0, (grossSalary - inss) * 0.15); // 15% IRRF
                const fgts = grossSalary * 0.08; // 8% FGTS
                const netSalary = grossSalary - inss - irrf - (payrollData.deductions || 0);
                const newPayroll = yield prisma.payroll.create({
                    data: {
                        employeeId: payrollData.employeeId,
                        employeeName: payrollData.employeeName,
                        baseSalary: parseFloat(payrollData.baseSalary),
                        overtimeHours: parseFloat(payrollData.overtimeHours || 0),
                        overtimeRate: parseFloat(payrollData.overtimeRate || 1.5),
                        bonuses: parseFloat(payrollData.bonuses || 0),
                        deductions: parseFloat(payrollData.deductions || 0),
                        inss,
                        irrf,
                        fgts,
                        netSalary,
                        grossSalary,
                        month: parseInt(payrollData.month || new Date().getMonth() + 1),
                        year: parseInt(payrollData.year || new Date().getFullYear()),
                        status: payrollData.status || 'pending'
                    }
                });
                res.status(201).json({
                    success: true,
                    payroll: newPayroll,
                    message: 'Folha de pagamento criada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Erro ao criar folha de pagamento'
                });
            }
        });
    }
    // Atualizar folha de pagamento
    static updatePayroll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const payroll = yield prisma.payroll.update({
                    where: { id },
                    data: {
                        employeeId: updateData.employeeId,
                        employeeName: updateData.employeeName,
                        baseSalary: updateData.baseSalary ? parseFloat(updateData.baseSalary) : undefined,
                        overtimeHours: updateData.overtimeHours ? parseFloat(updateData.overtimeHours) : undefined,
                        overtimeRate: updateData.overtimeRate ? parseFloat(updateData.overtimeRate) : undefined,
                        bonuses: updateData.bonuses ? parseFloat(updateData.bonuses) : undefined,
                        deductions: updateData.deductions ? parseFloat(updateData.deductions) : undefined,
                        status: updateData.status,
                        updatedAt: new Date()
                    }
                });
                res.json({
                    success: true,
                    payroll,
                    message: 'Folha de pagamento atualizada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Erro ao atualizar folha de pagamento'
                });
            }
        });
    }
    // Deletar folha de pagamento
    static deletePayroll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield prisma.payroll.delete({
                    where: { id }
                });
                res.json({
                    success: true,
                    message: 'Folha de pagamento deletada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Erro ao deletar folha de pagamento'
                });
            }
        });
    }
    // Obter estatísticas da folha de pagamento
    static getPayrollStats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalPayrolls = yield prisma.payroll.count();
                const pendingPayrolls = yield prisma.payroll.count({ where: { status: 'pending' } });
                const approvedPayrolls = yield prisma.payroll.count({ where: { status: 'approved' } });
                const paidPayrolls = yield prisma.payroll.count({ where: { status: 'paid' } });
                const result = yield prisma.payroll.aggregate({
                    _sum: {
                        grossSalary: true,
                        netSalary: true,
                        inss: true,
                        irrf: true,
                        deductions: true
                    }
                });
                const totalGrossSalary = result._sum.grossSalary || 0;
                const totalNetSalary = result._sum.netSalary || 0;
                const totalDeductions = (result._sum.inss || 0) + (result._sum.irrf || 0) + (result._sum.deductions || 0);
                res.json({
                    success: true,
                    stats: {
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
                    error: 'Erro ao buscar estatísticas'
                });
            }
        });
    }
}
exports.PayrollControllerPrisma = PayrollControllerPrisma;
