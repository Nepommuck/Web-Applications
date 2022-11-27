let id = 100
let elemArr = []
const list = document.getElementById("list")
const addButton = document.getElementById("add")
const newElement = document.getElementById("new-element")


const nameInput = document.getElementById("name")
const phoneInput = document.getElementById("phone-number")



addButton.addEventListener("click", addToList)

// document.getElementById("delete1").addEventListener("click", function() {hide(1)})

function hide(id) {
    const elem = document.getElementById("contact" + id)
    elem.style.display = "none"
}

function resetInput() {
    nameInput.value = ""
    phoneInput.value = ""
}

function addToList() {
    let name = cutMultipleSpaces(nameInput.value)
    let phone = cutSpaces(phoneInput.value)

    console.log(name)

    let ok = true
    let msg = ""

    if( !isValidName(name) ) {
        ok = false
        msg += "Ejjjjj\n"
    }

    if( !isValidPhoneNumber(phone) ) {
        ok = false
        msg += "Numer gościu\n"
    }

    if(ok) {
        const newHTML = 
        '<li id="contact' + id 
        + '" class="contact box"><div class="info"><p class="name">' + name 
        + '</p><p class="phone">' + phoneDisplayFormat(phone) 
        + '</p></div><button class="delete" onclick="hide(' + id + ')'
        + '"><i class="fa-solid fa-trash-can"></i></button></li>'

        list.innerHTML += newHTML


        id++
        // resetInput()  
    }

    else {
        alert(msg)
    }
}

function toAsci(c) {
    return c.charCodeAt(0)
} 

function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase()
}

function isUpper(c) {
    return isLetter(c) && c.toUpperCase() == c
}

function cutSpaces(str) {
    result = ""

    for (const c of str)
        if(c != ' ')
            result += c
    return result
}

function cutMultipleSpaces(str) {
    str = str.trim()
    result = ""
    isSpace = false
    for (const c of str)
        if(!isSpace || c != ' ') {
            result += c
            isSpace = (c == ' ')
        }
    return result
}

function isValidName(str) {
    const min_length = 6
    const max_length = 45

    if(str.length < min_length || str.length > max_length)
        return false
    if( !isUpper( str.charAt(0) ) )
        return false
    for (const c of str)
        if( !(isLetter(c) || c == '-' || c == ' ') )
            return false

    return true
}


function isNumeric(c) {
    return toAsci(c) >= toAsci('0') && toAsci(c) <= toAsci('9')
}

function isValidPhoneNumber(num) {
    const acceptedLengths = [9, 12]

    if(num.length <= 0)
        return false

    if(num.charAt(0) == '+')
        num = num.substring(1)

    if( !acceptedLengths.includes(num.length) )
        return false

    for (const d of num) {
        if( !isNumeric(d) )
            return false
    }
    return true
}

function phoneDisplayFormat(num) {
    let result = ""
    let hasPlus = false
    if(num.charAt(0) == '+') {
        num = num.substring(1)
        hasPlus = true
    }
    let i = 1
    for (const d of num) {
        result += d
        if(i % 3 == 0)
            result += ' '
        i++
    }
    if(hasPlus)
        result = '+' + result
    return result
}

// console.log(
//     elemArr
// )
// elemArr.push(1)
// elemArr.push(2)
// console.log(
//     elemArr
// )