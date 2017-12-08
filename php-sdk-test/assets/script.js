var rad = document.checkoutForm.payType;
var prev = null;

for(var i = 0; i < rad.length; i++) {
    rad[i].onclick = function() {
      if (this.value === 'cash') {
        document.getElementById('creditContainer').style.display = 'none';
        document.getElementById('cashContainer').style.display = 'block';
      } else {
        document.getElementById('creditContainer').style.display = 'block';
        document.getElementById('cashContainer').style.display = 'none';
      }
    };
}