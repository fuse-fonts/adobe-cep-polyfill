const polyfill = require("./index.testable.js");

function teardown() {
  window.__adobe_cep__ = void 0;
  window.cep = void 0;
}

describe("polyfill: environment", () => {
  test("window.cep is not defined already", () => {
    expect(window.cep).not.toBeDefined();
  });

  test("window.__adobe_cep__ is not defined already", () => {
    expect(window.__adobe_cep__).not.toBeDefined();
  });
});

describe("polyfill: __adobe_cep__", () => {
  beforeAll(() => polyfill());
  afterAll(() => teardown());

  test("is added to window as window.__adobe_cep__", () => {
    expect(window.__adobe_cep__).toBeDefined();
  });

});


describe("polyfill: cep", () => {
  beforeAll(() => polyfill());
  afterAll(() => teardown());

  test("is added to window as window.cep", () => {
    expect(window.cep).toBeDefined();
  });

});

