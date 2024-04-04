<template>
  <section>
    <Modal :show="showAddGastos.show" @close="showAddGastos.show = flase">
      <template #header>
        <h1>Agrega tus gastos</h1>
      </template>
      <template #conten>
        <div class="montos">
          <label for="monto">Monto</label>
          <input type="text" id="monto" />
        </div>
        <div class="montos">
          <label for="concepto">Concepto</label>
          <input type="text" id="concepto" />
        </div>
      </template>
      <template #footer>
        <button @click="updateGastos(showAddGastos.data.id)">Agregar</button>
        <button @click="showAddGastos.show = false">Close</button>
      </template>
    </Modal>

    <div class="header_finanza">
      <h1>Agrega Tus Finanzas</h1>
    </div>
    <article>
      <FormIngresos @submit="addIngresos" />
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
                {{ datas.porcentaje }} %
              </td>
              <td>
                <Pencil @click="editIngresos(datas.id)" />
              </td>
              <td>
                <Trash @click="removeIngresos(datas.id)" />
              </td>
              <td>
                <Plus @click="openModal(datas)" />
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>

  </section>
</template>
<script setup>
//Importamos los componentes
import Modal from './Modal.vue';
import Plus from './icons/Plus.vue';
import Trash from './icons/Trash.vue';
import Pencil from './icons/Pencil.vue';
import { ref } from 'vue';
import axios from 'axios';
import FormIngresos from './FormIngresos.vue';
//Variables reactivas
const data = ref([]);
const showAddGastos = ref({
  show: false,
  data: {
    id: '',
    gastos: '',
    month: '',
    gastos: [],
    porcentaje: 0
  }
});

//Funciones
//Funcion para traer los datos de la base de datos
const fetchTodos = async () => {
  const res = await axios.get('http://localhost:8080/finanzas')
  data.value = res.data
}
//Llamamos la funcion para traer los datos
fetchTodos()
//Funcion para agregar los ingresos
const addIngresos = async (ingresos, month) => {
  //Validamos que los campos no esten vacios
  let nuewValue = parseFloat(ingresos);
  let namComprobation = isNaN(nuewValue);
  //Validamos que los campos no esten vacios
  if (ingresos.value == '' || month.value === '') return alert('Debes Completar los campos')
  if (namComprobation) return alert('Debes agregar un numero')

  //Hacemos la peticion a la base de datos
  const res = await axios.post('http://localhost:8080/finanzas', {
    ingreso: nuewValue,
    month: date(month),
    gastos: [],
    porcentaje: PorcentajeGastado()
  })
  data.value.push(res.data)

}
//Funcion para dar formato a la fecha
const date = (month) => {
  return new Date(month).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}

//Funcion para calcular el porcentaje gastado
const PorcentajeGastado = () => {
  const gastosPorcentaje = data.value.map((gasto) => gasto.gastos)
  const porcentaje = 0;
  if (gastosPorcentaje.length === 0) return porcentaje;

  return porcentaje;
}

//Funcion para eliminar los ingresos
const removeIngresos = async (id) => {
  const res = await axios.delete(`http://localhost:8080/finanzas/${id}`)
  fetchTodos()
}
//Funcion para editar los ingresos
const editIngresos = async (id) => {
  const res = await axios.put(`http://localhost:8080/finanzas/${id}`, {
    ingreso: ingresos.value,
    month: month.value
  });
  fetchTodos()
}
//Funcion para abrir el modal
const openModal = (datas) => {
  showAddGastos.show = true;
  showAddGastos.data = { ...datas }
  console.log(showAddGastos.data , 'data', showAddGastos.show)
}
const updateGastos = async (id) => {
  const res = await axios.put(`http://localhost:8080/finanzas/${id}`, {
    gastos: gastos.value
  });
  fetchTodos()
}

</script>
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

.montos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 5px;
}

.montos label {
  font-weight: bold;
  display: block;
  margin: 1rem 0;
  font-size: 25px;
}
</style>