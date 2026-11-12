/* Renderiza las 8 páginas desde las plantillas.
   Se usa para comparar con los .html originales y, en el servidor, para
   servirlas. Mantiene las mismas URLs: /destino-roques.html, etc. */
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

const VERSION_CSS = '3.3';
const VERSION_SHOP = '1.0';
const WHATSAPP = '4367764216757';

const env = nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  trimBlocks: false,
  lstripBlocks: false,
  // En producción se cachean las plantillas; en desarrollo se releen en cada petición.
  noCache: process.env.NODE_ENV !== 'production'
});

const paginas = JSON.parse(fs.readFileSync(path.join(__dirname, 'contenido-paginas.json'), 'utf8'));

function render(clave) {
  const cfg = paginas[clave];
  if (!cfg) return null;
  const cuerpo = fs.readFileSync(path.join(__dirname, 'views/paginas', clave + '.njk'), 'utf8');
  return env.render('base.njk', Object.assign({}, cfg, {
    pagina: clave,
    cuerpo: cuerpo,
    whatsapp: WHATSAPP,
    version_css: VERSION_CSS,
    version_shop: VERSION_SHOP
  }));
}

module.exports = { render, claves: Object.keys(paginas) };

if (require.main === module) {
  const destino = process.argv[2] || path.join(__dirname, 'generado');
  fs.mkdirSync(destino, { recursive: true });
  Object.keys(paginas).forEach(function (k) {
    fs.writeFileSync(path.join(destino, k + '.html'), render(k), 'utf8');
    console.log('  ' + k + '.html');
  });
}
