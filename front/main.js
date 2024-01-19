const { app, BrowserWindow, screen, ipcMain } = require("electron");
const fetch = require('electron-fetch').default || require('electron-fetch');

const path = require('path');
const url = require('url');

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


function createDetailsWindow(data) {
  console.log('Creando ventana de detalles con datos:', data);
  const detailsWindow = new BrowserWindow({
    width: 400,
    height: 600,
    title: "Title Bitcoin",
    resizable: false,
    parent: appWin,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  detailsWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/browser/index.html'),
    protocol: 'file',
    slashes: true,
    hash: '/details'
  }));

  detailsWindow.webContents.on('did-finish-load', () => {
    detailsWindow.webContents.send('details-data', data);
  });
}

app.on('ready', createWindow);

app.on('activate', function () {
  if (appWin === null) createWindow();
});

const sendBitcoinData = async () => {
  try {
    // Get data for the last two weeks

    const currentTimestampUTC = Date.now();
    const twoWeeksAgoTimestampUTC = Date.now() - 14 * 24 * 60 * 60 * 1000;

    // Request data for the last two weeks
    const responseTwoWeeks = await fetch(`https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=${twoWeeksAgoTimestampUTC}&end=${currentTimestampUTC}`);
    const bitCoinDataTwoWeeks = await responseTwoWeeks.json();

    // Send data to the renderer
    appWin.webContents.send('update-bitcoin-data', { twoWeeksData: bitCoinDataTwoWeeks });

    setTimeout(sendBitcoinData, 24 * 60 * 60 * 1000);
  } catch (err) {
    console.error('Error fetching data for the last two weeks: ', err);

    appWin.webContents.send('update-bitcoin-data', { error: `Failed to fetch data for the last two weeks: ${err.message || 'Unknown error'}` });
  }
};

// Create the main window and load the main URL
app.whenReady().then(async () => {

  // Start data request when the application starts
  sendBitcoinData();

  try {
    // Request data for today
    const responseToday = await fetch('https://api.coincap.io/v2/assets/bitcoin/history?interval=m1');
    const bitCoinDataToday = await responseToday.json();

    // Send data to the renderer
    appWin.webContents.send('update-bitcoin-today-data', { todayData: bitCoinDataToday });
  } catch (err) {
    console.error('Error fetching data: ', err.message);

    // Send error to the renderer
    appWin.webContents.send('update-bitcoin-today-data', { error: 'Failed to fetch data' });
  }


  // Repeat the request every minute for responseToday
  setInterval(async () => {
    try {
      // Request data for today
      const responseToday = await fetch('https://api.coincap.io/v2/assets/bitcoin/history?interval=m1');
      const bitCoinDataToday = await responseToday.json();

      // Send data to the renderer
      appWin.webContents.send('update-bitcoin-today-data', { todayData: bitCoinDataToday });
    } catch (err) {
      console.error('Error fetching data: ', err.message);

      // Send error to the renderer
      appWin.webContents.send('update-bitcoin-today-data', { error: 'Failed to fetch data' });
    }
  }, 60 * 1000);
});

ipcMain.on('open-details-window', (event, data) => {
  console.log('Recibido evento open-details-window con datos:', data);
  createDetailsWindow(data);
});
