const cantidad = document.getElementById("cantidad")
const valorCantidad = document.getElementById("valorCantidad")
const contenedorGrid = document.getElementById("contenedorGrid")
const ramdom = 90 // es porcentaje

let valoresCuadricula = []
for (let i = 20; i <= 30; i++) {
    valoresCuadricula += (i < 30) ? `${i}, ` : `${i}`
}

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
        li.id = `casilla${i}`
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

let bombas = []
function ramdomBombas() {
    const num = Array.from(contenedorGrid.querySelectorAll("li")).length
    const cantidadBombas = Math.floor((num * ramdom) / 100)

    while (bombas.length < cantidadBombas) {
        const numRamdom = Math.floor(Math.random() * num)
        const item = document.getElementById("casilla" + numRamdom)
        if (!bombas.includes(numRamdom)) { bombas.push(item) }
    }
}

function crearBombas() {
    bombas.forEach(element => {
        element.style.background = "grey"
    })
}

valorCantidad.innerHTML = cantidad.value * cantidad.value
dibujarGrid(cantidad.value)
ramdomBombas()
crearBombas()


cantidad.addEventListener("input", () => {
    valorCantidad.innerHTML = cantidad.value * cantidad.value
    dibujarGrid(cantidad.value)
    crearBombas()
})

/* listarCasillas().forEach(element => {
    element.addEventListener("click", function () {
        // comparar elementos check con array de elementos bomba
    })
}) */