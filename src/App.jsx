import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';

let nextId = 1;

function App() {
  const [packList, setPackList] = useState([]);
  const [newItem, setNewItem] = useState('');

  const pack = (name, newval) => {
    setPackList((preState) =>
      preState.map((obj) =>
        obj.name === name ? { ...obj, isPacked: newval } : obj
      )
    );
  };

  const addItem = () => {
    setPackList([...packList, { id: nextId, name: newItem, isPacked: false }]);
    nextId += 1;
  };

  const del = (id) => {
    setPackList((preState) =>
      preState.filter((obj) => obj.id !== id)
    );
  };

  return (
    <div className="container-fluid bg-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              value={newItem}
              placeholder="Enter the name of the item"
              onChange={(e) => setNewItem(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                addItem();
              }}
            >
              Add item
            </button>
          </div>
        </div>
        <ul className="list-group mt-3">
          {packList.map((val) => (
            <div key={val.id}>
              <li className={`list-group-item list-group-item-action${val.isPacked ? ' list-group-item-success' : ''}`}>
                <input
                  onClick={() => pack(val.name, !val.isPacked)}
                  className="form-check-input mt-2 me-2"
                  type="checkbox"
                  checked={val.isPacked}
                />
                {val.isPacked ? <del>{` ${val.name}`}</del> : ` ${val.name}`}
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => del(val.id)}
                >
                  Delete
                </button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
