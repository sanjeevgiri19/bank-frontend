// const API_BASE = "http://localhost:5000/api/user";
const API_BASE = "https://bank-backend-mgfn.onrender.com/api/user";

async function apiRequest(path, method = "GET", body = null) {
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("token");
  if (token) headers["Authorization"] = "Bearer " + token;

  const res = await fetch(API_BASE + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) throw new Error((await res.json()).msg || "Error");
  return res.json();
}

// Password validation: must start with capital, special char, 8+ chars
function validPassword(pw) {
  return /^[A-Z](?=.*[!@#$%^&])[A-Za-z0-9!@#$%^&*]{7,}$/.test(pw);
}
