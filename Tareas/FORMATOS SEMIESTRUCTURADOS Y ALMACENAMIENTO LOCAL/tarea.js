// EXPRESIONES REGULARES (REGEX)
const patronCedula = /^\d{10}$/;                         // Solo 10 números
const patronTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,30}$/;     // Solo letras (mínimo 2)
const patronDireccion = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\.,#-]{5,50}$/; // Mínimo 5 caracteres
const patronTelefono = /^09\d{8}$/;                      // Empieza con 09 y tiene 10 números
const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Correo válido
const patronParalelo = /^[a-zA-Z0-9]{1,2}$/;             // 1 o 2 letras/números

// Clave para guardar en el localStorage
const CLAVE_LOCALSTORAGE = "estudiantes_guardados";


// ELEMENTOS DEL HTML 
const formulario = document.getElementById("formularioEstudiante");

const campoCedula = document.getElementById("cedula");
const campoApellidos = document.getElementById("apellidos");
const campoNombres = document.getElementById("nombres");
const campoDireccion = document.getElementById("direccion");
const campoTelefono = document.getElementById("telefono");
const campoCorreo = document.getElementById("correo");
const campoFacultad = document.getElementById("facultad");
const campoNivel = document.getElementById("nivel");
const campoParalelo = document.getElementById("paralelo");

const botonLimpiar = document.getElementById("botonLimpiar");
const cajaBusqueda = document.getElementById("cajaBusqueda");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const textoVacio = document.getElementById("textoVacio");
const mensajeAlerta = document.getElementById("mensajeAlerta");


// FUNCIONES DE VALIDACIÓN

// Función sencilla para marcar error o éxito en pantalla
function marcarCampo(elemento, esValido, idError) {
    const elementoError = document.getElementById(idError);

    if (esValido) {
        elemento.classList.remove("campo-incorrecto");
        elemento.classList.add("campo-correcto");
        elementoError.style.display = "none";
    } else {
        elemento.classList.remove("campo-correcto");
        elemento.classList.add("campo-incorrecto");
        elementoError.style.display = "block";
    }
    return esValido;
}

// Validar individualmente cada campo
function validarCedula() {
    return marcarCampo(campoCedula, patronCedula.test(campoCedula.value.trim()), "errorCedula");
}

function validarApellidos() {
    return marcarCampo(campoApellidos, patronTexto.test(campoApellidos.value.trim()), "errorApellidos");
}

function validarNombres() {
    return marcarCampo(campoNombres, patronTexto.test(campoNombres.value.trim()), "errorNombres");
}

function validarDireccion() {
    return marcarCampo(campoDireccion, patronDireccion.test(campoDireccion.value.trim()), "errorDireccion");
}

function validarTelefono() {
    return marcarCampo(campoTelefono, patronTelefono.test(campoTelefono.value.trim()), "errorTelefono");
}

function validarCorreo() {
    return marcarCampo(campoCorreo, patronCorreo.test(campoCorreo.value.trim()), "errorCorreo");
}

function validarFacultad() {
    const esValido = campoFacultad.value !== "";
    return marcarCampo(campoFacultad, esValido, "errorFacultad");
}

function validarNivel() {
    const esValido = campoNivel.value !== "";
    return marcarCampo(campoNivel, esValido, "errorNivel");
}

function validarParalelo() {
    return marcarCampo(campoParalelo, patronParalelo.test(campoParalelo.value.trim()), "errorParalelo");
}

// Validar todo el formulario antes de guardar
function validarFormularioCompleto() {
    const v1 = validarCedula();
    const v2 = validarApellidos();
    const v3 = validarNombres();
    const v4 = validarDireccion();
    const v5 = validarTelefono();
    const v6 = validarCorreo();
    const v7 = validarFacultad();
    const v8 = validarNivel();
    const v9 = validarParalelo();

    return v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8 && v9;
}

// Eventos en tiempo real al escribir o cambiar los datos
campoCedula.addEventListener("input", validarCedula);
campoApellidos.addEventListener("input", validarApellidos);
campoNombres.addEventListener("input", validarNombres);
campoDireccion.addEventListener("input", validarDireccion);
campoTelefono.addEventListener("input", validarTelefono);
campoCorreo.addEventListener("input", validarCorreo);
campoFacultad.addEventListener("change", validarFacultad);
campoNivel.addEventListener("change", validarNivel);
campoParalelo.addEventListener("input", validarParalelo);


// MANEJO DE LOCALSTORAGE

// Obtener la lista de estudiantes desde el navegador
function obtenerEstudiantes() {
    const datosTexto = localStorage.getItem(CLAVE_LOCALSTORAGE);
    if (datosTexto === null) {
        return [];
    }
    return JSON.parse(datosTexto);
}

// Guardar la lista de estudiantes en el navegador
function guardarEnLocalStorage(listaEstudiantes) {
    const textoJSON = JSON.stringify(listaEstudiantes);
    localStorage.setItem(CLAVE_LOCALSTORAGE, textoJSON);
}

