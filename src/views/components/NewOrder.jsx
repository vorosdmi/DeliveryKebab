const React = require('react');

module.exports = function NewOrder({ login, orders }) {
  return (
    <div className='newOrderContainer'>
      <h3 className="hTag" style={{fontWeight: "bold"}}>Новый заказ</h3>
      <hr />
      <div className="locationDiv"></div>   
      <form action="/orders" className="horizontal-form">
        <div className="form-group">
          <input name="name" type="text" className="form-control shadow rounded" id="exampleInput1" placeholder='Название'/>
          <input name="url" type="text" className="form-control shadow rounded" id="exampleInput2" placeholder='Картинка'/>
          <input name="price" type="number" className="form-control shadow rounded" id="exampleInput3" placeholder='Цена'/>
          <input name="discount" type="number" className="form-control shadow rounded" id="exampleInput4" placeholder='Скидка'/>
          {/* <input name="courierAddress" type="text" className="form-control shadow rounded" id="exampleInput5" placeholder='Ваше местоположение'/> */}
          <button type="submit" className="btn btn-primary shadow rounded create">Создать</button>
        </div>
      </form>
      <h3 className="createErr"></h3>
    </div>
  )
}