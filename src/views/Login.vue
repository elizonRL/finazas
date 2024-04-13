<template>
    <article>
        <h1>inicia secsion</h1>
    </article>
    <div>
        <h2>
            <UserIcoon /> Log in
        </h2>
        <form @submit.prevent="login">
            <input type="text" v-model="username" placeholder="Username" required>
            <input type="password" v-model="password" placeholder="Password" required>
            <button type="submit" :disabled="loading">
                <Spinner v-if="loading" />
                <span v-else>
                    Login
                </span>
            </button>
        </form>
        <RouterLink to="/singup">Registrate</RouterLink>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Spinner from '../components/Spiner.vue';
import UserIcoon from '@/components/icons/UserIcoon.vue';

const username = ref('');
const password = ref('');
const loading = ref(false);

const login = () => {
    loading.value = true;
    console.log(username.value, password.value);
    username.value = '';
    password.value = '';
    loading.value = false;
}
</script>
<style scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    height: 50vh;
    width: 850px;
    
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
    background: var(--secondary-color);
    color: white;
    cursor: pointer;
}

button:hover {
    background: var(--accent-color);
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

h2 {
    font-size: 24px;
    font-weight: 700;
    margin: 20;
    padding: 1rem;
    color: #333;
    text-align: center;
    border-radius: 10px;
}

a {
    font-size: 20px;
    color: #555;
    text-decoration: none;
    margin: 10px;
}

@media (prefers-color-scheme: dark) {

    input {
        background: #333;
        color: white;
    }

    button {
        background: var(--accent-color);
    }

    button:hover {
        background: #555;
    }

    h2 {
        color: white;
    }

    a {
        color: white;
    }
}
</style>