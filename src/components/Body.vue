<script setup>
import Modal from './Modal.vue';
import Plus from './icons/Plus.vue';
import Trash from './icons/Trash.vue';
import Pencil from './icons/Pencil.vue';
import { ref } from 'vue';
const ingresos = ref('');
const data = ref([]);
const modal = ref(false);

const addIngresos = () => {
    if (ingresos.value === '') return alert('Debes agregar un ingreso')

    data.value.push({ ingreso: ingresos.value, id: data.value.length + 1 })
    ingresos.value = ''

}

const removeIngresos = (id) => {
    data.value = data.value.filter((datas) => datas.id !== id)
}

/* const editIngresos = (id) => {
   const ingreso = data.value.find((datas) => datas.id === id)
    ingresos.value = ingreso.ingreso
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
                    <span @click="openModal">
                        agregar gastos
                        <Plus />
                    </span>
                </div>
                <div v-for="datas in data" :key="datas.id">
                    <div>
                        <h3>{{ datas.ingreso }}</h3>
                        <Trash @click="removeIngresos(datas.id)"/>
                       <Pencil @click="editIngresos(datas.id)"/>
                    </div>
                </div>
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

.ingresos-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

h2 {
    font-size: 25px;
    font-weight: 700;
    text-align: center;
}
</style>