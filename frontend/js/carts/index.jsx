import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Loader from '../Loader'
import PageContainer from '../PageContainer'
import Cart from "./Cart"

const CartIndex = () => {
  const [carts, setCarts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPayment, setIsPayment] = useState(false)

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
      .then(data => {
        setIsPayment(true)
        window.location.assign(data.form_url)
        setCarts([])
      })
  }

  const onOrderWithIntegredCard = () => {
    fetch('/api/orders', {
      method: 'POST'
    }).then(res => res.json())
      .then(data => {
        setIsPayment(true)
        window.location.assign('/cards?order_id=' + data.order_id)
        setCarts([])
      })
  }

  if (!isLoaded) {
    return (
      <PageContainer>
        <Loader message="Chargement..." />
      </PageContainer>
    )
  }

  if (isPayment) {
    return (
      <PageContainer>
        <Loader message="Chargement de la page de paiement..." />
      </PageContainer>
    )
  }

  if (isLoaded && carts.length == 0 && !isPayment) {
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
        <button className="btn btn-primary mt-1" onClick={onOrderProcess}>PAYER VIA RADAR GATEWAY</button>{" "}
        <button className="btn btn-success mt-1" onClick={onOrderWithIntegredCard}>PAYER VIA CARTE DE CRÉDIT INTEGRER</button>{" "}
        <button className="btn btn-danger mt-1" onClick={onClearCart}>ANNULER LA COMMANDE</button>
      </div>
    </PageContainer>
  )
}

if (document.getElementById('root')) {
  ReactDOM.render(<CartIndex />, document.getElementById('root'))
}
