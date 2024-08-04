//webpack.config.js

const path = require('path');                   // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: { 
        main: './src/index.js'                  // Entry point - файл, с которого начинается сборка
    },  
    output: {
        path: path.resolve(__dirname, 'dist'),  // Путь к финальной директории
        filename: 'main.js',                    // Имя итогового файла
        publicPath: ''                          // Свойство обновления путей для CSS и HTML
    },
    mode: 'development',                        // Режим сборки - development - для разрабоки; production - для деплоя
    devServer: {
        static: path.resolve(__dirname, './dist'),  // путь, куда "смотрит" режим разработчика
        compress: true,                         // это ускорит загрузку в режиме разработки
        port: 8080,                             // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
        open: true                              // сайт будет открываться сам при запуске npm run dev
    },
    module: {
        // rules — это массив правил
        rules: [
            // добавим в него объект правил для бабеля
            {
                // регулярное выражение, которое ищет все js файлы
                test: /\.js$/,
                // при обработке этих файлов нужно использовать babel-loader
                use: 'babel-loader',
                // исключает папку node_modules, файлы в ней обрабатывать не нужно
                exclude: '/node_modules/'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // путь к файлу index.html
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ]
}
