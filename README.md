#react v16版本 适用框架探索

###技术栈
######   koa2 + react 16 + antd 3 + webpack 2

###一些新特性简介
###### 1、koa2 更简洁的语法。ctx取代koa的this更为优雅，async await es7语法支持，现阶段最优雅的异步转同步的解决方案
###### 2、react 16 fiber特性：不同事件拥有不同等级的渲染优先级，一定程度上提升渲染性能。
###### 3、react 16 render方法新增返回类型：string、number、boolean、null、portal、fragments（带有key属性的dom数组）
###### 4、react 16 传送门api：ReactDOM.createPortal 可以将组件渲染到我们想要的任意层级之中。主要应用场景为弹窗，写法更为独立优雅。
###### 5、react 16 setState传入null时不会再触发更新。
###### 6、webpack 支持es7、es6语法，主要应用为async await 语法支持。配合node实现前端代码热更新。