import React from "react"

const Cart = ({name, price, quantity = 0}) => {
  return (
    <div className="card mt-1 shadow-sm">
      <div className="card-body">
        <div className="float-right"><b>{price * quantity} FCFA</b></div>
        <div>{quantity} Quantite(s) &middot; {price} FCFA</div>
        <h5>{name}</h5>
      </div>
    </div>
  );
}

export default Cart
