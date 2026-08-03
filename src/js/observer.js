/**
 * Reveal engine.
 *
 * Two observers with different bottom margins so mid-page blocks fire once they
 * are half-way up the viewport, while entry blocks fire slightly earlier.
 * Each element animates exactly once — the Map guards against re-triggering.
 */

const REVEAL_DELAY = 300;

const seen = new Map();

function handleEntries(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || seen.get(entry.target)) {
      return;
    }

    seen.set(entry.target, true);
    window.setTimeout(() => entry.target.classList.add('shown'), REVEAL_DELAY);
  });
}

export function initRevealObservers() {
  const observed = document.querySelectorAll('[data-observed]');
  const observedEntry = document.querySelectorAll('[data-observed-entry]');

  [...observed, ...observedEntry].forEach((element) => seen.set(element, false));

  const observer = new IntersectionObserver(handleEntries, {
    threshold: 0.5,
    rootMargin: '0px 0px -50% 0px',
  });

  const entryObserver = new IntersectionObserver(handleEntries, {
    threshold: 0.5,
    rootMargin: '0px 0px 45% 0px',
  });

  observed.forEach((element) => observer.observe(element));
  observedEntry.forEach((element) => entryObserver.observe(element));
}
