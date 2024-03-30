<template>
    <div class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="close" @click="close">&times;</span>
                <h2>Modal Header</h2>
            </div>
            <div class="modal-body">
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
            </div>
            <div class="modal-footer">
                <button @click="close" class="closed">close</button>
                <button class="save">Save</button>
            </div>
        </div>
    </div>


</template>
<script setup>
const emit = defineEmits(['close'])
   const close = () => {
       emit('close')
   }
</script>

<style scoped>
/* Modal Header */
.modal-header {
    padding: 2px 16px;
    background-color: #5cb85c;
    color: white;
}
span{
    text-align: center;
    align-items: center;
    float: right;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
}
span:hover{

    color: red;
}
/* Modal Body */
.modal-body {
    padding: 2px 16px;
}

/* Modal Footer */
.modal-footer {
    display: flex;
    padding: 10px 16px;
    background-color: #5cb85c;
    color: white;
    justify-content: space-between;
    align-items: center;
    
}

/* Modal Content */
.modal {
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
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
    padding: 20px;
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
button {
    padding: 1rem 1rem;
    width: 150px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}
.closed:hover {
    background-color: rgb(172, 60, 60);
    
}
.save:hover {
    background-color: rgb(60, 172, 60);
}
/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

.modal-header {
  padding: 2px 16px;
  background-color: rgb(83, 83, 93);
  color: white;
}

.modal-body {
  padding: 16px;
  background-color: var(--backgroung-color);
}

.modal-footer {
  padding: 16px;
  background-color: rgb(83, 83, 93);
  color: white;
}
</style>