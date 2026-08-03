/**
 * Odometer-style counter.
 *
 * Counts to `data-count-to` the first time the figure scrolls into view, eased
 * so the last digits settle slowly. Respects reduced-motion by jumping straight
 * to the final value.
 */

const DURATION = 1800;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function run(element) {
  const target = Number(element.dataset.countTo || 0);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    element.textContent = target.toLocaleString('en-US');
    return;
  }

  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / DURATION, 1);
    const value = Math.round(target * easeOutCubic(progress));

    element.textContent = value.toLocaleString('en-US');

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

export function initCounters() {
  const counters = [...document.querySelectorAll('[data-count-to]')];

  if (!counters.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, self) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        run(entry.target);
        self.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
}
