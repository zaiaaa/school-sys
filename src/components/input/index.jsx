import React from 'react'
import { Controller } from 'react-hook-form'
import "./style.css"

const Input = ({name, errorMessage, control, ...rest}) => {
  return (
    <>
        <Controller name={name}
        control={control}
        rules={{required: true}}
        render={({field: {value, onChange}}) => <input className='input' value={value} onChange={onChange} {...rest}/>}
        />
        {errorMessage ? <p>{errorMessage}</p> : null}
    </>
  )
}


export {Input}