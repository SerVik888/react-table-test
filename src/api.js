import axios from 'axios'

export const API = {
  fetchData: async () => {
    const result = await axios.get('http://localhost:8080/api/item')
    return result.data
  },
}
