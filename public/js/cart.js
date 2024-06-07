const container = document.querySelector(".containerAllCart");
const btn = document.querySelector(".placeOrder");
const allCost = document.querySelector(".allCost");
let dataAllPrice = allCost.dataset.allprice;
// console.log(dataAllPrice);
const cartNav = document.querySelector('.cartNav')

const mainContainerCart = document.querySelector('.mainContainerCart')
const orderCards = mainContainerCart.dataset.ordercards
let CARTS = JSON.parse(orderCards).length
//? удаление из корзины

container.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-del")) {
    console.log(e.target);

    const orderId = e.target.dataset.orderid;
    const userId = e.target.dataset.userid;
    const dataPrice = e.target.dataset.price;

    try {
      const response = await fetch(`/cart/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const res = await response.json();
      console.log(res.status);
      if (res.status === "success") {
        e.target.closest(".cardCart").remove();
        dataAllPrice -= dataPrice;
        allCost.innerText = `Итоговая стоимость: ${dataAllPrice}.руб`;
        CARTS -=1
        cartNav.innerHTML = `корзина<span class="text_cart">(${CARTS})</span>`;
        if (dataAllPrice === 0) {
          btn.classList.remove("placeOrder"); 
          btn.classList.add("elementHiddn"); 
          cartNav.innerHTML = `корзина`;
          allCost.innerText = `В вашей корзине пусто...`
        }
      } else {
        alert("что-то пошло не так");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
});

//? оформляем заказ

btn.addEventListener("click", async (e) => {
  const userId = btn.dataset.userid;
  //console.log(userId);
  //! местоположение должно быть ранее привязано
  try {
    const response = await fetch(`/cart/allorders/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const res = await response.json();
    console.log(res.status);
    if (res.status === "success") {
      container.remove();
      btn.classList.remove('placeOrder');
      btn.classList.add('elementHiddn');
      cartNav.innerHTML = `корзина`;
      allCost.innerText = "В вашей корзине пусто...";
    } else {
      alert("что-то пошло не так");
    }
    console.log(res);
  } catch (error) {
    console.log(error);
  }
});
