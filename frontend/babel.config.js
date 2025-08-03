/**
 * @fileoverview Configuração do Babel para o frontend React Native do projeto DOM v2
 * @directory frontend
 * @description Define presets e configurações de transpilação para React Native
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { regenerator: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread'],
    ['@babel/plugin-proposal-nullish-coalescing-operator'],
    ['@babel/plugin-proposal-optional-chaining']
  ],
  env: {
    web: {
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
          },
          useBuiltIns: 'usage',
          corejs: 3
        }],
        '@babel/preset-react',
        '@babel/preset-typescript'
      ]
    }
  }
};
