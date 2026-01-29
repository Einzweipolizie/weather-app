import {state} from "./state.js"; 


export function renderweather(){
  if(!state.weatherData) return;


    const weatheResult = document.getElementById("weatherResult");


      const tempC = state.weatherData.main?.temp;
      const feelsC= state.weatherData.main.feels_like;

      const theme = getTheme(tempC);
      const timeTheme = getTime();

      document.body.classList = theme;

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

      console.log(tempC); 


      weatheResult.innerHTML =`
        <h2>${state.weatherData.name}</h2>
        <p>temperature: ${temp ?? "no data"}</p>
        <p>feels like: ${feelsLike?? "no data"}</p>
        <p>condition: ${state.weatherData.weather?.[0]?.description ?? "no data"}</p>

      `;


    };

;


export function getTime(){
  const now = new Date();
const timeString = now.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: false 
  });

  console.log(timeString); // here add in the giht cornor of the site 

  const display = document.getElementById("timeDisplay");
  if(display){
    display.textContent = timeString;
  }

  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';   // 5 AM to 11:59 AM
  if (hour >= 12 && hour < 18) return 'afternoon'; // 12 PM to 5:59 PM
  if (hour >= 18 && hour < 21) return 'evening';   // 6 PM to 8:59 PM
  return 'night';

}

function getTheme(temp){
if (temp <= 0) return 'freezing';
if (temp > 0 && temp <= 15) return 'cool';
if (temp > 15 && temp <= 25) return 'mild';
if (temp > 25) return 'hot';
return 'defult';
}


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