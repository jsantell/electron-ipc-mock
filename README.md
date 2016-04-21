electron-ipc-mock
=======

[![Build Status](http://img.shields.io/travis/jsantell/electron-ipc-mock.svg?style=flat-square)](https://travis-ci.org/jsantell/electron-ipc-mock)
[![Build Status](http://img.shields.io/npm/v/electron-ipc-mock.svg?style=flat-square)](https://www.npmjs.org/package/electron-ipc-mock)

Mock Communication for Electron's IPC

An API mimicking [Electron's](http://electron.atom.io/docs/latest/api/ipc-renderer/) [ipcMain](http://electron.atom.io/docs/latest/api/ipc-main/) and [ipcRenderer](http://electron.atom.io/docs/latest/api/ipc-renderer/). Swap out electron calls in your code in tests to access both mock renderer and main process IPC communication calls.

## Install

```
npm install electron-ipc-mock
```

## Usage

```js
const { ipcRenderer, ipcMain } = require('electron-ipc-mock');

ipcMain.on('request', function (e, ...args) {
  console.log(args[0]); // 'hello'
  e.sender.send('response', 'world');
});

ipcRenderer.on('response', function (...args) {
  console.log(args[0]); // 'world'
});

ipcRenderer.send('request', 'hello')
```

## Testing

```
npm test
```

## License

MIT License, Copyright (c) 2016 Jordan Santell
