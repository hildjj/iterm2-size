import assert from 'node:assert';
import {getTerminalSize} from '../lib/index.js';
import test from 'node:test';

test('index', async() => {
  const sz = await getTerminalSize();
  assert(sz);
  assert.equal(typeof sz.height, 'number');
  assert.equal(typeof sz.width, 'number');
});
