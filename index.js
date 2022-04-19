//URLs
const vegetarianURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=vegetarian'
const veganURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=vegan'


//Fetch
fetch(vegetarianURL)
.then(resp => resp.json())
.then(recipes => (recipes.meals).forEach(recipe => unnamedFunction(recipe)
))

fetch(veganURL)
.then(resp => resp.json())
.then(recipes => (recipes.meals).forEach(recipe => otherFunction(recipe)
))


//DOM Selecters
let dropdownMenu = document.querySelector('#form')


//Event Listeners
dropdownMenu.addEventListener('change', filterData)


//Functions
function unnamedFunction(object) {
    console.log(object)
}

function otherFunction(object) {
    console.log(object)
}


//Event Listener Callback Functions
function filterData(e) {
    console.log(e.target)
}