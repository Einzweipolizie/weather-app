import {state} from "./state.js"; 


export function renderweather(){
  if(!state.weatherData) return;


    const weatheResult = document.getElementById("weatherResult");


      const tempC = state.weatherData.main?.temp;
      const feelsC= state.weatherData.main.feels_like;

      if (tempC == null || feelsC == null) {
        weatheResult.textContent = "Weather data unavailable.";
        return;
      }

      const temp = 
        state.unit === "C" 
        ? `${tempC.toFixed(1)} °C`
        : `${((tempC * 9/5) + 32).toFixed(1)} F`;

      const feelsLike = 
        state.unit === "C" 
        ? `${feelsC.toFixed(1)} °C`
        : `${((feelsC * 9/5) + 32).toFixed(1)} F`;




      weatheResult.innerHTML =`
        <h2>${state.weatherData.name}</h2>
        <p>temperature: ${temp ?? "no data"}</p>
        <p>feels like: ${feelsLike?? "no data"}</p>
        <p>condition: ${state.weatherData.weather?.[0]?.description ?? "no data"}</p>

      `;
    };

;



export function updateUnitIon(){
  const icon = document.getElementById("toggleUnit");

  icon.textContent = state.unit === "C" ? "🌡️ °F": "🌡️ °C";
}


export function showSettings(){
  document.getElementById("settings").classList.remove("hidden");
  document.getElementById("settings").tabIndex = 0;
}


export function hideSettings(){
  document.getElementById("settings").classList.add("hidden");
}

export function showSuggestions(){
  document.getElementById("suggestions").classList.remove("hidden");
}

export function hidsSuggestions(){
  document.getElementById("suggestions").classList.add("hidden");
}

export function highlightSuggestion(index) {
  const items = document.querySelectorAll("#suggestions li");
  items.forEach((li, i) => {
    if (i === index) {
      li.classList.add("highlighted");
      li.scrollIntoView({ block: "nearest" }); // Keeps selection visible
    } else {
      li.classList.remove("highlighted");
    }
  });
}