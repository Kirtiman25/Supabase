import React, { useEffect, useState } from "react";
import { supabase } from "./client";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    age: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);

  // Handle input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const { data, error } = await supabase.from("User").select("*");
      if (error) {
        console.error("Error fetching data:", error);
        return;
      }
      setUsers(data || []);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }

  // Insert or update user in the database
  async function handleSubmit(event) {
    event.preventDefault();

    if (editingUserId) {
      try {
        const { error } = await supabase
          .from("User")
          .update({ name: user.name, age: user.age })
          .eq("id", editingUserId);

        if (error) {
          console.error("Error updating data:", error);
          return;
        }

        setUser({ name: "", age: "" });
        setEditingUserId(null);
        fetchUsers();
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    } else {
      try {
        const { error } = await supabase
          .from("User")
          .insert({ name: user.name, age: user.age });

        if (error) {
          console.error("Error inserting data:", error);
          return;
        }

        setUser({ name: "", age: "" });
        fetchUsers();
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    }
  }
 
  async function deleteUser(id) {
    try {
      const { error } = await supabase.from("User").delete().eq("id", id);

      if (error) {
        console.error("Error deleting data:", error);
        return;
      }

      fetchUsers();
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }

   
  function editUser(user) {
    setUser({ name: user.name, age: user.age });
    setEditingUserId(user.id);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-black mb-6">
        Supabase Integration (CURD OPERATION)
      </h1>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Age"
              name="age"
              value={user.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 rounded-lg "
          >
            {editingUserId ? "Update" : "Create"}
          </button>
        </form>


        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Age</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="text-center border-b hover:bg-gray-100"
              >
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.age}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => editUser(user)}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
