document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("users")) || { "admin": "admin123" };
    localStorage.setItem("users", JSON.stringify(users));

    const signupForm = document.getElementById("signupForm");
    if (!signupForm) return;

    signupForm.addEventListener("submit", e => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const message = document.getElementById("signupMessage");

        if (users[username]) {
            if (message) {
                message.style.color = "red";
                message.textContent = "Username already exists!";
            }
        } else {
            users[username] = password;
            localStorage.setItem("users", JSON.stringify(users));
            if (message) {
                message.style.color = "green";
                message.textContent = "Account created successfully! You can now log in.";
            }
            signupForm.reset();
        }
    });
});
