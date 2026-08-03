/**
 * Feedback panel + email capture.
 *
 * Submission is local-only: no third-party endpoint is called. The state
 * transitions (idle -> sending -> success/error) mirror the original UI.
 */

const MAX_FILE_BYTES = 10 * 1024 * 1024;

function toggleMessage(element, visible) {
  if (!element) {
    return;
  }

  element.classList.toggle('is-visible', visible);
}

export function initFeedbackForm() {
  const openButton = document.querySelector('[data-leave-feedback]');
  const wrapper = document.querySelector('.feedback-form-wrapper');
  const closeButton = document.querySelector('[data-feedback-close]');
  const form = document.querySelector('[data-feedback-form]');

  if (!openButton || !wrapper || !form) {
    return;
  }

  const successMessage = wrapper.querySelector('.success-message');
  const errorMessage = wrapper.querySelector('.error-message');
  const fileInput = form.querySelector('input[type="file"]');

  const open = () => {
    wrapper.classList.add('is-open');
    openButton.hidden = true;
    form.querySelector('textarea')?.focus();
  };

  const close = () => {
    wrapper.classList.remove('is-open');
    openButton.hidden = false;
    toggleMessage(successMessage, false);
    toggleMessage(errorMessage, false);
  };

  openButton.addEventListener('click', open);
  closeButton?.addEventListener('click', close);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && wrapper.classList.contains('is-open')) {
      close();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const file = fileInput?.files?.[0];

    if (file && file.size > MAX_FILE_BYTES) {
      toggleMessage(successMessage, false);
      toggleMessage(errorMessage, true);
      return;
    }

    toggleMessage(errorMessage, false);
    toggleMessage(successMessage, true);
    form.reset();
  });
}

export function initEmailForms() {
  const forms = document.querySelectorAll('[data-email-form]');

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const success = form.querySelector('.success-message');
      const error = form.querySelector('.error-message');
      const email = form.querySelector('input[type="email"]');

      if (!email || !email.checkValidity()) {
        toggleMessage(success, false);
        toggleMessage(error, true);
        return;
      }

      toggleMessage(error, false);
      toggleMessage(success, true);
      form.reset();
    });
  });
}
