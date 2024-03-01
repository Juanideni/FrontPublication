import axios from "axios";

const API_URL = "https://localhost:44388/api";


const clientAPI = axios.create({
    baseURL: API_URL
})

export default{
    getPublications(){
        return clientAPI.get(`/publication`,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    getPublicationById(id){
        return clientAPI.get(`/publication/`+ id)
    },
    putPublication(id, publication){
        
        let formData = new FormData();

        // Agregar cada archivo al formData
        for (let i = 0; i < publication.images.length; i++) {
            formData.append('images', publication.images[i]);
        }
    
        // Agregar otros campos del publication
        formData.append('typeOperation', publication.typeOperation);
        formData.append('typeProperty', publication.typeProperty);
        formData.append('rooms', publication.rooms);
        formData.append('description', publication.description);
        formData.append('squareMeter', publication.squareMeter);
        formData.append('antiquity', publication.antiquity);
        formData.append('location', publication.location);
    
        return clientAPI.put(`/publication/` + id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(()=>{
        }).catch((error)=> {
            alert("Error! Try Again");
        });
    },
    deletePublication(id){
        return clientAPI.delete(`/publication/`+ id).then(() => {"Deleted successfully!"})
    },
    postPublication(publication){
        
        let formData = new FormData();

        // Agregar cada archivo al formData
        for (let i = 0; i < publication.images.length; i++) {
            formData.append('images', publication.images[i]);
        }
    
        // Agregar otros campos del publication
        formData.append('typeOperation', publication.typeOperation);
        formData.append('typeProperty', publication.typeProperty);
        formData.append('rooms', publication.rooms);
        formData.append('description', publication.description);
        formData.append('squareMeter', publication.squareMeter);
        formData.append('antiquity', publication.antiquity);
        formData.append('location', publication.location);
    
        return clientAPI.post('/publication', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(()=>{
        }).catch((error)=> {
            alert("Error! Try again");
        });
            
    }

}