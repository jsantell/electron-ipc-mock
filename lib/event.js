import { UNIQUE } from './constants';

class Event {
  constructor(ipcMainEmitter) {
    this.sender = {
      send: (channel, ...args) => ipcMainEmitter.emit(`${UNIQUE}-send`, channel, ...args),
    };
  }
}

export default Event;
