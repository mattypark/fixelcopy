/**
 * Special-glyph grid.
 *
 * One slider drives `--symbol-weight` on the grid root, so every card re-weights
 * together in a single style write rather than per-card updates.
 */

export function initSymbols() {
  const grid = document.querySelector('.symbols-wrapper');
  const slider = document.querySelector('[data-input-range="symbol-weight"]');
  const readout = document.querySelector('[data-value="symbol-weight"]');

  if (!grid || !slider) {
    return;
  }

  const apply = () => {
    grid.style.setProperty('--symbol-weight', slider.value);

    if (readout) {
      readout.textContent = slider.value;
    }
  };

  slider.addEventListener('input', apply);
  apply();
}
