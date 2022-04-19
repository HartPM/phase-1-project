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
let recipesUl = document.querySelector('#recipes')
let featureName = document.querySelector('#feature-name')
let recipeImage = document.querySelector('#recipe-image')
let recipeName = document.querySelector('#recipe-title')
let recipeBody = document.querySelector('#recipe-body')


//Event Listeners
dropdownMenu.addEventListener('change', filterData)


//Functions
function unnamedFunction(recipe) {
    featuredRecipe(recipe)
}

function otherFunction(recipe) {
    //console.log(recipe)
}

function addRecipe(recipe) {
    let newLi = document.createElement('li')
    newLi.textContent = 
    recipesUl.appendChild(newLi)
    newLi.addEventListener('click', displayRecipe)
}

function featuredRecipe(recipe) {
    recipeImage.src = recipe.strMealThumb
    featureName.textContent = recipe.strMeal
    recipeName.textContent = recipe.strMeal
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + `${recipe.idMeal}`)
    .then(resp => resp.json())
    .then(data => {let instructions = data.meals[0].strInstructions
        console.log(instructions)
    })

    
}

function renderBody(instructions) {

}



//Event Listener Callback Functions
function filterData(e) {
    //console.log(e.target)
}