let lock = false, count = 0
const article = document.querySelector("article"), input = document.querySelector("input")

const articles = [
    "Simply Meteo", "Instantly check current and daily weather with a sleek web app. Stay informed at a glance with real-time updates and forecasts.",
    "Simply Planning", "Effortlessly organize your day with a web app displaying your schedule alongside color-coded day temperatures for quick planning.",
    "Simply Quiz", "A good way to test your knowledge about programming or just enjoy for a great moment.",
    'The Future of Sustainable Energy: A Green Revolution', 'In this article, explore the latest advancements i…ver the key players driving the green revolution.', 'Mindful Tech: Balancing Digital Connectivity and Mental Well-being', 'Dive into the intersection of technology and menta…mote well-being in an increasingly digital world.', 'The Art of Minimalism: Simplifying Your Life for Joy and Fulfillment', 'Uncover the beauty of living with less in this exp…n lead to a more fulfilling and intentional life.', 'Beyond the Stars: The Quest for Extraterrestrial Life', 'Embark on a cosmic journey as we delve into the sc…d the possibilities of finding life beyond Earth.', 'The Rise of Plant-Based Diets: Nourishing Your Body and the Planet', 'Explore the growing trend of plant-based diets and…dopting a plant-based lifestyle easier than ever.', 'Unlocking Creativity: The Power of Divergent Thinking', 'Delve into the concept of divergent thinking and i… innovation, and unleash your creative potential.', 'Navigating the Gig Economy: Thriving in a World of Freelance Work', 'As the gig economy continues to grow, learn how in… opportunities and challenges of the gig economy.', 'The Mind-Body Connection: Exploring Holistic Approaches to Health', 'Investigate the intricate relationship between men…n can lead to overall better health and wellness.', 'The Impact of Artificial Intelligence on Everyday Life', 'Explore the ways in which AI is transforming daily…uss the implications of increased AI integration.', 'Crafting a Personal Brand: Building Your Online Presence', 'Dive into the importance of personal branding in t…ia, professional platforms, and content creation.', 'The Psychology of Procrastination: Breaking the Habit Loop', 'Examine the psychological factors behind procrasti…enge, fostering productivity and personal growth.', 'Navigating Remote Work: Strategies for Success', 'With the rise of remote work, explore effective st…rong communication in a virtual work environment.', 'The Resurgence of Analog: Rediscovering the Joy of Offline Activities', 'Delve into the revival of analog hobbies and activ…oks, journaling, and engaging in hands-on crafts.', 'Culinary Adventures: Exploring Global Flavors in Your Kitchen', 'Take a culinary journey around the world, explorin… of each dish and expand your cooking repertoire.', 'The Future of Education: Innovations Shaping Learning', 'Investigate cutting-edge developments in education…hat are reshaping traditional educational models.', 'Mindful Parenting: Nurturing Resilient and Happy Children', "Explore the principles of mindful parenting, offer…supportive environment for children's well-being.", 'Exploring Urban Gardening: Bringing Green Spaces to the City', 'Discover the joys and benefits of urban gardening,…ironments and promoting a connection with nature.', 'Digital Detox: Reclaiming Balance in a Hyperconnected World', 'Discuss the importance of unplugging from digital …l tips for a successful digital detox experience.', 'The Evolution of E-Commerce: Trends Shaping Online Shopping', 'Investigate the latest trends in e-commerce, from …places, and their impact on the future of retail.', 'The Science of Happiness: Strategies for a Fulfilling Life', 'Explore the scientific principles behind happiness…sitive mindset and living a more fulfilling life.', 'The Art of Effective Communication: Building Stronger Connections', 'Delve into the fundamentals of communication, offe… in both personal and professional relationships.', 'Tech for Good: Innovations Addressing Global Challenges', 'Highlight technological innovations that are makin…e, healthcare accessibility, and social equality.', 'The Power of Habit: Transforming Your Routine for Success', 'Explore the science of habits and provide insights…ation to achieve personal and professional goals.', 'Rising Trends in Sustainable Fashion: A Greener Wardrobe', 'Investigate the growing movement towards sustainab…of conscious consumerism in the fashion industry.', 'The Art of Storytelling: Crafting Compelling Narratives', 'Dive into the elements of storytelling, offering t…in writing, public speaking, or content creation.', 'Adventure Travel: Beyond the Tourist Trail', 'Inspire wanderlust with a guide to adventurous tra… provide a unique and enriching travel adventure.', "The Science Behind a Good Night's Sleep: Tips for Quality Rest", 'Explore the importance of sleep for overall well-b…ep quality and establishing healthy sleep habits.', 'The Rise of Eco-Friendly Living: Sustainable Practices for a Greener Future', 'Delve into eco-friendly living practices, from red…uals can contribute to a more sustainable future.'
]
const loremIpsumWords = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua']

function generateLoremIpsum(length) {
    let loremText = ''
    
    for (let w = 0; loremText.length < length; w++)
        loremText += loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)] + ' '

    return loremText.trimEnd()
}

function addArticle(link) {
    lock = false
    article.innerHTML +=  count * 2 < articles.length ?
        `<a${link ? " href='" + link + "'" : ""}><p class="corner">${count+1}</p><h2>${articles[count*2]}</h2><p>${articles[count*2+1]}</p></a>` :
        `<a><p class="corner">${count+1}</p><h2>${generateLoremIpsum(15)}</h2><p>${generateLoremIpsum(150 + Math.random() * 30)}.</p></a>`
    count ++

    let div = article.querySelector("a:last-of-type")
    div.style.display = div.innerText.includes(input.value) ? "" : "none"
}
addArticle("meteo/meteo2.html")
addArticle("planning/planning.html")
addArticle("quiz/quiz.html?quiz=1")
addArticle()

function isScrollOut() {
    var hauteurTotale = document.documentElement.scrollHeight
    var hauteurVisible = window.innerHeight
    var positionScroll = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0)
    //console.log(hauteurTotale - hauteurVisible - positionScroll, 1 < 46)
    return hauteurTotale - hauteurVisible - positionScroll < 46
}

document.addEventListener("scroll", e => {
    if (lock) return
    
     if (isScrollOut()) {
        lock = true

        setTimeout(() => {
            if (input.value == "") {
                addArticle()
                addArticle()
            } else while (isScrollOut() && count < 30) {
                addArticle()
            }
            if (isScrollOut() && input.value != "") {
                document.querySelector(".dot-container > p").hidden = ""
                for (let e of document.querySelectorAll(".dot-container > .dot"))
                    e.hidden = "true"
            } else {
                lock = false
                document.querySelector(".dot-container > p").hidden = "true"
                for (let e of document.querySelectorAll(".dot-container > .dot"))
                    e.hidden= ""
            }
        }, 800 + Math.random() * 400)
    }
})

input.onkeydown = (e) => {
    requestAnimationFrame( () => {
        console.log("tEst")
        lock = true
        let articles_div = article.querySelectorAll("a")
        for (let div of articles_div)
            div.style.display = div.innerText.includes(input.value) ? "" : "none"
        
        while (isScrollOut() && count < 30) {
            addArticle()
        }

        if (isScrollOut() && input.value != "") {
            document.querySelector(".dot-container > p").hidden = ""
            for (let e of document.querySelectorAll(".dot-container > .dot"))
                e.hidden = "true"
        } else {
            lock = false
            document.querySelector(".dot-container > p").hidden = "true"
            for (let e of document.querySelectorAll(".dot-container > .dot"))
                e.hidden = ""
        }
    })
}