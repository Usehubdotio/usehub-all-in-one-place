const TALLY_FORM_ID = "5BjvlP";

async function ensureTallyReady(timeoutMs = 2500) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (window.Tally && typeof window.Tally.openPopup === "function") return true;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return false;
}

export async function openTally(topic) {
  const ok = await ensureTallyReady();

  if (ok) {
    window.Tally.openPopup(TALLY_FORM_ID, {
      layout: "modal",
      overlay: true,
      width: 700,
      hideTitle: true,
      hiddenFields: { topic },
    });
    return;
  }

  window.open(
    `https://tally.so/r/${TALLY_FORM_ID}?topic=${encodeURIComponent(topic)}`,
    "_blank",
    "noopener,noreferrer"
  );
}
