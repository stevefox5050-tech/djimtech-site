import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const child = spawn('npm', ['run', 'dev'], {
  cwd: __dirname,
  shell: true,
  stdio: 'inherit'
});

child.on('error', (err) => { console.error(err); process.exit(1); });
