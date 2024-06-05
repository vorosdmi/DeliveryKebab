const form = document.querySelector("#loginForm");


const normalizePhoneNumber = (number) => {
  // Регулярное выражение для проверки допустимых форматов
  const phoneRegex = /^(\+7|8)\D?\d{3}\D?\d{3}\D?\d{2}\D?\d{2}$/;

  // Проверяем, соответствует ли номер одному из допустимых форматов
  if (!phoneRegex.test(number)) {
    return false;
  }

  // Удаляем все пробелы, дефисы и скобки
  number = number.replace(/[()\s-]/g, "");

  // Меняем 8 на +7, если номер начинается с 8
  if (number.startsWith("8")) {
    number = number.replace(/^8/, "+7");
  }

  // Если номер в формате +7, возвращаем его
  if (number.startsWith("+7")) {
    return number;
  }

  return false;
};



form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const res = Object.fromEntries(data);
  console.log(res);
  if (!res.password || !res.number) {
    alert('Input your name, phone number and password');
  }
  if (!normalizePhoneNumber(res.number)) {
    alert('Input correct your phone number');
  } else {
    try {
      res.number = normalizePhoneNumber(res.number)
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(res),
      });
      const result = await response.json();
console.log(result);

      if (result.message === "found") {
        setTimeout(() => {
          window.location.href = `/`;
        }, 250);
      }

      if (result.message === "not found") {
        const errMsg = document.querySelector(".loginErr");
        errMsg.innerText = result.message;
        errMsg.style.color = "red";
      }

      if (result.message === "Password is incorrect") {
        const errMsg = document.querySelector(".loginErr");
        errMsg.innerText = result.message;
        errMsg.style.color = "red";
      }
    } catch (error) {
      console.log(error);
      alert("Reg error");
    }
  }
});
