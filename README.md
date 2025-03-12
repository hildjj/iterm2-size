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

## Testing

This library is difficult to test on GitHub actions, since GHA doesn't run
iTerm2.  CI just checks that eslint and typescript are happy.
