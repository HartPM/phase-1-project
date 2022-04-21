//URLs
const vegetarianURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=vegetarian'
const veganURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=vegan'
const mealNameURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='


//DOM Selecters
let dropdownMenu = document.querySelector('#form')
let recipesUl = document.querySelector('#recipes')
let featureName = document.querySelector('#feature-name')
let recipeImage = document.querySelector('#recipe-image')
let recipeName = document.querySelector('#recipe-title')
let recipeBody = document.querySelector('#recipe-body')
let randomBtn = document.querySelector('#random-button')
let searchBar = document.querySelector('#search-bar')
let favoriteBtn = document.querySelector('.favorite-button')
let myFavorites = document.querySelector('.hidden')
let myFavoriteImageContainer = document.querySelector('#favorite-image-container')
let addRecipeForm = document.querySelector('#add-recipe-form')


//Global Variables
let mealIds = [];
let mealNames = [];


//Functions

// Recycled Functions
function featuredRecipe(recipe) { 
    recipeImage.src = recipe.meals[0].strMealThumb
    recipeName.textContent = recipe.meals[0].strMeal
    recipeBody.textContent = "Instructions: " + recipe.meals[0].strInstructions
}

function randomImage() {
    fetch(vegetarianURL)
        .then(resp => resp.json())
        .then(recipes => {getOneMeal(recipes)
        })
    fetch(veganURL)
        .then(resp => resp.json())
        .then(recipes => {getOneMeal(recipes)
        })
}

randomImage();


//Generates Random Images
function getOneMeal(recipes) {
    recipes.meals.forEach(element => {
        mealIds.push(element.idMeal)
        mealNames.push(element.strMeal)
    })
    const randomRecipeId = mealIds[Math.floor(Math.random() * mealIds.length)];
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + `${randomRecipeId}`)
        .then(resp => resp.json())
        .then(recipe => featuredRecipe(recipe))
}



// Search Bar
searchBar.addEventListener('submit', renderUserInput)

function renderUserInput(e) {
    e.preventDefault();
    let input = e.target['new-task-description'].value
    for (recipe of mealNames){
        recipe.replace(" ", "+")
        if (recipe.toLowerCase() === input.toLowerCase()) {
            fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + `${recipe}`)
                .then(resp => resp.json())
                .then(mealObj => featuredRecipe(mealObj))
        } else {
            // alert('That Recipe Does Not Match')
        }
    }
    searchBar.reset()
}


// Show Me Something New Button

// Dropdown Filter
function filterData(e) {
    let value = e.target.value
    while (recipesUl.firstChild) {
        recipesUl.removeChild(recipesUl.firstChild);
    }
    if (value === "vegetarian") {
        fetch(vegetarianURL)
            .then(resp => resp.json())
            .then(recipes => (recipes.meals).forEach(recipe => {
            appendRecipe(recipe)
            }
        ))
    } else if (value === "vegan") {
        fetch(veganURL)
        .then(resp => resp.json())
        .then(recipes => (recipes.meals).forEach(recipe => {
            appendRecipe(recipe)
        }))
    } else if (value === "american") {
        let americanArray = [52816, 52817, 52870, 52794]
        pullRecipes(americanArray)
    } else if (value === "east-asian") {
        let eastasianArray = [52955, 52871]
        pullRecipes(eastasianArray)
    } else if (value === "european") {
        let europeanArray = [52906, 52864, 52921, 52908, 52784, 52911, 52863, 52867, 52775]
        pullRecipes(europeanArray)
    } else if (value === "indian") {
        let indianArray = [52807, 52785, 52868, 52865]
        pullRecipes(indianArray)
    } else if (value === "mediterranean") {
        let mediterraneanArray = [53012, 52811, 52872, 52771, 52849, 52866, 52942]
        pullRecipes(mediterraneanArray)
    } else if (value === "north-african") {
        let northafricanArray = [53025, 52971, 53027, 52973, 53047, 52963, 52797, 52869, 53026]
        pullRecipes(northafricanArray)
    }
}

function pullRecipes(arr) {
    arr.forEach(recipe => {
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + `${recipe}`)
        .then(resp => resp.json())
        .then(recipe => appendRecipe(recipe.meals[0]))
        })
}

function appendRecipe(recipe){
    let newLi = document.createElement('li')
    newLi.textContent = recipe.strMeal
    recipesUl.appendChild(newLi)
    newLi.addEventListener('click', clickRender)
}

function clickRender(e) {
    let userPointer = e.target.textContent
    userPointer.replace(" ", "+")
    e.target.style.color = 'black'
    if (e.target.style.color === 'black') {
        e.target.style.color = 'green'
    }    
    if (e.target.style.color === 'green') {
        setTimeout(function() {
            e.target.style.color = "black";
          }, 800);
    }
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + `${userPointer}`)
        .then(resp => resp.json())
        .then(recipeObj => featuredRecipe(recipeObj))
}
// Favorite Button
function appendFavorites(e) {
    myFavorites.style.visibility = 'visible'
    let newImage = document.createElement('img')
    newImage.addEventListener('click', displayFavorite)
    newImage.src = recipeImage.src
    newImage.title = recipeName.textContent
    newImage.recipe = recipeBody.textContent
    newImage.setAttribute('class', 'picture')
    myFavoriteImageContainer.append(newImage)
}


function displayFavorite(e) {
    recipeImage.src = e.target.src
    recipeName.textContent = e.target.title
    recipeBody.textContent = e.target.recipe

}

//Add Recipe POST Request
function newRecipe(obj) {
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then(resp => resp.json())
        .then(recipe => featuredRecipe(recipe))
}

function createRecipe(e) {
    e.preventDefault()
    let newRecipeObj = {
        meals: [{
            strMeal: e.target['recipe-name'].value,
            strInstructions: e.target['recipe-instructions'].value,
            strMealThumb: e.target['new-recipe-image'].value
        
        }]
    }

    newRecipe(newRecipeObj)
}

function newRecipe(recipe) { 
    recipeImage.src = recipe.meals[0].strMealThumb
    recipeName.textContent = recipe.meals[0].strMeal
    recipeBody.textContent = "Instructions: " + recipe.meals[0].strInstructions
}


//Event Listeners
randomBtn.addEventListener('click', randomImage)
dropdownMenu.addEventListener('change', filterData)
favoriteBtn.addEventListener('click', appendFavorites)
addRecipeForm.addEventListener('submit', createRecipe)
