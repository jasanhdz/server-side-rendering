import getManifest from '../getManifest';
import { config } from '../../config/index';

const isProd = config.dev === 'production';

const files = getManifest();

console.log(files);

const render = (html, preloadedState) => {
  return (`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Platzi Video</title>
      <link rel="stylesheet" href="${isProd ? files['main.css'] : 'assets/app.css'}" type="text/css">
    </head>
    <body>
      <div id="app">${html}</div>
      <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
      <script src="${isProd ? files['main.js'] : 'assets/app.js'}" type="text/javascript"></script>
      <script src="${isProd ? files['vendors.js'] : 'assets/vendor.js'}" type="text/javascript"></script>
    </body>
  </html>
  `);
};

module.exports = render;
