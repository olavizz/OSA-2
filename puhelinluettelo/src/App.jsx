import axios from 'axios'
import { useState, useEffect } from 'react'
import noteService from './services/notes'

const Filter = ({value, onChange}) => {
  return (
  <div>filter shown with <input value={value} onChange={onChange}/></div>
  )
}

const PersonForm = ({value, onChange, addPerson}) => {
  return (
    <form onSubmit={addPerson}>
        <div>name: <input value={value.newName} onChange={onChange.handleNameChange}/></div>
        <div>number: <input value={value.newNumber} onChange={onChange.handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
        <div>
        </div>
    </form>
  )
}

const ToShowAll = ({value, onClick}) => {
  return (
    <div>
    {value.map(person => 
      <div key={person.name}> {person.name} {person.number} 
      <button onClick={() => onClick(person)}>Delete</button> </div>
      )}  
  </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message.startsWith("Information")) {
    return (
      <div className="error123">
        {message}
      </div>
    )
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const[addFilter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect (() => {
    console.log('effect')
    noteService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleRemove = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
    noteService
      .poisto(person)
      .then(response => {
        console.log(response.data)
        console.log('gg')
        setPersons(persons.filter(abc => abc.id !== person.id))
        setErrorMessage(
          `Deleted ${person.name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      )
    }
  }
            
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons
    ? persons.filter(person => person.name.toLowerCase().includes(addFilter.toLowerCase()))
    : persons



  const addPerson = (event) => {
    const personObject = {
      name: newName,
      number: newNumber
    }
    event.preventDefault()
    const checking = persons.some(person => person.name === newName)
    if (checking) {
      const currentPerson = persons.find(person => person.name === newName)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        noteService
          .update(currentPerson.id , personObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== currentPerson.id ? person : response))
            console.log(persons.data)
            setErrorMessage(
              `Updated ${personObject.name}`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${currentPerson.name} has already been removed from the server`
            )
            setTimeout(() =>{
              setErrorMessage(null)
            }, 5000)
          })
            }
      } else {
    
    noteService
      .create(personObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(response.data))
        setErrorMessage(
          `Added ${personObject.name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
        })
      }}
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <div><Filter value={addFilter} onChange={handleFilter}/></div>
      
      <h3>add a new</h3>
      <div><PersonForm value={{newName, newNumber}} onChange={{handleNameChange, handleNumberChange}} addPerson={addPerson}/>
      </div>
      
      <h2>Numbers</h2>
      <div><ToShowAll value={personsToShow} onClick={handleRemove}/></div>
    </div>
  )
  }


export default App