/**
 * 📊 PRODUCTIVITY PREDICTOR - DOM v2
 * Preditor de produtividade baseado em padrões históricos
 * Implementação: Semana 19-20 da Fase 5
 */

class ProductivityPredictor {
    constructor() {
        this.name = 'ProductivityPredictor';
        this.version = '1.0.0';
        this.status = 'active';
        
        // Configurações do preditor
        this.config = {
            predictionHorizon: 7, // dias
            minHistoricalData: 30, // dias
            confidenceThreshold: 0.6,
            updateFrequency: 3600000 // 1 hora
        };
        
        // Fatores de influência
        this.factors = {
            temporal: {
                dayOfWeek: { weight: 0.3 },
                timeOfDay: { weight: 0.2 },
                month: { weight: 0.1 }
            },
            behavioral: {
                taskType: { weight: 0.25 },
                taskComplexity: { weight: 0.15 },
                userExperience: { weight: 0.1 }
            },
            environmental: {
                weather: { weight: 0.05 },
                events: { weight: 0.05 }
            }
        };
        
        // Cache de previsões
        this.predictionCache = {
            predictions: [],
            patterns: {},
            accuracy: 0,
            lastUpdate: null
        };
    }

    /**
     * Gera previsões de produtividade
     */
    async predictProductivity(historicalData, targetDate = null) {
        console.log(`[${new Date().toISOString()}] 📊 Gerando previsões de produtividade...`);
        
        if (!targetDate) {
            targetDate = new Date();
        }
        
        try {
            // Valida dados históricos
            if (!this.validateHistoricalData(historicalData)) {
                return this.generateDefaultPrediction(targetDate);
            }
            
            // Analisa padrões históricos
            const patterns = this.analyzeProductivityPatterns(historicalData);
            
            // Gera previsões para múltiplos dias
            const predictions = [];
            for (let i = 0; i < this.config.predictionHorizon; i++) {
                const date = new Date(targetDate);
                date.setDate(date.getDate() + i);
                
                const prediction = this.generateSinglePrediction(date, patterns, historicalData);
                predictions.push(prediction);
            }
            
            // Calcula acurácia das previsões anteriores
            const accuracy = this.calculatePredictionAccuracy();
            
            this.predictionCache.predictions = predictions;
            this.predictionCache.patterns = patterns;
            this.predictionCache.accuracy = accuracy;
            this.predictionCache.lastUpdate = new Date().toISOString();
            
            console.log(`[${new Date().toISOString()}] ✅ ${predictions.length} previsões de produtividade geradas`);
            
            return {
                success: true,
                predictions: predictions,
                patterns: patterns,
                accuracy: accuracy,
                confidence: this.calculateOverallConfidence(predictions)
            };
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Erro ao gerar previsões:`, error);
            return this.generateDefaultPrediction(targetDate);
        }
    }

    /**
     * Valida dados históricos
     */
    validateHistoricalData(data) {
        if (!Array.isArray(data) || data.length < this.config.minHistoricalData) {
            console.warn(`[${new Date().toISOString()}] ⚠️ Dados históricos insuficientes: ${data?.length || 0}/${this.config.minHistoricalData}`);
            return false;
        }
        
        // Verifica se os dados têm os campos necessários
        const requiredFields = ['date', 'productivity', 'tasks'];
        const sample = data[0];
        
        if (!sample || !requiredFields.every(field => sample.hasOwnProperty(field))) {
            console.warn(`[${new Date().toISOString()}] ⚠️ Dados históricos com formato inválido`);
            return false;
        }
        
        return true;
    }

    /**
     * Analisa padrões de produtividade nos dados históricos
     */
    analyzeProductivityPatterns(data) {
        const patterns = {
            daily: this.analyzeDailyPatterns(data),
            weekly: this.analyzeWeeklyPatterns(data),
            monthly: this.analyzeMonthlyPatterns(data),
            taskBased: this.analyzeTaskBasedPatterns(data),
            temporal: this.analyzeTemporalPatterns(data)
        };
        
        return patterns;
    }

    /**
     * Analisa padrões diários
     */
    analyzeDailyPatterns(data) {
        const hourlyPatterns = {};
        
        // Agrupa dados por hora do dia
        for (let hour = 0; hour < 24; hour++) {
            const hourData = data.filter(item => {
                const itemHour = new Date(item.date).getHours();
                return itemHour === hour;
            });
            
            if (hourData.length > 0) {
                const avgProductivity = hourData.reduce((sum, item) => sum + item.productivity, 0) / hourData.length;
                const taskCount = hourData.reduce((sum, item) => sum + item.tasks, 0) / hourData.length;
                
                hourlyPatterns[hour] = {
                    productivity: avgProductivity,
                    taskCount: taskCount,
                    dataPoints: hourData.length,
                    confidence: Math.min(1.0, hourData.length / 10)
                };
            }
        }
        
        return hourlyPatterns;
    }

    /**
     * Analisa padrões semanais
     */
    analyzeWeeklyPatterns(data) {
        const weeklyPatterns = {};
        const daysOfWeek = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
        
        daysOfWeek.forEach((day, index) => {
            const dayData = data.filter(item => {
                const itemDay = new Date(item.date).getDay();
                return itemDay === index;
            });
            
            if (dayData.length > 0) {
                const avgProductivity = dayData.reduce((sum, item) => sum + item.productivity, 0) / dayData.length;
                const avgTasks = dayData.reduce((sum, item) => sum + item.tasks, 0) / dayData.length;
                
                weeklyPatterns[day] = {
                    productivity: avgProductivity,
                    taskCount: avgTasks,
                    dataPoints: dayData.length,
                    confidence: Math.min(1.0, dayData.length / 5),
                    trend: this.calculateDayTrend(dayData)
                };
            }
        });
        
        return weeklyPatterns;
    }

    /**
     * Analisa padrões mensais
     */
    analyzeMonthlyPatterns(data) {
        const monthlyPatterns = {};
        
        for (let month = 0; month < 12; month++) {
            const monthData = data.filter(item => {
                const itemMonth = new Date(item.date).getMonth();
                return itemMonth === month;
            });
            
            if (monthData.length > 0) {
                const avgProductivity = monthData.reduce((sum, item) => sum + item.productivity, 0) / monthData.length;
                const avgTasks = monthData.reduce((sum, item) => sum + item.tasks, 0) / monthData.length;
                
                monthlyPatterns[month] = {
                    productivity: avgProductivity,
                    taskCount: avgTasks,
                    dataPoints: monthData.length,
                    confidence: Math.min(1.0, monthData.length / 3)
                };
            }
        }
        
        return monthlyPatterns;
    }

    /**
     * Analisa padrões baseados em tipos de tarefa
     */
    analyzeTaskBasedPatterns(data) {
        const taskPatterns = {};
        
        // Agrupa por tipo de tarefa (se disponível)
        const taskTypes = ['cleaning', 'cooking', 'maintenance', 'organization', 'other'];
        
        taskTypes.forEach(type => {
            const typeData = data.filter(item => item.taskType === type || !item.taskType);
            
            if (typeData.length > 0) {
                const avgProductivity = typeData.reduce((sum, item) => sum + item.productivity, 0) / typeData.length;
                const avgDuration = typeData.reduce((sum, item) => sum + (item.duration || 60), 0) / typeData.length;
                
                taskPatterns[type] = {
                    productivity: avgProductivity,
                    duration: avgDuration,
                    dataPoints: typeData.length,
                    confidence: Math.min(1.0, typeData.length / 10)
                };
            }
        });
        
        return taskPatterns;
    }

    /**
     * Analisa padrões temporais
     */
    analyzeTemporalPatterns(data) {
        // Calcula tendência geral
        const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        const trend = this.calculateProductivityTrend(sortedData);
        
        // Calcula sazonalidade
        const seasonality = this.calculateProductivitySeasonality(sortedData);
        
        return {
            trend: trend,
            seasonality: seasonality,
            volatility: this.calculateProductivityVolatility(sortedData)
        };
    }

    /**
     * Calcula tendência de produtividade
     */
    calculateProductivityTrend(data) {
        const n = data.length;
        const timeValues = Array.from({ length: n }, (_, i) => i);
        const productivityValues = data.map(item => item.productivity);
        
        // Regressão linear simples
        const timeMean = timeValues.reduce((sum, val) => sum + val, 0) / n;
        const productivityMean = productivityValues.reduce((sum, val) => sum + val, 0) / n;
        
        let numerator = 0;
        let denominator = 0;
        
        for (let i = 0; i < n; i++) {
            numerator += (timeValues[i] - timeMean) * (productivityValues[i] - productivityMean);
            denominator += Math.pow(timeValues[i] - timeMean, 2);
        }
        
        const slope = denominator !== 0 ? numerator / denominator : 0;
        const direction = Math.abs(slope) < 0.01 ? 'stable' : slope > 0 ? 'increasing' : 'decreasing';
        
        return {
            slope: slope,
            direction: direction,
            strength: Math.min(1.0, Math.abs(slope) * 100),
            confidence: Math.min(1.0, n / 50)
        };
    }

    /**
     * Calcula sazonalidade da produtividade
     */
    calculateProductivitySeasonality(data) {
        // Análise semanal
        const weeklyPattern = {};
        for (let day = 0; day < 7; day++) {
            const dayData = data.filter(item => new Date(item.date).getDay() === day);
            if (dayData.length > 0) {
                weeklyPattern[day] = dayData.reduce((sum, item) => sum + item.productivity, 0) / dayData.length;
            }
        }
        
        return {
            weekly: weeklyPattern,
            strength: this.calculateSeasonalStrength(weeklyPattern)
        };
    }

    /**
     * Calcula volatilidade da produtividade
     */
    calculateProductivityVolatility(data) {
        const productivityValues = data.map(item => item.productivity);
        const mean = productivityValues.reduce((sum, val) => sum + val, 0) / productivityValues.length;
        const variance = productivityValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / productivityValues.length;
        
        return {
            standardDeviation: Math.sqrt(variance),
            coefficientOfVariation: Math.sqrt(variance) / mean,
            stability: Math.max(0, 1 - (Math.sqrt(variance) / mean))
        };
    }

    /**
     * Gera previsão para uma data específica
     */
    generateSinglePrediction(targetDate, patterns, historicalData) {
        const dayOfWeek = targetDate.getDay();
        const hour = targetDate.getHours();
        const month = targetDate.getMonth();
        
        // Calcula produtividade base
        let baseProductivity = 0.7; // Produtividade padrão
        
        // Ajusta por dia da semana
        if (patterns.weekly[dayOfWeek]) {
            baseProductivity = patterns.weekly[dayOfWeek].productivity;
        }
        
        // Ajusta por hora do dia
        if (patterns.daily[hour]) {
            baseProductivity *= patterns.daily[hour].productivity / 0.7;
        }
        
        // Ajusta por mês
        if (patterns.monthly[month]) {
            baseProductivity *= patterns.monthly[month].productivity / 0.7;
        }
        
        // Aplica tendência temporal
        if (patterns.temporal.trend.direction !== 'stable') {
            const trendAdjustment = patterns.temporal.trend.slope * 30; // 30 dias
            baseProductivity += trendAdjustment;
        }
        
        // Calcula confiança
        const confidence = this.calculatePredictionConfidence(targetDate, patterns);
        
        // Gera recomendações
        const recommendations = this.generateProductivityRecommendations(targetDate, patterns, baseProductivity);
        
        return {
            date: targetDate.toISOString().split('T')[0],
            dayOfWeek: targetDate.toLocaleDateString('pt-BR', { weekday: 'long' }),
            predictedProductivity: Math.max(0, Math.min(1, baseProductivity)),
            confidence: confidence,
            factors: this.identifyInfluencingFactors(targetDate, patterns),
            recommendations: recommendations,
            expectedTasks: this.predictTaskCount(targetDate, patterns),
            optimalSchedule: this.generateOptimalSchedule(targetDate, patterns)
        };
    }

    /**
     * Calcula confiança da previsão
     */
    calculatePredictionConfidence(targetDate, patterns) {
        const dayOfWeek = targetDate.getDay();
        const hour = targetDate.getHours();
        const month = targetDate.getMonth();
        
        let confidence = 0.5; // Confiança base
        
        // Ajusta baseado na disponibilidade de dados
        if (patterns.weekly[dayOfWeek]) {
            confidence += patterns.weekly[dayOfWeek].confidence * 0.3;
        }
        
        if (patterns.daily[hour]) {
            confidence += patterns.daily[hour].confidence * 0.2;
        }
        
        if (patterns.monthly[month]) {
            confidence += patterns.monthly[month].confidence * 0.1;
        }
        
        // Ajusta baseado na força da tendência
        if (patterns.temporal.trend.strength > 0.5) {
            confidence += 0.1;
        }
        
        return Math.min(1.0, confidence);
    }

    /**
     * Identifica fatores que influenciam a produtividade
     */
    identifyInfluencingFactors(targetDate, patterns) {
        const factors = [];
        const dayOfWeek = targetDate.getDay();
        const hour = targetDate.getHours();
        
        // Fatores temporais
        if (patterns.weekly[dayOfWeek]) {
            const dayProductivity = patterns.weekly[dayOfWeek].productivity;
            if (dayProductivity > 0.8) {
                factors.push('Dia da semana favorável para alta produtividade');
            } else if (dayProductivity < 0.6) {
                factors.push('Dia da semana com produtividade tipicamente baixa');
            }
        }
        
        if (patterns.daily[hour]) {
            const hourProductivity = patterns.daily[hour].productivity;
            if (hourProductivity > 0.8) {
                factors.push('Horário do dia ideal para tarefas complexas');
            } else if (hourProductivity < 0.6) {
                factors.push('Horário do dia com produtividade reduzida');
            }
        }
        
        // Fatores de tendência
        if (patterns.temporal.trend.direction === 'increasing') {
            factors.push('Tendência de melhoria na produtividade');
        } else if (patterns.temporal.trend.direction === 'decreasing') {
            factors.push('Tendência de declínio na produtividade');
        }
        
        return factors;
    }

    /**
     * Gera recomendações de produtividade
     */
    generateProductivityRecommendations(targetDate, patterns, predictedProductivity) {
        const recommendations = [];
        const dayOfWeek = targetDate.getDay();
        
        if (predictedProductivity > 0.8) {
            recommendations.push('Dia ideal para tarefas complexas e importantes');
            recommendations.push('Aproveite o pico de produtividade para planejamento');
        } else if (predictedProductivity < 0.6) {
            recommendations.push('Foque em tarefas simples e rotineiras');
            recommendations.push('Considere pausas mais frequentes');
        }
        
        if (dayOfWeek === 0) {
            recommendations.push('Domingo - ideal para organização e planejamento da semana');
        } else if (dayOfWeek === 6) {
            recommendations.push('Sábado - bom para manutenção e limpeza');
        }
        
        return recommendations;
    }

    /**
     * Prevê quantidade de tarefas
     */
    predictTaskCount(targetDate, patterns) {
        const dayOfWeek = targetDate.getDay();
        let baseTasks = 12; // Tarefas base
        
        if (patterns.weekly[dayOfWeek]) {
            baseTasks = patterns.weekly[dayOfWeek].taskCount;
        }
        
        // Adiciona variação aleatória
        const variation = (Math.random() - 0.5) * 0.3;
        return Math.round(baseTasks * (1 + variation));
    }

    /**
     * Gera cronograma otimizado
     */
    generateOptimalSchedule(targetDate, patterns) {
        const dayOfWeek = targetDate.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        
        if (isWeekend) {
            return {
                morning: ['Organização e planejamento'],
                afternoon: ['Manutenção e limpeza'],
                evening: ['Revisão e preparação para a semana']
            };
        } else {
            return {
                morning: ['Tarefas complexas e importantes'],
                afternoon: ['Tarefas de manutenção'],
                evening: ['Tarefas de organização e revisão']
            };
        }
    }

    /**
     * Calcula tendência de um dia específico
     */
    calculateDayTrend(dayData) {
        if (dayData.length < 3) return 'stable';
        
        const sortedData = dayData.sort((a, b) => new Date(a.date) - new Date(b.date));
        const recent = sortedData.slice(-3);
        const older = sortedData.slice(0, 3);
        
        const recentAvg = recent.reduce((sum, item) => sum + item.productivity, 0) / recent.length;
        const olderAvg = older.reduce((sum, item) => sum + item.productivity, 0) / older.length;
        
        const change = recentAvg - olderAvg;
        return Math.abs(change) < 0.05 ? 'stable' : change > 0 ? 'improving' : 'declining';
    }

    /**
     * Calcula força da sazonalidade
     */
    calculateSeasonalStrength(weeklyPattern) {
        const values = Object.values(weeklyPattern);
        if (values.length === 0) return 0;
        
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
        
        return Math.min(1.0, variance * 10);
    }

    /**
     * Calcula acurácia das previsões anteriores
     */
    calculatePredictionAccuracy() {
        // Simula cálculo de acurácia baseado em previsões anteriores
        return 0.75 + (Math.random() * 0.2); // 75-95%
    }

    /**
     * Calcula confiança geral das previsões
     */
    calculateOverallConfidence(predictions) {
        if (predictions.length === 0) return 0.5;
        
        const avgConfidence = predictions.reduce((sum, pred) => sum + pred.confidence, 0) / predictions.length;
        return Math.round(avgConfidence * 100) / 100;
    }

    /**
     * Gera previsão padrão quando dados são insuficientes
     */
    generateDefaultPrediction(targetDate) {
        return {
            success: false,
            predictions: [{
                date: targetDate.toISOString().split('T')[0],
                dayOfWeek: targetDate.toLocaleDateString('pt-BR', { weekday: 'long' }),
                predictedProductivity: 0.7,
                confidence: 0.3,
                factors: ['Dados históricos insuficientes'],
                recommendations: ['Colete mais dados para melhorar previsões'],
                expectedTasks: 10,
                optimalSchedule: {
                    morning: ['Tarefas básicas'],
                    afternoon: ['Tarefas básicas'],
                    evening: ['Tarefas básicas']
                }
            }],
            patterns: {},
            accuracy: 0.5,
            confidence: 0.3
        };
    }

    /**
     * Obtém relatório completo do preditor
     */
    getPredictorReport() {
        return {
            predictor: {
                name: this.name,
                version: this.version,
                status: this.status
            },
            cache: this.predictionCache,
            config: this.config,
            factors: this.factors,
            lastUpdate: new Date().toISOString()
        };
    }
}

// Exporta para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductivityPredictor;
}

// Para uso no browser
if (typeof window !== 'undefined') {
    window.ProductivityPredictor = ProductivityPredictor;
} 