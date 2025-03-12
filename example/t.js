/* eslint-disable no-console */
import {Jimp} from 'jimp';
import {getTerminalSize} from '../lib/index.js';

const {height, width} = await getTerminalSize({rows: -3, columns: -1});

const image = new Jimp({width, height, color: 'cyan'}).circle();
const b64 = await image.getBuffer('image/png');
process.stdout.write(`\x1b]1337;File=inline=1;:${b64.toString('base64')}\x07\n`);
