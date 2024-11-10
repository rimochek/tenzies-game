import Die from "./components/Die"
import "./App.css"
import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  function allNewDice() {
    const diceList = []
    for (let i = 0; i < 10; i++) {
      diceList.push({
        id: nanoid(),
        number: Math.ceil(Math.random() * 6),
        isHeld: false,
      })
    }
    return diceList
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld
          ? die
          : { ...die, number: Math.ceil(Math.random() * 6) }
      })
    )
  }

  function resetGame() {
    setDice(allNewDice())
    setTenzies(false)
  }

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("you won")
    }
  }, [dice])

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.number}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="box">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll" onClick={tenzies ? resetGame : rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  )
}

export default App
