const CountriesList = (props) => {
    console.log("Finland: ", props.data)
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