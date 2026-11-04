import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

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
  // Resolve through the package's public metadata, exactly as an installed consumer does.
  const consumer = join(temporary, 'consumer');
  mkdirSync(join(consumer, 'node_modules'), { recursive: true });
  symlinkSync(join(temporary, 'package'), join(consumer, 'node_modules/gh-datadog-event'), 'dir');
  symlinkSync(resolve('node_modules'), join(temporary, 'package/node_modules'), 'dir');
  writeFileSync(join(consumer, 'package.json'), JSON.stringify({ type: 'module' }));
  writeFileSync(
    join(consumer, 'consumer.ts'),
    `
    import { CreateEvent, type RequestEventParams, type CreateEventParams, type CreateEventResult } from 'gh-datadog-event';
    const request: RequestEventParams = { title: 'Offline consumer', text: 'Type checking only' };
    const params: CreateEventParams = { requests: [request] };
    const send: (params: CreateEventParams) => Promise<CreateEventResult[]> = CreateEvent;
    // @ts-expect-error Text is required by the published event request contract.
    const invalid: RequestEventParams = { title: 'Missing text' };
    void params; void send; void invalid;
  `,
  );
  writeFileSync(
    join(consumer, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        strict: true,
        noEmit: true,
        module: 'NodeNext',
        target: 'ES2022',
        types: [],
      },
      files: ['consumer.ts'],
    }),
  );
  execFileSync(
    process.execPath,
    [resolve('node_modules/typescript/bin/tsc'), '-p', join(consumer, 'tsconfig.json')],
    { encoding: 'utf8', cwd: consumer },
  );
  const result = spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `
    import assert from 'node:assert/strict';
    const library = await import('gh-datadog-event');
    assert.equal(typeof library.CreateEvent, 'function');
    await assert.rejects(library.CreateEvent({requests: []}), /DATADOG_API_KEY is not set/);
    console.log('Library import and credential guard passed');
  `,
    ],
    { encoding: 'utf8', cwd: consumer, env: { PATH: process.env.PATH } },
  );
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const action = spawnSync(process.execPath, [join(temporary, 'package/dist/action/index.js')], {
    encoding: 'utf8',
    env: { PATH: process.env.PATH },
  });
  assert.equal(action.status, 1, action.stdout + action.stderr);
  assert.match(action.stdout + action.stderr, /Input required and not supplied: title/);
  console.log(
    'Packed public exports, TypeScript declarations and GitHub Action validate without credentials or network requests.',
  );
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
