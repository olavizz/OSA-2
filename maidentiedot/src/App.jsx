import { useState, useEffect } from 'react'
import axios from 'axios'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div>
      {message}
    </div>
  )
}

const CountryForm = ({ country }) => {
  console.log(country)
  if (country === null) {
    return null
  }
  return (
    <div>
      <h1>
        {country.name.common}
      </h1>
        <p>capital {country.capital} <br /> area {country.area}</p>
        
        <p><h2>languages:</h2>
          {console.log(country.languages)}
          <ul>
          {Object.keys(country.languages).map(key => (
            <li key={key}>{country.languages[key]}</li>
          ))}
          </ul>
        </p>
        <img src={country.flags.png}/>

    </div>
  )
}



const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [information, setInformation] = useState(null)
  const [Infmessage, setMessage] = useState(null)
  const [onlycountry, setOnlycountry] = useState(null)
  
  useEffect(() => {
    if (information) {  
    console.log()
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
        .then(response => {
          const filteredCountries = response.data.filter(country => {
            return country.name.common.toLowerCase().startsWith(value.toLowerCase());})
          if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
            handleMessage(null)
            setCountries(filteredCountries)
            setOnlycountry(null)
            console.log(filteredCountries)
            console.log(information)
          }
          else if (filteredCountries.length === 1) {
            setOnlycountry(filteredCountries[0])
            setCountries([])
          }
          else {
            handleMessage(true)
            setCountries([])
            console.log(filteredCountries)
          }
        })
    }
    else {handleMessage(null), setCountries([])}
  }, [information])

  const handleShow = (country) => {
    setOnlycountry(country)
  }

  const handleChange = (event) => {
    setValue(event.target.value)
    setInformation(event.target.value)
  }
  
  const handleMessage = (state) => {
    if (state !== null){ setMessage('Too many matches, specify another filter')}
    else {setMessage(null)}
  }

  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange} />
      </form>
      <pre>
      {countries.map(country => (
    <div key={country.name.common}>{country.name.common}
        <button onClick={() => handleShow(country)}> show </button></div>
  ))}
      </pre>
      <Notification message={Infmessage}/>
      <CountryForm country={onlycountry}/>
    </div>
  )
}

export default App