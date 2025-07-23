"use strict";
// Controller Employee com Prisma - Controle de Funcionários
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
exports.EmployeeControllerPrisma = void 0;
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
class EmployeeControllerPrisma {
    // Listar todos os funcionários
    static getAllEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield prisma.employee.findMany({
                    include: {
                        payrolls: true
                    },
                    orderBy: { createdAt: 'desc' }
                });
                res.json({
                    success: true,
                    data: employees,
                    message: 'Funcionários listados com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao listar funcionários',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Obter funcionário por ID
    static getEmployeeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const employee = yield prisma.employee.findUnique({
                    where: { id },
                    include: {
                        payrolls: true
                    }
                });
                if (!employee) {
                    res.status(404).json({
                        success: false,
                        message: 'Funcionário não encontrado'
                    });
                    return;
                }
                res.json({
                    success: true,
                    data: employee,
                    message: 'Funcionário encontrado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao buscar funcionário',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Criar novo funcionário
    static createEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeData = req.body;
                const newEmployee = yield prisma.employee.create({
                    data: {
                        name: employeeData.name,
                        cpf: employeeData.cpf,
                        position: employeeData.position,
                        salary: parseFloat(employeeData.salary),
                        status: employeeData.status || 'active'
                    }
                });
                res.status(201).json({
                    success: true,
                    data: newEmployee,
                    message: 'Funcionário criado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao criar funcionário',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Atualizar funcionário
    static updateEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const employee = yield prisma.employee.update({
                    where: { id },
                    data: {
                        name: updateData.name,
                        cpf: updateData.cpf,
                        position: updateData.position,
                        salary: updateData.salary ? parseFloat(updateData.salary) : undefined,
                        status: updateData.status,
                        updatedAt: new Date()
                    }
                });
                res.json({
                    success: true,
                    data: employee,
                    message: 'Funcionário atualizado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao atualizar funcionário',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Deletar funcionário
    static deleteEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield prisma.employee.delete({
                    where: { id }
                });
                res.json({
                    success: true,
                    message: 'Funcionário deletado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao deletar funcionário',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Registrar entrada (clock-in)
    static clockIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Aqui você pode implementar a lógica de registro de entrada
                // Por enquanto, apenas retornamos sucesso
                res.json({
                    success: true,
                    message: 'Entrada registrada com sucesso',
                    employeeId: id,
                    timestamp: new Date().toISOString()
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao registrar entrada',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Registrar saída (clock-out)
    static clockOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Aqui você pode implementar a lógica de registro de saída
                // Por enquanto, apenas retornamos sucesso
                res.json({
                    success: true,
                    message: 'Saída registrada com sucesso',
                    employeeId: id,
                    timestamp: new Date().toISOString()
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao registrar saída',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
}
exports.EmployeeControllerPrisma = EmployeeControllerPrisma;
