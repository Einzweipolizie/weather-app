import {getWeather} from "./API.js";
import {state} from "./state.js"; //need to change
import {renderweather, updateUnitIon} from "./ui.js";



//lets belive this works


document.getElementById("weatherInput").addEventListener("submit", e => {
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
  updateUnitIon();  
  console.log(state.weatherData);
  
});


document.getElementById("geoLoactionBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log("Latitude:", lat, "Longitude:", lon);
      geolocationshow(lat,lon);
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



async function geolocationshow(lat,lon){

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try{
      const response = await fetch(url)
      const data = await response.json()
      console.log(data);
      weatherData = data;
      renderweather();
      showSettings();
      updateUnitIon();


      
      const weatheResult = document.getElementById("weatherResult");
    }catch(error){
        console.error("API error", error);
    }



}




document.getElementById("toggleUnit").addEventListener("click", () => {
if(!weatherData) return; 

  unit = unit === "C" ? "F" : "C";

  updateUnitIon();
  renderweather();

});





function showSettings(){
  document.getElementById("settings").classList.remove("hidden");
}

function hideSettings(){
  document.getElementById("settings").classList.add("hidden");
}

function showSuggestions(){
  document.getElementById("suggestions").classList.remove("hidden");
}

function hidsSuggestions(){
  document.getElementById("suggestions").classList.add("hidden");
}

const cityInput = document.getElementById("cityInput");

cityInput.addEventListener("input",async () =>{
  const len = cityInput.value.trim();

  if(len.length < 2){
    hidsSuggestions();
    
    return;
  }

  else{
    showSuggestions();
  }
  
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${len}&limit=5&appid=${apiKey}`;

  const response = await fetch(url);
  const cities = await response.json();

  console.log(cities);

  const list = document.getElementById("suggestions");
  list.innerHTML = "";



  cities.forEach(city =>{
    const li = document.createElement("li");
    li.textContent = `${city.name}, ${city.country}`;

    li.addEventListener("click", () =>{
      cityInput.value = `${city.name}, ${city.country}`;
      suggestions.innerHTML = "";

      fetchweatherbycoords(city.lat, city.lon)
    })

    list.appendChild(li);
})

});

async function fetchweatherbycoords(lat, lon){
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    try{
      const response = await fetch(url)
      const data = await response.json()
      console.log(data);
      weatherData = data;
      renderweather();
      showSettings();
      updateUnitIon();


      
      const weatheResult = document.getElementById("weatherResult");
    }catch(error){
        console.error("API error", error);
    }
};
