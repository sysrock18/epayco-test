<?php

include ('./vendor/autoload.php');

use Epayco\Epayco;

$status = false;
$success = false;
$codResponse = 0;
$reference = '';
$date = '';
$response = '';
$reason = '';
$bank = '';
$invoice = '';
$currency = '';
$total = '';

$epayco = new Epayco(array(
  "apiKey" => "45b960805ced5c27ce34b1600b4b9f54",
  "privateKey" => "5c4773856f296c674685209bbfd11f92",
  "lenguage" => "ES",
  "test" => true
));

if ($_POST['payType'] === 'cash') {
  
  $cash = $epayco->cash->create($_POST['entityCash'], array(
    "invoice" => "1472050778",
    "description" => "Skate Element",
    "value" => "50000",
    "tax" => "0",
    "tax_base" => "0",
    "currency" => "COP",
    "type_person" => "0",
    "doc_type" => $_POST['typeDoc'],
    "doc_number" => $_POST['numberDoc'],
    "name" => $_POST['name'],
    "last_name" => $_POST['lastName'],
    "email" => $_POST['email'],
    "cell_phone" => $_POST['mobilePhone'],
    "end_date" => "2017-12-31",
    "url_response" => "https:/secure.payco.co/restpagos/testRest/endpagopse.php",
    "url_confirmation" => "https:/secure.payco.co/restpagos/testRest/endpagopse.php",
    "method_confirmation" => "GET",
  ));

  
  if (property_exists($cash, 'success')) {
    $success = $cash->success;
    $codResponse = $cash->data->cod_respuesta;
    $reference = $cash->data->ref_payco;
    $date = $cash->data->fecha;
    $response = $cash->data->respuesta;
    $reason = $cash->data->descripcion;
    $bank = $cash->data->banco;
    $invoice = $cash->data->factura;
    $total = $cash->data->valor;
    $currency = $cash->data->moneda;
  }

} else if ($_POST['payType'] === 'card') {

  $token = $epayco->token->create(array(
    "card[number]" => $_POST['card'],
    "card[exp_year]" => $_POST['expYearCard'],
    "card[exp_month]" => $_POST['expMonthCard'],
    "card[cvc]" => $_POST['cvcCard']
  ));
  
  $customer = $epayco->customer->create(array(
    "token_card" => $token->id,
    "name" => $_POST['name'] . ' ' . $_POST['lastName'],
    "email" => $_POST['email'],
    "phone" => $_POST['mobilePhone'],
    "default" => true
  ));
  
  $pay = $epayco->charge->create(array(
    "token_card" => $token->id,
    "customer_id" => $customer->data->customerId,
    "doc_type" => $_POST['typeDoc'],
    "doc_number" => $_POST['numberDoc'],
    "name" => $_POST['name'],
    "last_name" => $_POST['lastName'],
    "email" => $_POST['email'],
    "bill" => "OR-1234",
    "description" => "Skate Element",
    "value" => "50000",
    "tax" => "5000",
    "tax_base" => "10000",
    "currency" => "COP",
    "dues" => "0"
  ));

  if (property_exists($pay, 'success')) {
    $success = $pay->success;
    $codResponse = $pay->data->cod_respuesta;
    $reference = $pay->data->ref_payco;
    $date = $pay->data->fecha;
    $response = $pay->data->respuesta;
    $reason = $pay->data->descripcion;
    $bank = $pay->data->banco;
    $invoice = $pay->data->factura;
    $total = $pay->data->valor;
    $currency = $pay->data->moneda;
  }
}
?>

<div class="Response">
  <p class="intro">
    Datos de tu compra
  </p>

  <?php if ($success) {  ?>
    <div class="data-container">
      <div class="response">
      <?php
        if ($codResponse === 1) {
          echo 'Transaccion Aprobada';
        } else if ($codResponse === 2) {
          echo 'Transacción Rechazada';
        } else if ($codResponse === 3) {
          echo 'Transacción Pendiente';
        } else {
          echo 'Transacción fallida';
        }
      ?>
      </div>

      <div class="data">
        <div><b>Referencia:</b> <?php echo $reference ?></div>
        <div><b>Fecha:</b> <?php echo $date ?></div>
        <div><b>Respuesta:</b> <?php echo $response ?></div>
        <div><b>Motivo:</b> <?php echo $reason ?></div>
        <div><b>Banco / Entidad:</b> <?php echo $bank ?></div>
        <div><b>Recibo:</b> <?php echo $invoice ?></div>
        <div><b>Total:</b> <?php echo $total ?> <?php echo $currency ?></div>
      </div>

      <a href="/" class="btn btn-default">Realizar otra compra</a>
    </div>
  <?php } else { ?>
    <h3>Ha ocurrido un error en la compra.</h3>
  <?php } ?>

</div>
