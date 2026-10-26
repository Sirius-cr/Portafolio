/* ==========================================================================
   VALIDACIONES EN JAVASCRIPT 
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Referencias a los elementos del formulario
  const formularioLogin = document.getElementById("formulario-login");
  const campoUsuario = document.getElementById("campo-usuario");
  const campoContrasena = document.getElementById("campo-contrasena");
  const alertaError = document.getElementById("alerta-error-login");
  const textoTituloError = document.getElementById("titulo-error-login");
  const textoDetalleError = document.getElementById("mensaje-error-login");
  const botonVerContrasena = document.getElementById("boton-ver-contrasena");

  // Credenciales válidas para el sistema académico
  const cuentasValidas = [
    {
      usuario: "arturo.vera",
      correo: "arturo.vera@uleam.edu.ec",
      correosValidos: ["arturo.vera@uleam.edu.ec", "arturo.vera@live.uleam.edu.ec"],
      contrasena: "docente123",
      rol: "docente",
      urlRedireccion: "docente-panel.html"
    },
    {
      usuario: "carlos.basurto",
      correo: "carlos.basurto@live.uleam.edu.ec",
      correosValidos: ["carlos.basurto@live.uleam.edu.ec", "carlos.basurto@uleam.edu.ec"],
      contrasena: "estudiante123",
      rol: "estudiante",
      urlRedireccion: "estudiante-panel.html"
    },
    {
      usuario: "coordinacion",
      correo: "coordinacion@uleam.edu.ec",
      correosValidos: ["coordinacion@uleam.edu.ec", "coordinacion@live.uleam.edu.ec"],
      contrasena: "coord123",
      rol: "coordinacion",
      urlRedireccion: "coordinacion-justificaciones.html"
    }
  ];

  // Expresiones regulares para validación del Login
  // 1. Estructura general de correo electrónico
  const regexEmailEstructura = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 2. Correo institucional: requiere dominio educativo (.edu, .edu.ec o uleam.edu.ec)
  const regexCorreoInstitucional = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)*(?:uleam\.edu\.ec|edu\.ec|edu)$/i;
  // 3. Contraseña: mínimo 6 caracteres, al menos una letra y un número
  const regexContrasena = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/;

  // Alternar la visibilidad de la contraseña
  if (botonVerContrasena) {
    botonVerContrasena.addEventListener("click", function () {
      if (campoContrasena.type === "password") {
        campoContrasena.type = "text";
        botonVerContrasena.setAttribute("aria-label", "Ocultar contraseña");
      } else {
        campoContrasena.type = "password";
        botonVerContrasena.setAttribute("aria-label", "Mostrar contraseña");
      }
    });
  }

  // Función para mostrar el mensaje de error institucional 
  function mostrarError(titulo, detalle) {
    textoTituloError.textContent = titulo;
    textoDetalleError.textContent = detalle;
    alertaError.classList.add("visible");
  }

  // Función para ocultar el mensaje de error
  function ocultarError() {
    alertaError.classList.remove("visible");
    campoUsuario.classList.remove("con-error");
    campoContrasena.classList.remove("con-error");
  }

  // Limpiar el error cuando el usuario vuelva a escribir
  campoUsuario.addEventListener("input", ocultarError);
  campoContrasena.addEventListener("input", ocultarError);

  // Validación al enviar el formulario
  formularioLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let valorCorreo = campoUsuario.value.trim();
    let valorContrasena = campoContrasena.value.trim();

    // 1. Validación de campos requeridos vacíos
    if (valorCorreo === "") {
      campoUsuario.classList.add("con-error");
      campoUsuario.focus();
      mostrarError("Campo requerido", "Por favor ingresa tu correo institucional.");
      return;
    }

    if (valorContrasena === "") {
      campoContrasena.classList.add("con-error");
      campoContrasena.focus();
      mostrarError("Campo requerido", "Por favor ingresa tu contraseña institucional.");
      return;
    }

    // 2. Validaciones con Expresiones Regulares
    // A. Validación del formato general del correo electrónico
    if (!regexEmailEstructura.test(valorCorreo)) {
      campoUsuario.classList.add("con-error");
      campoUsuario.focus();
      mostrarError(
        "Formato de correo inválido",
        "Por favor ingresa un formato de correo electrónico válido (ejemplo: usuario@live.uleam.edu.ec)."
      );
      return;
    }

    // B. Validación de dominio de correo institucional
    if (!regexCorreoInstitucional.test(valorCorreo)) {
      campoUsuario.classList.add("con-error");
      campoUsuario.focus();
      mostrarError(
        "Correo no institucional",
        "Debes ingresar tu correo institucional universitario (dominio @uleam.edu.ec o @live.uleam.edu.ec)."
      );
      return;
    }

    // C. Validación de formato de contraseña con expresión regular
    if (!regexContrasena.test(valorContrasena)) {
      campoContrasena.classList.add("con-error");
      campoContrasena.focus();
      mostrarError(
        "Formato de contraseña inválido",
        "La contraseña debe contener al menos 6 caracteres e incluir letras y números."
      );
      return;
    }

    // 3. Validación de credenciales autorizadas
    let valorCorreoLower = valorCorreo.toLowerCase();
    let cuentaEncontrada = null;
    for (let i = 0; i < cuentasValidas.length; i++) {
      let cuenta = cuentasValidas[i];
      let coincideCorreo =
        cuenta.correo.toLowerCase() === valorCorreoLower ||
        (cuenta.correosValidos && cuenta.correosValidos.some(function (c) {
          return c.toLowerCase() === valorCorreoLower;
        })) ||
        (cuenta.usuario.toLowerCase() === valorCorreoLower.split("@")[0]);

      if (coincideCorreo && cuenta.contrasena === valorContrasena) {
        cuentaEncontrada = cuenta;
        break;
      }
    }

    if (cuentaEncontrada) {
      // Credenciales correctas: Redireccionar según el rol
      ocultarError();
      window.location.href = cuentaEncontrada.urlRedireccion;
    } else {
      // Credenciales incorrectas
      campoUsuario.classList.add("con-error");
      campoContrasena.classList.add("con-error");
      mostrarError(
        "Credenciales incorrectas",
        "El correo institucional o la contraseña que ingresaste no son correctos. Revisa tus datos e inténtalo de nuevo."
      );
    }
  });
});
