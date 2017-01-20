const path = require('path')
const electron = require('electron')
const { app, BrowserWindow } = electron

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindows = null

// Icons App
//const iconBasePath = path.join(__dirname, 'assets', 'img')


// Create the browser window.
function createWindow() {
    //const APP_ICON_NAME = 'player.png'
    //const iconPath = path.join(iconBasePath, APP_ICON_NAME)

    // Window option
    let options = {
            width: 1200,
            height: 600,
            title: 'Functional Testing Tools', // Не будет рабoтать, если в `.html` есть тег `title`
            //icon: iconPath,
            webPreferences: {
                devTools: false, // По умолчанию — `true` для показа DevTools
            }
        }
        // Create Browser Window
    mainWindows = new BrowserWindow(options)

    // and load the index.html of the app.
    mainWindows.loadURL(`file://${__dirname}/index.html`)

    // Emitted when the window is closed.
    mainWindows.on('closed', (e) => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindows = null
    })

    let webContents = mainWindows.webContents

    // Open DevTools
    //webContents.openDevTools()
}

// This method will be called when Electron shas finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindows === null) {
        createWindow()
    }
})