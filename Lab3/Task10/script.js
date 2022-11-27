const rect = document.getElementById("rect")
rect.addEventListener("click", f)

const totalTime = 500

const ball = document.getElementById("ball")

ball.style.left = "300px"
ball.style.top = "300px"

const offset = 65;
const msg = document.getElementById("msg")
const main = document.getElementById("main")
main.addEventListener("click", mainClicked)
const msgOffset = [45, 45]

function toAsci(c) {
    return c.charCodeAt(0)
} 
function isNumeric(c) {
    return toAsci(c) >= toAsci('0') && toAsci(c) <= toAsci('9')
}

function toInt(str) {
    console.log(str)
    digits = []
    for (const c of str) {
        if (isNumeric(c) || c == '.')
            digits += c
    }
    console.log(digits)
    return Number(digits)
}

function f(event) {
    msg.style.visibility = "hidden"
    event.stopPropagation()
    rect.removeEventListener("click", f)
    console.log(event)

    let startTime = Date.now()

    console.log(
        ball.style.left
    )

    // if (ball.style.left == "") {
    //     ball.style.left = start_x
    //     ball.style.top = start_y
    // }
    let startPos = [
        toInt(ball.style.left),
        toInt(ball.style.top)
    ]

    let finishPos = [event.clientX - offset, event.clientY - offset]

    let timer = setInterval(function() {
        // how much time passed from the start?
        let timePassed = Date.now() - startTime

        if (timePassed > totalTime) {
            rect.addEventListener("click", f)
            clearInterval(timer)
            return
        }

        // draw the animation at the moment timePassed
        draw(timePassed);

    }, 10);

    function draw(timePassed) {

        ball.style.left = startPos[0] + timePassed / totalTime * (finishPos[0] - startPos[0]) + 'px'
        ball.style.top = startPos[1] + timePassed / totalTime * (finishPos[1] - startPos[1]) + 'px'

    }
}

function mainClicked(event) {
    msg.style.visibility = "visible"
    msg.style.left = (event.clientX - msgOffset[0]) + "px"
    msg.style.top = (event.clientY - msgOffset[1]) + "px"
}
