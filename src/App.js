import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      id: contacts.length + 1, 
      name,
      username,
      phone,
    };
    setContacts([...contacts, newContact]);
    setName("");
    setUsername("");
    setPhone("");
    setShowForm(false);
  };

  return (
    <div>
      <h1>Contact list</h1>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.username}</td>
              <td>{contact.phone}</td>
              <td>
                <button onClick={() => handleDelete(contact.id)}>
                  Delete contact
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setShowForm(true)}>Add contact</button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>First name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Last name:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Phone number:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button type="submit">Add</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
