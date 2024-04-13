<template>
    <article>
            <h1><UsersIcon/> Registro de Usuarios</h1>
            <form>
                <input type="text" v-model="username" placeholder="username">
                <input type="password" v-model="password" placeholder="password">
                <button @click="register">Register</button>
            </form>
            <small>Si ya estas Registrado inica secsion</small>
            <RouterLink to="/login">Log in</RouterLink>
    </article>
</template>
<script setup>
import UsersIcon from '@/components/icons/UsersIcon.vue';
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const register = () => {
    console.log(username.value, password.value)
}
</script>
<style scoped>

article {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    height: 50vh;
    width: 850px;
   border: 1px solid #ccc; 
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
</style>
