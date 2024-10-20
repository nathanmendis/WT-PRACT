    // app.js

// Handling the form submission
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get user input data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create user object
    const user = {
        name: name,
        email: email,
        password: password
    };

    // Store user in localStorage (simulating database persistence)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Simulate sending data to server using AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://example.com/register', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('User registered successfully');
            // Redirect to new page to display the user list
            window.location.href = 'userList.html';
        } else {
            console.error('Registration failed');
        }
    };

    // Sending the user data as JSON
    xhr.send(JSON.stringify(user));
});
