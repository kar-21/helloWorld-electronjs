const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require("path");
const url = require("url");
const shell = require("electron").shell;

card = document.getElementById('card');
let kkCard;

card.addEventListener('click', () => {
  createNameCard();
})

createNameCard = () => {
  kkCard = new BrowserWindow({
    width: 300,
    height: 150,
    minWidth: 300,
    minHeight: 150,
    maxWidth: 300,
    maxHeight: 150,
    backgroundColor: "#b8b8b8",
    frame: false
  });
  kkCard.loadURL(
    url.format({
      pathname: path.join(__dirname, "../kkCard/kkCard.html"),
      protocol: "file",
      slashes: true
    })
  );
  kkCard.on("closed", () => {
    kkCard = null;
    console.log("Window closed");
  });
};

openFolder = document.getElementById("openFolder");

openFolder.addEventListener('click', () => {
  // shell.showItemInFolder('C:\\Users\\Documents\\Personal\\helloWorld-electronjs\\README.md');
  // shell.openFolder('C:\\Users\\M1053736\\Documents\\Personal\\helloWorld-electronjs')
  // shell.openItem('C:\\Users\\Documents\\Personal\\helloWorld-electronjs\\README.md');
  shell.openExternal('https://www.electronjs.org');
})