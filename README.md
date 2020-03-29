# vuevixens-pwa

## Pasos para crear proyecto de una Progressive Web App (PWA) con Vue

Para poder seguir este tutorial el necesario tener instalado `npm` y `vue CLI`.

Comprueba si los tienes intalado con:
```
npm -v
vue --version
```
### ¿Qué aplicación vamos a hacer?   
Vamos a crear una app para listar festivales de música, la aplicación consta de una pantalla inicialmente vacía con un botón añadir que nos redirige a la página de crear un elemento nuevo, una vez creado se redirige a la página principal con el listado de elementos añadidos. El aspecto es el siguiente:

<img src="documentation/images/app_snapshot_1.png" alt="Application home" style="width:450px; border: 1px solid black;"/>   
<br/>
<img src="documentation/images/app_snapshot_2.png" alt="Application create" style="width:450px; border: 1px solid black;"/>   
<br/>
<img src="documentation/images/app_snapshot_3.png" alt="Application list" style="width:450px; border: 1px solid black;"/>    


## 1. Creación del proyecto
Creamos un proyecto nuevo de Vue llamado `vuevixens-pwa` ejecutando en consola:

`vue create vuevixens-pwa`

Selecciona la siguiente configuración para el proyecto:

> Manually select features

- Babel
- Progressive Web App (PWA) Support
- Router
_ Vuex
- CSS Pre-processors
- Linter / Formatter

> ? Use history mode for router? **No**   
> ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default) **Sass/SCSS**
> ? Pick a linter / formatter config: **ESLint with error prevention only**   
> ? Pick additional lint features: **Lint on save**   
> ? Where do you prefer placing config for Babel, EsLint, etc.? **In package.json**   
> ? Save this as a preset for future projects? **n**   

## 2. Creación de la aplicación web

Vamos a crear una aplicación que utilizaremos para crear nuestro listado de festivales de música favoritos, la aplicación consta de una pantalla inicialmente vacía con un botón añadir que nos redirige a la página de crear un elemento nuevo. Una vez se crea el elemento se almacena en el almacenamiento local (localStorage) de nuestro navegador. Para crear esta aplicación seguiremos los siguientes pasos:

1. Modificaremos el fichero Home.vue (ubicado en la ruta src/views/) para que muestre nuestra pagina principal: listado de festivales y un botón con la opción de añadir. El contenido del fichero es:
```
<template>
  <div class="home">
    <div class="plate">
      <p class="page-title"><span>   Mi lista de festivales   </span></p>
    </div>
    <festival-item v-for="(item, index) in festivalList"
      :key="index"
      :festival-data="item"/>
    <router-link class="button" to="/create-item">Nuevo festival</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import FestivalItem from '@/components/FestivalItem.vue';

export default {
  name: 'Home',
  components: {
    FestivalItem
  },
  data() {
    return {
      festivalList: []
    }
  },
  mounted() {
    // Check if already has any festival item saved in localStorage
    let storageItemsKeys = Object.keys(localStorage);
    let storageItemsCounter = storageItemsKeys.length;

    while ( storageItemsCounter-- ) {
      if (storageItemsKeys[storageItemsCounter].includes('festival')) {
        this.festivalList.push(JSON.parse(localStorage.getItem(storageItemsKeys[storageItemsCounter])))
      }
    }
  }
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Barrio);

.home {
  padding: 10px;

  .plate {
    width: auto;
    margin: 5% auto;
  }

  .page-title {
    font-family: "Barrio";
    color: black;
    text-align: center;
    font-size: 40px;
    position: relative;
    margin:0;
  }

  .page-title span {
    background-color: white;
    padding: 0 10px;
  }

  .page-title:before {
    content: "";
    display: block;
    position: absolute;
    z-index:-1;
    top: 50%;
    width: 100%;
    border-bottom: 3px solid black;
  }

  .button {
    background-color: #6d737a;
    font-family: "Barrio";
    border: none;
    color: white;
    padding: 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    border-radius: 5px;
    font-weight: bold;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
}
</style>
```

