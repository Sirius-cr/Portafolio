/* ==========================================================================
   PANEL DEL ESTUDIANTE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Manejo de enlaces para ver historial de asistencia
  const enlacesVerHistorial = document.querySelectorAll(".enlace-ver-historial");

  enlacesVerHistorial.forEach(function (enlace) {
    enlace.addEventListener("click", function (evento) {
      let materiaSeleccionada = enlace.getAttribute("data-materia");
      if (materiaSeleccionada) {
        // Guarda la materia seleccionada para cargarla en el historial
        sessionStorage.setItem("materiaSeleccionadaHistorial", materiaSeleccionada);
      }
    });
  });

  // Botón para cerrar sesión
  const botonCerrarSesion = document.getElementById("boton-cerrar-sesion-estudiante");
  if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener("click", function () {
      let confirmacionCierre = confirm("¿Deseas cerrar tu sesión como estudiante?");
      if (confirmacionCierre) {
        window.location.href = "login.html";
      }
    });
  }
});
