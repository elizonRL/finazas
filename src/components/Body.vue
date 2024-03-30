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
            <h1>Agrega Tus Finanzas</h1>
        </div>
        <article>
            <form @submit.prevent="ingresosP">
                <div>
                    <label for="Ingresos">Ingresos</label>
                    <input type="text" id="concepto" v-model="ingresos" />
                </div>
                <button>Agregar Ingresos</button>
                <div class="gastos-grup">
                    <div class="montos">
                    <label for="gasto">Nombre del Gasto</label>
                    <input type="text" id="gasto" />
                </div>
                    <div class="montos">
                        <label for="monto">Monto</label>
                        <input type="text" id="monto" />
                    </div>
                    
                </div>
                <button @click="">Agregar Gastos</button>
            </form>

        </article>
        <div class="card-ingresos">
            <div v-if="data.length === 0">
                <h1>No hay ingresos</h1>
            </div>

            <div v-else v-for="datas in data ">
                <h2>Mis ingresos</h2>
                <a href="">
                    <Plus />
                </a>
                <span>Mis ingresos</span>
                <p>{{ datas.ingreso }}</p>
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
    width: 50%;
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
.gastos-grup {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
.gastos-grup input {
    width: 100%;
    padding: 10px;
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