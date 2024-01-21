
import { useState } from 'react'

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

const ToShowAll = ({value}) => {
  return (
    <div>
    {value.map(person => 
      <div key={person.name}> {person.name} {person.number}</div>
      )}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const[addFilter, setFilter] = useState('')

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
    event.preventDefault()
    const checking = persons.some(person => person.name === newName)
    if (checking) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div><Filter value={addFilter} onChange={handleFilter}/></div>
      
      <h3>add a new</h3>
      <div><PersonForm value={{newName, newNumber}} onChange={{handleNameChange, handleNumberChange}} addPerson={addPerson}/>
      </div>
      
      <h2>Numbers</h2>
      <div><ToShowAll value={personsToShow}/></div>
    </div>
  )

}

export default App
