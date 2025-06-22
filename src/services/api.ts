import axios from  '../lib/axios'


const api = axios.create({
  baseURL: 'https://task-tracker-r2em.onrender.com/api',
  withCredentials: true,
})

export default api
