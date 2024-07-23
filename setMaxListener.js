const EventEmitter = require('events');

// Log stack traces when listeners exceed the limit
const originalAddListener = EventEmitter.prototype.addListener;

EventEmitter.prototype.addListener = function(event, listener) {
  const currentListeners = this.listenerCount(event);

  if (currentListeners + 1 > EventEmitter.defaultMaxListeners) {
    console.trace(`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${currentListeners + 1} ${event} listeners added to ${this.constructor.name}.`);
  }

  return originalAddListener.call(this, event, listener);
};

// Optionally, increase the limit if necessary
EventEmitter.defaultMaxListeners = 20;
