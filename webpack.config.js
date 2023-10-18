const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js", // Путь к главному файлу JS
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js", // Имя выходного JS файла
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Расширение файлов для обработки CSS
        use: ["style-loader", "css-loader"], // Подключение стилей внутри JS файла
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Путь к главному файлу HTML
      filename: "index.html", // Имя выходного HTML файла
    }),
  ],
};
