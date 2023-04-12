import './App.css';
import {useState, useEffect } from 'react';
import axios from 'axios';
import CountriesList from "./components/CountriesList"


const client = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
});

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    console.log('effect run, country is now', query)

    if(query) {
      console.log('fetching countries...')
      client
        .get(`/all`)
        .then(response => {
          console.log(response.data);
          const filteredData = response.data.filter(country => {
            return country.name.common.toLowerCase().includes(query.toLowerCase());
          });
          
          setCountries(filteredData);
        })
        .catch(error => {
          console.error('Error fetching countries: ', error);
        });
    } else {
      setCountries([]);
    }
  }, [query])

  const handleShowButtonClick = (country) => {
    setQuery(country)
  }
   

  return (
    <div>
      <form> Find countries: <input type="search" value={query} onChange={e => setQuery(e.target.value)} />
      </form>
      <pre>
        <CountriesList data={countries} onShowButtonClick={handleShowButtonClick} countries={countries} />
      </pre>
    </div>
  )
}


export default App;
