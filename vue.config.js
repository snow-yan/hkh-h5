const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    // 区分打包环境与开发环境   
    publicPath: process.env.NODE_ENV === 'production' ? "" : './',  //  用用程序默认部署位置，‘/’根目录，存放子目录ex：‘/web/’
    outputDir: 'dist',  // 输出文件目录
    devServer: {
        proxy: {
            '/api': {
                target: 'https://test.hkhsc.com',
                // target: 'http://192.168.3.148:8086',
                secure: false,
                changeOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/assets/style/common.scss";`
            }
        }
    },
    productionSourceMap: false,
  
};