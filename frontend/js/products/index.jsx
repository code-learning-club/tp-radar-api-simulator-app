import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Product from "./Product"
import PageContainer from "../PageContainer"
import Loader from "../Loader"

const ProductIndex = () => {
  const [products, setProducts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [cards, setCards] = useState({})

  useEffect(() => {
    fetch('/api/products')
    .then(res => {
      return res.json()
    }).then(data => {
      setProducts(data)
      setIsLoaded(true)
    })
  }, [])

  const addProductToCard = (id, quantity = 1) => {
    if (cards[id]) {
      cards[id].quantity = cards[id].quantity + quantity
    } else {
      cards[id] = {quantity, id}
    }

    const data = Object.values(cards);
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text/plain, */*",
      },
      body: JSON.stringify({carts: data})
    }

    fetch('/api/carts', headers)
      .then(res => res.json())
      .then(data => console.log(data))
  }

  const getProductQuantity = (productId) => {
    if (cards[productId]) {
      return cards[productId].quantity;
    }
    return 0
  }

  if (!isLoaded) {
    return (
      <PageContainer>
        <Loader message="Chargement..." />
      </PageContainer>
    )
  }

  if (isLoaded && products.length == 0) {
    return (
      <PageContainer>
        <Loader message="Aucun produit disponible..." />
      </PageContainer>
    )
  }

  return (
    <>
      <PageContainer>
        <div className="row">
          {products.map((product, key) => 
            <Product 
              key={key}
              productId={product.id}
              name={product.name}
              price={product.price}
              addProductToCard={addProductToCard}
              getProductQuantity={getProductQuantity}
              defaultQuantity={product.quantity}
            />
          )}
        </div>
      </PageContainer>
    </>
  )
}

if (document.getElementById('root')) {
  ReactDOM.render(<ProductIndex />, document.getElementById('root'))
}
