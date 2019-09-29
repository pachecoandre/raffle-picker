import React from 'react'
import Prize from './Prize'

const Prizes = (props) => (
   <div>
      <p>
         <b>Prêmios</b>
         <button>Remover Todos</button>
      </p>
      {
         props.prizes.map((element, index) => (
            <Prize
               key={index}
               prizeText={element}
               count={index + 1}
               handleDeletePrize={props.handleDeletePrize}
            />
         ))
      }
   </div>
)

export default Prizes