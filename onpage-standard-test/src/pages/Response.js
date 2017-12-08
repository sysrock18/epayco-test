import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import './Response.css';

class Response extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      success: true,
      responseText: '',
      codResponse: 0,
      reference: '',
      date: '',
      response: '',
      reason: '',
      bank: '',
      transactionId: '',
      amount: ''
    }
  }

  async componentDidMount() {
    const response = await this.getResponse();
    let responseText = '';

    if(response.success) {
      if (response.data.x_cod_response === 1) {
        responseText = 'Transaccion Aprobada';
      } else if (response.data.x_cod_response === 2) {
        responseText = 'Transacción Rechazada';
      } else if (response.data.x_cod_response === 3) {
        responseText =  'Transacción Pendiente';
      } else {
        responseText = 'Transacción fallida';
      }

      this.setState({
        loading: false,
        responseText,
        codResponse: 0,
        reference: response.data.x_id_invoice,
        date: response.data.x_transaction_date,
        response: response.data.x_response,
        reason: response.data.x_response_reason_text,
        bank: response.data.x_bank_name,
        transactionId: response.data.x_transaction_id,
        amount: `${response.data.x_amount} ${response.data.x_currency_code}`
      });
    } else {
      this.setState({
        loading: false,
        success: false
      });
    }
  }

  async getResponse() {
    const refPayco = this.getRefPayco();
    const response = await fetch(`https://secure.epayco.co/validation/v1/reference/${refPayco}`)
    .then(response => response.json())
    .catch(err => false);

    return response;
  }

  getRefPayco() {
    const url = new URL(window.location.href);
    const refPayco = url.searchParams.get("ref_payco");

    return refPayco;
  }

  render() {
    return (
      <div className="Response">
        <p className="intro">
          Datos de tu compra
        </p>

        {this.state.loading && <h4>Cargando...</h4>}

        {!this.state.loading && this.state.success && (
          <div className="data-container">
            <div className="response">{this.state.responseText}</div>

            <div className="data">
              <div><b>Referencia:</b> {this.state.reference}</div>
              <div><b>Fecha:</b> {this.state.date}</div>
              <div><b>Respuesta:</b> {this.state.response}</div>
              <div><b>Motivo:</b> {this.state.reason}</div>
              <div><b>Banco / Entidad:</b> {this.state.bank}</div>
              <div><b>Recibo:</b> {this.state.transactionId}</div>
              <div><b>Total:</b> {this.state.amount}</div>
            </div>

            <Link to="/" className="btn btn-default">Realizar otra compra</Link>
          </div>
        )}

        {!this.state.loading && !this.state.success && (
          <h4>Ha ocurrido un error consultando los datos de la compra</h4>
        )}

      </div>
    );
  }
}

export default Response;
