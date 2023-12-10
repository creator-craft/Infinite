import { getURLParams } from "/utils.js"

function shuffle_(array) { return array.sort(() => Math.random() - 0.5) }
/**
 * @param {any[]} array
 * @returns {any[]}
*/
function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
        let j = Math.floor(Math.random() * array.length);
        [array[j], array[i]] = [array[i], array[j]]
    }
    return array
}

const types = ["None", "radio", "checkbox", "number", "date", "color", "range", "text"]
const article = document.querySelector("article")
const url_params = getURLParams()
console.log(url_params)
const questions = quizs[url_params.quiz && url_params.quiz >= 0 && url_params.quiz < quizs.length ? url_params.quiz : 0].questions

function generate(questions) {
    let gen_quests = [], q
    for (let id in questions) {
        q = questions[id]
        let input = ""
        switch (q.type) {
            case RADIO: case CHECKBOX:
                let in_ = [], i = 0
                for (let answer of q.answers) {
                    in_.push( `<input type="${types[q.type]}" name="id${id}" id="id${id}_${i}">` + `<label for="id${id}_${i}">${answer}</label><br>` )
                    i ++
                }
                input += shuffle(in_).join("")
                break
            case DATE: case NUMBER:case COLOR: case TEXT:
                input = `<input type="${types[q.type]}" name="id${id}" ${q.param ?? ""}>` // ${q.min != undefined ? ' min="' + q.min + '"' : ''}${q.max != undefined ? ' max="' + q.max + '"' : ''}
                break
            case RANGE:
                input = `<input type="${types[q.type]}" name="id${id}" ${q.param ?? ""} value=${q.default} oninput="this.nextElementSibling.value = this.value">`
                input += `<output>${q.default}</output>`
                break
        }
        gen_quests.push(`<a ref="${id}" type_="${q.type}"><p class="corner" title="Nombre de points">${q.points}</p><h2>${q.text}</h2>${input}</a>`)
    }
    shuffle(gen_quests)
    article.innerHTML += gen_quests.join("")
}

var root = document.documentElement, scroll_step, scroll_max, on_scroll
function scrollAnim() {
    if (scroll_step > 0 ? root.scrollTop >= scroll_max : root.scrollTop <= scroll_max) return
    root.scrollTop += scroll_step
    if (on_scroll) on_scroll(root.scrollTop)
    requestAnimationFrame(scrollAnim)
}
function scroll(max, step, from, onscroll) {
    scroll_max = max == undefined ? root.scrollTop : max
    scroll_step = step ? step : 10
    if (from != undefined) root.scrollTop = from
    on_scroll = onscroll
    requestAnimationFrame(scrollAnim)
}

generate(questions)
article.innerHTML += "<a id='send' style='display: flex; justify-content: center;'><input type='button' value='  Envoyer  '></a>"
article.querySelector("#send").onclick = () => {
    let inputs = article.querySelectorAll("input"), quests = article.querySelectorAll("a")
    for (let input of inputs)
        input.disabled = true

    let el_idx = quests.length - 2, question = null

    scroll(0, -6, undefined, y => {
        if ((question = quests[el_idx]) && question.offsetTop + question.offsetHeight > y) {
            let ref = question.getAttribute("ref"), good = questions[ref].good, res
            question.style.backgroundColor = "black"
            switch (~~question.getAttribute("type_")) {
                case NUMBER: case RANGE: case COLOR: case DATE:
                    if (res = question.querySelector("input").value)
                        question.style.backgroundColor = res == good ? "green" : "red"
                    break
                case RADIO:
                    res = question.querySelector("input:checked")
                    if (res) question.style.backgroundColor = res.id.substring(ref.length + 3) == good ? "green" : "red"
                    break
                case CHECKBOX:
                    res = question.querySelectorAll("input:checked")
                    res = res.length ? Array.from(res).reduce((acc, el) => acc + (good.includes(~~el.id.substring(ref.length + 3)) ? 1 : -1), 0) : -666
                    if (res != -666) question.style.backgroundColor = res == good.length ? "green" : res > 0 ? "orange" : "red"
                    break
            }
            el_idx--
        }
    })

}

