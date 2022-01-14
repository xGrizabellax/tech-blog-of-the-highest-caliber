const createPost = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#post-name').value.trim();
    const body = document.querySelector('#post-body').value.trim();

    if (name && body) {
        console.log(body)
        const response = await fetch('/api/posts', {
            method: 'POST',
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

const deletePost = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id')
        console.log(id)

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile')
        } else {
            alert(response.statusText)
        }
    }
};




document
    .querySelector('.create-post')
    .addEventListener('submit', createPost)
// const postCreate = document.querySelector('.create-post')
// postCreate.addEventListener('submit', createPost)

document
    .querySelector('.delete-post')
    .addEventListener('click', deletePost)


