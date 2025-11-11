// Authentication functions for PetVerse

// Update login/logout links based on user state
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

// Logout function
function logout() {
  const user = localStorage.getItem("petpal_user");
  localStorage.removeItem("petpal_user");
  showToast(`Goodbye, ${user}! You have been logged out.`, 'success');
  
  updateAuthLinks();
  
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
}

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("petpal_user") !== null;
}

// Get current user
function getCurrentUser() {
  return localStorage.getItem("petpal_user");
}

// Require login for actions
function requireLogin(actionName = "this action") {
  if (!isLoggedIn()) {
    showToast(`Please login to ${actionName}`, 'error');
    return false;
  }
  return true;
}

// Show toast notification
function showToast(message, type = 'info') {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  
  toast.innerText = message;
  toast.style.background = type === 'error' ? '#ff6b6b' : 
                          type === 'success' ? 'var(--accent)' : 'var(--primary)';
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', updateAuthLinks);