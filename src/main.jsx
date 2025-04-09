import React from "react"
import {getRecipeFromChefClaude} from "./api.js"
import ClaudeRecipe from "./claudereceipe.jsx"
export function Main(){
    const [ingredients,setIngredients] = React.useState([])
    const ing = ingredients.map((ingredient)=>{
        return <li key={ingredient}>{ingredient}</li>
    })
    const [recipe, setRecipe] = React.useState("")
    const [load,setload] = React.useState(false)

    async function getRecipe() {
        setload(true)
        const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
        setRecipe(recipeMarkdown)
        setload(false)
    }
    function resetForm() {
        setIngredients([]);
        setRecipe("");
        setload(false);
    }
    function Onsubmit(formdata){
        const newIngredient = formdata.get("ingredient")
        if (!newIngredient || newIngredient==" ")return 
        setIngredients((previngredients)=>[...previngredients,newIngredient[0].toUpperCase()+newIngredient.slice(1)])
    }
    return(
        <main className="main">
            <form action={Onsubmit} className="add-ingredient-form">
                <input 
                type="text"
                placeholder="e.g. Onions"
                className="input" aria-label="Add ingredient"
                name="ingredient"
                />
                <button  className="ingbuttons">+ Add Ingredients</button>
            </form>
            {ingredients.length >0?<section>
            <p className="tag">Your Ingredients to prepare receipe:</p>
            <ul className="ingitems">
                {ing}
            </ul>
            {ingredients.length>3?<div className="get-recipe-container">
                <div>
                    <h3>Ready for a receipe ?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={getRecipe}>Get a recipe</button>
            </div>:null}
            </section>:null}

            <section className="suggested-recipe-container ">
                {
                    recipe ? <ClaudeRecipe recipe = {recipe}/>: load && !recipe? <section className="loader"></section> : ""
                }
            </section>
            
            {(ingredients.length > 0 || recipe || load) && (
                <div className="reset-container">
                    <button onClick={resetForm} className="reset-button">Reset</button>
                </div>
            )}
            
        </main>
    )
}