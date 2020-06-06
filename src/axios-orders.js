import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://myburger-193b9.firebaseio.com/'
})

export default instance;