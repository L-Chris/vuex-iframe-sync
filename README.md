# vuex-iframe-sync

> sync state between parent and iframe

## Requirements

- [Vue.js](https://vuejs.org) (v2.0.0+)
- [Vuex](http://vuex.vuejs.org) (v2.0.0+)

## Installation

```bash
$ npm install vuex-iframe-sync
or
$ yarn add vuex-iframe-sync
```

## Usage

```js
// in component with iframe
<iframe id="frameId1"/>
<iframe id="frameId2"/>

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

// in iframe vuex store
import {wrapMutations, tranfer} from 'vuex-iframe-sync'

const vm = window.parent.vm

let config = {
  // ...
  mutations: {...},
  plugins: [
    tranfer(vm)
  ]
}
config.mutations = wrapMutations(vm, config.mutations)

const store = new Vuex.Store(config)
```

## API

### broadcast(id)

Send state changes payload to iframe through postMessage API while parent state change.

### wrapMutations(vm, mutations)


### transfer(vm)

Commit change to iframe's store while parent's state change.
Add message event to parent window, change iframe state in callback.

## License

[MIT](http://opensource.org/licenses/MIT)