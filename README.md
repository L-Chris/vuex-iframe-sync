# vuex-iframe-sync

> Vuex state synchronization between iframe/window

## Requirements

- [Vue.js](https://vuejs.org) (v2.0.0+)
- [Vuex](http://vuex.vuejs.org) (v2.0.0+)

## Installation

```bash
$ npm install vuex-iframe-sync
or
$ yarn add vuex-iframe-sync
```

## Examples

- [with webpack](https://github.com/L-Chris/vuex-iframe-sync/tree/develop/examples/with-webpack)

## Usage

```js
// in parent's component with iframe
<iframe id="frameId"/>

// in parent's store.js
import {broadcast} from 'vuex-iframe-sync'

export default new Vuex.store({
  // ...
  plugins: [
    broadcast('frameId1,frameId2')
  ]
})

// in parent's entry js
window.vm = new Vue({
  //...
})

// in iframe's store.js
import {transfer} from 'vuex-iframe-sync'

export default new Vuex.store({
  // same state and mutations with parent
  plugins: [
    transfer(window.parent.vm)
  ]
})
```

## API

### broadcast(ids: String)

`ids <String>`: frameIds split by ','

Send state changes payload to iframes through postMessage API while parent state change.

### transfer(vm: Vue)

`vm <Vue>`: reference to parent's root instance.

Receive state changes from parent. Send state changes to parent while self state change.

## Pending
- support iframes/window sync [√]
- initialization sync when iframe loaded

## License

[MIT](http://opensource.org/licenses/MIT)