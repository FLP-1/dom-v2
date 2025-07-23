"use strict";
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
exports.EmployeeController = void 0;
// Dados mockados para demonstração
let employeesData = [
    {
        id: '1',
        name: 'Maria Silva',
        cpf: '123.456.789-00',
        position: 'Empregada Doméstica',
        salary: 1500.00,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '2',
        name: 'João Santos',
        cpf: '987.654.321-00',
        position: 'Jardineiro',
        salary: 1200.00,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
class EmployeeController {
    createEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeData = req.body;
                const newEmployee = Object.assign(Object.assign({ id: Date.now().toString() }, employeeData), { createdAt: new Date(), updatedAt: new Date() });
                employeesData.push(newEmployee);
                res.status(201).json({
                    success: true,
                    data: newEmployee,
                    message: 'Funcionário criado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao criar funcionário'
                });
            }
        });
    }
    getAllEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({
                    success: true,
                    data: employeesData,
                    message: 'Funcionários recuperados com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao recuperar funcionários'
                });
            }
        });
    }
    getEmployeeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const employee = yield Employee.findByPk(id);
                if (!employee) {
                    return res.status(404).json({
                        success: false,
                        message: 'Funcionário não encontrado'
                    });
                }
                res.status(200).json({
                    success: true,
                    data: employee,
                    message: 'Funcionário recuperado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao recuperar funcionário'
                });
            }
        });
    }
    updateEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const employee = yield Employee.findByPk(id);
                if (!employee) {
                    return res.status(404).json({
                        success: false,
                        message: 'Funcionário não encontrado'
                    });
                }
                yield employee.update(updateData);
                res.status(200).json({
                    success: true,
                    data: employee,
                    message: 'Funcionário atualizado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao atualizar funcionário'
                });
            }
        });
    }
    deleteEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const employee = yield Employee.findByPk(id);
                if (!employee) {
                    return res.status(404).json({
                        success: false,
                        message: 'Funcionário não encontrado'
                    });
                }
                yield employee.destroy();
                res.status(200).json({
                    success: true,
                    message: 'Funcionário excluído com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao excluir funcionário'
                });
            }
        });
    }
    clockIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const employee = yield Employee.findByPk(id);
                if (!employee) {
                    return res.status(404).json({
                        success: false,
                        message: 'Funcionário não encontrado'
                    });
                }
                // Implementar lógica de ponto
                const clockInTime = new Date();
                res.status(200).json({
                    success: true,
                    data: { employeeId: id, clockInTime },
                    message: 'Ponto registrado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao registrar ponto'
                });
            }
        });
    }
    clockOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const employee = yield Employee.findByPk(id);
                if (!employee) {
                    return res.status(404).json({
                        success: false,
                        message: 'Funcionário não encontrado'
                    });
                }
                // Implementar lógica de ponto
                const clockOutTime = new Date();
                res.status(200).json({
                    success: true,
                    data: { employeeId: id, clockOutTime },
                    message: 'Ponto registrado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao registrar ponto'
                });
            }
        });
    }
}
exports.EmployeeController = EmployeeController;
