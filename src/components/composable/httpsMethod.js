import axios from "axios";

const fetchTodos = async (data, isLoading) => {
    try {
      isLoading.value = true;
      const res = await axios.get('http://localhost:8080/finanzas')
      data.value = res.data
    } catch (error) {
      showAlert('Error al traer los datos de la base de datos');
    }
    isLoading.value = false;
  }
  function showAlert(alert, message, type = "danger") {
    alert.show = true;
    alert.message = message;
    alert.type = type;
  }
  export { fetchTodos, showAlert}