import React from 'react'

export default class RangeBar extends React.Component {
   handlePickWinner = (event) => {
      event.preventDefault()
      const lowerNumber = event.target.elements.lowerNumber.value.trim()
      const superiorNumber = event.target.elements.superiorNumber.value.trim()
      if (lowerNumber >= superiorNumber) {
         return alert(`O número inferior não pode ser menor que o inferior`)
      }
      const randomNum = Math.floor(Math.random() * this.state.prizes.length)
      const prize = this.state.prizes[randomNum]

      alert()

   }
   render() {
      return (
         <div>
            <form onSubmit={this.handlePickWinner}>
               Nº inferior
               <input type="number" name="lowerNumber"></input>
               Nº superior
               <input type="number" name="superiorNumber"></input>
               <button>Sortear</button>
            </form>
         </div>
      )
   }
}