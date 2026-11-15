import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { tallyFormUrl } from '../tally';

const root = fileURLToPath(new URL('../../../', import.meta.url));

function publishedSources(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '__tests__' || /\.(?:test|spec)\./.test(entry.name)) return [];
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) return publishedSources(filename);
    return /\.(?:jsx?|html|json|css)$/i.test(entry.name) ? [filename] : [];
  });
}

describe('public contact destinations', () => {
  it('keeps the removed Telegram contact and donation module out of sources and public assets', () => {
    const files = [path.join(root, 'index.html'), ...publishedSources(path.join(root, 'src')), ...publishedSources(path.join(root, 'public'))];
    const rejectedIdentity = /(?:t\.me\/|telegram\.me\/|@)usehub_manager\b/i;
    for (const filename of files) {
      const contents = readFileSync(filename, 'utf8');
      expect(contents, path.relative(root, filename)).not.toMatch(rejectedIdentity);
      expect(contents, path.relative(root, filename)).not.toMatch(/\b(?:SupportModal|WALLET_ETH|WALLET_SOL)\b|Support UseHub/);
    }
  });

  it('sends privacy and contact requests to the existing feedback form', () => {
    const url = new URL(tallyFormUrl('feedback'));
    expect(url.origin).toBe('https://tally.so');
    expect(url.pathname).toBe('/r/5BjvlP');
    expect(url.searchParams.get('topic')).toBe('feedback');
  });
});
