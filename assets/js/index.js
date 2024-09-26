let productRow = document.querySelector(".product-row");
let productBaskets = document.getElementsByClassName("basket-button");

let baskets = JSON.parse(localStorage.getItem("basket")) || [];

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
      .then(showProducts)
    });


function showProducts(products) {
  productRow.innerHTML = "";
  products.forEach((product) => {
    let hasBasket = baskets.includes(product.id);
    productRow.innerHTML += `<div class="col-xl-4 py-2">
        <div class="card p-4 product-row">
            <img src="${product.image}" alt="${product.title}" class="card-img-top product-img" />
            <h4 class="card-title">${getTitle(product.description, 15)}</h4>
            <span class="card-text"> Qiymet: ${product.price} AZN</span>
            <div class="select-order">
                <button class="img-button"><i class="fa-solid fa-minus"></i></button>
                <span> 1 </span>
                <button class="img-button"><i class="fa-solid fa-plus"></i></button>
                <button class='basket-button ${hasBasket ? "active" : "" }' data-id="${product.id}"><i class="fa-solid fa-basket-shopping basket-img"></i></button>
            </div>
        </div>
      </div>`;
  });
  addEventsToBasketBtn();
};

function addEventsToBasketBtn() {
  for (const btn of productBaskets) {
    btn.addEventListener("click", function (e) {
      let thisEl = e.currentTarget;
      let id = Number(thisEl.dataset.id);
      if (thisEl.classList.contains("active")) {
        baskets = baskets.filter((basketId) => basketId !== id);
      } else {
        baskets.push(id);
      }

      thisEl.classList.toggle("active");

      localStorage.setItem("basket", JSON.stringify(baskets));
    });
  }

  console.log(baskets, JSON.parse(localStorage.getItem("basket")));
}

function getTitle(title, count) {
  return title.length > count ? title.substring(0, count).concat("...") : title;
}


// const setCountToLocal = (data) => {
//     const localData = JSON.parse(localStorage.getItem('sebet')) || [];

//     const existingProductIndex = localData.findIndex(item => item.id === data.id);

//     if (existingProductIndex !== -1) {
//         localData[existingProductIndex].count += 1;
//     } else {
//         data.count = 1; // Yeni məhsul üçün sayını 1 olaraq təyin edirik
//         localData.push(data);
//     }

//     localStorage.setItem('sebet', JSON.stringify(localData));
// };


// const getCartCount = () => {
//     return JSON.parse(localStorage.getItem('sebet')).length
// }