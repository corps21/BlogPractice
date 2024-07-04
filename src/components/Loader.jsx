/* eslint-disable react/prop-types */
import Container from "./Container"

function Loader({className=""}) {
  return (
    <Container className={`text-9xl flex items-center justify-center ${className}`}>Loading...</Container>
  )
}

export default Loader