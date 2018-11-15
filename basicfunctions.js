function moveBox() {
  var elem = document.getElementById("movingbox");
  var inside = elem.getBoundingClientRect();
  var outside = document.getElementById("movingarea").getBoundingClientRect();
  var newX = Math.floor(Math.random() * (outside.width - inside.width));
  var newY = Math.floor(Math.random() * (outside.height - inside.height));
  elem.style.left = newX + "px";
  elem.style.top = newY + "px";

}

function buttonTimes() {
  var first = parseFloat(document.getElementById("times1").value);
  var second = parseFloat(document.getElementById("times2").value);
  if (isNaN(first) || isNaN(second)) {
    alert("Please enter a number");
    return;
  }
  document.getElementById("timesresult").innerHTML = +((first * second).toFixed(5));
}

function buttonAdd() {
  var first = parseFloat(document.getElementById("add1").value);
  var second = parseFloat(document.getElementById("add2").value);
  if (isNaN(first) || isNaN(second)) {
    alert("Please enter a number");
    return;
  }
  document.getElementById("addresult").innerHTML = +(first + second).toFixed(5);
}
