const letters = "ABCDEFG"
let displayed = [false, false, false, false, false, false, false]


for (let i=0; i<displayed.length; i++) {

    let letter = letters.charAt(i)
    document.getElementById("head" + letter).addEventListener(
        "click", function() {document.getElementById("ans" + letter).style.display = (displayed[i] ? "none" : "block"); displayed[i] = !displayed[i]})
}

let myRequest = new Request("./cities.json", )


// Task a)
fetch(myRequest)
    .then((response) => response.json())
    .then(taskA)

function taskA(json) {
    let answer = ""
    for (const city of json.cities) {
        if (city.province == "małopolskie")
            answer += city.name + '\n'
    }
    document.getElementById("ansA").innerText = answer
}


// Task b)
fetch(myRequest)
    .then((response) => response.json())
    .then(taskB)

function taskB(json) {
    let answer = ""
    let answer3 = ""
    for (const city of json.cities) {
        let numberOfA = charCounter(city.name.toLowerCase(), 'a')
        if (numberOfA == 2)
            answer += city.name + '\n'
        else if (numberOfA > 2)
            answer3 += city.name + '\n'
    }
    document.getElementById("ansB").innerText = 
        "Dokładnie dwie litery 'a':\n\n" + answer 
        + "\n\nTrzy litery 'a' lub więcej:\n\n" + answer3
}


// Task c)
fetch(myRequest)
    .then((response) => response.json())
    .then(taskC)

function taskC(json) {
    let answer = []
    for (const city of json.cities) {
        let density = city.dentensity
        answer.push([city.name, density])
    }

    answer.sort(function(a, b){return b[1] - a[1]})
    let lp = 5
    document.getElementById("ansC").innerText = answer[lp - 1][0] + ': ' + answer[lp - 1][1] + ' os / km^2'
}


// Task d)
fetch(myRequest)
    .then((response) => response.json())
    .then(taskD)

function taskD(json) {
    let answer = ""
    for (const city of json.cities)
        if (city.people > 100*1000)
            answer += city.name + " City\n"

    document.getElementById("ansD").innerText = answer
}


// Task e)
fetch(myRequest)
    .then((response) => response.json())
    .then(taskE)

function taskE(json) {
    const population = 80*1000
    let lessCounter = 0
    let moreCounter = 0
    let eq = 0

    for (const city of json.cities) {
        if (city.people > population)
            moreCounter++
        else if (city.people < population)
            lessCounter++
        else 
            eq++
    }

    document.getElementById("ansE").innerText = 
        (lessCounter == moreCounter ? "Miast powyżej i poniżej " + population + " jest po równo" : 
        "Więcej jest miast " + (lessCounter > moreCounter ? "poniżej " : "powyżej ") + population + " mieszkańców")
        + "\n\nMiast powyżej " + population + " mieszkańców: " + moreCounter 
        + "\nMiast poniżej " + population + " mieszkańców: " + lessCounter
}


// Task f)
fetch(myRequest)
    .then((response) => response.json())
    .then(taskF)

function taskF(json) {
    const population = 80*1000
    let sum = 0
    let counter = 0

    for (const city of json.cities) {
        if (city.township != null && city.township.length > 0 && city.township.charAt(0).toUpperCase() == 'P') {
            sum += city.area
            counter++
        }
    }
    document.getElementById("ansF").innerText = (sum / counter).toFixed(2) + " km^2"
}


// Task g)
fetch(myRequest)
    .then((response) => response.json())
    .then(taskG)

function taskG(json) {
    const population = 5*1000
    let all = true
    let counter = 0

    for (const city of json.cities) {
        if (city.province.toLowerCase() == "pomorskie") {
            console.log(
                city.province, city.name, city.people
            )
            if (city.people > population)
                counter++
            else
                all = false
        }
    }
    document.getElementById("ansG").innerText = 
        (all ? "W" : "Nie w") + "szystkie miasta w województwie pomorskim mają więcej, niż " 
        + population + " mieszkańców.\n\n" 
        + "Takich miast jest: " + counter
}


function charCounter(str, c) {
    let result = 0
    for (const letter of str) {
        if (letter == c)
            result++
    }

    return result
}
