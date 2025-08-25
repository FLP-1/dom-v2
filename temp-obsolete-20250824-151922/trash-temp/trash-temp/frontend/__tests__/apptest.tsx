/**
 * @fileoverview Testes do componente principal App do DOM v2
 * @directory frontend/__tests__
 * @description Testes unitários para o componente App
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
