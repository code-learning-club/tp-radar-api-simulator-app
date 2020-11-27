import React from "react"
import Cart from "../carts/Cart"

const Order = ({id, order_id, products = []}) => {
  let quantity = 0
  let price = 0
  
  products.forEach(product => {
    quantity += product.quantity
    price += product.price
  })

  return (
    <div className="card mt-1 shadow-sm">
      <div className="card-header" id={"heading-" + id}>
        <h2 className="mb-0">
          <button className="btn btn-block text-left" type="button" data-toggle="collapse" data-target={"#collapse-" + id} aria-expanded="true" aria-controls={"collapse-" + id}>
            <div className="float-right"><b>{price * quantity} FCFA</b></div>
            <div>{quantity} Quantite(s) &middot; {price} FCFA &middot; </div>
            <h5>ID SYS: <b>{id}</b> - ID RADAR: <b>{order_id ? order_id : 'Attente'}</b></h5>
          </button>
        </h2>
      </div>
      <div id={"collapse-" + id} className="collapse" aria-labelledby={"heading-" + id} data-parent="#accordion">
        <div className="card-body">
          {products.map((product, key) => 
            <Cart 
              name={product.name} 
              price={product.price} 
              key={key}
              quantity={product.quantity}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Order
