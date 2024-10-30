let cantidad = document.getElementById("cantidad")
const valorCantidad = Number(document.getElementById("cantidad").value)
const textarea = document.getElementById("cantidadInfo")
const contenedorTablero = document.getElementById("contenedorTablero")
const ramdom = 60 // es porcentaje

// valores min y max del input
let valoresCuadricula = []
for (let i = 20; i <= 30; i++) {
    valoresCuadricula.push(i)
}

let casillasTablero = []
let bombas = []

// dibujar flex
function dibujarFlex(par) {
    const clases = document.createElement("style")
    clases.textContent += `
        .contenedorTablero {
            width: calc((100% - 10px) - 300px);
            height: 100%;
            overflow: auto;
            scrollbarWidth: none;
            position: relative;
        }
        .ul {
            width: 100%;
            display: flex;
        }
        .li {
            position: relative;
            width: calc(100% / ${cantidad.value});
            aspect-ratio: 1/1;
            margin: 2px;
            border: 1px solid grey;
            border-radius: 12%;
            font-size: 8px;
        }
        .check {
            all: unset;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            color: white;
        }
`
    contenedorTablero.innerHTML = ""
    contenedorTablero.classList.add("contenedorTablero")
    for (let a = 0; a < cantidad.value; a++) {
        const ul = document.createElement("ul")
        ul.classList.add("ul")
        for (let b = 0; b < par; b++) {
            const li = document.createElement("li")
            li.classList.add("li")
            li.id = `${a * cantidad.value + b}`

            const check = document.createElement("input")
            check.classList.add("check")
            check.type = "checkbox"

            li.appendChild(check)
            ul.appendChild(li)
        }
        contenedorTablero.appendChild(ul)
    }
    document.head.appendChild(clases)
    casillasTablero = Array.from(contenedorTablero.querySelectorAll("li"))
}

// añade como atributos fila y columna a cada casilla
function posicionCasillas(par) {
    par.forEach((element, index) => {
        const fila = Math.floor(index / valorCantidad)
        const columna = index % valorCantidad
        element.setAttribute("fila", fila)
        element.setAttribute("columna", columna)
    })
}

// ramdomiza las bombas
function ramdomBombas() {
    bombas = []
    const cantidadBombas = Math.floor((casillasTablero.length * ramdom) / 100)
    while (bombas.length < cantidadBombas) {
        const numRamdom = Math.floor(Math.random() * casillasTablero.length)
        const item = document.getElementById(numRamdom)
        if (!bombas.includes(numRamdom)) { bombas.push(item) }
    }
    bombas.sort((a, b) => Number(a.id) - Number(b.id)) // array ordenado por id
}

// dibuja las bombas
function dibujarBombas() {
    bombas.forEach(element => {
        element.classList.add("bomba")
        element.style.boxShadow = "inset 0 0 12px red" // bombas visibles
    })
}

