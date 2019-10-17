## Client Side Rendering (CSR)

Normalmente cuando hacemos una petición al servidor, tenemos que esperar a que el servidor responda nuestro html, cargue nuestro código Javascript, lo ejecute y en ese momento nuestro sitio llega a ser interactivo.

En el caso de React, tenemos que espera a que pase todo el html, despues llegá el Javascript, carga react y el sitio en ese momento llega ha ser interactivo.

<div>
  <img src="./assets/client-sr.png" alt="client side rendering">
</div>

Lo malo de esto es que al momento de tener un sitio, si ven que se mira blanco en la primera carga es porque no tenemos el SSR(server side rendering), normalmente hay varias razones por las que usamos el client side rendering, cuando son vistas privadas no hay necesidad de esforzarnos mucho porque algó se indexe y simplemente no habilitamos el SSR, en esté caso la forma más rápida de revizarlo es desabilitando Javascript de nuestro navegador, pues no estamos recibiendo ese código, es decir no estamos ejecutandolo y simplemente nuestro sitio no se renderiza.

## Server Side Rendering

El SSR (server side rendering) funciona de manera similar pero un poco más eficiente, porque al momento de hacer la petición a nuestro html, nosotros tomamos nuestro código de react en esté caso lo renderizamos en un string, le hacemos un **apend**, lo incertamos dentro de nuestro html para que cargue toda la parte visual, esa parte visual vamos a cargarla y luego en paralelo mientras estamos subiendo el código ya una vez que tenemos feedback, ese código se va ha ir desacargando, el código Javascript es decir el mismo código que descargamos es el mismo código que estamos renderizando, con la diferencia de que al momento de llegar al cliente, y al momento de ejecutar React se usa un método que se llama ``aidry`` que precisamente como ya tenemos un código precargado vamos a incertarle una serie de enventos que solo estan disponibles en el cliente, esto garantiza que nuestro sitio va ha ser interactivo mucho más rápido y la percepción del usuario es que nuestro archivo va ha ser mucho más limpio y va ha tener mucho mejor ``look an feel``, es decir va ha tener una percepción mucho más limpía de nuestro sitio.

Otro ejemplo muy fácil es buscar un sitio o una vista que carga con SSR como la home de [platzi](https://platzi.com/), la gran diferencia de esto es que si desabilitamos el Javascript del sitio web y refrescamos inmediatamente el sitio es visible y si hacemos una revisión de nuestro código.

<div>
  <img src="./assets/server-sr.png" alt="server side rendering">
</div>

Hay una pequeña carga blanca pero es minima comparada con un código que no tiene SSR. Normalmente el Client Side Renderig se usa para rutas privadas, y el Server Side Rendering se usa cuando necesitamos un feedback mucho más rápido para que nuestro sitio sea indexado, o simplemente para garantizar la experiencia del usuario en cualquier lado.

### ¿Por qué renderizar desde el Servidor?

Son 3 puntos muy importantes los cuales los hemos tocado en la sección anterior.

1. **La carga es mucho más rápida**, esto es muy bien visto por motores de busquedad, si tu tienes un sitio que carga mucho más rápido tus usuarios no se van del sitio y aparte de eso la percepción del usuario ante el sitio es que se quieren quedar.
2. **Mejora el SEO**, no solo estamos cargando un SPA por ejemplo que tiene CSR, solo estamos tomando en cuenta los metaTags del tope de la página pero ya ahora estamos tomando la indexación del todo el cóntenido de React que se esta precargando.
3. **Look and Feel** dependiendo de la zona o de la url en la que estemos o en la sección del sitio, es muy importante mantener una **percepción del usuario** que se sienta comodo con el sitio, por ejemplo en el landing es muy importante tener Server Side Rendering, porque nos ayuda a indexar todo el contenido html porque el final todo estó va ha mejorar nuestro CEO. Con esto el navegador puede desacargar por atras pero mientras el usuario ya tiene un feedback inmediato.

## Herramientas

Babel, Express y React


Para el desarrollo de este curso vamos a utilizar 3 herramientas esenciales:

- Babel: transforma nuestro código a una versión de JavaScript que cualquier navegador pueda entender.
- Express: es un framework de aplicaciones web en Node.js que nos va a ser útil para crear nuestro servidor.
- React: librería de JavaScript para crear componentes y nos proporciona un método para renderizar nuestros componentes del lado del servidor.

Renderizar del lado del servidor nos va a traer beneficios en:

1. Velocidad de primera carga.
2. Mejora el SEO.
3. Look & Feel más limpio.

## Creación del proyecto base

Para esta clase vamos a empezar a separar nuestro proyecto en diferentes carpetas: frontend y server. Dentro de frontend vamos a guardar todos los archivos que anteriormente Oscar realizó en el curso de React y React Router Redux.

Además vamos a crear nuestro primer servidor en express que nos va ha ayudar a servir nuestra aplicación del lado del servidor.

El archivo ``index.js`` dentro de nuestro server va ha ser el punto de ancla para que nuestra aplicación funcione, nuestro servidor va ha correr desde acá, lo primero que debemos de hacer es instalar las siguientes dependencias.

```js
@babel/register
express
dotenv
// dependencia de desarrollo:
nodemon
```

Babel register es un paquete que mediante un hook de require nos permite hacer un bind en tiempo real de cualquier paquete que necesitemos, en esté caso vamos a estar haciendo un bind de babel-preset-env y babel-preset-react.

## Configuración de ESLint con Webpack

ESLint es una herramienta que nos señala el código que no cumpla con los estándares que le indiquemos. Se configura desde un ``.eslintrc``. Debemos instalar las siguientes dependencias:

```
yarn add babel-eslint eslint eslint-config-airbnb eslint-plugin-jsx-a11y eslint-loader eslint-plugin-import eslint-plugin-react   --exact
```

Dentro del archivo ``.eslintrc`` podemos indicarle a ESLint el nivel de alerta sobre una regla:

- 2: error
- 1: warning
- 0: omite la regla

## Preparación de Webpack, Babel, PostCSS y Assets

Ahora vamos a realizar una serie de inprudments a nuestro ``.babelrc`` para que podamos tener diferentes entornos de trabajo y también vamos a agregarle los prefijos necesarios a nuestro código _css_ con autoprefixer con ``post-css`` y ``webpack``.

1. Dentro de ``babelrc`` debemos enviarle un entorno que estemos trabajando con nuestro ``.env``, el cual nos debe de indicar el entorno en el que estesmos trabajando.

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "env": {
    "development": {
      "plugins": [
        // para poder utilizar clases en JSX sin ningún problema
        "transform-class-properties",
        // para añadir carga dinámica del contenido en nuestro proyecto
        "react-hot-loader/babel",
        "babel-plugin-transform-object-assign"
      ]
    }
  }
}
```

2. Ahora vamos a proceder a configurar nuestros assets, pero como ya tenemos assets definidos en nuestro webpack, lo que nos hace falta acá es precisamente poder añadirles ciertas funcionalidades al css para que se pueda ejecutar en cualquier navegador en esté caso los prefijos, para poder usar estos prefijos nos vamos a apoyar de 2 paquetes. `
```
yarn add autoprefixer --exact
npm install autoprefixer --save-exact

yarn add postcss-loader --exact
npm install postcss-loader --save-exact 
```

