import { addToCart } from "./js/cart";
import { createItemUi } from "./js/item";
import { removeLoaderUi, showLoaderUi } from "./js/loader";
import * as bootstrap from "bootstrap";
import "./style.scss";

export let items = [];
export const itemRow = document.querySelector(".items-row");
export const cartBtn = document.querySelector(".cart-btn");
export const cartCounter = document.querySelectorAll(".cart-counter");
export const cartBox = document.querySelector("#cartBox");
export const total = document.querySelector("#total");
showLoaderUi();

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    items = json;

    items.forEach((item) => {
      itemRow.append(createItemUi(item));
    });

    removeLoaderUi();
  });

itemRow.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-cart")) {
    addToCart(e);
  }
});
