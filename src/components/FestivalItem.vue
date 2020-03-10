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
  background-color: #f0f2f5;

  h1 {
      margin: 1em 0 0.5em 0;
      color: #343434;
      font-weight: bold;
      font-family: 'Ultra', sans-serif;   
      font-size: 36px;
      line-height: 42px;
      text-transform: uppercase;
      text-shadow: 0 2px white, 0 3px #777;
    }

  .data-wrapper {
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
      width: 30%;
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
}
</style>
