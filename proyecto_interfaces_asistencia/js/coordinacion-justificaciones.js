/* ==========================================================================
   VALIDACIONES Y GESTIÓN DE COORDINACIÓN · JUSTIFICACIONES
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Lista de solicitudes (datos basados fielmente en la Página 5)
  let listaSolicitudes = [
    {
      id: "J-2026-006",
      estudiante: "Carlos Basurto Vera",
      carrera: "Ingeniería en TI · Segundo semestre",
      fechaEnvio: "Enviada el 6 de octubre de 2026 · 09:15",
      materia: "Matemática II",
      codigoMateria: "MAT-201",
      paralelo: "Paralelo A",
      docente: "Prof. Arturo Vera",
      aula: "Aula B-204",
      fechaFalta: "01 oct 2026",
      fechaFaltaLarga: "1 de octubre de 2026",
      horario: "Jueves · 08:00 – 10:00",
      motivo: "Salud · Atención médica",
      descripcion: "El 1 de octubre no pude asistir a Matemática II por una consulta médica y reposo indicado ese día. Adjunto el certificado médico como respaldo de mi inasistencia.",
      archivo: "certificado_medico_01oct2026.pdf",
      archivoTamano: "PDF · 248 KB · 1 página",
      estado: "Pendiente",
      observacion: ""
    },
    {
      id: "J-2026-005",
      estudiante: "María Zambrano López",
      carrera: "Ingeniería en TI · Segundo semestre",
      fechaEnvio: "Enviada el 5 de octubre de 2026 · 14:30",
      materia: "Física I",
      codigoMateria: "FIS-102",
      paralelo: "Paralelo B",
      docente: "Prof. Carolina Vélez",
      aula: "Aula B-108",
      fechaFalta: "02 oct 2026",
      fechaFaltaLarga: "2 de octubre de 2026",
      horario: "Viernes · 10:00 – 12:00",
      motivo: "Calamidad doméstica",
      descripcion: "Tuve una situación de emergencia familiar imprevista debidamente justificada por documento adjunto.",
      archivo: "constancia_familiar_02oct.pdf",
      archivoTamano: "PDF · 180 KB · 1 página",
      estado: "Pendiente",
      observacion: ""
    },
    {
      id: "J-2026-004",
      estudiante: "Andrés Mera Castro",
      carrera: "Ingeniería en TI · Cuarto semestre",
      fechaEnvio: "Enviada el 5 de octubre de 2026 · 16:20",
      materia: "Programación I",
      codigoMateria: "INF-101",
      paralelo: "Paralelo A",
      docente: "Prof. Diego Cedeño",
      aula: "Laboratorio 3",
      fechaFalta: "05 oct 2026",
      fechaFaltaLarga: "5 de octubre de 2026",
      horario: "Lunes · 14:00 – 16:00",
      motivo: "Trámite institucional",
      descripcion: "Representación académica en evento institucional autorizado por la facultad.",
      archivo: "oficio_comision_05oct.pdf",
      archivoTamano: "PDF · 310 KB · 2 páginas",
      estado: "Pendiente",
      observacion: ""
    },
    {
      id: "J-2026-003",
      estudiante: "Sofía Cedeño Ruiz",
      carrera: "Ingeniería en TI · Tercer semestre",
      fechaEnvio: "Enviada el 3 de octubre de 2026 · 11:00",
      materia: "Estadística Aplicada",
      codigoMateria: "EST-203",
      paralelo: "Paralelo C",
      docente: "Prof. María Ponce",
      aula: "Aula C-302",
      fechaFalta: "02 oct 2026",
      fechaFaltaLarga: "2 de octubre de 2026",
      horario: "Viernes · 08:00 – 10:00",
      motivo: "Salud · Atención odontológica",
      descripcion: "Procedimiento dental de urgencia con reposo médico certificado.",
      archivo: "certificado_dental.pdf",
      archivoTamano: "PDF · 215 KB · 1 página",
      estado: "Aceptada",
      observacion: "Justificativo médico verificado y aprobado."
    },
    {
      id: "J-2026-002",
      estudiante: "Diego Vélez Ponce",
      carrera: "Ingeniería en TI · Segundo semestre",
      fechaEnvio: "Enviada el 2 de octubre de 2026 · 10:15",
      materia: "Matemática II",
      codigoMateria: "MAT-201",
      paralelo: "Paralelo A",
      docente: "Prof. Arturo Vera",
      aula: "Aula B-204",
      fechaFalta: "01 oct 2026",
      fechaFaltaLarga: "1 de octubre de 2026",
      horario: "Jueves · 08:00 – 10:00",
      motivo: "Salud · Cuadro gripal",
      descripcion: "Atención en dispensario médico universitario con prescripción médica.",
      archivo: "dispensario_medico_01oct.pdf",
      archivoTamano: "PDF · 190 KB · 1 página",
      estado: "Aceptada",
      observacion: "Validado por el centro médico universitario."
    },
    {
      id: "J-2026-001",
      estudiante: "Valentina Moreira Paz",
      carrera: "Ingeniería en TI · Primer semestre",
      fechaEnvio: "Enviada el 2 de octubre de 2026 · 08:00",
      materia: "Física I",
      codigoMateria: "FIS-102",
      paralelo: "Paralelo B",
      docente: "Prof. Carolina Vélez",
      aula: "Aula B-108",
      fechaFalta: "02 oct 2026",
      fechaFaltaLarga: "2 de octubre de 2026",
      horario: "Viernes · 10:00 – 12:00",
      motivo: "Asunto personal no justificado",
      descripcion: "Inasistencia por motivos de transporte y trámites particulares no oficiales.",
      archivo: "declaracion_simple.pdf",
      archivoTamano: "PDF · 120 KB · 1 página",
      estado: "Denegada",
      observacion: "El documento adjunto no cumple con la normativa de respaldo oficial de la institución."
    }
  ];

  // Elementos de la interfaz
  const cuerpoTablaSolicitudes = document.getElementById("cuerpo-tabla-solicitudes");
  const campoBusqueda = document.getElementById("buscador-estudiante");
  const botonesChipsFiltro = document.querySelectorAll(".boton-chip-filtro");

  // Elementos del panel de detalle (derecha)
  const detalleCodigoSolicitud = document.getElementById("detalle-codigo-solicitud");
  const detalleNombreEstudiante = document.getElementById("detalle-nombre-estudiante");
  const detalleCarreraEstudiante = document.getElementById("detalle-carrera-estudiante");
  const detalleFechaEnvio = document.getElementById("detalle-fecha-envio");
  const detalleEstadoBadge = document.getElementById("detalle-estado-badge");
  const detalleMateria = document.getElementById("detalle-materia");
  const detalleFechaFalta = document.getElementById("detalle-fecha-falta");
  const detalleHorarioFalta = document.getElementById("detalle-horario-falta");
  const detalleDocente = document.getElementById("detalle-docente");
  const detalleAula = document.getElementById("detalle-aula");
  const detalleMotivo = document.getElementById("detalle-motivo");
  const detalleDescripcion = document.getElementById("detalle-descripcion");
  const detalleNombreArchivo = document.getElementById("detalle-nombre-archivo");
  const detalleTamanoArchivo = document.getElementById("detalle-tamano-archivo");
  const detalleObservacionInput = document.getElementById("detalle-observacion");
  const detalleEstadoObservacion = document.getElementById("detalle-estado-observacion");
  const botonAceptarJustificacion = document.getElementById("boton-aceptar-justificacion");
  const botonDenegarJustificacion = document.getElementById("boton-denegar-justificacion");
  const enlaceAbrirDocumento = document.getElementById("enlace-abrir-documento");

  // Elementos de contadores superiores
  const contadorRecibidas = document.getElementById("contador-recibidas");
  const contadorPendientes = document.getElementById("contador-pendientes");
  const contadorAceptadas = document.getElementById("contador-aceptadas");
  const contadorDenegadas = document.getElementById("contador-denegadas");
  const textoTotalSolicitudes = document.getElementById("texto-total-solicitudes");

  let idSolicitudSeleccionada = "J-2026-006";
  let filtroEstadoActual = "Todas";
  let textoBusquedaActual = "";

  // Función para recalcular métricas numéricas
  function actualizarContadoresSuperiores() {
    let totalRecibidas = listaSolicitudes.length;
    let totalPendientes = 0;
    let totalAceptadas = 0;
    let totalDenegadas = 0;

    for (let i = 0; i < listaSolicitudes.length; i++) {
      let estado = listaSolicitudes[i].estado;
      if (estado === "Pendiente") totalPendientes++;
      else if (estado === "Aceptada") totalAceptadas++;
      else if (estado === "Denegada") totalDenegadas++;
    }

    contadorRecibidas.textContent = String(totalRecibidas).padStart(2, "0");
    contadorPendientes.textContent = String(totalPendientes).padStart(2, "0");
    contadorAceptadas.textContent = String(totalAceptadas).padStart(2, "0");
    contadorDenegadas.textContent = String(totalDenegadas).padStart(2, "0");

    textoTotalSolicitudes.textContent = `${totalRecibidas} solicitudes en este periodo`;
  }

  // Renderizar la tabla de solicitudes aplicando búsqueda y filtros
  function renderizarTabla() {
    let solicitudesFiltradas = listaSolicitudes.filter(function (solicitud) {
      let coincideFiltro =
        filtroEstadoActual === "Todas" || solicitud.estado === filtroEstadoActual;

      let coincideBusqueda =
        textoBusquedaActual === "" ||
        solicitud.estudiante.toLowerCase().includes(textoBusquedaActual.toLowerCase()) ||
        solicitud.materia.toLowerCase().includes(textoBusquedaActual.toLowerCase());

      return coincideFiltro && coincideBusqueda;
    });

    let html = "";
    if (solicitudesFiltradas.length === 0) {
      html = `<tr><td colspan="5" style="text-align: center; padding: 24px; color: var(--color-texto-apagado);">No se encontraron solicitudes con los criterios indicados.</td></tr>`;
    } else {
      solicitudesFiltradas.forEach(function (solicitud) {
        let esSeleccionada = solicitud.id === idSolicitudSeleccionada;
        let claseEstado = "insignia-estado ";
        if (solicitud.estado === "Pendiente") claseEstado += "pendiente";
        else if (solicitud.estado === "Aceptada") claseEstado += "aceptada";
        else if (solicitud.estado === "Denegada") claseEstado += "denegada";

        html += `
          <tr class="fila-solicitud ${esSeleccionada ? "seleccionada" : ""}" data-id="${solicitud.id}">
            <td>
              <div class="nombre-estudiante-solicitud">${solicitud.estudiante}</div>
              <div class="codigo-solicitud-estudiante">Solicitud ${solicitud.id}</div>
            </td>
            <td>
              <div class="materia-nombre-fila">${solicitud.materia}</div>
              <div class="paralelo-codigo-fila">${solicitud.codigoMateria} · ${solicitud.paralelo}</div>
            </td>
            <td>
              <div class="fecha-falta-fila">${solicitud.fechaFalta}</div>
            </td>
            <td>
              <span class="${claseEstado}">${solicitud.estado}</span>
            </td>
            <td class="flecha-solicitud">&gt;</td>
          </tr>
        `;
      });
    }

    cuerpoTablaSolicitudes.innerHTML = html;

    // Asignar clic a las filas para seleccionar solicitud
    const filas = cuerpoTablaSolicitudes.querySelectorAll(".fila-solicitud");
    filas.forEach(function (fila) {
      fila.addEventListener("click", function () {
        let id = fila.getAttribute("data-id");
        seleccionarSolicitud(id);
      });
    });
  }

  // Cargar datos en el panel derecho de detalle
  function seleccionarSolicitud(id) {
    idSolicitudSeleccionada = id;
    let solicitud = listaSolicitudes.find(function (s) {
      return s.id === id;
    });
    if (!solicitud) return;

    detalleCodigoSolicitud.textContent = solicitud.id;
    detalleNombreEstudiante.textContent = solicitud.estudiante;
    detalleCarreraEstudiante.textContent = solicitud.carrera;
    detalleFechaEnvio.textContent = solicitud.fechaEnvio;

    // Badge de estado
    detalleEstadoBadge.textContent = solicitud.estado;
    detalleEstadoBadge.className = "insignia-estado";
    if (solicitud.estado === "Pendiente") {
      detalleEstadoBadge.classList.add("pendiente");
    } else if (solicitud.estado === "Aceptada") {
      detalleEstadoBadge.classList.add("aceptada");
    } else if (solicitud.estado === "Denegada") {
      detalleEstadoBadge.classList.add("denegada");
    }

    // Datos académicos
    detalleMateria.textContent = `${solicitud.materia} · ${solicitud.codigoMateria} · ${solicitud.paralelo}`;
    detalleFechaFalta.textContent = solicitud.fechaFaltaLarga;
    detalleHorarioFalta.textContent = solicitud.horario;
    detalleDocente.textContent = solicitud.docente;
    detalleAula.textContent = solicitud.aula;

    // Justificación
    detalleMotivo.textContent = solicitud.motivo;
    detalleDescripcion.textContent = solicitud.descripcion;
    detalleNombreArchivo.textContent = solicitud.archivo;
    detalleTamanoArchivo.textContent = solicitud.archivoTamano;

    // Observaciones
    detalleObservacionInput.value = solicitud.observacion || "";
    if (solicitud.observacion) {
      detalleEstadoObservacion.textContent = "Registrada";
      detalleEstadoObservacion.style.color = "var(--color-primario)";
    } else {
      detalleEstadoObservacion.textContent = "Sin registrar";
      detalleEstadoObservacion.style.color = "var(--color-texto-apagado)";
    }

    renderizarTabla();
  }

  // Filtrado por buscador
  campoBusqueda.addEventListener("input", function () {
    textoBusquedaActual = campoBusqueda.value.trim();
    renderizarTabla();
  });

  // Filtrado por pestañas chips
  botonesChipsFiltro.forEach(function (boton) {
    boton.addEventListener("click", function () {
      botonesChipsFiltro.forEach(function (btn) {
        btn.classList.remove("activo");
      });
      boton.classList.add("activo");

      filtroEstadoActual = boton.getAttribute("data-filtro");
      renderizarTabla();
    });
  });

  // Validación y acción: Aceptar Justificación
  botonAceptarJustificacion.addEventListener("click", function () {
    let solicitud = listaSolicitudes.find(function (s) {
      return s.id === idSolicitudSeleccionada;
    });
    if (!solicitud) return;

    if (solicitud.estado === "Aceptada") {
      alert("Esta solicitud ya se encuentra aprobada.");
      return;
    }

    let confirmacion = confirm(`¿Confirmas la APROBACIÓN de la justificación para el estudiante ${solicitud.estudiante}?`);
    if (confirmacion) {
      solicitud.estado = "Aceptada";
      let textoObs = detalleObservacionInput.value.trim();
      solicitud.observacion = textoObs !== "" ? textoObs : "Solicitud de justificación aprobada por Coordinación Académica.";
      
      alert(`¡Solicitud ${solicitud.id} ACEPTADA correctamente!`);
      actualizarContadoresSuperiores();
      seleccionarSolicitud(solicitud.id);
    }
  });

  // Validación y acción: Denegar Justificación (Observación obligatoria)
  botonDenegarJustificacion.addEventListener("click", function () {
    let solicitud = listaSolicitudes.find(function (s) {
      return s.id === idSolicitudSeleccionada;
    });
    if (!solicitud) return;

    let textoObservacion = detalleObservacionInput.value.trim();

    // VALIDACIÓN SENCILLA: Las observaciones son obligatorias al denegar (como indica la interfaz)
    if (textoObservacion === "") {
      alert(
        "Atención: Para denegar una solicitud es OBLIGATORIO ingresar el motivo en el campo 'Observaciones de coordinación'."
      );
      detalleObservacionInput.focus();
      return;
    }

    let confirmacion = confirm(`¿Confirmas la DENEGACIÓN de la justificación para ${solicitud.estudiante}?`);
    if (confirmacion) {
      solicitud.estado = "Denegada";
      solicitud.observacion = textoObservacion;

      alert(`Solicitud ${solicitud.id} DENEGADA. Se ha notificado la observación al estudiante.`);
      actualizarContadoresSuperiores();
      seleccionarSolicitud(solicitud.id);
    }
  });

  // Simulación de previsualización del documento PDF adjunto
  if (enlaceAbrirDocumento) {
    enlaceAbrirDocumento.addEventListener("click", function (evento) {
      evento.preventDefault();
      let solicitud = listaSolicitudes.find(function (s) {
        return s.id === idSolicitudSeleccionada;
      });
      alert(`Abriendo visor institucional del documento:\n"${solicitud.archivo}"\n\nEl documento respalda el motivo: "${solicitud.motivo}".`);
    });
  }

  // Inicialización
  actualizarContadoresSuperiores();
  seleccionarSolicitud(idSolicitudSeleccionada);
});
