import { cartBtn, cartCounter, items, total } from "../main";

export const cartCounterUpdate = () => {
  let count = cartCounter[0].innerText;
  // QuerySelectorAll ဆို loop ပက်ကမယ်
  cartCounter.forEach((current) => (current.innerText = parseInt(count) + 1));
};

// cart item total price
export const costTotal = () => {
  let result = [...document.querySelectorAll(".cart-cost")].reduce(
    (pv, cv) => pv + parseFloat(cv.innerHTML),
    0
  );
  total.innerHTML = result;
};

window.inc = (event, price) => {
  let currentCart = event.target.closest(".item-in-cart");
  let cartQuantity = currentCart.querySelector(".cart-quantity");
  let cartCost = currentCart.querySelector(".cart-cost");
  cartQuantity.valueAsNumber += 1;
  cartCost.innerText = (cartQuantity.valueAsNumber * price).toFixed(2);
  // update cart item total
  costTotal();
};

// create item in cart
export const createItemInCart = ({ id, title, price, image }) => {
  const div = document.createElement("div");
  div.classList.add("item-in-cart");
  div.innerHTML = `
    <div class="border rounded p-2">
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
            <button class="btn btn-primary" onclick="dec(event,${price})">
              <i class="bi bi-dash pe-none"></i>
            </button>
            <input type="number" class="form-control text-end cart-quantity" value="1" >
            <button class="btn btn-primary" onclick="inc(event,${price})">
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

  // Update cart item price total
  costTotal();

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
    createItemInCart(itemDetail);
  }, 800);
};
