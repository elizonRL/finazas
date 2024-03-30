<script setup>
import Moneybag from './icons/Moneybag.vue';
</script>
<template>
    <header>
        <div class="header_finanza">
            <Moneybag />
            <h1>Finanzas</h1>
        </div>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Ingresos</a></li>
                <li><a href="#">Gastos</a></li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
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
    color: #333;
    font-weight: 500;
}
nav ul li a:hover {
    color: var(--color-secondary);
}
h1{
    font-size: 44px;
    margin-left: 1rem;
    font-weight: 700;
}
</style>