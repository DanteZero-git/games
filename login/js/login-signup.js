const contador1 = document.getElementById("contador1")
const contador2 = document.getElementById("contador2")
const usuario = document.getElementById("usuario")
const contraseña = document.getElementById("contraseña")
const envioForm = document.getElementById("envioForm")

// Comprueba si los inputs son validos y activa el boton de envio del formulario
function validar() {
    if (usuario.value.length >= usuario.minLength && contraseña.value.length >= contraseña.minLength) {
        console.log("ambos inputs son validos")
        envioForm.parentNode.classList.add("elemento3d", "domCargado")
        envioForm.removeAttribute("disabled")
    }
}
// Dibuja y mueve el contador segun el minLength del input
let varExt
async function contadorInput(input, contador) {
    const caracteres = input.value.length
    let caracteresMin = input.minLength
    const dinamico = contador.nextElementSibling
    const anchoPadre = dinamico.parentNode.offsetWidth

    if (caracteres <= caracteresMin) {
        contador.classList.remove("validado")
        contador.innerHTML = caracteresMin - caracteres
        dinamico.style.width = `${(anchoPadre / (caracteresMin + 1)) * (caracteresMin - caracteres)}px`
        clearTimeout(varExt)
    }
    if (caracteres === caracteresMin) {
        varExt = setTimeout(function () {
            contador.innerHTML = ""
            contador.classList.add("validado")
            setTimeout(function () {
                contador.innerHTML =
                    `<img src="../../resources/icons/formValidado.png" alt="Correcto" 
                    style="width: 20px; height: 20px; margin-right: 20px; vertical-align: middle;"> 
                    Válido`
            }, 500)
        }, 1200)
    }
}

// espera a la carga de la pagina para ejecutar por primera vez las funciones y añadir la clase de transiciones
window.onload = function () {
    contadorInput(usuario, contador1);
    contadorInput(contraseña, contador2);
    Array.from(document.getElementsByClassName("fieldset")).forEach(function (item) { item.classList.add("domCargado") })
    Array.from(document.getElementsByClassName("dinamico")).forEach(function (item) { item.classList.add("domCargado") })
    document.getElementById("envioForm").classList.add("domCargado")
}
// eventos de 3d on click
if (usuario.value) { usuario.parentNode.classList.add("fieldset3d") }
usuario.parentNode.addEventListener("click", function () {
    usuario.parentNode.classList.add("elemento3d")
    usuario.focus()
})

contraseña.parentNode.addEventListener("click", function () {
    contraseña.parentNode.classList.add("elemento3d")
    contraseña.focus()
})
// eventos de escritura en input
usuario.addEventListener('input', function () {
    contadorInput(usuario, contador1)
    validar()
})
contraseña.addEventListener('input', function () {
    contadorInput(contraseña, contador2)
    validar()
})

