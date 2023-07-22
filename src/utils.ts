import { open, readFile } from 'fs/promises';
import { createRequire } from 'module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const __dirname = dirname(fileURLToPath(import.meta.url));
export const require = createRequire(import.meta.url);
export const importJSON = (path: string) => require(join(__dirname, path));
export const loadFile = async (path: string) => await readFile(join(__dirname, path), 'utf8');
export const openFile = async (path: string, mode = 'r+') => await open(join(__dirname, path), mode);
export async function handleLines(path: string, cb: (line: string) => void) {
  const f = await openFile(path);
  for await (const chunk of f.readLines())
    cb(chunk.toString());
}
