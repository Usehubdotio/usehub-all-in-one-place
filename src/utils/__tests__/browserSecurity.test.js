import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { TALLY_EMBED_INTEGRITY } from '../tally';

const root = new URL('../../../', import.meta.url);
const deployment = JSON.parse(readFileSync(new URL('vercel.json', root), 'utf8'));
const headers = new Map(deployment.headers.find((rule) => rule.source === '/(.*)').headers.map(({ key, value }) => [key.toLowerCase(), value]));
const policy = new Map(headers.get('content-security-policy').split(';').map((part) => part.trim().split(/\s+/)).filter(([name]) => name).map(([name, ...values]) => [name, values]));

describe('public browser security policy', () => {
  it('allows local scripts and only the pinned external widget, without inline execution', () => {
    expect(policy.get('script-src')).toEqual(["'self'", `'${TALLY_EMBED_INTEGRITY}'`]);
    expect(TALLY_EMBED_INTEGRITY).toMatch(/^sha384-[A-Za-z0-9+/]{64}$/);
    expect(policy.get('script-src-attr')).toEqual(["'none'"]);
    expect(headers.get('content-security-policy')).not.toContain('unsafe-eval');
  });

  it('blocks base-URL replacement, object embeds, framing and arbitrary form destinations', () => {
    for (const directive of ['base-uri', 'object-src', 'frame-ancestors', 'worker-src']) expect(policy.get(directive)).toEqual(["'none'"]);
    expect(policy.get('form-action')).toEqual(["'self'", 'https://tally.so']);
    expect(policy.get('frame-src')).toEqual(['https://tally.so']);
    expect(policy.get('connect-src')).not.toContain('https:');
    expect(headers.get('x-content-type-options')).toBe('nosniff');
    expect(headers.get('x-frame-options')).toBe('DENY');
  });

  it('keeps the entry page free of automatically loaded third-party or executable inline scripts', () => {
    const html = readFileSync(new URL('index.html', root), 'utf8');
    for (const [, attributes, contents] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
      const source = attributes.match(/\bsrc="([^"]+)"/);
      if (source) expect(source[1]).toMatch(/^\/src\//);
      else {
        expect(attributes).toContain('type="application/ld+json"');
        expect(() => JSON.parse(contents)).not.toThrow();
      }
    }
  });

  it('keeps build credentials read-only and checks production dependency advisories in CI', () => {
    const workflow = readFileSync(new URL('.github/workflows/quality-gate.yml', root), 'utf8');
    expect(workflow).toContain('contents: read');
    expect(workflow).toContain('persist-credentials: false');
    expect(workflow).toContain('npm audit --omit=dev --audit-level=high');
  });
});
