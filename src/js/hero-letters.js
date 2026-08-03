/**
 * Hero wordmark interaction.
 *
 * Waits for the variable font to load (otherwise the letters snap in at the
 * fallback width), then reveals the heading and wires per-letter hover:
 * hovered letter gets `.active`, everything else gets `.sibling-N` where N is
 * the distance from the hovered index, producing a weight ripple.
 */

const FONT_PROBE = '200px FixelGT';
const POLL_INTERVAL = 100;
const POLL_TIMEOUT = 5000;

function clearLetters(letters) {
  letters.forEach((letter) => {
    letter.className = '';
  });
}

function updateLetters(letters, targetIndex) {
  letters.forEach((letter, index) => {
    letter.className = '';

    if (index === targetIndex) {
      letter.classList.add('active');
      return;
    }

    letter.classList.add(`sibling-${Math.abs(targetIndex - index)}`);
  });
}

function prepareHeading(heading, letters) {
  heading.classList.add('shown');

  letters.forEach((letter, index) => {
    letter.addEventListener('mouseover', () => updateLetters(letters, index));
  });
}

export function initHeroLetters() {
  const heading = document.querySelector('h1.Heading');

  if (!heading) {
    return;
  }

  const letters = [...heading.querySelectorAll('span')];

  heading.addEventListener('mouseout', () => clearLetters(letters));

  const start = performance.now();
  const poll = window.setInterval(() => {
    const fontReady = document.fonts.check(FONT_PROBE);
    const timedOut = performance.now() - start > POLL_TIMEOUT;

    if (fontReady || timedOut) {
      prepareHeading(heading, letters);
      window.clearInterval(poll);
    }
  }, POLL_INTERVAL);
}
