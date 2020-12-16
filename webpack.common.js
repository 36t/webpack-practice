// 共通webpack設定ファイル
const path = require('path');

module.exports = {
    entry: './src/js/app.js', // エントリポイント
    output: {
        path: path.resolve(__dirname, 'public'), // 絶対パス必要
        filename: 'js/bundle.js' // 出力するファイルの名前
    }
}