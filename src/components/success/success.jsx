import React from 'react'
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const Success = ({successMessage}) => {
  return (
    <div className='ct-success' >
        <div className='success show'>
            {<FontAwesomeIcon icon={faCheck} />} {successMessage}
        </div>
    </div>
  )
}

export {Success}