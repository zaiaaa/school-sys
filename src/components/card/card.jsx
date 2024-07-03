import React from 'react'
import "./style.css"

const CardG = ({children, className}) => {
  return (
    <div className={`cardg ${className}`}>
        {children}
    </div>
  )
}

export {CardG}