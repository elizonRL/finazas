<template>
  <form>
    <div class="date">
      <label for="fecha">Mes:</label>
      <input type="month" id="fecha" v-model="month" />
    </div>
    <div>
      <label for="Ingresos">Ingresos</label>
      <input type="text" id="concepto" v-model="ingresos" />
    </div>
    <button @click.prevent="addIngresos()">Agregar</button>
  </form>
</template>
<script>
export default {

  data() {
    return {
      month: "",
      ingresos: ""
    }
  },
  emits: ['submit'],
  methods: {
    addIngresos() {
      this.$emit('submit', this.ingresos, this.month)
      this.ingresos = "";
      this.month = "";
    }
  }
}
</script>
<style scoped>
.date {
  display: flex;
  justify-content: center;
  align-items: center;
}

.date input {
  margin: 0 1rem;
  border: none;
}

.date input:focus {
  border: none;
}

form {
  margin: 1rem auto;
  justify-content: center;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px;
  border: 2px solid rgba(103, 224, 158, 0.5);
  border-radius: 0.25rem;
  background: transparent;
}

label {
  font-weight: bold;
  display: block;
  margin: 1rem 0;
  font-size: 25px;
}

input[type="month"] {
  width: 100%;
}

input[type="month"]:focus {
  outline: none;
}

button {
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

button:hover {
  background-color: var(--accent-color);
}
</style>