import React from 'react'
import Die from '../dice/Die'
import styles from './DieContainer.module.css'

export default function DieContainer(props) {
    
    const dieElements = props.dice.map(die => {
        return <Die 
            key={die.id} 
            die={die}
            selectDie={props.selectDie}
        />
    })


    return (
        <div className={styles.container}>
            {dieElements}
        </div>
    )
}
