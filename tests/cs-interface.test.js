global.window = window;
const CSInterface = require("./CSInterface.js");

const polyfill = require("./index.testable.js");

beforeAll(() => polyfill({ logToConsole: false, }));

test("can instantiate CSInterface", () => {
  expect(new CSInterface()).toEqual(expect.any(CSInterface));
})

describe("CSInterface method Safety", () => {

    const cs = new CSInterface();

    test("can call getHostEnvironment", () => {
      expect(() => cs.getHostEnvironment()).not.toThrow();
    });

    test("can call loadBinAsync", () => {
      expect(() => cs.loadBinAsync("fake/path")).not.toThrow();
    });

    test("can call loadBinSync", () => {
      expect(() => cs.loadBinSync("fake/path")).not.toThrow();
    });

    test("can call closeExtension", () => {
      expect(() => cs.closeExtension()).not.toThrow();
    });

    test("can call getSystemPath", () => {
      expect(() => cs.getSystemPath()).not.toThrow();
    });

    test("can call evalScript", () => {
      expect(() => cs.evalScript("fakeScript")).not.toThrow();
    });

    test("can call getApplicationID", () => {
      expect(() => cs.getApplicationID()).not.toThrow();
    });

    test("can call getHostCapabilities", () => {
      expect(() => cs.getHostCapabilities()).not.toThrow();
    });

    test("can call dispatchEvent", () => {
      expect(() => cs.dispatchEvent("fake")).not.toThrow();
    });

    test("can call addEventListener", () => {
      expect(() => cs.addEventListener("fake", () => {})).not.toThrow();
    });

    test("can call removeEventListener", () => {
      expect(() => cs.removeEventListener("fake", () => {})).not.toThrow();
    });

    test("can call requestOpenExtension", () => {
      expect(() => cs.requestOpenExtension()).not.toThrow();
    });

    test("can call getExtensions", () => {
      expect(() => cs.getExtensions()).not.toThrow();
    });

    test("can call getNetworkPreferences", () => {
      expect(() => cs.getNetworkPreferences()).not.toThrow();
    });

    test("can call initResourceBundle", () => {
      expect(() => cs.initResourceBundle()).not.toThrow();
    });

    test("can call dumpInstallationInfo", () => {
      expect(() => cs.dumpInstallationInfo()).not.toThrow();
    });

    test("can call getOSInformation", () => {
      expect(() => cs.getOSInformation()).not.toThrow();
    });

    test("can call openURLInDefaultBrowser", () => {
      expect(() => cs.getOSInformation()).not.toThrow();
    });

    test("can call getExtensionID", () => {
      expect(() => cs.getExtensionID()).not.toThrow();
    });

    test("can call getScaleFactor", () => {
      expect(() => cs.getScaleFactor()).not.toThrow();
    });

    test("can call setScaleFactorChangedHandler", () => {
      expect(() => cs.setScaleFactorChangedHandler()).not.toThrow();
    });

    test("can call getCurrentApiVersion", () => {
      expect(() => cs.getCurrentApiVersion()).not.toThrow();
    });

    test("can call setPanelFlyoutMenu", () => {
      expect(() => cs.setPanelFlyoutMenu("fake xml")).not.toThrow();
    });

    test("can call setPanelFlyoutMenu", () => {
      expect(() => cs.setPanelFlyoutMenu("fake xml")).not.toThrow();
    });

    test("can call updatePanelMenuItem", () => {
      expect(() => cs.updatePanelMenuItem("label", false, false)).not.toThrow();
    });

    test("can call setContextMenu", () => {
      expect(() => cs.setContextMenu("fake xml", () => {})).not.toThrow();
    });

    test("can call setContextMenuByJSON", () => {
      expect(() => cs.setContextMenuByJSON("fake json", () => {})).not.toThrow();
    });

    test("can call updateContextMenuItem", () => {
      expect(() => cs.updateContextMenuItem("menu item", false, false)).not.toThrow();
    });

    test("can call isWindowVisible", () => {
      expect(() => cs.isWindowVisible()).not.toThrow();
    });

    test("can call resizeContent", () => {
      expect(() => cs.resizeContent(100, 100)).not.toThrow();
    });

    test("can call registerInvalidCertificateCallback", () => {
      expect(() => cs.registerInvalidCertificateCallback(() => {})).not.toThrow();
    });

    test("can call setWindowTitle", () => {
      expect(() => cs.setWindowTitle("fake title")).not.toThrow();
    });

    test("can call getWindowTitle", () => {
      expect(() => cs.getWindowTitle()).not.toThrow();
    });

});

describe("CSInterface", () => {
  const cs = new CSInterface();

});


