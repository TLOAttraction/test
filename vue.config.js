// 给路径配置别名
module.exports={
  configureWebpack:{
    resolve:{
      alias:{
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      },
    },
  },
  devServer:{
    open: true,
    host: 'localhost',
    port: 8080,
  },
  // 基本路径
  // publicPath: './',//注意新版本这里改成了publicpath
  // 生产环境是否生成 sourceMap 文件
  // productionSourceMap: false,
}