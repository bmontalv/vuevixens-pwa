import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Firebase from './firebase-config.js'
import axios from 'axios'


Vue.config.productionTip = false
Firebase.init()
const messaging = Firebase.messaging()

// [START refresh_token]
  // Callback fired if Instance ID token is updated.
  messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
      console.log('Token refreshed. ', refreshedToken);
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      // setTokenSentToServer(false);
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


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
