// const togglePassword = document.getElementById('togglePassword');
// const passwordField = document.getElementById('password');
// const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
// const confirmPasswordField = document.getElementById('confirm-password');
// const signupForm = document.querySelector('.signup-form');
// const emailField = document.getElementById('email');

// // Toggle password visibility
// togglePassword.addEventListener('click', function () {
//     const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
//     passwordField.setAttribute('type', type);
//     this.textContent = type === 'password' ? '👁️' : '🙈';
// });

// // Toggle confirm password visibility
// toggleConfirmPassword.addEventListener('click', function () {
//     const type = confirmPasswordField.getAttribute('type') === 'password' ? 'text' : 'password';
//     confirmPasswordField.setAttribute('type', type);
//     this.textContent = type === 'password' ? '👁️' : '🙈';
// });

// // Form validation
// signupForm.addEventListener('submit', function (e) {
//     const email = emailField.value;
//     const password = passwordField.value;
//     const confirmPassword = confirmPasswordField.value;
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

//     // Check if password and confirm password match
//     if (password !== confirmPassword) {
//         errorMessage += 'Passwords do not match.\n';
//         isValid = false;
//     }

//     if (!isValid) {
//         alert(errorMessage);
//         e.preventDefault(); // Prevent form submission if validation fails
//     }
// });
