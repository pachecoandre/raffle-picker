import React from 'react'

export default class RangeBar extends React.Component {
   handlePickWinner = (event) => {
      event.preventDefault()
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