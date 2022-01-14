const editComment = async (event) => {
    event.preventDefault()
    const text = document.querySelector('#edit-text').value.trim();

    console.log(text)

    if (text) {
        if (event.target.hasAttribute('data-id')) {
            const id = event.target.getAttribute('data-id')
            console.log(id)

            const response = await fetch(`/api/comments/editcomment/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ text }),
                headers: { 'Content-Type': 'application/json', },
            });

            if (response.ok) {
                document.location.replace('/profile')
            } else {
                alert(response.statusText)
            }
        }
    };
};

document
    .querySelector('.edit-comment')
    .addEventListener('submit', editComment)