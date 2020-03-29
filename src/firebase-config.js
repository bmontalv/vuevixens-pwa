import firebase from 'firebase/app';
import 'firebase/messaging';
import * as admin from 'firebase-admin';
import serviceAccount from '<SOME_DATA>/firebase-adminsdk.json';


export const Firebase = {
  init() {
    const config = {
      apiKey: "<SOME_DATA>",
      authDomain: "<SOME_DATA>",
      databaseURL: "<SOME_DATA>",
      projectId: "vuevixens-pwa",
      storageBucket: "vuevixens-pwa.appspot.com",
      messagingSenderId: "<SOME_DATA>",
      appId: "<SOME_DATA>",
      measurementId: "<SOME_DATA>",
      credential: admin.credential.cert(serviceAccount),
    };
    
    firebase.initializeApp(config);
    console.log('initialized firebase')
  },

  messaging() {
    const msg = firebase.messaging();
  
    msg.usePublicVapidKey("<SOME_DATA>");

    console.log('Set firebase messaging config')

    return msg;
  }
}

export default Firebase