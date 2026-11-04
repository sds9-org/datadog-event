import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const temporary = mkdtempSync(join(tmpdir(), 'datadog-package-'));
try {
  const packed = JSON.parse(
    execFileSync(
      'npm',
      [
        'pack',
        '--ignore-scripts',
        '--json',
        '--cache',
        join(temporary, 'cache'),
        '--pack-destination',
        temporary,
      ],
      {
        encoding: 'utf8',
      },
    ),
  );
  execFileSync('tar', ['-xzf', join(temporary, packed[0].filename), '-C', temporary]);
  symlinkSync(resolve('node_modules'), join(temporary, 'node_modules'), 'dir');
  const library = pathToFileURL(join(temporary, 'package/dist/index.js')).href;
  const result = spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `
    import assert from 'node:assert/strict';
    const library = await import(${JSON.stringify(library)});
    assert.equal(typeof library.CreateEvent, 'function');
    await assert.rejects(library.CreateEvent({requests: []}), /DATADOG_API_KEY is not set/);
    console.log('Library import and credential guard passed');
  `,
    ],
    { encoding: 'utf8', env: { PATH: process.env.PATH } },
  );
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const action = spawnSync(process.execPath, [join(temporary, 'package/dist/action/index.js')], {
    encoding: 'utf8',
    env: { PATH: process.env.PATH },
  });
  assert.equal(action.status, 1, action.stdout + action.stderr);
  assert.match(action.stdout + action.stderr, /Input required and not supplied: title/);
  console.log(
    'Packed library and GitHub Action execute correctly without credentials or network requests.',
  );
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
