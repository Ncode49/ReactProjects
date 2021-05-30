import React, { useState} from 'react';

const scaleNames = {  
    c: 'Celsius',  
    f: 'Fahrenheit'}


// converti fahrenheit en celsuis
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
      
// converti celsuis en fahrenheit
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}
// essaye de convertir le résultat (et tester si pas un chiffre numérique)
function tryConvert(temperature, convert) {
    // converti chaine en nombre
    const input = parseFloat(temperature);
    // si pas un nombre, retourne vide
    if (Number.isNaN(input)) {
      return '';
    }
    // sinon applique la fonction de conversion et l'arrondi
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }

// destructuration {propriete}
function BoilingVerdict({celsuis}) {
        if(celsuis>= 100){
            return <p>L'eau bout.{celsuis}</p>;  
        }
        return <p>L'eau ne bout pas {celsuis}</p>
}

export function Calculator(){
    // stocke etat courant (f ou c ainsi que la valeur)
    const [state,setState] = useState({scale: 'c', temperature: '' })

    function handleCelsuisChange(e){
        setState({scale: 'c',temperature: e.target.value})
    }
    // valeur en fahrenneit récupéré
    function handleFahrenheitChange(e){
        setState({scale: 'f',temperature: e.target.value})
    }

    const scale = state.scale;    
    const temperature = state.temperature;    
    // si etat courant est fahrenheit alors f ne change pas mais celsuis si
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;    
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    // scale => donne unité a afficher (Celsuis ou Fahrenheit)
    // temperature => valeur de la température a afficher soit en Farheneit soit dans l'autre unité calculé grace au const
    // handleCelsuisChange => fonction de mise a jour de la température
    return <div>
        <BoilingVerdict celsuis= {parseFloat(temperature)} />
        <TemperatureInput temperature={celsius}
                        scale='c' 
                        onTemperatureChange={handleCelsuisChange}/>
        <TemperatureInput temperature={fahrenheit}
                        scale='f' 
                         onTemperatureChange={handleFahrenheitChange}/>
    </div>
}

function TemperatureInput({temperature,scale, onTemperatureChange}){
    
    return <div>
        <p>Saisissez la valeur en {scaleNames[scale]}</p>
        <input value={temperature} onChange={onTemperatureChange}></input>
    </div>
    
}

