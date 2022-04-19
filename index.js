//URLs
const vegetarianURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=vegetarian'
const veganURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=vegan'


//Fetch
fetch(vegetarianURL)
    .then(resp => resp.json())
    .then(recipes => (recipes.meals).forEach(recipe => featuredRecipe(recipe)))

fetch(veganURL)
    .then(resp => resp.json())
    .then(recipes => recipes.meals)

 //   .forEach(recipe => otherFunction(recipe))


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
function vegetarianRender(recipe) {
    let recipeId = recipe.idMeal
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + `${recipeId}`)
    .then(resp => resp.json())
    .then(console.log)
    // let mealObj = {
    //     idMeal: data.meals[0].idMeal,
    //     recipeTitle: data.meals[0].strMeal,
    //     recipeInstructions: data.meals[0].strInstructions,
    //     recipeImage: data.meals[0].strMealThumb,
    //     recipeVideo: data.meals[0].strYoutube,
    //     recipeRegion: data.meals[0].strArea,
    //     recipeCategory: data.meals[0].strCategory
    // }
}
    // featuredRecipe(recipe)


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
        renderBody(instructions)
    })  
}

function renderBody(instructions) {
    recipeBody.textContent = "Instructions: " + `${instructions}`
}


//Event Listener Callback Functions
function filterData(e) {
    console.log(e.target.value)
    fetch(vegetarian)
}

const userInput = document.getElementById("new-task-description")
console.log(userInput)

userInput.addEventListener('input', searchBar)