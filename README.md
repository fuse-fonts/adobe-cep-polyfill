# adobe-cep-polyfill
Polyfills the CEPEngine global variables―allowing your plugin to run in the browser.

# Installation

Available on NPM as `adobe-cep-polyfill`:

```
npm i adobe-cep-polyfill
```

# Usage



```
import polyfill from "adobe-cep-polyfill";

polyfill();

```

## Usage Details

`adobe-cep-polyfill` exports a function that when executed will polyfill `window.__adobe_cep__` and `window.cep`, if it's not defined. This means it is safe to call inside of your plugin without conflict―When executed within a CEP context, it will do nothing.

Note: The polyfill function should be executed before you instantiate `CSInterface`.


## Mocking ExtendScript / `evalScript`

Running this polyfill allows most of `CSInterace` methods to be called without an error. But, if your plugin is reliant on data returned from an `evalScript` call it may be stuck in some bad state.

To get around that, [the polyfill'd `evalScript` will check the `window` for a key matching your evalScript](https://github.com/fuse-fonts/adobe-cep-polyfill/blob/master/index.js#L111-L125).

This allows you to write functions that mock your host scripts. The functions should return Promises that resolve to JSON.stringified objects. Note: Returning promises helps us hook into the callback that is passed to evalScript.


##### Basic Example

``` js
import polyfill from "adobe-cep-polyfill";

polyfill();

const cs = new CSInterface();


// you can load this in a separate script file, and/or before instantiating CSInterface
// or however you please―as long as it is called before the cs.evalScript is called.
window.addTwoNumbers = (x, y) => {
  // needs to be a JSON stringifiedresult
  return new Promise(resolve => resolve(JSON.stringify({ result: x + y  })));
};

// ... some time later

cs.evalScript("addTwoNumbers(2, 3)", (response) => {
  const result = JSON.parse(response); // 5
});

```


##### Real World Example

You can view a real example here: [@Fuse Fonts/plugin.host-scripts.mjs](https://github.com/fuse-fonts/plugin/blob/master/public/scripts/host-scripts.mjs).

Context:
The Fuse Fonts plugin loads the list of fonts available on the device.
So, the mock function loads a list of fonts from Google Web Fonts instead.

Which powers this demo page: [Fuse Fonts Web Demo](https://fuse-fonts-demo.firebaseapp.com/)


## Advanced Usage

This polyfill is fairly approachable, and isn't doing anything complex.
You can view the source and get an idea of everything it's doing pretty quickly: [index.js](index.js)


# Contributing

## Tests

The tests focus is on being able to instantiate `CSInterface`, as well as call any methods.

### Tests setup

Before running tests we need to:
- transform our es6 module into a `require`-able common js format
- download `CSInterface.js` (from [Adobe CEP Resources repo](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_9.x/CSInterface.js))

These are both accomplished for you via:

```
npm run test:setup
```

### Running Tests

Run tests the standard npm package way:

```
npm run test
```