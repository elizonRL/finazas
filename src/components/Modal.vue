<template>
  <div ref="modal" v-show="show" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header" />
      </div>
      <div class="modal-body">
        <slot name="conten" />
      </div>
      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineProps({
  show: {
    default: false,
  },
})
const modal = ref(null);

const emit = defineEmits(['close']);

const clickListener = (e) => {
  if (e.target === modal.value) {
    emit("close");
  }
}

const keydown = (e) => {
  if (e.key === "Escape") {
    emit("close");
  }
}
onMounted(() => {
  window.addEventListener("click", clickListener);
  window.addEventListener("keydown", keydown);
});
onBeforeUnmount(() => {
  window.removeEventListener("click", clickListener);
  window.removeEventListener("keydown", keydown);
});
</script>

<style scoped>
/* Modal Header */
.modal-header {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

span {
  text-align: center;
  align-items: center;
  float: right;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
}

span:hover {

  color: red;
}

/* Modal Body */
.modal-body {
  height: 250px;
  padding: 2px 16px;
  color: white;
  justify-content: center;
  align-items: center;
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