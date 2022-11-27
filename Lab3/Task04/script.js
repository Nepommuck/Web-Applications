let score = 0
document.getElementById("score").innerText = "Score: 0"
let active = true

const button = document.getElementById("clicker")
button.addEventListener("click", increase_score)

const activator = document.getElementById("activator")
activator.addEventListener("click", deactivate)

function update_score() {
    document.getElementById("score").innerText = "Score: " + score
}

function increase_score() {
    score++
    update_score()
}

function deactivate() {
    score = 0
    update_score()
    button.disabled = true

    button.removeEventListener("click", increase_score)

    activator.innerText = "Activate"
    activator.removeEventListener("click", deactivate)
    activator.addEventListener("click", activate)
}

function activate() {
    button.disabled = false

    button.addEventListener("click", increase_score)

    activator.innerText = "Deactivate"
    activator.removeEventListener("click", activate)
    activator.addEventListener("click", deactivate)
}
