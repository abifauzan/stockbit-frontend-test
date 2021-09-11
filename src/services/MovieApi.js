import axios from "axios"

export const fetchMoviesByName = async ({name, nextPage = 1}) => {
    const url = `https://www.omdbapi.com/?apikey=faf7e5bb&s=${name}&page=${nextPage}`
    const response = await axios.get(url)

    return response.data
}

export const fetchMovieDetail = async (title) => {
    const baseUrl = 'https://www.omdbapi.com/?apikey=faf7e5bb&t='
    const response = await axios.get(`${baseUrl}${title}`)

    return response.data
}