import events from 'node:events';
import fs from 'node:fs';
import tty from 'node:tty';

/**
 * Size of the terminal, in pixels.
 */
export interface Rect {
  width: number;
  height: number;
}

/**
 * Adjust the size returned by a number of rows or columns.  Most commonly,
 * this will be used to reduce the number of rows by the number of lines
 * in the user's prompt, using {rows: -1}.
 */
export interface Adjustments {
  rows?: number;
  columns?: number;
}

/**
 * Get iterm2 window size.
 *
 * @param adjustments Adjust the returned size by this number of rows/columns.
 *   Defaults to {rows: 0, columns: 0}.
 * @returns Terminal size, in pixels.
 * @throws If not run in iTerm2 on Darwin.
 */
export async function getTerminalSize(
  adjustments: Adjustments = {}
): Promise<Rect> {
  if (process.platform !== 'darwin') {
    throw new Error(`Unsupported platform: "${process.platform}", must be "darwin"`);
  }

  if (process.env.TERM_PROGRAM !== 'iTerm.app') {
    throw new Error(`Unsupported terminal: "${process.env.TERM_PROGRAM}", must be "iTerm.app"`);
  }

  const {rows: arows = 0, columns: acols = 0} = adjustments;
  const read = fs.createReadStream('/dev/tty');
  const write = fs.createWriteStream('/dev/tty');
  await Promise.all([
    events.once(read, 'ready'),
    events.once(write, 'ready'),
  ]);
  // @ts-expect-error fd does so exist
  const ttr = new tty.ReadStream(read.fd); // Wrapper
  // Without raw mode, the response gets echoed to stdout
  ttr.setRawMode(true);
  // @ts-expect-error fd does so exist
  const ttw = new tty.WriteStream(write.fd);

  return new Promise(resolve => {
    ttr.on('data', d => {
      const {columns, rows} = ttw;

      // Resets terminal to cooked mode.  Ignore errors.
      ttr.destroy();
      ttw.destroy();

      // Parse result.  Only two numbers on older iTerm.
      const [height, width, scale = 1.0] = d
        .subarray(22, -2)
        .toString()
        .split(';')
        .map(n => parseFloat(n));

      resolve({
        width: width * (columns + acols) * scale,
        height: height * (rows + arows) * scale,
      });
    });
    // See: https://iterm2.com/documentation-escape-codes.html
    ttw.write('\x1b]1337;ReportCellSize\x07');
  });
}
