import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => {
            console.log(response.data);
            setCountry(response.data);

        })
        .catch(error => {
          console.error('Error fetching country:', error);
          setCountry([]); // Si hay un error, establecer country a null
        });
    }, [name]);

    if ( name === '') {
        return null
    }
    
  return country;
}