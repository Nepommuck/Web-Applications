let freeToMove = true
let currentIndex = 0
let newIndex = -1

let pos1 = 0
let pos2 = 250

const boxWidth = 500
const margin = 50

const swapTime = 60

const red = document.getElementById("red")
const blue = document.getElementById("blue")
red.style.left = 0 + "px"
blue.style.left = -2 * boxWidth + "px"


const rightButton = document.getElementById("right")
rightButton.addEventListener("click", function(){ change(true) })
const leftButton = document.getElementById("left")
leftButton.addEventListener("click", function(){ change(false) })
const randomButton = document.getElementById("random")
randomButton.addEventListener("click", changeToRandom)


// JSON
const employees = []

let myRequest = new Request("./employees.json", )

fetch(myRequest)
    .then((response) => response.json())
    .then(readData)

function readData(json) {
    for (const employee of json.employees) {
        employees.push(employee)
    }
    loadData(0)
}

function loadData(id) {
    document.getElementById("employee-name").innerText = employees[id].name
    document.getElementById("employee-position").innerText = employees[id].position
    document.getElementById("employee-description").innerText = employees[id].motto
    document.getElementById("employee-avatar").src=employees[id].avatar
}

function loadMockData(id) {
    document.getElementById("mock-employee-name").innerText = employees[id].name
    document.getElementById("mock-employee-position").innerText = employees[id].position
    document.getElementById("mock-employee-description").innerText = employees[id].motto
    document.getElementById("mock-employee-avatar").src=employees[id].avatar
}

function change(moveLeft) {
    if (freeToMove) {
        freeToMove = false
        let di = (moveLeft) ? 1 : -1

        newIndex = (employees.length + currentIndex + di) % employees.length
        loadMockData(newIndex)
        pos2 = di * (boxWidth + margin)

        move( -pos2 )
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function changeToRandom() {
    if (freeToMove) {
        freeToMove = false

        newIndex = currentIndex
        while (newIndex == currentIndex)
            newIndex = getRandomInt(0, employees.length - 1)

        loadMockData(newIndex)
        pos2 =  boxWidth + margin
        move( -(boxWidth + margin) )
    }
}

function move(pixRight) {
    let dx = pixRight / swapTime
    let i = 0

    let movement = setInterval(function() {
        pos1 += dx
        pos2 += dx
        red.style.left = pos1 + "px"
        blue.style.left = pos2 + "px"

        i++    
        if (i > swapTime) {
            movementFinished()
            clearInterval(movement)
        }  
    }, 10);
}

function movementFinished() {
    freeToMove = true
    currentIndex = newIndex
    loadData(currentIndex)
    red.style.left = 0 + "px"
    pos1 = 0
    blue.style.left = -1000 + "px"
}
