const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
   mode: 'production',
   entry: path.resolve(__dirname, 'src/scripts', 'index.ts'),
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name][contenthash].bundle.js'
   },
   module: {
      rules: [
         {
            test: /\.html$/,
            use: 'html-loader'
         },
         {
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
         },
         {
            test: /\.css$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader'
            ]
         },
         {
            test: /\.(otf|ttf)$/,
            type: 'asset/resource',
            generator: {
               filename: 'assets/fonts/[name].[hash][ext][query]'
            }
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'src', 'index.html'),
         publicPath: './dist/'
      }),
      new MiniCssExtractPlugin({
         filename: 'css/[name][contenthash].bundle.css'
      })
   ],
   devServer: {
      static: {
         directory: path.resolve(__dirname, 'dist')
      },
      port: 3000,
      open: true,
      hot: true,
      compress: true
   },
   resolve: {
      modules: ['node_modules', path.resolve(__dirname, 'src')],
      extensions: ['.js', '.ts']
   }
}
