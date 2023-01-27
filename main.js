import "./style.scss";

function showLoaderUi() {
  const loader = document.createElement("div");
  loader.classList.add("loader");
  loader.innerHTML = `
    <div class="min-vh-100 d-flex justify-content-center fixed-top bg-white align-items-center">
        <div class="spinner-border text-primary data-loader" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `;
    document.body.append(loader);
}

function removeLoaderUi() {
    const setCurrentLoader = document.querySelector('.loader');
    setCurrentLoader.remove();
}

showLoaderUi();
setTimeout(_=>removeLoaderUi(),2000);