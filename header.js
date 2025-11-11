// header.js - Global header functionality for all pages
function updateAuthLinks() {
    const user = localStorage.getItem("petpal_user");
    const loginLink = document.getElementById("loginLink");
    const logoutItem = document.getElementById("logoutItem");
    const logoutLink = document.getElementById("logoutLink");

    if (user && loginLink) {
        loginLink.innerHTML = `Welcome, ${user} 👋`;
        loginLink.style.color = "var(--accent)";
        loginLink.href = "javascript:void(0)";
        loginLink.onclick = () => showToast(`Already logged in as ${user}`);
        
        if (logoutItem && logoutLink) {
            logoutItem.style.display = "block";
            logoutLink.onclick = logout;
        }
    } else if (loginLink) {
        loginLink.innerHTML = "Login / Signup";
        loginLink.style.color = "";
        loginLink.href = "login.html";
        loginLink.onclick = null;
        
        if (logoutItem) {
            logoutItem.style.display = "none";
        }
    }
}

function logout() {
    const user = localStorage.getItem("petpal_user");
    localStorage.removeItem("petpal_user");
    showToast(`Goodbye, ${user}! You have been logged out.`);
    updateAuthLinks();
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
}

function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }
    
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

// Initialize header when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateAuthLinks();
});