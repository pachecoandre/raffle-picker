import React from 'react'

const Prize = (props) => (
   <div>
      {props.count} - {props.prizeText}
      <button
         onClick={() => props.handleDeletePrize(props.prizeText)}
      >
         remover</button>
   </div>
)

export default Prize