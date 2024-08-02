/* eslint-disable react/prop-types */

function Loader({className="",props}) {
  return (
    <div className={` max-w-[12rem] mx-auto my-[12rem] text-center text-[3rem] ${className}`} {...props}>
      Loading...
    </div>
  )
}

export default Loader