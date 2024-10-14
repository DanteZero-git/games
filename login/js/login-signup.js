const contador1 = document.getElementById("contador1")
const contador2 = document.getElementById("contador2")
const usuario = document.getElementById("usuario")
const contraseña = document.getElementById("contraseña")

// Dibuja y mueve el contador segun el minLength del input
function contadorInput(input, contador) {
    const numeroCaracteres = input.value.length
    let caracteresMin = input.minLength
    console.log(numeroCaracteres)

    if (numeroCaracteres <= caracteresMin || input.classList.contains("numeroContador")) {
        contador.classList.remove("numeroContador", "validado")

        contador.innerHTML = caracteresMin - numeroCaracteres
        contador.style.transform = `translateX(${(202 / caracteresMin) * numeroCaracteres}px)`
        if (numeroCaracteres === caracteresMin) { setTimeout(function() {contador.classList.add("numeroContador", "validado")},500) }
    } 
    else {
        contador.classList.add("numeroContador")
        contador.innerHTML = 0 
        contador.style.transform = `translateX(${(202 / caracteresMin) * caracteresMin}px)`
    }
}

window.onload = function () {
    contadorInput(usuario, contador1);
    contadorInput(contraseña, contador2);
}

usuario.addEventListener('input', function () { contadorInput(usuario, contador1) })
contraseña.addEventListener('input', function () { contadorInput(contraseña, contador2) })
