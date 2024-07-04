/* eslint-disable react/prop-types */
import Container from "./Container"

function Loader({className="",props}) {
  return (
    <Container className={`text-9xl flex items-center justify-center ${className}`} {...props} >Loading...</Container>
  )
}

export default Loader