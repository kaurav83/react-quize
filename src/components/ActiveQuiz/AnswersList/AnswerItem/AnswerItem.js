import React from 'react';
import classes from './AnswerItem.css';

const AnswerItem = (props) => {
    const cls = [classes.AnswerItem];
    if (props.state) { // в зависимости от 'success' или 'error', которые определил в функциии компонента Quiz.js
        cls.push(classes[props.state]);
    }
    return (
        <li 
            className={cls.join(' ')} 
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            {props.answer.text}
        </li>
    );
};

export default AnswerItem;