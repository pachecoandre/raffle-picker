import React from 'react'
import Header from './TitleBar'
import RangeBar from './RangeBar'
import Prizes from './Prizes'
import AddPrize from './AddPrize'

export default class Raffle extends React.Component {
   state = {
      prizes: [`Moto`, `Patinete`, `Mochila`]
   }
   handleAddPrize = (prize) => {
      if (!prize) {
         return 'Informe um valor válido para adicionar um prêmio'
      }
      this.setState((prevState) => ({
         prizes: prevState.prizes.concat(prize)
      }))
   }
   handleDeletePrize = (prizeToRemove) => {
      this.setState((prevState) => ({
         prizes: prevState.prizes.filter((element) => prizeToRemove !== element)
      }))
   }
   render() {
      return (
         <div>
            <Header />
            <div>
               <RangeBar
                  prizes={this.state.prizes}
               />
               <Prizes
                  prizes={this.state.prizes}
                  handleDeletePrize={this.handleDeletePrize}
               />
               <AddPrize
                  handleAddPrize={this.handleAddPrize}
               />
            </div>
         </div>
      )
   }
}