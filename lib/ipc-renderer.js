import { EventEmitter } from 'events';
import Event from './event';
import { UNIQUE } from './constants';

class IpcRenderer  {
  constructor(pipe) {
    this._emitter = new EventEmitter();

    this._emitter.on(`${UNIQUE}-receive`, this._onReceiveFromMain.bind(this));

    this.IS_MOCK = true;
  }

  send(channel, ...args) {
    this._emitter.emit(`${UNIQUE}-send`, channel, ...args);
  }

  // Not yet implemented
  sendSync(channel, ...args) {}

  // Not yet implemented
  sendToHost(channel, ...args) {}

  _onReceiveFromMain(channel, ...args) {
    const e = new Event(this._emitter);
    this._emitter.emit(channel, e, ...args);
  }

  /**
   * Proxy all the EventEmitter methods defined in the IpcRenderer API.
   */
  on(...args) { this._emitter.on(...args); }
  once(...args) { this._emitter.once(...args); }
  removeListener(...args) { this._emitter.removeListener(...args); }
  removeAllListeners(...args) { this._emitter.removeAllListeners(...args); }
}

export default IpcRenderer;
