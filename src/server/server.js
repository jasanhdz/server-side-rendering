const express = require('express');
const { config } = require('../config');
const webpack = require('webpack');

const app = express();

if (config.dev) {
  console.log('Cargando la configuración de desarrollo');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = {
    contentBase: `http://localhost${config.dev}`,
    port: config.port,
    publicPath: webpackConfig.output.path,
    hot: true,
    historyApiFallback: true,
    stats: { colors: true },
  };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
}

app.get('*', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Platzi Video</title>
      <link rel="stylesheet" href="assets/app.css" type="text/css">
    </head>
    <body>
      <div id="app"></div>
      <script src="assets/app.js" type="text/javascript"></script>
      <script src="assets/vendor.js" type="text/javascript"></script>
    </body>
  </html>
  `);
});

app.listen(config.port, (err) => {
  if (err) console.log(err);
  console.log(`El servidor está corriendo en htpp://localhost:${config.port}`);
});
