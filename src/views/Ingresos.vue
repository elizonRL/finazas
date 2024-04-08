<template>
  <main>
    <h1>Ingresos</h1>
    <div v-if="ingresos.length == 0">
      <Span>No tiene ingresos registrados regitra uno </Span>
    </div>
    <div v-else>
      <Span>Detalle de los ingresos Mensuales</Span>
      <div class="grilla">
        <div class="card" v-for="datas in ingresos" :key="datas.id">
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
import { ref } from 'vue';
import axios from 'axios';

const ingresos = ref([]);

const getIngresos = async () => {
  const res = await axios.get('http://localhost:8080/finanzas');
  ingresos.value = res.data;
}
getIngresos();
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
</style>