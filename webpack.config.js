const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/js/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    port: 2003,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
              outputPath: "images",
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: [
          "@webdiscus/pug-loader", // PugPlugin already contain the pug-loader
        ],
      },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Creates `style` nodes from JS strings
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/templates/index.pug"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/images/*.*"),
          to: "images/[name][ext]",
        },
      ],
    }),
  ],
};
