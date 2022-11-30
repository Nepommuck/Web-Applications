let myRequest = new Request("https://restcountries.com/v3.1/all")


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