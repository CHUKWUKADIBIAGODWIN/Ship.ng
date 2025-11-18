document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("users")) || { "admin": "admin123" };
    localStorage.setItem("users", JSON.stringify(users));

    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const loginError = document.getElementById("loginError");

        if (users[username] && users[username] === password) {
            if (username === "admin") {
                window.location.href = "admin.html";
            } else {
                alert(`Welcome ${username}!`);
                window.location.href = "index.html";
            }
        } else {
            if (loginError) loginError.textContent = "Invalid username or password!";
        }
    });
});
