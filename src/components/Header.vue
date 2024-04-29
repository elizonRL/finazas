<template>
  <header>
    <RouterLink to="/">
      <div class="header_finanza">
        <Moneybag />
        <h1>Finanzas</h1>
      </div>
    </RouterLink>
    <nav>
      <ul>
        <div v-if="!login">
          <li>
            <RouterLink to="/login">
              <LoginIcon /> Log in
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/singup">Singup</RouterLink>
          </li>
        </div>
        <div v-else>
          <li>
            <RouterLink to="/">
              <HomeIcon /> Home
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/ingresos">
              <IngresoIcon /> Ingresos
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/about">
              <AboutIcon /> About
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/login" @click="logout">
              <LogoutIcon />
            </RouterLink>
          </li>
        </div>
      </ul>
    </nav>
  </header>
</template>
<script setup>
import { ref, watch } from 'vue';
import Moneybag from './icons/Moneybag.vue';
import HomeIcon from './icons/HomeIcon.vue';
import IngresoIcon from './icons/IngresoIcon.vue';
import AboutIcon from './icons/AboutIcon.vue';
import LogoutIcon from './icons/LogoutIcon.vue';
import LoginIcon from './LoginIcon.vue';
const login = ref(false);

if(localStorage.getItem('user')) {
  login.value = true;
}

const logout = () => {
  localStorage.removeItem('user');
  login.value = false;
}

</script>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
  background: #f3f3f3;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

div {
  display: flex;
  align-items: center;
}

nav ul {
  display: flex;
  list-style: none;
}

nav ul li {
  margin-right: 1rem;
}

nav ul li a {
  font-size: 24px;
  text-decoration: none;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: #333;
  font-weight: 500;
}

nav ul li a:hover {
  color: var(--color-secondary);
}

h1 {
  font-size: 44px;
  margin-left: 1rem;
  font-weight: 700;
}

a {
  text-decoration: none;
  color: #333;
}

@media (prefers-color-scheme: dark) {
  header {
    background: var(--navbar-color);
    color: white;
  }

  a {
    color: var(--text-color);
  }

  nav ul li a {
    color: var(--text-color);
  }

  nav ul li a:hover {
    color: var(--accent-color);
  }
}
</style>