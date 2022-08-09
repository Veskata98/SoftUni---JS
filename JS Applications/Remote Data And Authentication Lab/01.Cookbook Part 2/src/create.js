function create() {
    const createForm = document.querySelector('form');
    const createUrl = 'http://localhost:3030/data/recipes';

    createForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(createForm);
        const { name, img, ingredients, steps } = Object.fromEntries(data);

        const token = localStorage.getItem('accessToken');

        const res = await fetch(createUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token,
            },
            body: JSON.stringify({ name, img, ingredients: ingredients.split('\n'), steps: steps.split('\n') }),
        });
        const responseData = await res.json();

        location.href = 'index.html';
    });
}

create();
