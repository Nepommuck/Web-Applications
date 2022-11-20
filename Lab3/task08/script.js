const checkButton = document.getElementById("check")
checkButton.addEventListener("click", getinfo)

const showButton = document.getElementById("show")
showButton.addEventListener("click", showPassword)

let passw = document.getElementById("password")
passw.addEventListener("change", checkConditions)

function getinfo() {
    console.log(
        passw.value
    )
}

function showPassword() {
    console.log(
        passw.outerHTML
    )
    let val = passw.value
    console.log(    
        val
    )
    passw.outerHTML = '<input type="text" id="password">'
    console.log(    
        val 
    )
    passw = document.getElementById("password")
    // passw.setAttribute(textValue, val)
    passw.value = val

    showButton.removeEventListener("click", showPassword);
    showButton.addEventListener("click", hidePassword);
}

function hidePassword() {
    console.log(
        passw.outerHTML
    )
    let val = passw.value
    console.log(    
        val
    )
    passw.outerHTML = '<input type="password" id="password">'
    console.log(    
        val 
    )
    passw = document.getElementById("password")
    // passw.setAttribute(textValue, val)
    passw.value = val

    showButton.removeEventListener("click", hidePassword);
    showButton.addEventListener("click", showPassword);
}

function hasSpecial(password) {
    const specials = "!@#$%^&*/?"

    for (const char of password)
        if (specials.includes(char))
            return true
    
    return false
}

function  isUpper(char) {
    return false
}

function hasCapital(password) {
    const specials = "!@#$%^&*/?"

    for (const char of password)
        if ( isUpper(char) )
            return true
    
    return false
}

function  isDigit(char) {
    return false
}

function hasCapital(password) {
    const specials = "!@#$%^&*/?"

    for (const char of password)
        if ( isDigit(char) )
            return true
    
    return false
}

function checkConditions() {
    let val = passw.value

    // Length
    if (val.length >= 8)
        document.getElementById("length").outerHTML = 
            '<div id="length" class="checked box"><i class="fa-solid fa-check"></i></div>'
    else
        document.getElementById("length").outerHTML = 
            '<div id="length" class="unchecked box"><i class="fa-solid fa-xmark"></i></div>'

    // Special character
    if ( hasSpecial(val) )
        document.getElementById("special-char").outerHTML = 
            '<div id="special-char" class="checked box"></div>'
    else
        document.getElementById("special-char").outerHTML = 
            '<div id="special-char" class="unchecked box"></div>'

    // Capital letter
    if ( hasSpecial(val) )
        document.getElementById("special-char").outerHTML = 
            '<div id="special-char" class="checked box"></div>'
    else
        document.getElementById("special-char").outerHTML = 
            '<div id="special-char" class="unchecked box"></div>'
}