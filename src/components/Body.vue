<script setup>
import { ref } from 'vue';
const ingresos = ref('');
const data = [
    {ingresos: ""},
]

const ingresosP = () => {
    data.push({ingresos: ingresos.value})
    ingresos.value = ''
   
}


</script>
<template>
    <h1>Finazas personales</h1>
    <span>Crea tu control de finazas</span>

    <form>
        <div>
            <label for="Ingresos">Ingresos</label>
            <input type="text" id="concepto" v-model="ingresos"/>
        </div>
        <button @submit.prevent="ingresosP">Agregar</button>
    </form>
    <div v-for="datas in data ">
       {{datas.ingresos}}
    </div>
</template>
<style scoped>
form {
    margin: 2rem auto;

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
    padding: 0.9rem;
    margin: 0.5rem 0;
    border-bottom: 1px solid #ccc;
    border-radius: 0.25rem;
}
label {
    font-weight: bold;
    display: block;
    margin: 1rem 0;
    font-size: 25px;
}
</style>