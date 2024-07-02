/* eslint-disable react/prop-types */

function Container({children,className="",props}) {
  return (
    <div className={`w-5/6 min-h-[85%] mx-auto ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Container
