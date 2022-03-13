import React from 'react'
import styles from './Button.module.css'

export default function Button(props)
{
    function handleClick() {
        props.clicked(props.text)
    }

    return (
        <button
            onClick={handleClick}
            className={styles.button}
        >
            {props.text ? props.text : 'click me'}
        </button>
    )
}