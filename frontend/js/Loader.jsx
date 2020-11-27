import React from "react"

const Loader = ({ message }) => {
  return (
    <div className="row">
      <div className="col-12 h-100 w-100 p-5 text-muted text-center">
        <h2 className="text-uppercase">{message}</h2>  
      </div>
    </div>
  )
}

export default Loader
