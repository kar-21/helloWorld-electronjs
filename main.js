console.log("main process started");

const electron = require("electron");
const path = require("path");
const url = require("url");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const globalShortcut = electron.globalShortcut;

let win;

createWindow = () => {
  win = new BrowserWindow({
    width: 400,
    height: 350,
    maxWidth: 800,
    maxHeight: 400,
    backgroundColor: "#d7d7d7",
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "./index/index.html"),
      protocol: "file",
      slashes: true
    })
  );

  win.on("closed", () => {
    win = null;
    console.log("Window closed");
  });

//   win.webContents.openDevTools();
};

app.on("ready", () => {
  createWindow();
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: `close`,
          click: () => {
            app.quit();
          }
        },
        { label: "Card Credits" }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "delete" }
      ]
    },
    {
      label: "Help",
      submenu: [
        {
          label: "About ElectronJS",
          click: () => {
            electron.shell.openExternal("https://www.electronjs.org/");
          },
          accelerator: "CmdOrCtrl + Shift + H"
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  const contextMenu = new Menu();
  contextMenu.append(
    new MenuItem({
      label: "said hello"
    })
  );
  contextMenu.append(
    new MenuItem({
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { role: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "delete" }
      ]
    })
  );

  win.webContents.on("context-menu", (e, params) => {
    contextMenu.popup(win, params.X, params.Y);
  });

  globalShortcut.register("Alt+C", () => {
    app.quit();
  });
});
/** On MAC You have to explesitly close the application */
app.on("will-quit", () => {
  globalShortcut.unregister();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
