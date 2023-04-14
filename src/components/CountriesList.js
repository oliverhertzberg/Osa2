import { useEffect } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_WEATHER_API_KEY 
console.log(apiKey)

const CountriesList = (props) => {
    console.log("Finland: ", props.countries)
    const weather = props.weather;
    const setWeather = props.setWeather

    useEffect(()=> {
        if (props.countries.length === 1) {
            const capital = props.countries[0].capital;

            axios
                .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`)
                .then(response => {
                    setWeather(response.data);
                })
                .catch(error => {
                    console.error('Error fetching weather', error)
                });
        }
    }, [props.countries])
    return (
    
        props.countries.length === 1 ? 
        (props.countries.map((country) => (
        <div key={country.cca3}>
            <h2 style={{fontSize: 50}}>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <br></br>
            <p style={{fontWeight: 'bold', fontSize: 25}}>languages:</p>
            <ul>
                {Object.entries(country.languages).map(([code, name]) => 
                (
                    <li key={code}>{name}</li>
                ))}
            </ul>
            {console.log()}
            <img src={`https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`} alt={`flag of ${country.name.common}`}></img>
            {weather && (
                <div>
                    <p style={{fontWeight: 'bold'}} >Weather in {country.capital}: </p>
                    <p>Temperature: {Math.round(weather.main.temp - 273.15)} C</p>
                    <p>Humidity: {weather.main.humidity} %</p>
                    <p>Wind speed: {weather.wind.speed} m/s</p>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                </div>
            )}
            </div>))
        ) : props.countries.length <= 10 ? 
            (props.countries.map((country) => (
            <div key={country.cca3}>{country.name.common}<button onClick={()=> props.onShowButtonClick(country.name.common)}>show</button></div>
            )))
        :
            (<div>Too many matches, please specify further</div>)
        
    )
        
}



export default CountriesList