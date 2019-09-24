const weatherInput = document.querySelector("#cityInput");
const selectWrapper = document.querySelector("#weather");

weatherInput.addEventListener("submit", function(event){
    event.preventDefault();
    updateWeather(weatherInput.querySelector("#cname").value)
});

function updateWeather(city){
    get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2f4580c1da2a1471787ee4c356181fd1`)
        .then(function(data){
            const newul = document.createElement("ul");
            const location = document.createElement("li");
            location.innerHTML = `Location: ${data.name}`;
            newul.append(location)
            
            const temperature = document.createElement("li");
            temperature.innerHTML = `Temperature: ${parseInt(((data.main.temp - 273.15)*1.8 )+32)}`
            newul.append(temperature);
            
            const windSpeed = document.createElement("li");
            windSpeed.innerHTML = `Wind speed: ${data.wind.speed} mph`;
            newul.append(windSpeed);

            const sunrise = document.createElement("li");
            let sunriset = new Date(0);
            sunriset.setUTCSeconds(data.sys.sunrise);
            sunrise.innerHTML = `Sunrise at ${sunriset.getHours()}:${sunriset.getMinutes()}`
            newul.append(sunrise);

            const sunset = document.createElement("li");
            let sunsett = new Date(0);
            sunsett.setUTCSeconds(data.sys.sunset);
            sunset.innerHTML = `Sunset at ${sunsett.getHours()}:${sunsett.getMinutes()}`
            newul.append(sunset);
            
            const icon = document.createElement("li")
            icon.innerHTML = `<img src=http://openweathermap.org/img/w/${data.weather[0].icon}.png />`;
            newul.append(icon)
            
            selectWrapper.append(newul);
            let mapUrl = `http://maps.google.com/maps?q=${data.coord.lat},${data.coord.lon}&output=embed`;
            let iframe = document.createElement('iframe');
            iframe.setAttribute("src",mapUrl);
            iframe.innerHTML = "Hi";
            selectWrapper.append(iframe);

            const ark = document.createElement("hr");
            selectWrapper.append(ark);
            const brk = document.createElement("hr");
            selectWrapper.append(brk);
        }).catch(function(err){
            const notFound = document.createElement("p")
            notFound.innerHTML = `Location \"${city}\" not found, please try again.`;
            selectWrapper.append(notFound)
            const ark = document.createElement("hr");
            selectWrapper.append(ark);
            const brk = document.createElement("hr");
            selectWrapper.append(brk);
        });
    }

{
    updateWeather("Atlanta")
}
