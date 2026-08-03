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

/**
 * Panel centres are spread across the whole scroll range so the first panel is
 * fully opaque at progress 0 and the last at progress 1. Each panel holds full
 * opacity through the middle of its slot and crossfades over the outer 40%.
 */
function panelOpacity(progress, index, panelCount) {
  const step = 1 / Math.max(panelCount - 1, 1);
  const distance = Math.abs(progress - index * step) / step;

  return clamp(1 - (distance - 0.78) / 0.22, 0, 1);
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
      const step = 1 / Math.max(panels.length - 1, 1);
      const relative = progress - index * step;

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
