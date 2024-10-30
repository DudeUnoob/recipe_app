import axios from "axios";


async function generateRecipe(ingredients: any, userPreferences: any) {
    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/generateRecipe`, 
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

    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/enhanceRecipe`, 
        {
            recipeToEnhance: recipeToEnhance,
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

async function getPersonalizedRecommendations(user_id: any, userPreferences: any) {
    //string, JSON.stringify the string so both string
    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/getPersonalizedRecommendations`, 
        { user_id: JSON.stringify(user_id), userPreferences: JSON.stringify(userPreferences) },
        {
            headers:{
                "Content-Type":"application/json"
            }
        }
    )

    return (data as any).message
}

async function getNutritionalAnalysis(finalRecipe: any) {
    //string
    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/getNutritionalAnalysis`, 
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
