const form = document.getElementById("noticeForm");
const noticesDiv = document.getElementById("notices");

// Load saved notices on page load
window.onload = function () {
  const savedNotices = JSON.parse(localStorage.getItem("notices")) || [];
  savedNotices.forEach((notice, i) => addNoticeToPage(notice, i));

};

// When form is submitted
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const notice = { title, description };

  addNoticeToPage(notice);

  // Save to localStorage
  const savedNotices = JSON.parse(localStorage.getItem("notices")) || [];
  savedNotices.push(notice);
  localStorage.setItem("notices", JSON.stringify(savedNotices));

  form.reset();
});

// Function to show a notice
function addNoticeToPage(notice, index = null) {
  const div = document.createElement("div");
  div.className = "notice";
  div.innerHTML = `
    <h3>${notice.title}</h3>
    <p>${notice.description}</p>
    <button onclick="deleteNotice(${index})" class="delete-btn">Delete</button>
  `;
  noticesDiv.prepend(div);
}

function deleteNotice(index) {
  let savedNotices = JSON.parse(localStorage.getItem("notices")) || [];
  savedNotices.splice(index, 1);
  localStorage.setItem("notices", JSON.stringify(savedNotices));
  location.reload(); // refresh to update UI
}
function login() {
  const name = document.getElementById("username").value;
  if (name.trim() !== "") {
    localStorage.setItem("username", name);
    document.getElementById("welcomeMsg").innerText = `Welcome, ${name}!`;
    document.getElementById("loginArea").style.display = "none";
  }
}

window.onload = function () {
  const name = localStorage.getItem("username");
  if (name) {
    document.getElementById("welcomeMsg").innerText = `Welcome back, ${name}!`;
    document.getElementById("loginArea").style.display = "none";
  }

  const savedNotices = JSON.parse(localStorage.getItem("notices")) || [];
  savedNotices.forEach((notice, i) => addNoticeToPage(notice, i));
};


