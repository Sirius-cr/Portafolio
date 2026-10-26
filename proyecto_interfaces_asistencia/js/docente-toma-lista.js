/* ==========================================================================
   VALIDACIONES Y GESTIÓN DE TOMA DE LISTA
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Lista de estudiantes del curso Matemática II (como en la Página 3)
  const listaEstudiantes = [
    { id: 1, cedula: "0105847236", nombres: "Quintero Velásquez George Smith", estado: "presente" },
    { id: 2, cedula: "1716284950", nombres: "Basurto Vera Carlos Eduardo", estado: "presente" },
    { id: 3, cedula: "0927351846", nombres: "Coello Mendoza Joseph Alexander", estado: "ausente" },
    { id: 4, cedula: "0106938274", nombres: "Pilligua Saltos Michael Julean", estado: "presente" },
    { id: 5, cedula: "1728493051", nombres: "Torres Camacho Brayhan Jesus Daniel", estado: "atraso" }
  ];

  // Elementos de contadores
  const elementoTotalEstudiantes = document.getElementById("conteo-estudiantes");
  const elementoConteoPresentes = document.getElementById("conteo-presentes");
  const elementoConteoAusentes = document.getElementById("conteo-ausentes");
  const elementoConteoAtrasados = document.getElementById("conteo-atrasados");
  const textoDetalleGuardado = document.getElementById("texto-detalle-guardado");

  // Botones de acción
  const botonMarcarTodos = document.getElementById("boton-marcar-todos");
  const botonGuardarAsistencia = document.getElementById("boton-guardar-asistencia");
  const botonVolverPanel = document.getElementById("boton-volver-panel");

  // Función para actualizar los contadores numéricos y la barra de estado
  function actualizarContadores() {
    let cantidadPresentes = 0;
    let cantidadAusentes = 0;
    let cantidadAtrasados = 0;
    let cantidadSinAsignar = 0;

    for (let i = 0; i < listaEstudiantes.length; i++) {
      let estadoActual = listaEstudiantes[i].estado;
      if (estadoActual === "presente") {
        cantidadPresentes++;
      } else if (estadoActual === "ausente") {
        cantidadAusentes++;
      } else if (estadoActual === "atraso") {
        cantidadAtrasados++;
      } else {
        cantidadSinAsignar++;
      }
    }

    // Actualizar números en la interfaz
    elementoTotalEstudiantes.textContent = String(listaEstudiantes.length).padStart(2, "0");
    elementoConteoPresentes.textContent = String(cantidadPresentes).padStart(2, "0");
    elementoConteoAusentes.textContent = String(cantidadAusentes).padStart(2, "0");
    elementoConteoAtrasados.textContent = String(cantidadAtrasados).padStart(2, "0");

    // Actualizar texto de cambios pendientes
    if (cantidadSinAsignar === 0) {
      textoDetalleGuardado.textContent = `Los ${listaEstudiantes.length} estudiantes tienen un estado asignado.`;
    } else {
      textoDetalleGuardado.textContent = `Atención: Hay ${cantidadSinAsignar} estudiante(s) sin estado asignado.`;
    }
  }

  // Asignar eventos a los botones de cada estudiante
  const filasEstudiantes = document.querySelectorAll("tr[data-estudiante-id]");
  filasEstudiantes.forEach(function (fila) {
    let idEstudiante = parseInt(fila.getAttribute("data-estudiante-id"), 10);
    let botonesOpcion = fila.querySelectorAll(".boton-opcion-estado");

    botonesOpcion.forEach(function (boton) {
      boton.addEventListener("click", function () {
        let nuevoEstado = boton.getAttribute("data-estado");

        // Quitar clases activas de todos los botones de esta fila
        botonesOpcion.forEach(function (btn) {
          btn.classList.remove("activo-presente", "activo-ausente", "activo-atraso");
          // Si tenía ícono check previo, restaurar texto plano
          if (btn.querySelector(".icono-check-interno")) {
            btn.querySelector(".icono-check-interno").remove();
          }
        });

        // Aplicar clase activa al botón clickeado
        if (nuevoEstado === "presente") {
          boton.classList.add("activo-presente");
          boton.insertAdjacentHTML("afterbegin", '<span class="icono-check-interno">✓ </span>');
        } else if (nuevoEstado === "ausente") {
          boton.classList.add("activo-ausente");
          boton.insertAdjacentHTML("afterbegin", '<span class="icono-check-interno">✓ </span>');
        } else if (nuevoEstado === "atraso") {
          boton.classList.add("activo-atraso");
          boton.insertAdjacentHTML("afterbegin", '<span class="icono-check-interno">✓ </span>');
        }

        // Actualizar el estado en el arreglo de datos
        let estudianteEncontrado = listaEstudiantes.find(function (e) {
          return e.id === idEstudiante;
        });
        if (estudianteEncontrado) {
          estudianteEncontrado.estado = nuevoEstado;
        }

        actualizarContadores();
      });
    });
  });

  // Funcionalidad del botón: Marcar todos presentes
  if (botonMarcarTodos) {
    botonMarcarTodos.addEventListener("click", function () {
      listaEstudiantes.forEach(function (estudiante) {
        estudiante.estado = "presente";
      });

      // Actualizar visualmente cada fila
      filasEstudiantes.forEach(function (fila) {
        let botones = fila.querySelectorAll(".boton-opcion-estado");
        botones.forEach(function (btn) {
          btn.classList.remove("activo-presente", "activo-ausente", "activo-atraso");
          if (btn.querySelector(".icono-check-interno")) {
            btn.querySelector(".icono-check-interno").remove();
          }
          if (btn.getAttribute("data-estado") === "presente") {
            btn.classList.add("activo-presente");
            btn.insertAdjacentHTML("afterbegin", '<span class="icono-check-interno">✓ </span>');
          }
        });
      });

      actualizarContadores();
    });
  }

  // Validación y confirmación de guardado de asistencia
  if (botonGuardarAsistencia) {
    botonGuardarAsistencia.addEventListener("click", function () {
      // 1. Validar que no haya estudiantes sin asignar
      let estudiantesSinEstado = listaEstudiantes.filter(function (estudiante) {
        return !estudiante.estado;
      });

      if (estudiantesSinEstado.length > 0) {
        alert("Advertencia: Todos los estudiantes deben tener un estado asignado antes de guardar.");
        return;
      }

      // 2. Guardar en almacenamiento de sesión para que la siguiente pantalla (Página 9) muestre los datos reales
      sessionStorage.setItem("registroAsistencia_presentes", elementoConteoPresentes.textContent);
      sessionStorage.setItem("registroAsistencia_ausentes", elementoConteoAusentes.textContent);
      sessionStorage.setItem("registroAsistencia_atrasados", elementoConteoAtrasados.textContent);
      sessionStorage.setItem("registroAsistencia_total", elementoTotalEstudiantes.textContent);

      // Redirigir a la pantalla de éxito (Interfaz 9 del PDF)
      window.location.href = "docente-asistencia-guardada.html";
    });
  }

  if (botonVolverPanel) {
    botonVolverPanel.addEventListener("click", function () {
      let confirmacionVolver = confirm("¿Deseas volver al panel de materias?");
      if (confirmacionVolver) {
        window.location.href = "docente-panel.html";
      }
    });
  }

  // Inicializar contadores al cargar la página
  actualizarContadores();
});
