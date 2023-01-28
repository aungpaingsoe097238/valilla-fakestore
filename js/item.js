import { excerpt } from "./utlities";

export const createItemUi = ({ id, image, title, description, price }) => {
  let itemDiv = document.createElement("div");
  itemDiv.classList.add("col-md-6", "col-lg-4");
  itemDiv.innerHTML = `
      <div class="card item-card " item-id=${id}>
          <div class="card-body d-flex flex-column">
              <div class="mb-3">
                  <img src="${image}" class="item-img">
              </div>
              <p class="card-title fw-bold text-truncate ">${title}</p>
              <p class="card-text small text-black-50">
                  ${excerpt(description)}
              </p>
              <div class="d-flex mt-auto justify-content-between align-items-center">
                  <p class="fw-bold mb-0">$<span>${price}</span></p>
                  <button class="btn btn-primary add-cart"><i class="bi bi-cart-plus pe-none "></i></button>
              </div>
          </div>
      </div>
      `;
  return itemDiv;
};
