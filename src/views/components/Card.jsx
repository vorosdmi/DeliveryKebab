const React = require('react');

module.exports = function Card({ card }) {
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid black',
        borderRadius: '10px',
        flexDirection: 'column',
        padding: '10px 20px',
        margin: '20px',
        backgroundColor: 'lightgrey',
        maxWidth: '300px',
        minWidth: '300px',
      }}
    >
      <h3>{card.title}</h3> //!!!!
      <p>{card.price}</p>//!!!
      <a href={`/add/${card.id}`}>
        <button type='button'>Добавить</button>
      </a>
      <a href={`/tasks/delete/${card.id}`}>
        <button type='button'>Удалить</button>
      </a>
    </div>
  );
}