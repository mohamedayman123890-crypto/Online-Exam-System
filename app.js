const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const id = document.getElementById("studentId").value.trim();
  const button = form.querySelector("button");

  button.disabled = true;
  button.innerHTML = "Starting...";

  try {
    const response = await fetch("/api/student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, id })
    });

    if (!response.ok) throw new Error();

    sessionStorage.setItem("studentName", name);
    sessionStorage.setItem("studentId", id);
    window.location.href = "quiz.html";
  } catch {
    button.disabled = false;
    button.innerHTML = 'Start Quiz <span>→</span>';
    alert("Could not save student data.");
  }
});
