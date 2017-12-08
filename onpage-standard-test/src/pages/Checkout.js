import React, { Component } from 'react';
import Product from './Product';
import './Checkout.css';

class Checkout extends Component {
  
  constructor(props) {
    super(props);

    const handler = window.ePaycoCheckout.checkout.configure({
      key: '45b960805ced5c27ce34b1600b4b9f54',
      test: true
    });

    this.state = {
      nameBilling: '',
      addressBilling: '',
      typeDocBilling: '',
      mobilePhoneBilling: '',
      numberDocBilling: '',
      external: false,
      handler
    }

    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleCheckout() {
    let data = {
      // Parametros compra
      name: "Skate Element",
      description: "Skate Element to ride like the best",
      invoice: "12345",
      currency: "cop",
      amount: "50000",
      tax_base: "0",
      tax: "0",
      country: "co",
      lang: "en",
      // Onpage="false" - Standard="true"
      external: this.state.external.toString(),
      response: "http://localhost:3000/response",
      // Atributos cliente
      name_billing: this.state.nameBilling,
      address_billing: this.state.addressBilling,
      type_doc_billing: this.state.typeDocBilling,
      mobilephone_billing: this.state.mobilePhoneBilling,
      number_doc_billing: this.state.numberDocBilling
    }

    this.state.handler.open(data);
  }

  render() {
    return (
      <div className="Checkout">
        <div className="formCheckout">
          <h3>Pago de tu producto:</h3>

          <Product />

          <h4>Ingresa tus datos</h4>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              className="form-control"
              type="text"
              name="nameBilling"
              value={this.state.nameBilling}
              onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Direccion:</label>
            <input
              className="form-control"
              type="text"
              name="addressBilling"
              value={this.state.addressBilling}
              onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Tipo de Documento:</label>
            <select
              name="typeDocBilling"
              className="form-control"
              value={this.state.typeDocBilling}
              onChange={this.handleChange}>
              <option value="cc">Cedula de ciudadania</option>
              <option value="ce">Cedula de Extranjeria</option>
              <option value="ppn">Pasaporte</option>
              <option value="ssn">Numero de seguridad Social</option>
              <option value="lic">Licencia de conduccion</option>
              <option value="nit">Numero de identificacion tributaria</option>
              <option value="ti">Tarjeta de identidad</option>
              <option value="dni">Documento Nacional de Identificacion</option>
            </select>
          </div>
          <div className="form-group">
            <label>Número de Documento:</label>
            <input
              className="form-control"
              type="text"
              name="numberDocBilling"
              value={this.state.numberDocBilling}
              onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Número Celular:</label>
            <input
            className="form-control"
            type="text"
            name="mobilePhoneBilling"
            value={this.state.mobilePhoneBilling}
            onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>¿Redireccionar a otra pagina para el pago?:</label>
            <input
              name="external"
              type="checkbox"
              checked={this.state.external}
              onChange={this.handleChange} />
          </div>

          <input type="submit" className="btn btn-default" value="Continuar" onClick={this.handleCheckout} />
        </div>
      </div>
    );
  }
}

export default Checkout;
