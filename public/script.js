document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('https://testing-sage-gamma.vercel.app/api/signup', {  // Correct URL for signup
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => alert('Error: ' + err));
});

document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    fetch('https://testing-sage-gamma.vercel.app/api/signin', {  // Correct URL for signin
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => alert('Error: ' + err));
});
