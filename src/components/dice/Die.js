import React from 'react'
import styles from './Die.module.css'

export default function Die(props) {

    function handleClick () {
        props.selectDie(props.die)
    }
  return (
    <div 
        className={`${styles.die}${props.die.isHeld ? ` ${styles.held}` : ''}`}
        onClick={handleClick}
    >
        {props.die.value}
    </div>
  )
}
