// //URLs
// const vegetarianURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=vegetarian'
// const veganURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=vegan'


// //Fetch
// fetch(vegetarianURL)
//     .then(resp => resp.json())
//     .then(recipes => (recipes.meals).forEach(recipe => featuredRecipe(recipe)))

// fetch(veganURL)
//     .then(resp => resp.json())
//     .then(recipes => recipes.meals)

//  //   .forEach(recipe => otherFunction(recipe))


// //DOM Selecters
// let dropdownMenu = document.querySelector('#form')
// let recipesUl = document.querySelector('#recipes')
// let featureName = document.querySelector('#feature-name')
// let recipeImage = document.querySelector('#recipe-image')
// let recipeName = document.querySelector('#recipe-title')
// let recipeBody = document.querySelector('#recipe-body')


// //Event Listeners
// dropdownMenu.addEventListener('change', filterData)


// //Functions
// function vegetarianRender(recipe) {
//     let recipeId = recipe.idMeal
//     fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + `${recipeId}`)
//     .then(resp => resp.json())
//     .then(console.log)
// }
//     // featuredRecipe(recipe)


// // function veganRender(recipe) {
// //     //console.log(recipe)
// // }

// // function addRecipe(recipe) {
// //     let newLi = document.createElement('li')
// //     newLi.textContent = 
// //     recipesUl.appendChild(newLi)
// //     newLi.addEventListener('click', displayRecipe)
// // }

// function featuredRecipe(recipe) {
//     recipeImage.src = recipe.strMealThumb
//     featureName.textContent = recipe.strMeal
//     recipeName.textContent = recipe.strMeal
//     fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + `${recipe.idMeal}`)
//     .then(resp => resp.json())
//     .then(data => {let instructions = data.meals[0].strInstructions
//         renderBody(instructions)
//     })  
// }

// function renderBody(instructions) {
//     recipeBody.textContent = "Instructions: " + `${instructions}`
// }


// //Event Listener Callback Functions
// function filterData(e) {
//     console.log(e.target.value)
//     // if (e.target.value.textContent == vegetarian) {
//     //     console.log('I am vegetarian')
//     // } else if (e.target.value.textContent == vegan) {
//     //     console.log('I am vegan')
//     // } else {
//     //     console.log('error')
//     // }
    
//     let li = document.createElement('li')
//     li.textContent = 'dog'
//     fetch(vegetarianURL)

// }

// const userInput = document.getElementById("new-task-description")
// console.log(userInput)

// userInput.addEventListener('input', searchBar)

//URLs
const vegetarianURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=vegetarian'
const veganURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=vegan'


//DOM Selecters
let dropdownMenu = document.querySelector('#form')
let recipesUl = document.querySelector('#recipes')
let featureName = document.querySelector('#feature-name')
let recipeImage = document.querySelector('#recipe-image')
let recipeName = document.querySelector('#recipe-title')
let recipeBody = document.querySelector('#recipe-body')
let randomBtn = document.querySelector('#random-button')


//Functions
function randomImage() {
    fetch(vegetarianURL)
    .then(resp => resp.json())
    .then(recipes => {getOneMeal(recipes)
    })  
}
let mealIds = [];
function getOneMeal(recipes) {
    recipes.meals.forEach(element => {
        mealIds.push(element.idMeal)
    })
    const randomRecipeId = mealIds[Math.floor(Math.random() * mealIds.length)];
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + `${randomRecipeId}`)
    .then(resp => resp.json())
    .then(recipe => featuredRecipe(recipe))
}

function featuredRecipe(recipe) { 
    recipeImage.src = recipe.meals[0].strMealThumb
    featureName.textContent = recipe.meals[0].strMeal
    recipeName.textContent = recipe.meals[0].strMeal
    recipeBody.textContent = "Instructions: " + recipe.meals[0].strInstructions
}

// function randomRender(e, recipes) {
//     console.log('one meal: ' + recipes)
//     let mealId = [];
//     //Get One Random ID From mealId Array
//     fetch(vegetarianURL)
//     .then(resp => resp.json())
//     .then(recipes => recipes)
// }






randomImage();
// .forEach(recipe => featuredRecipe(recipe))


//Event Listeners
randomBtn.addEventListener('click', randomImage)