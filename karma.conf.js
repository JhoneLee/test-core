const path = require('path');
module.exports = config => {
    config.set({
        // 在本地我们通常希望测试跑完之后 Karma 依然继续检测文件变化重跑，但在 CI 上则必须完成结束测试，否测 CI 会一直等待 Karma 直到超时
        singleRun: !!process.env.CI,
        // 配置浏览器
        browsers: process.env.CI ? ['Chrome', 'Firefox'] : ['Chrome'],
        // 植入全局变量就不必反复 import
        frameworks: ['mocha', 'chai'],
        // Karma 不认识 TypeScript 文件，我们得告诉它
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        // 测试用例入口文件
        files: ['./test/index.js'],
        // 让index.ts文件先用webpack转换一下
        preprocessors: {
        './test/index.js': ['webpack']
        },
        // reporters: ['nyan','coverage-istanbul'],
        // 指定报告插件
        reporters: ['progress','coverage-istanbul','html'],
        // 使用karma-webpack对typescript测试用例进行打包
        webpackMiddleware: {
            noInfo: true,
            stats: 'errors-only'
        },
        // 配置测试覆盖率报告
        coverageIstanbulReporter: process.env.CI
      ? {
          //text-summary 主要方便我们在命令行中看到统计
          // lcovonly 主要为了给其它工具使用，比如接下来要配置的 Coveralls。
          reports: ['lcovonly', 'text-summary'],
          dir: path.join(__dirname, 'coverage'),
          // 如果你的源码中有针对浏览器特性或坑的代码，那么每个浏览器测试出来的覆盖率可能会不一样，通过 combineBrowserReports 即可合并覆盖率
          combineBrowserReports: true,
          fixWebpackSourcePaths: true
        }
      : {
          //html: 可以 coverage/ 目录下浏览各个源代码的覆盖情况
          reports: ['html', 'lcovonly', 'text-summary'],
          // /%browser%/ 会自动分开生成各个浏览器的结果
          dir: path.join(__dirname, 'coverage/%browser%/'),
          fixWebpackSourcePaths: true,
          'report-config': {
            html: { outdir: 'html' }
          }
        },
        webpack: {
            mode: 'development',
            // entry: './/index.ts',
            // output: {
            //   filename: '[name].js'
            // },
            // devtool: 'inline-source-map',
            module: {
              // loader 执行优先级：pre > normal > inline > post
              // 相同优先级的 loader 执行顺序为：从右到左，从下到上
              rules: [
                // normal loader 
                {
                  test: /\.tsx?$/,
                  use: {
                    loader: 'ts-loader',
                    options: {
                      configFile: 'test/tsconfig.json'
                    }
                  },
                  exclude: [path.join(__dirname, 'node_modules')]
                },{
                  // post loader 
                  test: /\.tsx?$/,
                  include: [path.join(__dirname, 'src')],
                  enforce: 'post',
                  use: {
                    loader: 'istanbul-instrumenter-loader',
                    options: { esModules: true }
                  }
                }
              ]
            },
            resolve: {
              extensions: ['.tsx', '.ts', '.js', '.json']
            }
          }
    });
}