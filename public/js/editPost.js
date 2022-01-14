const editPost = async (event) => {
    event.preventDefault()
    const name = document.querySelector('#name-edit').value.trim();
    const body = document.querySelector('#body-edit').value.trim();

    console.log(name, body)

    if (name && body) {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id')
        console.log(id)

        const response = await fetch(`/api/posts/editpost/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, body }),
            headers: { 'Content-Type': 'application/json', },
        });

        if (response.ok) {
            document.location.replace('/profile')
        } else {
            alert(response.statusText)
        }
    }
}
};

document
.querySelector('.edit-post')
.addEventListener('submit', editPost)