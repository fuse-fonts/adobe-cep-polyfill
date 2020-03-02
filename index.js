
class NotImplemented extends Error {
  constructor(methodname, ...params) {
    super(...params);
    this.message = `${methodname} is not implemented.`
    this.fileName = "adobe-cep-interface/index.js";
  }
}


/**
 * @param {*} options Optional key-values to alter polyfill functionality
 * @param {*} options.hostEnvironment An override of the host environment.
 *    In a running plugin this can be accessed via CSInterface by calling new CSInterface().hostEnvironment
 * @param {*} options.extension The details of your extension
 * @param {*} options.logToConsole The details of your extension
 */
export default function adobe_cep_polyfill({ hostEnvironment, logToConsole, extension }) {
  log = typeof log === "undefined" ? console.log : () => {};

  /**
   * the host environment we will use internally.
   * this is obtained by calling the following line in the console of an actual running plugin
   *
   *    JSON.stringify(new CSInterface().hostEnvironment, null, 2)
   *
   */
  const _hostEnvironment = Object.assign({

    appVersion: "21.1.0",
    appLocale: "en_US",
    isAppOnline: true,
    appUILocale: "en_US",
    appName: "PHXS",
    appId: "PHXS",

    appSkinInfo: {
      baseFontSize: 10,
      baseFontFamily: "Tahoma",
      systemHighlightColor: {
        alpha: 255,
        green: 120,
        blue: 215,
        red: 0
      },
      appBarBackgroundColorSRGB: {
        antialiasLevel: 0,
        type: 1,
        color: {
          alpha: 255,
          green: 50,
          blue: 50,
          red: 50
        }
      },
      appBarBackgroundColor: {
        antialiasLevel: 0,
        type: 1,
        color: {
          alpha: 255,
          green: 50,
          blue: 50,
          red: 50
        }
      },
      panelBackgroundColor: {
        antialiasLevel: 0,
        type: 1,
        color: {
          alpha: 255,
          green: 50,
          blue: 50,
          red: 50
        }
      },
      panelBackgroundColorSRGB: {
        antialiasLevel: 0,
        type: 1,
        color: {
          alpha: 255,
          green: 50,
          blue: 50,
          red: 50
        }
      },
    }
  }, hostEnvironment || null);

  const dummyData = { dummy: "data", };

  const _extension = Object.assign({
    id: "your.extension",
  }, extension || null);

  if (!window.__adobe_cep__) {

    window.__adobe_cep__ = {
      addEventListener: function () {
        log("__adobe_cep__.addEventListener called");
      },
      autoThemeColorChange: function () {
        log("__adobe_cep__.autoThemeColorChange called");
      },
      closeExtension: function () {
        log("__adobe_cep__.closeExtension called");
      },
      dispatchEvent: function () {
        log("__adobe_cep__.dispatchEvent called");
      },
      dumpInstallationInfo: function () {
        log("__adobe_cep__.dumpInstallationInfo called");
      },
      loadSnapshot: function() {
        log("__adobe_cep__.loadSnapshot called");
      },

      evalScript: function (script, callback) {

        const functionName = script.split("(")[0];
        log("__adobe_cep__.evalScript called with", functionName);
        if (functionName in window) {
          eval(script)
            .then(result => {
              callback(result);
            });

        }
        else {
          log(`evalScript "${functionName}" doesn't exist in this context.`);
        }
      },
      getCurrentApiVersion: function () {
        log("__adobe_cep__.getCurrentApiVersion called");
        return JSON.stringify({ minor: 2, micro: 1, major: 9 });
      },
      getCurrentImsUserId: function () {
        log("__adobe_cep__.getCurrentImsUserId called");
      },
      getExtensionId: function () {
        return _extension.id;
      },
      getExtensions: function () {
        log("__adobe_cep__.getExtensions called");
        return JSON.stringify([]);
      },
      getHostCapabilities: function () {
        log("__adobe_cep__.getHostCapabilities called");
        return JSON.stringify(dummyData);
      },
      getHostEnvironment: function () {
        log("__adobe_cep__.getHostEnvironment called");
        return JSON.stringify(_hostEnvironment);
      },
      getMonitorScaleFactor: function () {
        log("__adobe_cep__.getMonitorScaleFactor called");
      },
      getNetworkPreferences: function () {
        log("__adobe_cep__.getNetworkPreferences called");
        return JSON.stringify(dummyData);
      },
      getScaleFactor: function () {
        return 1;
      },
      getSystemPath: function () {
        log("__adobe_cep__.getSystemPath called");
        return "Your Hard Drive/"
      },
      imsConnect: function () {
        log("__adobe_cep__.imsConnect called");
      },
      imsDisconnect: function () {
        log("__adobe_cep__.imsDisconnect called");
      },
      imsFetchAccessToken: function () {
        log("__adobe_cep__.imsFetchAccessToken called");
      },
      imsFetchAccounts: function () {
        log("__adobe_cep__.imsFetchAccounts called");
      },
      imsSetProxyCredentials: function () {
        log("__adobe_cep__.imsSetProxyCredentials called");
      },
      initResourceBundle: function () {
        log("__adobe_cep__.initResourceBundle called");
        return JSON.stringify(dummyData);

      },
      invokeAsync: function () {
        log("__adobe_cep__.invokeAsync called");
      },
      invokeSync: function () {
        log("__adobe_cep__.invokeSync called");
      },
      registerInvalidCertificateCallback: function () {
        log("__adobe_cep__.registerInvalidCertificateCallback called");
      },
      registerKeyEventsInterest: function () {
        log("__adobe_cep__.registerKeyEventsInterest called");
      },
      removeEventListener: function () {
        log("__adobe_cep__.removeEventListener called");
      },
      requestOpenExtension: function () {
        log("__adobe_cep__.requestOpenExtension called");
      },
      resizeContent: function () {
        log("__adobe_cep__.resizeContent called");
      },
      setScaleFactorChangedHandler: function () {
        log("__adobe_cep__.setScaleFactorChangedHandler called");
      },
      showAAM: function () {
        log("__adobe_cep__.showAAM called");
      },
    };

  }

  // the main functions of window.cep are within cep.util and cep.fs
  // cep.process and cep.encoding might be more used by other plugins, and thus may need better support
  if (!window.cep) {
    const fs = {
      toString: () => "fs",
      ERR_CANT_READ: 4,
      ERR_CANT_WRITE: 6,
      ERR_FILE_EXISTS: 10,
      ERR_INVALID_PARAMS: 2,
      ERR_NOT_DIRECTORY: 9,
      ERR_NOT_FILE: 8,
      ERR_NOT_FOUND: 3,
      ERR_OUT_OF_SPACE: 7,
      ERR_UNKNOWN: 1,
      ERR_UNSUPPORTED_ENCODING: 5,
      NO_ERROR: 0,
      chmod: () => new NotImplemented("fs.chmod"),
      deleteFile: () => new NotImplemented("fs.deleteFile"),
      makedir: () => new NotImplemented("fs.makedir"),
      readFile: () => new NotImplemented("fs.readFile"),
      readdir: () => new NotImplemented("fs.readdir"),
      rename: () => new NotImplemented("fs.rename"),
      showOpenDialog: () => new NotImplemented("fs.showOpenDialog"),
      showOpenDialogEx: () => new NotImplemented("fs.showOpenDialogEx"),
      showSaveDialogEx: () => new NotImplemented("fs.showSaveDialogEx"),
      stat: () => new NotImplemented("fs.stat"),
      writeFile: () => new NotImplemented("fs.writeFile")
    };

    const process = {};

    const util = {
      DEPRECATED_API: 202,
      ERR_INVALID_URL: 201,
      openURLInDefaultBrowser: (url) => window.open(url, "blank"),
      registerExtensionUnloadCallback: () => new NotImplemented("util.registerExtensionUnloadCallback"),
      storeProxyCredentials: () => new NotImplemented("util.storeProxyCredentials"),
    };
    const encoding = {};

    window.cep = { encoding, fs, process, util, };
  }

};
