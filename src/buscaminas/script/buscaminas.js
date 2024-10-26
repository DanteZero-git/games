const cantidad = document.getElementById("cantidad")
const valorCantidad = Number(cantidad.value)
const valorTextarea = document.getElementById("valorTextarea")
const contenedorGrid = document.getElementById("contenedorGrid")
const ramdom = 40 // es porcentaje

// valores min y max del input
let valoresCuadricula = []
for (let i = 20; i <= 30; i++) {
    valoresCuadricula += (i < 30) ? `${i}, ` : `${i}`
}

// dibujar grid
function dibujarGrid(par) {
    contenedorGrid.innerHTML = ""
    const grid = document.createElement("ul")

    grid.style.width = "100%"
    grid.style.height = "100%"
    grid.style.display = "grid"
    grid.style.gridTemplateColumns = `repeat(${par}, 1fr)`
    grid.style.gap = "2px"
    grid.style.overflow = "auto"
    grid.style.scrollbarWidth = "none"

    for (let i = 0; i < par * par; i++) {
        const li = document.createElement("li")
        grid.appendChild(li)
        li.classList.add("li")
        li.id = `${i}`
        li.innerHTML = `${i}`

        const check = document.createElement("input")
        li.appendChild(check)
        check.classList.add("check")
        check.type = "checkbox"
    }
    contenedorGrid.appendChild(grid)
    document.head.appendChild(clases)
}

const clases = document.createElement("style")
clases.textContent += `
    .li {
        position: relative;
        height: 100%;
        aspect-ratio: 1/1;
        border: 1px solid grey;
        border-radius: 12%;
        font-size: 10px;
    }

    .check {
        all: unset;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
`

// reconocer casillas
function listarCasillas() {
    return Array.from(contenedorGrid.querySelectorAll("li"))
}

// ramdomiza las bombas
let bombas = []
function ramdomBombas() {
    const casillas = listarCasillas()
    const cantidadBombas = Math.floor((casillas.length * ramdom) / 100)
    while (bombas.length < cantidadBombas) {
        const numRamdom = Math.floor(Math.random() * casillas.length)
        const item = document.getElementById(numRamdom)
        if (!bombas.includes(numRamdom)) { bombas.push(item) }
    }
    bombas.sort((a, b) => Number(a.id) - Number(b.id)) // array ordenado por id
}

// dibuja las bombas
function dibujarBombas() {
    bombas.forEach(element => {
        element.style.background = "red"
        element.classList.add("bomba")
    })
}

// detecta fila y columna de casilla marcada
let filas = []
let columnas = []
let fila
let columna

function localizar(item) {
    item.style.border = "5px solid green"
    // casillas por fila
    for (let a = 0; a <= (valorCantidad - 1); a++) {
        filas[a] = []
        for (let b = 0; b < valorCantidad; b++) {
            filas[a].push(`${b + (a * valorCantidad)}`)
        }
    }
    // casillas por columna
    for (let a = 0; a <= (valorCantidad - 1); a++) {
        columnas[a] = []
        for (let b = 0; b < valorCantidad; b++) {
            columnas[a].push(`${a + (b * valorCantidad)}`)
        }
    }
    // encontrar fila y columna de seleccionado
    for (let i = 0; i < valorCantidad; i++) {
        if (filas[i].includes(item.id)) {
            fila = i
        }
        if (columnas[i].includes(item.id)) {
            columna = i
        }
    }
}

let casillasAbiertas = []
function dibujarNum(fila, columna, filas, columnas, casillaAbierta) {
    if (!casillasAbiertas.includes(casillaAbierta)) {
        const input = casillaAbierta.children[0]
        const border = "4px solid red"

        if (!casillaAbierta.classList.contains("bomba")) {
            // misma fila
            if (columna > 0) {
                const izqCentro = document.getElementById(Number(casillaAbierta.id) - 1)
                if (!izqCentro.classList.contains("bomba")) {
                    izqCentro.style.border = border
                    izqCentro.classList.add("contieneNum")
                } else {
                    izqCentro.style.backgroundColor = "grey"
                }
            }
            if (columna < valorCantidad - 1) {
                const derCentro = document.getElementById(Number(casillaAbierta.id) + 1)
                if (!derCentro.classList.contains("bomba")) {
                    derCentro.style.border = border
                    derCentro.classList.add("contieneNum")
                } else {
                    derCentro.style.backgroundColor = "grey"
                }
            }
            // fila superior
            if (fila > 0 && columna > 0) {
                const arIzq = document.getElementById(Number(casillaAbierta.id) - valorCantidad - 1)
                if (!arIzq.classList.contains("bomba")) {
                    arIzq.style.border = border
                    arIzq.classList.add("contieneNum")
                } else {
                    arIzq.style.backgroundColor = "grey"
                }
            }
            if (fila > 0) {
                const arCen = document.getElementById(Number(casillaAbierta.id) - valorCantidad)
                if (!arCen.classList.contains("bomba")) {
                    arCen.style.border = border
                    arCen.classList.add("contieneNum")
                } else {
                    arCen.style.backgroundColor = "grey"
                }
            }
            if (fila > 0 && columna < valorCantidad - 1) {
                const arDer = document.getElementById(Number(casillaAbierta.id) - valorCantidad + 1)
                if (!arDer.classList.contains("bomba")) {
                    arDer.style.border = border
                    arDer.classList.add("contieneNum")
                } else {
                    arDer.style.backgroundColor = "grey"
                }
            }
            // fila inferior
            if (fila < valorCantidad - 1 && columna > 0) {
                const abIzq = document.getElementById(Number(casillaAbierta.id) + valorCantidad - 1)
                if (!abIzq.classList.contains("bomba")) {
                    abIzq.style.border = border
                    abIzq.classList.add("contieneNum")
                } else {
                    abIzq.style.backgroundColor = "grey"
                }
            }
            if (fila < valorCantidad - 1) {
                const abCen = document.getElementById(Number(casillaAbierta.id) + valorCantidad)
                if (!abCen.classList.contains("bomba")) {
                    abCen.style.border = border
                    abCen.classList.add("contieneNum")
                } else {
                    abCen.style.backgroundColor = "grey"
                }
            }
            if (fila < valorCantidad - 1 && columna < valorCantidad - 1) {
                const abDer = document.getElementById(Number(casillaAbierta.id) + valorCantidad + 1)
                if (!abDer.classList.contains("bomba")) {
                    abDer.style.border = border
                    abDer.classList.add("contieneNum")
                } else {
                    abDer.style.backgroundColor = "grey"
                }
            }
        } else {
            console.log("bomba")
        }
    }
}

function prepararJuego() {
    bombas = []
    valorTextarea.innerHTML = valorCantidad * valorCantidad
    dibujarGrid(valorCantidad)
    ramdomBombas()
    dibujarBombas()
}

function juego(item) {
    const casillaAbierta = item.target.parentNode
    localizar(casillaAbierta)
    dibujarNum(fila, columna, filas, columnas, casillaAbierta)
}

// onload
prepararJuego()
// on evento
cantidad.addEventListener("input", async () => {
    prepararJuego()
})

listarCasillas().forEach(element => {
    element.addEventListener("click", function (evento) {
        juego(evento)
    })
})




/* if (fila > 0) {
    const arriba = document.getElementById(Number(casillaAbierta.id) - valorCantidad);
    if (arriba) {
        arriba.style.border = border;
    } */