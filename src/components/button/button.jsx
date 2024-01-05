import React from 'react'
import "./style.css"

const Button = ({type, text, variant}) => {
  return (
    <button className={variant} type={type}>{text}</button>
  )
}

export {Button}