import './App.css';
import DieContainer from './components/dieContainer/DieContainer';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Button from './components/button/Button';

function App() {
  const [errorMessage, setErrorMessage] = useState('')
  const [level, setLevel] = useState(1)
  const [showInfo, setShowInfo] = useState(false)
  const [won, setWon] = useState(false)
  const [settings, setSettings] = useState({
    numberOfRolls: 1,
    numberOfDice: 10,
  })
  const [dice, setDice] = useState(generateDice())

  function createDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function setNumberOfRolls(increase = true) {
    setSettings(prevSettings=>({
      ...prevSettings,
      numberOfRolls: increase ? prevSettings.numberOfRolls + 1 : 1
    }))
  }

  function generateDice() {
    let newDice = []

    for (let i = 0; i < settings.numberOfDice; i++) {
      
      newDice.push(createDie())
    }

    return newDice
  }

  
  function increaseNumberOfDice() {
    setSettings(prevSettings=>({
      ...prevSettings,
      numberOfDice: prevSettings.numberOfDice * 2
    }))
  }

  function selectDie(die) {

    if (won) {
      return
    }

    updateDie(die)
  }

  function updateDie(die) {
    setDice(dice => dice.map(prevDie => {

      return prevDie.id === die.id ? {
          ...prevDie,
        isHeld: !die.isHeld
      } : prevDie
    }))
  }

  function clearError() {
    setErrorMessage('')
  }

  function rollDice() {

    setDice(prevDice=>{
      
      return prevDice.map(die=>die.isHeld ? die : createDie())
    })
  }
  console.log(settings)
  function handleButtonClicked(text = null) {
    if (text === 'reset dice') {
      setWon(false)
      setDice(generateDice())
      setNumberOfRolls(false)
      return
    }

    if (text === 'increase level') {
      setLevel(level=> level + 1)

      return
    }

    rollDice()
    setNumberOfRolls()
  }

  useEffect(()=> {
    setWon(false)
    increaseNumberOfDice()
    setDice(generateDice())
    setNumberOfRolls(false)
  }, [level])

  useEffect(()=>{
    let firstDie = dice[0]
    let hasSameValues = dice.every(die => firstDie.value === die.value)
    let allHeld = dice.every(die => die.isHeld)

    clearError()

    if (hasSameValues && allHeld) {
      setWon(true)
      return
    }

    if (allHeld && !hasSameValues) {
      setErrorMessage('you have held different values')
    }
  }, [dice])

  function toggleShowInfo() {
    setShowInfo(prevShowInfo => !prevShowInfo)
  }

  return (
    <div className="app">
        <header className='app-header'>
          <div className='app-title'>Tenzies</div> 
          <div className='app-header-span'>(level: {level})</div>
          <div className='app-header-span'>(rolls: {settings.numberOfRolls})</div>
          <div 
            className='app-info'
            onClick={toggleShowInfo}
          >i</div>
        </header>
        {
          won ? 
          <div className='app-win'>yaay! you have won</div> :
          <p className='app-paragraph'>
            this is a game that lets you select different dice till you get the same number on all the dice. enjoy
          </p>
        }
        {
          showInfo &&
          <p className='app-paragraph' onClick={toggleShowInfo}>
            this is a game that lets you select different dice till you get the same number on all the dice. enjoy
          </p>
        }
        {errorMessage.length > 0 && <div className='app-error-message'>{errorMessage}</div>}
        <DieContainer 
          dice={dice}
          selectDie={selectDie}
        />
        <div>
          <Button 
            clicked={handleButtonClicked} 
            text={won ? "reset dice" : "roll dice"}
          />
          {
            won && 
            <Button 
              clicked={handleButtonClicked} 
              text="increase level"
            />
          }
        </div>
    </div>
  );
}

export default App;
