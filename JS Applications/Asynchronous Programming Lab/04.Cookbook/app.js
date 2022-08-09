window.onload = solve;

function solve() {
    const baseUrl = 'http://localhost:3030/jsonstore/cookbook/recipes';
    const detailsUrl = 'http://localhost:3030/jsonstore/cookbook/details';

    const main = document.querySelector('main');

    fetch(baseUrl)
        .then((res) => res.json())
        .then((data) => fetchData(data));

    function fetchData(data) {
        main.innerHTML = '';
        Object.values(data).forEach((x) => {
            const article = createElement('article', '', { class: 'preview' }, main);
            const infoArticle = createElement('article', '', { style: 'display: none' }, main);

            const divTitle = createElement('div', '', { class: 'title' }, article);
            const title = createElement('h2', x.name, {}, divTitle);

            const divImg = createElement('div', '', { class: 'small' }, article);
            const img = createElement('img', '', { src: x.img }, divImg);

            article.addEventListener('click', fetchDetails);

            async function fetchDetails() {
                infoArticle.innerHTML = '';
                if (infoArticle.style.display === 'block') {
                    infoArticle.style.display = 'none';
                } else {
                    infoArticle.style.display = 'block';
                    try {
                        const moreInfoRes = await fetch(`${detailsUrl}/${x._id}`);
                        const details = await moreInfoRes.json();

                        const detailsTitle = createElement('h2', details.name, {}, infoArticle);
                        const divBand = createElement('div', '', { class: 'band' }, infoArticle);

                        const divThumb = createElement('div', '', { class: 'thumb' }, divBand);
                        const detailsImg = createElement('img', '', { src: details.img }, divThumb);

                        const divIngredients = createElement('div', '', { class: 'ingredients' }, divBand);
                        const h3Ingredients = createElement('h3', 'Ingredients:', {}, divIngredients);
                        const ulIngredients = createElement('ul', '', {}, divIngredients);

                        details.ingredients.forEach((ingr) => {
                            const li = createElement('li', ingr, {}, ulIngredients);
                        });

                        const divDescription = createElement('div', '', { class: 'description' }, infoArticle);
                        const h3Description = createElement('h3', 'Preparation:', {}, divDescription);
                        details.steps.forEach((step) => {
                            const p = createElement('p', step, {}, divDescription);
                        });
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        });
    }

    function createElement(type, content, attributes, parentNode) {
        const element = document.createElement(type);

        if (content) {
            element.textContent = content;
        }

        Object.entries(attributes).forEach((x) => element.setAttribute(x[0], x[1]));

        parentNode.appendChild(element);

        return element;
    }
}
