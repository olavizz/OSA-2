import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  console.log(id)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const poisto = (person) => {
    console.log(person.id)
    const request = axios.delete(`${baseUrl}/${person.id}`)
    return request.then(response => response.data)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  poisto: poisto
}