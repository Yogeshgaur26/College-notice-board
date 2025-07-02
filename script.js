const form = document.getElementById("noticeForm");
const noticesDiv = document.getElementById("notices");

// Login function
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

// Show dashboard and notices after login
function showDashboard(name) {
  document.getElementById("welcomeMsg").innerText = `Welcome, ${name}!`;
  document.getElementById("loginArea").style.display = "none";
  document.querySelector(".notice-form").style.display = "flex";
  document.getElementById("notices").style.display = "block";
}

// Load saved user and notices on page load
window.onload = function () {
  const savedUser = localStorage.getItem("username");

  if (savedUser) {
    showDashboard(savedUser);
  } else {
    document.querySelector(".notice-form").style.display = "none";
    document.getElementById("notices").style.display = "none";
  }

  const savedNotices = JSON.parse(localStorage.getItem("notices")) || [];
  savedNotices.forEach((notice, i) => addNoticeToPage(notice, i));
};

// Form submit handler to add notice
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title || !description) {
    alert("Please fill in both title and description.");
    return;
  }

  const notice = { title, description };

  const savedNotices = JSON.parse(localStorage.getItem("notices")) || [];
  savedNotices.push(notice);
  localStorage.setItem("notices", JSON.stringify(savedNotices));

  addNoticeToPage(notice, savedNotices.length - 1);
  form.reset();
});

// Add a notice to the page
function addNoticeToPage(notice, index) {
  const div = document.createElement("div");
  div.className = "notice";
  div.innerHTML = `
    <h3>${escapeHtml(notice.title)}</h3>
    <p>${escapeHtml(notice.description)}</p>
    <button onclick="deleteNotice(${index})" class="delete-btn" title="Delete Notice">Delete</button>
  `;
  noticesDiv.prepend(div);
}

// Delete a notice by index
function deleteNotice(index) {
  let savedNotices = JSON.parse(localStorage.getItem("notices")) || [];
  savedNotices.splice(index, 1);
  localStorage.setItem("notices", JSON.stringify(savedNotices));
  location.reload();
}

// Simple HTML escaping to avoid injection issues
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
