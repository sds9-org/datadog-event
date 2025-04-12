import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../../');

// TypeDoc configuration
const config = {
  entryPoints: [path.join(projectRoot, 'src/index.ts')],
  out: path.join(projectRoot, 'docs/api'),
  name: 'Datadog Event API Documentation',
  theme: 'default',
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
  categorizeByGroup: true,
  readme: path.join(projectRoot, 'README.md'),
  githubPages: true,
  includeVersion: true,
};

export default config;