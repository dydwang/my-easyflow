module.exports = {
    publicPath: './',
    outputDir: 'pm2_web_package',
    assetsDir: 'static',
    // build: {
    //     index: './public'
    // },
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        overlay: {
            warnings: false,
            errors: true
        },
        proxy:{
            '^/api': {
                target: 'http://127.0.0.1:10005',
                pathRewrite:{
                    '/api':''
                }
            }
        }
    },
}