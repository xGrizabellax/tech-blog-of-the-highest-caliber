const createProject = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#project-name').value.trim();
    const description = document.querySelector('#project-description').value.trim();
    const needed_funding = document.querySelector('#funding-needed').value.trim();

    if (name && needed_funding && description) {
        const response = await fetch('/api/projects', {
            method: 'POST',
            body: JSON.stringify({ name, needed_funding, description }),
            headers: { 'Content-Type': 'application/json', },
        });

        if (response.ok) {
            document.location.replace('/profile')
        } else {
            alert(response.statusText)
        }
    }
}

const deleteProject = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id')
        console.log(id)

        const response = await fetch(`/api/projects/${id}`, {
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
    .querySelector('.create-project')
    .addEventListener('submit', createProject)

document
    .querySelector('.user-projects')
    .addEventListener('click', deleteProject)