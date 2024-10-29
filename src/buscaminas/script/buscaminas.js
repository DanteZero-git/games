let cantidad = document.getElementById("cantidad")
const valorCantidad = Number(document.getElementById("cantidad").value)
const textarea = document.getElementById("cantidadInfo")
const contenedorTablero = document.getElementById("contenedorTablero")
const ramdom = 20 // es porcentaje

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
            background-color: grey;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
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
            li.innerHTML = `${li.id}`

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
        element.style.backgroundColor = "red"
    })
}


// escribe los valores de bombas cercanas
let casillasAbiertas = []
function reconocerCercanos(evento) {
    const par = [evento.target.parentNode]
    evento.disabled=true
    let contadorBombas = 0
    par.forEach(element => {
        if (!bombas.includes(element)) {
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
                    const filaItem = Number(item.casilla.getAttribute("fila"))
                    const columnaItem = Number(item.casilla.getAttribute("columna"))
                    console.log(columnaItem)
                    const filaArriba = filaItem + 1 == fila && ["arIzq", "arCen", "arDer"].includes(item.posicion)
                    const filaAbajo = filaItem - 1 == fila && ["abIzq", "abCen", "abDer"].includes(item.posicion)
                    const filaCentro = filaItem == fila && ["izq", "cen", "der"].includes(item.posicion)

                    if (item.casilla) {
                        if ((filaArriba || filaCentro || filaAbajo) && !item.casilla.classList.contains("bomba")) {
                            item.casilla.style.border = "2px solid black"
                        }
                        if (item.casilla.classList.contains("bomba") 
                            && (columnaItem  == columna || columnaItem + 1 == columna || columnaItem - 1 == columna)) {
                            contadorBombas += 1
                        }
                    }
                }
            })
            element.style.fontSize = "22px"
            element.style.display = "flex"
            element.style.alignItems = "center"
            element.style.justifyContent = "center"
            element.innerHTML = contadorBombas
        }
    })
    console.log(casillasAbiertas)

    /*     if (casillasAbiertas.length > 0) {
            reconocerCercanos()
        }
     */
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
    casillasTablero.forEach(element => {
        element.addEventListener("change", function (evento) {
            reconocerCercanos(evento)
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

