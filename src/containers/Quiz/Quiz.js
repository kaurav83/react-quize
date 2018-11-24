import React, { Component } from 'react';
import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
    state = {
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                answers: [
                    {text: "Синий", id: 1},
                    {text: "Красный", id: 2},
                    {text: "Зеленый", id: 3},
                    {text: "Желтый", id: 4},
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        console.log('Anawer id', answerId)
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответь на все вопросы</h1>
                    <ActiveQuiz 
                        answers={this.state.quiz[0].answers} 
                        question={this.state.quiz[0].question}
                        onAnswerClick={this.onAnswerClickHandler}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz;