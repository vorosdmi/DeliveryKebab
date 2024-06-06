const div = document.querySelector('.courierOrdersContainer');
const divClient = document.querySelector('.clientOrdersContainer');

// DELETE
div.addEventListener('click', async (event) => {
  if (event.target.classList.contains('delete')) {
    event.preventDefault();
    const container = event.target.closest('.order-container');
    const { id } = container;
    console.log('>>>', container);
    try {
      await fetch(`/orders/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      container.remove();
    } catch (error) {
      console.error(error);
      alert('Не удалось удалить запись!');
    }
  }
});

// PATCH
divClient.addEventListener('click', async (event) => {
  if (event.target.classList.contains('accept')) {
    event.preventDefault();
    const container = event.target.closest('.order-container');
    const { id } = container;
    try {
      await fetch(`/orders/courier/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      container.remove();
    } catch (error) {
      console.error(error);
      alert('Не удалось изменить запись!');
    }
  }
});