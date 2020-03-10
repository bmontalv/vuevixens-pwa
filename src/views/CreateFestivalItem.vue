<template>
  <div>
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
        <label for="age">Imagen</label>
        <input
          id="image"
          v-model="image"
          type="text"
          name="image"
          placeholder="Introduce URL de la imagen">
      </p>

      <p>
        <label for="date">Fecha</label>
        <input type="date" v-model="date" />
      </p>

      <p>
        <input
          type="submit"
          value="Guardar"
        >
      </p>

    </form>
  </div>
</template>

<script>
import axios from 'axios'

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
      if (this.name && this.image && this.date) {
        let id = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4);
        const newFestival = {
          id: 'festival-' + id,
          name: this.name,
          image: this.image,
          date: this.date
        }
        localStorage.setItem('festival-' + id, JSON.stringify(newFestival))
      }
      console.log(localStorage)
      ev.preventDefault();

    // POST https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send HTTP/1.1

    // Content-Type: application/json
    // Authorization: Bearer ya29.ElqKBGN2Ri_Uz...PbJ_uNasm

    // {
    //   "message": {
    //     "token" : <token of destination app>,
    //     "notification": {
    //       "title": "FCM Message",
    //       "body": "This is a message from FCM"
    //     },
    //     "webpush": {
    //       "headers": {
    //         "Urgency": "high"
    //       },
    //       "notification": {
    //         "body": "This is a message from FCM to web",
    //         "requireInteraction": "true",
    //         "badge": "/badge-icon.png"
    //       }
    //     }
    //   }
    // }

      axios.post('https://fcm.googleapis.com/v1/projects/project-1056270913057/messages:send', 
      {
        "message": {
          "topic": "festivales",
          "notification": {
            "title": "FCM Message",
            "body": "This is a message from FCM",
            "requireInteraction": "true"
          },
          "webpush": {
            "headers": {
              "Urgency": "high"
            },
            "notification": {
              "body": "This is a message from FCM to web",
              "requireInteraction": "true",
              "badge": "/badge-icon.png"
            }
          }
        }
      }, 
      {
        headers:
        {
          'Authorization': 'Bearer AAAA9e6nDiE:APA91bEIlp3JEGYjQbnv6ar9pHEOeqEuU61QjjwOqoRsU8X5Lj5lzx4iXVvCmqzBfipu4xktxSxaw6cmE80unpgdc7Fgxm_bL_IYv62RZ1_RnZQ-HulalNoOJsNY999bNlB2fpnLOF8n',
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

      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss">

</style>
