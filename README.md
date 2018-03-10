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

## Examples

- [live example](https://l-chris.github.io/page-test/)
- [with webpack](https://github.com/L-Chris/vuex-iframe-sync/tree/develop/examples/with-webpack)
- [simple](https://github.com/L-Chris/vuex-iframe-sync/tree/develop/examples/simple)

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

// in iframe's store.js
import {transfer} from 'vuex-iframe-sync'

export default new Vuex.store({
  // same state and mutations with parent
  plugins: [
    transfer()
  ]
})
```

## API

### broadcast(ids: String)

Send state changes payload to iframes through postMessage API while parent state change.

`ids <String>`: frameIds split by ','

### transfer([options])

Receive state changes from parent. Send state changes to parent while self state change.

`options` : The following options can be provided to configure the iframe behavior for your specific needs:
  - `created <Function(id, store, send)>`: call after iframe created. id: iframeId、store: this.store、send<Function(type, payload)>：parent.$store.commit
  - `destroyed <Function(id, store, send)>`: call after iframe destroyed. id: iframeId、store: this.store、send<Function(type, payload)>：parent.$store.commit


## Pending
- support iframes/window sync [√]
- initialization sync when iframe loaded [√]
- flexible configuration like hook
  - iframe's created destroyed hook configuration [√]
  - (pending...)
- live example [√]
- test
- @shim


## License

[MIT](http://opensource.org/licenses/MIT)