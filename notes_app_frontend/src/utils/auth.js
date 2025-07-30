/**
 * AUTH utility functions (localStorage mock).
 * These should be replaced with backend API calls (use .env for endpoint).
 */

// PUBLIC_INTERFACE
export async function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  const user = users[email];
  if (!user || user.password !== password) {
    throw new Error("Email or password incorrect.");
  }
  localStorage.setItem("authedUser", JSON.stringify({ email }));
  return { email };
}

// PUBLIC_INTERFACE
export async function logoutUser() {
  localStorage.removeItem("authedUser");
}

// PUBLIC_INTERFACE
export async function registerUser(email, password) {
  let users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[email]) {
    throw new Error("Account already exists for this email.");
  }
  users[email] = { email, password };
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("authedUser", JSON.stringify({ email }));
  return { email };
}

// PUBLIC_INTERFACE
export async function getAuthUser() {
  const u = JSON.parse(localStorage.getItem("authedUser"));
  if (!u) throw new Error("Not logged in");
  return u;
}
