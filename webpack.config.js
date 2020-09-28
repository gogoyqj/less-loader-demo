const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'public',
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'head',
      template: 'public/index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: loaderContext => {
                const { context } = loaderContext;
                return {
                  paths: [
                    path.join(context, 'node_modules'),
                    path.join(process.cwd(), 'node_modules'),
                    process.cwd()
                  ]
                };
              }
            }
          }
        ]
      },
    ],
  },
};

