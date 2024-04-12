<template>
  <section>
    <div>
      <Modal :show="showAddGastos.show" @close="showAddGastos.show = flase">
        <template #header>
          <h1>Agrega tus gastos</h1>
        </template>
        <template #conten>
          <div class="header-ingreso">
            <samp>
              <Clendar /> Mes: {{ showAddGastos.data.month }}
            </samp>
            <samp>Ingreso: {{ showAddGastos.data.ingreso }}</samp>
            <samp>Porcentaje Gastado: {{ showAddGastos.data.porcentaje }} %</samp>
          </div>
          <div class="gastos-grup">
            <label for="concepto">Concepto</label>
            <input type="text" id="concepto" v-model="concepto" />
          </div>
          <div class="gastos-grup">
            <label for="monto">Monto</label>
            <input type="text" id="monto" v-model="gasto" />
          </div>
        </template>
        <template #footer>
          <button class="closed" @click="showAddGastos.show = false">Close</button>
          <button class="save" @click="addGastos()">Agregar</button>
        </template>
      </Modal>
      <Modal :show="showEditIngresos.show" @close="showEditIngresos.show = false">
        <template #header>
          <h1>Editar Ingresos</h1>
        </template>
        <template #conten>
          <FromEditIngresos :data="showEditIngresos.data" />
        </template>
        <template #footer>
          <button class="closed" @click="showEditIngresos.show = false">Close</button>
          <button class="save" @click="updateIngresos()">Guardar</button>
        </template>
      </Modal>
      <div class="header_finanza">
        <h1>Agrega Tus Finanzas</h1>
      </div>
      
      <article >
        <Spiner class="spinner"  v-if="isLoading"/>
        <FormIngresos @submit="addIngresos" v-else/>
      </article>
      <Alert :message="alert.message" :show="alert.show" @close="alert.show = flase" :type="alert.type" />
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
                  <Pencil @click="editIngresos(datas)" />
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
    </div>
  </section>
</template>
<script setup>
//Importamos los componentes
import Modal from './Modal.vue';
import Plus from './icons/Plus.vue';
import Trash from './icons/Trash.vue';
import Pencil from './icons/Pencil.vue';
import { reactive, ref } from 'vue';
import axios from 'axios';
import FormIngresos from './FormIngresos.vue';
import Clendar from './icons/Calendar.vue';
import FromEditIngresos from './FromEditIngresos.vue';
import Spiner from './Spiner.vue';
import Alert from './Alert.vue';
import { fetchTodos, showAlert } from './composable/httpsMethod.js';
//Variables reactivas
const data = ref([]);
const isLoading = ref(false);
const concepto = ref('');
const gasto = ref('');
const showAddGastos = reactive({
  show: false,
  data: {
    id: '',
    gastos: '',
    month: '',
    gastos: [],
    porcentaje: 0
  }
});
const showEditIngresos = reactive({
  show: false,
  data: {
    id: '',
    gastos: '',
    month: '',
    gastos: [],
    porcentaje: 0,
    totalGastado: 0
  }
});
const alert = reactive({
  show: false,
  message: "",
  type: "danger",
});

/* Funciones
Funcion para traer los datos de la base de dato
Llamamos la funcion para traer los datos */
fetchTodos(data, isLoading);
//Funcion para agregar los ingresos
const addIngresos = async (ingresos, month) => {
  try {
    //Validamos que los campos no esten vacios
    let nuewValue = parseFloat(ingresos);
    let namComprobation = isNaN(nuewValue);
    //Validamos que los campos no esten vacios
    if (ingresos.value == '' || month.value === '') return showAlert(alert, 'Debes Completar los campos')
    if (namComprobation) return showAlert(alert, 'Este campo solo acepta numeros')

    //Hacemos la peticion a la base de datos
    const res = await axios.post('http://localhost:8080/finanzas', {
      ingreso: nuewValue,
      month: date(month),
      gastos: [],
      porcentaje: 0,
      totalGastado: 0
    })
    data.value.push(res.data)
    showAlert(alert, 'Ingresos agregados correctamente', 'success');
  } catch (error) {
    showAlert(alert, 'Error al agregar los ingresos');
  }

}
//Funcion para dar formato a la fecha
const date = (month) => {
  return new Date(month).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}

