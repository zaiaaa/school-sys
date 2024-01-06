import React from 'react'
import "./style.css"

const Button = ({type, text, variant, onClick}) => {
  return (
    <button className={variant} onClick={onClick} type={type}>{text}</button>
  )
}

export {Button}