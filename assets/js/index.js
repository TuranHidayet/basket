let productRow = document.querySelector(".product-row");

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('urunler', JSON.stringify(data))
        showProducts(data)
    });
});

function showProducts(products) {
  productRow.innerHTML = "";
  products.forEach((product) => {
    productRow.innerHTML += `<div class="col-xl-4 py-2">
        <div class="card p-4 product-row">
            <img src="${product.image}" alt="${product.title}" class="card-img-top product-img" />
            <h4 class="card-title">${getTitle(product.description, 15)}</h4>
            <span class="card-text"> Qiymet: ${product.price} AZN</span>
            <div class="select-order">
                <button class="img-button"><i class="fa-solid fa-minus"></i></button>
                <span> 1 </span>
                <button class="img-button"><i class="fa-solid fa-plus"></i></button>
                <button class="basket-button" data-id="${product.id}"><i class="fa-solid fa-basket-shopping basket-img"></i></button>
            </div>
        </div>
      </div>`;
  });
}

function getTitle(title, count) {
  return title.length > count ? title.substring(0, count).concat("...") : title;
}

setTimeout(() => {
    const basketButtons = document.querySelectorAll(".basket-button");
    basketButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = button.getAttribute("data-id");
        const urunler = JSON.parse(localStorage.getItem('urunler'));
        const urun = urunler.find((urun) => urun.id == productId);

        document.getElementById('cart-count').innerHTML = getCartCount()
        console.log("Basket button clicked for product ID:", productId);
        console.log("Basket button clicked for product:", urun);
        setCountToLocal(urun)
      });
    }); 
}, 1000);


const setCountToLocal = (data) => {
    const localData = JSON.parse(localStorage.getItem('sebet')) || [];

    const existingProductIndex = localData.findIndex(item => item.id === data.id);

    if (existingProductIndex !== -1) {
        localData[existingProductIndex].count += 1;
    } else {
        data.count = 1; // Yeni məhsul üçün sayını 1 olaraq təyin edirik
        localData.push(data);
    }

    localStorage.setItem('sebet', JSON.stringify(localData));
};


const getCartCount = () => {
    return JSON.parse(localStorage.getItem('sebet')).length
}