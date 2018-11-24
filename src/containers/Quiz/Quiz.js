import React, { Component } from 'react';
import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {
    state = {
        activeQuestion: 0,
        isFinished: true,
        answerState: null, // {[id]: 'success' or 'error'}
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 1,
                id: 1,
                answers: [
                    {text: "Синий", id: 1},
                    {text: "Красный", id: 2},
                    {text: "Зеленый", id: 3},
                    {text: "Желтый", id: 4},
                ]
            },
            {
                question: 'В каком году основали Одессу?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: "1832", id: 1},
                    {text: "1705", id: 2},
                    {text: "1794", id: 3},
                    {text: "1911", id: 4},
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        // если дважды кликнуть на правильный ответ в первом вопросе, то в разметку придет оповещение Finished. Чтобы исправить это, надо сделать проверку, при которой клик на правильном ответе завершит данную функцию
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }
        const question = this.state.quiz[this.state.activeQuestion];

        if (question.rightAnswerId === answerId) {
            this.setState({
                answerState: {[answerId]: 'success'}
            })
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null // когда мы отвечаем правильно на вопрос, происходит переход на следующий вопрос, но состояние ответа остаётся старое, в результате первый вариант в ответах у нас помечен как успешный (зеленым). Чтобы этого не было нам надо обнулись текущий answerState
                    })
                }

                window.clearTimeout(timeout);
            }, 1000);
            
        } else {
            this.setState({
                answerState: {[answerId]: 'error'}
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответь на все вопросы</h1>
                    {
                        this.state.isFinished ? 
                            <FinishedQuiz 
                                
                            />
                            : 
                            <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }
                    
                </div>
            </div>
        )
    }
}

export default Quiz;