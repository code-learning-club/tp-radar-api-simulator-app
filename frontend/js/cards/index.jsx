import { event } from 'jquery'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PageContainer from '../PageContainer'

const CardIndex = () => {
  const [orderId, setOrderId] = useState(undefined)
  const [pan, setPan] = useState(undefined)
  const [month, setMonth] = useState(undefined)
  const [cvc, setCvc] = useState(undefined)

  useEffect(() => {
    setOrderId(window.location.search.split("?")[1].split("=")[1])
  }, [])

  const onPanChange = (event) => {
    setPan(event.target.value)
  }

  const onCvcChange = (event) => {
    setCvc(event.target.value)
  }

  const onMonthChange = (event) => {
    setMonth(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const formData = {
      cvc, month, pan, orderId
    }
    console.log(formData)
  }

  return (
    <PageContainer>
    <div className="col-12 mt-4">
      <div className="card card-default credit-card-box">
        <div className="card-header display-table" >
            <div className="row display-tr" >
                <h3 className="card-title display-td" >Détails de paiement</h3>
                <div className="display-td" >                            
                  <img className="img-responsive pull-right" src="http://i76.imgup.net/accepted_c22e0.png" />
                </div>
            </div>                    
        </div>
        <div className="card-body">
          <form role="form" id="payment-form" onSubmit={onSubmit} method="POST">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="cardNumber">NUMÉRO DE CARTE</label>
                  <div className="input-group">
                    <input 
                      type="tel"
                      className="form-control"
                      name="pan"
                      placeholder="NUMÉRO DE CARTE VALIDE"
                      autoComplete="cc-number"
                      required={true}
                      autoFocus={true}
                      onChange={onPanChange}
                    />
                    <span className="input-group-addon"><i className="fa fa-credit-card"></i></span>
                  </div>
                </div>                            
              </div>
            </div>
            <div className="row">
              <div className="col-7">
                <div className="form-group">
                  <label htmlFor="cardExpiry"><span>EXP</span> DATE</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    name="month"
                    placeholder="MM / YY"
                    autoComplete="cc-exp"
                    required={true}
                    onChange={onMonthChange}
                  />
                </div>
              </div>
              <div className="col-5 float-right">
                <div className="form-group">
                  <label htmlFor="cardCVC">CV CODE</label>
                  <input 
                    type="tel" 
                    className="form-control"
                    name="cvc"
                    placeholder="CVC"
                    autoComplete="cc-csc"
                    required={true}
                    onChange={onCvcChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" className="subscribe btn btn-success btn-lg btn-block">Confirmer le paiement</button>
              </div>
            </div>
            <div className="row" style={{display: "none"}}>
              <div className="col-12">
                <p className="payment-errors"></p>
              </div>
            </div>
          </form>
        </div>
      </div>            
    </div>
    </PageContainer>
  )
}

if (document.getElementById('root')) {
  ReactDOM.render(<CardIndex />, document.getElementById('root'))
}
