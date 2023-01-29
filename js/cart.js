import { cartBox, cartBtn, cartCounter, items, total } from "../main";

export const cartCounterUpdate = () => {
  let count = cartCounter[0].innerText;
  // QuerySelectorAll ဆို loop ပက်ကမယ်
  cartCounter.forEach((current) => (current.innerText = parseInt(count) + 1));
};

// remove cart item
window.removeCartItem = (event) => {
  event.target
    .closest(".item-in-cart")
    .classList.add("animate__rotateOutDownLeft");

  setTimeout(() => {
    event.target.closest(".item-in-cart").remove();
  }, 1000);

  let itemCards  = [...document.querySelectorAll(".item-card")];
  
  itemCards.forEach(el => console.log(el) )

};

// cart item total price
export const costTotal = () => {
  let result = [...document.querySelectorAll(".cart-cost")].reduce(
    (pv, cv) => pv + parseFloat(cv.innerHTML),
    0
  );
  total.innerHTML = result.toFixed(2);
};

// Check Same Cart Item
export const isSameItemInCart = (event, itemDetail) => {
  let cartItems = [...document.querySelectorAll(".cart-item")];
  let currentCartItems = [];

  cartItems.forEach((item) => {
    currentCartItems.push(parseInt(item.getAttribute("item-id")));
  });

  let sameItem = currentCartItems.filter((item) => item == itemDetail.id);

  if (sameItem.length > -1) {
    event.target.classList.add("disabled");
  }
};

window.inc = (event, price) => {
  let currentCart = event.target.closest(".item-in-cart");
  let cartQuantity = currentCart.querySelector(".cart-quantity");
  let cartCost = currentCart.querySelector(".cart-cost");
  cartQuantity.valueAsNumber += 1;
  cartCost.innerText = (cartQuantity.valueAsNumber * price).toFixed(2);

  // checkCondition
  document.querySelector(".btn-dec").classList.remove("disabled");

  // update cart item total
  costTotal();
};

window.dec = (event, price) => {
  let currentCart = event.target.closest(".item-in-cart");
  let cartQuantity = currentCart.querySelector(".cart-quantity");
  let cartCost = currentCart.querySelector(".cart-cost");
  let cartInputValue = (cartQuantity.valueAsNumber -= 1);
  cartCost.innerText = (cartQuantity.valueAsNumber * price).toFixed(2);

  // checkCondition
  if (cartInputValue == 1) {
    document.querySelector(".btn-dec").classList.add("disabled");
  }

  // update cart item total
  costTotal();
};

// create item in cart
export const createItemInCart = ({ id, title, price, image }) => {
  const div = document.createElement("div");
  div.classList.add("item-in-cart", "animate__animated");
  div.innerHTML = `
    <div class="cart-item border rounded p-2 position-relative" item-id="${id}">
      <div class=" position-absolute top-0 end-0 m-2">
        <button class="btn btn-outline-danger btn-sm" onclick="removeCartItem(event)">
          <i class="bi bi-trash-fill pe-none text-danger"></i>
        </button>
      </div>
      <div class="">
        <img src="${image}" class="cart-item-img mb-2">
      </div>
      <div>
        <p class="small">${title}</p>
      </div>
      <div class="row justify-content-between align-items-center">
        <div class="col-4">
          <p class="small mb-0">$<span class="cart-cost">${price}</span></p>
        </div>
        <div class="col-6">
          <div class="input-group input-group-sm">
            <button class="btn btn-primary btn-dec " onclick="dec(event,${price})">
              <i class="bi bi-dash pe-none"></i>
            </button>
            <input type="number" class="form-control text-end cart-quantity" value="1" >
            <button class="btn btn-primary btn-inc" onclick="inc(event,${price})">
              <i class="bi bi-plus pe-none"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  cartBox.append(div);
};

export const addToCart = (e) => {
  let currentItemCard = e.target.closest(".item-card");
  let currentImg = currentItemCard.querySelector(".item-img");
  let itemId = currentItemCard.getAttribute("item-id");
  let itemDetail = items.find((item) => item.id === parseInt(itemId));

  // Image အသစ်ဖန်တီး
  let newImg = new Image();
  newImg.src = currentImg.src;
  newImg.style.position = "fixed";
  newImg.style.top = currentImg.getBoundingClientRect().top + "px";
  newImg.style.left = currentImg.getBoundingClientRect().left + "px";
  newImg.style.height = 100 + "px";
  newImg.style.zIndex = 2000;
  newImg.style.transition = 1 + "s";
  document.body.append(newImg);

  isSameItemInCart(e, itemDetail);

  // Image Add To Card animation
  setTimeout((_) => {
    newImg.style.height = 0 + "px";
    newImg.style.transform = "rotate(360deg)";
    newImg.style.top =
      cartBtn.querySelector(".bi").getBoundingClientRect().top + "px";
    newImg.style.left =
      cartBtn.querySelector(".bi").getBoundingClientRect().left + "px";
  }, 10);

  setTimeout((_) => {
    cartBtn.classList.add("animate__tada");
    cartBtn.addEventListener("animationend", (_) => {
      cartBtn.classList.remove("animate__tada");
    });
    newImg.remove();
    cartCounterUpdate();
    // Check same cart item
    createItemInCart(itemDetail);
    // update cart item total
    costTotal();
  }, 800);
};
