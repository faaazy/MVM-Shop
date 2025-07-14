export function initCheckoutPage() {
  validateCheckoutPhone();

  initCheckoutSwiper();
}
function initCheckoutSwiper() {
  var paymentSwiper = new Swiper(".paymentSwiper", {
    spaceBetween: 20,
    slidesPerView: 4,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

function validateCheckoutPhone() {
  const checkoutPhoneInput = document.querySelector(".checkout__details-item__input");
  const checkoutDetailsItem = document.querySelector(".checkout__details-item");

  let lastValue = "";

  checkoutPhoneInput.addEventListener("input", (event) => {
    let checkoutPhoneNumber = new libphonenumber.AsYouType("US").input(event.target.value);

    if (checkoutPhoneInput.value.at(0) != 1 || checkoutPhoneInput.value.at(1) == 1) {
      checkoutPhoneInput.value = 1;

      checkoutDetailsItem.style.border = "2px solid red";
      console.log(checkoutPhoneInput);
    } else {
      if (checkoutPhoneInput.value.length > 16) {
        if (checkoutPhoneInput.value.length >= lastValue.length) {
          checkoutPhoneNumber = checkoutPhoneNumber.slice(0, 16);
          checkoutPhoneInput.value = lastValue;
          return;
        }
      } else {
        checkoutDetailsItem.style.border = "2px solid #2b2b2b";
        checkoutPhoneInput.value = checkoutPhoneNumber;
        lastValue = checkoutPhoneNumber;
      }
    }
  });
}
