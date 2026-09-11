// SunVolt GA4 conversion and lead-intent tracking
(function () {
  var scrollMilestones = { 50: false, 90: false };

  function send(name, params) {
    if (typeof gtag === 'function') {
      gtag('event', name, params || {});
    }
  }

  function linkParams(el, href, text) {
    return {
      event_category: 'engagement',
      event_label: text || href || 'link',
      link_text: text,
      link_url: href,
      page_path: window.location.pathname + window.location.search
    };
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;
    var href = el.getAttribute('href') || '';
    var text = (el.innerText || el.textContent || '').trim().substring(0, 60);

    // WhatsApp inquiry: mark both the interaction and the lead-intent signal.
    if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) {
      send('whatsapp_click', linkParams(el, href, text || 'WhatsApp'));
      send('generate_lead', {
        event_category: 'conversion',
        event_label: text || 'WhatsApp inquiry',
        method: 'whatsapp',
        page_path: window.location.pathname + window.location.search
      });
      return;
    }

    // Phone and email are also lead actions for B2B visitors.
    if (href.indexOf('tel:') === 0 || href.indexOf('mailto:') === 0) {
      send('contact_click', linkParams(el, href, text || href));
      return;
    }

    // Checkout intent
    if (href.indexOf('checkout') !== -1) {
      send('checkout_click', {
        event_category: 'engagement',
        event_label: text || href,
        page_path: window.location.pathname + window.location.search
      });
    }

    // CTA / button click, including inline-styled links used on the site.
    var style = el.getAttribute('style') || '';
    var isInlineCta = style.indexOf('background') !== -1 && style.indexOf('padding') !== -1;
    if (isInlineCta || el.closest('.btn') || el.classList.contains('btn-primary') ||
        el.classList.contains('nav-cta') || el.closest('form')) {
      send('cta_click', linkParams(el, href, text || 'CTA'));
    }
  });

  document.addEventListener('submit', function (e) {
    var form = e.target;
    send('form_submit', {
      event_category: 'conversion',
      event_label: form.getAttribute('id') || 'form',
      page_path: window.location.pathname + window.location.search
    });
  });

  if (window.location.pathname.indexOf('checkout') !== -1) {
    send('view_checkout', {
      event_category: 'conversion',
      page_path: window.location.pathname + window.location.search
    });
  }

  window.addEventListener('scroll', function () {
    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    var percent = (window.scrollY / scrollable) * 100;
    [50, 90].forEach(function (threshold) {
      if (!scrollMilestones[threshold] && percent >= threshold) {
        scrollMilestones[threshold] = true;
        send('scroll_depth', {
          event_category: 'engagement',
          event_label: threshold + '%',
          percent_scrolled: threshold,
          page_path: window.location.pathname + window.location.search
        });
      }
    });
  }, { passive: true });
})();
