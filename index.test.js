const polyfill = require("./index.testable.js");

describe("__adobe_cep__", () => {

  const polyfilled = polyfill();

  test("is added to window as window.__adobe_cep__", () => {
    expect(window.__adobe_cep__).toBeDefined();
  });
})