2. Creamos una nueva vista para añadir un nuevo festival, esta vista consta de un formulario de tres campos: nombre, imagen y fecha. Para simplificar el fichero en el campo imagen sólo se aceptan URLs de imagen. En la ruta src/views creamos un nuevo fichero llamado CreateFestivalItem.vue con el siguiente contenido:
```
<template>
  <div>
    <p class="page-title">Introduce datos del nuevo festival</p>
    <form
      id="app"
      @submit="addItem"
    >
      <p>
        <label for="name">Nombre</label>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
        >
      </p>

      <p>
        <label for="image">Imagen</label>
        <input
          id="image"
          v-model="image"
          type="text"
          name="image"
          placeholder="URL de la imagen">
      </p>

      <p>
        <label for="date">Fecha</label>
        <input type="date" v-model="date" />
      </p>

      <p>
        <input
          class="button"
          type="submit"
          value="Guardar"
        >
      </p>

    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateFestivalItem',
  data() {
    return {
      name: null,
      image: null,
      date: null
    }
  },
  props: {
  },
  methods: {
    addItem(ev) {
      if (this.name && this.date) {
        let id = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4);
        const newFestival = {
          id: 'festival-' + id,
          name: this.name,
          image: this.image,
          date: this.date
        }
        localStorage.setItem(newFestival.id, JSON.stringify(newFestival))
      }
      ev.preventDefault();

      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Barrio);

.page-title {
  font-family: "Barrio";
  color: black;
  text-align: center;
  font-size: 40px;
}
.button {
  background-color: #6d737a;
  font-family: "Barrio";
  color: white;
  padding: 15px;
  font-size: 16px;
  border-radius: 5px;
  font-weight: bold;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

label {
  margin-right: 5px;
}
</style>
```

3. Creamos un nuevo componente que será el detalle de cada elemento que se añada al listado de festivales. En la ruta src/components creamos un nuevo fichero llamamdo FestivalItem.vue con el siguiente contenido:

primero instalamos la dependencia del componente de seleccion de fecha:   
 `npm i vue-date-pick`  
```
<template>
  <div class="festival-item-wrapper">
    <h1>{{ festivalData.name }}</h1>
    <div class="data-wrapper">
      <div class="image-wrapper">
        <img :src="festivalData.image" :alt="festivalData.name" />
      </div>
      <date-pick class="calendar" v-model="festivalData.date" :hasInputElement="false"></date-pick>
      <button class="delete-button" @click="removeItem">Eliminar</button>
    </div>
  </div>
</template>

<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

export default {
  name: 'FestivalItem',
  components: {
    DatePick
  },
  props: {
    festivalData: Object
  },
  methods: {
    removeItem() {
      localStorage.removeItem(this.festivalData.id)
      location.reload()
    }
  }
}
</script>

<style lang="scss">
.festival-item-wrapper {
  border: 1px solid;
  border-radius: 10px;
  margin: 10px;
  background-color: #b8c2e0;

  h1 {
      margin: 1em 0 0.5em 0;
      color: #343434;
      font-weight: bold;
      font-family: Impact, Charcoal, sans-serif;   
      font-size: 30px;
      line-height: 42px;
      text-transform: uppercase;
      text-shadow: 0 2px white, 0 3px #777;
    }

  .data-wrapper {
    overflow-x: auto;
    display: flex;
    align-items: center;

    .image-wrapper {
      position: relative;
      margin: auto;
      width: 30%;
      height: auto;

      img {
        width: 100%;
      }
    }

    .calendar {
      width: min-content;
      margin: 15px;
    }

    .delete-button {
      background: red;
      border: 1px solid #f00;
      border-radius: 2em;
      color: whitesmoke;
      display: inline-block;
      font-size: 14px;
      font-weight: bold;
      height: 20px;
      line-height: 2px;
      margin: auto;
      padding: 10px;
      text-align: center;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 450px) {
    .data-wrapper {
      margin-bottom: 5px;
      flex-direction: column;
    }
  }
}
</style>
```

4. Por último hay que indicar las rutas de nuestra aplicación para las distintas vistas en el fichero /src/router/index.js con el siguiente contenido:
```
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-item',
    name: 'create-item',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateFestivalItem.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
```

5. Limpiar la aplicación:

En el fichero App.vue tenemos un enrutado por defecto que nos genera Vue, podemos quitarlo borrando las siguientes lineas del fichero:

```
<div id="nav">
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link>
</div>
```

Con esto ya tendríamos nuestra aplicación básica creada, la porbamos ejecutando `npm run serve` pero... ¡¡esto no es una PWA!!

## 3. Configuración de la PWA

Crear nuevo fichero `vue.config.js` en la raiz del proyecto (al nivel de package.json) y pegar el siguiente contenido:

