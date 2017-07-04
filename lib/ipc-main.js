import { EventEmitter } from 'events';
import Event from './event';
import { UNIQUE } from './constants';
import { removeNonProxyEvents } from './utils';

class ipcMain {
  constructor(pipe) {
    this._emitter = new EventEmitter();
    this._emitter.on(`${UNIQUE}-receive`, this._onReceiveFromRenderer.bind(this));
    this._emitter.on(`${UNIQUE}-receiveSync`, this._onReceiveFromRendererSync.bind(this));
    this.IS_MOCK = true;
  }

  _onReceiveFromRenderer(channel, ...args) {
    const e = new Event(this._emitter);
    this._emitter.emit(channel, e, ...args);
  }
  
  _onReceiveFromRendererSync(channel, ...args) {
    const e = new Event(this._emitter);
    this._emitter.emit(channel, e, ...args);
    return e.returnValue;
  }

  /**
   * Proxy all the EventEmitter methods defined in the IpcRenderer API.
   */
  on(...args) { this._emitter.on(...args); }
  once(...args) { this._emitter.once(...args); }
  removeListener(...args) { this._emitter.removeListener(...args); }
  removeAllListeners(...args) {
    if (args.length === 0) {
      // if removing all event listeners, don't clobber proxy events
      removeNonProxyEvents(this._emitter);
    } else {
      this._emitter.removeAllListeners(...args);
    }
  }
}

export default ipcMain;
