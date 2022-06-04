//269dfb18b25bf1991a4b5a6f17ab8e0d4bdd8cd7
import axios from "axios";

export const key="269dfb18b25bf1991a4b5a6f17ab8e0d4bdd8cd7" 

const api = axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4',
    headers: {
        'Authorization': `Bearer ${key}`,
    }
})

export default api;