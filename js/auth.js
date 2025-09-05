function toggleRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
}
function toggleLogin() {
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

// Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const phone = document.getElementById("loginPhone").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  try {
    const data = await apiRequest("/login", "POST", { phone, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    window.location.href = "landing.html";
  } catch (err) {
    document.getElementById("loginError").textContent = err.message;
  }
});

// Register
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const dob = document.getElementById("regDob").value;
    const password = document.getElementById("regPassword").value.trim();
    const pin = document.getElementById("regPin").value.trim();
    const error = document.getElementById("registerError");

    // Age check
    const birth = new Date(dob);
    const age = new Date().getFullYear() - birth.getFullYear();
    if (age < 18) {
      error.textContent = "Must be 18+";
      return;
    }
    if (!validPassword(password)) {
      error.textContent = "Invalid password format";
      return;
    }
    if (!/^[0-9]{4}$/.test(pin)) {
      error.textContent = "PIN must be 4 digits";
      return;
    }

    try {
      await apiRequest("/register", "POST", {
        name,
        phone,
        dob,
        password,
        pin,
      });
      alert("Registration successful! Please login.");
      toggleLogin();
    } catch (err) {
      error.textContent = err.message;
    }
  });
