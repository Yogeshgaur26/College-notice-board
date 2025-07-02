const form = document.getElementById("noticeForm");
const noticesDiv = document.getElementById("notices");

// Login
function login() {
  const inputUser = document.getElementById("username").value.trim();
  const inputPass = document.getElementById("password").value.trim();

  const validUser = "admin";
  const validPass = "12345";

  if (inputUser === validUser && inputPass === validPass) {
    localStorage.setItem("username", inputUser);
    showDashboard(inputUser);
  } else {
    alert("Invalid username or password!");
  }
}

// Show dashboard after login
function showDashboard(name) {
  document.getElementById("welcomeMsg").innerText = `Welcome, ${name}!`;
  document.getElementById("loginArea").style.display = "none";
  document.querySelector(".notice-form").style.display = "flex";
  document.getElementById("notices").style.display = "block";
  document.getElementById("logoutWrapper").style.display = "block";
}

// Logout
function logout() {
  localStorage.removeItem("username");
  location.reload();
}

// Page Load - show saved state
window.onload = function () {
  const savedUser = localStorage.getItem("username");

  if (savedUser) {
    showDashboard(savedUser);
  } else {
    document.querySelector(".notice-form").style.display = "none";
    document.getElementById("notices").style.display = "none";
    document.getElementById("logoutWrapper").style.display = "none";
  }

  const savedNotices = JSON.parse(localStorage.getItem("notices")) || [];
  savedNotices.forEach((notice, i) => addNoticeToPage(notice, i));
};

// Submit notice
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title || !description) {
    alert("Please fill in both fields.");
    return;
  }

  const notice = { title, description };
  const savedNotices = JSON.parse(localStorage.getItem("notices")) || [];

  savedNotices.unshift(notice);
  localStorage.setItem("notices", JSON.stringify(savedNotices));
  form.reset();
  noticesDiv.innerHTML = "";
  savedNotices.forEach((n, i) => addNoticeToPage(n, i));
});

// Add notice to page
function addNoticeToPage(notice, index) {
  const div = document.createElement("div");
  div.className = "notice";
  div.innerHTML = `
    <h3>${escapeHtml(notice.title)}</h3>
    <p>${escapeHtml(notice.description)}</p>
    <button onclick="deleteNotice(${index})" class="delete-btn" title="Delete Notice">Delete</button>
  `;
  div.style.opacity = "0";
  noticesDiv.appendChild(div);
  setTimeout(() => (div.style.opacity = "1"), 50);
}

// Delete a notice
function deleteNotice(index) {
  let savedNotices = JSON.parse(localStorage.getItem("notices")) || [];
  savedNotices.splice(index, 1);
  localStorage.setItem("notices", JSON.stringify(savedNotices));
  noticesDiv.innerHTML = "";
  savedNotices.forEach((n, i) => addNoticeToPage(n, i));
}

// Escape HTML (security)
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
