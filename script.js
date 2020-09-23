// Takes user input "city" and makes ajax call to weather api for both current conditions and 5-day forecast

$("#search-button").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var city = $("#city-input").val().trim();
    console.log(city);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=29f5bb53f0ad45eaf4e2242330886d7f";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response)

        // Display city name, date, weather condition icon, temperature humidity, wind speed, and uv index in .current-forecast
        // Must create elements
        var cityInfo = JSON.parse(response)
        console.log(cityInfo)
        var cityName = $("<div>");
        cityName.text(cityInfo.name)

        $("#current-forecast").append(cityName);
        console.log(cityName)
    })


})





// Change background color of UV index depending on if conditions are favorable, moderate, or severe
// Green for favorable, yellow for moderate, red for severe

// Display date, weather condition icon, temperature, and humidity in .five-day-forecast
// Also Display header "5-Day Forecast" 

// Save searches to local storage, create each city to a button, and append it to page in .search-history
// Only display last 8

// Display the last search on the page even after refresh

// Add CSS to newly created elements (Five day forecast boxes)