<template>
    <article>
        <h1>Registrate como usuario</h1>
    </article>
    <section>
        <Alert :message="alert.message" :show="alert.show" :type="alert.type" @close="alert.show = false" />
        <h2>
            <UsersIcon /> Registro de Usuarios
        </h2>
        <form>
            <input type="text" v-model="username" placeholder="username">
            <input type="password" v-model="password" placeholder="password">
            <button @click.prevent="register">Register</button>
        </form>
        <small>Si ya estas Registrado inica secsion</small>
        <RouterLink to="/login">Log in</RouterLink>
    </section>
</template>
<script setup>
import Alert from '@/components/Alert.vue';
import UsersIcon from '@/components/icons/UsersIcon.vue';
import { reactive, ref } from 'vue';
import { showAlert } from '@/components/composable/httpsMethod';
import axios from 'axios';

const username = ref('')
const password = ref('')
const alert = reactive({
    show: false,
    message: '',
    type: 'danger'
});
const register = async () => {
    if (username.value === '' || password.value === '') {
        showAlert(alert, 'Todos los campos son obligatorios')
    }
    await axios.post('http://localhost:8080/users', {
        username: username.value,
        password: password.value
    });
    showAlert(alert, 'Usuario registrado correctamente', 'success');
    username.value = '';
    password.value = '';
}
</script>
<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    height: 50vh;
    width: 850px;
}

h1 {
    font-size: 44px;
    font-weight: 700;
    margin: 10;
    padding: 1rem;
    background: var(--accent-color);
    color: white;
    text-align: center;
    border-radius: 10px;
}

form {
    display: flex;
    flex-direction: column;
    width: 50%;
    gap: 1rem;
}

input {
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid var(--accent-color);
    border-radius: 5px;
}

button {
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    align-items: center;
    border-radius: 5px;
    color: white;
    background: var(--secondary-color);
}

button:hover {
    background: var(--accent-color);
}

a {
    font-size: 22px;
    margin: 10px;
    color: var(--accent-color);
    text-decoration: none;
}

small {
    font-size: 14px;
    margin: 10px;
}

@media (prefers-color-scheme: dark) {
    h1 {
        background: var(--accent-color);
        color: white;
    }

    button {
        background: var(--accent-color);
    }

    button:hover {
        background: var(--secondary-color);
    }
}
</style>
