import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

let script;
let listeners;

beforeEach(() => {
  vi.resetModules();
  vi.useFakeTimers();
  listeners = {};
  script = { addEventListener: vi.fn((event, callback) => { listeners[event] = callback; }) };
  vi.stubGlobal('document', { createElement: vi.fn(() => script), head: { appendChild: vi.fn() } });
  vi.stubGlobal('window', { location: { assign: vi.fn() }, open: vi.fn() });
});

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

describe('verified on-demand form widget', () => {
  it('loads only after a click, pins the script bytes and reuses the loaded widget', async () => {
    const { openTally, TALLY_EMBED_URL, TALLY_EMBED_INTEGRITY } = await import('../tally');
    expect(document.head.appendChild).not.toHaveBeenCalled();
    const pending = openTally('add_app');
    expect(script.src).toBe(TALLY_EMBED_URL);
    expect(script.integrity).toBe(TALLY_EMBED_INTEGRITY);
    expect(script.crossOrigin).toBe('anonymous');
    window.Tally = { openPopup: vi.fn() };
    listeners.load();
    await pending;
    await openTally('feedback');
    expect(document.head.appendChild).toHaveBeenCalledTimes(1);
    expect(window.Tally.openPopup).toHaveBeenLastCalledWith('5BjvlP', expect.objectContaining({ hiddenFields: { topic: 'feedback' } }));
    expect(window.location.assign).not.toHaveBeenCalled();
  });

  it('uses an already loaded widget without inserting another script', async () => {
    window.Tally = { openPopup: vi.fn() };
    const { openTally } = await import('../tally');
    await openTally('add_app');
    expect(document.createElement).not.toHaveBeenCalled();
    expect(window.Tally.openPopup).toHaveBeenCalledWith('5BjvlP', expect.objectContaining({ hiddenFields: { topic: 'add_app' } }));
  });

  it('opens the hosted form when integrity, CSP or network checks reject the widget', async () => {
    const { openTally } = await import('../tally');
    const pending = openTally('feedback & security');
    listeners.error();
    await pending;
    expect(window.location.assign).toHaveBeenCalledWith('https://tally.so/r/5BjvlP?topic=feedback%20%26%20security');
    expect(window.open).not.toHaveBeenCalled();
  });

  it('does not leave the user waiting when the script request stalls', async () => {
    const { openTally } = await import('../tally');
    const pending = openTally('add_app');
    await vi.advanceTimersByTimeAsync(3000);
    await pending;
    expect(window.location.assign).toHaveBeenCalledWith('https://tally.so/r/5BjvlP?topic=add_app');
  });

  it('falls back if the downloaded widget has no usable popup or throws', async () => {
    const { openTally } = await import('../tally');
    const pending = openTally('feedback');
    listeners.load();
    await pending;
    expect(window.location.assign).toHaveBeenCalledTimes(1);
    window.Tally = { openPopup: vi.fn(() => { throw new Error('Widget unavailable'); }) };
    await openTally('feedback');
    expect(window.location.assign).toHaveBeenCalledTimes(2);
  });
});
