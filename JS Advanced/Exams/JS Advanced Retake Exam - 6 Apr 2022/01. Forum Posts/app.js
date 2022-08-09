window.addEventListener('load', solve);

function solve() {
    const titleElement = document.getElementById('post-title');
    const categoryElement = document.getElementById('post-category');
    const contentElement = document.getElementById('post-content');
    const submitBtn = document.getElementById('publish-btn');
    const listElement = document.getElementById('review-list');
    const approvedListElement = document.getElementById('published-list');
    const clearBtn = document.getElementById('clear-btn');

    submitBtn.addEventListener('click', submitHandler);

    function submitHandler() {
        let title = titleElement.value;
        let category = categoryElement.value;
        let content = contentElement.value;

        if (title.length && category.length && content.length) {
            let liElement = document.createElement('li');
            liElement.classList.add('rpost');

            let articleElement = document.createElement('article');

            let h4Element = document.createElement('h4');
            h4Element.textContent = title;

            let pCategoryElement = document.createElement('p');
            pCategoryElement.textContent = 'Category: ' + category;

            let pContentElement = document.createElement('p');
            pContentElement.textContent = 'Content: ' + content;

            articleElement.appendChild(h4Element);
            articleElement.appendChild(pCategoryElement);
            articleElement.appendChild(pContentElement);

            let editBtn = document.createElement('button');
            editBtn.classList.add('action-btn', 'edit');
            editBtn.textContent = 'Edit';

            let approveBtn = document.createElement('button');
            approveBtn.classList.add('action-btn', 'approve');
            approveBtn.textContent = 'Approve';

            liElement.appendChild(articleElement);
            liElement.appendChild(editBtn);
            liElement.appendChild(approveBtn);

            listElement.appendChild(liElement);

            titleElement.value = '';
            categoryElement.value = '';
            contentElement.value = '';

            editBtn.addEventListener('click', () => {
                titleElement.value = h4Element.textContent;
                categoryElement.value = pCategoryElement.textContent.slice(10);
                contentElement.value = pContentElement.textContent.slice(9);

                liElement.remove();
            });

            approveBtn.addEventListener('click', () => {
                // liElement.querySelectorAll('button').forEach((x) => x.remove());

                // liElement.querySelector('button').remove();
                // liElement.querySelector('button').remove();

                Array.from(liElement.querySelectorAll('button')).forEach((el) => el.remove());

                approvedListElement.appendChild(liElement);
            });
        }
        clearBtn.addEventListener('click', () => {
            approvedListElement.innerHTML = '';
        });
    }
}
