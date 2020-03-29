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
