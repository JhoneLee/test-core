// 将所有测试以及所有需要计算覆盖率的源码都 require 进来
// 利用webpack的require.context 获取测试文件的上下文
const tests = require.context('./', true, /\.spec\.tsx?$/)
// webpack的context有三个属性，
/*
    keys 获取所有模块的 名称
    resolve 获取所有模块的路径
    id 资源模块的唯一标识
*/
// context 对象本身是一个函数，当传入keys()中的一个的时候，就会执行这个模块
tests.keys().forEach(tests)

const sources = require.context('../src/', true, /\.tsx?$/)
// 执行各源代码
sources.keys().forEach(sources)