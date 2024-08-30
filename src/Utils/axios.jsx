import axios from "axios"

const instance = axios.create({
    baseURL:"https://fakestoreapi.com/"
})

export default instance;

// axios is used for api calls and we create seperate file so that we dont have to import axios on every component