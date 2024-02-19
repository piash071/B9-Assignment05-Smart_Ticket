

const seats = document.querySelectorAll(".seat");
const couponName = document.getElementById("couponName");
const couponApply = document.getElementById("couponApply");
const couponHide = document.getElementById("couponHide");
const discountAmountShow = document.getElementById("discountAmountShow");
const grandTotal = document.getElementById("grandTotal");
const totalSeatValue = document.getElementById("totalSeatValue");
const updateSeats = document.getElementById("updateSeats");
const totalAmount = document.getElementById("totalAmount");
const show = document.getElementById("show");
const seatDecrease = document.getElementById("seatDecrease");
const phoneNumber = document.getElementById("phoneNumber");
const defaultValue = document.getElementById("defaultValue");
const submit = document.getElementById("submit");
const successShow = document.getElementById("successShow");
const hideElement = document.getElementById("hideElement");
const footerId = document.getElementById("footerId");



let seatLimit = 0;
let calculateSeatOrder = 1;
const arrs = [];
phoneNumber.addEventListener("change", function() {
  if (phoneNumber.value.toString().length === 11 && arrs.length === 0) {
    submit.removeAttribute("disabled");
  }
});



const validNumber = function(sub) {
  phoneNumber.addEventListener("input", function() {
    let isValue;
    const phnNumStr = phoneNumber.value.toString();
    if (arrs.length === 0) {
      isValue = false;
    } else if (phnNumStr.length === 11) {
      isValue = true;
    } else {
      isValue = false;
    }
    if (isValue) {
      sub.removeAttribute("disabled");
    } else {
      sub.setAttribute("disabled", true);
    }
  });
};



const couponCalculation = function(amountNum) {
  show.classList.remove("hidden");

  if (couponName.value === "NEW15") {
    const discount15 = (amountNum * 15) / 100;
    return discount15;
  } else if (couponName.value === "Couple 20") {
    const discount20 = (amountNum * 20) / 100;
    return discount20;
  } else {
    show.classList.add("hidden");
    return "Invalid Coupon Code";
  }
};


const calculateTotalAmount = function() {
  let amount = arrs.length * 550;
  totalAmount.innerText = amount;
  grandTotal.innerText = amount;
  if (amount > 1650) {
    couponName.removeAttribute("disabled");
    couponApply.removeAttribute("disabled");
    couponApply.addEventListener("click", function() {
      const discountValue = couponCalculation(amount);
      discountAmountShow.innerText = discountValue;
      grandTotal.innerText = amount - discountValue;
      if (discountValue === "Invalid") {
        grandTotal.innerText = amount;
        alert("Invalid Code");
      }
      couponHide.classList.add("hidden");
    });
  }
  validNumber(submit);
};


const seatUpdate = function() {
  if (seatLimit > 3) {
    return;
  } else {
    const createElement = document.createElement("div");
    createElement.classList.add("flex", "justify-between");
    createElement.innerHTML = `<p>${arrs[seatLimit]}</p>
    <p>Economy</p>
    <p>550</p>`;
    updateSeats.appendChild(createElement);
    seatLimit += 1;
    calculateSeatOrder += 1;
    calculateTotalAmount();
  }
};


const displayLength = function() {
  totalSeatValue.innerText = arrs.length;
  seatUpdate();
};


for (const seat of seats) {
  seat.addEventListener("click", function(e) {
    const value = e.target.outerText;
    if (arrs.includes(value)) {
      alert("Already selected");
      e.target.classList.add("disabled");
    } else if (arrs.length > 3) {
      alert("Only 4 Seats or less");
      e.target.classList.add("disabled");
    } else {
      arrs.push(value);
      defaultValue.classList.add("hidden");
      e.target.style.backgroundColor = "#1DD100";
      e.target.classList.add("disabled");
      seatDecrease.innerText = 40 - arrs.length;
    }
    for (const arr of arrs) {
      if (arrs.includes(arr)) {
        e.target.setAttribute("disabled", true);
      }
    }
    displayLength();
  });
}


submit.addEventListener("click", function() {
  hideElement.classList.add("hidden");
  successShow.classList.remove("hidden");
  footerId.classList.add("hidden");
});