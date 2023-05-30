import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://citation-web-server.herokuapp.com'
})

export default instance