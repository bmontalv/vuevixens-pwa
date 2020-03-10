<template>
  <div class="home">
    <h1>Mi lista de festivales</h1>
    <festival-item v-for="(item, index) in festivalList"
      :key="index"
      :festival-data="item"/>
    <router-link to="/create-item">Añadir nuevo festival</router-link>
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
  methods: {
    // registerFCM() {
    //   console.log("registerFCM");
    //   navigator.serviceWorker.register('./../../public/firebase-messaging-sw.js')
    //   .then((registration) => {
    //     messaging.useServiceWorker(registration)
    //     messaging.requestPermission()
    //       .then(() => {
    //         messaging.getToken().then(token => {
    //           console.log(`The token is ${token}`)
    //           // Store the token in the firebase db
    //         })
    //       })
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }
  },
  mounted() {
    // const config = {
    //   apiKey: "AIzaSyDBRBj0L5qUGmtSopVim_VUsfFIuWns4Hk",
    //   authDomain: "vuevixens-pwa.firebaseapp.com",
    //   databaseURL: "https://vuevixens-pwa.firebaseio.com",
    //   projectId: "vuevixens-pwa",
    //   storageBucket: "vuevixens-pwa.appspot.com",
    //   messagingSenderId: "1056270913057"
    // };

    // firebase.initializeApp(config);

    // const messaging = firebase.messaging();

    // messaging.usePublicVapidKey("<Public Vapid Key>")

    // messaging.requestPermission().then(() => {
    //   console.log('Notification permission granted.')
    //   messaging.getToken().then((token) => {
    //     console.log('New token created: ', token)
    //     this.saveNotificationToken(token)
    //   })
    // }).catch((err) => {
    //   console.log('Unable to get permission to notify.', err)
    // })

    // messaging.onTokenRefresh(function () {
    //   messaging.getToken().then(function (newToken) {
    //     console.log('Token refreshed: ', newToken)
    //     this.saveNotificationToken(newToken)
    //   }).catch(function (err) {
    //     console.log('Unable to retrieve refreshed token ', err)
    //   })
    // })

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
.home {
  background-color: #8cb4f5;
}
</style>