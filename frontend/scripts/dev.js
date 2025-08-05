#!/usr/bin/env node

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.js');

const compiler = webpack(config);
const devServerOptions = {
  ...config.devServer,
  open: true,
  hot: true,
  historyApiFallback: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  }
};

const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log('🚀 Iniciando servidor de desenvolvimento DOM v2...');
  console.log('📱 React Native Web com Webpack');
  console.log('🌐 Acesse: http://localhost:3000');
  
  try {
    await server.start();
    console.log('✅ Servidor iniciado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

runServer(); 