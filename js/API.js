import {state} from "./state.js"; 

const apiKey = "23d54e534f55b4e2153ac5c094250436";


export async function getWeather(city) {
    if(!city) return null;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;


    try{
        const response = await fetch(url)
        const data = await response.json()

        state.weatherData = data;
        return data;
        // console.log(data); 
        // weatherData = data;
        // renderweather();       that was before 
        // showSettings();
        // updateUnitIon();

    }catch(error){
        console.error("API error", error);
        return null
    }

}