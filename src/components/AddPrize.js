import React from 'react'

export default class AddPrize extends React.Component {
   handleAddPrize = (event) => {
      event.preventDefault()

      const prize = event.target.elements.prize.value.trim()
      const inputPrize = this.props.handleAddPrize(prize)

      // this.setState(() => ({inputPrize}))
      if (!inputPrize) {
         event.target.elements.prize.value = ''
      }
   }
   render() {
      return (
         <div>
            <form onSubmit={this.handleAddPrize}>
               <input type="text" name="prize"></input>
               <button>Adicionar</button>
            </form>
         </div>
      )
   }
}