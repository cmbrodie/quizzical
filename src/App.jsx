import { useEffect, useState } from 'react'
import StartScreen from './components/StartScreen'
import QuizScreen from './components/QuizScreen'
import Question from './components/Question'
import Choices from './components/Choices'
import blueBlob from '../images/blobs.png'
import yellowBlob from '../images/blob 5.png'
import './App.css'
import { nanoid } from 'nanoid'

function App() {
    const [quizStarted, setQuizStarted] = useState(false)

    function startQuiz() {
        setQuizStarted(true)
    }
    const [gameState, setGameState] = useState([])
    const [score, setScore] = useState(0)
    const [isScored, setIsScored] = useState(false)
    const [newGame, setNewGame] = useState(false)

    function decodeHtml(html) {
        let txt = document.createElement('textarea')
        txt.innerHTML = html
        return txt.value
    }
    function createChoice(choice, isCorrect, questionIndex) {
        return {
            value: decodeHtml(choice),
            isSelected: false,
            isCorrect: isCorrect,
            id: nanoid(),
            questionIndex: questionIndex
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            const fdata = await response.json();

            const newGameState = fdata.results.map((res, index) => {
                let correct_answer = createChoice(res.correct_answer, true, index)
                let incorrect_answers = res.incorrect_answers.map(a => createChoice(a, false, index))
                let choices = [correct_answer, ...incorrect_answers]
                choices = choices.sort((a, b) => 0.5 - Math.random())
                return {
                    question: res.question,
                    choices: choices,
                    answer: res.correct_answer,
                };
            });
            setGameState(newGameState)
            setNewGame(false)
        }
        fetchData()
    }, [newGame])

    function selectChoice(id) {
        setGameState(oldGame => {
            const choice = oldGame.flatMap(obj => obj.choices).find(choice => choice.id === id)
            return oldGame.map((obj, index) => {
                if (index === choice.questionIndex) {
                    let newChoices = obj.choices.map(choice => {
                        if (choice.id === id) {
                            return { ...choice, isSelected: true };
                        } else {
                            return { ...choice, isSelected: false };
                        }
                    })
                    return { ...obj, choices: newChoices }
                } else {
                    return obj
                }
            })
        })
    }

    function scoreGame() {

        let numCorrect = gameState.flatMap(obj => {
            return obj.choices.filter(choice => choice.isSelected && choice.isCorrect)

        }).length

        setScore(numCorrect)
        setIsScored(true)
    }
    function resetGame() {
        setScore(0)
        setIsScored(false)
        setQuizStarted(false)
        setNewGame(true)
    }
    const quizState = gameState.map((item, index) => {
        return (
            <div key={index} className="quiz-question">
                <Question question={decodeHtml(item.question)} />
                <Choices choices={item.choices} selectChoice={selectChoice} isScored={isScored} />
            </div>

        )

    })

    return (
        <div className='background'>
            <img className={`yellow-blob blob ${quizStarted ? 'yellow-blob-small' : ''}`} src={yellowBlob} alt="yellow blob" />
            {!quizStarted ?
                <StartScreen startQuiz={startQuiz} /> :
                <QuizScreen
                    quizState={quizState}
                    scoreGame={scoreGame}
                    isScored={isScored}
                    score={score}
                    resetGame={resetGame}
                />}
            <img className={`blue-blob blob ${quizStarted ? 'blue-blob-small' : ''}`} src={blueBlob} alt="blue blob" />
        </div>
    )
}

export default App
