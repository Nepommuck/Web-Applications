const showButton = document.getElementById("show")
showButton.addEventListener("click", showPassw)

const showRepeatButton = document.getElementById("show-repeat")
showRepeatButton.addEventListener("click", showRepeat)

let passw = document.getElementById("password")
let repeatPassw = document.getElementById("repeat-passw")

updateInputHandlers()


function updateInputHandlers() {
    passw = document.getElementById("password")
    repeatPassw = document.getElementById("repeat-passw")

    passw.addEventListener("input", checkConditions)
    passw.addEventListener("input", compare)
    repeatPassw.addEventListener("input", compare)
}

function showPassw() {
    showText("password", showButton, showPassw, hidePassw)
}
function hidePassw() {
    hideText("password", showButton, showPassw, hidePassw)
}

function showRepeat() {
    showText("repeat-passw", showRepeatButton, showRepeat, hideRepeat)
}
function hideRepeat() {
    hideText("repeat-passw", showRepeatButton, showRepeat, hideRepeat)
}

function showText(id, button, showFun, hideFun) {
    // Hide the other field
    hidePassw()
    hideRepeat()

    button.innerHTML = '<i class="fa-regular fa-eye-slash"></i>'

    let elem = document.getElementById(id)
    let val = elem.value
    elem.outerHTML = '<input type="text" id="' + id + '">'

    elem = document.getElementById(id)
    // passw.setAttribute(textValue, val)
    elem.value = val

    button.removeEventListener("click", showFun);
    button.addEventListener("click", hideFun);

    updateInputHandlers()
}

function hideText(id, button, showFun, hideFun) {    
    button.innerHTML = '<i class="fa-regular fa-eye"></i>'

    let elem = document.getElementById(id)
    let val = elem.value
    elem.outerHTML = '<input type="password" id="' + id + '">'

    elem = document.getElementById(id)
    // passw.setAttribute(textValue, val)
    elem.value = val

    button.removeEventListener("click", hideFun);
    button.addEventListener("click", showFun);

    updateInputHandlers()
}

function compare() {
    let info = document.getElementById("compare")
    if (passw.value == repeatPassw.value || repeatPassw.value == '')
        info.style.visibility = "hidden"
    else
        info.style.visibility = "visible"
}

function hasSpecial(password) {
    const specials = "!@#$%^&*/?"

    for (const char of password)
        if (specials.includes(char))
            return true
    
    return false
}

function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase()
}

function isUpper(c) {
    return isLetter(c) && c.toUpperCase() == c
}

function hasCapital(password) {
    const specials = "!@#$%^&*/?"

    for (const char of password)
        if ( isUpper(char) )
            return true
    
    return false
}

function toAsci(c) {
    return c.charCodeAt(0)
} 
function isNumeric(c) {
    return toAsci(c) >= toAsci('0') && toAsci(c) <= toAsci('9')
}

function hasDigit(str) {
    for (const char of str)
    if ( isNumeric(char) )
        return true
    return false
}

function getInputOuterHTML(id, isChecked) {
    return '<div id="' + id + '" class="'
    + (isChecked ? 'checked box"><i class="fa-solid fa-check' 
    : 'unchecked box"><i class="fa-solid fa-xmark') 
    + '"></i></div>'
}

function checkConditions() {
    passw = document.getElementById("password")
    let val = passw.value

    // Length
    if (val.length >= 8)
        document.getElementById("length").outerHTML = getInputOuterHTML("length", true)
    else
        document.getElementById("length").outerHTML = getInputOuterHTML("length", false)

    // Special character
    if ( hasSpecial(val) )
        document.getElementById("special-char").outerHTML = getInputOuterHTML("special-char", true)
    else
        document.getElementById("special-char").outerHTML = getInputOuterHTML("special-char", false)

    // Capital letter
    if ( hasCapital(val) )
        document.getElementById("has-capital").outerHTML = getInputOuterHTML("has-capital", true)
    else
        document.getElementById("has-capital").outerHTML = getInputOuterHTML("has-capital", false)

    // A digit
    if ( hasDigit(val) )
        document.getElementById("has-digit").outerHTML = getInputOuterHTML("has-digit", true)
    else
        document.getElementById("has-digit").outerHTML = getInputOuterHTML("has-digit", false)
}