const jsonLocal = "../common-json/juegos.json"

const lista = Array.from(document.getElementsByTagName("ul"))[0]

async function dibujarLista(par) {
    let num = 0
    par.forEach(element => {
        const li = document.createElement("li")
        li.innerHTML = `${element.nombre} <br> ${element.url}`
        li.onclick = () => {
            console.log(element.url)
            window.open (element.url)
        }

        lista.appendChild(li)
        num = num + 1
    })
}

async function fetchLocal(par) {
    try {
        const datos = await fetch(par)
        if (datos.ok) {
            const json = await datos.json()
            return json
        } else {
            console.log("Error en la peticion")
        }
    } catch (error) {
        console.log("Error: ", error.message)
        return error.message
    }
}

dibujarLista(await fetchLocal(jsonLocal))