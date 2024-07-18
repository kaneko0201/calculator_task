let result = "";
let is_calc = false;

window.addEventListener('DOMContentLoaded', function(){
  result = document.getElementById('result');
  buttons = document.querySelectorAll('button');
});

function c_click(){
  result.value = "0";
  is_calc = false;
  enableAllButtons();
}

function num_click(val) {
  if (is_calc)
  result.value = "0";
  is_calc = false;


  if (result.value === "0" && val === "0") {
    result.value = "0";
  } else if (result.value === "0" && val !== ".") {
    result.value = val;
  } else if (val === ".") {
    const parts = result.value.split(/[\+\-\×\÷]/);
    const lastPart = parts[parts.length -1];
    if (!lastPart.includes(".")) {
      if (lastPart === "") {
        result.value += "0.";
      } else {
        result.value += val;
      }
    }
  } else {
    const parts = result.value.split(/[\+\-\×\÷]/);
    const lastPart = parts[parts.length -1];
    if (lastPart === "0" && !isNaN(val)) {
      result.value = result.value.slice(0, -1) + val;
    } else {
      result.value += val;
    }
  }
}

function is_ope_last() {
  return ["+","-","×","÷"].includes(result.value.toString().slice(-1));
}

function ope_click(val) {
  if (is_calc)
  is_calc = false;
  if (is_ope_last()) {
    result.value = result.value.slice(0, -1) + val;
  } else {
    result.value += val;
  }
}

function equal_click() {
  if (is_ope_last()) {
    result.value = "Error";
    disableAllButtonsExceptC();
    return;
  }
  let temp = new Function("return " + result.value.replaceAll("×", "*").replaceAll("÷", "/"))();
  if (temp === Infinity || Number.isNaN(temp)) {
    result.value = "Error";
    disableAllButtonsExceptC();
  } else {
    result.value = temp;
    is_calc = true;
  }
}

function enableAllButtons() {
  buttons.forEach(button => {
  button.disabled = false;
  });
}

function disableAllButtonsExceptC() {
  buttons.forEach(button => {
    if (button.id !== "clear") {
      button.disabled = true;
    }
  })
}
