import IpcMain from './ipc-main';
import IpcRenderer from './ipc-renderer';
import pipe from './pipe';

module.exports = function () {
  const ipcRenderer = new IpcRenderer();
  const ipcMain = new IpcMain();
  pipe(ipcMain, ipcRenderer);
  return { ipcMain, ipcRenderer };
}
