const path = require('path'); // nodejsのパッケージ

module.exports = {
    mode: 'development', // 操作早い、sourcemap作ってくれる。他にproductionがある
    entry: './src/js/app.js', // エントリポイント
    output: {
        path: path.resolve(__dirname, 'public'), //絶対パスの指定が必要で、pathを利用するとこの記述になる
        filename: 'js/bundle.js' // 出力するファイルの名前
    }
}