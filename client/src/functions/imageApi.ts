import axios from "axios"




const imageApi = async (imageQuery: any)  => {
    const { data } = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${imageQuery}&client_id=${import.meta.env.VITE_IMAGE_API || "9vnnxHS4k727N7CUOPJv5jU73ru75Z0koS6ESAutqH8"}`)
    return data
}

export default imageApi;
