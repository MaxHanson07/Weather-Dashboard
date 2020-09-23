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
    }).then(function (response) {

        // Display city name, date, weather condition icon, temperature, humidity, wind speed, and uv index in .current-forecast
        // Must create elements

        // Create div to hold all attributes of today's forecast
        var newDiv = $("<div>");

        console.log(response);

        var cityName = response.name;

        // Get today's date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        // Get weather icon
        var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
        // wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon


        newRow = $("<div>").attr("class", "row")
        newDiv.append(newRow);

        var cityAndDate = $("<h2>").text(cityName + " " + today)
        newRow.append(cityAndDate);
        newRow.append(weatherIcon);

        // Get temperature and convert it to Farenheit from Kelvin
        var temp = response.main.temp;
        temp = ((temp - 273.15) * 1.80 + 32).toFixed(1);

        var tempEl = $("<p>").text("Temperature: " + temp + " °F")
        newDiv.append(tempEl);

        // Get humidity
        var humidity = response.main.humidity;
        var humidityEl = $("<p>").text("Humidity: " + humidity);
        newDiv.append(humidityEl);

        // Get wind speed
        var windSpeed = response.wind.speed;
        var windEl = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
        newDiv.append(windEl);

        // Get lat and lon to use for uv index api call
        var lat = response.coord.lat;
        var lon = response.coord.lon;

        queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=29f5bb53f0ad45eaf4e2242330886d7f";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var uvIndex = response.value;
            var uvEl = $("<p>").text("UV index: " + uvIndex);
            newDiv.append(uvEl);

            // give color to index
            // if (uvIndex < 5)
            // {
            //     attr.class
            // }

        })

        $(".current-forecast").append(newDiv);

    })


    queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=29f5bb53f0ad45eaf4e2242330886d7f";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(data) {

        
        // Create div to hold all attributes of today's forecast
        var newDivFive = $("<div>");
    
        var fiveDay = $("<h2>").text("5-Day Forecast");

        newDivFive.append(fiveDay);

        for (let i = 3; i < 36; i += 8) {
            // Div representing each day
            var dayHolder = $("<div>")

            console.log(data)
            
            // Get date

            // Get temperature and convert it to Farenheit from Kelvin
            var tempFive = data.list[i].main.temp;
            tempFive = ((tempFive - 273.15) * 1.80 + 32).toFixed(1);

            var tempElFive = $("<p>").text("Temperature: " + tempFive + " °F")
            dayHolder.append(tempElFive);

            // Get humidity
            var humidityFive = data.list[i].main.humidity;
            var humidityElFive = $("<p>").text("Humidity: " + humidityFive);
            dayHolder.append(humidityElFive);
            console.log(humidityFive)

            // Get wind speed
            var windSpeedFive = data.list[i].wind.speed;
            var windElFive = $("<p>").text("Wind Speed: " + windSpeedFive + " MPH");
            dayHolder.append(windElFive);

            newDivFive.append(dayHolder);

            // Get weather icon
            // var weatherIcon = response.weather.0.icon;
        }

        $("#five-day-forecast").append(newDivFive);

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