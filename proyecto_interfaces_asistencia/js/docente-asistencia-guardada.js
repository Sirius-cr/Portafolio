/* ==========================================================================
   ASISTENCIA GUARDADA CORRECTAMENTE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const botonRegresar = document.getElementById("boton-regresar-panel");

  // Redirección al panel del docente
  if (botonRegresar) {
    botonRegresar.addEventListener("click", function () {
      window.location.href = "docente-panel.html";
    });
  }
});
