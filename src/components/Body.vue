<script setup>
import Moneybag from './icons/Moneybag.vue';
import Plus from './icons/Plus.vue';
import { ref } from 'vue';
const ingresos = ref('');
const data = ref([]);

const ingresosP = () => {
    if (ingresos.value === '') return alert('Debes agregar un ingreso')

    data.value.push({ ingreso: ingresos.value })
    ingresos.value = ''
}

</script>
<template>
    <section>
        <div class="header_finanza">
            <Moneybag />
            <h1>Finazas personales</h1>
        </div>
        <article>
            <form @submit.prevent="ingresosP">
                <div>
                    <label for="Ingresos">Ingresos</label>
                    <input type="text" id="concepto" v-model="ingresos" />
                </div>
                <button>Agregar</button>
            </form>

        </article>
        <article>
            <div v-if="data.length === 0">
                <p>No hay ingresos</p>
            </div>
            <a href="">
                <Plus/>
            </a>
            <div v-if="data.length !== 0">
                <h2>Mis ingresos</h2>
                <p v-for="datas in data ">{{ datas.ingreso }}</p>
            </div>
        </article>
    </section>
</template>
<style scoped>
article {
    margin: auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    width: 50%;
    justify-content: center;
    text-align: center;
    box-shadow: 0, 5px, 20px rgba(0, 0, 2, 0.2);
    background: #fff;
}

form {
    margin: 1rem auto;
}

.header_finanza {
    display: flex;
    align-items: center;
    justify-content: center;
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
</style>