import "./Die.css"

// eslint-disable-next-line react/prop-types
export default function Dice({ value, isHeld, holdDice }) {
  return (
    <div className={"die " + (isHeld ? "green" : "white")} onClick={holdDice}>
      <h2>{value}</h2>
    </div>
  )
}
