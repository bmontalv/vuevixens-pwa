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