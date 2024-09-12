import axios from 'axios';

export const generateRecipe = async (prompt: string) => {
  const response = await axios.post('http://localhost:8000/generate-recipe/', { prompt });
  return response.data;
};
