import React, { useState } from 'react'

const Product = ({productId, name, price, addProductToCard, getProductQuantity, defaultQuantity = 0}) => {
  const [quantity, setQuantity] = useState(defaultQuantity)
  const [isRemoveButtonDisabled, setIsRemoveButtonDisabled] = useState(false)
  const onAddToCards = () => {
    addProductToCard(productId, 1)
    setQuantity(getProductQuantity(productId))
    setDisabledRemovedButton(false)
  }
  const onRemoveToCards = () => {
    if (quantity == 0) {
      setIsRemoveButtonDisabled(true)
    } else {
      addProductToCard(productId, -1)
    }
    setQuantity(getProductQuantity(productId))
  }

  return (
    <div className="col-sm-12 mt-2">
      <div className="card border-danger shadow-sm">
        <div className="card-body">
          <div className="float-right">
            <button className={"btn btn-primary btn-sm mr-2 font-weight-bold"} onClick={onRemoveToCards}>-</button>
            <button className={"btn btn-sm btn-" + (quantity == 0 ? 'secondary' : 'warning') + " mr-2 " + (quantity == 0 ? 'disabled' : '')}>
              <img src="/img/cart.svg" style={{width: 20}}/> {quantity}
            </button>
            <button className="btn btn-primary btn-sm font-weight-bold" onClick={onAddToCards}>+</button>
          </div>
          <h5 className="card-title">{name}</h5>
          <strong className="card-text">{price} FCFA</strong>
        </div>
      </div>
    </div>
  )
}

export default Product
