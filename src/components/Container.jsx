import React from 'react'

function Container({children,className="",props}) {
  return (
    <div className={`w-5/6 h-[85%] mx-auto ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Container
