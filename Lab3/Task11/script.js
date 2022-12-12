const list = document.getElementById("list")
const paginations = document.getElementsByClassName("pagination")
const myRequest = new Request("https://restcountries.com/v3.1/all")
const countries = []
const displayedCountries = []
const subregions = []
const displayedSubregions = []

const nameButton = document.getElementById("name-button")
const capitalButton = document.getElementById("capital-button")
const populationButton = document.getElementById("population-button")
const areaButton = document.getElementById("area-button")
const subregionsCheckbox = document.getElementById("subregions-checkbox")

const minPopulationInput = document.getElementById("min-population")
const maxPopulationInput = document.getElementById("max-population")

const minAreaInput = document.getElementById("min-area")
const maxAreaInput = document.getElementById("max-area")

let recordsPerPage = 50
let totalPages = 0
let currentPage = 0
let groupBySubregions = false

init()


function init() {
    nameButton.addEventListener("click", function() {sortContent('name')})
    capitalButton.addEventListener("click", function() {sortContent('capital')})
    populationButton.addEventListener("click", function() {sortContent('population')})
    areaButton.addEventListener("click", function() {sortContent('area')})
    subregionsCheckbox.addEventListener("click", flipSubregions)
    subregionsCheckbox.checked = false
    
    for (const element of document.getElementsByClassName("sort-button")) {
        element.addEventListener("click", function(){currentPage=0; generatePagination(); show()})
    }


    for (const element of document.getElementsByClassName("filter-input")) {
        element.addEventListener('change', checkConditions)
        element.addEventListener('change', calcSubregions)
        // Make sure it stays sorted the same way
        element.addEventListener('change', function(){reverse = !reverse; sortContent(prevClicked)})
        element.addEventListener('change', show)

        element.value = NaN
    }

    fetch(myRequest)
        .then((response) => response.json())
        .then(readData)
}

    
function readData(json) {
    const subs = {}
    for (const country of json) {
        let CountryObj = {
            name: country.name.common, capital: (typeof country.capital != 'undefined') ? country.capital[0] : '-', 
            population: Math.max(0, country.population), area: Math.max(0, country.area), flag: country.flag, subregion: country.subregion, visible: true
        }
        countries.push(CountryObj)

        if (Object.hasOwn(subs, country.subregion))
            subs[country.subregion].list.push(CountryObj)
        else
            subs[country.subregion] = {list: [CountryObj]}
    }
    for (const s in subs) {
        subregions.push({name: s, list: subs[s].list, wrapped: true, active: true})
    }

    calcSubregions()
    checkConditions()
    sortContent('population')
    show()
}

function calcSubregions() {
    for (const subregionName in subregions)
        for (const property of ['population', 'area']) {
            let sum = 0

            for (const country of subregions[subregionName].list)
                if (country.visible)
                    sum += country[property]
            subregions[subregionName][property] = sum
        }
}

function addSeparators(num) {
    num = num.toString()
    if (num.includes('.'))
        return num
    res = ""
    for (let i = 0; i < num.length; i++) {
        if (i % 3 == 0 && i > 0)
            res = ',' + res
        res = num[num.length - 1 - i] + res
    }
    return res
}

function show() {
    list.innerHTML = ''
    if (groupBySubregions)
        showBySubregions()
    else
        showPlain()
}

function showPlain() {
    for (let i = currentPage * recordsPerPage; i < Math.min(displayedCountries.length, (currentPage+1) * recordsPerPage); i++) {
        country = displayedCountries[i]
        showSingleCountry(country, i)
    }
}

function showSingleCountry(country, i) {
    let countryRecord = document.createElement("div")
    countryRecord.classList.add("record")

    let lp = document.createElement("p")
    lp.innerText = (i + 1) + '.'
    countryRecord.appendChild(lp)

    for (const property of ['flag', 'name', 'capital', 'population', 'area']) {

        let elem = document.createElement("p")
        elem.innerText = (['population', 'area'].includes(property)) ? addSeparators(country[property]) : country[property]

        countryRecord.appendChild(elem)
    }
    list.appendChild(countryRecord)
}

