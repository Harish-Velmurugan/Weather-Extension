document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('button').addEventListener('click', getCityData);
});

async function getCityData(e) {
    e.preventDefault();
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    console.log(document.getElementById('location').value);
    let city_url = proxyurl + `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=TcZU3HwAApE9v8B4eLSFPYxTScWiW9Qi&q=${document.getElementById('location').value}`

    const response = await fetch(city_url);

    // Storing data in form of JSON 
    var data = await response.json();
    console.log(data[0].Key);
    location_key = data[0].Key;
    const api_url = `http://dataservice.accuweather.com/currentconditions/v1/${location_key}?apikey=TcZU3HwAApE9v8B4eLSFPYxTScWiW9Qi`;
    let weather_url = proxyurl + api_url
    const response_2 = await fetch(weather_url);

    // Storing data in form of JSON 
    var data2 = await response_2.json();
    console.log(data2[0]);
    let {
        Temperature,
        WeatherIcon,
        WeatherText
    } = data2[0];
    document.getElementById("temp").innerHTML = Temperature.Imperial.Value + " " + Temperature.Imperial.Unit;
    WeatherIcon = WeatherIcon.toString()
    if (WeatherIcon.length == 1) {
        WeatherIcon = "0" + WeatherIcon
    }
    document.getElementById("image").src = `https://developer.accuweather.com/sites/default/files/${WeatherIcon}-s.png`
    document.getElementById("tempc").innerHTML = Temperature.Metric.Value + " " + "&#8451;";
    document.getElementsByClassName("description")[0].innerHTML = WeatherText;

}