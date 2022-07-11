const apiKey = "&appid=9f103066ad2690dfc98026104a1b9e25"
const date = moment()

$("#searchBtn").on("click", () => {
const cityName = $("#citySearch").val();
$("#citySearch").val("");
const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey
$.ajax({
    url: URL,
    method: "GET" 

}).then(function(response){
    console.log(response.weather);
})
});


// create global variables for city and current date
// create function
// inside the function target 