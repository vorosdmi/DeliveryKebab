const container = document.querySelector(".containerAllCart");
const btn = document.querySelector(".placeOrder");
const allCost = document.querySelector(".allCost");
let dataAllPrice = allCost.dataset.allprice;
console.log(dataAllPrice);
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
        if (dataAllPrice === 0) {
          btn.classList.remove("placeOrder"); 
          btn.classList.add("elementHiddn"); 
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
    const response = await fetch(`/cart/allarders/${userId}`, {
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
      allCost.innerText = "В вашей корзине пусто...";
    } else {
      alert("что-то пошло не так");
    }
    console.log(res);
  } catch (error) {
    console.log(error);
  }
});
