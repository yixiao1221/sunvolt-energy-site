// SunVolt GA4 Conversion Tracking
(function () {
  // Track WhatsApp + CTA clicks across all pages
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;
    var href = el.getAttribute('href') || '';
    var text = (el.innerText || el.textContent || '').trim().substring(0, 60);

    // WhatsApp click (B2B inquiry)
    if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) {
      gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: text || 'WhatsApp',
        page_location: window.location.pathname
      });
      return;
    }

    // CTA / button click (covers .btn/.nav-cta classes and inline-styled buttons)
    var style = el.getAttribute('style') || '';
    var isInlineCta = style.indexOf('background') !== -1 && style.indexOf('padding') !== -1;
    if (isInlineCta || el.closest('.btn') || el.classList.contains('btn-primary') ||
        el.classList.contains('nav-cta') || el.closest('form')) {
      gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: text || href || 'CTA',
        page_location: window.location.pathname
      });
    }
  });

  // Track form submissions (contact, quote, etc.)
  document.addEventListener('submit', function (e) {
    var form = e.target;
    gtag('event', 'form_submit', {
      event_category: 'conversion',
      event_label: form.getAttribute('id') || 'form',
      page_location: window.location.pathname
    });
  });

  // Checkout events
  if (window.location.pathname.indexOf('checkout') !== -1) {
    gtag('event', 'begin_checkout', {
      event_category: 'conversion',
      page_location: window.location.pathname + window.location.search
    });
  }
})();
