import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Loader from '../Loader'
import PageContainer from '../PageContainer'
import Cart from "./Cart"

const CartIndex = () => {
  const [carts, setCarts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/carts')
      .then(res => res.json())
      .then(data => {
        setCarts(data)
        setIsLoaded(true)
      })
  }, [])

  const onClearCart = () => {
    fetch('/api/carts/clear', {
      method: "DELETE"
    }).then(res => res.json())
      .then(data => setCarts([]))
  }

  const onOrderProcess = () => {
    fetch('/api/orders', {
      method: 'POST'
    }).then(res => res.json())
      .then(data => setCarts([]))
  }

  if (!isLoaded) {
    return (
      <PageContainer>
        <Loader message="Chargement..." />
      </PageContainer>
    )
  }

  if (isLoaded && carts.length == 0) {
    return (
      <PageContainer>
        <Loader message="Le panier est vide" />
      </PageContainer>
    )
  }

  let total = 0
  carts.map(cart => {
    total += cart.price * cart.quantity
  })

  return (
    <PageContainer>
      {carts.map((cart, id) => 
        <Cart 
          name={cart.name} 
          price={cart.price} 
          key={id}
          quantity={cart.quantity}
        />
      )}
      <br />
      <h4 className="text-center font-weight-bolder">Total: {total} FCFA</h4>
      <div className="text-center font-weight-bolder">
        <button className="btn btn-danger" onClick={onClearCart}>ANNULER</button>{" "}
        <button className="btn btn-primary" onClick={onOrderProcess}>COMMANDER</button>
      </div>
    </PageContainer>
  )
}


if (document.getElementById('root')) {
  ReactDOM.render(<CartIndex />, document.getElementById('root'))
}
