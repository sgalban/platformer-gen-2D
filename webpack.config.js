const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, "src/main"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: 'dist/',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.png'],
  },
  devtool: 'source-map',
  devServer: {
    port: 5660,
    static: path.resolve(__dirname),
  },
  mode: "none",
};
