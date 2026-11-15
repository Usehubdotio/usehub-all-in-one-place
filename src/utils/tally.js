const TALLY_FORM_ID = "5BjvlP";
export const TALLY_EMBED_URL = "https://tally.so/widgets/embed.js";
export const TALLY_EMBED_INTEGRITY = "sha384-nWr4l6rk7NcNDYGeXCRBBdosLfVnxfv8Kr4FhHZrR+wnF5PaIH97nadcbJ+EOTuD";

let tallyScriptPromise;

export function tallyFormUrl(topic) {
  return `https://tally.so/r/${TALLY_FORM_ID}?topic=${encodeURIComponent(topic)}`;
}

function loadTallyScript() {
  if (typeof window.Tally?.openPopup === "function") return Promise.resolve(true);
  if (tallyScriptPromise) return tallyScriptPromise;

  tallyScriptPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = TALLY_EMBED_URL;
    script.integrity = TALLY_EMBED_INTEGRITY;
    script.crossOrigin = "anonymous";
    script.async = true;
    script.addEventListener("load", () => resolve(typeof window.Tally?.openPopup === "function"), { once: true });
    script.addEventListener("error", () => resolve(false), { once: true });
    document.head.appendChild(script);
  });
  return tallyScriptPromise;
}

export async function openTally(topic) {
  let timeout;
  const ok = await Promise.race([
    loadTallyScript(),
    new Promise((resolve) => { timeout = setTimeout(() => resolve(false), 3000); }),
  ]).finally(() => clearTimeout(timeout));

  if (ok) {
    try {
      window.Tally.openPopup(TALLY_FORM_ID, {
        layout: "modal",
        overlay: true,
        width: 700,
        hideTitle: true,
        hiddenFields: { topic },
      });
      return;
    } catch { /* Use the hosted form if the verified widget cannot open. */ }
  }

  // Navigation works after an asynchronous load failure without popup permission.
  window.location.assign(tallyFormUrl(topic));
}
