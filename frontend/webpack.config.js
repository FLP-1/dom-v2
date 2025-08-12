const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-vector-icons/MaterialIcons': 'react-native-vector-icons/dist/MaterialIcons',
      'react-native-vector-icons/Ionicons': 'react-native-vector-icons/dist/Ionicons',
      'react-native-vector-icons/lib/create-icon-set': path.resolve(__dirname, 'src/shims/create-icon-set.tsx')
    }
  },
  module: {
    rules: [
      // Transpila especificamente react-native-vector-icons (contém JSX no node_modules)
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'node_modules/react-native-vector-icons')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-nullish-coalescing-operator'
            ]
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: (modulePath) => /node_modules/.test(modulePath) && !/node_modules[\\/]+react-native-vector-icons/.test(modulePath),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      // Suporte a fontes usadas por react-native-vector-icons
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][hash][ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'assets/[name].[hash].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    ...(process.env.ANALYZE === 'true' ? [new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false, reportFilename: 'bundle-report.html' })] : [])
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: 'single'
  },
  performance: isDev
    ? { hints: false }
    : { hints: 'warning', maxEntrypointSize: 256000, maxAssetSize: 256000 },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/api/v1': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  node: {
    __dirname: false,
    __filename: false
  }
};
