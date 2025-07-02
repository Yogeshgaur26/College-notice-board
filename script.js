const form = document.getElementById("noticeForm");
const noticesDiv = document.getElementById("notices");

// Load saved notices on page load
window.onload = function () {
  const savedNotices = JSON.parse(localStorage.getItem("notices")) || [];
  savedNotices.forEach(addNoticeToPage);
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
function addNoticeToPage(notice) {
  const div = document.createElement("div");
  div.className = "notice";
  div.innerHTML = `<h3>${notice.title}</h3><p>${notice.description}</p>`;
  noticesDiv.prepend(div); // show newest on top
}
