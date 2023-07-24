const apiKey = "&appid=9f103066ad2690dfc98026104a1b9e25"
const mainDate = moment().format("MMM Do, YYYY");
// --------------------------------- Search button for City ------------------------------------//
$("#searchBtn").on("click", () => {
const cityName = $("#citySearch").val();
$("#citySearch").val("");
const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey
const queryURLforcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";
$.ajax({
    url: URL,
    method: "GET" 

}).then(function(response){
    console.log(response.weather);
    console.log(URL);
    $("#current").empty();
    //storing responses in html
    var cityNameEl = $("<h2>").text(response.name);
    var displayMainDate = cityNameEl.append(" " + mainDate);
    var tempEL = $("<p>").text("Temperature: " + response.main.temp);
    console.log(tempEL)
    var humEl = $("<p>").text("Humidity: " + response.main.humidity);
    var windEl = $("<p>").text("Wind Speed: " + response.wind.speed);
    var currentweather = response.weather[0].main;

    if (currentweather === "Rain") {
        var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
        currentIcon.attr("style", "height: 60px; width: 60px");
    } else if (currentweather=== "Clouds") {
        var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
        currentIcon.attr("style", "height: 60px; width: 60px");
    } else if (currentweather === "Clear") {
        var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
        currentIcon.attr("style", "height: 60px; width: 60px");
    }
     else if (currentweather === "Drizzle") {
        var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
        currentIcon.attr("style", "height: 60px; width: 60px");
    }
     else if (currentweather === "Snow") {
        var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
        currentIcon.attr("style", "height: 60px; width: 60px");
    }
    //appending to render on page
    var newDiv = $('<div>');

    newDiv.append(displayMainDate, currentIcon, tempEL, humEl, windEl);

    $("#current").html(newDiv);
    
//--------------------------------------------- UV ---------------------------------------//

var lat = response.coord.lat;
var lon = response.coord.lon;
var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=ecc0be5fd92206da3aa90cc41c13ca56&lat=" + lat  + "&lon=" + lon;

        $.ajax({
            url: queryURLUV,
            method: 'GET'
        }).then(function (response) {
            $('#uvl-display').empty();
            var uvlresults = response.value;
            //create HTML for new div
            var uvlEl = $("<button class='btn btn-dark '>").text("UV Index: " + response.value);
      
            $('#uvl-display').html(uvlEl);
})
});

//--------------------------------------------5 day forcast ---------------------------------------//

$.ajax({
    url: queryURLforcast,
    method: 'GET'
}).then(function (response) {
 
    var results = response.list;
    //empty 5day div--------
    $("#5day").empty();
    //create HTML for 5 day forcast................
    for (var i = 0; i < results.length; i += 8) {
        // Creating a div
        var fiveForcast = $("<div class='card col bg-dark text-white border-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
        
        //temperture and humidity 
        var date = results[i].dt_txt;
        var setD = date.substr(0,10)
        var temp = results[i].main.temp;
        var hum = results[i].main.humidity;

        // defining cards
        var h5 = $("<h5 class='card-title'>").text(setD);
        var pT = $("<p class='card-text'>").text("Temp: " + temp);;
        var pH = $("<p class='card-text'>").text("Humidity " + hum);;

        var weather = results[i].weather[0].main

        if (weather === "Rain") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            icon.attr("style", "height: 40px; width: 40px");
        } else if (weather === "Clouds") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
            icon.attr("style", "height: 40px; width: 40px");
        } 
         else if (weather === "Clear") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
            icon.attr("style", "height: 40px; width: 40px");
        }
         else if (weather === "Drizzle") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
            icon.attr("style", "height: 40px; width: 40px");
        }
         else if (weather === "Snow") {
            var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
            icon.attr("style", "height: 40px; width: 40px");
        }

    
        fiveForcast.append(h5);
        fiveForcast.append(icon);
        fiveForcast.append(pT);
        fiveForcast.append(pH);
        $("#5day").append(fiveForcast);
    }

});
});
pageLoad();
//----------------------------------------city search-----------------------//

$("#select-city").on("click", function (event) {
    // Preventing the button from trying to submit the form......
    event.preventDefault();
    // Storing the city name........
    var cityInput = $("#city-input").val().trim();

    //save search term to local storage.....
    var textContent = $(this).siblings("input").val();
    var storearr = [];
    storearr.push(textContent);
    localStorage.setItem('cityName', JSON.stringify(storearr));
  
    searchCity(cityInput);
    pageLoad();
});

//---------------------------local storage for page-------------------------------------//
function pageLoad () {
    var lastSearch = JSON.parse(localStorage.getItem("cityName"));
    var searchDiv = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>").text(lastSearch);
    var psearch = $("<div>");
    psearch.append(searchDiv)
    $("#searchhistory").prepend(psearch);
}

// //Event deligation...
// $("#searchhistory").on('click', '.btn', function(event) {
// event.preventDefault();
//     console.log($(this).text());
//     searchCity($(this).text());

// });
// create global variables for city and current date
// create function
// inside the function target 