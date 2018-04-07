<h1 align="center">
  vuex-iframe-sync
</h1>
<p align="right" style="position:absolute;top:16px;right:28px;">
  中文 | <a href="https://github.com/L-Chris/vuex-iframe-sync/blob/master/README.md">English</a>
</p>
<p align="center"><strong>iframe和window</strong>间<strong>同步状态</strong>的解决方案</em></p>
<p align="center">
  <a href="https://travis-ci.org/L-Chris/vuex-iframe-sync">
    <img src="https://img.shields.io/travis/L-Chris/vuex-iframe-sync.svg" alt="build">
  </a>
  <a href="https://www.npmjs.com/package/vuex-iframe-sync">
    <img src="https://img.shields.io/npm/v/vuex-iframe-sync.svg" alt="npm">
  </a>
  <a href="https://www.npmjs.com/package/vuex-iframe-sync">
    <img src="https://img.shields.io/npm/dm/vuex-iframe-sync.svg" alt="downloads">
  </a>
</p>
<p align="right"><em>Your star is the greatest encouragement to me.</em></p>

## ✨ 功能:

- 多个iframe和window间的双向状态同步
- iframe触发load事件时自动从父对象初始化状态
- 允许配置个性化的同步行为

## 🔧 需求

- [Vue.js](https://vuejs.org) (v2.0.0+)
- [Vuex](http://vuex.vuejs.org) (v2.1.0+)

**注意** window.postMessage对传送的数据有限制, 类似于JSON.parse()和JSON.stringfy()。若你遇到相关问题，可尝试给broadcast和transfer配置convert函数。
- [MDN window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
- [MDN Structured_clone_algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)


## 🔧 安装

### CDN

```bash
<script src="https://cdn.jsdelivr.net/npm/vuex-iframe-sync/dist/vuex-iframe-sync.umd.js"></script>
```

### NPM

```bash
npm install vuex-iframe-sync --save
```
### YARN

```bash
yarn add vuex-iframe-sync
```

## 📦 例子

- [live example](https://l-chris.github.io/vuex-iframe-sync/)
- [with webpack](https://github.com/L-Chris/vuex-iframe-sync/tree/develop/examples/with-webpack)
- [simple](https://github.com/L-Chris/vuex-iframe-sync/tree/develop/examples/simple)

## 📦 使用

```js
// 父对象的组件
<iframe id="frameId1"/>
<iframe id="frameId2"/>

// 父对象的store配置
import {broadcast} from 'vuex-iframe-sync'

export default new Vuex.store({
  // ...
  plugins: [
    broadcast('frameId1,frameId2')
  ]
})

// iframe的store配置
import {transfer} from 'vuex-iframe-sync'

export default new Vuex.store({
  // 与父对象相同的state和mutations配置
  plugins: [
    transfer()
  ]
})
```

## 🔧 API

### broadcast(ids: String, [options])

当父对象状态变更时，通过postMessage API传递给各个iframe。

`ids <String|Array>`: 以逗号分隔的iframeId或形如[{id: iframeId, origin: iframeOrigin}...]的数组

`options` : 下列属性用于配置父对象的个性化同步行为:
  - `convert <Function(payload)>`: 在传递给各个iframe前转换数据

### transfer([options])

当iframe自身状态变更时，通过postMessage API传递给父对象

`options` : 下列属性用于配置iframe的个性化同步行为:
  - `convert <Function(payload)>`: 在传递给父对象前转换数据
  - `created <Function(id, store, send)>`: 在iframe load事件后调用（id: iframe的id，store：自身的store，send<Function(type, payload)>：相当于parent.$store.commit，触发父对象中mutations）
  - `destroyed <Function(id, store, send)>`: 在iframe beforeunload事件后调用（id: iframe的id，store：自身的store，send<Function(type, payload)>：相当于parent.$store.commit，触发父对象中mutations）

## 开发、构建步骤
``` bash
# serve with with-webpack example at localhost:8080
npm run dev

# serve with simple example at localhost:8080
npm run dev:simple

# test with jest
npm run test

# build for production with minification
npm run build

# build for production with live example
npm run build:docs
```

## 🛣 进行中
- 个性化配置
  - 传递前转换数据 [√]
  - ...
- 基于jest的单元测试
- 精简版本

## 🥂 协议

[MIT](http://opensource.org/licenses/MIT)