```
module.exports = {
  devServer: {
    https: true
  },
  pwa: {
    name: "Mis festivales favoritos",
    startUrl: "index.html",
    display: "standalone", //display ascpect (normal, fullscreen or minimal-ui)
    themeColor: "#3eb984",
    backgroundColor: "#fff",
  }
}

```

## 4. Ejecutar la aplicación
Para lanzar la aplicación y poderla usar en modo PWA es necesario construir el paquete de producción para ello:

1. Instalaremos el paquete `serve` ejecutando en la consola (comprobar si ya lo tenemos instalado con `serve -v` y nos saltamos este paso):
```
sudo npm install -g serve
```

2. Creamos el paquete de producción del proyecto:
```
npm run build
```
   
3. Lanzamos la app generada para producción en entorno local, desde la raíz del proyecto ejecutamos en consola:

```
serve dist/
```

4. Comprobamos que los serviceWorker están funcionando:   
Accedemos a la consola de desarrollo del navegador e inspeccionamos la aplicación.
![Service workers](documentation/images/service_workers.png)

5. Comprobamos que la aplicacioón es instalable en nuestro dispositivo:   
- En el ordenador: desde el navegador en la barra de la URL nos aparece la opción "instalar aplicación" y también en el menú "más opciones" del navegador nos aparece la opción de instalar.

## 5. Inlcuir notificaciones push
Para incluir este tipo de notificaciones en nustra aplicación, en primer lugar debemos tener un servidor que gestionará las notificaciones, en este caso utilizaremos el servicio de Firebase y lo configuraremos de la siguiente forma:

