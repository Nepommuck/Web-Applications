function clicked() {
    console.log("Kliknięto")
    let name = window.prompt("Podaj swoje imię: ")

    let holder = document.getElementById("name-holder");
    holder.innerText = "Witaj, " + name + "!";
}