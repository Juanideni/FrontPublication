import axios from "axios";


const API_URL = "https://localhost:44388/api";

const clientAPI = axios.create({
    baseURL: API_URL
})

export default{
    getImagesByPublication(idPublication){
        return clientAPI.get(`/imagePublication/by-publicationId/` + idPublication)
    },
    putImages(publicationId, imagePublication){
        return clientAPI.put(`/imagePublication/`+ publicationId, imagePublication)
    },
    deleteImagePublication(id){
        return clientAPI.delete(`/imagePublication/`+ id)
    },
    postImagePublication(imagePublication){
        return clientAPI.post(`/imagePublication/`, imagePublication)
    }

}