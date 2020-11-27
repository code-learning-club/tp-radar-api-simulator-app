import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Loader from '../Loader'
import PageContainer from '../PageContainer'
import Order from "./Order"

const OrderIndex = () => {
  const [orders, setOrders] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data)
        setIsLoaded(true)
      })
  }, [])

  if (!isLoaded) {
    return (
      <PageContainer>
        <Loader message="Chargement..." />
      </PageContainer>
    )
  }

  if (isLoaded && orders.length == 0) {
    return (
      <PageContainer>
        <Loader message="Aucune commande disponible..." />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="accordion" id="accordion">
        {orders.map((order, key) => 
          <Order key={key} {...order}/>
        )}
      </div>
    </PageContainer>
  )
}


if (document.getElementById('root')) {
  ReactDOM.render(<OrderIndex />, document.getElementById('root'))
}
