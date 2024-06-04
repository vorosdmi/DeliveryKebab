const form = document.querySelector('#regForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const res = Object.fromEntries(data);
  if (!res.login || !res.password) {
    alert('Input your login and password');
  } else {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(res),
      });
      const result = await response.json();
      //result.regErr / result.regDone
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
 