const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.send(`
        <form action="/" method="post">
            <label for="city">City Name:</label>
            <input id="city" type="text" name="cityName">
            <button type="submit">Go</button>
        </form>
    `);
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apid = "d28a9c7811193e16f57d4b0388009b88";
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apid}&units=${unit}`;

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const weatherdescription = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageurl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            res.write(`<h1>The temperature in ${query} is ${temp} degrees Celsius</h1>`);
            res.write(`<p>The weather is currently ${weatherdescription}</p>`);
            res.write(`<img src="${imageurl}">`);
            res.send();
        });
    });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
