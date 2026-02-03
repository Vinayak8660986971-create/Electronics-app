const API = "http://127.0.0.1:5000";

function registerUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(API + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("msg").innerText = data.message;
    });
}

function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(API + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("msg").innerText = data.message;

        if (data.message === "Login success") {
            localStorage.setItem("loggedInUser", username);
            window.location.replace("index.html");
        }
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

function togglePassword() {
    const pwd = document.getElementById("password");
    pwd.type = pwd.type === "password" ? "text" : "password";
}
// 🔐 Password strength checker
function checkStrength() {
    const pwd = document.getElementById("password").value;
    const bar = document.getElementById("strength-bar");
    const text = document.getElementById("strength-text");

    let strength = 0;

    if (pwd.length >= 6) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[@$!%*?&]/.test(pwd)) strength++;

    if (strength === 0) {
        bar.style.width = "0%";
        text.innerText = "";
    } else if (strength === 1) {
        bar.style.width = "25%";
        bar.style.background = "red";
        text.innerText = "Weak";
    } else if (strength === 2) {
        bar.style.width = "50%";
        bar.style.background = "orange";
        text.innerText = "Medium";
    } else if (strength === 3) {
        bar.style.width = "75%";
        bar.style.background = "blue";
        text.innerText = "Strong";
    } else {
        bar.style.width = "100%";
        bar.style.background = "green";
        text.innerText = "Very Strong";
    }
}
