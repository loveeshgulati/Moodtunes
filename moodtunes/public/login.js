// const togglePassword = document.getElementById('togglePassword');
// const passwordField = document.getElementById('password');
// const loginForm = document.querySelector('.login-form');
// const emailField = document.getElementById('email');

// // Toggle password visibility
// togglePassword.addEventListener('click', function () {
//     const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
//     passwordField.setAttribute('type', type);
//     this.textContent = type === 'password' ? '👁️' : '🙈';
// });

// // Form validation
// loginForm.addEventListener('submit', function (e) {
//     const email = emailField.value;
//     const password = passwordField.value;
//     let isValid = true;
//     let errorMessage = '';

//     // Check if email contains '@'
//     if (!email.includes('@')) {
//         errorMessage += 'Email must contain an @ symbol.\n';
//         isValid = false;
//     }

//     // Check if password is at least 8 characters long
//     if (password.length < 8) {
//         errorMessage += 'Password must be at least 8 characters long.\n';
//         isValid = false;
//     }

//     if (!isValid) {
//         alert(errorMessage);
//         e.preventDefault(); // Prevent form submission if validation fails
//     }
// });


// loginForm.addEventListener('submit', function (e) {
//   e.preventDefault(); 
//   window.location.href = '\test project\index.html'; // Replace with the actual path to your main page
// });