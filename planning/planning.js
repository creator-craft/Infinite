import {fetchJSON} from "../utils.js"

fetchJSON("https://api.open-meteo.com/v1/forecast", {
    "latitude": 48.52,
    "longitude": 2.3799997,
    "hourly": ["temperature_2m", "cloud_cover"],
    "current": ["is_day"],
    "timezone": "auto",
    "forecast_days": 1
}).then( data => {
    let temp = data.hourly.temperature_2m.slice(8, 18).reduce( (acc, v) => acc + v ) / 10, visibility = data.hourly.cloud_cover.slice(8, 18).reduce( (acc, v) => acc + v ) / 10 / 100, is_day = data.current.is_day
    
    visibility = (1 - visibility) * 255
    temp = (Math.max(-10, Math.min(20, temp)) + 10) / 30

    let red = Math.round(255 * temp)
    let blue = Math.round(255 * (1 - temp))

    document.querySelector("body").style.backgroundImage = `linear-gradient(0deg, rgb(${visibility}, ${visibility}, ${visibility}), rgb(${red}, ${0}, ${blue}))`

    document.querySelector("canvas").style.boxShadow = "0px 0px 50px " + (is_day ? "yellow" : "black")
} )

const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

const img = new Image()
const ctx = document.querySelector("canvas").getContext("2d")
const date_display = document.querySelector("#date_display > p")
ctx.imageSmoothingEnabled = false
week_show.height = 101 + 550//week_show.clientHeight

function drawPlanning() {
    week_show.width = (day == 2 || day == 5) ? 301 : 300
    let shx = 303 * (day - 1) + (day > 2 ? 1 : 0)

    ctx.drawImage(img, -52 - shx, - 51 - 16 * 2)

    //date.toString().substring(0, 15)
    date_display.innerText = `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} `
}
img.onload = drawPlanning

var date = new Date()
var hour = date.getHours(), day = date.getDay()
date.setHours(0, 0, 0, 0)
date.setDate(date.getDate() + 4 - (day || 7))
var yearStart = new Date(date.getFullYear(), 0, 1)
var week = Math.ceil((((date - yearStart) / 86400000) + 1) / 7)

date = new Date()

if (hour >= 17) {
    hour = 0
    day += 1
    date.setDate(date.getDate() + 1)
}
if (day > 5 || day == 0) {
    date.setDate(date.getDate() + 8 - day)
    day = 1
    week += 1
}

img.src = `https://edt.univ-evry.fr/vue_etudiant_horizontale.php?current_year=2023&current_student=68426891&current_week=${week}&lar=1920&hau=1080`

function left() {
    day --
    date.setDate(date.getDate() - 1)
    if (day < 1) {
        day = 5
        week --
        date.setDate(date.getDate() - 2)
        img.src = `https://edt.univ-evry.fr/vue_etudiant_horizontale.php?current_year=2023&current_student=68426891&current_week=${week}&lar=1920&hau=1080`
    } else
        drawPlanning()
}
function right() {
    day ++
    date.setDate(date.getDate() + 1)
    if (day > 5) {
        day = 1
        week ++
        date.setDate(date.getDate() + 2)
        img.src = `https://edt.univ-evry.fr/vue_etudiant_horizontale.php?current_year=2023&current_student=68426891&current_week=${week}&lar=1920&hau=1080`
    } else
        drawPlanning()
}

document.addEventListener("keydown", e => {
    if (e.key == "ArrowLeft") left()
    else if (e.key == "ArrowRight") right()
})

let lastTapTime = 0, lastTapX = 0
document.addEventListener("touchend", e => {
    if (e.changedTouches.length != 1) return
    const curTime = performance.now(), tapX = e.changedTouches[0].clientX
    
    if (curTime - lastTapTime < 300 && Math.abs(tapX - lastTapX) < 50)
        if (tapX < window.innerWidth / 2)
            left()
        else
            right()

    lastTapTime = curTime
    lastTapX = tapX
})
