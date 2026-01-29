import {getWeather,geolocationshow,initEvents} from "./API.js";
import {state} from "./state.js"; //need to change
import {renderweather, updateUnitIon,showSettings,hideSettings,showSuggestions,hidsSuggestions,getTime} from "./ui.js";





document.getElementById("weatherInput").addEventListener("submit", e => { //WORKS
  e.preventDefault(); // stops form submission completely
});

document.getElementById("getweather").addEventListener("click", async (e) => { //WORKS
  e.preventDefault()  

  const city = document.getElementById("cityInput").value.trim();

  if(!city){
    return;
  }

  await getWeather(city);
  renderweather();
  showSettings();
  updateUnitIon();  
  hidsSuggestions();
  

  console.log(state.weatherData);
  
});


document.getElementById("geoLoactionBtn").addEventListener("click", async (e) => { //WORKS
  e.preventDefault();
  
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(async(position) => { 
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;


      console.log("Latitude:", lat, "Longitude:", lon);

      await geolocationshow(lat,lon);
      renderweather();
      showSettings();
      updateUnitIon();
    },
    
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        default:
          alert("An unknown error occurred.");
      }
    }
  );

});




document.getElementById("toggleUnit").addEventListener("click", () => { //WORKS
if(!state.weatherData) return; 

  state.unit = state.unit === "C" ? "F" : "C";

  updateUnitIon();
  renderweather();

});


document.addEventListener("DOMContentLoaded", () => {
  initEvents();

  const initialTheme = getTime();
  document.body.classList = initialTheme;
});



document.addEventListener("keydown", function (e) {
  console.log(e.key);
});