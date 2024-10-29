import axios from "axios";


async function generateRecipe(ingredients: any, userPreferences: any) {
    const { data } = await axios.post(`http://localhost:3000/api/generateRecipe`, 
        { ingredients: ingredients,  
        userPreferences: JSON.stringify(userPreferences) 
        },
        {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        
    )


    return (data as any).message
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
    const { data } = await axios.post(`http://localhost:3000/api/getNutritionalAnalysis`, 
        { finalRecipe: finalRecipe },
        {
            headers: {
                "Content-Type":"application/json"
            }
        }

    )

    return (data as any).message

}

export { generateRecipe, enhanceRecipe, getPersonalizedRecommendations, getNutritionalAnalysis }
