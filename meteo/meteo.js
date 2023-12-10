import * as utils from "../utils.js"

const current = {
    temperature_2m: document.querySelector("#current > p:nth-of-type(1)"),
    apparent_temperature: document.querySelector("#current > p:nth-of-type(2)"),
    cloud_cover: document.querySelector("#current > p:nth-of-type(3)"),
    precipitation: document.querySelector("#current > p:nth-of-type(4)"),
    //rain: document.querySelector("#current > th:nth-of-type(4)"),
    //snowfall: document.querySelector("#current > th:nth-of-type(4)"),
    wind_speed_10m: document.querySelector("#current > p:nth-of-type(5)"),
}

utils.fetchJSON("https://api.open-meteo.com/v1/forecast", {
    "latitude": 48.8534, // 48.52
    "longitude": 2.3488, // 2.3799997
    "current": ["precipitation_probability", "temperature_2m", "apparent_temperature", "is_day", "precipitation", "rain", "snowfall", "cloud_cover", "wind_speed_10m"],
	"hourly": ["temperature_2m", "cloud_cover", "precipitation"],//, "apparent_temperature", "precipitation_probability"],
    "timezone": "auto",
    "forecast_days": 1
}).then( response => {
    console.log(response)

    for (let e in current) {
        //console.log(e)
        if (response.current_units[e])
            current[e].innerText = response.current[e] + response.current_units[e]
    }

    cur_sun.src = response.current.is_day ? "sun.png" : "moon.png"

    let html = ""
    for (const type of ["temperature_2m", "cloud_cover", "precipitation"]) {
        const l = response.hourly[type], unit = response.hourly_units[type]
        for (let e of l)
            html += `<p>${e}${unit}</p>`
    }
    today.innerHTML += html
})