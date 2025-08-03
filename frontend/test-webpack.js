const webpack = require('webpack');
const config = require('./webpack.config.js');

webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error('❌ Erro no build webpack:', err || stats.toString());
    process.exit(1);
  }
  
  console.log('✅ Build webpack concluído com sucesso!');
  console.log(stats.toString({
    chunks: false,
    colors: true
  }));
});