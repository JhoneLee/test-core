import * as Chai from 'chai'
// 定义配置文件，将chai中的expect方法暴露在全局(window)中
declare global {
  interface Window {
    expect: Chai.ExpectStatic
  }
  var expect: Chai.ExpectStatic
}