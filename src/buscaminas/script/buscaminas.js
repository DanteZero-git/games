const cantidad = document.getElementById("cantidad")
const valorCantidad = document.getElementById("valorCantidad")
const contenedorGrid = document.getElementById("contenedorGrid")

let valoresCuadricula = []
for (let i = 20; i <= 30; i++) {
    valoresCuadricula += (i < 30) ?  `${i}, ` : `${i}`
}

console.log(valoresCuadricula)
function dibujarGrid (par) {
    contenedorGrid.innerHTML = ""
    const grid = document.createElement("ul")
    console.log(contenedorGrid.offsetWidth + " - " + contenedorGrid.offsetHeight)

    grid.style.border = "1px solid blue"
    grid.style.width = "100%" 
    grid.style.height = "100%" 

    grid.style.display = "grid"
    grid.style.gridTemplateColumns = `repeat(${par}, 1fr)`
    grid.style.gap = "2px"
    grid.style.overflow = "auto"

    for (let i = 0; i < par * par; i++) {

    const li = document.createElement("li")
    grid.appendChild(li)

    li.style.height = "100%"
    li.style.aspectRatio = "1/1"
    li.style.backgroundColor = "grey"
    li.innerHTML = `${i  + 1}`
    li.style.fontSize = "10px"

    }
    contenedorGrid.appendChild(grid)
}

dibujarGrid(cantidad.value)

cantidad.addEventListener("input", () => {
    valorCantidad.innerHTML = cantidad.value * cantidad.value
    dibujarGrid(cantidad.value)
})

