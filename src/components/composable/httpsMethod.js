import axios from "axios";


const fetchTodos = async (data, isLoading,) => {
    try {
      isLoading.value = true;
      /* const res = await axios.get(`http://localhost:8080/finanzas?userId=${userId}`) */
      const res = await axios.get("http://localhost:3000/finanzas",{
        headers: {
          Authorization: `jwt ${localStorage.getItem("token")}`,
        },
      })
      data.value = res.data.finanzas.finazas;
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