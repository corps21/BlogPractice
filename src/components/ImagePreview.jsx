/* eslint-disable react/prop-types */
import Label from "./Label"

function ImagePreview({src="", className="", ...props}) {
  return (
    <div className={`${className} mb-[2rem]`}>
        <Label label="Current Image"/>
        <img src={src} alt="" className={`rounded-[8px] min-w-[14rem] md:max-w-[20.5rem] aspect-square ${className}`} {...props}/>
    </div>
  )
}

export default ImagePreview