/* ==========================================================================
   INTERACCIÓN Y FILTRO DE HISTORIAL
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Selector de materia del estudiante
  const selectorMateria = document.getElementById("selector-materia");
  const contenedorFilasClases = document.getElementById("cuerpo-tabla-clases");
  const elementoPorcentajeTexto = document.getElementById("historial-porcentaje-texto");
  const barraProgreso = document.getElementById("historial-barra-progreso");
  const elementoClasesRegistradas = document.getElementById("historial-clases-registradas");
  const elementoPresentes = document.getElementById("historial-presentes");
  const elementoAtrasos = document.getElementById("historial-atrasos");
  const elementoFaltas = document.getElementById("historial-faltas");
  const seccionMisJustificativos = document.getElementById("seccion-mis-justificativos");

  // Datos simulados de materias para el estudiante Carlos Basurto
  const datosMateriasEstudiante = {
    "MAT-201": {
      nombre: "Matemática II",
      docente: "Prof. Arturo Vera · Paralelo A",
      horario: "Martes y jueves · 08:00 – 10:00 · Aula B-204",
      porcentaje: 50,
      clases: 2,
      presentes: 1,
      atrasos: 0,
      faltas: 1,
      historialClases: [
        {
          fecha: "06 oct 2026",
          horario: "Martes · 08:00 – 10:00",
          estado: "Presente",
          observaciones: "Asistencia registrada por el docente.",
          accionJustificar: false
        },
        {
          fecha: "01 oct 2026",
          horario: "Jueves · 08:00 – 10:00",
          estado: "Falta",
          observaciones: "Sin justificativo presentado.",
          accionJustificar: true
        }
      ],
      tieneFaltaSinJustificar: true
    },
    "FIS-102": {
      nombre: "Física I",
      docente: "Prof. Carolina Vélez · Paralelo B",
      horario: "Martes y viernes · 10:00 – 12:00 · Aula B-108",
      porcentaje: 100,
      clases: 2,
      presentes: 1,
      atrasos: 1,
      faltas: 0,
      historialClases: [
        {
          fecha: "06 oct 2026",
          horario: "Martes · 10:00 – 12:00",
          estado: "Atraso",
          observaciones: "Llegada con 10 min de retraso.",
          accionJustificar: false
        },
        {
          fecha: "02 oct 2026",
          horario: "Viernes · 10:00 – 12:00",
          estado: "Presente",
          observaciones: "Asistencia registrada por la docente.",
          accionJustificar: false
        }
      ],
      tieneFaltaSinJustificar: false
    }
  };

  // Función para cargar los datos de la materia en pantalla
  function actualizarVistaMateria(codigoMateria) {
    let datosMateria = datosMateriasEstudiante[codigoMateria] || datosMateriasEstudiante["MAT-201"];

    // Actualizar métricas numéricas
    elementoPorcentajeTexto.textContent = `${datosMateria.porcentaje}%`;
    barraProgreso.style.width = `${datosMateria.porcentaje}%`;
    elementoClasesRegistradas.textContent = String(datosMateria.clases).padStart(2, "0");
    elementoPresentes.textContent = String(datosMateria.presentes).padStart(2, "0");
    elementoAtrasos.textContent = String(datosMateria.atrasos).padStart(2, "0");
    elementoFaltas.textContent = String(datosMateria.faltas).padStart(2, "0");

    // Reconstruir la tabla de clases
    let htmlFilas = "";
    for (let i = 0; i < datosMateria.historialClases.length; i++) {
      let clase = datosMateria.historialClases[i];
      let claseBadge = "";
      if (clase.estado === "Presente") {
        claseBadge = "insignia-estado presente";
      } else if (clase.estado === "Atraso") {
        claseBadge = "insignia-estado atraso";
      } else {
        claseBadge = "insignia-estado falta";
      }

      htmlFilas += `
        <tr>
          <td>
            <div style="font-weight: 700;">${clase.fecha}</div>
            <div style="font-size: 0.8rem; color: var(--color-texto-secundario);">${clase.horario}</div>
          </td>
          <td>
            <span class="${claseBadge}">${clase.estado}</span>
          </td>
          <td>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>${clase.observaciones}</span>
              ${
                clase.accionJustificar
                  ? '<a href="estudiante-solicitar-justificativo.html" class="enlace-por-justificar">Por justificar</a>'
                  : ""
              }
            </div>
          </td>
        </tr>
      `;
    }
    contenedorFilasClases.innerHTML = htmlFilas;

    // Mostrar u ocultar aviso de falta sin justificar
    if (datosMateria.tieneFaltaSinJustificar) {
      seccionMisJustificativos.style.display = "block";
    } else {
      seccionMisJustificativos.style.display = "none";
    }
  }

  // Comprobar si venía con materia seleccionada desde el panel principal
  let materiaGuardada = sessionStorage.getItem("materiaSeleccionadaHistorial");
  if (materiaGuardada && selectorMateria) {
    selectorMateria.value = materiaGuardada;
    actualizarVistaMateria(materiaGuardada);
  }

  // Evento al cambiar de materia en el dropdown
  if (selectorMateria) {
    selectorMateria.addEventListener("change", function () {
      actualizarVistaMateria(selectorMateria.value);
    });
  }
});
