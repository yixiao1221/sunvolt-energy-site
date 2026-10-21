(function () {
  'use strict';

  var form = document.getElementById('sizing-calculator');
  if (!form) return;

  var dailyInput = document.getElementById('calc-daily-energy');
  var peakInput = document.getElementById('calc-peak-load');
  var autonomyInput = document.getElementById('calc-autonomy');
  var sunInput = document.getElementById('calc-sun-hours');
  var countryInput = document.getElementById('calc-country');
  var pvOutput = document.getElementById('calc-pv-result');
  var inverterOutput = document.getElementById('calc-inverter-result');
  var batteryOutput = document.getElementById('calc-battery-result');
  var whatsappLink = document.getElementById('calc-whatsapp');
  var emailLink = document.getElementById('calc-email');
  var genericWhatsApp = 'https://wa.me/8613025124521?text=Integrated%20Solar%20Storage%20Sizing%20Review';
  var genericEmail = 'mailto:yixiao1221@outlook.com?subject=' + encodeURIComponent('Integrated solar storage project review');

  function numberValue(input, minimum, maximum) {
    var value = Number(input.value);
    if (!Number.isFinite(value) || value < minimum || value > maximum) return null;
    return value;
  }

  function nextInverterRating(required) {
    var ratings = [3, 3.6, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 80, 100, 125, 150, 200, 250, 300, 400, 500];
    for (var i = 0; i < ratings.length; i += 1) {
      if (ratings[i] >= required) return ratings[i];
    }
    return Math.ceil(required / 50) * 50;
  }

  function trackCalculation(values) {
    var params = {
      event_category: 'engagement',
      event_label: 'Integrated solar storage calculator',
      daily_kwh: values.daily,
      peak_kw: values.peak,
      autonomy_days: values.autonomy,
      peak_sun_hours: values.sun
    };
    if (typeof gtag === 'function') gtag('event', 'calculator_calculate', params);
    if (typeof window.ym === 'function' && window.YANDEX_METRIKA_ID) {
      window.ym(window.YANDEX_METRIKA_ID, 'reachGoal', 'calculator_calculate', params);
    }
  }

  function updateCalculator(track) {
    var daily = numberValue(dailyInput, 1, 5000);
    var peak = numberValue(peakInput, 0.5, 1000);
    var autonomy = numberValue(autonomyInput, 0.5, 7);
    var sun = numberValue(sunInput, 2, 8);

    if (daily === null || peak === null || autonomy === null || sun === null) {
      pvOutput.textContent = '-';
      inverterOutput.textContent = '-';
      batteryOutput.textContent = '-';
      whatsappLink.href = genericWhatsApp;
      emailLink.href = genericEmail;
      return;
    }

    var pv = Math.ceil((daily / (sun * 0.75)) * 2) / 2;
    var inverter = nextInverterRating(peak * 1.25);
    var battery = Math.ceil((daily * autonomy / 0.9) * 10) / 10;
    var country = countryInput.value.trim();

    pvOutput.textContent = pv.toFixed(1) + ' kWp';
    inverterOutput.textContent = inverter.toFixed(inverter % 1 ? 1 : 0) + ' kW';
    batteryOutput.textContent = battery.toFixed(1) + ' kWh';

    var message = [
      'Hi SunVolt, please review my preliminary solar storage sizing.',
      'Daily energy: ' + daily + ' kWh/day',
      'Peak load: ' + peak + ' kW',
      'Required autonomy: ' + autonomy + ' day(s)',
      'Peak sun hours: ' + sun + ' h/day',
      'Estimated PV: ' + pv.toFixed(1) + ' kWp',
      'Estimated inverter: ' + inverter.toFixed(inverter % 1 ? 1 : 0) + ' kW',
      'Estimated battery: ' + battery.toFixed(1) + ' kWh'
    ];
    if (country) message.push('Project country: ' + country);
    message.push('Please confirm the final system design.');
    whatsappLink.href = 'https://wa.me/8613025124521?text=' + encodeURIComponent(message.join('\n'));
    emailLink.href = 'mailto:yixiao1221@outlook.com?subject='
      + encodeURIComponent('Integrated solar storage sizing review')
      + '&body=' + encodeURIComponent(message.join('\r\n'));

    if (track) trackCalculation({ daily: daily, peak: peak, autonomy: autonomy, sun: sun });
  }

  form.addEventListener('input', function () {
    updateCalculator(false);
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    updateCalculator(true);
    document.getElementById('calculator-results').focus();
  });

  updateCalculator(false);
}());
