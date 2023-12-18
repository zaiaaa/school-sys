import "./style.css"

import React from 'react'

const NewsContainer = ({img, txt, title}) => {
  return (
    <div className="container">
        <div className="ct-img">
            <img src={img} alt="" />
        </div>
        <div className="text">
            <h1>{title}</h1>
            <p>{txt}</p>
        </div>
    </div>
  )
}

export {NewsContainer}

