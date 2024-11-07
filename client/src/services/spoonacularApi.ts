import axios from "axios";

const API_KEY = "a1cc7e1daaf7459aa6f9b03a32bd926f";
const BASE_URL = "https://api.spoonacular.com/recipes";

async function searchRecipes({ query = "", cuisine = "", diet = "", intolerances = "", maxReadyTime = 0, offset = 0, number = 10 }) {
    try {
        // Build query parameters object
        const params = {
            apiKey: API_KEY,
            ...(query && { query }),
            ...(cuisine && { cuisine }),
            ...(diet && { diet }),
            ...(intolerances && { intolerances }),
            ...(maxReadyTime && { maxReadyTime: maxReadyTime.toString() }),
            ...(offset && { offset: offset.toString() }),
            ...(number && { number: number.toString() })
        };

        // Pass params in the axios config
        const { data } = await axios.get(`${BASE_URL}/complexSearch`, { params });

        return data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
}


async function getRecipeInformation(id: any) {
    console.log(id)
    if (!id) {
        throw new Error("Recipe ID is required");
    }

    try {
        const { data } = await axios.get(`${BASE_URL}/${id}/information`, {
            params: {
                apiKey: API_KEY
            },
            headers: {
                "Content-Type": "application/json"
            }
        });

        return data;
    } catch (error: any) {
        console.error("Error getting recipe information:", error.message);
        throw error;
    }
}

export { searchRecipes, getRecipeInformation }