const locationName = document.getElementById("locationName");
const temperature = document.getElementById("temperature");
const windSpeed = document.getElementById("windSpeed");
const icon = document.getElementById("icon");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");


get(`https://api.openweathermap.org/data/2.5/weather?q=Atlanta,US&appid=2f4580c1da2a1471787ee4c356181fd1`)
    .then(function(data){
        locationName.innerHTML = `Location: ${data.name}`
        temperature.innerHTML = `Temperature: ${parseInt(((data.main.temp - 273.15)*1.8 )+32)}`
        windSpeed.innerHTML = `Wind speed: ${data.wind.speed}`
        let sunriset = new Date(0);
        sunriset.setUTCSeconds(data.sys.sunrise);
        sunrise.innerHTML = `Sunrise at ${sunriset.getHours()}:${sunriset.getMinutes()}`
        let sunsett = new Date(0);
        sunsett.setUTCSeconds(data.sys.sunset);
        sunset.innerHTML = `Sunset at ${sunsett.getHours()}:${sunsett.getMinutes()}`
        icon.innerHTML = `<img src=http://openweathermap.org/img/w/${data.weather[0].icon}.png />`;
        let mapUrl = `http://maps.google.com/maps?q=${data.coord.lat},${data.coord.lon}&output=embed`;
        let iframe = document.createElement('iframe');
        iframe.setAttribute("src",mapUrl);
        iframe.innerHTML = "Hi";
        document.body.append(iframe);
    });



