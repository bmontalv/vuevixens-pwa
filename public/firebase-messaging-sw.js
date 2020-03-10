// import firebase from 'firebase/app';
// import 'firebase/messaging';
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');

firebase.initializeApp({'messagingSenderId': "1056270913057"});

const messaging = firebase.messaging();
