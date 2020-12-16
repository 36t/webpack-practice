// 共通webpack設定ファイル
const path = require('path');
// 出力先をクリーンアップ
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// htmlテンプレート
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/js/app.js', // エントリポイント①
    another: './src/js/another.js' //エントリポイント②
  },
  output: {
    path: path.resolve(__dirname, 'public'), // 絶対パス必要
    filename: 'js/[name].bundle.js' // 出力するファイルの名前([name]にentryポイントが入る。「.bundle.」ｊは無くても良い)
  },
  plugins: [
    // 上記outputで指定したディレクトリ以下をクリーンアップ
    new CleanWebpackPlugin(),
    // htmlテンプレートを指定
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      chunks: ['app'] // 読み込ませたいエントリポイント名を指定する
    }),
    // anotherの設定
    new HtmlWebpackPlugin({
      filename: 'another.html', // 出力するファイル名。何も指定していないとindex.html
      template: './src/html/another.html', // テンプレートの場所
      chunks: ['another'] // 読み込ませたいエントリポイント名を指定する
    })
  ],
  // ファイルの分割で指定。section5
  optimization: {
    splitChunks: {
      chunks: 'initial',// initial:静的にインポートしているモジュールが対象(要するに「import」の部分が分割の対象になる)
      name: 'vendor' // 分割して出力するファイルの名前
    }
  },
}
