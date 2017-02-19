/**
 * Post model events
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var Post = require('./post.model');
var PostEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
PostEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Post.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    PostEvents.emit(event + ':' + doc._id, doc);
    PostEvents.emit(event, doc);
  };
}

exports['default'] = PostEvents;
module.exports = exports['default'];
//# sourceMappingURL=post.events.js.map
