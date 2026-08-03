import './styles/main.css';

import { initRevealObservers } from './js/observer.js';
import { initHeroLetters } from './js/hero-letters.js';
import { initStickySection } from './js/sticky.js';
import { initTester } from './js/tester.js';
import { initFeedbackForm, initEmailForms } from './js/forms.js';

document.documentElement.setAttribute('lang', 'en');

initRevealObservers();
initHeroLetters();
initStickySection();
initTester();
initFeedbackForm();
initEmailForms();
