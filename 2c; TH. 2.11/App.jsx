import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {

  const [persons, setNotes] = useState()

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', persons, 'notes')

}

export default App