// escribe los valores de bombas cercanas
function buscarCercanos(parametro) {
    const par = Array.isArray(parametro) ? parametro : [parametro.target.parentNode]
    let casillasAbiertas = []
    par.forEach(element => {
        if (element.classList.contains("abierta")) { return }
        if (!bombas.includes(element) && !element.classList.contains("marcadaBomba")) {
            let contadorBombas = 0
            const fila = element.getAttribute("fila")
            const columna = element.getAttribute("columna")
            const cercanos = [
                { posicion: "izq", casilla: document.getElementById(Number(element.id) - 1) },
                { posicion: "cen", casilla: document.getElementById(Number(element.id)) },
                { posicion: "der", casilla: document.getElementById(Number(element.id) + 1) },
                { posicion: "arIzq", casilla: document.getElementById(Number(element.id) - 1 - Number(cantidad.value)) },
                { posicion: "arCen", casilla: document.getElementById(Number(element.id) - Number(cantidad.value)) },
                { posicion: "arDer", casilla: document.getElementById(Number(element.id) + 1 - Number(cantidad.value)) },
                { posicion: "abIzq", casilla: document.getElementById(Number(element.id) - 1 + Number(cantidad.value)) },
                { posicion: "abCen", casilla: document.getElementById(Number(element.id) + Number(cantidad.value)) },
                { posicion: "abDer", casilla: document.getElementById(Number(element.id) + 1 + Number(cantidad.value)) }
            ]
            cercanos.forEach(item => {
                if (item.casilla) {
                    item.disabled = true
                    const filaItem = Number(item.casilla.getAttribute("fila"))
                    const columnaItem = Number(item.casilla.getAttribute("columna"))
                    const filaArriba = filaItem + 1 == fila && ["arIzq", "arCen", "arDer"].includes(item.posicion)
                    const filaAbajo = filaItem - 1 == fila && ["abIzq", "abCen", "abDer"].includes(item.posicion)
                    const filaCentro = filaItem == fila && ["izq", "cen", "der"].includes(item.posicion)

                    if (item.casilla) {
                        if ((filaArriba || filaCentro || filaAbajo) && !item.casilla.classList.contains("bomba")) {
                            if (item.posicion != "cen") {
                                casillasAbiertas.push(item.casilla)
                            }
                        }
                        if (item.casilla.classList.contains("bomba")
                            && (columnaItem == columna || columnaItem + 1 == columna || columnaItem - 1 == columna)) {
                            contadorBombas += 1
                        }
                    }
                }
            })
            element.children[0].style.fontSize = "22px"
            element.children[0].style.color = "white"
            element.children[0].style.display = "flex"
            element.children[0].style.alignItems = "center"
            element.children[0].style.justifyContent = "center"
            element.children[0].innerHTML = contadorBombas
            element.children[0].style.backgroundColor = "rgb(80, 80, 80)"
            element.children[0].style.boxShadow = "inset 6px 8px 10px black"
            element.children[0].style.borderRadius = "12%"
            element.classList.add("abierta")
        }
    })
    return casillasAbiertas
}

function abrirCasillas(click) {
    const cercanos = buscarCercanos(click)
    buscarCercanos(cercanos)
}

function marcarBomba(botonDerecho) {
    botonDerecho.preventDefault() // para deshabilitar el menu contextual
    const casilla = botonDerecho.target.parentNode
    if (!casilla.classList.contains("abierta")) {
        if (!casilla.style.backgroundImage) {
            casilla.classList.add("marcadaBomba")
            casilla.style.backgroundImage = `url("../icons/buscaminas/bomba2.png")`
            casilla.style.backgroundSize = "contain"
            casilla.style.backgroundRepeat = "no-repeat"
            casilla.style.backgroundPosition = "center"
            casilla.style.backgroundColor = "rgb(80, 80, 80)"
            casilla.style.boxShadow = "inset 6px 8px 10px black"
        } else {
            casilla.classList.remove("marcadaBomba")
            casilla.style.backgroundImage = ""
            casilla.style.backgroundColor = ""
            casilla.style.boxShadow = ""
        }
    }
}

function finJuego(click) {
    const casilla = click.target
    if (casilla.parentNode.classList.contains("bomba")) {
        const fin = document.createElement("div")
        fin.style.width = "100%"
        fin.style.height = "100%"
        fin.style.position = "absolute"
        fin.style.top = 0
        fin.style.backgroundImage = 'url("../icons/buscaminas/boom1.png")'
        fin.style.backgroundSize = "contain"
        fin.style.backgroundRepeat = "no-repeat"
        fin.style.backgroundPosition = "center"
        contenedorTablero.appendChild(fin)
    }
}

// ###############################################################
function prepararJuego(evento) { // se recoge el evento y se pasa a la funcion 'calcularCercanos'
    cantidad.addEventListener("mousedown", () => {
        textarea.style.color = "grey"
    })
    cantidad.addEventListener("mouseup", () => {
        textarea.style.color = "black"
    })
    bombas = []
/*     casillasMarcadas = []
 */    textarea.innerHTML = document.getElementById("cantidad").value
    dibujarFlex(document.getElementById("cantidad").value)
    posicionCasillas(casillasTablero)
    ramdomBombas()
    dibujarBombas()
    casillasTablero.forEach(casilla => {
        casilla.addEventListener("change", function (evento) {
            abrirCasillas(evento)
        })
        casilla.addEventListener("contextmenu", function (evento) {
            marcarBomba(evento)
        })
        casilla.addEventListener("click", function (evento) {
            finJuego(evento)
        })
    })

}

// onload
prepararJuego()

// on evento
cantidad.addEventListener("mouseup", async () => {
    prepararJuego()
})
cantidad.addEventListener("input", async () => {
    textarea.innerHTML = document.getElementById("cantidad").value
})

