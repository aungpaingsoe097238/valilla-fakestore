export function showLoaderUi() {
  const loader = document.createElement("div");
  loader.classList.add("loader", "animate__fadeIn", "animate__animated");
  loader.innerHTML = `
      <div class="min-vh-100 d-flex justify-content-center fixed-top bg-white align-items-center  ">
          <div class="spinner-border text-primary data-loader" role="status">
              <span class="visually-hidden">Loading...</span>
          </div>
      </div>
      `;
  document.body.append(loader);
}

export function removeLoaderUi() {
  const setCurrentLoader = document.querySelector(".loader");
  setCurrentLoader.classList.replace("animate__fadeIn", "animate__fadeOut");
  setCurrentLoader.addEventListener("animationend", (_) =>
    setCurrentLoader.remove()
  );
}


