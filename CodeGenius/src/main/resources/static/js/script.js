// Dark mode toggle
function toggleDarkMode() {
    const body = document.body;
    const dot = document.getElementById('dark-mode-toggle');
    body.classList.toggle('dark-mode');
    dot.classList.toggle('dark-mode');
}

// Alert logout
function confirmLogout() {
    let confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        window.location.href = "/logout";
    }
}

// Switch forms
function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const registrationForm = document.getElementById('registration-form');
    const navToggle = document.getElementById('nav-toggle');

    loginForm.style.display = (loginForm.style.display === 'none') ? 'block' : 'none';
    registrationForm.style.display = (registrationForm.style.display === 'none') ? 'block' : 'none';
    navToggle.textContent = navToggle.textContent === "Register" ? "Login" : "Register";
}