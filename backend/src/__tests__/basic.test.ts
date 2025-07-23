// Teste básico para validar configuração do Jest
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

describe('Configuração Básica', () => {
  test('Jest está funcionando corretamente', () => {
    expect(true).toBe(true);
  });

  test('Operações matemáticas básicas', () => {
    expect(2 + 2).toBe(4);
    expect(10 - 5).toBe(5);
    expect(3 * 4).toBe(12);
    expect(15 / 3).toBe(5);
  });

  test('Strings e arrays', () => {
    expect('DOM v2').toContain('DOM');
    expect(['a', 'b', 'c']).toHaveLength(3);
    expect(['a', 'b', 'c']).toContain('b');
  });
});

describe('Ambiente de Testes', () => {
  test('Variáveis de ambiente estão disponíveis', () => {
    expect(process.env.NODE_ENV).toBeDefined();
  });

  test('Configuração básica está funcionando', () => {
    expect(typeof console.log).toBe('function');
  });
}); 