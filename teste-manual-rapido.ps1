# Teste Manual Rapido - Controle de Orcamento
Write-Host "TESTE MANUAL RAPIDO - CONTROLE DE ORCAMENTO" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

Write-Host "`nINSTRUCOES PARA TESTE MANUAL:" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Yellow

Write-Host "`n1. INICIAR O APP:" -ForegroundColor Green
Write-Host "   npm run start-dev" -ForegroundColor White
Write-Host "   ou" -ForegroundColor White
Write-Host "   cd frontend; npm start" -ForegroundColor White

Write-Host "`n2. ABRIR NAVEGADOR:" -ForegroundColor Green
Write-Host "   Acesse: http://localhost:3000" -ForegroundColor White

Write-Host "`n3. TESTAR TELAS:" -ForegroundColor Green
Write-Host "   - Tela Principal: http://localhost:3000/budget" -ForegroundColor White
Write-Host "   - Tela de Criacao: http://localhost:3000/budget/create" -ForegroundColor White
Write-Host "   - Tela de Detalhes: http://localhost:3000/budget/[id]" -ForegroundColor White

Write-Host "`n4. CHECKLIST RAPIDO:" -ForegroundColor Green
Write-Host "   [ ] App inicia sem erros" -ForegroundColor White
Write-Host "   [ ] Tela principal carrega" -ForegroundColor White
Write-Host "   [ ] Botao '+ Novo' funciona" -ForegroundColor White
Write-Host "   [ ] Formulario de criacao aparece" -ForegroundColor White
Write-Host "   [ ] Validacao de campos funciona" -ForegroundColor White
Write-Host "   [ ] Orcamento e criado" -ForegroundColor White
Write-Host "   [ ] Lista mostra o orcamento" -ForegroundColor White
Write-Host "   [ ] Tela de detalhes funciona" -ForegroundColor White

Write-Host "`n5. DADOS DE TESTE:" -ForegroundColor Green
Write-Host "   Nome: 'Orcamento Teste'" -ForegroundColor White
Write-Host "   Valor: '1000.00'" -ForegroundColor White
Write-Host "   Categoria: 'Alimentacao'" -ForegroundColor White
Write-Host "   Data Inicio: Hoje" -ForegroundColor White
Write-Host "   Data Fim: Hoje + 30 dias" -ForegroundColor White

Write-Host "`n6. PROBLEMAS COMUNS:" -ForegroundColor Yellow
Write-Host "   - Se nao carregar: Verificar console (F12)" -ForegroundColor White
Write-Host "   - Se erro de modulo: npm install" -ForegroundColor White
Write-Host "   - Se porta ocupada: netstat -an | findstr :3000" -ForegroundColor White

Write-Host "`n7. COMANDOS UTEIS:" -ForegroundColor Green
Write-Host "   # Verificar se app esta rodando:" -ForegroundColor White
Write-Host "   netstat -an | findstr :3000" -ForegroundColor Gray
Write-Host "   " -ForegroundColor White
Write-Host "   # Verificar arquivos criados:" -ForegroundColor White
Write-Host "   ls frontend/src/screens/budget/" -ForegroundColor Gray
Write-Host "   " -ForegroundColor White
Write-Host "   # Limpar cache se necessario:" -ForegroundColor White
Write-Host "   npm cache clean --force" -ForegroundColor Gray

Write-Host "`n8. PROXIMOS PASSOS:" -ForegroundColor Green
Write-Host "   - Se tudo funcionar: Prosseguir para proxima funcionalidade" -ForegroundColor White
Write-Host "   - Se houver problemas: Verificar guia completo" -ForegroundColor White
Write-Host "   - Guia completo: guia-teste-manual-orcamento.md" -ForegroundColor White

Write-Host "`nTESTE MANUAL RAPIDO CONCLUIDO!" -ForegroundColor Green
Write-Host "Siga as instrucoes acima para testar as telas manualmente." -ForegroundColor Green 