# vuevixens-pwa

## Pasos para crear proyecto de una Progressive Web App (PWA) con Vue

Para poder seguir este tutorial el necesario tener instalado `npm` y `vue CLI`.

### 1. Instalación de Vue y creación del proyecto
Creamos un proyecto nuevo de Vue llamado `vuevixens-pwa` ejecutando en consola:

`vue create vuevixens-pwa`

Selecciona la siguiente configuración para el proyecto:
- Babel
- Progressive Web App (PWA) Support
- Router
_ Vuex
- CSS Pre-processors
- Linter / Formatter

? Use history mode for router? **No**   
? Pick a linter / formatter config: **Basic**   
? Pick additional lint features: **Lint on save**   
? Where do you prefer placing config for Babel, EsLint, etc.? **In package.json**   
? Save this as a preset for future projects? **n**   

### 2. Configuración de la PWA

Crear nuevo fichero `vue.config.js` en la raiz del proyecto (al nivel de package.json) y pegar el siguiente contenido:

```
{
 "name": "Mis festivales favoritos",
 "short_name": "Festivales",
 "start_url": "index.html", 
 "display": "standalone", //display ascpect (normal, fullscreen or minimal-ui)
 "theme_color": "#0476F2",
 "background_color": "#fff"
}

```

### 3. Creación de la aplicación web

### 4. Ejecutar la aplicación
Para lanzar la aplicación y poderla usar en modo PWA es necesario construir el paquete de producción para ello:

1. Instalaremos el paquete `serve` ejecutando en la consola (este paso solo hay que realizarlo la primera vez):
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

### 5. Inlcuir notificaciones push
para incluir este tipo de notificaciones en nustra aplicación, en primer lugar debemos tener un servicio de notificaciones, en este caso utilizaremos el servicio de Firebase y lo configuraremos de la siguiente forma:

1. Ir a la consola de firebase (https://console.firebase.google.com/?hl=es-419&pli=1), también se puede buscar en Google "Firebase".   
2. Crear nuevo proyecto en firebase con el nombre deseado y aceptar las condiciones de uso.   
3. Ir a configuración, en la parte izquierda superior, pinchar sobre el icono de configuración y seleccionar “Configuración del proyecto”:
![Firebase project configuration](documentation/images/firebase_project_config.png)

Ir a la pestaña "Cloud Messaging", al final de este apartado aparece la opción para activar los certificados push web. Activamos y nos aparecerá una clave junto con la fecha de creación.   

4. En nuestro proyecto Vue también tendremos que instalar firebase. Ejecutamos en la consola los siguientes comandos:
```
sudo npm install --save firebase

firebase init functions

firebase use --add
```

5. En el pryecto creamos un nuevo fichero llamado `firebase-messaging-sw.js` en la ruta public/ con el siguiente contenido. Dónde MessagingSenderId será nuestro "Id de remitente" de firebase: 
```
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');

firebase.initializeApp({'messagingSenderId': "xxxxxxx"});

const messaging = firebase.messaging();
```
![Firebase project configuration](documentation/images/firebase_cloud_messaging.png)

6. Añadimos la configuración necesaria para enviar notificaciones en el fichero `main.js`:
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
      axios.post('https://iid.googleapis.com/iid/v1/' + currentToken + '/rel/topics/festivales', '', 
      {
        headers:
        {
          'Authorization': 'Bearer <Clave del servidor>',
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

-----------------
-----------------


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
