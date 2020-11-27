import React from "react"

const PageContainer = ({children}) => {
  return (
    <>
    <div className="bg-danger text-white p-1 w-100 text-center">
      <div>RADAR PAYMENT SIMULATOR v0.0.1</div>
      <div>
        <a href="/" className="">Produits</a>&nbsp;&middot;&nbsp;<a href="/carts" className="">Voir le panier courant</a>&nbsp;&middot;&nbsp;<a href="/orders" className="">Commandes</a>
      </div>
    </div>
    <div className="container-fluid">
      {children}
    </div>
    </>
  )
}

export default PageContainer
