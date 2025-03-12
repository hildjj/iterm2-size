# iterm2-size

Get the size of the current [iTerm2](https://iterm2.com/) window, in pixels.
This might be useful for resizing images to fit, for example.

This library works ONLY if:

- You are on MacOS.
- You are using a relatively-modern version of iTerm2 that supports the
  [Report Cell Size](https://iterm2.com/documentation-escape-codes.html)
  escape code.
- iTerm2 is the controlling terminal for your process.

This will work even if stdin or stdout is redirected to/from a file or piped
to/from another process, which is why it was worth pulling this function out
into a separate library.

## Installation

```sh
npm install iterm2-size
```

## API

Full [API documentation](http://hildjj.github.io/iterm2-size/) is available.

Example:

```js
import {getTerminalSize} from '/iterm2-size';
const {height, width} = await getTerminalSize();
console.error();
```

---
[![Build Status](https://github.com/hildjj/iterm2-size/workflows/Tests/badge.svg)](https://github.com/hildjj/iterm2-size/actions?query=workflow%3ATests)
[![codecov](https://codecov.io/gh/hildjj/iterm2-size/graph/badge.svg?token=BQQOLQUR3V)](https://codecov.io/gh/hildjj/iterm2-size)