Los prefijos necesarios debemos tratarlos con un ``postcss-loader``, como todavia no estamos usando ``autoprefixer`` vamos a proceder a instalar un plugin nuevo, esté plugin que vamos a estar trabajando precisamente va ha añadir la configuración que necesitamos para poder agregarle el **autoprefijo** a la configuración de css. 

```js
{
  plugins: [
    new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [
            autoprefixer(),
          ],
        },
      }),
  ]
}
```

Precisamente esta función lo que hace es que vamos a cargar ciertas funciones para un loader en especifico. Ya con esto podríamos tener nuestra configuración y nuestro css ya configurado para que agregue todas las funcionalidades necesarias para poder correr en cualquier navegador.

3. Configuración de archivo **postcss.config.js** 
```js
module.exports = {
  plugins: {
    'autoprefixer': {},
  },
};
```

## Usando Plugins y vendor file en Webpack

En está clase vamos a realizar una estrategia que es **vendorFiles** para poder separar los ``node_modules`` de nuestro assets normales de la aplicación para poder cachearlos en el navegador y que no tengamos ningún problema.

Los vendorFiles son una herramienta de optimización para que nuestro proyecto tenga una configuración mucho más eficiente para mandar a producción, para estó webpack recibe un párametro que se llama ``optimization``, esté es un objeto.

```js
{
    optimization: {
    splitChunks: {
      chunks: 'async',
      // el modulo va ha tener un nombre
      name: true,
      // aquí vamos a definir nuestro vendor
      cacheGroups: {
        // usamos el método de vendors
        vendors: {
          // nombre de la optimization
          name: 'vendors',
          // obtener los modules de todo nuestro código
          chunks: 'all',
          // va ha reuzar un chunk existente
          reuseExistingChunk: true,
          // debe ejecutarse primero que el bundle de react
          priority: 1,
          // nombre y lugar donde lo vamos a guardar
          filename: 'assets/vendor.js',
          // tiene que hacer esto obligatoriamente
          enforce: true,
          // configuración para que nuestro archivo vendors se obtenega
          // únicamente de nuestro node_modules
          // va ha extraer todas las importaciones que vengan de node_modules y las va ha pasar a un paquete aparte 
          test(module, chunks) {
            const name = module.nameForCondition && module.nameForCondition();
            return chunks.some((chunks) => chunks.name !== 'vendor' && /[\\/]node_modules[\\/]/.test(name));
          },
        },
      },
    },
  },
}
```

