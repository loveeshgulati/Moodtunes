document.querySelector('.forgot-password-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('reset-email').value;
    if (email) {
        alert(`A reset link has been sent to ${email}`);
        // Here you would add your API call to send the password reset link
    } else {
        alert('Please enter a valid email address.');
    }
});
