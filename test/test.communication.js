var chai = require('chai');
var expect = chai.expect;
var IpcMock = require('../');

describe('electron-ipc-mock', function () {
  beforeEach(function () {
    var mock = IpcMock();
    this.ipcRenderer = mock.ipcRenderer;
    this.ipcMain = mock.ipcMain;
  });

  it('can communicate asynchronously', function (done) {
    var ipcRenderer = this.ipcRenderer;
    var ipcMain = this.ipcMain;

    // Bind listener after sending request to ensure asyncness
    ipcRenderer.send('test-event', 1, null, 'hello');

    ipcMain.on('test-event', function (e, arg1, arg2, arg3) {
      expect(e).to.be.an.object;
      expect(arg1).to.be.equal(1);
      expect(arg2).to.be.equal(null);
      expect(arg3).to.be.equal('hello');

      // Bind listener after sending response to ensure asyncness
      e.sender.send('test-response', 'hello', 'world');
      ipcRenderer.on('test-response', function (e, arg1, arg2) {
        expect(e).to.be.an.object;
        expect(arg1).to.be.equal('hello');
        expect(arg2).to.be.equal('world');
        done();
      });
    });
  });
});
