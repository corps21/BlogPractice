/* eslint-disable react/prop-types */

function Label({label, className="", ...props}) {
  return (
    <label className={`mb-1 dark:text-white ${className}`} {...props}>{label}</label>
  )
}

export default Label