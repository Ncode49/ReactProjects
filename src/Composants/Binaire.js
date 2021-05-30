import React, { useState} from 'react';

const scaleNames = {  
    d: 'Décimal',  
    b: 'Binaire',
    h: 'Hexadécimal'    
}

// entree est un nom
function DecToBin(dec){
    const decimal = parseFloat(dec)
    if(!Number.isInteger(decimal)){
        return ''
    }
    return decimal.toString(2)

}

function DecToHex(dec){
    const decimal = parseFloat(dec)
    if(!Number.isInteger(decimal)){
        return ''
    }
    return decimal.toString(16)

}
function BinToDec(bin){
    return parseInt(bin, 2).toString()
}

function BinToHex(bin){
    return parseInt(bin, 2).toString(16)
}

function HexToDec(hex){
    const hexchar = "0x" + hex
    return parseInt(hexchar).toString()
}
function HexToBin(hex){
    const hexchar = "0x" + hex
    return parseInt(hexchar).toString(2)
}
export function Binaire(){
    // etat stocke la valeur courante dans l'unité choisi
    const [state, setState] = useState({
        scale: 'd',
        nombre: ''
    })

    function handleBinaireChange(e){
        setState({scale:'b',nombre: e.target.value})
        console.log(e.target.value)
    }

    function handleDecimalChange(e){
        setState({scale:'d',nombre: e.target.value})
    }
   
    function handleHexadecimalChange(e){
        setState({scale:'h',nombre: e.target.value})        
    }

    function TryConvertDec(scale, nombre){
        switch(scale){
            case "d":
                return nombre 
            case "h":
                return HexToDec(nombre)
            case "b":
                return BinToDec(nombre)
        }
    }

    function TryConvertHex(scale, nombre){
        switch(scale){
            case "d":
                return DecToHex(nombre) 
            case "h":
                return nombre
            case "b":
                return BinToHex(nombre)
        }
    }

    function TryConvertBin(scale, nombre){
        switch(scale){
            case "d":
                return DecToBin(nombre)
            case "h":
                return HexToBin(nombre)
            case "b":
                return nombre
        }
    }
    // calcul les bonnes conversions
    const scale = state.scale
    const nombre =  state.nombre
    const decimal = TryConvertDec(scale, nombre)
    const binaire = TryConvertBin(scale, nombre)
    const hexadecimal = TryConvertHex(scale, nombre)
    return <div>
        <NombreInput scale = 'd' nombre = {decimal} handleChange= {handleDecimalChange}/>
        <NombreInput scale = 'b' nombre = {binaire} handleChange= {handleBinaireChange}/>
        <NombreInput scale = 'h' nombre = {hexadecimal} handleChange= {handleHexadecimalChange}/>
    </div>
}

function NombreInput({scale, handleChange, nombre}){
    return <div>
        Valeur en {scaleNames[scale]}
        <input value= {nombre} onChange={handleChange}/> 
    </div>
    
}

