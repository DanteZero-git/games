const usuario = document.getElementById("usuario")
const contraseña = document.getElementById("contraseña")
const icon1 = document.getElementById("icon1")
const icon2 = document.getElementById("icon2")
const iconPass1 = document.getElementById("iconPass1")
const iconPass2 = document.getElementById("iconPass2")
const contador1 = document.getElementById("contador1")
const contador2 = document.getElementById("contador2")

function cambiarIconos(item1, item2, item3) {
    const inputValue = item1.value.length
    const minValue = item1.minLength
    const icon = item3
    const iconPass = item2

    if (inputValue < minValue) {
        icon.style.backgroundColor = "red"
        icon.style.opacity = "1"
        iconPass.style.backgroundColor = "black"
        iconPass.removeAttribute("src")
    } else {
        icon.style.backgroundColor = "grey"
        icon.style.opacity = ".2"
        iconPass.style.backgroundColor = "cyan"
        console.log(iconPass)
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

    simbolo1.innerText = ">"
    simbolo1.classList.add("numeros")
    contador.appendChild(simbolo1)

    for (let i = 0; i < maxValue; i++) {
        const elemento = document.createElement("span")
        elemento.innerText = i + 1
        elemento.id = `num${i + 1}`
        elemento.style.width = `calc(100% / ${maxValue})`
        contador.appendChild(elemento)
    }

    const simbolo2 = document.createElement("span")
    simbolo2.innerText = "<"
    simbolo2.classList.add("numeros")
    contador.appendChild(simbolo2)
}

function selectorNumero(item1, item2) {
    const inputValue = item1.value.length
    const contador = item2
    const seleccionado = contador.querySelector(`#num${inputValue}`)
    const listaItems = contador.querySelectorAll('[id*="num"]')

    listaItems.forEach(item => {
        if (item === seleccionado) {
            item.style.fontSize = "18px"
            item.style.color = "white"
        } else {
            item.style.fontSize = "10px"
            item.style.color = "grey"
        }
    })
}


window.onload = main

function main() {
            dibujarContador(usuario, contador1)
            dibujarContador(contraseña, contador2)

            cambiarIconos(usuario, iconPass1, icon1)
            cambiarIconos(contraseña, iconPass2, icon2)

            selectorNumero(usuario, contador1)
            selectorNumero(contraseña, contador2)

            usuario.addEventListener("input", () => cambiarIconos(usuario, iconPass1, icon1))
            contraseña.addEventListener("input", () => cambiarIconos(contraseña, iconPass2, icon2))

            usuario.addEventListener("input", () => selectorNumero(usuario, contador1))
            contraseña.addEventListener("input", () => selectorNumero(contraseña, contador2))
        }
