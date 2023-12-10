
const RADIO = 1, CHECKBOX = 2, NUMBER = 3, DATE = 4, COLOR = 5, RANGE = 6, TEXT = 7

const quizs = [
    {
        dificulty: 0, points: 0, label: "?",
        questions: [
            // [ "Who is Napoleon", RADIO, 1, ["A King", "An Emperor", "My father"], 2 ]
            {
                text: "Who is Napoleon",
                type: RADIO, points: 1,
                answers: ["A King", "An Emperor", "My father"], good: 2
            },
            {
                text: "Which are my favourite languages ?",
                type: CHECKBOX, points: 2,
                answers: ["HTML", "CSS", "JS"], good: 4
            },
            {
                text: "How many Titouans exists in the class ?",
                type: NUMBER, param:"min=0 max=20 value=0", good: 1, points: 4,
            },
            {
                text: "When is the 11 sept. event come ?",
                type: DATE, good: "2001-09-11", points: 3,
            },
            {
                text: "How happy are you with this super quizz ?",
                type: RANGE, points: 0, param: "min=0 max=10 step=0 value=10 oninput='this.nextElementSibling.value = 1 + ~~this.value;this.value=10'"
            }
        ]
    },
    {
        dificulty: 0, points: 0, label: "Programming",
        questions: [
            {
                text: "Quel est le langage de programmation principalement utilisé pour le développement web côté client ?",
                type: RADIO,
                points: 2,
                answers: ["Java", "Python", "JavaScript", "Ruby"],
                good: 2
            },
            {
                text: "Combien d'octets sont généralement présents dans un kilo-octet (Ko) ?",
                type: NUMBER,
                points: 1,
                param: "min=0 max=9999999 value=0",
                good: 1024
            },
            {
                text: "Quel est le principal avantage de l'utilisation de Git dans le développement logiciel ?",
                type: RADIO,
                points: 3,
                answers: ["Suivi des versions", "Gestion des bases de données", "Traitement d'images"],
                good: 0
            },
            {
                text: "Quand est-ce que le langage de programmation Python a été créé (date de 1er version) ?",
                type: DATE,
                points: 2,
                good: "1991-02-20"
            },
            {
                text: "Quels sont les types de données de base en JavaScript ?",
                type: CHECKBOX,
                points: 2,
                answers: ["Number", "String", "Boolean", "Array"],
                good: [0, 1, 2]
            },
            {
                text: "Quelle est la couleur par défaut d'un lien non visité en HTML ?",
                type: COLOR,
                points: 1,
                good: "#0000ff"
            },
            {
                text: "Qu'est-ce que l'acronyme SQL représente dans le domaine de la programmation ?",
                type: RADIO,
                points: 3,
                answers: ["Structured Query Language", "Simple Query Language", "Scripted Question Language"],
                good: 0
            },
            {
                text: "Combien de bits sont présents dans un octet ?",
                type: RANGE,
                points: 2,
                param: "min=0 max=128 step=1", default: 0,
                good: 8
            },
            {
                text: "Quel est le rôle de l'instruction 'else' dans une structure de contrôle en programmation ?",
                type: RADIO,
                points: 3,
                answers: ["Elle définit une condition alternative.", "Elle déclare une variable.", "Elle boucle sur un ensemble d'instructions."],
                good: 0
            },
            {
                text: "Quelles sont des plates-formes de déploiement couramment utilisées pour les applications web ?",
                type: CHECKBOX,
                points: 1,
                answers: ["Heroku", "Azure", "Amazon Web Services (AWS)", "WhatsApp"],
                good: [0, 1, 2]
            }
        ]
    }
]
