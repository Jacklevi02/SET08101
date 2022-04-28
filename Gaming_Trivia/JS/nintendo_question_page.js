const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName('choiceText'))
const progressText = document.getElementById('progressText')
const scoreText = document.getElementById('score')
const progressBarFull = document.getElementById('progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What year was Nintendo founded?",
        choice1: '1887',
        choice2: '1885',
        choice3: '1889',
        choice4: '1890',
        answer: 3,
    },
    {
        question: "What games console did Nintendo release in  1983?",
        choice1: 'Nintendo GameCube',
        choice2: 'Nintendo 64',
        choice3: 'Super Nintendo Entertainment System',
        choice4: 'Nintendo Entertainment System',
        answer: 4,
    },
    {
        question: "The charcater Jumpman from the first ever game to have a jumping player was later renamed to what?",
        choice1: 'Mario',
        choice2: 'Samus Aran',
        choice3: 'Luigi',
        choice4: 'Link',
        answer: 1,
    },
    {
        question: "What game was the first game that allowed the player character to jump?",
        choice1: 'Super Mario',
        choice2: 'Donkey Kong',
        choice3: 'The Legend of Zelda',
        choice4: 'Metroid',
        answer: 2,
    },
    {
        question: "What Nintendo video game first made use of the Super FX chip?",
        choice1: 'Pokemon GO',
        choice2: 'Dragon Quest',
        choice3: "Luigi's Mansion",
        choice4: 'Star Fox',
        answer: 4,
    },
    {
        question: "What year was the Nintendo 3DS released?",
        choice1: '2010',
        choice2: '2012',
        choice3: '2014',
        choice4: '2016',
        answer: 3,
    },
    {
        question: "Which game is Nintendos first electromechanical game?",
        choice1: 'EVR Race',
        choice2: 'Harness Racing',
        choice3: 'The Derby',
        choice4: 'Whac-a-mole',
        answer: 1,
    },
    {
        question: "Which is the best selling Nintendo handheld console of all time?",
        choice1: 'Nintendo 3DS',
        choice2: 'Gameboy',
        choice3: 'Nintendo DS',
        choice4: 'Nintendo Switch',
        answer: 3,
    },
    {
        question: "Which is the best selling Nintendo exclusive game of all time?",
        choice1: 'Super Mario Bros 3',
        choice2: 'Wii Sports',
        choice3: 'The Legend of Zelda',
        choice4: 'Splatoon',
        answer: 2,
    },
    {
        question: "Which was the first Nintendo game with Princess Zelda as a playable character?",
        choice1: "Zelda's Adventure",
        choice2: "The Legend of Zelda: Link's awakening",
        choice3: 'Zelda: Wand of Gamelon',
        choice4: 'Zelda II: The Adventure of Link',
        answer: 3,
    },
    {
        question: "Which game does Super Mario first encounter the poinson mushroom?",
        choice1: 'Super Mario Bros: The Lost Levels',
        choice2: 'Super Mario 64',
        choice3: 'Mario Clash',
        choice4: 'Super Mario Sunshine',
        answer: 1,
    },
    {
        question: "In Mario Party, who owns the engine room board?",
        choice1: 'Mario',
        choice2: 'Luigi',
        choice3: 'Peach',
        choice4: 'Toad',
        answer: 2,
    },
    {
        question: "Which Mario Kart did R.O.B the robot appear in?",
        choice1: 'Mario Kart 8',
        choice2: 'Mario Kart Wii',
        choice3: 'Mario Kart DS',
        choice4: 'Mario Kart Super Circuit',
        answer: 3,
    },
    {
        question: "What condition do Bitter Berries Cure in Pokemon?",
        choice1: 'Burn',
        choice2: 'Paralysis',
        choice3: 'Poison',
        choice4: 'Confusion',
        answer: 4,
    },
    {
        question: "How many bosses are there in Donkey Kong Country?",
        choice1: '7',
        choice2: '6',
        choice3: '5',
        choice4: '4',
        answer: 1,
    },
    {
        question: "Which year was the year of Luigi?",
        choice1: '2012',
        choice2: '2013',
        choice3: '2014',
        choice4: '2015',
        answer: 2,
    },
    {
        question: "What was the Gamecubes code name?",
        choice1: 'Project Clown Fish',
        choice2: 'Project Shark',
        choice3: 'Project Dolphin',
        choice4: 'Projecy Whale',
        answer: 3,
    },
    {
        question: "Which pro baseball team did nintendo become a majority owner of in 1992?",
        choice1: 'Tampa Bay Rays',
        choice2: 'Kansas City Royals',
        choice3: 'Oakland Athletics',
        choice4: 'Seattle Mariners',
        answer: 4,
    },
    {
        question: "Which film inspired the enemies in Nintendo's Metroid series?",
        choice1: 'Galaxy of Terror',
        choice2: 'Alien',
        choice3: 'Star Wars',
        choice4: 'Predator',
        answer: 2,
    },
    {
        question: "What was the first NES game to use the Konami code?",
        choice1: 'Life Force',
        choice2: 'Gradius',
        choice3: 'Contra',
        choice4: 'R-type',
        answer: 2,
    }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('../html/nintendo_end.html')
    }

    questionCounter++
    progressText.innerText = `question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const quesntionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[quesntionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(quesntionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e=> {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
            
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()