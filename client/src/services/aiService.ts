import axios from "axios";


async function generateRecipe(ingredients: any, userPreferences: any) {
    axios.get("")
    console.log(ingredients, userPreferences)

    return "hello"
}

async function enhanceRecipe(recipeToEnhance: any, userPreferences: any) {
    //both strings
    console.log(recipeToEnhance, userPreferences)
 return ""
}

async function getPersonalizedRecommendations(user_id: any, userPreferences: any) {
    //string, JSON.stringify the string so both string
    console.log(user_id, JSON.stringify(userPreferences))

    return [""]
}

async function getNutritionalAnalysis(finalRecipe: any) {
    //string
    const val = finalRecipe

    return val;

}

export { generateRecipe, enhanceRecipe, getPersonalizedRecommendations, getNutritionalAnalysis }
