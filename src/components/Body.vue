<script setup>
import Modal from './Modal.vue';
import Plus from './icons/Plus.vue';
import Trash from './icons/Trash.vue';
import Pencil from './icons/Pencil.vue';
import { ref } from 'vue';
import axios from 'axios';


const ingresos = ref('');
const month = ref('');
const data = ref([]);
const modal = ref(false);

const date = (month) => {
  return new Date(month.value).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}
const fetchTodos = async () => {
  const res = await axios.get('http://localhost:8080/finanzas')
  data.value = res.data
}
fetchTodos()

const addIngresos = async () => {
 
  let nuewValue = parseFloat(ingresos.value);
  let namComprobation = isNaN(nuewValue);
  console.log(namComprobation);
  if (ingresos.value == '' || month.value === '') return alert('Debes Completar los campos')
  if (namComprobation) return alert('Debes agregar un numero')

  console.log(month.value);
  const res = await axios.post('http://localhost:8080/finanzas', {
    ingreso: nuewValue,
    month: date(month)
  })
   data.value.push(res.data)
  ingresos.value = '';
  month.value = '';
  PorcentajeGastado()
}

const PorcentajeGastado = (id) => {
  const gastosPorcentaje = data.value.filter((datas) => datas.id === id)
  const porcentaje = (gastosPorcentaje * 100) / 1000;
  console.log(porcentaje);
  return porcentaje;
}

const removeIngresos = async (id) => {
  const res = await axios.delete(`http://localhost:8080/finanzas/${id}`)
  fetchTodos()
}

/* const editIngresos = async (id) => {
  const res = await axios.put(`http://localhost:8080/finanzas/${id}`, {
    ingreso: ingresos.value,
    month: month.value
  })
} */
const openModal = () => {
  modal.value = !modal.value;
}


</script>
<template>
  <section>
    <Modal v-show="modal" @close="openModal" />

    <div class="header_finanza">
      <h1>Agrega Tus Finanzas</h1>
    </div>
    <article>
      <form @submit.prevent="addIngresos">
        <div class="date">
          <label for="fecha">Mes:</label>
          <input type="month" id="fecha" v-model="month" />
        </div>
        <div>
          <label for="Ingresos">Ingresos</label>
          <input type="text" id="concepto" v-model="ingresos" />
        </div>
        <button>Agregar</button>
      </form>

    </article>
    <div class="card-ingresos">
      <div v-if="data.length === 0">
        <h1>No hay ingresos</h1>
      </div>

      <div v-else>
        <div class="ingresos-header">
          <h2>Mis ingresos</h2>

        </div>

        <table>
          <thead>
            <tr>
              <th>Mes</th>
              <th>Ingreso</th>
              <th>Porcentaje Gastado</th>
              <th>Editar Ingreso</th>
              <th>Eliminar Ingreso</th>
              <th>Agregar gastos</th>
            </tr>
          </thead>
          <tbody v-for="datas in data" :key="datas.id">
            <tr>
              <td>{{ datas.month }}</td>
              <td>$ {{ datas.ingreso }}</td>
              <td>
                {{ datas.porcentaje}}
              </td>
              <td>
                <Pencil @click="editIngresos(datas.id)" />
              </td>
              <td>
                <Trash @click="removeIngresos(datas.id)" />
              </td>
              <td>
                <Plus @click="openModal" />
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>

  </section>
</template>
<style scoped>
article {
  margin: 50px auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 50%;
  justify-content: center;
  text-align: center;
  box-shadow: 0, 5px, 20px rgba(0, 0, 2, 0.2);
  background: #fff;
}

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

h1 {
  font-size: 44px;
  font-weight: 700;
}

.header_finanza {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
}

.card-ingresos {
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 100%;
  text-align: center;
  box-shadow: 0, 5px, 20px rgba(0, 0, 2, 0.2);
  background: #fff;
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
  background-color: var(--color-secondary);
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

.ingresos-header {
  display: flex;
  justify-content: center;
  align-items: center;

}

h2 {
  font-size: 44px;
  font-weight: 700;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem auto;
}

thead {
  background: #333;
  color: white;
}

th,
td {
  padding: 1rem;
  border-bottom: 1px solid #ccc;
}

input[type="month"] {
  width: 100%;
}

input[type="month"]:focus {
  outline: none;
}
</style>