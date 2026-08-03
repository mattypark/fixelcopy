/**
 * Sticky panel crossfade.
 *
 * The section is 300vh tall with a sticky viewport-height stage. Scroll
 * progress maps onto three panels: each one fades and lifts as the next takes
 * over, and the panel that owns the current slot gets `.shown` so its drawn
 * annotations run their stroke animation once.
 */

const PANEL_SHIFT = 60;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function panelOpacity(progress, index, panelCount) {
  // Each panel owns a 1/panelCount slice, with a crossfade at the seams.
  const slice = 1 / panelCount;
  const center = slice * index + slice / 2;
  const distance = Math.abs(progress - center) / slice;

  return clamp(1 - (distance - 0.35) / 0.5, 0, 1);
}

export function initStickySection() {
  const section = document.querySelector('.sticky-section');

  if (!section) {
    return;
  }

  const panels = [...section.querySelectorAll('.sticky-item')];
  const titles = panels.map((panel) => panel.querySelector('.introduction-title'));

  if (!panels.length) {
    return;
  }

  let ticking = false;

  const render = () => {
    ticking = false;

    const rect = section.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const progress = clamp(-rect.top / Math.max(scrollable, 1), 0, 1);

    panels.forEach((panel, index) => {
      const opacity = panelOpacity(progress, index, panels.length);
      const slice = 1 / panels.length;
      const relative = progress - (slice * index + slice / 2);

      panel.style.setProperty('--panel-opacity', opacity.toFixed(3));
      panel.style.setProperty('--panel-shift', `${(relative * -PANEL_SHIFT).toFixed(1)}px`);

      if (opacity > 0.6) {
        titles[index]?.classList.add('shown');
      }
    });
  };

  const onScroll = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(render);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  render();
}
