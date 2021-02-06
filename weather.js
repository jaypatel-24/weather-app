let baseUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
let api="f0f37ddf6e3fa078b82d9376c714f8b2";


document.getElementById("search").addEventListener('click',activate);
document.getElementById("clear").addEventListener('click',clear);


async function activate(){
    document.getElementById("loading").innerHTML = "loading ...";
    document.getElementById("atmosphere").innerHTML = "";
    document.getElementById("humidity").innerHTML = "";
    document.getElementById("windSpeed").innerHTML = "";
    document.getElementById("temperature").innerHTML = "";

    let city = document.getElementById("searchBox").value;
    let newUrl = baseUrl + city + "&APPID=" + api;

    const data = await fetch(newUrl);

    try {
        if(data.ok == false) {
            let message = `${data.status}`;
            throw new Error(message);
        } else {
            const response = await data.json();

            let atmosphere = response.weather[0].main;
            let humidity = response.main.humidity;
            let windSpeed = response.wind.speed;
            let temperature = response.main.temp;
    
            let temperature_fahrenheit = Math.round(parseInt(temperature) * 9/5 - 459.67);
            let temperature_celcius = Math.round(parseInt(temperature) - 273.15);
        
            document.getElementById("loading").innerHTML = "";

            document.getElementById("temperature").innerHTML = `temperature: <br> ${temperature_fahrenheit} &deg;F / ${temperature_celcius} &deg;C `;
            document.getElementById("atmosphere").innerHTML = `atmosphere: ${atmosphere}`;
            document.getElementById("humidity").innerHTML = `humidity: ${humidity}%`;
            document.getElementById("windSpeed").innerHTML = `Wind Speed: ${windSpeed} km/h`;

            document.getElementById("searchBox").value ="";
        }
    } catch(e) {
        document.getElementById("loading").innerHTML = e + " bad request";
        document.getElementById("searchBox").value ="";
    }        
}

function clear(){
    document.getElementById("atmosphere").innerHTML = "";
    document.getElementById("humidity").innerHTML = "";
    document.getElementById("windSpeed").innerHTML = "";
    document.getElementById("temperature").innerHTML = "";
}
