const { app, BrowserWindow, screen, ipcMain } = require("electron");
const fetch = require('electron-fetch').default || require('electron-fetch');

let appWin;

function createWindow() {
  const mainScreen = screen.getPrimaryDisplay();
  const { height } = mainScreen.size;

  appWin = new BrowserWindow({
    width: 700,
    height: height,
    title: "Bitcoin",
    resizable: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  appWin.loadURL(`file://${__dirname}/dist/browser/index.html`);

  appWin.on("closed", () => {
    appWin = null;
  });
}

app.on('ready', createWindow);

app.on('activate', function () {
  if (appWin === null) createWindow();
});

ipcMain.handle('request-bitcoin-data', async () => {
  try {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    const bitCoinData = await response.json();
    return bitCoinData;
  } catch (err) {
    console.error('Error fetching data: ', err.message);
    return { error: 'Failed to fetch data' };
  }
});
