import {state} from "./state.js"; 
import {renderweather, updateUnitIon,showSettings,hideSettings,showSuggestions,hidsSuggestions} from "./ui.js";


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

export async function geolocationshow(lat,lon){

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try{
      const response = await fetch(url)
      const data = await response.json()
      console.log(data);
      state.weatherData = data;
      return data;
    //   renderweather();
    //   showSettings();
    //   updateUnitIon();


      
    // const weatheResult = document.getElementById("weatherResult"); wtf is this idk
    }catch(error){
        console.error("API error", error);
    }



}





export async function fetchCitySuggestions(query) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();
  state.weatherData = data;
}





export function initEvents(){
    const cityInput = document.getElementById("cityInput");
    const list = document.getElementById("suggestions");

    cityInput.addEventListener("input",async () =>{
        const text = cityInput.value.trim();

        if(text.length < 2){
            hidsSuggestions();
            
            return;
        }
        else{
            showSuggestions();
        }
    

        const cities = await fetchCitySuggestions(text)

    console.log(cities);

    list.innerHTML = "";



    cities.forEach(city =>{
        const li = document.createElement("li");
        li.textContent = `${city.name}, ${city.country}`;

        li.addEventListener("click",async () =>{
            cityInput.value = `${city.name}, ${city.country}`;
            suggestions.innerHTML = "";

            await fetchWeatherByCoords(city.lat, city.lon)

            renderweather();
            showSettings();
            updateUnitIon();
        })

        list.appendChild(li);
    })

    });



}
