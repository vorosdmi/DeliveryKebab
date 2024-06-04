const form = document.querySelector('#regForm');


// function validatePhoneNumber(phoneNumber) {
//   // Регулярное выражение для формата +79829232205
//   const phoneRegex = /\s*(\D*)(\+7|8)\D*(\d{3})\D*(\d{3})\D*(\d{2})\D*(\d{2})/gim;
//   return phoneRegex.test(phoneNumber);
// }

// Пример использования
// const phoneNumber = "+79829232205"; // Замените это на номер телефона для тестирования
// const isValid = validatePhoneNumber(phoneNumber);
// console.log(isValid); // true, если номер соответствует формату, false в противном случае



form.addEventListener('submit', async (e) => {
  e.preventDefault();
 
  const data = new FormData(form);
  const res = Object.fromEntries(data);
  console.log(res);
  if (!res.name || !res.password || !res.number) {
    alert('Input your name, phone number and password');
  } 
  // if (!validatePhoneNumber(res.name)) {
  //   alert('Input correct your phone number');
  // }
  else {

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(res),
      });
      const result = await response.json();
      console.log(result);


      result.regErr / result.regDone
      if (result.regDone) {
        
        setTimeout(() => {
          window.location.href = '/';
        }, 250);
      }
      if (result.regErr) {
        const errMsg = document.querySelector('.regErrMsg');
        errMsg.innerText = result.regErr;
        errMsg.style.color = 'red';
      }
    } catch (error) {
      console.log(error);
      alert('Reg error');
    }
  }
});
 