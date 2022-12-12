const speeds = [1, 2, 4, 8, 16]
const speedMult = 2
const body = document.getElementsByTagName('body')[0]
const gameOverSign = document.getElementById("game-over")
const aim = document.getElementById("aim")
const aimBias = 150
let score = 0
let health = 3
const basicZombieHeight = 312

const hearts = []
let zombies = [] 

let running = true


for (let i=0; i<health; i++) {
    let element = document.createElement("img")
    element.src = "images/full_heart.png"
    element.classList.add("heart")

    document.getElementById("healthbar").appendChild(element)
    hearts[i] = element
}

body.addEventListener("click", ammoWasted)
gameOverSign.style.display = "none"
changeScore(0)
document.getElementById("play-again").addEventListener("click", function(){ location.reload() })


function getWindowHeight(){
    return window.innerHeight
}
function getWindowWidth(){
    return window.innerWidth
}

function toAsci(c) {
    return c.charCodeAt(0)
} 
function isNumeric(c) {
    return toAsci(c) >= toAsci('0') && toAsci(c) <= toAsci('9')
}

function toNum(str) {
    digits = []
    for (const c of str) {
        if (isNumeric(c) || c == '.' || c == '-')
            digits += c
    }
    return Number(digits)
}

// Returns an int value [min, max)
function randInt(max, min=0) {
    min = Math.floor(min)
    max = Math.floor(max)
    return Math.min(Math.floor(Math.random() * (max - min)) + min, max-1)
}

function randRange(max, min=0) {
    return Math.random() * (max - min) + min
}

function getZombieHeight(scale) {
    return scale * basicZombieHeight;
}

// for (const zombie of zombies)
//     zombie.style.left = "800px"


// Create new one
function add() {
    const newZombie = {
        speed: speeds[randInt(5, 0)],
        scale: randRange(0.5, 1),
        leftPosition: getWindowWidth(),
        bottomPosition: 0,
        element: document.createElement("div")
    }
    newZombie.bottomPosition = randInt(0.2 * getWindowHeight(), -getZombieHeight(newZombie.scale) / 2)
    newZombie.element.classList.add("animation")

    body.appendChild(newZombie.element)
    newZombie.element.style.zIndex = (-newZombie.bottomPosition)

    newZombie.element.style.transform = "scale(" + newZombie.scale + ")"
    newZombie.element.style.top = 
    getWindowHeight() - newZombie.bottomPosition - getZombieHeight(newZombie.scale)/2 - basicZombieHeight/2 + "px"

    newZombie.element.style.display = "block"
    newZombie.element.addEventListener("click", kill)

    zombies.push(newZombie)

    console.log(
        zombies
    )
}


function move() {
    for (const zombie of zombies) {        
        zombie.leftPosition -= zombie.speed * speedMult
        zombie.element.style.left = zombie.leftPosition + "px"
    }
    checkIfAnyGotThrough()

    removeKilled()

}

function removeKilled() {
    for (const zombie of zombies) {
        if (zombie.element.style.display == "none")
        body.removeChild(zombie.element)
    }
    zombies = zombies.filter(
        zombie => zombie.element.style.display != "none"
    )
}

function kill(event) {
    event.target.style.display = "None"

    changeScore(12)

    event.stopPropagation()
}

function toNDigits(x, n) {
    let res = x + ''
    let pref = ""
    for (let i=0; i < n-res.length; i++)
        pref += '0'
    return pref + res
}

function changeScore(dif) {
    score = Math.max(score + dif, 0)
    // document.getElementById("score").innerText = score
    document.getElementById("score").innerText = toNDigits(score, 5)
}

function checkIfAnyGotThrough() {
    for (const zombie of zombies) {
        if (toNum(zombie.element.style.left) < -300 && zombie.element.style.display != "none") {
            console.log(
                "Wróg u bram"
            )
            zombie.element.style.display = "none"
            decreaseHealth()
        }
    }
}

function decreaseHealth() {
    hearts[health-1].src = "images/empty_heart.png"
    health--
    if (health <= 0)
        gameIsOver()
}

function gameIsOver() {
    clearInterval(moveInterval)
    clearInterval(addZombieInterval)
    gameOverSign.style.display = "flex"
    aim.style.display = "none"
    body.style.cursor = "pointer"
}

function ammoWasted() {
    changeScore(-6)
}

function updateAimPosition(event) {
    console.log(
        event.pageX, event.pageY
    )
    aim.style.left = (event.pageX - aimBias) + "px"
    aim.style.top = (event.pageY - aimBias) + "px"
}

let moveInterval = window.setInterval(move, 20);
let addZombieInterval = window.setInterval(add, 1000);

body.addEventListener("mousemove", updateAimPosition, false)
