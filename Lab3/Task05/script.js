let score = 0
let propagation = true
let direction = false
scoreboard = document.getElementById("score")
update_scoreboard()

const white = document.getElementById("white")
const red = document.getElementById("red")
const yellow = document.getElementById("yellow")
const reset_buton = document.getElementById("reset")
const propagation_buton = document.getElementById("propagation")
const direction_buton = document.getElementById("revert")
const log = document.getElementById("log")

const color_black = "rgb(0, 0, 0)"
const color_red = "rgb(255, 0, 0)"
const color_yellow = "rgb(255, 255, 0)"
const opaque_black = "rgba(0, 0, 0, 0.7)"
const opaque_red = "rgba(255, 0, 0, 0.3)"
const opaque_yellow = "rgba(200, 255, 0, 0.5)"

prepare()


function prepare() {
    reset_buton.addEventListener("click", reset)
    propagation_buton.addEventListener("click", flip_propagation)
    direction_buton.addEventListener("click", flip_direction)

    flip_direction()
}


function white_click(event) {
    increase_score(1, "white") 
    if(!propagation) 
        event.stopPropagation()
}
function red_click(event) {
    increase_score(2, "red") 
    if(!propagation) 
        event.stopPropagation()
}
function yellow_click(event) {
    increase_score(5, "yellow") 
    if(!propagation) 
        event.stopPropagation()
}


function increase_score(n, name="unknown") {
    const msg = "Clicked " + name + " with value " + n
    console.log(msg)
    log_print(msg)
    score += n

    update_scoreboard()
    check_conditions()
}

function update_scoreboard() {
    scoreboard.innerText = "Score: " + score
}


function change_colors(item, main, background) {
    item.style.backgroundColor = background
    item.style.borderColor = main
    item.style.color = main
}

function check_conditions() {
    if (score > 30) {
        red.removeEventListener("click", red_click, direction)
        change_colors(red, opaque_black, opaque_red)
    }
    if (score > 50) {
        yellow.removeEventListener("click", yellow_click, direction)
        change_colors(yellow, opaque_black, opaque_yellow)
    }
}


function flip_propagation() {
    propagation = !propagation
    propagation_buton.innerText = (propagation ? "Stop" : "Start") + " Propagation"
    const msg = "Propagation: " + propagation

    console.log(msg)
    log_print(msg)
}

function flip_direction(print=true) {
    white.removeEventListener("click", white_click, direction)
    red.removeEventListener("click", red_click, direction)
    yellow.removeEventListener("click", yellow_click, direction)

    direction = !direction

    white.addEventListener("click", white_click, direction)
    red.addEventListener("click", red_click, direction)
    yellow.addEventListener("click", yellow_click, direction)

    direction_buton.innerText = "Change to " + (direction ? "front-" : "back-") + "first"

    if (print) {
        const msg = "Direction: " + (direction ? "back-" : "front-") + "first"
        console.log(msg)
        log_print(msg)
    }

    check_conditions()
}

function log_print(msg) {
    log.innerText += msg + '\n'

    // only if scrolled to bottom
    if (log.scrollHeight - log.clientHeight <= log.scrollTop + 50)
        updateScroll()
}

function updateScroll(){
    log.scrollTop = log.scrollHeight;
}

function reset() {
    score = 0
    update_scoreboard()

    change_colors(red, color_black, color_red)
    change_colors(yellow, color_black, color_yellow)

    flip_direction(false)

    const msg = "Reseted succesfully!"
    console.log(msg)
    log_print('')
    log_print(msg)
    log_print('')
    
    prepare()
}
