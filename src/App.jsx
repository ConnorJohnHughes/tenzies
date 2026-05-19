
import { useState, useEffect, useRef } from 'react';
import Confetti from "react-confetti"

import './App.css'
import Die from './components/Die.jsx'
import {nanoid} from "nanoid"

function App() {

  const buttonRef = useRef(null)
  const [ diceArray, setDiceArray ] = useState(() => generateAllNewDice())

  const gameWon = diceArray.every(die => die.isheld) &&
    diceArray.every(die => die.value === diceArray[0].value)

    useEffect(() => {
      if (gameWon) {
          buttonRef.current.focus()
      }
  }, [gameWon])

  function generateAllNewDice() {
    return  new Array(10)
    .fill(0)
    .map(() => ({
      value: Math.ceil(Math.random() * 6),
      isheld: false,
      id: nanoid()
      }))
      
  } 

  function rollNewDice(){
    if (!gameWon) {
      setDiceArray(oldDice => oldDice.map(die =>
          die.isheld ?
              die :
              { ...die, value: Math.ceil(Math.random() * 6) }
      ))
  } else {
    setDiceArray(generateAllNewDice)
    }
  }

  function hold(id){
    setDiceArray(oldDice => {
      return oldDice.map(die => {
        return die.id === id ? 
        {...die, isheld: !die.isheld} : die
      })
    })

  }



 const diceNums = diceArray.map(dieO => 
  <Die 
    key={dieO.id} 
    value={dieO.value} 
    isheld={dieO.isheld} 
    hold={() => hold(dieO.id)}
  />)

  return (
    <main>
    {gameWon && <Confetti />}
    <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
    </div>
    <h1 className="title">Tenzies</h1>
    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div className="dice-container">
        {diceNums}
    </div>
    <button ref={buttonRef} className="roll-dice" onClick={rollNewDice}>
        {gameWon ? "New Game" : "Roll"}
    </button>
</main>
)
  
}

export default App

