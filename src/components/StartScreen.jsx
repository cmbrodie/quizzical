import React from "react";

export default function StartScreen(props) {
    return (
        <div className="container--start">
            <h1>TriviaTitan</h1>
            <p className="description">Test your trivia knowledge</p>
            <button className="start-button" onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}