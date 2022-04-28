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
        question: "On which planet did humans first encounter the Covenant?",
        choice1: 'Onyx',
        choice2: 'Earth',
        choice3: 'Harvest',
        choice4: 'Reach',
        answer: 3,
    },
    {
        question: "ON Noble Team, who is the only Spartan-II?",
        choice1: 'Nobel Six',
        choice2: 'Kat',
        choice3: 'Jun',
        choice4: 'Jorge',
        answer: 4,
    },
    {
        question: "What is Cortana's AI serial number?",
        choice1: 'CTN 0452-9',
        choice2: 'CTN 0429-1',
        choice3: 'CTN 1178-3',
        choice4: 'CTN 8271-2',
        answer: 1,
    },
    {
        question: "What is the designation given to Sparten-IIs after they die?",
        choice1: 'Prisoner of War (POW)',
        choice2: 'Missing in Action (MIA)',
        choice3: 'Wounded in Action (WIA)',
        choice4: 'Killed in Action (KIA)',
        answer: 2,
    },
    {
        question: "What weapon was used to kill Kat in Halo: Reach?",
        choice1: 'A Brute Shot',
        choice2: 'A Needler',
        choice3: 'A Beam Rifle',
        choice4: 'A Needle Rifle',
        answer: 4,
    },
    {
        question: "After creation, rampancy in Human Artificial Intelligence generally beigns how long into their lifespan?",
        choice1: '4 years',
        choice2: '5 years',
        choice3: '6 years',
        choice4: '7 years',
        answer: 4,
    },
    {
        question: "According to the Covenant's religion, what is The Great Journey?",
        choice1: 'An acension to godhood',
        choice2: 'The journey to the Ark',
        choice3: 'A journey across the galaxy',
        choice4: 'A pilgrimage to specific planets',
        answer: 1,
    },
    {
        question: "What is Arbiters real name?",
        choice1: "Thel 'vadam'",
        choice2: "Thall 'Vadem",
        choice3: "Thal 'Vadem",
        choice4: "Thele 'Vaddon",
        answer: 3,
    },
    {
        question: "What other game series has connections to the Halo universe?",
        choice1: 'Doom',
        choice2: 'Marathon',
        choice3: 'Half Life',
        choice4: 'Mass Effect',
        answer: 2,
    },
    {
        question: "What was the original format for Halo: Combat Evolved?",
        choice1: 'Survival',
        choice2: 'First Person Shooter',
        choice3: 'Real Time Strategy',
        choice4: 'Role Playing Game',
        answer: 3,
    },
    {
        question: "Who built the Halo devices?",
        choice1: 'The Forerunners',
        choice2: 'The Humans',
        choice3: 'The Flood',
        choice4: 'The Covenant',
        answer: 1,
    },
    {
        question: "What is installation 00 better known as?",
        choice1: 'The Artifact',
        choice2: 'The Ark',
        choice3: 'The first Halo device',
        choice4: 'The first iteration of Spartans',
        answer: 2,
    },
    {
        question: "What is Master Chief's real name?",
        choice1: 'Alex',
        choice2: 'James',
        choice3: 'John',
        choice4: 'Ryan',
        answer: 3,
    },
    {
        question: "What is the name of the Covenant ship in the beginning of Halo: Combat Involved?",
        choice1: 'The Ascension',
        choice2: 'The Journeyman',
        choice3: 'In Amber Clad',
        choice4: 'The Pillar of Autumn',
        answer: 4,
    },
    {
        question: "How many bosses are there in Halo Infinite?",
        choice1: '8',
        choice2: '9',
        choice3: '10',
        choice4: '11',
        answer: 1,
    },
    {
        question: "What type of armour does the Master Chief wear during Halo: Combat Evolved?",
        choice1: 'MJOLNIR Mark IV',
        choice2: 'MJOLNIR Mark V',
        choice3: 'MJOLNIR Mark VI',
        choice4: 'MJOLNIR Mark VII',
        answer: 2,
    },
    {
        question: "Which of the following is not an alien race in alliance of the Covenant?",
        choice1: 'Elites',
        choice2: 'Jackals',
        choice3: 'The Flood',
        choice4: 'Hunters',
        answer: 3,
    },
    {
        question: "At the ONI Ordnance testing facility, they designed and tested variants of the MJOLNIR mark V armor to be used by whom?",
        choice1: "ODST's",
        choice2: 'Spartans',
        choice3: 'Recon S&D Spartans',
        choice4: "Spartan II's",
        answer: 4,
    },
    {
        question: "Where and when was the first Covenant attack against the human race?",
        choice1: 'Reach 2611',
        choice2: 'Harvest 2525',
        choice3: 'Jovian Moons 2645',
        choice4: 'South America 2552',
        answer: 2,
    },
    {
        question: "Of the covenants leadership caste known as the prophets, how many known prophets are there?",
        choice1: '5',
        choice2: '4',
        choice3: '3',
        choice4: '7',
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
        return window.location.assign('halo_end.html')
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
    choice.addEventListener('click', selected => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = selected.target
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