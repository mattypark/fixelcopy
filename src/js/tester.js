/**
 * Variable-font playground.
 *
 * Four style presets map onto the font's axes and feature flags:
 *   Display     -> wdth 100, ss01 off
 *   Text        -> wdth 75,  ss01 off
 *   Italic      -> italic face, wdth 100
 *   Alternative -> wdth 100, ss01 on
 *
 * Sliders write `wght`, font-size and letter-spacing live. Typing briefly drops
 * discretionary ligatures and restores them so the browser re-shapes the run.
 */

const DEFAULTS = {
  weight: 500,
  size: 140,
  spacing: 0,
  align: 'center',
  preset: 'display',
};

const LIGATURE_REFRESH_DELAY = 300;

const PRESETS = {
  display: { family: 'FixelGT', width: 100, style: 'normal', ss01: 'off' },
  text: { family: 'FixelGT', width: 75, style: 'normal', ss01: 'off' },
  italic: { family: 'FixelGT-Italic', width: 100, style: 'italic', ss01: 'off' },
  alternative: { family: 'FixelGT', width: 100, style: 'normal', ss01: 'on' },
};

export function initTester() {
  const container = document.querySelector('.text-editor-container');
  const field = document.querySelector('.main-text-input');

  if (!container || !field) {
    return;
  }

  const state = { ...DEFAULTS };

  const sliders = {
    weight: container.querySelector('[data-input-range="weight"]'),
    size: container.querySelector('[data-input-range="size"]'),
    spacing: container.querySelector('[data-input-range="letter-spacing"]'),
  };

  const readouts = {
    weight: container.querySelector('[data-value="weight"]'),
    size: container.querySelector('[data-value="size"]'),
    spacing: container.querySelector('[data-value="letter-spacing"]'),
  };

  const alignButtons = [...container.querySelectorAll('.text-align')];
  const presetButtons = [...container.querySelectorAll('[data-font]')];
  const resetButton = container.querySelector('[data-reset]');
  const themeButton = container.querySelector('[data-theme-switch]');

  const render = () => {
    const preset = PRESETS[state.preset];

    field.style.fontFamily = `${preset.family}, sans-serif`;
    field.style.fontStyle = preset.style;
    field.style.fontVariationSettings = `"wght" ${state.weight}, "wdth" ${preset.width}`;
    field.style.fontFeatureSettings = `"ss01" ${preset.ss01}`;
    field.style.fontSize = `${state.size}px`;
    field.style.letterSpacing = `${state.spacing / 100}em`;
    field.style.textAlign = state.align;

    if (readouts.weight) readouts.weight.textContent = state.weight;
    if (readouts.size) readouts.size.textContent = state.size;
    if (readouts.spacing) readouts.spacing.textContent = state.spacing;

    alignButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.align === state.align);
    });

    presetButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.font === state.preset);
    });
  };

  Object.entries(sliders).forEach(([key, slider]) => {
    slider?.addEventListener('input', () => {
      state[key] = Number(slider.value);
      render();
    });
  });

  alignButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.align = button.dataset.align;
      render();
    });
  });

  presetButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.preset = button.dataset.font;
      render();
    });
  });

  resetButton?.addEventListener('click', () => {
    Object.assign(state, DEFAULTS);

    if (sliders.weight) sliders.weight.value = String(DEFAULTS.weight);
    if (sliders.size) sliders.size.value = String(DEFAULTS.size);
    if (sliders.spacing) sliders.spacing.value = String(DEFAULTS.spacing);

    render();
  });

  themeButton?.addEventListener('click', () => {
    container.classList.toggle('is-inverted');
  });

  // Forces the shaper to re-run so discretionary ligatures rebuild while typing.
  let ligatureTimer;
  field.addEventListener('input', () => {
    field.style.fontVariantLigatures = 'normal';
    window.clearTimeout(ligatureTimer);
    ligatureTimer = window.setTimeout(() => {
      field.style.fontVariantLigatures = 'discretionary-ligatures';
    }, LIGATURE_REFRESH_DELAY);
  });

  render();
}
