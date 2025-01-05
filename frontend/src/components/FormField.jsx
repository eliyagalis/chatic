import React from 'react'

const FormField = ({type, value, placeholder, onChange, error}) => {
  return (
    
    <div>
        <input
            className={!error ? "log-field" : "log-field error"}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            />
        {error &&<div>
            <div className="error-message">{error}</div>
            <br />
        </div>}
    </div>
  )
}

export default FormField