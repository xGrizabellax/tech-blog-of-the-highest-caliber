const createNewUser = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#create-name').value.trim()
    const email = document.querySelector('#create-email').value.trim()
    const password = document.querySelector('#create-password').value.trim()

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            document.location.replace('/profile')
        } else {
            alert(response.statusText);
            // document.location.replace('/login')
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