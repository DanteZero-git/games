const numeroItems = 14
const tamañoItems = 4
const retardoAnimacion = 3
const duracionAnimacion = 30
const ancho = 200

const contenedor = document.getElementById("contenedorAdn")
contenedor.style.width = "200px"
contenedor.style.height = "100%"
contenedor.style.border = "1px solid green"
contenedor.style.position = "absolute"
contenedor.style.left = "75px"

const elice1 = document.createElement("ul")
elice1.id = "adn1"
elice1.style.listStyle = "none"
elice1.style.width = "100%"
elice1.style.height = "100%"
elice1.style.display = "flex"
elice1.style.flexDirection = "column"
elice1.style.justifyContent = "space-between"
elice1.style.position = "absolute"

const elice2 = document.createElement("ul")
elice2.id = "adn2"
elice2.style.listStyle = "none"
elice2.style.width = "100%"
elice2.style.height = "100%"
elice2.style.display = "flex"
elice2.style.flexDirection = "column"
elice2.style.justifyContent = "space-between"
elice2.style.position = "absolute"

const lineas = document.createElement("ul")
lineas.id = "lineas"
lineas.style.listStyle = "none"
lineas.style.width = "100%"
lineas.style.height = "100%"
lineas.style.display = "flex"
lineas.style.flexDirection = "column"
lineas.style.justifyContent = "space-between"
lineas.style.alignItems = "center"
lineas.style.position = "absolute"


function dibujarCirculos(par1, par2, par3, par4) {
    for (let i = 0; i < numeroItems; i++) {
        const li = document.createElement("li")

        li.style.width = `${tamañoItems}vh`
        li.style.aspectRatio = "1/1"
        li.style.borderRadius = "50%"
        li.style.position = "relative"
        li.style.transform = "scale(75%)"
        li.style.backgroundColor = `${par2}`
        li.style.left = par1.id === "adn1"
            ? "0"
            : `calc(100% - ${tamañoItems}px)`
        li.style.animation = `${par3} ${duracionAnimacion}s ease-in-out infinite`
        li.style.animation += `, ${par4} ${duracionAnimacion}s ease-in-out infinite`
        li.style.animationDelay = `${retardoAnimacion * i}s`

        par1.appendChild(li)
    }
}

function dibujarLineas() {
    for (let i = 0; i < numeroItems; i++) {

        const linea = document.createElement("li")
        linea.style.width = `calc(100% - ${tamañoItems}px)`
        linea.style.height = "2px"
        linea.style.backgroundColor = "grey"
        linea.style.margin = "14px 0 14px 0"
        linea.style.zIndex = "-1"
        linea.style.animation = `lineas ${duracionAnimacion}s ease-in-out infinite`
        linea.style.animationDelay = `${retardoAnimacion * i}s`

        lineas.appendChild(linea)
    }
}

dibujarCirculos(elice1, "white", "movimiento-1", "opacidad-1")
dibujarCirculos(elice2, "white", "movimiento-2", "opacidad-2")
contenedor.appendChild(elice1)
contenedor.appendChild(elice2)
contenedor.appendChild(lineas)
dibujarLineas()

const style = document.createElement('style');
style.textContent = `
@keyframes movimiento-1 {
    0% { 
        left: 0; 
        transform: scale(80%); 
    }
    25% { 
        transform: scale(100%); 
    }
    50% { 
        left: calc(100% - ${tamañoItems}px); 
        transform: scale(80%); 
    }
    75% { 
        transform: scale(60%); 
    }
    100% { 
        left: 0; 
        transform: scale(80%);
    }
}

@keyframes movimiento-2 {
    0% { 
        left: calc(100% - ${tamañoItems}px); 
        transform: scale(80%); 
    }
    25% { 
        transform: scale(60%); 
    }
    50% { 
        left: 0; 
        transform: scale(80%); 
    }
    75% { 
        transform: scale(100%); 
    }
    100% { 
        left: calc(100% - ${tamañoItems}px); 
        transform: scale(80%);
    }
}

@keyframes opacidad-1 {
    70% {opacity: 1;}
    75% {opacity: 0;}
    80% {opacity: 1;}
}

@keyframes opacidad-2 {
    20% {opacity: 1;}
    25% {opacity: 0;}
    30% {opacity: 1;}
}

@keyframes lineas {
    0% {width: 98%;}
    25% {width: 0;}
    50% {width: 98%}
    75% {width: 0;}
    100% {width: 98%}
}
`
// en el HEAD !important
document.head.appendChild(style)