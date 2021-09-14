const btn = document.getElementById("btn");
btn.addEventListener("click", function () {
  getUuid();
});

function getUuid() {
  fetch("http://localhost:3000/api/get-uuid")
    .then((response) => response.text())
    .then((json) => {
      document.getElementById("result").innerText = `${json}`;
    })
    .catch((error) => {
      console.error(error);
      console.log(`Error al intentar la solicitud: ${error.message}`);
      document.getElementById("result").innerText = "<Valor por defecto>";
    });
}
