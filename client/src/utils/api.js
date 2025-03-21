const BASE_URL = "http://localhost:5000/api/todos";



// ✅ Fetch All Todos
export const fetchTodos = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      headers: { 'Authorization': token},
    });
    return await response.json(); // Assuming backend returns `{ todos: [...] }`
  } catch (error) {
    console.error("Error fetching todos:", error);
    return { todos: [] };
  }
};

// ✅ Add a New Todo
export const addTodo = async (title, description, token) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ title, description }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding todo:", error);
    return null;
  }
};

// ✅ Update an Existing Todo (Using ID)
export const updateTodo = async (id, updatedData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(updatedData), // updatedData should contain title & description
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating todo:", error);
    return null;
  }
};

// ✅ Delete a Todo (Using ID)
export const deleteTodo = async (id, token) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    return await response.json();
  } catch (error) {
    console.error("Error deleting todo:", error);
    return null;
  }
};
