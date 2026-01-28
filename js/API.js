import {state} from "./state.js"; 
import {renderweather, updateUnitIon,showSettings,hideSettings,showSuggestions,hidsSuggestions} from "./ui.js";


const apiKey = "23d54e534f55b4e2153ac5c094250436";


function debounce(fn, delay  = 300){
    let timer;
    return (...args) =>{
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}


export async function getWeather(city) {
    if(!city) return null;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;


    try{
        const response = await fetch(url)
        const data = await response.json()

        state.weatherData = data;
        return data;


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





export function initEvents() {
  const cityInput = document.getElementById("cityInput");
  const list = document.getElementById("suggestions");
  
  let activeIndex = -1; 
  let suggestionsData = [];

  // Reusable selection logic for Click and Enter key
  const selectCity = async (city) => {
    cityInput.value = `${city.name}, ${city.country}`;
    list.innerHTML = "";
    await fetchWeatherByCoords(city.lat, city.lon);
    renderweather();
    showSettings();
    updateUnitIon();
    hidsSuggestions();
    activeIndex = -1;
  };

  const handleCityInput = async () => {
    const text = cityInput.value.trim();
    if (text.length < 2) {
      hidsSuggestions();
      return;
    } else {
      showSuggestions();
    }

    const cities = await fetchCitySuggestions(text);
    suggestionsData = cities;
    activeIndex = -1; 
    list.innerHTML = "";

    cities.forEach((city, index) => {
      const li = document.createElement("li");
      li.textContent = `${city.name}, ${city.country}`;
      li.addEventListener("click", () => selectCity(city));
      list.appendChild(li);
    });
  };

  const debouncedHandler = debounce(handleCityInput, 400);
  cityInput.addEventListener("input", debouncedHandler);


  function highlightSuggestion(index) {
    const items = list.querySelectorAll("li");
    items.forEach(li => li.classList.remove("highlighted")); // Match the CSS

    const current = items[index];
    if (current) {
      current.classList.add("highlighted"); // Match the CSS
      current.scrollIntoView({ block: "nearest" });
    }
  }

  // Keyboard Navigation
  cityInput.addEventListener("keydown", (e) => {
    const items = list.querySelectorAll("li");
    if (items.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      highlightSuggestion(activeIndex);
    } 
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      highlightSuggestion(activeIndex);
    } 
    else if (e.key === "Enter") {
      if (activeIndex > -1) {
        e.preventDefault();
        selectCity(suggestionsData[activeIndex]);
      }
    }
    else if (e.key === "Escape") {
      hidsSuggestions();
      list.innerHTML = "";
      activeIndex = -1;
    }
  });
}