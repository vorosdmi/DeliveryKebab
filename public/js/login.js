const form = document.querySelector("#loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const res = Object.fromEntries(data);
  console.log(res);
  if (!res.password || !res.number) {
    alert('Input your name, phone number and password');
  } else {
    try {
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
