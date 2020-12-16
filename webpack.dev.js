// 開発用webpack設定ファイル
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-cheap-source-map', // ソースマップの生成
})