// OPERACIONES DE LA TABLA 


// Mostrar estudiantes en la tabla 
function mostrarTabla(filtro = "") {
    const lista = obtenerEstudiantes();
    cuerpoTabla.innerHTML = "";

    // Filtrar estudiantes según lo que escriba el usuario en el buscador
    const listaFiltrada = lista.filter(function(estudiante) {
        const textoFiltro = filtro.toLowerCase();
        return (
            estudiante.cedula.toLowerCase().includes(textoFiltro) ||
            estudiante.nombres.toLowerCase().includes(textoFiltro) ||
            estudiante.apellidos.toLowerCase().includes(textoFiltro) ||
            estudiante.facultad.toLowerCase().includes(textoFiltro)
        );
    });

    // Mostrar mensaje si no hay estudiantes
    if (listaFiltrada.length === 0) {
        textoVacio.style.display = "block";
        return;
    } else {
        textoVacio.style.display = "none";
    }

    // Dibujar cada fila en la tabla
    listaFiltrada.forEach(function(estudiante) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td><strong>${estudiante.cedula}</strong></td>
            <td>${estudiante.apellidos}, ${estudiante.nombres}</td>
            <td>${estudiante.telefono}<br><small>${estudiante.correo}</small></td>
            <td>${estudiante.facultad}<br><small>${estudiante.nivel}</small></td>
            <td><strong>${estudiante.paralelo}</strong></td>
            <td>
                <button class="btn-eliminar" onclick="eliminarEstudiante('${estudiante.cedula}')">Eliminar</button>
            </td>
        `;

        cuerpoTabla.appendChild(fila);
    });
}

// Guardar un nuevo estudiante
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault(); // Evitar que la página se recargue

    if (!validarFormularioCompleto()) {
        mostrarAlerta("Por favor corrija los errores en el formulario.", "error");
        return;
    }

    const estudiantes = obtenerEstudiantes();
    const cedulaIngresada = campoCedula.value.trim();

    // Comprobar si la cédula ya existe
    const existe = estudiantes.some(function(e) {
        return e.cedula === cedulaIngresada;
    });

    if (existe) {
        mostrarAlerta("Ya existe un estudiante registrado con esta cédula.", "error");
        marcarCampo(campoCedula, false, "errorCedula");
        return;
    }

    // Crear objeto con los datos introducidos
    const nuevoEstudiante = {
        cedula: cedulaIngresada,
        apellidos: campoApellidos.value.trim(),
        nombres: campoNombres.value.trim(),
        direccion: campoDireccion.value.trim(),
        telefono: campoTelefono.value.trim(),
        correo: campoCorreo.value.trim(),
        facultad: campoFacultad.value,
        nivel: campoNivel.value,
        paralelo: campoParalelo.value.trim().toUpperCase()
    };

    // Agregar a la lista y guardar
    estudiantes.push(nuevoEstudiante);
    guardarEnLocalStorage(estudiantes);

    mostrarAlerta("Estudiante registrado con éxito.", "exito");
    limpiarFormulario();
    mostrarTabla();
});

// Eliminar un estudiante por su cédula
function eliminarEstudiante(cedula) {
    if (confirm("¿Está seguro de que desea eliminar al estudiante con cédula " + cedula + "?")) {
        let estudiantes = obtenerEstudiantes();
        
        // Filtrar quitando el estudiante seleccionado
        estudiantes = estudiantes.filter(function(e) {
            return e.cedula !== cedula;
        });

        guardarEnLocalStorage(estudiantes);
        mostrarTabla(cajaBusqueda.value);
        mostrarAlerta("Estudiante eliminado correctamente.", "exito");
    }
}

// Limpiar formulario y estilos de validación
function limpiarFormulario() {
    formulario.reset();
    const campos = [campoCedula, campoApellidos, campoNombres, campoDireccion, campoTelefono, campoCorreo, campoFacultad, campoNivel, campoParalelo];
    
    campos.forEach(function(campo) {
        campo.classList.remove("campo-correcto", "campo-incorrecto");
    });

    document.querySelectorAll(".mensaje-error").forEach(function(span) {
        span.style.display = "none";
    });
}

botonLimpiar.addEventListener("click", limpiarFormulario);

// Buscar estudiantes al escribir en la caja de búsqueda
cajaBusqueda.addEventListener("input", function() {
    mostrarTabla(cajaBusqueda.value);
});

// Mostrar alertas informativas
function mostrarAlerta(mensaje, tipo) {
    mensajeAlerta.textContent = mensaje;
    mensajeAlerta.className = "alerta " + tipo;
    
    setTimeout(function() {
        mensajeAlerta.className = "alerta oculta";
    }, 3000);
}

// Cargar los datos de la tabla cuando abre la página
window.onload = function() {
    mostrarTabla();
};