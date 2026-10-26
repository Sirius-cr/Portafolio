/* ==========================================================================
   VALIDACIONES EN JAVASCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Referencias a los elementos del formulario
  const formularioSolicitud = document.getElementById("formulario-solicitud-justificativo");
  const campoFechaFalta = document.getElementById("campo-fecha-falta");
  const lateralFechaFalta = document.getElementById("lateral-fecha-falta");
  const campoMotivo = document.getElementById("campo-motivo");
  const campoDescripcion = document.getElementById("campo-descripcion");
  const entradaArchivo = document.getElementById("entrada-archivo");
  const zonaArrastre = document.getElementById("zona-subida-archivo");
  const contenedorVistaArchivo = document.getElementById("vista-archivo-cargado");
  const textoNombreArchivo = document.getElementById("nombre-archivo-cargado");
  const botonQuitarArchivo = document.getElementById("boton-quitar-archivo");
  const botonCancelar = document.getElementById("boton-cancelar-solicitud");

  let archivoSeleccionado = (contenedorVistaArchivo && contenedorVistaArchivo.classList.contains("visible"))
    ? { name: "certificado_medico_01oct2026.pdf", size: 248 * 1024, type: "application/pdf" }
    : null;

  // Función para formatear fecha YYYY-MM-DD a formato de texto legible (ejemplo: 5 de octubre de 2026)
  function formatearFechaTexto(fechaStr) {
    if (!fechaStr) return "";
    let partes = fechaStr.split("-");
    if (partes.length === 3) {
      let anio = parseInt(partes[0], 10);
      let mes = parseInt(partes[1], 10) - 1;
      let dia = parseInt(partes[2], 10);
      let fecha = new Date(anio, mes, dia);
      return fecha.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
    }
    return fechaStr;
  }

  // Sincronizar la fecha en la tarjeta lateral al modificar la fecha
  if (campoFechaFalta && lateralFechaFalta) {
    campoFechaFalta.addEventListener("change", function () {
      if (campoFechaFalta.value) {
        lateralFechaFalta.textContent = formatearFechaTexto(campoFechaFalta.value);
      }
    });
  }

  // Validación: solo se permite justificar faltas que sean de un día anterior a la misma fecha actual (ayer)
  function validarFechaFaltaUnDiaAnterior(valorFecha) {
    if (!valorFecha) return false;

    let fechaFalta;
    if (valorFecha.includes("-")) {
      let partes = valorFecha.split("-");
      fechaFalta = new Date(parseInt(partes[0], 10), parseInt(partes[1], 10) - 1, parseInt(partes[2], 10));
    } else {
      fechaFalta = new Date(valorFecha);
    }

    if (isNaN(fechaFalta.getTime())) return false;
    fechaFalta.setHours(0, 0, 0, 0);

    // 1. Fecha simulada del sistema institucional en la interfaz: Martes, 6 de octubre de 2026
    const fechaSistema = new Date(2026, 9, 6); // Mes 9 = octubre
    fechaSistema.setHours(0, 0, 0, 0);

    // 2. Fecha real actual del equipo/navegador
    const fechaRealHoy = new Date();
    fechaRealHoy.setHours(0, 0, 0, 0);

    const msPorDia = 24 * 60 * 60 * 1000;
    const difDiasSistema = Math.round((fechaSistema.getTime() - fechaFalta.getTime()) / msPorDia);
    const difDiasReal = Math.round((fechaRealHoy.getTime() - fechaFalta.getTime()) / msPorDia);

    // Se considera válido si la falta ocurrió exactamente 1 día anterior (ayer)
    // respecto a la fecha del sistema (2026-10-06 -> 2026-10-05) o respecto a la fecha real actual
    return difDiasSistema === 1 || difDiasReal === 1;
  }

  // Lógica para seleccionar archivo al hacer clic en la zona
  zonaArrastre.addEventListener("click", function (evento) {
    if (evento.target !== botonQuitarArchivo) {
      entradaArchivo.click();
    }
  });

  // Arrastrar y soltar archivo
  zonaArrastre.addEventListener("dragover", function (evento) {
    evento.preventDefault();
    zonaArrastre.classList.add("arrastrando");
  });

  zonaArrastre.addEventListener("dragleave", function () {
    zonaArrastre.classList.remove("arrastrando");
  });

  zonaArrastre.addEventListener("drop", function (evento) {
    evento.preventDefault();
    zonaArrastre.classList.remove("arrastrando");
    if (evento.dataTransfer.files.length > 0) {
      procesarArchivo(evento.dataTransfer.files[0]);
    }
  });

  entradaArchivo.addEventListener("change", function () {
    if (entradaArchivo.files.length > 0) {
      procesarArchivo(entradaArchivo.files[0]);
    }
  });

  // Función para procesar y validar el archivo seleccionado
  function procesarArchivo(archivo) {
    const tiposPermitidos = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    const limiteTamanoBytes = 5 * 1024 * 1024; // 5 MB

    // Validar tipo de formato
    if (!tiposPermitidos.includes(archivo.type)) {
      alert("Formato no permitido. Solo se aceptan documentos PDF o imágenes JPG/PNG.");
      entradaArchivo.value = "";
      archivoSeleccionado = null;
      return;
    }

    // Validar tamaño máximo
    if (archivo.size > limiteTamanoBytes) {
      alert("El archivo supera el tamaño máximo permitido de 5 MB.");
      entradaArchivo.value = "";
      archivoSeleccionado = null;
      return;
    }

    archivoSeleccionado = archivo;
    let tamanoEnKb = (archivo.size / 1024).toFixed(1);
    textoNombreArchivo.textContent = `${archivo.name} (${tamanoEnKb} KB)`;
    contenedorVistaArchivo.classList.add("visible");
  }

  // Quitar archivo cargado
  if (botonQuitarArchivo) {
    botonQuitarArchivo.addEventListener("click", function (evento) {
      evento.stopPropagation();
      entradaArchivo.value = "";
      archivoSeleccionado = null;
      contenedorVistaArchivo.classList.remove("visible");
    });
  }

  // Validación al enviar el formulario
  formularioSolicitud.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let valorFechaFalta = campoFechaFalta ? campoFechaFalta.value.trim() : "";
    let valorMotivo = campoMotivo.value.trim();
    let valorDescripcion = campoDescripcion.value.trim();

    // 1. Validar que la falta sea de un día anterior a la misma (ayer)
    if (valorFechaFalta === "") {
      alert("Por favor ingresa o selecciona la fecha de la falta.");
      if (campoFechaFalta) campoFechaFalta.focus();
      return;
    }

    if (!validarFechaFaltaUnDiaAnterior(valorFechaFalta)) {
      let fechaTexto = formatearFechaTexto(valorFechaFalta) || valorFechaFalta;
      alert(
        "No es posible enviar la solicitud:\n\n" +
        "El sistema solo permite al estudiante justificar faltas que correspondan a un día anterior a la misma (ayer).\n\n" +
        "La fecha indicada (" + fechaTexto + ") no cumple con esta condición."
      );
      if (campoFechaFalta) {
        campoFechaFalta.focus();
      }
      return;
    }

    // 2. Validar que se haya seleccionado un motivo
    if (valorMotivo === "") {
      alert("Por favor selecciona un motivo para la justificación.");
      campoMotivo.focus();
      return;
    }

    // 3. Validar que la descripción no esté vacía y tenga suficiente detalle
    if (valorDescripcion === "") {
      alert("Por favor escribe una descripción explicando el motivo de tu falta.");
      campoDescripcion.focus();
      return;
    }

    if (valorDescripcion.length < 15) {
      alert("Por favor detalla un poco más tu explicación (mínimo 15 caracteres).");
      campoDescripcion.focus();
      return;
    }

    // 4. Validar que se haya adjuntado el documento de respaldo obligatorio
    if (!archivoSeleccionado) {
      alert("Es obligatorio adjuntar un documento de respaldo (certificado médico u otro comprobante).");
      return;
    }

    // Si todo es válido:
    alert(
      "¡Solicitud enviada con éxito!\n\nTu justificativo ha sido registrado y se encuentra en estado 'Pendiente' para revisión docente y de coordinación."
    );

    // Redirigir al historial del estudiante
    window.location.href = "estudiante-historial.html";
  });

  // Botón cancelar
  if (botonCancelar) {
    botonCancelar.addEventListener("click", function () {
      let confirmacionCancelar = confirm("¿Estás seguro de cancelar la solicitud? Se perderán los datos ingresados.");
      if (confirmacionCancelar) {
        window.location.href = "estudiante-historial.html";
      }
    });
  }
});
