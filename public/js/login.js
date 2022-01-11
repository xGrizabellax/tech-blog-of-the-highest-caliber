const createNewUser = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#create-username').value.trim()
    const email = document.querySelector('#create-email').value.trim()
    const password = document.querySelector('#create-password').value.trim()
    const confirmPass = document.querySelector('#confirm-password').value.trim()

    if (username && email && password && confirmPass) {
        if (password === confirmPass) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            document.location.replace('/profile')
        } else {
            alert(response.statusText);
            // document.location.replace('/login')
        }
    } else {
        alert("Your passwords didn't match!")
    }
    }
}

const loginUser = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#login-email').value.trim()
    const password = document.querySelector('#login-password').value.trim()

    if (email && password){
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/profile')
        } else {
            alert(response.statusText)
        }
    }
}

document
    .querySelector('.create-user')
    .addEventListener('submit', createNewUser)

document
    .querySelector('.login-user')
    .addEventListener('submit', loginUser)