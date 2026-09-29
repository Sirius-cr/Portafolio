// Esperamos a que todo el documento HTML esté completamente cargado en el navegador
document.addEventListener("DOMContentLoaded", function () {

    // 1. Capturamos el formulario usando su ID del HTML
    const formulario = document.getElementById("formulario-cliente");

    // 2. Escuchamos el evento "submit" (cuando el usuario hace clic en el botón de enviar)
    formulario.addEventListener("submit", function (evento) {
        
        // Evitamos que la página se recargue por defecto (comportamiento normal de HTML)
        evento.preventDefault();

        // 3. Obtenemos los valores escritos en cada input y quitamos espacios sobrantes con .trim()
        const cedula = document.getElementById("cedula").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const direccion = document.getElementById("direccion").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const correo = document.getElementById("correo").value.trim();

        // 4. Limpiamos cualquier error previo antes de volver a validar
        limpiarErrores();

        // Variable bandera: asumimos que todo está bien hasta que falle una regla
        let formularioValido = true;

        // Herramienta matemática simple (Expresión Regular) para verificar solo números
        const soloNumeros = /^[0-9]+$/;

        // --- VALIDACIÓN 1: Cédula ---
        if (cedula === "") {
            mostrarError("error-cedula", "La cédula es obligatoria.");
            formularioValido = false;
        } else if (cedula.length !== 10 || !soloNumeros.test(cedula)) {
            mostrarError("error-cedula", "La cédula debe tener exactamente 10 números.");
            formularioValido = false;
        }

        // --- VALIDACIÓN 2: Nombre ---
        if (nombre === "") {
            mostrarError("error-nombre", "El nombre es obligatorio.");
            formularioValido = false;
        } else if (nombre.length > 30) {
            mostrarError("error-nombre", "El nombre no puede pasar de 30 caracteres.");
            formularioValido = false;
        }

        // --- VALIDACIÓN 3: Dirección ---
        if (direccion === "") {
            mostrarError("error-direccion", "La dirección es obligatoria.");
            formularioValido = false;
        } else if (direccion.length > 50) {
            mostrarError("error-direccion", "La dirección no puede pasar de 50 caracteres.");
            formularioValido = false;
        }

        // --- VALIDACIÓN 4: Teléfono Celular ---
        if (telefono === "") {
            mostrarError("error-telefono", "El teléfono celular es obligatorio.");
            formularioValido = false;
        } else if (telefono.length !== 10 || !soloNumeros.test(telefono)) {
            mostrarError("error-telefono", "El teléfono debe tener exactamente 10 números.");
            formularioValido = false;
        }

        // --- VALIDACIÓN 5: Correo Electrónico ---
        // Patrón básico para asegurar formato de correo (texto@texto.texto)
        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (correo === "") {
            mostrarError("error-correo", "El correo electrónico es obligatorio.");
            formularioValido = false;
        } else if (!formatoCorreo.test(correo)) {
            mostrarError("error-correo", "Escribe un correo electrónico válido.");
            formularioValido = false;
        }

        // 5. ACCIÓN FINAL SI TODO ES VÁLIDO
        if (formularioValido) {
            const mensajeExito = document.getElementById("mensaje-exito");
            mensajeExito.textContent = "¡Datos ingresados correctamente!";
            mensajeExito.style.display = "block";

            // Limpiamos los campos del formulario automáticamente después de 2 segundos 
            setTimeout(function () {
                formulario.reset();
                mensajeExito.style.display = "none";
            }, 2000);
        }
    });

    // Función auxiliar para mostrar mensajes de error en el span correspondiente
    function mostrarError(idElementoError, mensaje) {
        const elemento = document.getElementById(idElementoError);
        if (elemento) {
            elemento.textContent = mensaje;
        }
    }

    // Función auxiliar para borrar todos los mensajes de error de la pantalla
    function limpiarErrores() {
        const listaErrores = document.querySelectorAll(".texto-error");
        listaErrores.forEach(function (elementoSpan) {
            elementoSpan.textContent = "";
        });
        document.getElementById("mensaje-exito").style.display = "none";
    }
});