import { UNIQUE } from './constants';

// Test whether an event is a proxy or not
export function isProxyEvent(name) {
  return name.indexOf(UNIQUE) === 0;
}

// get the registered events for a given emitter. Backwards-compatible with old Node versions.
export function getEventNames(emitter) {
  // eventNames was added in v6.0.0, use it if possible.
  if (emitter.eventNames && typeof emitter.eventNames === 'function') {
    return emitter.eventNames();
  }
  // if not...well, here's the fallback.
  return Object.keys(emitter._events);
}

export function removeNonProxyEvents(emitter) {
  getEventNames(emitter)
  .filter(name => !isProxyEvent(name))
  .forEach(name => {
    emitter.removeAllListeners(name)
  });
}
