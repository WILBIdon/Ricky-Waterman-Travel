/* ==========================================================================
   WATERMAN — Micro tienda de camisas
   Selector de talla y color + pedido por WhatsApp.
   Funciona igual en tienda.html y en la sección de muestra de index.html.
   ========================================================================== */
(function () {
  'use strict';

  var WHATSAPP = '584120000000';
  var INK = '#122a26';
  var PAPER = '#faf6ee';

  /* Luminancia percibida (0 = negro, 1 = blanco) para decidir el contraste
     del estampado sobre el color de camisa elegido. */
  function luminancia(hex) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var r = parseInt(h.substr(0, 2), 16);
    var g = parseInt(h.substr(2, 2), 16);
    var b = parseInt(h.substr(4, 2), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  /* Repinta el SVG de una camisa con el color elegido. */
  function pintar(card, hex) {
    var tee = card.querySelector('.tee-body');
    if (tee) tee.setAttribute('fill', hex);

    var arte = luminancia(hex) > 0.65 ? INK : PAPER;

    // .tee-art  → contrasta con la camisa
    card.querySelectorAll('.tee-art').forEach(function (el) {
      if (el.hasAttribute('stroke') && el.getAttribute('stroke') !== 'none') {
        el.setAttribute('stroke', arte);
      }
      if (!el.hasAttribute('fill') || el.getAttribute('fill') !== 'none') {
        el.setAttribute('fill', arte);
      }
    });

    // .tee-cut  → toma el color de la camisa (efecto calado)
    card.querySelectorAll('.tee-cut').forEach(function (el) {
      if (el.hasAttribute('stroke') && el.getAttribute('stroke') !== 'none') {
        el.setAttribute('stroke', hex);
      }
      if (el.hasAttribute('fill') && el.getAttribute('fill') !== 'none') {
        el.setAttribute('fill', hex);
      }
    });

    // .tee-accent → no se toca, mantiene su color fijo
  }

  function activar(botones, elegido) {
    botones.forEach(function (b) { b.classList.remove('is-active'); });
    elegido.classList.add('is-active');
  }

  function seleccionado(card, selector, atributo) {
    var el = card.querySelector(selector + '.is-active');
    if (!el) return '';
    return atributo ? (el.getAttribute(atributo) || '') : el.textContent.trim();
  }

  document.querySelectorAll('.shirt-card').forEach(function (card) {
    var tallas = Array.prototype.slice.call(card.querySelectorAll('.shirt-size'));
    var colores = Array.prototype.slice.call(card.querySelectorAll('.shirt-color'));

    tallas.forEach(function (btn) {
      btn.addEventListener('click', function () { activar(tallas, btn); });
    });

    colores.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activar(colores, btn);
        pintar(card, btn.getAttribute('data-hex'));
      });
    });

    var pedir = card.querySelector('.shirt-btn');
    if (!pedir) return;

    pedir.addEventListener('click', function () {
      var modelo = card.getAttribute('data-model') || 'Camisa Waterman';
      var precio = card.getAttribute('data-price') || '';
      var talla = seleccionado(card, '.shirt-size') || 'M';
      var color = seleccionado(card, '.shirt-color', 'data-name') || '';

      var msg = 'Hola! Quiero pedir una camisa del Waterman Experience Tour.\n\n'
              + 'Modelo: ' + modelo + '\n'
              + 'Talla: ' + talla + '\n'
              + 'Color: ' + color + '\n'
              + (precio ? 'Precio de referencia: ' + precio + '\n' : '')
              + '\n¿Me confirmas disponibilidad y envío?';

      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank');
    });
  });
})();
