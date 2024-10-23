const usuario = document.getElementById("usuario")
const contraseña = document.getElementById("contraseña")
const icon1 = document.getElementById("icon1")
const icon2 = document.getElementById("icon2")
const iconPass1 = document.getElementById("iconPass1")
const iconPass2 = document.getElementById("iconPass2")
const contador1 = document.getElementById("contador1")
const contador2 = document.getElementById("contador2")
const botonForm = document.getElementById("botonForm")

function cambiarIconos(item1, item2, item3) {
    const inputValue = item1.value.length
    const minValue = item1.minLength
    const icon = item3
    const iconPass = item2

    icon.style.transition = ".6s"
    iconPass.style.transition = ".6s"

    if (inputValue < minValue) {
        icon.style.backgroundColor = "red"
        icon.style.opacity = "1"
        iconPass.style.backgroundColor = "grey"
        iconPass.style.opacity = ".4"
    } else {
        icon.style.backgroundColor = "grey"
        icon.style.opacity = ".4"
        iconPass.style.backgroundColor = "cyan"
        iconPass.style.opacity = "1"

        if (item1.id === "usuario") {
            iconPass.setAttribute("src", "src/icons/usuario.webp")
        } else {
            iconPass.setAttribute("src", "src/icons/candado-abierto.png")
        }
    }
}

function dibujarContador(item1, item2) {
    const contador = item2
    const maxValue = item1.maxLength
    const simbolo1 = document.createElement("span")
    const simbolo2 = document.createElement("span")
    const marco = document.createElement("div")

    for (let i = 0; i < maxValue; i++) {
        const elemento = document.createElement("span")
        elemento.innerText = i + 1
        elemento.id = `num${i + 1}`
        elemento.style.width = `calc(100% / ${maxValue})`
        marco.appendChild(elemento)
    }

    marco.classList.add("marco")
    contador.appendChild(marco)
}

function selectorNumero(item1, item2) {
    const inputValue = item1.value.length
    const contador = item2
    const seleccionado = contador.querySelector(`#num${inputValue}`)
    const listaItems = contador.querySelectorAll('[id*="num"]')

    listaItems.forEach(item => {
        if (item === seleccionado) {
            item.style.fontSize = "16px"
            item.style.color = "white"
        } else {
            item.style.fontSize = "10px"
            item.style.color = "grey"
        }
    })
}

function dibujarSelector(item) {
    const contador = item

    const marca = document.createElement("span")
    marca.classList.add("marca")
    marca.id = "marca" + contador.id.match(/\d/)[0]

    const contenedorMarca = document.createElement("span")
    contenedorMarca.classList.add("contenedorMarca")

    contador.appendChild(contenedorMarca)
    contenedorMarca.appendChild(marca)
}

function selectorMarca(item1, item2) {
    const inputValue = item1.value.length
    const minValue = item1.minLength
    const maxValue = item1.maxLength
    const contador = item2
    const marca = contador.getElementsByClassName("marca")
    inputValue === 0 ? marca[0].style.opacity = "0" : marca[0].style.opacity = ".6"

    if (inputValue >= 1) {
        marca[0].style.left = `calc((100% / ${maxValue}) * (${inputValue} - 1) + 5px)`;
    }

    if (inputValue >= minValue) {
        marca[0].style.backgroundColor = "cyan";
    } else {
        marca[0].style.backgroundColor = "red";
    }
}

function activarEnvio() {
    if (usuario.value.length >= usuario.minLength && contraseña.value.length >= contraseña.minLength) {
        botonForm.removeAttribute('disabled')
        botonForm.style.borderColor = "white"
        botonForm.style.color = "white"
        botonForm.style.cursor = "pointer"
        botonForm.style.backgroundColor = "rgba(0, 0, 0, 0.568)";
    } else {
        botonForm.setAttribute('disabled', 'disabled')
        botonForm.style.borderColor = "grey"
        botonForm.style.color = "grey"
        botonForm.style.cursor = "default"
        botonForm.style.backgroundColor = "transparent";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Aplica los estilos una vez que el DOM esté listo
    window.onload = main
})

function main() {
    cambiarIconos(usuario, iconPass1, icon1)
    cambiarIconos(contraseña, iconPass2, icon2)

    dibujarContador(usuario, contador1)
    dibujarContador(contraseña, contador2)

    dibujarSelector(contador1)
    dibujarSelector(contador2)

    selectorNumero(usuario, contador1)
    selectorNumero(contraseña, contador2)

    selectorMarca(usuario, contador1)
    selectorMarca(contraseña, contador2)

    usuario.addEventListener("input", () => cambiarIconos(usuario, iconPass1, icon1))
    contraseña.addEventListener("input", () => cambiarIconos(contraseña, iconPass2, icon2))

    usuario.addEventListener("input", () => selectorNumero(usuario, contador1))
    contraseña.addEventListener("input", () => selectorNumero(contraseña, contador2))

    usuario.addEventListener("input", () => selectorMarca(usuario, contador1))
    contraseña.addEventListener("input", () => selectorMarca(contraseña, contador2))

    usuario.addEventListener("input", activarEnvio)
    contraseña.addEventListener("input", activarEnvio)
}
