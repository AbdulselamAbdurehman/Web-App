document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const loginLink = document.getElementById("login-link");
    const signupLink = document.getElementById("signup-link");
  
    loginLink.addEventListener("click", () => {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
    });
  
    signupLink.addEventListener("click", () => {
      loginForm.style.display = "none";
      signupForm.style.display = "block";
    });
  
    // Add event listeners for login and signup functionality
    // You can use Fetch API or Axios to make HTTP requests to the backend
  });