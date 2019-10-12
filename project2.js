document.getElementById("calculate").onclick = calculate;

function calculate() {
  let realPower = Number.parseFloat(
    document.getElementById("real-power").value)*1000;
  let voltage = Number.parseFloat(
    document.getElementById("voltage").value);
  let frequency = Number.parseFloat(
    document.getElementById("frequency").value);

  let originalPowerFactor = Number.parseFloat(
    document.getElementById("original-power-factor").value) / 100;
  let desiredPowerFactor = Number.parseFloat(
    document.getElementById("desired-power-factor").value) / 100;

  let originalAngle = Math.acos(originalPowerFactor);
  if (document.getElementById("original-lag-lead").value === "lead")
    originalAngle = 0 - originalAngle

  
  let desiredAngle = Math.acos(desiredPowerFactor);
  if (document.getElementById("desired-lag-lead").value === "lead")
    desiredAngle = 0 - desiredAngle
  
  let reactivePowerChange = realPower * 
    (Math.tan(originalAngle) - Math.tan(desiredAngle));

  if (reactivePowerChange >= 0) { // Capacitive correction
    let capacitance = reactivePowerChange/(2*Math.PI*frequency*voltage**2);
    
    if (capacitance < 10**(-3)) {
      document.getElementById("output").innerHTML = 
        "You need a capacitor with " + 
        (capacitance*10**6).toPrecision(3) + "µF."
    } else if (capacitance < 1) {
      document.getElementById("output").innerHTML = 
        "You need a capacitor with " + 
        (capacitance*10**3).toPrecision(3) + "mF."
    } else {
      document.getElementById("output").innerHTML = 
        "You need a capacitor with " + capacitance.toPrecision(3) + "F."
    }
  } else { // Inductive correction
    let inductance = 0 - voltage**2/(2*Math.PI*reactivePowerChange*frequency)

    if (inductance < 10**(-3)) {
      document.getElementById("output").innerHTML = 
        "You need an inductor with " + 
        (inductance*10**6).toPrecision(3) + "µH."
    } else if (inductance < 1) {
      document.getElementById("output").innerHTML = 
        "You need an inductor with " + 
        (inductance*10**3).toPrecision(3) + "mH."
    } else {
      document.getElementById("output").innerHTML = 
        "You need an inductor with " + inductance.toPrecision(3) + "H."
    }
  }

}

