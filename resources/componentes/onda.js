class component extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })

        const ul = document.createElement('ul')

        const style = document.createElement('style')
        style.textContent = `
            ul {
                padding: 2px;
                margin: 0;
                box-sizing: border-box;
                list-style-type: none;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;

                li {
                width: 20%;
                border: 1px solid white;
                opacity: .6;
                }
            }

            @keyframes movimiento {
            0% { transform: translate(0%);}
            50% { transform: translate(350%);}
            100% { transform: translate(0%);}
            }
        `
        this.hasAttribute("borde") ? ul.style.border = "1px solid red" : null
        const altura = this.getAttribute("alto") || 200
        const anchura = this.getAttribute("ancho") || 100
        const cantidad = this.getAttribute("cantidad") || 2
        const tempo = this.getAttribute("tempo") || 99

        ul.style.height = altura
        ul.style.width = anchura

        for (let i = 0; i < cantidad; i++) {
            const li = document.createElement('li')

            li.style.height = `calc(80% / (${cantidad} * 2))`
            this.hasAttribute("color") ? li.style.backgroundColor = this.getAttribute("color") : null
            this.hasAttribute("animado") ? li.style.animation = `movimiento ${tempo}s ease-in-out infinite` : null
            this.hasAttribute("tempo") ? li.style.animationDelay = `${(tempo / cantidad) * i}s` : null
            ul.appendChild(li)
        }
        shadow.appendChild(style)
        shadow.appendChild(ul)

    }
}

customElements.define('barras-component', component);