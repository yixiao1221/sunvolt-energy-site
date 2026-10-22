(function () {
  'use strict';

  var form = document.getElementById('homeQuoteForm');
  if (!form) return;

  var product = document.getElementById('homeQuoteProduct');
  var country = document.getElementById('homeQuoteCountry');
  var quantity = document.getElementById('homeQuoteQuantity');
  var emailLink = document.getElementById('homeQuoteEmail');
  var started = false;

  function messageBody() {
    return [
      'Hi SunVolt, I would like a quote.',
      'Product: ' + product.value,
      'Country: ' + country.value.trim(),
      'Quantity: ' + quantity.value
    ].join('\n');
  }

  function track(name, params) {
    if (typeof gtag === 'function') gtag('event', name, params || {});
    if (typeof window.ym === 'function' && window.YANDEX_METRIKA_ID) {
      window.ym(window.YANDEX_METRIKA_ID, 'reachGoal', name, params || {});
    }
  }

  function updateEmailLink() {
    emailLink.href = 'mailto:yixiao1221@outlook.com?subject='
      + encodeURIComponent('SunVolt quote request')
      + '&body=' + encodeURIComponent(messageBody());
  }

  form.addEventListener('focusin', function () {
    if (started) return;
    started = true;
    track('homepage_quote_start', {
      event_category: 'engagement',
      event_label: 'Homepage three-field quote'
    });
  });

  form.addEventListener('input', updateEmailLink);
  form.addEventListener('change', updateEmailLink);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    track('homepage_quote_submit', {
      event_category: 'conversion',
      event_label: product.value,
      product: product.value,
      country: country.value.trim(),
      quantity: quantity.value
    });
    window.location.href = 'https://wa.me/8613025124521?text=' + encodeURIComponent(messageBody());
  });

  updateEmailLink();
}());
