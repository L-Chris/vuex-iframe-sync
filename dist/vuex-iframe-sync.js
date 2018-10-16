var t=Object.prototype.toString,e=function(){},i=function(t){return t};function r(e){return function(i){return t.call(i)==="[object "+e+"]"}}var n=r("Function"),o=r("Array");var s="VI_SYNC",a="CHILD_",d="PARENT_",c=function(t){var e=t.el,i=t.origin;this.id=t.id,this.el=e,this.origin=i||"*"};c.prototype.update=function(t,e){this.el&&this.el.contentWindow.postMessage({type:t,payload:e},this.origin)};var p=function(t){var r=t.parent,o=t.store,s=t.convert,a=t.created,d=t.destroyed;this.id=t.id,this.store=o,this.parent=r||window.parent,this.convert=n(s)?s:i,this.createdCallback=n(a)?a:e,this.destroyedCallback=n(d)?d:e,this.init()};p.prototype.init=function(){var t=this,e=this.id,i=this.store,r=i._mutations,n=p.parentPrefix,o=p.childPrefix;Object.entries(r).forEach(function(t){r[n+t[0]]=t[1]}),r[n+"INIT_STATE"]=[function(t){Object.assign(i.state,t)}],i.subscribe(function(i,r){var s=i.type,a=i.payload;s.indexOf(n)>=0||t.send(o+s,{id:e,payload:a})}),window.addEventListener("load",this.load.bind(this)),window.addEventListener("message",this.update.bind(this)),window.addEventListener("beforeunload",this.unLoad.bind(this))},p.prototype.update=function(t){var e=t.data,i=e.type,r=e.payload,n=this.store;(i&&Reflect.has(n._mutations,i)||"INIT_STATE"===i)&&n.commit(p.parentPrefix+i,r)},p.prototype.send=function(t,e){this.parent&&this.parent.postMessage({type:t,payload:this.convert(e)},this.parent.location&&this.parent.location.origin)},p.prototype.load=function(){this.send(p.moduleName+"/ADD_IN_BROADCAST_LIST",this.id),this.created()},p.prototype.unLoad=function(){this.send(p.moduleName+"/DEL_IN_BROADCAST_LIST",this.id),this.destroyed()},p.prototype.created=function(){this.createdCallback(this.id,this.store,this.send.bind(this))},p.prototype.destroyed=function(){this.destroyedCallback(this.id,this.store,this.send.bind(this))},p.moduleName="",p.parentPrefix="",p.childPrefix="";var u=function(t){var e=t.ids,r=t.store,s=t.convert;this.childs="string"==typeof e?e.split(",").map(function(t){return{id:t}}):o(e)?e:[],this.observerList=[],this.store=r,this.convert=n(s)?s:i,this.init()};u.prototype.addObserver=function(t){var e=this.childs.find(function(e){return e.id===t});if(e){var i=document.getElementById(t);if(i&&"IFRAME"===i.tagName){var r=new c({id:t,origin:e.origin,el:i});return this.observerList.push(r),this.notifyObserver(r,{type:"INIT_STATE",payload:function(t,e){void 0===e&&(e=[]);var i={};for(var r in t)e.indexOf(r)<0&&(i[r]=t[r]);return i}(this.store.state,[u.moduleName])}),r}}},u.prototype.deleteObserver=function(t){var e=this.observerList.map(function(t){return t.id}).indexOf(t);e>=0&&this.observerList.splice(e,1)},u.prototype.notifyObserver=function(t,e){t.update(e.type,this.convert(e.payload))},u.prototype.notifyObservers=function(t){for(var e=t.id,i=t.type,r=t.payload,n=0,o=this.observerList.filter(function(t){return t.id!==e});n<o.length;n+=1){this.notifyObserver(o[n],{type:i,payload:r})}},u.prototype.init=function(){var t,e=this,i=e.store._mutations,r=u.moduleName,n=u.childPrefix;e.store.registerModule(r,{namespaced:!0,mutations:(t={},t.ADD_IN_BROADCAST_LIST=function(t,i){e.addObserver(i)},t.DEL_IN_BROADCAST_LIST=function(t,i){e.deleteObserver(i)},t)}),Object.entries(i).forEach(function(t){var r=t[0];i[n+r]=t[1].map(function(t){return function(i){var n=i.id,o=i.payload;t(o),e.notifyObservers({id:n,type:r,payload:o})}})});var o=new RegExp("^("+n+"|"+r+")");e.store.subscribe(function(t,i){var r=t.type,n=t.payload;o.test(r)||e.notifyObservers({type:r,payload:n})}),window.addEventListener("message",this.update.bind(this))},u.prototype.update=function(t){var e=t.data,i=e.type,r=e.payload,n=this.store;i&&Reflect.has(n._mutations,i)&&n.commit(i,r)},u.moduleName="",u.parentPrefix="",u.childPrefix="";exports.broadcast=function(t,e){return void 0===e&&(e={}),function(i){var r=e.parentPrefix,n=e.childPrefix,o=e.convert;return u.moduleName=e.moduleName||s,u.parentPrefix=r||d,u.childPrefix=n||a,new u({ids:t,store:i,convert:o})}},exports.transfer=function(t){return void 0===t&&(t={}),function(e){var i=t.parentPrefix,r=t.childPrefix,n=t.convert,o=t.created,c=t.destroyed;return p.moduleName=t.moduleName||s,p.parentPrefix=i||d,p.childPrefix=r||a,new p({id:t.id||window.frameElement.id,store:e,convert:n,created:o,destroyed:c})}};
//# sourceMappingURL=vuex-iframe-sync.js.map