//Funcion para calcular el porcentaje gastado
const porcentajeGastado = (showAddGastos) => {
  let totalGastos = showAddGastos.data.gastos.map(gasto => gasto.monto).reduce((acc, monto) => acc + monto, 0)

  let porcentaje = (totalGastos * 100) / showAddGastos.data.ingreso;
  showAddGastos.data.porcentaje = porcentaje.toFixed(2);
  return { totalGastos, porcentaje }
}

//Funcion para eliminar los ingresos
const removeIngresos = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:8080/finanzas/${id}`)
    fetchTodos(data, isLoading)
    showAlert(alert, 'Ingresos eliminados correctamente', 'success');
  } catch (error) {
    showAlert(alert, 'Error al eliminar los ingresos');
  }

}
//Funcion para editar los ingresos
const editIngresos = async (datas) => {
  showEditIngresos.data = { ...datas }
  showEditIngresos.show = true;
}
//Funcion para actualizar los ingresos
const updateIngresos = async () => {
  try {
    let porcentaje = porcentajeGastado(showEditIngresos).porcentaje
    let { id, ingreso, month } = showEditIngresos.data;
    const res = await axios.patch(`http://localhost:8080/finanzas/${id}`, {
      ingreso: ingreso,
      month: date(month),
      porcentaje: porcentaje,
    });
    showEditIngresos.show = false;
    showAlert(alert, 'Ingresos actualizados correctamente', 'success');
    fetchTodos(data, isLoading)
  } catch (error) {
    showAlert(alert, 'Error al actualizar los ingresos');
  }
}
//Funcion para abrir el modal
const openModal = (datas) => {
  showAddGastos.data = { ...datas };
  if (showAddGastos.data.porcentaje == 100){
    return showAlert(alert, 'Ya has gastado mas del 100% de tus ingresos', 'warning');
  } 
  showAddGastos.show = true;
}
//Funcion para agregar los gastos

const addGastos = async () => {
  try {
    const gastosUpdate = {
      concepto: concepto.value,
      monto: parseFloat(gasto.value)
    }
    concepto.value = '';
    gasto.value = '';
    showAddGastos.data.gastos.push(gastosUpdate)
    showAddGastos.data.gastos = [...showAddGastos.data.gastos]
    const total = porcentajeGastado(showAddGastos).totalGastos

    const { id, gastos, porcentaje } = showAddGastos.data;
    showAddGastos.show = false;
    const res = await axios.patch(`http://localhost:8080/finanzas/${id}`, {
      gastos: gastos,
      porcentaje: porcentaje,
      totalGastado: total
    })
    fetchTodos(data, isLoading)
    showAlert(alert, 'Gastos agregados correctamente', 'success');
  } catch (error) {
    showAlert(alert, 'Error al agregar los gastos');
  }
}
</script>
<style scoped>
article {
  margin: 10px auto;
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

.gastos-grup {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.gastos-grup input {
  width: 100%;
  padding: 20px;
  margin: 10px;
  height: 30px;
  justify-content: center;
}

.gastos-grup label {
  font-weight: bold;
  display: block;
  margin: 1rem 0;
  font-size: 25px;
}

button {
  padding: 1rem 1rem;
  width: 150px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.closed:hover {
  background-color: rgb(172, 60, 60);

}

.save:hover {
  background-color: rgb(60, 172, 60);
}

label {
  font-weight: bold;
  display: block;
  margin: 1rem 0;
  font-size: 25px;
}

.header-ingreso {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  width: 100%;
}

samp {
  font-size: 20px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.spinner {
  margin: auto;
  margin-top: 30px;

}

.louder {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

@media (prefers-color-scheme: dark) {
  .card-ingresos {
    background: var(--navbar-color);
    color: var(--text-color);
  }

  article {
    background: var(--navbar-color);
    color: var(--text-color);
  }
}
</style>