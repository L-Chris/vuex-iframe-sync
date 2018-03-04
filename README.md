# vuex-iframe-sync

> vuex plugin: sync state between parent and iframe

## Requirements

- [Vue.js](https://vuejs.org) (v2.0.0+)
- [Vuex](http://vuex.vuejs.org) (v2.0.0+)

## Installation

```bash
$ npm install vuex-iframe-sync
or
yarn add vuex-iframe-sync
```

## Usage

```js
// in parent vuex store
import {broadcast} from 'vuex-iframe-sync'

const store = new Vuex.Store({
  // ...
  plugins: [
    broadcast('frameId1,frameId2')
  ]
})

// in main.js
window.vm = new Vue({
  //...
})

// in children(iframe) vuex store
import {wrapMutations, tranfer} from 'vuex-iframe-sync'

let config = {
  // ...
  mutations: {...},
  plugins: [
    tranfer(window.parent.vm)
  ]
}
config.mutations = wrapMutations(config.mutations)

const store = new Vuex.Store(config)
```