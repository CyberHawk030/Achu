import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [gfname, setGfname] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items"));
    if (storedItems) setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleAddOrUpdate = () => {
    if (editIndex !== null) {
      const updatedItems = items.map((item, index) =>
        index === editIndex ? { name, count, gfname } : item
      );
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, { name, count,gfname}]);
    }
    setName("");
    setCount("");
    setGfname("");
 
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setName(items[index].name);
    setCount(items[index].count);
    setGfname(items[index].gfname);
  };

  const handleDelete = (index) => {
    const filteredItems = items.filter((_, i) => i !== index);
    setItems(filteredItems);
  };

  return (
    <div className="App">
      <h1>Simple Dashboard</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Relationship"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Girl Friend Name"
          value={gfname}
          onChange={(e) => setGfname(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <div className="list">
        <div className="list-item">
          <span>Groom</span>
          <span>Bride</span>
          <span>Relationship</span>
          <span>Edit</span>
          <span>Delete</span>
        </div>
        {items.map((item, index) => (
          <div key={index} className="list-item">
            <span>{item.name}</span>
            <span>{item.gfname}</span>
            <span>{item.count}</span>

            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
