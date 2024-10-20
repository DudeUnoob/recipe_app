import axios from "axios"




const imageApi = async (imageQuery: any)  => {
    const { data } = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${imageQuery}&client_id=${import.meta.env.VITE_IMAGE_API}`)
    return data
}

export default imageApi;
