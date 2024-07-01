import React from 'react'

function Label({label, className="", ...props}) {
  return (
    <label className={`text-bold text-xl ${className}`} {...props}>{label}</label>
  )
}

export default Label