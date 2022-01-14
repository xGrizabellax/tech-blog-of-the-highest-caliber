const createComment = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#comment-text').value.trim();
    const post_id = window.location.toString().split('/').at(-1)
    // const post_id = window.location.toString().split('')[windowLength - 1]
    console.log(text)

    if (text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ text, post_id }),
            headers: { 'Content-Type': 'application/json', },
        });

        if (response.ok) {
            document.location.reload()
        } else {
            alert(response.statusText)
        }
    }
}

const deleteComment = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id')
        console.log(id)

        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.reload()
        } else {
            alert(response.statusText)
        }
    }
};


document
    .querySelector('.create-comment')
    .addEventListener('submit', createComment)

document
    .querySelector('.delete-comment')
    .addEventListener('click', deleteComment)
