const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'), //absolute path to RepoDir/src
  dist: path.join(__dirname, 'dist') //absolute path to RepoDir/dist
}

module.exports = {
  entry: [
    "./src/js/main.js",
    "./src/scss/main.scss",
  ],
  mode: "development",
  output: {
    path: path.join(__dirname, "/dist/"),
    filename: "js/index_bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            outputPath: "assets",
            publicPath: 'assets',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          //Note:- No wildcard is specified hence will copy all files and folders
          from: './src/assets', //Will resolve to RepoDir/src/assets 
          to: 'assets' //Copies all files from above dest to dist/assets
        }
      ]
    })
  ],
};
