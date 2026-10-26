/* ==========================================================================
   PANEL DEL DOCENTE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Lista de botones para tomar asistencia
  const botonesTomarAsistencia = document.querySelectorAll(".boton-tomar-asistencia");
  const elementoConteoMaterias = document.querySelector(".conteo-materias");

  // Validación y confirmación al navegar a la toma de asistencia
  botonesTomarAsistencia.forEach(function (boton) {
    boton.addEventListener("click", function (evento) {
      const codigoMateria = boton.getAttribute("data-materia");
      const nombreMateria = boton.getAttribute("data-nombre");

      // Si la materia es diferente a MAT-201, se informa o se redirige
      if (codigoMateria === "MAT-201") {
        window.location.href = "docente-toma-lista.html";
      } else {
        // Redirige pasando el parámetro de la materia para dinamismo
        window.location.href = `docente-toma-lista.html?codigo=${encodeURIComponent(codigoMateria)}&materia=${encodeURIComponent(nombreMateria)}`;
      }
    });
  });

  // Manejador del botón de cerrar sesión
  const botonCerrarSesion = document.getElementById("boton-cerrar-sesion");
  if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener("click", function () {
      let confirmacionSalida = confirm("¿Deseas cerrar la sesión actual de docente?");
      if (confirmacionSalida) {
        window.location.href = "login.html";
      }
    });
  }
});
