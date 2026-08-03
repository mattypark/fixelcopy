/**
 * Alternate-glyph tabs.
 *
 * Tabs swap script (Latin / Cyrillic); clicking a letter writes it into both
 * comparison panels — the right panel renders with `ss01` on, so the pair shows
 * the default and the stylistic alternate of the same character.
 */

export function initAlternatives() {
  const root = document.querySelector('.alternatives');

  if (!root) {
    return;
  }

  const tabLinks = [...root.querySelectorAll('.tab-link')];
  const panes = [...root.querySelectorAll('.tab-pane')];

  tabLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const target = link.dataset.tab;

      tabLinks.forEach((item) => item.classList.toggle('active', item === link));
      panes.forEach((pane) => pane.classList.toggle('active', pane.dataset.pane === target));
    });
  });

  panes.forEach((pane) => {
    const letters = [...pane.querySelectorAll('.letter-2.alternative')];
    const defaultSlot = pane.querySelector('[data-default]');
    const alternativeSlot = pane.querySelector('[data-alternative]');

    letters.forEach((letter) => {
      letter.addEventListener('click', () => {
        const glyph = letter.textContent.trim();

        if (defaultSlot) defaultSlot.textContent = glyph;
        if (alternativeSlot) alternativeSlot.textContent = glyph;

        letters.forEach((item) => item.classList.toggle('is-active', item === letter));
      });
    });
  });
}
