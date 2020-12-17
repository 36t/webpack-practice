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
    /* 以下2つを有効にすると、全て「bundle」がついてしまう
    filename: 'js/[name].bundle.js', // 出力するファイルの名前([name]にentryポイントが入る。「.bundle.」は無くても良い)
    chunkFilename: 'js/[name].js', // splitChunksの設定はこちらが優先される
    */
    filename: (pathData) => {
      // pathData.chunk.name：nameが入る。ここでは「app, another, vendor, vendor-modules」
      return pathData.chunk.name.search( /vendor/ ) > -1 ? 'js/[name].js': 'js/[name].[contenthash].js';
    },
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
  // ファイルの分割で指定
  optimization: {
    splitChunks: {
      chunks: 'initial',  // initial:静的にインポートしているモジュールが対象(要するに「import」の部分が分割の対象になる),
      cacheGroups: {
        // jqueryとvelocity-animateの出力設定
        vendor1: { // 「vendor」の名前は任意で良い。わかりやすい名前を
          test: /[\\/]node_modules[\\/]/, // jqueryとvelocity-animateはnode_modulesの下にあるのでこのように設定
          name: 'vendor' // 分割して出力するファイルの名前
        },
        // src/modules/greet.jsの出力設定
        vendorsModules: { // プロパティ名は任意で良い
          test: /[\\/]src[\\/]js[\\/]modules[\\/]/, // [\\\\/] <= 途中のスラッシュを書く場合 (普通に書くと、ウインドウズは動作しない)
           name: 'vendor-modules', // 分割して出力するファイルの名前
          minSize: 0, // 分割の対象となるモジュールの最小サイズ。デフォルトは30kb。今回めっちゃ小さいので
          minChunks: 2 // モジュールがいくつの場所で利用されていれば分割の対象とするか
        }
      }
    }
  },
}
