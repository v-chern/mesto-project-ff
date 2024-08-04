//webpack.config.js

const path = require('path');                   // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

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
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            {
                // применять это правило только к CSS-файлам
                test: /\.css$/,
                // при обработке этих файлов нужно использовать
                // MiniCssExtractPlugin.loader и css-loader
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    // для поддержки @import в css
                    options: { importLoaders: 1 }
                },
                'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // путь к файлу index.html
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ]
}
