// 共通webpack設定ファイル
const path = require('path');
// 出力先をクリーンアップ
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/js/app.js', // エントリポイント
    output: {
        path: path.resolve(__dirname, 'public'), // 絶対パス必要
        filename: 'js/bundle.js' // 出力するファイルの名前
    },
    plugins: [
        // 上記outputで指定したディレクトリ以下をクリーンアップ
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!**.html'] // htmlは対象外
        })
    ]
}
