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
   handlePickWinner = (event) => {
      event.preventDefault()
      const lowerNumber = parseInt(event.target.elements.lowerNumber.value)
      const superiorNumber = parseInt(event.target.elements.superiorNumber.value)
      if (!lowerNumber || !superiorNumber) {
         return alert(`Por favor informe o número inferior e superior`)
      }
      if (lowerNumber >= superiorNumber) {
         return alert(`O número superior não pode ser menor que o inferior`)
      }
      let result = []
      this.state.prizes.forEach(element => {
         const rafNum = Math.floor(Math.random() *(superiorNumber - lowerNumber + 1) + lowerNumber)
         result.push({prize: element, number: rafNum})
      })
      let resultStr = ``
      result.forEach(element => {
        resultStr += `${element.prize} - ${element.number}\n`
      })      
      alert(resultStr)   
   }
   
   render() {
      return (
         <div>
            <Header />
            <div>
               <RangeBar
                  handlePickWinner={this.handlePickWinner}
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