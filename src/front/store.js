
export const initialStore = () => {
  
  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null;

  return {
    message: null,
    auth: {
      token: token || null,
      user: user || null,
      error: null
    },
    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_hello':
      return { ...store, message: action.payload };

    case 'add_task':
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    
    case 'auth_login_success':
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...store,
        auth: { token: action.payload.token, user: action.payload.user, error: null }
      };

    case 'auth_error':
      return { ...store, auth: { ...store.auth, error: action.payload } };

    case 'auth_logout':
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      return { ...store, auth: { token: null, user: null, error: null } };

    default:
      return store;
  }
}