Ahora procedemos a configurar el ``hotModeReplacement`` que simplemene es instanciarlo dentro de webpack.

```js
{
   plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ];
}
```

## Integración de Webpack con Express

Ya que configuramos webpack he hicimos nuestro servidor ahora debemos integrarlos y para eso debemos primero revizar que todo esté en orden porque es muy usual cuando estas trabajando día a día que tengas ``typos`` al momento de realizar alguna configuración de estás porque tienen muchos párametros que son sensibles a typos.

Para poder configurar nuestro servidor de express y que funcione con webpack.

1. Vamos a ir a nuestro archivo ``server.js`` y vamos a modificarlo con lo siguiente:

Vamos a hacer una validación para verificar que estemos en desarrollo porque también vamos a configurar el hot-mode-replacement, y está configuración no se puede hacer en entornos de producción.

```js
const express = require('express');
const webpack = require('webpack');
const { config } = require('../config');

if(config.dev) {
  console.log(`Cargando configuración de desarrollo`);
  // llamamos a nuestra configuración de webpack
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  // definimos un compilador, esté compilador lo vamos a llamar con webpack usando nuestra configuración de webpackConfig.
  // que es la configuración que hemos trabajado durante todo el proyecto, para que las sirva sin nigún porblema
  const compiler = webpack(webpackConfig);
}
```

Lo más importante de estó es crear la configuración del servidor porque como vamos a estar sirviendo webpack desde el servidor es muy importante crear la configuración necesaria.

```js
const configServer = {
  contentBase: `http:/localhost${config.port}`,
  port: config.port,
  publicPath: webpackConfig.output.path
  // recibirá cambios dinámicamente
  hot: true,
  // para recibir colores en nuestro proyecto
  stats: {colors: true},
}
```

Por ahora ninguna de las configuraciones que definimos se está usando, para poder usarlas sencillamente debemos primero pasarle un ``historyFallback: true` y aparte de estó tenemos que decirle a nuestra aplicación de express que use estos middlewares que tenemos acá definidos.

```js
  app.use(webpackDevMiddleware(compiler, serverConfig));
  // añade la configuración de HotModeReplacement
  app.use(webpackHotMiddleware(compiler));
```

La configuración unida quedaría de la siguiente manera:
```js
const express = require('express');
const webpack = require('webpack');
const { config } = require('../config');

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
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: { colors: true },
  };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
}

app.get('*', (req, res, next) => {
  res.send({holamundo: true})
});

app.listen(config.port, (err) => {
  if (err) console.log(err);
  console.log(`El servidor está corriendo en htpp://localhost:${config.port}`);
});
```

## Servir React con Express

Hasta ahora hemos configurado webpack y le hemos añadido ciertas funcionalidades para que se integre con nuestro servidor de express, pero no hemos configurado tadavía que nuestra aplicación se sirva desde un html que sirvamos de nuestro servidor.

Lo primero que tenemos que hacer es hacer ciertas modificaciones a nuestro archivo de webpack porque como estabamos revizando tenemos ciertas extensiones y ciertas integraciones que ya no vamos a estar usando por ejemplo: la integración del **htmlWebpackPlugin** ya no va ha ser necesaria porque vamos a estar sirviendo todo desde express.

Usualmente cuando estamos trabajando en entornos de desarrollo necesitamos indicarle a webpack exactamente en que entorno estamos trabajando, para esto tenemos que especificarle el modo.

``mode: "development"`` 

Si no indicamos que estamos trabajando en modo desarrollo nuestra aplicación va ha entrar directamente en modo de producción y esto nos puede presentar problemas a la hora de resolver ciertos paquetes o ciertas rutas, otra cosa que debemos hacer es cambiar el **path**, el paht **debe ser cambiado al source del proyecto**.

Por último tenemos que enviar un templateString con nuestra aplicación html, más que una convección es un modo de realizar estó, también creando un archivo html y cargandolo desde acá, pero como vamos a hacer un html estatico que en realidad no va ha cambiar mucho no vale la pena crear un archivo para eso.

Lo que debemos hacer en esté caso es crear nuestro html dentro de un template String.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>PlatziVideo</title>
    <link rel="stylesheet" href="assets/app.css" type="text/css">
  </head>
  <body> 
    <div id="app"></div>
    <script src="assets/app.js" type="text/javascript"></script>
    <script src="assets/vendor.js" type="text/javascript"></script>
  </body>
<html>
```

Con estó ya estaríamos sirviendo nuestra aplicación desde el servidor.




