/* eslint-disable react/prop-types */
import Label from "./Label"

function ImagePreview({src="", className="", ...props}) {
  return (
    <div className={`${className} mb-[2rem]`}>
        <Label label="Current Image"/>
        <img src={src} alt="" className={`rounded-xl mt-[.75rem] ${className}`} {...props}/>
    </div>
  )
}

export default ImagePreview