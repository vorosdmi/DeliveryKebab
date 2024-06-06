const placeOrder = document.querySelector('.placeOrder');

placeOrder.addEventListener("click", (e) => {
  e.preventDefault();

  sendFeedback();
});

function sendFeedback() {
  fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Форма успешно отправлена!");
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    });
}