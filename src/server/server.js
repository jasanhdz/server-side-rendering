const express = require('express');
const webpack = require('webpack');
const helmet = require('helmet');
const main = require('./routes/main');
const { config } = require('../config');

const app = express();
app.use(express.static(`${__dirname}/public`));

if (config.dev === 'development') {
  console.log('Cargando la configuración de desarrollo');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = {
    contentBase: `http://localhost${config.dev}`,
    port: config.port,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: { colors: true },
  };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));

} else {
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable('x-powered-by');
}

app.get('*', main);

app.listen(config.port, (err) => {
  if (err) console.log(err);
  console.log(`Loading ${config.dev} config`);
  console.log(`El servidor está corriendo en htpp://localhost:${config.port}`);
});
