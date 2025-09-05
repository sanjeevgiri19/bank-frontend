const balanceCard = document.getElementById("balanceCard");

async function loadBalance() {
  try {
    const data = await apiRequest("/balance");
    balanceCard.textContent = "Balance: ₹" + data.balance;
  } catch (err) {
    balanceCard.textContent = "Error loading balance";
  }
}

// ✅ Deposit
async function depositMoney() {
  const amount = parseFloat(document.getElementById("depositAmount").value);
  const msg = document.getElementById("depositMsg");

  if (isNaN(amount) || amount < 10 || amount > 50000) {
    msg.textContent = "Deposit must be between ₹10–50,000";
    return;
  }

  try {
    const data = await apiRequest("/deposit", "POST", { amount });
    msg.textContent = data.msg;
    loadBalance();
  } catch (err) {
    msg.textContent = err.message;
  }
}

// ✅ Withdraw
async function withdrawMoney() {
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  const pin = document.getElementById("withdrawPin").value;
  const msg = document.getElementById("withdrawMsg");

  if (isNaN(amount) || amount < 10 || amount > 25000) {
    msg.textContent = "Withdraw must be between ₹10–25,000";
    return;
  }

  try {
    const data = await apiRequest("/withdraw", "POST", { amount, pin });
    msg.textContent = data.msg;
    loadBalance();
  } catch (err) {
    msg.textContent = err.message;
  }
}

// ✅ Transfer
async function transferMoney() {
  const phone = document.getElementById("transferPhone").value.trim();
  const amount = parseFloat(document.getElementById("transferAmount").value);
  const pin = document.getElementById("transferPin").value;
  const bankType = document.getElementById("bankType").value;
  const msg = document.getElementById("transferMsg");

  if (!phone || isNaN(amount) || amount <= 0) {
    msg.textContent = "Enter valid details";
    return;
  }

  try {
    const data = await apiRequest("/transfer", "POST", {
      phone,
      amount,
      pin,
      bankType,
    });
    msg.textContent = data.msg;
    loadBalance();
  } catch (err) {
    msg.textContent = err.message;
  }
}

// ✅ Top-up
async function topupMobile() {
  const phone = document.getElementById("topupPhone").value.trim();
  const amount = parseFloat(document.getElementById("topupAmount").value);
  const pin = document.getElementById("topupPin").value;
  const msg = document.getElementById("topupMsg");

  if (!phone || isNaN(amount) || amount <= 0) {
    msg.textContent = "Enter valid details";
    return;
  }

  try {
    const data = await apiRequest("/topup", "POST", { phone, amount, pin });
    msg.textContent = data.msg;
    loadBalance();
  } catch (err) {
    msg.textContent = err.message;
  }
}

// ✅ eSewa
async function loadEsewa() {
  const id = document.getElementById("esewaId").value.trim();
  const amount = parseFloat(document.getElementById("esewaAmount").value);
  const pin = document.getElementById("esewaPin").value;
  const msg = document.getElementById("esewaMsg");

  if (!id || isNaN(amount) || amount <= 0) {
    msg.textContent = "Enter valid details";
    return;
  }

  try {
    const data = await apiRequest("/esewa", "POST", { id, amount, pin });
    msg.textContent = data.msg;
    loadBalance();
  } catch (err) {
    msg.textContent = err.message;
  }
}

// ✅ Change Password
async function changePassword() {
  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const msg = document.getElementById("changePassMsg");

  if (!validPassword(newPassword)) {
    msg.textContent =
      "New password must be 8+ chars, start with capital, include number & symbol.";
    return;
  }

  try {
    const data = await apiRequest("/change-password", "POST", {
      oldPassword,
      newPassword,
    });
    msg.textContent = data.msg;
  } catch (err) {
    msg.textContent = err.message;
  }
}

// Navigation
function goBack() {
  window.location.href = "landing.html";
}
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

loadBalance();
