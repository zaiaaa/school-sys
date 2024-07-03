import React from 'react'
import { useParams } from 'react-router-dom';


const Troca = () => {
    const {rm} = useParams();
  
   return (
    <div>Troca de senha do {rm}</div>
  )
}

export {Troca}