import React from "react";
export default function QuizScreen(props) {

    return (
        <div className="container--quiz">
            {props.quizState}
            {
                !props.isScored ?
                    <button onClick={props.scoreGame} className="button answer-button" >Check answers</button> :
                    <div className="end-screen">
                        <p className="question">You scored {props.score}/5 correct answers</p>
                        <button onClick={props.resetGame} className="button play-again-button">Play again</button>
                    </div>
            }


        </div>
    )
}