<template>
  <main>
    <Modal :show="showEditIngreso.show" @close="showEditIngreso.show = false">
      <template #header>
        <h3>Edita tus ingresos</h3>
      </template>
      <template #conten>
        <form>
          <label for="month">Mes</label>
          <input type="month" id="month" name="month" />
          <label for="ingreso">Ingreso</label>
          <input type="number" id="ingreso" name="ingreso" />
        </form>
      </template>
      <template #footer>
        <button @click="showEditIngreso.show = false">Cerrar</button>
        <button @click="">Guardar</button>
      </template>
    </Modal>
    <h1>Ingresos</h1>
    <div v-if="ingresos.length == 0">
      <Span>No tiene ingresos registrados regitra uno </Span>
    </div>
    <div v-else>
      <Span>Detalle de los ingresos Mensuales</Span>
      <p>Estos son tu ingresos mensuales registrados</p>
      <div class="grilla">
        <div class="card" v-for="datas in ingresos" :key="datas.id">
          <div class="btn-grup">
            <Plus/>
            <Trash @click="deleteIngreso(datas.id)" />
            <Pencil @click="editIngreso(datas)"/>
          </div>
        
          <div class="card-header">
            <h3>Ingresos</h3>
            <span>{{ datas.month }}</span>
          </div>
          <div class="card-body">
            <p>Ingreso: {{ datas.ingreso }}</p>
            <p>Porcentaje: {{ datas.porcentaje }}%</p>
            <h4 v-if="datas.gastos.length">Gastos del mes</h4>
            <div class="gastos">
              <div v-for="gasto in datas.gastos">
                <p>Concepto: {{ gasto.concepto }}</p>
                <p>Monto: {{ gasto.monto }}</p>
              </div>
            </div>
          </div>
          <div class="card-footer" >
            <h4 v-if="!datas.totalGastado">Total Gastado: 0</h4>
            <h4 v-else>Total Gastado: {{ datas.totalGastado }}</h4>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import Plus from '@/components/icons/Plus.vue';
import Trash from '@/components/icons/Trash.vue';
import Pencil from '@/components/icons/Pencil.vue';
import Modal from '@/components/Modal.vue';

const url = ref(import.meta.env.VITE_URL);
const ingresos = ref([]);
const showEditIngreso = reactive({
  show: false,
  data:
    {
      id: 0,
      month: '',
      ingreso: 0,
      porcentaje: 0,
      gastos: [],
      totalGastado: 0
    }
})

//Funciones
//Obtener los ingresos
const getIngresos = async () => {
  const res = await axios.get('http://localhost:8080/finanzas');
 console.log(url);
  ingresos.value = res.data;
}
getIngresos();
//Eliminar un ingreso
const deleteIngreso = async (id) => {
  await axios.delete(`http://localhost:8080/finanzas/${id}`);
  getIngresos();
}
const editIngreso = async (data) => {
  showEditIngreso.show = true;
  showEditIngreso.data = data;
}
/* const addGasto = async (id) => {
  await axios.post(`http://localhost:8080/finanzas/${id}`);
  getIngresos();
} */

</script>

<style scoped>
main {
  margin: auto;
  max-width: 800px;
  padding: 20px;
}

p {
  font-size: 16px;
  text-wrap: wrap;
  margin-bottom: 20px;
}

h1 {
  font-size: 44px;
  font-weight: 700;
}

h3 {
  font-size: 30px;
  font-weight: 400;
}

h4 {
  font-size: 25px;
  font-weight: 400;
  text-align: center;
}

span {
  font-size: 30px;
  font-weight: 400;
}

.grilla {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.card {
  min-width: 300px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 10px;
}

.gastos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
}
.card-body {
  padding: 10px;
}
.card-footer {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 10px;
  text-align: center;
}
.btn-grup {
  display: flex;
  justify-content: end;
  align-items: start;
  padding: 10px;
}
@media (prefers-color-scheme: dark) {
  .card {
    background-color: var(--navbar-color);
    color: #fff;
  }
}
</style>