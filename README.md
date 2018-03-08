# vuex-iframe-sync

> Vuex state synchronization between iframe/window
<p align="right">Your star is the greatest encouragement to me. -- Author</p>

## Requirements

- [Vue.js](https://vuejs.org) (v2.0.0+)
- [Vuex](http://vuex.vuejs.org) (v2.0.0+)

**Note** Iframe.contentWindow.postMessage has limition on message, works like JSON.parse() and JSON.stringfy().
- [MDN window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
- [MDN Structured_clone_algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)


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
<iframe id="frameId1"/>
<iframe id="frameId2"/>

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

Send state changes payload to iframes through postMessage API while parent state change.

`ids <String>`: frameIds split by ','

### transfer(vm: Vue, [options])

Receive state changes from parent. Send state changes to parent while self state change.

`vm <Vue>` : reference to parent's root instance.

`options` : The following options can be provided to configure the iframe behavior for your specific needs:
  - `created <Function(id, store, $store)>`: call after iframe created. id: iframeId、store: this.store、$store: parent.store
  - `destroyed <Function(id, store, $store)>`: call after iframe destroyed. id: iframeId、store: this.store、$store: parent.store


## Pending
- support iframes/window sync [√]
- initialization sync when iframe loaded [√]
- flexible configuration like hook
  - iframe's created destroyed hook configuration [√]
  - (pending...)
- test
- live example

## License

[MIT](http://opensource.org/licenses/MIT)