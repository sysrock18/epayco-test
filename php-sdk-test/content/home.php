<div class="Checkout">
  <div class="formCheckout">
    <h3>Pago de tu producto:</h3>

    <?php include 'product.php' ?>

    <h4>Ingresa tus datos</h4>
    <form method="POST" action="/checkout" name="checkoutForm">
      <div class="form-group">
        <label>Nombre:</label>
        <input
          class="form-control"
          type="text"
          name="name" />
      </div>
      <div class="form-group">
        <label>Apellido:</label>
        <input
          class="form-control"
          type="text"
          name="lastName" />
      </div>
      <div class="form-group">
        <label>Tipo de Documento:</label>
        <select
          name="typeDoc"
          class="form-control">
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
      <div class="form-group">
        <label>Número de Documento:</label>
        <input
          class="form-control"
          type="text"
          name="numberDoc" />
      </div>
      <div class="form-group">
        <label>E-mail:</label>
        <input
          class="form-control"
          type="text"
          name="email" />
      </div>
      <div class="form-group">
        <label>Número Celular:</label>
        <input
          class="form-control"
          type="text"
          name="mobilePhone" />
      </div>
      <div class="form-group">
        <label class="radio-inline">
          <input type="radio" name="payType" id="inlineRadio1" value="card"> Tarjeta de Credito
        </label>
        <label class="radio-inline">
          <input type="radio" name="payType" id="inlineRadio2" value="cash"> Efectivo
        </label>
      </div>

      <!-- Credito -->
      <div id="creditContainer">
        <div class="form-group">
          <label>Número Tarjeta:</label>
          <input
            class="form-control"
            type="text"
            name="card" />
        </div>
        <div class="form-group row">
          <label class="col-md-1 control-label">Año de Vencimiento</label>
          <div class="col-md-2">
              <input type="text" name="expYearCard" class="form-control">
          </div>
          <label class="col-md-1 control-label">Mes de Vencimiento</label>
          <div class="col-md-2">
              <input type="text" name="expMonthCard" class="form-control">
          </div>
          <label class="col-md-1 control-label">CVC</label>
          <div class="col-md-2">
              <input type="text" name="cvcCard" class="form-control">
          </div>
        </div>
      </div>

      <!-- Efectivo -->
      <div id="cashContainer">
        <div class="form-group">
          <label>Entidad de recaudo:</label>
          <select
            name="entityCash"
            class="form-control">
            <option value="efecty">Efecty</option>
            <option value="baloto">Baloto</option>
            <option value="gana">Gana</option>
          </select>
        </div>
      </div>

      <input type="submit" class="btn btn-default" value="Continuar" />
    </form>
  </div>
</div>

<script src="./assets/script.js"></script>
