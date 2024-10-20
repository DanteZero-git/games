const usuario = document.getElementById("usuario")
const usuario_min = usuario.minLength
const usuario_max = usuario.maxLength



const contador1 = document.getElementById("contador1")
const contador2 = document.getElementById("contador2")

contador1.addEventListener("input", contar(contador1))
contador2.addEventListener("input", contar(contador2))


function contar(item) {
    item.innerHTML = usuario_min
}