const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let springProcess = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // If you want to open DevTools automatically during debugging, uncomment:
  // win.webContents.openDevTools();

  win.loadFile(path.join(__dirname, "dist", "index.html"));
}

app.whenReady().then(() => {
  // Path to your backend JAR
  const jarPath = path.join(process.resourcesPath, "app", "intCalc.jar");
  console.log("Launching backend from:", jarPath);

  // Launch Spring Boot JAR when Electron starts
  springProcess = spawn("java", ["-jar", jarPath], {
    cwd: __dirname,
    stdio: "inherit", // This pipes backend output to your console
  });

  // Debug/error handling for the Java process
  springProcess.on("error", (err) => {
    console.error("Failed to start backend:", err);
    dialog.showErrorBox(
      "Backend Error",
      `Java backend failed to start.\n${err.message}`
    );
  });

  springProcess.on("exit", (code, signal) => {
    console.log(`Backend exited: code=${code} signal=${signal}`);
    if (code !== 0) {
      dialog.showErrorBox(
        "Backend exited",
        `Java backend stopped unexpectedly.\nExit code: ${code} Signal: ${signal}`
      );
    }
  });

  createWindow();
});

app.on("window-all-closed", () => {
  // Kill the backend JAR process when closing Electron
  if (springProcess) springProcess.kill();
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