function showBySubregions() {
    let i = 0
    for (const subregion of subregions) {
        if (subregion.active) {
            let subregionRecord = document.createElement("div")
            subregionRecord.classList.add("record", "subregion-record")

            for (const property of ['e', 'e', 'name', 'e', 'population', 'area']) {
                let elem = document.createElement("p")
                if (property != 'e')
                    elem.innerText = (['population', 'area'].includes(property)) ? addSeparators(Math.floor(subregion[property])) : subregion[property]
                subregionRecord.appendChild(elem)
            }

            subregionRecord.addEventListener("click", function(){subregion.wrapped = !subregion.wrapped; show()})
            list.appendChild(subregionRecord)
            i++

            if (!subregion.wrapped) {
                subregionRecord.classList.add("subregion-record-checked")
                let k = 0
                for (const country of subregion.list)
                    if (country.visible)
                        showSingleCountry(country, k++)
            }
        }
    }
}

let prevClicked = ''
let reverse = false
function sortContent(property) {
    if (prevClicked == property)
        reverse = !reverse
    else
        reverse = false

    if (groupBySubregions)
        sortSubregions(property)
    else
        sortCountries(property)

    prevClicked = property
}

function sortCountries(property) {
    if (['name', 'capital'].includes(property))
        displayedCountries.sort(function(a, b){
            return reverse ? b[property].localeCompare(a[property]) : a[property].localeCompare(b[property])
        })
    else if (['population', 'area'].includes(property))
        displayedCountries.sort(function(a, b){
            return reverse ? a[property] - b[property] : b[property] - a[property]
        })
}

function sortSubregions(property) {
    if (['name', 'capital'].includes(property)) {
        subregions.sort(function(a, b){
            return reverse ? b['name'].localeCompare(a['name']) : a['name'].localeCompare(b['name'])
        })
        for (const subregion of subregions) {
            subregion.list.sort(function(a, b){
                return reverse ? b[property].localeCompare(a[property]) : a[property].localeCompare(b[property])
            })
        }
    }
    else if (['population', 'area'].includes(property)) {
        subregions.sort(function(a, b){
            return reverse ? a[property] - b[property] : b[property] - a[property]
        })
        for (const subregion of subregions) {
            subregion.list.sort(function(a, b){
                return reverse ? a[property] - b[property] : b[property] - a[property]
            })
        }
    }
}


function isBetween(a, b, c) {
    return a <= b && b <= c
}

function checkConditions() {
    checkCountryConditions()
}

function checkCountryConditions() {
    displayedCountries.length = 0

    const minPopulation = minPopulationInput.value * 1000
    const maxPopulation = (maxPopulationInput.value == 0) ? Infinity : maxPopulationInput.value * 1000
    const minArea = minAreaInput.value * 1000
    const maxArea = (maxAreaInput.value == 0) ? Infinity : maxAreaInput.value * 1000

    for (const country of countries) {
        if (isBetween(minPopulation, country.population, maxPopulation) && isBetween(minArea, country.area, maxArea))
            displayedCountries.push(country)
    }

    for (const subregion of subregions) {
        subregion.active = false
        for (const country of subregion.list)
            if (isBetween(minPopulation, country.population, maxPopulation) && isBetween(minArea, country.area, maxArea)) {
                subregion.active = true
                country.visible = true
            }
            else 
                country.visible = false
    }

    pages = Math.ceil(displayedCountries.length / recordsPerPage)

    currentPage = Math.min(currentPage, pages)
    generatePagination()
}

function generatePagination() {
    for (const pagination of paginations) {        
        pagination.innerHTML = ''

        if (!groupBySubregions) {
            for (let i=0; i<pages; i++) {
                let lp = document.createElement("p")
                lp.innerText = (i + 1)

                lp.addEventListener("click", function(){currentPage = i; generatePagination(); show()})
                if (i == currentPage)
                    lp.classList.add("selected")
                pagination.appendChild(lp)
            }        
        }
    }
}

function flipSubregions() {
    if (subregionsCheckbox.checked != groupBySubregions) {
        groupBySubregions = !groupBySubregions
        generatePagination()

        reverse = !reverse
        sortContent(prevClicked)
        show()
    }
}
