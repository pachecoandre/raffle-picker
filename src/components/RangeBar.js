import React from 'react'

const RangeBar = (props) => (
   <div>
      <form onSubmit={props.handlePickWinner}>
         Nº inferior
         <input type="number" name="lowerNumber"></input>
         Nº superior
         <input type="number" name="superiorNumber"></input>
         <button>Sortear</button>
      </form>
   </div>
)

export default RangeBar

// export default class RangeBar extends React.Component {
//    handlePickWinner = (event) => {
//       event.preventDefault()
//       const lowerNumber = parseInt(event.target.elements.lowerNumber.value)
//       const superiorNumber = parseInt(event.target.elements.superiorNumber.value)
//       if (!lowerNumber || !superiorNumber) {
//          return alert(`Por favor informe o número inferior e superior`)
//       }
//       if (lowerNumber >= superiorNumber) {
//          return alert(`O número superior não pode ser menor que o inferior`)
//       }
//       console.log(this.state)
//       // const randomNum = Math.floor(Math.random() * this.state.prizes.length)
//       // const prize = this.state.prizes[randomNum]

//       alert()

//    }
//    render() {
//       return (
//          <div>
//             <form onSubmit={this.handlePickWinner}>
//                Nº inferior
//                <input type="number" name="lowerNumber"></input>
//                Nº superior
//                <input type="number" name="superiorNumber"></input>
//                <button>Sortear</button>
//             </form>
//          </div>
//       )
//    }
// }