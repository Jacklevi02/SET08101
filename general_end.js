const username = document.getElementById('username')
const saveScore = document.getElementById('saveScore')
const finalScore = document.getElementById('finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORE = 10

let type = 'general'

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScore.disabled = !username.value
})

saveHighScore = event => {
    event.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value,
        type: type
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(10)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('index.html')
}