import React from 'react'
import { Controller } from 'react-hook-form'
import "./style.css"

const Input = ({name, control, disabled, readOnly, ...rest}) => {
  return (
    <>        
        <Controller name={name}
        control={control}
        rules={{required: true}}
        render={({field: {value, onChange}}) => <input className='input' value={value} onChange={onChange} disabled={disabled} readOnly={readOnly} {...rest}/>}
        />
    </>
  )
}


export {Input}