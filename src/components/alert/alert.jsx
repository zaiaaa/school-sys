import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "./style.css"

const Alert = ({errorMessage, open}) => {



  return (
    <div className='ct-alert' >
        <div className='alert show'>
            {<FontAwesomeIcon icon={faTriangleExclamation} />} {errorMessage}
        </div>
    </div>

  )
}

export {Alert}
