## Client Side Rendering (CSR)

Normalmente cuando hacemos una petición al servidor, tenemos que esperar a que el servidor responda nuestro html, cargue nuestro código Javascript, lo ejecute y en ese momento nuestro sitio llega a ser interactivo.

En el caso de React, tenemos que espera a que pase todo el html, despues llegá el Javascript, carga react y el sitio en ese momento llega ha ser interactivo.

<div>
  <img src="" alt="client side rendering">
</div>

Lo malo de esto es que al momento de tener un sitio, si ven que se mira blanco en la primera carga es porque no tenemos el SSR(server side rendering), normalmente hay varias razones por las que usamos el client side rendering, cuando son vistas privadas no hay necesidad de esforzarnos mucho porque algó se indexe y simplemente no habilitamos el SSR, en esté caso la forma más rápida de revizarlo es desabilitando Javascript de nuestro navegador, pues no estamos recibiendo ese código, es decir no estamos ejecutandolo y simplemente nuestro sitio no se renderiza.

## Server Side Rendering

El SSR (server side rendering) funciona de manera similar pero un poco más eficiente, porque al momento de hacer la petición a nuestro html, nosotros tomamos nuestro código de react en esté caso lo renderizamos en un string, le hacemos un **apend**, lo incertamos dentro de nuestro html para que cargue toda la parte visual, esa parte visual vamos a cargarla y luego en paralelo mientras estamos subiendo el código ya una vez que tenemos feedback, ese código se va ha ir desacargando, el código Javascript es decir el mismo código que descargamos es el mismo código que estamos renderizando, con la diferencia de que al momento de llegar al cliente, y al momento de ejecutar React se usa un método que se llama ``aidry`` que precisamente como ya tenemos un código precargado vamos a incertarle una serie de enventos que solo estan disponibles en el cliente, esto garantiza que nuestro sitio va ha ser interactivo mucho más rápido y la percepción del usuario es que nuestro archivo va ha ser mucho más limpio y va ha tener mucho mejor ``look an feel``, es decir va ha tener una percepción mucho más limpía de nuestro sitio.

Otro ejemplo muy fácil es buscar un sitio o una vista que carga con SSR como la home de [platzi](https://platzi.com/), la gran diferencia de esto es que si desabilitamos el Javascript del sitio web y refrescamos inmediatamente el sitio es visible y si hacemos una revisión de nuestro código.

Hay una pequeña carga blanca pero es minima comparada con un código que no tiene SSR. Normalmente el Client Side Renderig se usa para rutas privadas, y el Server Side Rendering se usa cuando necesitamos un feedback mucho más rápido para que nuestro sitio sea indexado, o simplemente para garantizar la experiencia del usuario en cualquier lado.

## ¿Por qué renderizar desde el Servidor?

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