1. Ir a la consola de firebase (https://console.firebase.google.com/?hl=es-419&pli=1), también se puede buscar en Google "Firebase".   
2. Crear nuevo proyecto en firebase con el nombre deseado y aceptar las condiciones de uso.   
3. Ir a configuración, en la parte izquierda superior, pinchar sobre el icono de configuración y seleccionar “Configuración del proyecto”:
![Firebase project configuration](documentation/images/firebase_project_config.png)

Ir a la pestaña "Cloud Messaging", al final de este apartado aparece la opción para activar los certificados push web. Hacemos click en "Generar par de claves" y nos aparecerá una clave junto con la fecha de creación.   

4. En nuestro proyecto Vue también tendremos que instalar firebase. Ejecutamos en la consola los siguientes comandos:
```
sudo npm install --save firebase

firebase init functions

❯ ? Please select an option: Use an existing project
❯ ? Select a default Firebase project for this directory: vuevixens-pwa
❯ ? What language would you like to use to write Cloud Functions? (Use arrow keys): JavaScript
❯ ? Do you want to install dependencies with npm now? Yes

npm install firebase-admin --save
npm install axios --save

npm run build
```


5. En el proyecto creamos un nuevo fichero llamado `firebase-messaging-sw.js` en la ruta public/ con el siguiente contenido. Dónde MessagingSenderId será nuestro "Id de remitente" de firebase: 
```
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');

firebase.initializeApp({'messagingSenderId': "xxxxxxx"});

const messaging = firebase.messaging();
```   
![Firebase project configuration](documentation/images/firebase_cloud_messaging.png)

6. Creamos otro nuevo fichero llamado `firebase-config.js` en la ruta de la aplicación (en src/) con el siguiente contenido:
```
import firebase from 'firebase/app';
import 'firebase/messaging';

export const Firebase = {
  init() {
    const config = {
      apiKey: "xxxx",
      authDomain: "vuevixens-pwa.firebaseapp.com",
      databaseURL: "https://vuevixens-pwa.firebaseio.com",
      projectId: "vuevixens-pwa",
      storageBucket: "vuevixens-pwa.appspot.com",
      messagingSenderId: "xxxx",
      appId: "xxxxxxxx",
      measurementId: "xxxx"
    };
    
    firebase.initializeApp(config);
  },

  messaging() {
    const msg = firebase.messaging();
  
    msg.usePublicVapidKey("xxxxxx");

    console.log('Set firebase messaging config')

    return msg;
  }
}

export default Firebase
```
   
El campo **usePublicVapidKey** se rellenará con el Cerfificado de par de claves envío web generado anteriormente:   
![Firebase project configuration](documentation/images/firebase_push_cert.png)

La configuración se puede obtener de la consola de firebase: apartado "settings" --> "general", en la parte inferior "Aplicaciones web":
![Firebase app configuration](documentation/images/firebase_config.png)

Posteriormente tenemos que agregar el SDK de firebase a nuestra applicación, para ello primero debemos descargar la clave privada accediendo a la consola de firebase:
![Firebase SDK](documentation/images/firebase_private_key.png)

Guardaremos el fichero en nuestro ordenador y añadiremos esa ruta en el fichero creado anteriormente `firebase-config.js` de la siguiente forma (en este caso la ruta del fichero descargado con la clave es `/Users/bmontalvo/Documents/Vixens/firebase-adminsdk.json` ):
```
...
...
import * as admin from 'firebase-admin';
import serviceAccount from '/Users/bmontalvo/Documents/Vixens/firebase-adminsdk.json';

const config = {
      ...
      ...
      credential: admin.credential.cert(serviceAccount),
    };
```

7. Por último añadimos la configuración necesaria para enviar notificaciones en el fichero `main.js`:   
Tener en cuenta que hay que sustituir el campo <App_name> en la URL de la petición por el normbre de nuestra aplicación en firebase y el campo <Clave de servidor> de la cabecera de autenticación.   
```
import Firebase from './firebase-config.js'
import axios from 'axios'

Firebase.init()
const messaging = Firebase.messaging()

// [START refresh_token]
  // Callback fired if Instance ID token is updated.
  messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
    }).catch((err) => {
      console.log('Unable to retrieve refreshed token ', err);
    });
  });
  // [END refresh_token]

  // [START receive_message]
  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a service worker
  //   `messaging.setBackgroundMessageHandler` handler.
  messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
  });
  // [END receive_message]



  // Send the Instance ID token your application server, so that it can:
  // - send messages back to this app
  // - subscribe/unsubscribe the token from topics
  function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
      console.log('Sending token to server... ', currentToken);
      axios.post('https://iid.googleapis.com/iid/v1/' + currentToken + '/rel/topics/<App_name>', '', 
      {
        headers:
        {
          'Authorization': 'Bearer <Clave de servidor>',
          'Content-Type': 'application/json'
        }
      } 
      )
      .then(response => {
        console.log('Success', response)
      })
      .catch(err => {
        console.error(err)
      })
    } else {
      console.log('Token already sent to server so won\'t send it again ' +
          'unless it changes');
    }

  }

  function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1';
  }

  function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0');
  }

Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('Notification permission granted.');
    getCurrentToken()
  } else {
    console.log('Unable to get permission to notify.');
  }
});

const getCurrentToken = () => {
  // Get Instance ID token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  messaging.getToken().then((currentToken) => {
    if (currentToken) {
      sendTokenToServer(currentToken);
    } else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.');
      // Show permission UI.
      setTokenSentToServer(false);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    setTokenSentToServer(false);
  });
}
```

Volvemos a generar la aplicación en modo producción y... ¡hemos terminado!   


8. Para probar que las notificaciones funcionan correctamente podemos acceder a la consola de firebase y crear una nueva aplicación de prueba https://console.firebase.google.com/u/0/project/_/notification?hl=es. El token de registro FCM que se debe añadir a la notificación es el que se muestra como traza por consola en la aplicación, se pueden registrar tantos tokens como dispositivos.

## Extras

- Añadir icono de la aplicación: añade la imagen deseada en la ruta /src/public/img/icons y añade la configuración en el fichero `vue.config.js` de la siguiente forma dentro de la clave pwa:
```
iconPaths: {
      favicon32: 'img/icons/party_icon.png',
      favicon16: 'img/icons/party_icon.png',
      appleTouchIcon: 'img/icons/party_icon.png',
      maskIcon: 'img/icons/party_icon.png',
      msTileImage: 'img/icons/party_icon.png'
    },
    manifestOptions: {
      icons: [
        { src: "./img/icons/party_icon.png", "sizes": "192x192", "type": "image/png" }, 
        { src: "./img/icons/party_icon.png", "sizes": "512x512", "type": "image/png" }, 
        { src: "./img/icons/party_icon.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" }, 
        { src: "./img/icons/party_icon.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
      ]
    }
```

- Alojar la aplicación en servidor de firebase para utilizarla por https:
```
firebase init hosting
```

En este paso se aplicará la siguiente configuración:   
> ? What do you want to use as your public directory? **dist**   
> ? Configure as a single-page app (rewrite all urls to /index.html)? (y/N) **y**   
> ? File dist/index.html already exists. Overwrite? **y**   

```
firebase deploy --only hosting

npm run build

firebase deploy
```