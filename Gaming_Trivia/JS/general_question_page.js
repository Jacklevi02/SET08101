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
        question: "The video game Animal Crossing: New Horizons was released on which console?",
        choice1: 'Xbox 1',
        choice2: 'Playstation 4',
        choice3: 'Nintendo Switch',
        choice4: 'Wii U',
        answer: 3,
    },
    {
        question: "Which games publisher released the Assasains Creed series?",
        choice1: 'Sony',
        choice2: 'Activision Blizzard',
        choice3: 'Konami',
        choice4: 'Ubisoft',
        answer: 4,
    },
    {
        question: "Who does Mario fight at the end of Super Mario 64",
        choice1: 'Bowser',
        choice2: 'Donkey Kong',
        choice3: 'Ludwig von Kuppa',
        choice4: 'Wiggler',
        answer: 1,
    },
    {
        question: "Which popular superhero is the main character of the video game Arkham Asylum?",
        choice1: 'Iron Man',
        choice2: 'Batman',
        choice3: 'Superman',
        choice4: 'Nightwing',
        answer: 2,
    },
    {
        question: "What type of creature is Alduin, the main villain in the video game The Elder Scrolls V: Skyrim?",
        choice1: 'Sahrotaar',
        choice2: 'Durnehviir',
        choice3: 'Odahviing',
        choice4: 'Alduin',
        answer: 4,
    },
    {
        question: "What is the best selling video game of all time, as of April 2021?",
        choice1: 'Call of Duty',
        choice2: 'Halo',
        choice3: 'Minecraft',
        choice4: 'Super Mario',
        answer: 3,
    },
    {
        question: "Ryu is the main protagonist of which video game series?",
        choice1: 'Street Fighter',
        choice2: 'Tekken',
        choice3: 'Mortal Kombat',
        choice4: 'Killer Instinct',
        answer: 1,
    },
    {
        question: "In which year was the original playstation released?",
        choice1: '2005',
        choice2: '1998',
        choice3: '1994',
        choice4: '1990',
        answer: 3,
    },
    {
        question: "Complete the name of this popular video game from 2007: 'Call of Duty 4:..............'?",
        choice1: 'Black Ops',
        choice2: 'Modern Warfare',
        choice3: 'Advanced Warfare',
        choice4: 'World at War',
        answer: 2,
    },
    {
        question: "Actor Keanu Reeves played the character Johnny Silverhand in which video game released in 2022?",
        choice1: "Assasain's Creed Valhalla",
        choice2: 'The Last of Us Part II',
        choice3: 'Cyberpunk 2077',
        choice4: 'Call of Duty: Black Ops Cold War',
        answer: 3,
    },
    {
        question: "What is the name given to the technologically advanced collective of alien races that fight in a war against humanity in the Halo game series?",
        choice1: 'The Covenant',
        choice2: 'The Locust Horde',
        choice3: 'The Typhoon',
        choice4: 'The Fallen',
        answer: 1,
    },
    {
        question: "Cyrodiil and Skyrim are provinces in which fictional continent that features in the Elder Scrolls video game series?",
        choice1: 'Rapture',
        choice2: 'Tamriel',
        choice3: 'Middle-earth',
        choice4: 'The Citadel',
        answer: 2,
    },
    {
        question: "Which popular video game series is known as Biohazard in Japan?",
        choice1: 'Prey',
        choice2: 'Silent Hill',
        choice3: 'Resident Evil',
        choice4: 'Until Dawn',
        answer: 3,
    },
    {
        question: "In which video game do you play as scientist Gordon Freeman as you try to escape the Black Mesa Research Facility after it's invaded by aliens?",
        choice1: 'Counter Strike',
        choice2: 'Left 4 Dead',
        choice3: 'Portal',
        choice4: 'Half-Life',
        answer: 4,
    },
    {
        question: "What is the name of Kratos' son in the video game God of War?",
        choice1: 'Atreus',
        choice2: 'Thyestes',
        choice3: 'Ares',
        choice4: 'Apollo',
        answer: 1,
    },
    {
        question: "The video game Tetris was developed in which county?",
        choice1: 'Scotland',
        choice2: 'Russia',
        choice3: 'Sweden',
        choice4: 'Japan',
        answer: 2,
    },
    {
        question: "Skolas is a boss that players would face in which video game?",
        choice1: 'Lost Ark',
        choice2: 'Warframe',
        choice3: 'Destiny',
        choice4: 'Elden Ring',
        answer: 3,
    },
    {
        question: "Which species is Abe in the video game Oddworld:Abe's Oddysee?",
        choice1: 'Khajiit',
        choice2: 'Asari',
        choice3: 'Cabal',
        choice4: 'Mudokon',
        answer: 4,
    },
    {
        question: "What is the name of the revolutionary militia group that was led by Marlene in the video game The Last of Us?",
        choice1: 'Brotherhood of Steel',
        choice2: 'Fireflies',
        choice3: 'Steel Meridian',
        choice4: 'Maelstrom',
        answer: 2,
    },
    {
        question: "What is the name of the fictional Gothic city that is the setting for the video game Bloodborne?",
        choice1: 'The Kingdom of Lordran',
        choice2: 'Yharnam',
        choice3: 'Morrowind',
        choice4: 'Dunwall',
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
        return window.location.assign('../html/general_end.html')
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