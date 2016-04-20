import { UNIQUE } from './constants';

const wait = (fn) => setTimeout(fn, 0);

function pipe (main, renderer) {

  renderer._emitter.on(`${UNIQUE}-send`, function (channel, ...args) {
    wait(() => main._emitter.emit(`${UNIQUE}-receive`, channel, ...args));
  });

  main._emitter.on(`${UNIQUE}-send`, function (channel, ...args) {
    wait(() => renderer._emitter.emit(`${UNIQUE}-receive`, channel, ...args));
  });
}

export default pipe;
