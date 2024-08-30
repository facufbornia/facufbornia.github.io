// Language Section
const eng = document.querySelector(".english");
const esp = document.querySelector(".spanish");

function changeLanguage(){
    eng.addEventListener("click", () =>{ 
        window.location.replace("http://127.0.0.1:5500/indexen.html")
    });

    esp.addEventListener("click", () =>{ 
        window.location.replace("http://127.0.0.1:5500/index.html")
    });
}

// Weather Section
const p_city = document.querySelector(".w_City");
const p_weather = document.querySelector(".w_weather");
const p_temp = document.querySelector(".w-temp");
const p_desc = document.querySelector(".w_desc")
const span_icon = document.querySelector(".w_icon");

const API_URL = `https://api.openweathermap.org/data/2.5/weather?`;
const API_key = "appid=f6839e291b2a66fcabf6abc152a6c545";

let lat = -34.907;
let lon = -56.186;

async function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                const coords = {
                    lat: latitude,
                    lon: longitude,
                };
                lat = coords.lat;
                lon = coords.lon;
                console.log(lat, lon);
                if ((lat !== -34.907) || (lon !== -56.186)) {
                    await getWeather(lat, lon);
                }
            }, async (error) => {
                console.error("Error obteniendo la geolocalización:", error);
                await getWeather(lat, lon);
            }
        );
    } else {
        await getWeather(lat, lon);
    }
    console.log(lat, lon);
}

async function getWeather(lat, lon) {
    const response = await fetch(API_URL + `lat=${lat}` + `&lon=${lon}` + `&${API_key}`);
    const data = await response.json()
    console.log(data);
    const weatherArray = data.weather;
    const tempArray = data.main;

    let city = data.name;
    let weather, weatherDesc, weatherId;
    let temp = Math.round(parseFloat(tempArray.temp) - 273.15);

    for (let i = 0; i < weatherArray.length; i++) {

        weather = weatherArray[i].main;
        weatherDesc = weatherArray[i].description;
        weatherId = weatherArray[i].id;
    }

    let weatherEmoji = getWeatherIcon(weatherId)
    console.log(city,
        weather,
        weatherDesc,
        weatherId,
        temp);
    
    p_city.append(" " + city);
    p_weather.append(weather + ": " + weatherDesc);
    p_temp.append(temp + "°C");
    span_icon.append(weatherEmoji)
}

function getWeatherIcon(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "🌤️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "🌎";
    }
}

getLocation();
changeLanguage();
