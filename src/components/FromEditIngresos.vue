<template>
    <div class="conten">
        <div class="form-group">
            <label for="month">Mes</label>
            <input type="month" id="month" v-model="data.month" />
        </div>
        <div class="form-group">
            <label for="ingreso">Ingreso</label>
            <input type="text" id="ingreso" v-model="data.ingreso" />
        </div>
    </div>
</template>
<script setup>

defineProps({
    data: Object
})

</script>

<style scoped>
.conten {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

input {
    width: 100%;
    padding: 1rem;
    border: 2px solid rgba(103, 224, 158, 0.5);
    border-radius: 0.5rem;
}

input[type="month"] {
    width: 100%;
    border: none;
}

input[type="month"]:focus {
    outline: none;
}

input[type="text"]:focus {
    outline: none;
}
</style>