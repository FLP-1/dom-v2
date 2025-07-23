/**
 * 📈 TREND ANALYZER - DOM v2
 * Analisador de tendências temporais e sazonais
 * Implementação: Semana 19-20 da Fase 5
 */

class TrendAnalyzer {
    constructor() {
        this.name = 'TrendAnalyzer';
        this.version = '1.0.0';
        this.status = 'active';
        
        // Configurações de análise
        this.config = {
            minDataPoints: 30,
            trendThreshold: 0.1,
            seasonalityPeriods: [7, 30, 90], // semanal, mensal, trimestral
            smoothingFactor: 0.3
        };
        
        // Cache de análises
        this.analysisCache = {
            trends: {},
            seasonality: {},
            anomalies: [],
            lastAnalysis: null
        };
    }

    /**
     * Analisa tendências nos dados fornecidos
     */
    analyzeTrends(data, timeField = 'date', valueField = 'value') {
        console.log(`[${new Date().toISOString()}] 📈 Analisando tendências em ${data.length} pontos de dados...`);
        
        if (data.length < this.config.minDataPoints) {
            console.warn(`[${new Date().toISOString()}] ⚠️ Dados insuficientes para análise (${data.length}/${this.config.minDataPoints})`);
            return this.generateDefaultAnalysis();
        }
        
        try {
            // Ordena dados por tempo
            const sortedData = data.sort((a, b) => new Date(a[timeField]) - new Date(b[timeField]));
            
            // Calcula tendência linear
            const linearTrend = this.calculateLinearTrend(sortedData, timeField, valueField);
            
            // Identifica sazonalidade
            const seasonality = this.analyzeSeasonality(sortedData, timeField, valueField);
            
            // Detecta anomalias
            const anomalies = this.detectAnomalies(sortedData, timeField, valueField);
            
            // Calcula métricas de qualidade
            const qualityMetrics = this.calculateQualityMetrics(sortedData, linearTrend);
            
            const analysis = {
                trend: linearTrend,
                seasonality: seasonality,
                anomalies: anomalies,
                quality: qualityMetrics,
                summary: this.generateTrendSummary(linearTrend, seasonality),
                recommendations: this.generateTrendRecommendations(linearTrend, seasonality),
                lastUpdate: new Date().toISOString()
            };
            
            this.analysisCache.trends = analysis;
            this.analysisCache.lastAnalysis = new Date().toISOString();
            
            console.log(`[${new Date().toISOString()}] ✅ Análise de tendências concluída`);
            
            return analysis;
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Erro na análise de tendências:`, error);
            return this.generateDefaultAnalysis();
        }
    }

    /**
     * Calcula tendência linear usando regressão simples
     */
    calculateLinearTrend(data, timeField, valueField) {
        const n = data.length;
        const timeValues = data.map((item, index) => index);
        const values = data.map(item => parseFloat(item[valueField]) || 0);
        
        // Calcula médias
        const timeMean = timeValues.reduce((sum, val) => sum + val, 0) / n;
        const valueMean = values.reduce((sum, val) => sum + val, 0) / n;
        
        // Calcula coeficientes da regressão
        let numerator = 0;
        let denominator = 0;
        
        for (let i = 0; i < n; i++) {
            numerator += (timeValues[i] - timeMean) * (values[i] - valueMean);
            denominator += Math.pow(timeValues[i] - timeMean, 2);
        }
        
        const slope = denominator !== 0 ? numerator / denominator : 0;
        const intercept = valueMean - slope * timeMean;
        
        // Calcula R² (coeficiente de determinação)
        const predictedValues = timeValues.map(t => slope * t + intercept);
        const ssRes = values.reduce((sum, val, i) => sum + Math.pow(val - predictedValues[i], 2), 0);
        const ssTot = values.reduce((sum, val) => sum + Math.pow(val - valueMean, 2), 0);
        const rSquared = ssTot !== 0 ? 1 - (ssRes / ssTot) : 0;
        
        // Determina direção da tendência
        const direction = Math.abs(slope) < this.config.trendThreshold ? 'stable' :
                         slope > 0 ? 'increasing' : 'decreasing';
        
        // Calcula força da tendência
        const strength = Math.min(1.0, Math.abs(slope) * 10);
        
        return {
            slope: slope,
            intercept: intercept,
            rSquared: rSquared,
            direction: direction,
            strength: strength,
            confidence: Math.min(1.0, rSquared * 0.8 + 0.2),
            equation: `y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`,
            prediction: this.generateTrendPrediction(slope, intercept, n, values[n - 1])
        };
    }

    /**
     * Analisa sazonalidade nos dados
     */
    analyzeSeasonality(data, timeField, valueField) {
        const seasonality = {};
        
        this.config.seasonalityPeriods.forEach(period => {
            if (data.length >= period * 2) {
                const seasonalPattern = this.calculateSeasonalPattern(data, timeField, valueField, period);
                seasonality[`${period}day`] = seasonalPattern;
            }
        });
        
        return seasonality;
    }

    /**
     * Calcula padrão sazonal para um período específico
     */
    calculateSeasonalPattern(data, timeField, valueField, period) {
        const values = data.map(item => parseFloat(item[valueField]) || 0);
        const seasonalIndices = new Array(period).fill(0);
        const seasonalCounts = new Array(period).fill(0);
        
        // Agrupa valores por posição no período
        for (let i = 0; i < values.length; i++) {
            const position = i % period;
            seasonalIndices[position] += values[i];
            seasonalCounts[position]++;
        }
        
        // Calcula médias sazonais
        const seasonalAverages = seasonalIndices.map((sum, i) => 
            seasonalCounts[i] > 0 ? sum / seasonalCounts[i] : 0
        );
        
        // Calcula média geral
        const overallMean = seasonalAverages.reduce((sum, val) => sum + val, 0) / period;
        
        // Calcula índices sazonais
        const seasonalIndicesNormalized = seasonalAverages.map(avg => 
            overallMean > 0 ? avg / overallMean : 1
        );
        
        // Identifica picos e vales
        const maxIndex = seasonalIndicesNormalized.indexOf(Math.max(...seasonalIndicesNormalized));
        const minIndex = seasonalIndicesNormalized.indexOf(Math.min(...seasonalIndicesNormalized));
        
        return {
            period: period,
            indices: seasonalIndicesNormalized,
            averages: seasonalAverages,
            peak: { position: maxIndex, value: seasonalIndicesNormalized[maxIndex] },
            valley: { position: minIndex, value: seasonalIndicesNormalized[minIndex] },
            strength: this.calculateSeasonalStrength(seasonalIndicesNormalized),
            confidence: this.calculateSeasonalConfidence(data.length, period)
        };
    }

    /**
     * Detecta anomalias nos dados
     */
    detectAnomalies(data, timeField, valueField) {
        const values = data.map(item => parseFloat(item[valueField]) || 0);
        const anomalies = [];
        
        if (values.length < 10) return anomalies;
        
        // Calcula estatísticas
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
        const stdDev = Math.sqrt(variance);
        
        // Define limite para anomalias (2 desvios padrão)
        const threshold = 2 * stdDev;
        
        // Identifica anomalias
        values.forEach((value, index) => {
            const deviation = Math.abs(value - mean);
            if (deviation > threshold) {
                anomalies.push({
                    index: index,
                    date: data[index][timeField],
                    value: value,
                    expected: mean,
                    deviation: deviation,
                    severity: deviation / stdDev,
                    type: value > mean ? 'high' : 'low'
                });
            }
        });
        
        return anomalies;
    }

    /**
     * Calcula métricas de qualidade da análise
     */
    calculateQualityMetrics(data, trend) {
        const values = data.map(item => parseFloat(item.value) || 0);
        const n = values.length;
        
        // Calcula erro médio absoluto
        const timeValues = Array.from({ length: n }, (_, i) => i);
        const predictedValues = timeValues.map(t => trend.slope * t + trend.intercept);
        const mae = values.reduce((sum, val, i) => sum + Math.abs(val - predictedValues[i]), 0) / n;
        
        // Calcula erro médio quadrático
        const mse = values.reduce((sum, val, i) => sum + Math.pow(val - predictedValues[i], 2), 0) / n;
        const rmse = Math.sqrt(mse);
        
        // Calcula erro percentual médio
        const mape = values.reduce((sum, val, i) => {
            const error = Math.abs((val - predictedValues[i]) / val);
            return sum + (isFinite(error) ? error : 0);
        }, 0) / n * 100;
        
        return {
            mae: mae,
            mse: mse,
            rmse: rmse,
            mape: mape,
            dataPoints: n,
            quality: this.assessQuality(rmse, trend.rSquared),
            reliability: Math.min(1.0, trend.rSquared * 0.7 + (n / 100) * 0.3)
        };
    }

    /**
     * Avalia qualidade da análise
     */
    assessQuality(rmse, rSquared) {
        if (rSquared > 0.8 && rmse < 0.1) return 'excellent';
        if (rSquared > 0.6 && rmse < 0.2) return 'good';
        if (rSquared > 0.4 && rmse < 0.3) return 'fair';
        return 'poor';
    }

    /**
     * Gera resumo da análise de tendências
     */
    generateTrendSummary(trend, seasonality) {
        const direction = trend.direction === 'increasing' ? 'crescente' :
                         trend.direction === 'decreasing' ? 'decrescente' : 'estável';
        
        const strength = trend.strength > 0.7 ? 'forte' :
                        trend.strength > 0.4 ? 'moderada' : 'fraca';
        
        const confidence = trend.confidence > 0.8 ? 'alta' :
                          trend.confidence > 0.6 ? 'média' : 'baixa';
        
        let summary = `Tendência ${direction} com força ${strength} e confiança ${confidence}.`;
        
        if (trend.rSquared > 0.6) {
            summary += ` O modelo explica ${(trend.rSquared * 100).toFixed(1)}% da variação nos dados.`;
        }
        
        if (Object.keys(seasonality).length > 0) {
            summary += ` Padrões sazonais identificados.`;
        }
        
        return summary;
    }

    /**
     * Gera recomendações baseadas na análise
     */
    generateTrendRecommendations(trend, seasonality) {
        const recommendations = [];
        
        if (trend.direction === 'increasing' && trend.strength > 0.5) {
            recommendations.push('Tendência positiva identificada - considere expandir atividades similares');
        } else if (trend.direction === 'decreasing' && trend.strength > 0.5) {
            recommendations.push('Tendência negativa identificada - revise estratégias para reverter declínio');
        }
        
        if (trend.confidence < 0.6) {
            recommendations.push('Baixa confiança na análise - colete mais dados para melhorar precisão');
        }
        
        Object.keys(seasonality).forEach(period => {
            const seasonal = seasonality[period];
            if (seasonal.strength > 0.3) {
                recommendations.push(`Padrão sazonal de ${period} detectado - aproveite picos de produtividade`);
            }
        });
        
        return recommendations.length > 0 ? recommendations : ['Continue monitorando para identificar padrões'];
    }

    /**
     * Gera previsão baseada na tendência
     */
    generateTrendPrediction(slope, intercept, currentIndex, currentValue) {
        const nextPeriods = [1, 7, 30]; // 1 dia, 1 semana, 1 mês
        const predictions = {};
        
        nextPeriods.forEach(periods => {
            const futureIndex = currentIndex + periods;
            const predictedValue = slope * futureIndex + intercept;
            const change = predictedValue - currentValue;
            const changePercent = currentValue > 0 ? (change / currentValue) * 100 : 0;
            
            predictions[`${periods}period`] = {
                value: Math.max(0, predictedValue),
                change: change,
                changePercent: changePercent,
                confidence: Math.max(0.1, 1 - (periods * 0.05)) // Diminui confiança com tempo
            };
        });
        
        return predictions;
    }

    /**
     * Calcula força da sazonalidade
     */
    calculateSeasonalStrength(indices) {
        const mean = indices.reduce((sum, val) => sum + val, 0) / indices.length;
        const variance = indices.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / indices.length;
        return Math.min(1.0, variance * 2);
    }

    /**
     * Calcula confiança da análise sazonal
     */
    calculateSeasonalConfidence(dataLength, period) {
        const cycles = Math.floor(dataLength / period);
        return Math.min(1.0, cycles / 3); // Mínimo 3 ciclos para confiança alta
    }

    /**
     * Gera análise padrão quando dados são insuficientes
     */
    generateDefaultAnalysis() {
        return {
            trend: {
                slope: 0,
                intercept: 0,
                rSquared: 0,
                direction: 'stable',
                strength: 0,
                confidence: 0.1,
                equation: 'y = 0x + 0',
                prediction: {}
            },
            seasonality: {},
            anomalies: [],
            quality: {
                mae: 0,
                mse: 0,
                rmse: 0,
                mape: 0,
                dataPoints: 0,
                quality: 'poor',
                reliability: 0.1
            },
            summary: 'Dados insuficientes para análise de tendências',
            recommendations: ['Colete mais dados para análise de tendências'],
            lastUpdate: new Date().toISOString()
        };
    }

    /**
     * Obtém relatório completo de análise
     */
    getAnalysisReport() {
        return {
            analyzer: {
                name: this.name,
                version: this.version,
                status: this.status
            },
            cache: this.analysisCache,
            config: this.config,
            lastUpdate: new Date().toISOString()
        };
    }
}

// Exporta para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TrendAnalyzer;
}

// Para uso no browser
if (typeof window !== 'undefined') {
    window.TrendAnalyzer = TrendAnalyzer;
} 