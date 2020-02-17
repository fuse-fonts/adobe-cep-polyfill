
class NotImplemented extends Error {
  constructor(methodname, ...params) {
    super(...params);
    this.message = `${methodname} is not implemented.`
    this.fileName = "adobe-cep-interface/index.js";
  }
}


/**
 *
 * @param {*} hostEnvironment An override of the host environment.
 *    In a running plugin this can be accessed via CSInterface by calling new CSInterface().hostEnvironment
 * @param {*} extension The details of your extension
 */
export default function adobe_cep_polyfill(hostEnvironment, extension) {

  /**
   * the host environment we will use internally.
   * this is obtained by calling the following line in the console of an actual running plugin
   *
   *    JSON.stringify(new CSInterface().hostEnvironment, null, 2)
   *
   */
  const _hostEnvironment = Object.assign({

    appVersion: "20.0.6",
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

  const _extension = Object.assign({
    id: "your.extension",
  }, extension || null);

  const interface = "__adobe_cep__";

  if (!window.__adobe_cep__) {

    window.__adobe_cep__ = {
      addEventListener: function () {
        console.log("__adobe_cep__.addEventListener called")
      },
      autoThemeColorChange: function () {
        console.log("__adobe_cep__.autoThemeColorChange called")
      },
      closeExtension: function () {
        console.log("__adobe_cep__.closeExtension called")
      },
      dispatchEvent: function () {
        console.log("__adobe_cep__.dispatchEvent called")
      },
      dumpInstallationInfo: function () {
        console.log("__adobe_cep__.dumpInstallationInfo called")
      },
      evalScript: function (script, callback) {

        const functionName = script.split("(")[0];
        console.log("__adobe_cep__.evalScript called with", functionName);
        if (functionName in window) {
          eval(script)
            .then(result => {
              callback(result);
            });

        }
        else {
          console.warn(`evalScript "${functionName}" doesn't exist in this context.`);
        }
      },
      getCurrentApiVersion: function () {
        console.log("__adobe_cep__.getCurrentApiVersion called")
        return JSON.stringify({ minor: 2, micro: 1, major: 9 });
      },
      getCurrentImsUserId: function () {
        console.log("__adobe_cep__.getCurrentImsUserId called")
      },
      getExtensionId: function () {
        return _extension.id;
      },
      getExtensions: function () {
        console.log("__adobe_cep__.getExtensions called")
      },
      getHostCapabilities: function () {
        console.log("__adobe_cep__.getHostCapabilities called")
      },
      getHostEnvironment: function () {
        console.log("__adobe_cep__.getHostEnvironment called");
        return JSON.stringify(_hostEnvironment);
      },
      getMonitorScaleFactor: function () {
        console.log("__adobe_cep__.getMonitorScaleFactor called")
      },
      getNetworkPreferences: function () {
        console.log("__adobe_cep__.getNetworkPreferences called")
      },
      getScaleFactor: function () {
        return 1;
      },
      getSystemPath: function () {
        console.log("__adobe_cep__.getSystemPath called");
        return "Your Hard Drive/"
      },
      imsConnect: function () {
        console.log("__adobe_cep__.imsConnect called")
      },
      imsDisconnect: function () {
        console.log("__adobe_cep__.imsDisconnect called")
      },
      imsFetchAccessToken: function () {
        console.log("__adobe_cep__.imsFetchAccessToken called")
      },
      imsFetchAccounts: function () {
        console.log("__adobe_cep__.imsFetchAccounts called")
      },
      imsSetProxyCredentials: function () {
        console.log("__adobe_cep__.imsSetProxyCredentials called")
      },
      initResourceBundle: function () {
        console.log("__adobe_cep__.initResourceBundle called")
      },
      invokeAsync: function () {
        console.log("__adobe_cep__.invokeAsync called")
      },
      invokeSync: function () {
        console.log("__adobe_cep__.invokeSync called")
      },
      registerInvalidCertificateCallback: function () {
        console.log("__adobe_cep__.registerInvalidCertificateCallback called");
      },
      registerKeyEventsInterest: function () {
        console.log("__adobe_cep__.registerKeyEventsInterest called");
      },
      removeEventListener: function () {
        console.log("__adobe_cep__.removeEventListener called");
      },
      requestOpenExtension: function () {
        console.log("__adobe_cep__.requestOpenExtension called");
      },
      resizeContent: function () {
        console.log("__adobe_cep__.resizeContent called");
      },
      setScaleFactorChangedHandler: function () {
        console.log("__adobe_cep__.setScaleFactorChangedHandler called");
      },
      showAAM: function () {
        console.log("__adobe_cep__.showAAM called");
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