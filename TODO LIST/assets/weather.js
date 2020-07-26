const weatherContainer = document.getElementById(`weather-js`);
const weather = document.querySelector(`h1`);
console.log(weather)

const API_KEY = `3f94166e7501eec8700be2636d74ecd3`;

const COORDS = `coords`

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj))
}

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        const temperature = myJson.main.temp;
        const place = myJson.name;
        weather.innerText = `${temperature} @ ${place}`
    });
}

function success(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude)
}
function error(){
    weather.innerText = "Cant access your location";
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(success,error)
}

function loadWeather(){
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null){
        askForCoords()
    }
    else{
        const parseCoords = JSON.parse(loadCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}
loadWeather();