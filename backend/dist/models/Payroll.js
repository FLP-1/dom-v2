"use strict";
/**
 * @fileoverview Modelo de Folha de Pagamento para DOM v2
 * @description Sistema de cálculos complexos de folha de pagamento
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-22
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.PayrollCalculator = void 0;
class PayrollCalculator {
    // Calcular valor de horas extras
    static calculateOvertime(baseSalary, overtimeHours, overtimeRate = 1.5) {
        const hourlyRate = baseSalary / 220; // 220 horas por mês
        return hourlyRate * overtimeHours * overtimeRate;
    }
    // Calcular INSS
    static calculateINSS(grossSalary) {
        let inssValue = 0;
        let remainingSalary = grossSalary;
        for (const bracket of this.INSS_TABLE) {
            if (remainingSalary <= 0)
                break;
            const taxableAmount = Math.min(remainingSalary, bracket.limit);
            inssValue += taxableAmount * bracket.rate;
            remainingSalary -= taxableAmount;
        }
        return Math.round(inssValue * 100) / 100;
    }
    // Calcular IRRF
    static calculateIRRF(grossSalary, inssValue) {
        const taxableBase = grossSalary - inssValue;
        for (const bracket of this.IRRF_TABLE) {
            if (taxableBase <= bracket.limit) {
                const irrfValue = (taxableBase * bracket.rate) - bracket.deduction;
                return Math.max(0, Math.round(irrfValue * 100) / 100);
            }
        }
        return 0;
    }
    // Calcular FGTS
    static calculateFGTS(grossSalary) {
        return Math.round(grossSalary * 0.08 * 100) / 100;
    }
    // Calcular folha de pagamento completa
    static calculatePayroll(baseSalary, overtimeHours = 0, overtimeRate = 1.5, bonuses = 0, deductions = 0) {
        // Calcular salário bruto
        const overtimeValue = this.calculateOvertime(baseSalary, overtimeHours, overtimeRate);
        const bonusesValue = bonuses;
        const grossSalary = baseSalary + overtimeValue + bonusesValue;
        // Calcular descontos
        const inssValue = this.calculateINSS(grossSalary);
        const irrfValue = this.calculateIRRF(grossSalary, inssValue);
        const fgtsValue = this.calculateFGTS(grossSalary);
        const totalDeductions = inssValue + irrfValue + deductions;
        // Calcular salário líquido
        const netSalary = grossSalary - totalDeductions;
        return {
            baseSalary,
            overtimeValue,
            bonusesValue,
            grossSalary,
            inssValue,
            irrfValue,
            fgtsValue,
            totalDeductions,
            netSalary
        };
    }
    // Validar dados de entrada
    static validatePayrollData(data) {
        const errors = [];
        if (!data.employeeId) {
            errors.push('ID do funcionário é obrigatório');
        }
        if (!data.employeeName) {
            errors.push('Nome do funcionário é obrigatório');
        }
        if (data.baseSalary === undefined || data.baseSalary <= 0) {
            errors.push('Salário base deve ser maior que zero');
        }
        if (data.overtimeHours !== undefined && data.overtimeHours < 0) {
            errors.push('Horas extras não podem ser negativas');
        }
        if (data.bonuses !== undefined && data.bonuses < 0) {
            errors.push('Bônus não pode ser negativo');
        }
        if (data.deductions !== undefined && data.deductions < 0) {
            errors.push('Descontos não podem ser negativos');
        }
        return errors;
    }
}
exports.PayrollCalculator = PayrollCalculator;
exports.default = PayrollCalculator;
// Tabelas de INSS (2025)
PayrollCalculator.INSS_TABLE = [
    { limit: 1320.00, rate: 0.075 },
    { limit: 2571.29, rate: 0.09 },
    { limit: 3856.94, rate: 0.12 },
    { limit: 7507.49, rate: 0.14 }
];
// Tabelas de IRRF (2025)
PayrollCalculator.IRRF_TABLE = [
    { limit: 2259.20, rate: 0, deduction: 0 },
    { limit: 2826.65, rate: 0.075, deduction: 169.44 },
    { limit: 3751.05, rate: 0.15, deduction: 381.44 },
    { limit: 4664.68, rate: 0.225, deduction: 662.77 },
    { limit: Infinity, rate: 0.275, deduction: 896.00 }
];
