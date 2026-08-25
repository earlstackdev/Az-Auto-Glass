(function () {
  'use strict';

  /* ============ Mobile nav toggle ============ */
  var navToggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
      mobileNav.hidden = isOpen;
    });

    mobileNav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        mobileNav.hidden = true;
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        mobileNav.hidden = true;
        navToggle.focus();
      }
    });
  }

  /* ============ FAQ accordion ============ */
  var accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var expanded = trigger.getAttribute('aria-expanded') === 'true';
      var panel = document.getElementById(trigger.getAttribute('aria-controls'));

      trigger.setAttribute('aria-expanded', String(!expanded));
      if (panel) {
        panel.hidden = expanded;
      }
    });
  });

  /* ============ Footer year ============ */
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ============ Quote form: Netlify-compatible AJAX submission ============ */
  var form = document.getElementById('quote-form');
  var statusEl = document.getElementById('form-status');
  var submitBtn = document.getElementById('form-submit');

  function encodeFormData(formElement) {
    return new URLSearchParams(new FormData(formElement)).toString();
  }

  if (form && statusEl && submitBtn) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      statusEl.className = 'form-status';
      statusEl.textContent = '';

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData(form)
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Form submission failed with status ' + response.status);
          }

          form.hidden = true;
          statusEl.className = 'form-status form-status--success';
          statusEl.setAttribute('tabindex', '-1');
          statusEl.textContent = "Thank you! Your request has been received. We'll be in touch shortly.";
          statusEl.focus();
        })
        .catch(function () {
          statusEl.className = 'form-status form-status--error';
          statusEl.textContent = 'Something went wrong sending your request. Please call us directly or try again.';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Request My Free Quote';
        });
    });
  }
})();
