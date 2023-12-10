
document.body.innerHTML += `
<img src="/Infinite/menu.png" id="menu_button" tabindex=0>
<div id="menu">
    <div id="menu_background"></div>
    <div id="menu_content">
        <a href="/Infinite/index.html" id="menu_custom1">HOME</a>
        <a href="/Infinite/meteo/meteo2.html" id="menu_custom2">METEO</a>
        <a href="/Infinite/planning/planning.html" id="menu_custom3">PLANNING</a>
        <a href="/Infinite/quiz/quiz.html?quiz=1" id="menu_custom4">QUIZ</a>
    </div>
</div>
`

menu_button.onclick = () => {
    menu.style.display = 'flex'
    requestAnimationFrame( () => 
        menu.style.opacity = '1'
    )
}
menu_button.onkeydown = e => { if (e.key == " " || e.key == "Enter") {menu_button.onclick(); e.preventDefault()} else if (e.key == "Escape") menu_background.onclick() }

menu_background.onclick = () => {
    menu.style.opacity = '0'
    setTimeout(() => {
        menu.style.display = 'none'
    }, 500)
}
menu_content.onkeydown = e => e.key == "Escape" ? menu_background.onclick() : null