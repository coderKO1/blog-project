export const users = [
    { email: "admin@example.com", password: "admin123", role: "admin" },
    { email: "user@example.com", password: "user123", role: "user" },
  ];
  
  export const getUser = () => {
    return JSON.parse(localStorage.getItem("user")) || null;
  };
  
  // ✅ Add isLoggedIn function (Fixes Webpack error)
  export const isLoggedIn = () => {
    return localStorage.getItem("user") !== null;
  };
  
  export const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [
      { email: "admin@example.com", password: "admin123", role: "admin" },
    ];
  
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
    return false;
  };
  
  
  export const logoutUser = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; // force full reload + redirect
  };
  
  