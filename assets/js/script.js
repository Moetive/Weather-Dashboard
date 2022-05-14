const apiKey = "&appid=9f103066ad2690dfc98026104a1b9e25"
const URL = "https://api.openweathermap.org/data/2.5/weather?lat=41.7759&lon=72.5215" + apiKey

$.ajax({
    url: URL,
    method: "GET" 

}).then(function(response){
    console.log(response);
})
