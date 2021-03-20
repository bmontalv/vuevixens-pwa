import firebase from 'firebase/app';
import 'firebase/messaging';

export const Firebase = {
  init() {
    const config = {
      apiKey: "AIzaSyDBRBj0L5qUGmtSopVim_VUsfFIuWns4Hk",
      authDomain: "vuevixens-pwa.firebaseapp.com",
      databaseURL: "https://vuevixens-pwa.firebaseio.com",
      projectId: "vuevixens-pwa",
      storageBucket: "vuevixens-pwa.appspot.com",
      messagingSenderId: "<SOME_DATA>",
      appId: "<SOME_DATA>",
      measurementId: "<SOME_DATA>",
    };
    
    firebase.initializeApp(config);
    console.log('initialized firebase')
  },

  messaging() {
    const msg = firebase.messaging();
  

    console.log('Set firebase messaging config')

    return msg;
  }
}

export default Firebase